import { GLIDE } from '../constants';

/** How long a glide of `distance` pixels lasts, in milliseconds. Pure. */
export function glideDuration(distance: number): number {
    return Math.min(GLIDE.maxMs, Math.max(GLIDE.minMs, Math.abs(distance) * GLIDE.msPerPx));
}

/** Ease in and out (cubic): starts and lands softly. `t` runs from 0 to 1. Pure. */
export function easeInOut(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
