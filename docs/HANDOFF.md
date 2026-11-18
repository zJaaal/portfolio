# Handoff

Where the rebuild stands, and what comes next. Update this at the end of every working session.

_Last updated: 2026-11-18_

## Live now

[zjaaal.dev](https://zjaaal.dev) serves a **work-in-progress home**. It has:

- the portrait, name, title and bio;
- three parallel lines descending to an "under construction" stop;
- the motto as the end of the line.

It is available in English (`/en/`) and Spanish (`/es/`). `/` picks the visitor's language from the saved cookie, then the browser.

- **Deploy:** Cloudflare Workers Builds deploys `main`. PR branches get preview versions. GitHub Actions (`.github/workflows/site.yml`) runs `pnpm check` and `pnpm build`.
- **Domain and email:** `zjaaal.dev` is a Worker custom domain (`wrangler.jsonc`). Email Routing for `me@zjaaal.dev` is still to be enabled by the owner.

## Decided

- **Direction: Line Diagram.** The career is a transit line. The contract is in `.impeccable/surfaces/src-pages-lang-index-astro.md`, and the rules are in `DESIGN.md`.
  - **Lines:** three parallel lines with identity colors: dotCMS (purple), tooling (teal), independent (amber). They start at the portrait.
  - **Time and space:** the lines are coherent in time and space. The long axis is real time, each line starts on its real start date, each station sits on its real date, and "now" is just before the Contact terminus. The dates come from the owner's PRs and are recorded in `PRODUCT.md` (local only).
  - **Origin:** the line starts before dotCMS: Venezuela, electronics, learning to program in 2020, react-scroll-utilities, Buenos Aires, then dotCMS.
  - **Termini:** About starts the line, and Contact ends it with the motto.
  - **Level select:** each station opens its own page (`/[lang]/work/[slug]`). The map shrinks into a sticky mini-map with the sprite at the current station, and each page ends with previous and next stops. On phones the stops sit in a bottom bar.
  - **Sprite:** a 10×12 pixel-art placeholder of the owner rides the line. The final art (and a pixel portrait) is still to be made. For now the portrait is the GitHub avatar pixelated.
  - **Responsive:** horizontal map at ≥1280px; three vertical rails at 640–1279 and below 640.
- **Copy:** approved so far: bio, under-construction text, motto (both languages). Every other string needs owner review.
- **Icons:** Material Symbols Rounded, inlined as SVG paths (`src/shared/constants.ts`).
- **SEO and GEO:** canonical, `hreflang` with `x-default`, Open Graph, Person JSON-LD, sitemap, `robots.txt` (AI crawlers welcome), and `/llms.txt`.

## Next (one section at a time; the owner reviews copy after each)

1. **The map:**
   - stations as a content collection (`src/content/`) with dates and lines, and positions computed from the dates;
   - the horizontal desktop map and the phone/tablet rails;
   - the origin segment and the sprite.

   Prototypes: `.impeccable/mocks/specimen/home.html` and `station.html` (local only, gitignored).
2. **About:** the origin story, how I work (three or four behavioral sentences, no soft-skills list), and off the clock (guitar, metalcore, Zelda, Terraria, roguelikes).
3. **Station pages:** Content Drive, UVE + SDKs, New Edit Content, Content Types fields, Template Builder, Artemis, Che Bondi, tooling. Each has "what I owned", the problem, key decisions, media and links.
4. **Contact:** `me@zjaaal.dev`, GitHub, LinkedIn (`https://www.linkedin.com/in/jalinson-diaz/`); add LinkedIn to the JSON-LD `sameAs`.
5. **Hardening:**
   - an edge Worker for `/` locale negotiation;
   - Vitest (locale parity, utils);
   - Playwright and axe on the built pages;
   - a page-weight budget;
   - ESLint and Prettier as in CODE_STANDARDS;
   - a Spanish 404.

## Waiting on the owner

- **Media:** the Che Bondi screen recording, and dotCMS screenshots (Content Drive, UVE, Content Types, Template Builder).
- **Links:** URLs of the UVE and SDK blog posts.
- **Sprite and portrait:** who makes the pixel art (the owner in Aseprite, a commission, or code placeholders).
- **Email:** enable Email Routing for `me@zjaaal.dev`.

## Gotchas

- **Node:** run `nvm use` (Node 24) first. Corepack with pnpm 12 fails on Node 22.
- **Language switch:** it was a two-station track, and the owner found it confusing; it is now a segmented `EN | ES` pill.
- **`pnpm deploy`:** a pnpm built-in that shadows any script with that name. The manual deploy script is `pnpm release`.
- **`PRODUCT.md`:** local only (gitignored). It was purged from `main`'s history on 2026-11-18. GitHub still keeps PR #2's original commit under the pull request, and only GitHub Support can remove that.
- **Private repos:** Che Bondi (`project-millennium-falcon`) and `dotcms-scripts` are private, so never link them.
