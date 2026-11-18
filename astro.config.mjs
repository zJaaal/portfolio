// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://zjaaal.dev',
    output: 'static',
    trailingSlash: 'always',
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false }
    },
    integrations: [
        sitemap({
            filter: (page) => page !== 'https://zjaaal.dev/',
            i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } }
        })
    ]
});
