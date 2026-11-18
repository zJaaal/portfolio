import { DOT_GAP_REM, DOT_REM, NODE_SIZE_REM } from '../shared/constants';
import { LAYOUT, type Across, type Layout, type Point, type RunNode, type RunPath, type Spot } from '../shared/models';
import { acrossCss, downCss, span } from './css';

export const AXIS = { ACROSS: 'across', DOWN: 'down' } as const;

export type Axis = (typeof AXIS)[keyof typeof AXIS];

/** Where one straight run sits, in one layout: start corner, the fixed coordinate, and length. */
export interface RunBox {
    left: string;
    top: string;
    length: string;
}

export interface Segment {
    axis: Axis;
    box: Record<Layout, RunBox>;
}

export type Corner = Record<Layout, { x: string; y: string }>;

const LAYOUTS = [LAYOUT.DESK, LAYOUT.NARROW] as const;

/** An across position that may carry an extra offset in rem (a road trimmed short of a node). */
interface Side {
    x: Across;
    shift: number;
}

function sideCss({ x, shift }: Side): string {
    const base = acrossCss(x);

    if (shift === 0) {
        return base;
    }

    const inner = base.startsWith('calc(') ? base.slice('calc('.length, -1) : base;

    return `calc(${inner} + ${shift}rem)`;
}

/** Which side of `b` the point `a` is on, across the map: -1 left, 1 right. Pure. */
function acrossOrder(a: Across, b: Across): number {
    const keys = (x: Across): number[] => [x.pct, x.pitch, x.wobble, x.trunk];
    const [ka, kb] = [keys(a), keys(b)];
    const i = ka.findIndex((value, k) => value !== kb[k]);

    return i === -1 ? 0 : Math.sign(ka[i] - kb[i]);
}

/** How far a road stops short of a node's center: its radius, then half a pixel step of air. */
function trim(node: RunNode | undefined, layout: Layout): number {
    return node ? NODE_SIZE_REM[node.kind][layout] / 2 + (DOT_REM + DOT_GAP_REM) / 2 : 0;
}

function samePoint(a: Point, b: Point): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

function box(axis: Axis, a: Spot, b: Spot, trimA: number, trimB: number): RunBox | null {
    if (axis === AXIS.ACROSS) {
        const direction = acrossOrder(b.x, a.x);
        const { start, length } = span(
            sideCss({ x: a.x, shift: direction * trimA }),
            sideCss({ x: b.x, shift: -direction * trimB })
        );

        return { left: start, top: downCss(a.y), length };
    }

    const [trimTop, trimBottom] = a.y < b.y ? [trimA, trimB] : [trimB, trimA];
    let top = Math.min(a.y, b.y) + trimTop;
    let bottom = Math.max(a.y, b.y) - trimBottom;
    // A trimmed run is cut to whole pixel steps, so its pixels stay evenly spaced; the node side gives way.
    const step = DOT_REM + DOT_GAP_REM;
    const extra = trimTop + trimBottom > 0 ? (bottom - top) % step : 0;

    if (trimTop > 0 && trimBottom > 0) {
        top += extra / 2;
        bottom -= extra / 2;
    } else if (trimTop > 0) {
        top += extra;
    } else {
        bottom -= extra;
    }

    return bottom - top < 0 ? null : { left: acrossCss(a.x), top: downCss(top), length: downCss(bottom - top) };
}

/**
 * A path as straight runs and the corners between them. A pair of points at the same height is a
 * run across; anything else is a run down. Runs stop just outside any node they reach, so a node
 * never covers part of a pixel. Pure.
 */
export function toSegments(path: RunPath, nodes: readonly RunNode[]): { segments: Segment[]; corners: Corner[] } {
    const nodeAt = (point: Point): RunNode | undefined => nodes.find((node) => samePoint(node.at, point));
    const pairs = path.points.slice(1).map((point, i) => [path.points[i], point] as const);
    const segments = pairs.flatMap(([a, b]): Segment[] => {
        const axis = a.desk.y === b.desk.y && a.narrow.y === b.narrow.y ? AXIS.ACROSS : AXIS.DOWN;
        const [nodeA, nodeB] = [nodeAt(a), nodeAt(b)];
        const boxes = LAYOUTS.map((layout) =>
            box(axis, a[layout], b[layout], trim(nodeA, layout), trim(nodeB, layout))
        );

        return boxes.every(Boolean) ? [{ axis, box: { desk: boxes[0]!, narrow: boxes[1]! } }] : [];
    });
    const corners = path.points
        .slice(1, -1)
        .filter((point) => !nodeAt(point))
        .map(
            (point: Point): Corner => ({
                desk: { x: acrossCss(point.desk.x), y: downCss(point.desk.y) },
                narrow: { x: acrossCss(point.narrow.x), y: downCss(point.narrow.y) }
            })
        );

    return { segments, corners };
}

export { LAYOUT };
