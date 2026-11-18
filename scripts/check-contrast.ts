/**
 * Checks every color pair in src/styles/tokens.json, in both themes, against WCAG 2.2.
 * Ported from Che Bondi's scripts/check_contrast.py.
 *
 * Minimums:
 * - Text pairs need 4.5:1 (AA): text, muted, dim and link text on the page and on surfaces; text on a line badge;
 *   selected text on its highlight.
 * - Line colors are also text (the "in progress" and "line cleared" tags), so they need 4.5:1 on the page.
 * - Control pairs need 3:1 (non-text contrast): the lines on surfaces, the page color as an icon on a filled
 *   node, stations on the page, and the focus ring.
 * - Hairlines need 1.3:1 so dividers stay visible. There is no WCAG minimum for decoration; the number is Che
 *   Bondi's, where fainter lines vanished on real screens.
 *
 * Usage: node scripts/check-contrast.ts   (exit code 1 if any pair fails)
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const TOKENS_PATH = fileURLToPath(new URL('../src/styles/tokens.json', import.meta.url));
const TEXT_MIN = 4.5;
const CONTROL_MIN = 3;
const HAIRLINE_MIN = 1.3;
const SRGB_LINEAR_THRESHOLD = 0.04045;
const LUMINANCE_WEIGHTS = [0.2126, 0.7152, 0.0722] as const;
const CONTRAST_FLARE = 0.05;
const HEX_CHANNEL_STARTS = [1, 3, 5] as const;
const HEX_CHANNEL_LENGTH = 2;
const CHANNEL_MAX = 255;
const RATIO_DECIMALS = 2;

/** [foreground, background, minimum]: keys of a theme in tokens.json. */
const PAIRS = [
    ['text', 'bg', TEXT_MIN],
    ['text', 'surface', TEXT_MIN],
    ['muted', 'bg', TEXT_MIN],
    ['muted', 'surface', TEXT_MIN],
    ['dim', 'bg', TEXT_MIN],
    ['link', 'bg', TEXT_MIN],
    ['link', 'surface', TEXT_MIN],
    ['onBadge', 'lineDotcms', TEXT_MIN],
    ['selectionText', 'selectionBg', TEXT_MIN],
    ['lineDotcms', 'bg', TEXT_MIN],
    ['lineIndependent', 'bg', TEXT_MIN],
    ['lineTooling', 'bg', TEXT_MIN],
    ['bg', 'lineDotcms', CONTROL_MIN],
    ['bg', 'lineIndependent', CONTROL_MIN],
    ['bg', 'lineTooling', CONTROL_MIN],
    ['lineDotcms', 'surface', CONTROL_MIN],
    ['lineIndependent', 'surface', CONTROL_MIN],
    ['lineTooling', 'surface', CONTROL_MIN],
    ['station', 'bg', CONTROL_MIN],
    ['focus', 'bg', CONTROL_MIN],
    ['focus', 'surface', CONTROL_MIN],
    ['hairline', 'bg', HAIRLINE_MIN],
    ['hairline', 'surface', HAIRLINE_MIN]
] as const;

type Theme = Record<string, string>;

interface Check {
    theme: string;
    fg: string;
    bg: string;
    ratio: number;
    minimum: number;
}

function linearChannel(value: number): number {
    if (value <= SRGB_LINEAR_THRESHOLD) {
        return value / 12.92;
    }

    return ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
    const channels = HEX_CHANNEL_STARTS.map(
        (start) => parseInt(hex.slice(start, start + HEX_CHANNEL_LENGTH), 16) / CHANNEL_MAX
    );

    return channels.reduce(
        (sum, channel, index) => sum + LUMINANCE_WEIGHTS[index] * linearChannel(channel),
        0
    );
}

/** WCAG contrast ratio between two #RRGGBB colors. Pure. */
export function contrast(a: string, b: string): number {
    const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);

    return (high + CONTRAST_FLARE) / (low + CONTRAST_FLARE);
}

/** Every pair of every theme. Pure: no files, no output. */
export function checks(themes: Record<string, Theme>): Check[] {
    return Object.entries(themes).flatMap(([theme, colors]) =>
        PAIRS.map(([fg, bg, minimum]) => ({
            theme,
            fg,
            bg,
            ratio: contrast(colors[fg], colors[bg]),
            minimum
        }))
    );
}

function main(): number {
    const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf8'));
    const results = checks(tokens.color);
    const failed = results.filter((check) => check.ratio < check.minimum);

    for (const check of results) {
        const mark = check.ratio >= check.minimum ? 'ok  ' : 'FAIL';

        console.log(
            `${mark} ${check.theme.padEnd(5)} ${check.fg.padStart(15)} on ${check.bg.padEnd(10)} ` +
                `${check.ratio.toFixed(RATIO_DECIMALS)}:1 (min ${check.minimum})`
        );
    }

    console.log(failed.length ? `\n${failed.length} failing pair(s)` : '\nAll pairs pass');

    return failed.length ? 1 : 0;
}

process.exitCode = main();
