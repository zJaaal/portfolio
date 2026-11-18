import {
    BOSS_REM,
    FLOOR_CLEARANCE_REM,
    FLOOR_MIN_REM,
    FUTURE_FLOOR_REM,
    LABEL_DROP_REM,
    LANE_START_PCT,
    LANE_STEP_PCT,
    NODE_REM,
    NODE_SIZE_REM,
    TAG_LINE_REM,
    LABEL_PADDING_REM
} from '../shared/constants';
import {
    LAYOUT,
    LINE,
    NODE_KIND,
    PATH_STYLE,
    type Across,
    type LabelText,
    type Layout,
    type Line,
    type Point,
    type RunMap,
    type RunNode,
    type RunPath,
    type RunStation,
    type WalkStep,
    type WorkLine
} from '../shared/models';
import { labelHeight } from './label';

const AT_TRUNK: Across = { trunk: 1, pct: 0, wobble: 0, pitch: 0 };
const LAYOUTS = [LAYOUT.DESK, LAYOUT.NARROW] as const;

/** A point from one function per layout. */
function both(spot: (layout: Layout) => Point[Layout]): Point {
    return { desk: spot(LAYOUT.DESK), narrow: spot(LAYOUT.NARROW) };
}

/** `a`'s height with `b`'s horizontal position, in both layouts. */
function under(a: Point, b: Point): Point {
    return both((layout) => ({ x: b[layout].x, y: a[layout].y }));
}

/** `point` moved to the given height per layout. */
function atDepth(point: Point, y: Record<Layout, number>): Point {
    return both((layout) => ({ x: point[layout].x, y: y[layout] }));
}

function sameAcross(a: Point, b: Point): boolean {
    return JSON.stringify([a.desk.x, a.narrow.x]) === JSON.stringify([b.desk.x, b.narrow.x]);
}

/**
 * Work lines in lane order: newest first, closest to my path. A lane only exists from its first
 * floor down, so a branch leaving my path never crosses a lane that's already there. Pure.
 */
export function laneOrder(stations: readonly RunStation[]): WorkLine[] {
    const firstStart = new Map<WorkLine, string>();

    for (const station of stations) {
        if (station.line !== LINE.ORIGIN && !firstStart.has(station.line)) {
            firstStart.set(station.line, station.start);
        }
    }

    return [...firstStart].sort(([, a], [, b]) => b.localeCompare(a)).map(([line]) => line);
}

/** Desktop lanes spread across the map; narrow lanes pack beside my path. */
function laneX(lane: number, wobble: number): Record<Layout, Across> {
    return {
        desk: { trunk: 0, pct: LANE_START_PCT + lane * LANE_STEP_PCT, wobble, pitch: 0 },
        narrow: { trunk: 1, pct: 0, wobble: 0, pitch: lane + 1 }
    };
}

/**
 * How tall a floor must be to hold its node and label with room to spare. In the tree the label
 * hangs under the node; on narrow screens it sits beside it. Pure.
 */
function floorHeight(layout: Layout, node: number, label: number): number {
    const content = layout === LAYOUT.DESK ? node + LABEL_DROP_REM + label : Math.max(node, label);

    return Math.max(FLOOR_MIN_REM, content + FLOOR_CLEARANCE_REM * 2);
}

/** Where a node sits in its floor: near the top in the tree (its label hangs below), centered otherwise. */
function nodeDepth(layout: Layout, floor: { top: number; center: number }, node: number): number {
    return layout === LAYOUT.DESK ? floor.top + FLOOR_CLEARANCE_REM + node / 2 : floor.center;
}

/** Stacks floors top to bottom; returns each floor's top, center and bottom. Pure. */
function stack(heights: readonly number[], from = 0): { top: number; center: number; bottom: number }[] {
    let top = from;

    return heights.map((height) => {
        const floor = { top, center: top + height / 2, bottom: top + height };

        top += height;

        return floor;
    });
}

interface Floors {
    stops: RunNode[];
    ends: RunNode[];
    boss: RunNode;
    height: Record<Layout, number>;
}

/**
 * Stations in time order. Stations that start the same month are ordered so the one on the line
 * the next station continues comes last: the run then flows into the next stop instead of doubling
 * back across the map. Pure.
 */
export function orderStations(stations: readonly RunStation[]): RunStation[] {
    const sorted = [...stations].sort((a, b) => a.start.localeCompare(b.start));

    return sorted.map((station, i) => {
        const group = sorted.filter((other) => other.start === station.start);

        if (group.length < 2) {
            return station;
        }

        const next = sorted.find((other) => other.start > station.start);
        const continues = (s: RunStation): number => (next && s.line === next.line ? 1 : 0);
        const ordered = [...group].sort((a, b) => continues(a) - continues(b));

        return ordered[i - sorted.indexOf(group[0])];
    });
}

