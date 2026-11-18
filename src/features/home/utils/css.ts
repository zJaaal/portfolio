import type { Across } from '../shared/models';

function term(factor: number, unit: string): string {
    return factor === 0 ? '' : `${unit} * ${factor}`;
}

/**
 * A horizontal position as a CSS length. `percent` is the unit for the share of the map's width:
 * `%` where percent means the map's width (left, polygon), `cqw` where it wouldn't (distances). Pure.
 */
export function acrossCss(x: Across, percent = '%'): string {
    const terms = [
        term(x.trunk, 'var(--trunk)'),
        x.pct === 0 ? '' : `${x.pct}${percent}`,
        term(x.wobble, 'var(--route-wobble)'),
        term(x.pitch, 'var(--route-lane-pitch)')
    ].filter((part) => part !== '');

    return terms.length === 0 ? '0rem' : `calc(${terms.join(' + ')})`;
}

/** A vertical position as a CSS length. Pure. */
export function downCss(y: number): string {
    return `${Number(y.toFixed(4))}rem`;
}

/** The start and length of a straight run between two positions, in either order. Pure. */
export function span(a: string, b: string): { start: string; length: string } {
    return { start: `min(${a}, ${b})`, length: `max(${a} - ${b}, ${b} - ${a})` };
}
