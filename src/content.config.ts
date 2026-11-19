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

/** A line of a recorded terminal session: what was typed, or what came back. */
const transcriptLine = z.object({ input: z.boolean().default(false), text: z.string() });

/**
 * A station's own page (`/[lang]/work/[id]/`): a short case study. The id matches its station in
 * `stations.json`, which already holds the name, line and dates. Copy comes from the owner's
 * interview; every field is in both languages.
 */
const work = defineCollection({
    loader: file('src/content/work.json'),
    schema: z.object({
        /** What I owned, in one or two sentences: the page's lead. */
        owned: localized,
        description: localized,
        links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
        /** Why it exists, one paragraph per entry. */
        problem: z.array(localized).min(1),
        decisions: z.array(z.object({ title: localized, why: localized })).min(1),
        /** The main artifact: a recorded session, or media still to come (a sized empty slot). */
        proof: z.discriminatedUnion('kind', [
            z.object({ kind: z.literal('transcript'), lines: z.array(transcriptLine).min(1), caption: localized }),
            z.object({
                kind: z.literal('media'),
                src: z.string().optional(),
                alt: localized,
                caption: localized,
                /** Width over height, so the slot keeps its size before the media loads. */
                ratio: z.number().positive()
            })
        ]),
        /** What was hard, or failed first, and what changed because of it. */
        hard: z.array(localized).min(1),
        now: localized
    })
});

export const collections = { stations, work };