/**
 * One floor per station, in time order, each tall enough for its label. The doors share one floor on
 * desktop and get a short floor each on narrow screens; Contact sits on the last floor. Pure.
 */
function placeNodes(
    stations: readonly RunStation[],
    lanes: readonly WorkLine[],
    labels: ReadonlyMap<string, LabelText>,
    bossLabel: LabelText
): Floors {
    const sorted = orderStations(stations);
    const isOrigin = (station: RunStation): boolean => station.line === LINE.ORIGIN;
    const nodeSize = (layout: Layout, station: RunStation): number =>
        isOrigin(station) ? NODE_SIZE_REM.start[layout] : NODE_REM[layout];
    const stopFloors = Object.fromEntries(
        LAYOUTS.map((layout) => [
            layout,
            stack(
                sorted.map((station) =>
                    floorHeight(
                        layout,
                        nodeSize(layout, station),
                        labelHeight(labels.get(station.id)!, layout, isOrigin(station))
                    )
                )
            )
        ])
    ) as Record<Layout, ReturnType<typeof stack>>;
    const visits = new Map<Line, number>();
    let previousYear: number | undefined;

    const stops = sorted.map((station, floor): RunNode => {
        const year = Number(station.start.slice(0, 4));
        const visit = visits.get(station.line) ?? 0;
        // A small zig-zag along each lane, so a path wanders like a run map instead of a ruler.
        const lane = station.line === LINE.ORIGIN ? null : laneX(lanes.indexOf(station.line), visit % 2 === 0 ? -1 : 1);

        visits.set(station.line, visit + 1);
        const node: RunNode = {
            id: station.id,
            kind: isOrigin(station) ? NODE_KIND.START : NODE_KIND.STOP,
            line: station.line,
            station,
            year,
            firstOfYear: year !== previousYear,
            at: both((layout) => ({
                x: lane?.[layout] ?? AT_TRUNK,
                y: nodeDepth(layout, stopFloors[layout][floor], nodeSize(layout, station))
            })),
            floorTop: { desk: stopFloors.desk[floor].top, narrow: stopFloors.narrow[floor].top },
            floorBottom: { desk: stopFloors.desk[floor].bottom, narrow: stopFloors.narrow[floor].bottom }
        };

        previousYear = year;

        return node;
    });

    const lastBottom = { desk: stopFloors.desk.at(-1)!.bottom, narrow: stopFloors.narrow.at(-1)!.bottom };
    const endFloors = {
        desk: stack(
            [floorHeight(LAYOUT.DESK, NODE_SIZE_REM.cleared.desk, TAG_LINE_REM + LABEL_PADDING_REM)],
            lastBottom.desk
        ),
        narrow: stack(
            lanes.map(() => FUTURE_FLOOR_REM),
            lastBottom.narrow
        )
    };
    const ends = lanes.map((line, index): RunNode => {
        const lastStop = stops.findLast((stop) => stop.line === line)!;
        const live = stops.some((stop) => stop.line === line && stop.station!.ongoing);
        const deskFloor = endFloors.desk[0];
        const narrowFloor = endFloors.narrow[index];

        return {
            id: `${live ? NODE_KIND.DOOR : NODE_KIND.CLEARED}-${line}`,
            kind: live ? NODE_KIND.DOOR : NODE_KIND.CLEARED,
            line,
            firstOfYear: false,
            // A door or flag sits straight below its line's last node.
            at: atDepth(lastStop.at, {
                desk: nodeDepth(LAYOUT.DESK, deskFloor, NODE_SIZE_REM.cleared.desk),
                narrow: narrowFloor.center
            }),
            floorTop: { desk: deskFloor.top, narrow: narrowFloor.top },
            floorBottom: { desk: deskFloor.bottom, narrow: narrowFloor.bottom }
        };
    });

    const bossFloors = Object.fromEntries(
        LAYOUTS.map((layout) => [
            layout,
            stack(
                [floorHeight(layout, BOSS_REM[layout], labelHeight(bossLabel, layout, false))],
                layout === LAYOUT.DESK ? endFloors.desk[0].bottom : endFloors.narrow.at(-1)!.bottom
            )[0]
        ])
    ) as Record<Layout, ReturnType<typeof stack>[number]>;
    const middle = laneX(Math.floor(lanes.length / 2), 0);
    const boss: RunNode = {
        id: 'contact',
        kind: NODE_KIND.BOSS,
        line: LINE.ORIGIN,
        firstOfYear: false,
        at: both((layout) => ({ x: middle[layout], y: nodeDepth(layout, bossFloors[layout], BOSS_REM[layout]) })),
        floorTop: { desk: bossFloors.desk.top, narrow: bossFloors.narrow.top },
        floorBottom: { desk: bossFloors.desk.bottom, narrow: bossFloors.narrow.bottom }
    };

    return { stops, ends, boss, height: boss.floorBottom };
}


