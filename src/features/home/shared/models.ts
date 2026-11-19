export const LINE = {
    DOTCMS: 'dotcms',
    ORIGIN: 'origin',
    INDEPENDENT: 'independent',
    TOOLING: 'tooling'
} as const;

export type Line = (typeof LINE)[keyof typeof LINE];

/** A work line: every line except my own path (origin). */
export type WorkLine = Exclude<Line, typeof LINE.ORIGIN>;

/** A station as the run map needs it. */
export interface RunStation {
    id: string;
    line: Line;
    /** "YYYY-MM". */
    start: string;
    ongoing: boolean;
    page: boolean;
}

/** A label's text, in the page's language: floors are sized to fit it. */
export interface LabelText {
    name: string;
    role: string;
    /** Whether it carries a one-line tag (in progress). */
    tag: boolean;
    /** When it ran, as shown on the map ("Mar – May 2023");  */
    dates?: string;
}

export const LAYOUT = { DESK: 'desk', NARROW: 'narrow' } as const;

export type Layout = (typeof LAYOUT)[keyof typeof LAYOUT];

/**
 * A horizontal position, as multiples of CSS lengths:
 * `trunk × var(--trunk) + pct% + wobble × var(--route-wobble) + pitch × var(--route-lane-pitch)`.
 */
export interface Across {
    trunk: number;
    pct: number;
    wobble: number;
    pitch: number;
}

/** A position in one layout; `y` is rem from the map's top. */
export interface Spot {
    x: Across;
    y: number;
}

/** A point on the map, in both layouts: the tree (≥48em, tablets and up) and narrow (phones). */
export type Point = Record<Layout, Spot>;

export const NODE_KIND = {
    START: 'start',
    STOP: 'stop',
    DOOR: 'door',
    CLEARED: 'cleared',
    BOSS: 'boss'
} as const;

export type NodeKind = (typeof NODE_KIND)[keyof typeof NODE_KIND];

export interface RunNode {
    id: string;
    kind: NodeKind;
    line: Line;
    at: Point;
    /** The bottom edge of the node's floor, per layout: paths turn there, never under a label. */
    floorTop: Record<Layout, number>;
    floorBottom: Record<Layout, number>;
    /** The station, for start and stop nodes. */
    station?: RunStation;
    /** Whether the node sits in the outermost lane: its label may use the room to the map's edge. */
    edge: boolean;
}

/** A year in the gutter: at its first station, or between the ticks around it when none started. */
export interface YearTick {
    year: number;
    at: Point;
}

export const PATH_STYLE = {
    /** Walked: the line's color. */
    WALKED: 'walked',
    /** My own path, side roads and the future: muted. */
    QUIET: 'quiet'
} as const;

export type PathStyle = (typeof PATH_STYLE)[keyof typeof PATH_STYLE];

/** A path between nodes, as points joined by straight horizontal or vertical runs. */
export interface RunPath {
    line: Line;
    style: PathStyle;
    points: Point[];
}

/** One point on the sprite's road; it rests at nodes. */
export interface WalkStep {
    at: Point;
    /** The node the sprite rests at here, if any. */
    rest?: string;
}

export interface RunMap {
    nodes: RunNode[];
    paths: RunPath[];
    /** Where the sprite stands without animation: on my path, at the newest floor. */
    sprite: Point;
    /** The road the sprite walks as the page scrolls: every node in time order, then Contact. */
    walk: WalkStep[];
    /** One tick per year, first to last. */
    years: YearTick[];
    /** The map's height in rem, per layout. */
    height: Record<Layout, number>;
    laneCount: number;
}
