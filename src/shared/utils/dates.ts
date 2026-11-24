/** Words around a date range, in the page's language. */
export interface SpanWords {
    now: string;
    since: string;
}

function monthYear(yearMonth: string, locale: string): { month: string; year: string } {
    const [year, month] = yearMonth.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, 1));
    const name = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(date).replace('.', '');

    return { month: name.charAt(0).toUpperCase() + name.slice(1), year: String(year) };
}

/** A single month, for a stop on a road: "Feb 2022" ("Feb 2022" in Spanish too). Pure. */
export function formatMonth(yearMonth: string, locale: string): string {
    const { month, year } = monthYear(yearMonth, locale);

    return `${month} ${year}`;
}

/**
 * When a station ran, for its label: "Mar – May 2023", "Nov 2023 – Jun 2025", "Jun 2025 – now",
 * or "since Nov 2023" for finished work that still gets updates. The year is said once when both
 * ends share it. Pure.
 */
export function formatSpan(
    span: { start: string; end?: string; ongoing: boolean },
    locale: string,
    words: SpanWords
): string {
    const from = monthYear(span.start, locale);

    if (span.ongoing) {
        return `${from.month} ${from.year} – ${words.now}`;
    }

    if (!span.end) {
        return `${words.since} ${from.month} ${from.year}`;
    }

    const to = monthYear(span.end, locale);

    if (span.end === span.start) {
        return `${from.month} ${from.year}`;
    }

    return from.year === to.year
        ? `${from.month} – ${to.month} ${to.year}`
        : `${from.month} ${from.year} – ${to.month} ${to.year}`;
}
