// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rename, rmdir } from 'node:fs/promises';

const LOCALES = ['en', 'es'];

/**
 * Cloudflare serves the nearest `404.html` above a missing path, so each language gets its own:
 * Astro writes `/en/404/index.html`, and this moves it to `/en/404.html`.
 */
/** @type {import('astro').AstroIntegration} */
const localized404 = {
    name: 'localized-404',
    hooks: {
        'astro:build:done': async ({ dir }) => {
            for (const lang of LOCALES) {
                const folder = new URL(`${lang}/404/`, dir);

                await rename(new URL('index.html', folder), new URL(`${lang}/404.html`, dir));
                await rmdir(folder);
            }
        }
    }
};

export default defineConfig({
    site: 'https://zjaaal.dev',
    output: 'static',
    trailingSlash: 'always',
    i18n: {
        locales: LOCALES,
        defaultLocale: 'en',
        routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false }
    },
    integrations: [
        localized404,
        sitemap({
            filter: (page) => page !== 'https://zjaaal.dev/' && !page.includes('/404/'),
            i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } }
        })
    ]
});
