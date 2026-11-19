/** What ordering needs to know about a stop on the map. */
export interface Ordered {
    /** "YYYY-MM". */
    start: string;
    line: string;
}

/**
 * Stations in time order, as the map walks them and as station pages step through them. Stations
 * that start the same month are ordered so the one on the line the next station continues comes
 * last: the run then flows into the next stop instead of doubling back across the map. Pure.
 */
export function orderStations<T extends Ordered>(stations: readonly T[]): T[] {
    const sorted = [...stations].sort((a, b) => a.start.localeCompare(b.start));

    return sorted.map((station, i) => {
        const group = sorted.filter((other) => other.start === station.start);

        if (group.length < 2) {
            return station;
        }

        const next = sorted.find((other) => other.start > station.start);
        const continues = (s: T): number => (next && s.line === next.line ? 1 : 0);
        const ordered = [...group].sort((a, b) => continues(a) - continues(b));

        return ordered[i - sorted.indexOf(group[0])];
    });
}
