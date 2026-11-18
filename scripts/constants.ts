/** Named numbers for the build scripts (CODE_STANDARDS: no magic numbers). */

/** The GitHub account whose avatar is the portrait. Public: it is the site's own GitHub link. */
export const GITHUB_USER = 'zJaaal';
/** The avatar size requested from GitHub, in pixels: enough detail to downscale from. */
export const AVATAR_REQUEST_PX = 240;
/** How long the build waits for GitHub before using the placeholder, in milliseconds. */
export const AVATAR_TIMEOUT_MS = 8000;
/** The portrait's pixel grid: the site shows it this many pixels wide, scaled up pixelated. */
export const PORTRAIT_PX = 40;

/** The share card (Open Graph), in pixels. */
export const CARD = {
    width: 1200,
    height: 630,
    /** Portrait pixels become blocks this big on the card. */
    portraitScale: 8,
    portraitLeft: 120,
    ring: 12,
    /** The road's pixels and the gaps between them (twice the site's 8 + 4). */
    dot: 16,
    gap: 8,
    node: 72,
    nodeRing: 8
} as const;
