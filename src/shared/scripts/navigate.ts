import { ARRIVING_KEY } from '../constants';
import { prefersReducedMotion } from './motion';

/** How the next page is reached: a new page slides in; the same page in the other language only fades. */
export type Arrival = 'page' | 'lang';

/**
 * Page transitions. Nothing waits: a link navigates at once, and only the next page animates. This
 * tells the next page how it was reached (a session flag the inline script in Layout reads before
 * first paint); Chrome and Safari animate it natively, others animate <main> (global.css).
 */
function markArrival(kind: Arrival): void {
    if (prefersReducedMotion()) {
        return;
    }

    try {
        sessionStorage.setItem(ARRIVING_KEY, kind);
    } catch {
        // ignoreStorageBlocked: the next page just appears
    }
}

/** Goes to `href` now; the next page arrives as `kind`. */
export function go(href: string, kind: Arrival): void {
    markArrival(kind);
    location.assign(href);
}

/** A plain click on a link to another page of this site. */
function isPageLink(event: MouseEvent, link: HTMLAnchorElement): boolean {
    const url = new URL(link.href, location.href);
    const samePage = url.pathname === location.pathname && url.search === location.search;

    return (
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        url.origin === location.origin &&
        !samePage &&
        !link.target &&
        !link.hasAttribute('download')
    );
}

// The browser follows the link as usual; this only tells the next page how it arrives. The language
// switch marks its own arrival (locale.ts), so it is skipped here.
document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a[href]');

    if (link instanceof HTMLAnchorElement && !link.hasAttribute('data-locale-link') && isPageLink(event, link)) {
        markArrival('page');
    }
});
