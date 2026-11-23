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
        /** The opening line, set large: what it is, in plain words. */
        headline: localized,
        /** What I owned, in one or two sentences: the page's lead under the headline. */
        owned: localized,
        description: localized,
        /** Key features, a few words each: what it does, for a one-glance skim under the opening. */
        features: z.array(localized).min(1),
        links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
        /** Why it exists, one paragraph per entry. */
        problem: z.array(localized).min(1),
        decisions: z.array(z.object({ title: localized, why: localized })).min(1),
        /** The main artifact: a recorded session, or media still to come (a sized empty slot). */
        proof: z.discriminatedUnion('kind', [
            z.object({ kind: z.literal('transcript'), lines: z.array(transcriptLine).min(1), caption: localized }),
            z.object({
                kind: z.literal('media'),
                /** A still image, or a looping video's poster. Paths are under `public/`. */
                src: z.string().optional(),
                /** A short muted loop of the work, as MP4 (H.264) and WebM (VP9); `src` is its poster. */
                // webm only where it comes out smaller than the mp4; the mp4 always plays.
                video: z.object({ mp4: z.string(), webm: z.string().optional() }).optional(),
                /** Where it was recorded, shown in the screen's bar (e.g. "demo.dotcms.com"). */
                source: z.string().optional(),
                alt: localized,
                caption: localized,
                /** Width over height, so the slot keeps its size before the media loads. */
                ratio: z.number().positive()
            })
        ]),
        /** What was hard, or failed first, and what changed because of it. */
        hard: z.array(localized).min(1),
        /** My own line, set large as the opening of the section it belongs to (and not repeated there). */
        punchline: z.object({ section: z.enum(['problem', 'hard']), text: localized }).optional(),
        /** What went right, when the hard part turned into something good. It gets the same room. */
        win: z.array(localized).optional(),
        now: localized
    })
});

export const collections = { stations, work };
