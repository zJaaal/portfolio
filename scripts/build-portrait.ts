/**
 * Builds the portrait and the share card from the owner's GitHub avatar, so changing the photo on
 * GitHub updates the site on its next build. Writes, into public/:
 * - portrait.png: the avatar downscaled to a 40×40 pixel grid (the site shows it pixelated);
 * - og.png: a 1200×630 share card drawn from shapes only (no text, so no fonts are needed on the
 *   build machine): the portrait, then a pixel road through one node per line color.
 * If GitHub can't be reached, both are built from portrait-placeholder.png and the build goes on.
 *
 * Usage: node scripts/build-portrait.ts
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { AVATAR_REQUEST_PX, AVATAR_TIMEOUT_MS, CARD, GITHUB_USER, PORTRAIT_PX } from './constants.ts';

const PUBLIC = (name: string): string => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
const TOKENS_PATH = fileURLToPath(new URL('../src/styles/tokens.json', import.meta.url));
const AVATAR_URL = `https://github.com/${GITHUB_USER}.png?size=${AVATAR_REQUEST_PX}`;

interface Theme {
    bg: string;
    text: string;
    muted: string;
    lineDotcms: string;
    lineIndependent: string;
    lineTooling: string;
}

async function avatar(): Promise<{ image: Buffer; source: string }> {
    try {
        const response = await fetch(AVATAR_URL, { signal: AbortSignal.timeout(AVATAR_TIMEOUT_MS) });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return { image: Buffer.from(await response.arrayBuffer()), source: 'GitHub' };
    } catch (error) {
        console.warn(`portrait: GitHub avatar unavailable (${String(error)}); using the placeholder`);

        return { image: readFileSync(PUBLIC('portrait-placeholder.png')), source: 'placeholder' };
    }
}

/** A row of road pixels from x0 to x1 at height y. */
function road(x0: number, x1: number, y: number, color: string): string {
    const step = CARD.dot + CARD.gap;
    const count = Math.floor((x1 - x0) / step) + 1;

    return Array.from(
        { length: count },
        (_, i) => `<rect x="${x0 + i * step}" y="${y - CARD.dot / 2}" width="${CARD.dot}" height="${CARD.dot}" fill="${color}"/>`
    ).join('');
}

function cardSvg(theme: Theme): string {
    const size = PORTRAIT_PX * CARD.portraitScale;
    const cx = CARD.portraitLeft + size / 2;
    const cy = CARD.height / 2;
    const start = CARD.portraitLeft + size + CARD.ring + CARD.gap * 2;
    const end = CARD.width - CARD.portraitLeft;
    const lines = [theme.lineTooling, theme.lineDotcms, theme.lineIndependent];
    const spacing = (end - start) / lines.length;
    const nodes = lines
        .map((color, i) => {
            const x = start + spacing * (i + 0.5);

            return `<circle cx="${x}" cy="${cy}" r="${CARD.node / 2}" fill="${theme.bg}" stroke="${color}" stroke-width="${CARD.nodeRing}"/>`;
        })
        .join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${CARD.height}">
        <rect width="100%" height="100%" fill="${theme.bg}"/>
        ${road(start, end, cy, theme.muted)}
        ${nodes}
        <circle cx="${cx}" cy="${cy}" r="${size / 2 + CARD.ring / 2}" fill="none" stroke="${theme.text}" stroke-width="${CARD.ring}"/>
    </svg>`;
}

async function main(): Promise<void> {
    const theme = (JSON.parse(readFileSync(TOKENS_PATH, 'utf8')) as { color: { dark: Theme } }).color.dark;
    const { image, source } = await avatar();
    const grid = await sharp(image).resize(PORTRAIT_PX, PORTRAIT_PX, { fit: 'cover' }).removeAlpha().png().toBuffer();

    await sharp(grid).toFile(PUBLIC('portrait.png'));

    const size = PORTRAIT_PX * CARD.portraitScale;
    const circle = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`
    );
    const face = await sharp(grid)
        .resize(size, size, { kernel: 'nearest' })
        .composite([{ input: circle, blend: 'dest-in' }])
        .png()
        .toBuffer();

    await sharp(Buffer.from(cardSvg(theme)))
        .composite([{ input: face, left: CARD.portraitLeft, top: (CARD.height - size) / 2 }])
        .png()
        .toFile(PUBLIC('og.png'));

    console.log(`portrait: built portrait.png and og.png from the ${source} image`);
}

await main();
