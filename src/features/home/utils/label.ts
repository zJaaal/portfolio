import {
    LABEL_GAP_REM,
    LABEL_METRICS,
    LABEL_PADDING_REM,
    META_LINE_REM,
    ORIGIN_NAME_LINE_REM,
    TAG_LINE_REM
} from '../shared/constants';
import type { LabelText, Layout } from '../shared/models';

/** How many lines `text` wraps to at `chars` characters per line, wrapping at spaces. Pure. */
export function wrappedLines(text: string, chars: number): number {
    let lines = 1;
    let used = 0;

    for (const word of text.split(/\s+/).filter(Boolean)) {
        const needed = used === 0 ? word.length : used + 1 + word.length;

        if (needed <= chars) {
            used = needed;
            continue;
        }

        lines += used === 0 ? 0 : 1;
        // A word longer than a line breaks across lines (hyphens and long names).
        lines += Math.floor(Math.max(0, word.length - 1) / chars);
        used = word.length % chars || chars;
    }

    return lines;
}

/**
 * A label's height in rem, estimated generously from its text: the narrowest width it can get and
 * wide average glyphs, so the floor around it only ever errs on the tall side. Pure.
 */
export function labelHeight(text: LabelText, layout: Layout, isOrigin: boolean): number {
    const metrics = LABEL_METRICS[layout];
    const nameLine = isOrigin ? ORIGIN_NAME_LINE_REM : metrics.nameLine;
    const nameChars = isOrigin ? metrics.originChars : metrics.nameChars;
    const blocks = [
        wrappedLines(text.name, nameChars) * nameLine,
        ...(text.dates ? [wrappedLines(text.dates, metrics.metaChars) * META_LINE_REM] : []),
        wrappedLines(text.role, metrics.metaChars) * META_LINE_REM,
        ...(text.tag ? [TAG_LINE_REM] : [])
    ];

    return blocks.reduce((sum, block) => sum + block, 0) + LABEL_GAP_REM * (blocks.length - 1) + LABEL_PADDING_REM;
}
