# zjaaal.dev

My personal site: my work drawn as a roguelike run map. My own path drops from my portrait, each line of work branches off it, and every road ends at Contact, while a pixel-art me walks the map as you scroll. English and Spanish, light and dark.

**Live:** [zjaaal.dev](https://zjaaal.dev) (work in progress)

## Stack

- **Site:** [Astro](https://astro.build), static output. The map is computed at build time from [`src/content/stations.json`](src/content/stations.json). Client JavaScript is limited to the theme, the language switch and the walking sprite.
- **Styles:** CSS Modules next to each component, with every value from the design tokens.
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
| `pnpm dev` | Generates the token CSS and the portrait, then starts the dev server |
| `pnpm build` | Generates the token CSS and the portrait, then builds to `dist/` |
| `pnpm portrait` | Builds the pixel portrait and the share card (`public/portrait.png`, `public/og.png`) from `src/assets/portrait.jpg` |
| `pnpm check` | Types (`astro check`) plus a WCAG contrast check of every color pair, in both themes |
| `pnpm preview` | Serves `dist/` locally through Wrangler |
| `pnpm release` | Builds and deploys by hand (CI normally does this) |

## How it's organized

| Topic | Where |
|---|---|
| Visual rules: tokens, type, color roles, the map, motion | [DESIGN.md](DESIGN.md) |
| Code rules and folder layout | [docs/CODE_STANDARDS.md](docs/CODE_STANDARDS.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Where the work stands and what's next | [docs/HANDOFF.md](docs/HANDOFF.md) |

The stops on the map live in [`src/content/stations.json`](src/content/stations.json). Design values live only in [`src/styles/tokens.json`](src/styles/tokens.json). Every UI string lives in [`src/i18n/en.json`](src/i18n/en.json) and [`es.json`](src/i18n/es.json).

## License

Code under the [MIT License](LICENSE). The fonts are under the SIL Open Font License; their licenses are in [`public/fonts/`](public/fonts/). Content and images © Jalinson Diaz.