/** A straight run down to the bottom edge of `from`'s floor, across there, then down onto `to`. */
function gridPath(from: RunNode, to: Point): Point[] {
    const turn = atDepth(from.at, from.floorBottom);

    return [from.at, turn, under(turn, to), to];
}

/**
 * Splits a path's straight runs down wherever another road joins it mid-run, so a pixel always
 * lands exactly on the junction instead of beside it. Pure.
 */
function splitAtJunctions(path: RunPath, junctions: readonly Point[]): RunPath {
    const points = path.points.flatMap((point, i) => {
        const next = path.points[i + 1];

        if (!next || !sameAcross(point, next)) {
            return [point];
        }

        const between = junctions.filter(
            (junction) =>
                sameAcross(junction, point) &&
                LAYOUTS.every((layout) => {
                    const [top, bottom] = [point[layout].y, next[layout].y].sort((a, b) => a - b);

                    return junction[layout].y > top && junction[layout].y < bottom;
                })
        );
        const goingDown = next.desk.y > point.desk.y;
        const ordered = between.sort((a, b) => (goingDown ? a.desk.y - b.desk.y : b.desk.y - a.desk.y));

        return [point, ...ordered];
    });

    return { ...path, points };
}

/**
 * Side roads: where the run moves on to a node on another line, a quiet crossing joins the two at
 * the floor's edge, so the sprite can walk between lines. Only the crossing is drawn; the runs down
 * belong to the lines themselves. Pure.
 */
function sideRoads({ stops }: Floors): RunPath[] {
    return stops.slice(1).flatMap((stop, i) => {
        const previous = stops[i];

        if (previous.line === stop.line || previous.kind === NODE_KIND.START) {
            return [];
        }

        const turn = atDepth(previous.at, previous.floorBottom);
        // If `previous`'s own line steps along this edge the same way first, the crossing starts
        // where that step ends, so the two roads never draw over each other.
        const ownNext = stops.slice(i + 2).find((other) => other.line === previous.line);
        const [from, step, to] = [turn, ownNext?.at ?? turn, stop.at].map(acrossOrder);
        const sameWay = ownNext !== undefined && (step - from) * (to - from) > 0 && Math.abs(step - from) < Math.abs(to - from);
        const start = sameWay ? under(turn, ownNext.at) : turn;

        return [{ line: LINE.ORIGIN, style: PATH_STYLE.QUIET, points: [start, under(turn, stop.at)] }];
    });
}

/** Where a line leaves my path: at the top edge of its first floor. */
function branchStart(first: RunNode): Point {
    return both((layout) => ({ x: AT_TRUNK, y: first.floorTop[layout] }));
}

/** The road above Contact where every door's path gathers. */
function gatherAt(floors: Floors, point: Point): Point {
    return atDepth(point, floors.boss.floorTop);
}

/**
 * Every door leads to Contact along one shared road: each door drops to the gathering row above
 * Contact, one run across joins them, and a single run drops into Contact. Pure.
 */
function gatherDoors(floors: Floors): RunPath[] {
    const { ends, boss } = floors;
    const doors = ends.filter((end) => end.kind === NODE_KIND.DOOR);
    const across = [...doors.map((door) => gatherAt(floors, door.at)), gatherAt(floors, boss.at)]
        .filter((point, i, all) => all.findIndex((other) => sameAcross(other, point)) === i)
        .sort((a, b) => acrossOrder(a) - acrossOrder(b));

    return [
        ...doors.map((door): RunPath => ({
            line: LINE.ORIGIN,
            style: PATH_STYLE.QUIET,
            points: [door.at, gatherAt(floors, door.at)]
        })),
        { line: LINE.ORIGIN, style: PATH_STYLE.QUIET, points: across },
        { line: LINE.ORIGIN, style: PATH_STYLE.QUIET, points: [gatherAt(floors, boss.at), boss.at] }
    ];
}

/** Orders points across the desktop map (lanes by percent, then wobble). */
function acrossOrder(point: Point): number {
    const { x } = point.desk;

    return x.trunk * -1 + x.pct + x.wobble * 0.01;
}

