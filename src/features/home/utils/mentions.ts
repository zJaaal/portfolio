import type { Line } from '../shared/models';

/** A piece of a role: plain text, or the name of another station, set in that station's line color. */
export interface RolePart {
    text: string;
    line?: Line;
    /** The station's id, to link to its node. */
    id?: string;
}

/**
 * Splits a role into plain text and mentions of other stations ("cornerstone of Artemis"), so a
 * mention can take its station's line color. Longer names win when two overlap. Pure.
 */
export function splitMentions(role: string, stations: readonly { name: string; line: Line; id?: string }[]): RolePart[] {
    const named = stations.filter(({ name }) => name.length > 0 && role.includes(name));

    if (named.length === 0) {
        return [{ text: role }];
    }

    const byName = new Map(named.map(({ name, line, id }) => [name, { line, id }]));
    const escaped = [...byName.keys()]
        .sort((a, b) => b.length - a.length)
        .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escaped.join('|')})`);

    return role
        .split(pattern)
        .filter((text) => text.length > 0)
        .map((text) => (byName.has(text) ? { text, ...byName.get(text) } : { text }));
}
