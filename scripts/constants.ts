/** Named numbers for the build scripts (CODE_STANDARDS: no magic numbers). */

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
