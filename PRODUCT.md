# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, rebuilt from scratch (replaces the 2022 Vite 2 + React + Bootstrap CDN site). Hosting moves from Netlify (zjaaaldev.netlify.app) to **Cloudflare** (Workers static assets) on the custom domain **zjaaal.dev** (Cloudflare Registrar). A work-in-progress version has been live since 2026-11-18.

## Users

A general audience: Jalinson "zJaaal" Diaz showing himself to the world. The same site has to work for:

- hiring managers and engineering leads evaluating a senior product engineer;
- developers who might use his open-source tools (Artemis, react-scroll-utilities);
- potential collaborators or clients looking for someone who ships products end to end.

No single audience is prioritized; the work itself should do the convincing for all three.

## Product Purpose

A personal site that represents Jalinson as a **product engineer**: someone who owns features from planning to production, inside a large product (dotCMS) and on his own (Artemis, Che Bondi). Success: a visitor leaves knowing what he built, what he owned, and how to reach him. The site replaces a junior-era portfolio built around a skills list and learning projects.

## Positioning

He has done both of these, and few portfolios can show the two together:

- **Inside a product company:** shipped and led major surfaces of an open-source enterprise CMS (dotCMS).
- **Alone:** built two production-grade products from scratch: a developer framework for AI agents (Artemis) and a consumer mobile app with its own backend (Che Bondi).

## Operating Context

Visitors arrive from GitHub, LinkedIn, blog posts, and job applications, often on a phone. They spend under a minute deciding whether to dig in, then open one or two case studies.

## Capabilities and Constraints

The site must present:

- **dotCMS work** (open source, so screenshots and links are allowed):
  - Led **Content Drive**.
  - Part of planning and developing the **Universal Visual Editor (UVE)** and its **SDK ecosystem**; has written blog posts about it.
  - Built the redesign of the **Content Types form builder**.
  - Built a large part of the **Template Builder**.
  - His team laid the foundations of the **new Edit Content**, then handed it to another team and started UVE.
  - Currently at dotCMS (confirmed).
- **Artemis** (`@zjaaal/artemis`, github.com/zJaaal/artemis): a Node framework for the commands AI agents run. Each command gets `--help`, JSON output, meaningful exit codes, confirmation before destructive actions, dry runs, and an audit log. Production ready.
- **Che Bondi** (codename Project Millennium Falcon): a real-time tracker for Buenos Aires buses. React Native + Expo with a native Kotlin tracker, a Cloudflare Worker and Durable Object backend, and Python data pipelines. Android app, invite-only, with no public store link. Production ready. Shown with a **screen recording** the owner will provide; the existing design canvas is prototyping only and is not accurate to the app.
- **Prototypes and tooling:** dev-environment scripts for dotCMS built on Artemis (`dotcms-scripts`), the dotCMS types generator, and other experiments.
- Earlier work: only **react-scroll-utilities**, which ships to npm through CI/CD, stays, as one line among prototypes and tooling. NinJS and the 2022 learning projects are dropped.

Discoverability: SEO and GEO are requirements.

- **Every page:** canonical URL, `hreflang` alternates with `x-default`, Open Graph tags, and Person JSON-LD.
- **Site-wide:** a sitemap, a `robots.txt` that welcomes AI crawlers, and `/llms.txt` with a plain-text summary of the work.

Languages and themes:

- **Bilingual, Spanish and English, with equal content.** The language is picked from the browser on the first visit and remembered after that, and a visible language selector lets the visitor switch at any time. Spanish is **neutral, using tú**, not Rioplatense voseo.
- **Light and dark themes, each designed on its own rather than inverted.** The site follows the system setting, and a toggle lets the visitor override it and remembers the choice.

Open decisions:

- URLs for the UVE / SDK blog posts.
- Contact channels to feature (current site: email, GitHub, LinkedIn). Email is decided: a `me@` address on the new domain, forwarded to the owner's personal inbox through Cloudflare Email Routing. The owner replies from the personal address, and no mailbox is hosted.

