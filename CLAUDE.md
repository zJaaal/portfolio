# CLAUDE.md

Context for working in this repo: Jalinson Diaz's (zJaaal) personal site, live at https://zjaaal.dev.

## Read first

1. [docs/HANDOFF.md](docs/HANDOFF.md): where the work stands and what's next.
2. `PRODUCT.md`: product truth, the facts the site may state, and the timeline of the work. **Never invent claims, metrics or dates.** It holds personal details, so it is **local only** (gitignored): never commit it, push it, or quote it in public files beyond the copy the owner approved.
3. [DESIGN.md](DESIGN.md) and `.impeccable/surfaces/src-pages-lang-index-astro.md`: the visual rules and the direction contract.
4. [docs/CODE_STANDARDS.md](docs/CODE_STANDARDS.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): binding code rules. **A review comment is a rule for the whole codebase.**

## How we work

- **One section at a time.** Build one section, then stop so the owner can review and rewrite its copy. Mark unknown facts as `[…]` placeholders.
- **Design leads, the owner judges.** Show designs rendered (screenshots, or a page opened in the browser), not described. The owner says what doesn't work.
- **Language:** the owner often writes in Spanish, so reply in the language they write in. Documentation and code are in English. UI copy exists in English and neutral Spanish (tú, no voseo).
- **Design work** uses the `impeccable` skill. Its scripts are installed (engine 0.1.16).
- **Commits and PRs:** only when the owner asks. Branch from `main`, then open a PR. `main` deploys automatically through Cloudflare Workers Builds.

## Environment

- **Node 24:** run `nvm use` first, because the shell default is Node 22.
- **pnpm 10.34.7** through Corepack. pnpm 12 breaks Corepack on Node 22.
- **Checks:** `pnpm check` (types and contrast). Run `pnpm build` before every PR; GitHub Actions runs both on PRs and on `main`.
- **Visual checks:** Playwright screenshots at 1440, 1280, 820 and 390 px, in both themes, plus a horizontal-overflow check.
