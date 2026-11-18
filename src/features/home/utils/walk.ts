import { WALK } from '../shared/constants';

/** A point in the map's own pixels. */
export interface Px {
    x: number;
    y: number;
}

/** Where the sprite is on the road, and how fast it moves along it (pixels per second, signed). */
export interface Stride {
    distance: number;
    velocity: number;
}

/** The distance along the road at each point. Pure. */
export function distances(points: readonly Px[]): number[] {
    let total = 0;

    return points.map((point, i) => {
        if (i > 0) {
            total += Math.hypot(point.x - points[i - 1].x, point.y - points[i - 1].y);
        }

        return total;
    });
}

/** The point at `distance` along the road. Pure. */
export function pointAt(points: readonly Px[], along: readonly number[], distance: number): Px {
    const last = points.length - 1;

    if (distance <= 0 || last < 1) {
        return points[0];
    }

    const i = along.findIndex((d) => d >= distance);

    if (i === -1) {
        return points[last];
    }

    const leg = along[i] - along[i - 1] || 1;
    const share = (distance - along[i - 1]) / leg;
    const from = points[i - 1];
    const to = points[i];

    return { x: from.x + (to.x - from.x) * share, y: from.y + (to.y - from.y) * share };
}

/**
 * The node the sprite walks to: the last one above the reading line, the first one before any,
 * and the last one (Contact) once the page can't scroll further. Returns its distance. Pure.
 */
export function restTarget(rests: readonly { y: number; distance: number }[], readingY: number, atEnd: boolean): number {
    if (atEnd) {
        return rests[rests.length - 1].distance;
    }

    const passed = rests.filter((rest) => rest.y <= readingY);

    return (passed.length === 0 ? rests[0] : passed[passed.length - 1]).distance;
}

/**
 * One frame of walking toward `target`: the speed eases up from a stop and eases out as the node
 * nears, so a long way is a quick run and a short one a stroll. Lands exactly on the target. Pure.
 */
export function advance(stride: Stride, target: number, seconds: number): Stride {
    const remaining = target - stride.distance;

    if (remaining === 0) {
        return { distance: target, velocity: 0 };
    }

    const direction = Math.sign(remaining);
    const dt = Math.min(seconds, WALK.maxFrameSeconds);
    const wanted = direction * Math.min(WALK.maxSpeed, Math.max(WALK.minSpeed, Math.abs(remaining) * WALK.brake));
    // Turning around starts from a stop.
    const current = Math.sign(stride.velocity) === -direction ? 0 : stride.velocity;
    const velocity = current + (wanted - current) * (1 - Math.exp(-dt * WALK.accelerate));
    const distance = stride.distance + velocity * dt;

    return Math.sign(target - distance) === direction ? { distance, velocity } : { distance: target, velocity: 0 };
}
