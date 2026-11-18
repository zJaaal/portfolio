# Code Standards

These rules bind everything in this repo. They are adapted from Che Bondi's `docs/frontend/CODE_STANDARDS.md`, which in turn follows the dotCMS frontend standards the owner wrote. Rules that only made sense for a React Native app (Hermes, system insets, native code, hooks) were dropped or translated for a static Astro site.

**A review comment is a rule for the whole codebase, not a note on one file.** When one is found, fix every occurrence.

- Folder layout: [ARCHITECTURE.md](ARCHITECTURE.md).
- Visual rules (tokens, type roles, color roles, motion): [DESIGN.md](../DESIGN.md).

## 1. Files have one job

| Kind | Where | Never |
|---|---|---|
| Shared types | `models.ts` (feature or shared) | Re-declared in a second file |
| Component props | `interface Props` in the component's frontmatter, or `Component.models.ts` when another file needs them | Spread across several files |
| Constants | `constants.ts` (feature or shared) | Inline literals in logic |
| Styles | `ComponentName.module.css` next to the component (a CSS Module), using token variables only | `<style>` blocks in `.astro` files, inline `style=""`, global class soup |
| Pure logic | `utils/<topic>.ts` | Inside a component's frontmatter beyond a few lines |
| Browser side effects | `shared/scripts/<topic>.ts` | Inline `<script>` bodies that do more than call one |
| Content | `src/content/` collections, or `src/i18n/*.json` for UI strings | Hardcoded copy in components |
| A component | `ComponentName/ComponentName.astro` + `index.ts` | Two components in one file |

Styles live in a CSS Module beside the component (`RunMap/RunMap.module.css`), imported as `import styles from './RunMap.module.css'`. Modules keep the scoping Astro's `<style>` gave us, and the markup file stays markup. In the template, write `class={styles.node}`; for several classes or conditions, use `cx(styles, 'node', live && 'live')` from `shared/utils/cx.ts`. Rules for modules:

