import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/** A year and month, e.g. "2023-05". The map's time axis is built from these. */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

const localized = z.object({ en: z.string().min(1), es: z.string().min(1) });

/**
 * Every stop on the route map. Dates come from the owner's PRs and repos (PRODUCT.md, Timeline),
 * and the map computes every position from them.
 */
const stations = defineCollection({
    loader: file('src/content/stations.json'),
    schema: z.object({
        line: z.enum(['dotcms', 'origin', 'independent', 'tooling']),
        start: yearMonth,
        /** Whether my part is still in progress. Finished work steps down in tone. */
        ongoing: z.boolean(),
        /** When my part ended, if known. The map only needs `ongoing`. */
        end: yearMonth.optional(),
        /** Whether the stop opens its own page (`/[lang]/work/[id]/`). Origin stops don't. */
        page: z.boolean(),
        name: localized,
        role: localized
    })
});

export const collections = { stations };
