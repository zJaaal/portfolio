# zjaaal.dev

My personal site: my work drawn as a transit line, from where I started to where you can reach me. English and Spanish, light and dark.

**Live:** [zjaaal.dev](https://zjaaal.dev) (work in progress)

## Stack

- **Site:** [Astro](https://astro.build), static output, almost no client JavaScript (theme and language only).
- **Hosting:** Cloudflare Workers static assets, deployed by Workers Builds on every push to `main`.
- **Design:** self-hosted fonts (Overpass, Overpass Mono, Departure Mono) and Material Symbols.
- **Tooling:** Node 24 LTS, pnpm through Corepack.

## Run it

```sh
nvm use                 # Node 24
corepack enable
pnpm install
pnpm dev                # http://localhost:4321
```

| Command | What it does |
|---|---|
| `pnpm dev` | Generates the token CSS, then starts the dev server |
| `pnpm build` | Generates the token CSS, then builds to `dist/` |
| `pnpm check` | Types (`astro check`) plus a WCAG contrast check of every color pair, in both themes |
| `pnpm preview` | Serves `dist/` locally through Wrangler |
| `pnpm release` | Builds and deploys by hand (CI normally does this) |

## How it's organized

| Topic | Where |
|---|---|
| Visual rules: tokens, type, color roles, the line, motion | [DESIGN.md](DESIGN.md) |
| Code rules and folder layout | [docs/CODE_STANDARDS.md](docs/CODE_STANDARDS.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Where the work stands and what's next | [docs/HANDOFF.md](docs/HANDOFF.md) |

Design values live only in [`src/styles/tokens.json`](src/styles/tokens.json). Every UI string lives in [`src/i18n/en.json`](src/i18n/en.json) and [`es.json`](src/i18n/es.json).

## License

Code under the [MIT License](LICENSE). The fonts are under the SIL Open Font License; their licenses are in [`public/fonts/`](public/fonts/). Content and images © Jalinson Diaz.