/** The paths between nodes: my path, each line's branch and run, and the way into the future. */
function drawPaths(floors: Floors, lanes: readonly WorkLine[], roads: readonly RunPath[]): RunPath[] {
    const { stops, ends, boss } = floors;
    const trunkTop: Point = both(() => ({ x: AT_TRUNK, y: 0 }));
    const branches = lanes.map((line) => {
        const first = stops.find((stop) => stop.line === line)!;

        return { line, first, start: branchStart(first) };
    });
    const paths: RunPath[] = [
        // My path, with a pixel at every branch so each line leaves it cleanly.
        {
            line: LINE.ORIGIN,
            style: PATH_STYLE.QUIET,
            points: [
                trunkTop,
                // Life stops sit on my path; naming them here lets the road stop short of each one.
                ...[...stops.filter((stop) => stop.kind === NODE_KIND.START).map((stop) => stop.at), ...branches.map(({ start }) => start)]
                    .sort((a, b) => a.desk.y - b.desk.y),
                under(boss.at, trunkTop),
                boss.at
            ]
        }
    ];

    for (const { line, first, start } of branches) {
        const own = stops.filter((stop) => stop.line === line);
        const end = ends.find((node) => node.line === line)!;
        // The line's last node leads on: into the future through a door, or to a cleared flag.
        const endStyle = end.kind === NODE_KIND.DOOR ? PATH_STYLE.QUIET : PATH_STYLE.WALKED;

        paths.push({ line, style: PATH_STYLE.WALKED, points: [start, under(start, first.at), first.at] });
        own.slice(1).forEach((stop, i) => {
            paths.push({ line, style: PATH_STYLE.WALKED, points: gridPath(own[i], stop.at) });
        });
        paths.push({ line, style: endStyle, points: gridPath(own.at(-1)!, end.at) });
    }

    paths.push(...gatherDoors(floors));

    const junctions = roads.flatMap((road) => road.points);

    return paths.map((path) => splitAtJunctions(path, junctions));
}

/**
 * The road through the run in time order. Consecutive nodes on the same line follow that line; a
 * line's first node is reached from my path along its branch; anything else crosses on a side
 * road. The sprite rests at every node. Pure.
 */
function walkRoute(floors: Floors): WalkStep[] {
    const { stops, ends, boss } = floors;
    // It enters from the portrait, so it can wait on the road above the first node too.
    const walk: WalkStep[] = [{ at: both(() => ({ x: AT_TRUNK, y: 0 })) }, { at: stops[0].at, rest: stops[0].id }];
    const pass = (points: Point[]): WalkStep[] => points.map((at) => ({ at }));

    stops.slice(1).forEach((stop, i) => {
        const previous = stops[i];
        const isFirstOfLine = stops.findIndex((other) => other.line === stop.line) === i + 1;
        const start = branchStart(stop);
        const leg =
            previous.kind === NODE_KIND.START && isFirstOfLine
                ? [start, under(start, stop.at)]
                : gridPath(previous, stop.at).slice(1, -1);

        walk.push(...pass(leg), { at: stop.at, rest: stop.id });
    });

    const last = stops.at(-1)!;
    const door = ends.find((end) => end.line === last.line && end.kind === NODE_KIND.DOOR);

    if (door) {
        walk.push(...pass([door.at, gatherAt(floors, door.at), gatherAt(floors, boss.at)]));
    }

    walk.push({ at: boss.at, rest: boss.id });

    return walk;
}

/**
 * The run map: a roguelike tree read top to bottom. My own path drops from the portrait; each work
 * line branches off it on its first floor; lines with work in progress lead to a door into the
 * future, and every door leads to Contact. Floors grow to fit their labels in the page's language,
 * and paths only turn at floor edges, so a path never runs under a label. Pure.
 */
export function buildRun(
    stations: readonly RunStation[],
    labels: ReadonlyMap<string, LabelText>,
    bossLabel: LabelText
): RunMap {
    const lanes = laneOrder(stations);
    const floors = placeNodes(stations, lanes, labels, bossLabel);
    const newest = floors.stops.at(-1)!;
    const roads = sideRoads(floors);

    return {
        nodes: [...floors.stops, ...floors.ends, floors.boss],
        // Side roads go first, so the work lines draw over them where they meet.
        paths: [...roads, ...drawPaths(floors, lanes, roads)],
        walk: walkRoute(floors),
        sprite: under(newest.at, both(() => ({ x: AT_TRUNK, y: 0 }))),
        height: floors.height,
        laneCount: lanes.length
    };
}
