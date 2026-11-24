/** Whether the visitor asked for less motion; transitions check it before they run. */
export function prefersReducedMotion(): boolean {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
