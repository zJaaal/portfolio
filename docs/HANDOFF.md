# Handoff

Where the rebuild stands, and what comes next. Update this at the end of every working session.

_Last updated: 2026-11-23_

## Live now

[zjaaal.dev](https://zjaaal.dev) serves a **work-in-progress home**. It has:

- the portrait, name, title and bio;
- three parallel lines descending to an "under construction" stop;
- the motto as the end of the line.

It is available in English (`/en/`) and Spanish (`/es/`). `/` opens in English unless the visitor chose Spanish with the switch (saved cookie).

- **Deploy:** Cloudflare Workers Builds deploys `main`. PR branches get preview versions. GitHub Actions (`.github/workflows/site.yml`) runs `pnpm check` and `pnpm build`.
- **Domain and email:** `zjaaal.dev` is a Worker custom domain (`wrangler.jsonc`). Email Routing delivers `me@zjaaal.dev`; the address is in the home footer, the JSON-LD and `llms.txt`.

## Decided

- **Direction: Line Diagram.** The career is a transit line. The contract is in `.impeccable/surfaces/src-pages-lang-index-astro.md`, and the rules are in `DESIGN.md`.
  - **Lines:** three parallel lines with identity colors: dotCMS (purple), tooling (teal), independent (amber). They start at the portrait.
  - **Time and space:** the lines are coherent in time and space. The long axis is real time, each line starts on its real start date, each station sits on its real date, and "now" is just before the Contact terminus. The dates come from the owner's PRs and are recorded in `PRODUCT.md` (local only).
  - **Origin:** the line starts before dotCMS: Venezuela, electronics, learning to program in 2020, the move to Buenos Aires (2022-02), react-scroll-utilities, then dotCMS.
  - **Termini:** About starts the line, and Contact ends it with the motto.
  - **Level select:** each station opens its own page (`/[lang]/work/[slug]`). The map shrinks into a sticky mini-map with the sprite at the current station, and each page ends with previous and next stops. On phones the stops sit in a bottom bar.
  - **Sprite:** a 10×12 pixel-art placeholder of the owner rides the line. The final art is still to be made. The portrait is a photo shown pixelated.
  - **Responsive:** horizontal map at ≥1280px; three vertical rails at 640–1279 and below 640.
- **Copy:** approved so far: bio, under-construction text, motto (both languages). Every other string needs owner review.
- **Icons:** Material Symbols Rounded, inlined as SVG paths (`src/shared/constants.ts`).
- **SEO and GEO:** canonical, `hreflang` with `x-default`, Open Graph, Person JSON-LD, sitemap, `robots.txt` (AI crawlers welcome), and `/llms.txt`.

## Next (one section at a time; the owner reviews copy after each)

1. **The map:** merged. A roguelike run map (see the code in `features/home`): my path drops from the portrait, each work line branches off it, every road ends at Contact, and a pixel sprite walks it as the page scrolls. One fluid tree from 48em up, a column on phones. Contact is a `mailto:` link showing the address. The key (lines, next stop, line cleared) sits under the intro, before the map. Years are a gutter tick for every year 2020 to 2026 (first node of the year; years without a node sit halfway between neighbours). A cleared line's flag sits one floor below its last station. The intro has a draft "Now" line linking to the map nodes; the owner rewrites it.
   - **Open:** Station links 404 until step 3. The Playwright overlap check lives in a scratch script; it belongs in the step 5 suite.

2. **About:** built (`/[lang]/about/`, `features/about`, copy in `src/content/about.json` from the owner's interview, facts in PRODUCT.md). The motto as headline; "The road here" as a small road of icon nodes (life stops in the pickup colors, work stops in their line's color, now holds the sprite); "How I work" (four sentences); "Off the clock" as an inventory (music, video games, twisty puzzles). No personal photos (the owner's call). The home intro links to it with a button, and the portrait does too.
3. **Station pages:** shipped (PR #8). Each opens with what it is, key features and a punchline, and has a recorded demo in a replay frame (dark bezel, loading state, hashed media URLs cached a year). A new station gets a page by adding its entry to `src/content/work.json`.
4. **Contact:** `me@zjaaal.dev`, GitHub, LinkedIn (`https://www.linkedin.com/in/zjaaal/`, already in the JSON-LD `sameAs`).
5. **Hardening:**
   - an edge Worker for `/` locale negotiation;
   - Vitest (locale parity, utils);
   - Playwright and axe on the built pages;
   - a page-weight budget;
   - ESLint and Prettier as in CODE_STANDARDS.

## Waiting on the owner

- **Portrait:** the owner is taking a new photo. Swap `src/assets/portrait.jpg` (square, face centered), run `pnpm portrait` to check, ship.
- **Links:** URLs of the UVE and SDK blog posts.
- **Sprite and portrait:** who makes the sprite's final pixel art. The portrait is built from `src/assets/portrait.jpg` (cropped square) by `pnpm portrait`: replace that file, then redeploy.

## Gotchas

- **Node:** run `nvm use` (Node 24) first. Corepack with pnpm 12 fails on Node 22.
- **Language switch:** it was a two-station track, and the owner found it confusing; it is now a segmented `EN | ES` pill.
- **Transitions:** page changes use cross-document view transitions (Chrome, Safari) and `navigate.ts` for Firefox; nothing may delay a navigation, and no full-screen flicker or dither (WCAG 2.3.1). The theme switch is a stepped sweep from the toggle.
- **Dev vs prod:** the dev server 404s `/en` without the trailing slash; Cloudflare redirects it. Restart the dev server after a content-schema change (stale data store).
- **Pushing media:** large pushes over HTTPS can drop; `http.postBuffer` is raised in this repo's git config.
- **`pnpm deploy`:** a pnpm built-in that shadows any script with that name. The manual deploy script is `pnpm release`.
- **`PRODUCT.md`:** local only (gitignored). It was purged from `main`'s history on 2026-11-18. GitHub still keeps PR #2's original commit under the pull request, and only GitHub Support can remove that.
- **Private repos:** Che Bondi (`project-millennium-falcon`) and `dotcms-scripts` are private, so never link them.
