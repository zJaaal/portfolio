import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE_S, SCROLL_KEY } from '../constants';
import { prefersReducedMotion } from './motion';
import { go } from './navigate';

/**
 * Remembers the language the visitor picks, so the next visit to "/" lands there. The pill's thumb
 * slides toward the new language as the page dissolves into it (the page transition every
 * navigation gets) while the header holds still. Nothing delays the navigation.
 */
for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-locale-link]')) {
    link.addEventListener('click', (event) => {
        document.cookie = `${LOCALE_COOKIE}=${link.hreflang}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_S}; samesite=lax`;

        const pill = link.closest<HTMLElement>('[data-current]');
        const newTab = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

        if (!pill || newTab || link.hasAttribute('aria-current')) {
            return;
        }

        // The other language opens where the visitor was (Layout restores it before first paint).
        try {
            sessionStorage.setItem(SCROLL_KEY, String(Math.round(scrollY)));
        } catch {
            // ignoreStorageBlocked: it opens at the top
        }

        if (prefersReducedMotion()) {
            return;
        }

        // The thumb starts sliding and the page changes at once; nothing waits for the slide.
        event.preventDefault();
        pill.dataset.current = link.hreflang;
        go(link.href, 'lang');
    });
}

// Back from the new page out of the back/forward cache: this page is as it was left, so put the
// pill back on its own language.
window.addEventListener('pageshow', (event) => {
    if (!event.persisted) {
        return;
    }

    for (const pill of document.querySelectorAll<HTMLElement>('[data-current]')) {
        const current = pill.querySelector<HTMLAnchorElement>('[aria-current]');

        if (current) {
            pill.dataset.current = current.hreflang;
        }
    }
});
