/**
 * Splits a label before its last word, e.g. so an icon can stay on the same line as that word.
 * `lead` keeps its trailing space; a one-word label has an empty `lead`.
 */
export function splitLast(label: string): { lead: string; last: string } {
    const cut = label.lastIndexOf(' ') + 1;

    return { lead: label.slice(0, cut), last: label.slice(cut) };
}
