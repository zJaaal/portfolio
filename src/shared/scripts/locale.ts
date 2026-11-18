import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE_S } from '../constants';

/** Remembers the language the visitor picks, so the next visit to "/" lands there. */
for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-locale-link]')) {
    link.addEventListener('click', () => {
        document.cookie = `${LOCALE_COOKIE}=${link.hreflang}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_S}; samesite=lax`;
    });
}
