# Architecture

This is a static Astro site served from Cloudflare (Workers static assets) in two languages and two themes. The layout follows the feature-folder style of Che Bondi and dotCMS Content Drive. The rules for what goes in each file are in [CODE_STANDARDS.md](CODE_STANDARDS.md).

```
portfolio/
├── PRODUCT.md                 Product truth: who it's for, what it shows, constraints
├── DESIGN.md                  Binding visual rules; values live in src/styles/tokens.json
├── docs/                      ARCHITECTURE.md, CODE_STANDARDS.md
├── scripts/                   build-tokens.ts, check-contrast.ts, check-budget.ts (+ constants.ts)
├── worker/                    The edge entry: picks the locale for "/" (see Locale routing)
├── public/                    Files served as-is: favicon, robots.txt, fonts
└── src/
    ├── pages/                 Routes. Thin files that read params and render a feature
    │   ├── [lang]/index.astro
    │   └── [lang]/work/[slug].astro
    ├── features/              One folder per page or section group
    │   └── <feature>/
    │       ├── components/    Used only by this feature, one folder each
    │       ├── utils/         Pure functions for this feature
    │       └── shared/        constants.ts, models.ts
    ├── shared/                Used by two or more features
    │   ├── components/        Layout, Header, LangSelect, ThemeToggle, Video, …
    │   ├── scripts/           The only browser side effects: theme, locale memory, the map's walk, jumps to map nodes
    │   ├── utils/             Pure helpers: locale negotiation, localized paths
    │   ├── constants.ts
    │   └── models.ts
    ├── content/               Collections: stations.json (the map), work.json (one case study per station page)
    ├── content.config.ts      Collection schemas (zod)
    ├── i18n/                  en.json, es.json, t() helper, locale config
    ├── styles/                tokens.json (source), tokens.css (generated), global.css, fonts.css
    └── test/                  Test-only helpers; only tests import from here
```

Features: `home` (the intro and the run map) `work` (station pages) and `lost` (the 404, one per language: the build moves `/[lang]/404/index.html` to `/[lang]/404.html`, since Cloudflare serves the nearest `404.html`). Pieces both use live in `shared/`: the pixel icons, the sprite, the station order (`utils/order.ts`) and date spans (`utils/dates.ts`).

## Component folder

```
WorkCard/
├── WorkCard.astro          Frontmatter reads props and content; template lays out
├── WorkCard.module.css     Its styles, scoped as a CSS Module
├── WorkCard.models.ts      Props, only when another file needs them
├── WorkCard.constants.ts   Named numbers used only here (only if any)
├── WorkCard.utils.ts       Pure logic used only here (only if any)
├── WorkCard.test.ts        Tests of its utils (only if any)
└── index.ts                export { default as WorkCard } from './WorkCard.astro';
```

## Dependencies point inward

```
pages → features → shared → i18n, styles, content
```

- **Features are isolated.** A feature never imports another feature. Anything two features need is promoted to `shared/`.
- **Pages stay thin.** `pages/` imports only feature entry points and layouts.
- **`utils/` is pure.** No `Astro` global, no browser APIs, no i18n calls. Utils take values in and return data, and the caller translates.

## Locale routing

- **URLs:** every page exists at `/en/…` and `/es/…`, using Astro i18n with `prefixDefaultLocale: true`. Each page links its twin with `<link rel="alternate" hreflang>`, and both share an `x-default`.
- **`/` is decided at the edge.** A small Worker (`worker/`, with `run_worker_first` for `/` only) picks the locale: the `lang` cookie if the visitor chose a language with the switch, otherwise English. The browser's language is deliberately ignored: English is the default (owner's call, 2026-11-18).

  It then redirects with `302`. All other paths are static assets served without the Worker. With no Worker (for example, local `astro preview`), `/` renders a plain page linking both languages.
- **Remembering:** the language selector is a real link to the twin page. Clicking it also sets the `lang` cookie (`shared/scripts/locale.ts`), so the next visit to `/` lands in the chosen language.

## Theme

- **Default:** the system setting (`prefers-color-scheme`).
- **Override:** the toggle sets `data-theme="light|dark"` on `<html>` and stores it in `localStorage`. A blocking inline script in `<head>` (from `shared/scripts/theme.ts`) applies it before first paint, so there's no flash.
- **Tokens:** both themes are defined in `tokens.json` and emitted to `tokens.css` as `:root` + `@media (prefers-color-scheme)` + `[data-theme]` blocks by `scripts/build-tokens.ts`. Never edit `tokens.css` by hand.

## Commands

| What | Command |
|---|---|
| Dev server | `pnpm dev` |
| Build | `pnpm build` (runs `build-tokens` first) |
| Everything CI runs | `pnpm check`: `astro check`, ESLint, Prettier, Vitest, contrast, budget, axe |
| Deploy | `pnpm deploy` (`wrangler deploy`) |

pnpm comes from Corepack, and the Node version is pinned in `.nvmrc` (24 LTS).