## Brand Commitments

- Handle **zJaaal**; name **Jalinson Diaz**; title **Product Engineer**.
- **Life as a long road** (owner, 2026-11-18): from Venezuela to Buenos Aires, Argentina, where he lives now (confirmed), and from dropping out of electronics to learning programming (2020, C#/.NET) and on to product engineering. The map's line starts at this origin, before dotCMS, and the About station tells the story.
- **Motto** (the owner's paraphrase, set on two lines): "Only those willing to fail / are the ones who will succeed". In Spanish: "Solo quienes se atreven a fallar / son los que van a triunfar". It closes the line: at the Contact terminus, and at the end of the work-in-progress page for now.
- **Purple stays.** The current accent is `#6745d9`; the hue is binding, the exact value isn't.
- The owner likes the **dark, terminal/console developer aesthetic** of the current site and wants to keep that spirit **without a loading gate, boot sequence, or typing animation**. The owner called the gate bloat, so the terminal feel has to come from the site itself. Only the junior execution (glass cards, floating circles, skill-logo grids, typing effect) is up for replacement.

## Evidence on Hand

- Public GitHub repos: artemis, project-millennium-falcon (Che Bondi), dotcms-scripts, dotCMS-Types-Generator, react-scroll-utilities.
- Artemis README includes real CLI transcripts that can be quoted.
- dotCMS is open source: product UI screenshots, PRs, and docs can be used.
- Che Bondi screen recording: **to be provided by the owner.**
- dotCMS screenshots: **to be collected.**
- No testimonials, metrics, or company endorsements exist yet; do not invent any.

### Timeline (from GitHub, 2026-11-18)

Derived from the owner's 410 PRs in `dotCMS/core` and the creation dates of their own repos. The owner asked for the dates to come from the PRs. The map's time axis uses these dates.

| Station | Line | Dates | Evidence |
|---|---|---|---|
| react-scroll-utilities | tooling | 2022-10 → 2023-01 | repo created 2022-10-13 |
| Joined dotCMS | dotCMS | 2023-03 | first PR 2023-03-10 |
| Content Types fields redesign | dotCMS | 2023-03 → 2023-05 | "Implement new design of Content Type Fields" (2023-04-28) |
| Template Builder | dotCMS | 2023-05 → 2023-09 | 42 PRs, from "Add POC to Template Builder Nx Library" (2023-05-16) |
| New Edit Content | dotCMS | 2023-09 → 2023-11 | "Edit Contentlet implement Feature Flag" and follow-ups. The owner's team laid its foundations, then it moved to another team and they started UVE. |
| UVE + SDKs (began as Edit Mode Anywhere) | dotCMS | 2023-11 → ongoing | 117 PRs; most active 2023-12, 2024-06, 2025-01 |
| dotCMS dev scripts | tooling | 2024-01 → now; moved onto Artemis 2026-11 | repo created 2024-01-20 |
| Content Drive | dotCMS | 2025-06 → ongoing | 60 PRs, from "Initialize Portlet" (2025-06-19) |
| Che Bondi | independent | 2026-10 → now | repo created 2026-10-21 |
| Artemis | independent | 2026-11 → now | repo created 2026-11-10 |

Confirmed by the owner (2026-11-18): currently at dotCMS.

## Product Principles

1. **Show the work, not the stack.** Shipped products and what he owned replace skill lists and logo grids.
2. **Ownership is the headline.** For each project, say what he led, decided, or built, not just what technology was involved.
3. **Real artifacts over descriptions.** Use real UI, real CLI output, and real recordings wherever possible.
4. **Fast to scan, deep on demand.** A one-minute skim should tell the whole story; case studies hold the depth.

## Accessibility & Inclusion

No product-specific requirement established; meet WCAG 2.2 AA as a baseline. The terminal aesthetic must not cost contrast or keyboard access, and any boot/typing sequence must be skippable and respect reduced motion.