- **Every selector starts with a class.** A bare `h1 {}` or `svg {}` in a module is global; give the element a class instead.
- **Global names stay global.** The few global classes (`wrap`, `meta`, `sr-only` in `global.css`) are written as plain strings in the template and as `:global(.meta)` in a module. A child component's internals are reached with `:global(...)`.
- **Inline `style` carries only build-time positions** (the map's coordinates as custom properties), never visual styling.
- The only exception is `src/pages/index.astro`, the `/` redirect page, which inlines its few rules because it must work on its own. A component's frontmatter reads props, content and translations, then the template lays them out. Anything more moves to a util.

## 2. Types

- **TypeScript strict** (`astro/tsconfigs/strict`). `astro check` must pass.
- **No enums.** Use `as const` objects and derive the union:

  ```ts
  export const THEME = { LIGHT: 'light', DARK: 'dark' } as const;
  export type Theme = (typeof THEME)[keyof typeof THEME];
  ```

- **No `any`.** Use `unknown` and narrow it.
- **Content has a schema.** Every collection has a `zod` schema in `src/content.config.ts`, so a case study missing a field fails the build instead of rendering a hole.
- Let TypeScript infer obvious types. Annotate parameters, the return types of exported functions, and public APIs.

## 3. No magic numbers

Every number that means something gets a named constant with its unit in the name, for example `THEME_STORAGE_KEY`, `HERO_VIDEO_MAX_MB`, `LOCALE_COOKIE_MAX_AGE_S`.

- **In CSS:** every spacing, size, radius, color, duration and easing comes from a token variable (`var(--space-4)`, `var(--motion-enter)`). Raw values and hex colors are allowed only in `src/styles/tokens.json`.
- **`rem`, never `px`** (owner, 2026-11-18): sizes scale with the reader's font size. The only `px` allowed are 1px hairlines and borders. Media queries use `em`.
- **Allowed literals:** `0`, `1`, `-1` as an index or identity, `100` for percent conversion, `1px` hairlines, and array positions.

## 4. Readability

- **No nested loops.** Index or group first (`Map`, `Object.groupBy`), then make one pass.
- **Name conditions.** A boolean with more than two terms becomes a well-named helper (`isFeatured(entry)`).
- **No dense one-liners.** Break a chained ternary into a helper with early returns. In templates, compute values in the frontmatter, not inline in the markup.
- **Pass objects, not spread fields.**
- Functions do one thing and fit on one screen.
- **Comments and JSDoc:** comments explain *why*. Exported utils get JSDoc.

## 5. Performance

The site is static HTML. Every byte of JavaScript and every font file has to justify itself.

- **Zero JS by default.** No UI framework runtime. The only client scripts are the theme toggle, the language selector and locale remembering, and the map's walking sprite, each a small module in `shared/scripts/`, inlined where it must run before paint (theme) so there is no flash.
- **Budgets** (checked in CI on the built `dist/`):
  - each page under 50 KB of HTML + CSS + JS (gzip), excluding media;
  - at most 2 font files per page on first load.

  The numbers live in `scripts/constants.ts`.
- **Fonts:**
  - self-hosted `woff2`, subset to Latin + Latin Extended (Spanish accents);
  - `font-display: swap`;
  - the body face is preloaded. No Google Fonts CSS: it was 485 KB on the old site.
- **Images:** `astro:assets` (`<Image>` / `<Picture>`) with explicit width and height, AVIF/WebP, and lazy loading below the fold. No hotlinked images: the old site loaded logos from 15 other sites, and 4 of them broke.
- **Video:** `preload="none"`, a poster frame, `muted playsinline`, no autoplay unless reduced motion is off and the video is visible. Ship both WebM and MP4.
- Static data (the project list, locale tables) is computed once at build time, never at runtime.

## 6. Browser code and errors

- **Browser APIs live at the edges.** `localStorage`, `matchMedia`, `navigator.languages` and cookies are read only inside `shared/scripts/*`. Each read is wrapped, because storage can throw in private mode. The pure decision (which theme, which locale) is a util that takes those values as parameters.
- **No silent noops.** A `catch {}` needs a named reason (`ignoreStorageBlocked`) or a dev-only log.
- **Progressive enhancement:**
  - every page is fully readable with JS off;
  - the language selector is a real `<a href>` to the other locale;
  - the theme falls back to the system setting.

## 7. Tests

Unit tests use Vitest; accessibility uses Playwright + axe on the built site. The site has little logic, so it has few tests, and each one guards something that would silently break:

| What | How |
|---|---|
| Locale negotiation, path helpers, any util | Vitest, `foo.ts` → `foo.test.ts` next to it |
| `en.json` and `es.json` have identical keys and no empty values | Vitest, `src/i18n/locales.test.ts` |
| Every token text/background pair meets WCAG AA in both themes | `scripts/check-contrast.ts` (see DESIGN.md for the pairs) |
| Every built page in both languages and both themes has no serious axe violations, and passes keyboard tab order | Playwright + `@axe-core/playwright` against `astro preview` |
| Page weight budgets | `scripts/check-budget.ts` on `dist/` |

How tests are written (from Falcon, unchanged because it holds for any code):

- **One case per test,** stated in its title. No branching that changes what is asserted.
- **Tables** (`test.each` with `$name`) are fine when every row is its own named case with a literal expected value.
- **Use constants, never copies.** Assert thresholds through their named constant.
- **Fake only the edges** (storage, `navigator`, the clock). Never fake our own utils or the i18n files.
- **No snapshots.** Assert the text, role or value a visitor depends on.
- **Never weaken a test to make it pass.** No `.skip` or `.only` in a commit.
- **A bug a test finds gets fixed** in the same change and is listed in the PR description.

## 8. Formatting

Prettier (with `prettier-plugin-astro`), enforced by ESLint (`eslint-plugin-astro`). The settings match the owner's editor and Che Bondi:

```json
{ "printWidth": 100, "tabWidth": 4, "singleQuote": true, "trailingComma": "none", "bracketSameLine": true }
```

JSON, YAML and Markdown use `tabWidth: 2`.

**Code reads in paragraphs.** `eslint.spacing.cjs` (the same rules as Che Bondi) adds the blank lines that Prettier never adds:

- a blank line before a `return` that isn't alone in its block;
- a blank line after a run of `const`/`let` declarations;
- a blank line around multi-line blocks, calls and declarations;
- `curly: all`.

## 9. Content and copy

- **Every user-facing string is translated.** UI strings live in `src/i18n/en.json` and `es.json`. Long-form content lives in `src/content/<collection>/{en,es}/`. A page never ships in one language only.
- **English is the source.** `es.json` mirrors its keys, and the parity test enforces it.
- **Spanish is neutral and uses tú.** No voseo and no Spain-only vocabulary.
- **No invented claims.** Metrics, quotes and outcomes appear only when they are real and sourced (PRODUCT.md, "Evidence on hand").

## Review checklist

Before every PR:

- [ ] Types in `models.ts`, constants in `constants.ts`, no enums, no `any`
- [ ] No raw CSS values outside `tokens.json`; spacing, type and color follow DESIGN.md
- [ ] Components only lay out; logic is in utils; browser APIs only in `shared/scripts/`
- [ ] Styles are in the component's `.module.css`; no `<style>` blocks; every module selector starts with a class
- [ ] No nested loops, no unnamed long conditions, no logic inline in templates
- [ ] Every new string exists in both `en.json` and `es.json`; new content exists in both languages
- [ ] Works with JS off; theme and language work with the keyboard
- [ ] `pnpm check` passes: `astro check`, ESLint, Prettier, Vitest, contrast, budget, axe
