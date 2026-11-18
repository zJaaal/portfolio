/** Tree lanes: the first sits this far across the map (percent), the rest step by LANE_STEP_PCT. */
export const LANE_START_PCT = 17;
export const LANE_STEP_PCT = 28;

/**
 * Floors, in rem. A floor is at least FLOOR_MIN tall and grows to fit its label, plus room above
 * and below for the paths that turn at its edges. Narrow screens give each door its own, shorter
 * floor.
 */
export const FLOOR_MIN_REM = 6;
export const FUTURE_FLOOR_REM = 3.5;
/** Kept clear between a label and its floor's edge: half a path pixel plus a margin. */
export const FLOOR_CLEARANCE_REM = 0.6875;

/**
 * Label metrics, in rem, mirroring RunMap's styles. Line counts are estimated generously (wide
 * average glyphs, the narrowest supported label width), so a floor only ever errs on the tall side.
 * The tree's labels are narrowest where the tree starts (48em): about 133px of text.
 */
export const LABEL_METRICS = {
    desk: { nameLine: 1.725, nameChars: 10, originChars: 14, metaChars: 16 },
    narrow: { nameLine: 1.4375, nameChars: 11, originChars: 13, metaChars: 17 }
} as const;
export const ORIGIN_NAME_LINE_REM = 1.25;
export const META_LINE_REM = 1.1375;
export const TAG_LINE_REM = 1.1;
export const LABEL_GAP_REM = 0.25;
export const LABEL_PADDING_REM = 0.5;
/** In the tree, a label hangs this far below its node. */
export const LABEL_DROP_REM = 0.25;

/** Node sizes, in rem (the tokens of the same name). */
export const NODE_SIZE_REM = {
    start: { desk: 1.5, narrow: 1 },
    stop: { desk: 3.25, narrow: 2.5 },
    door: { desk: 2.25, narrow: 1.5 },
    cleared: { desk: 2.25, narrow: 1.5 },
    boss: { desk: 4.5, narrow: 3 }
} as const;
/** The path's pixel and the gap between pixels, in rem (route.dot and route.dotGap). */
export const DOT_REM = 0.5;
export const DOT_GAP_REM = 0.25;
export const NODE_REM = { desk: 3.25, narrow: 2.5 } as const;
export const BOSS_REM = { desk: 4.5, narrow: 3 } as const;

/**
 * The sprite's walk, in CSS pixels and seconds. It walks to the last node above the reading line
 * (a share of the viewport's height), speeds up gently, and slows down as it nears the node. At the
 * top of the page the reading line starts at the viewport's top edge and settles over `settleScroll`
 * viewports of scrolling, so the walk starts on the first node.
 */
export const WALK = {
    readingLine: 0.55,
    settleScroll: 0.5,
    maxSpeed: 1000,
    minSpeed: 36,
    brake: 1.8,
    accelerate: 5,
    bottomSlack: 2,
    maxFrameSeconds: 0.05
} as const;
