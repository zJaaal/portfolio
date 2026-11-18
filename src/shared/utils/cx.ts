/**
 * The scoped class names for a list of CSS Module class keys, joined for a `class` attribute.
 * Falsy entries are skipped, so conditions read inline: `cx(styles, 'node', live && 'live')`. Pure.
 */
export function cx(styles: Readonly<Record<string, string>>, ...names: (string | false | null | undefined)[]): string {
    return names
        .filter((name): name is string => Boolean(name))
        .map((name) => styles[name] ?? '')
        .filter(Boolean)
        .join(' ');
}
