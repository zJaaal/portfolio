import { orderStations, type Ordered } from '../../../shared/utils/order';

/** The stops on either side of one station, in the map's order. Null at either end. Pure. */
export function neighbors<T extends Ordered & { id: string }>(
    stations: readonly T[],
    id: string
): { previous: T | null; next: T | null } {
    const ordered = orderStations(stations);
    const i = ordered.findIndex((station) => station.id === id);

    return {
        previous: i > 0 ? ordered[i - 1] : null,
        next: i >= 0 && i < ordered.length - 1 ? ordered[i + 1] : null
    };
}
