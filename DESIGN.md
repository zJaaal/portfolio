# Design Guidelines

These are the binding visual rules for every page, in both themes and both languages. The values live in `src/styles/tokens.json`, and `scripts/build-tokens.ts` turns them into `tokens.css`. This document says which value to use and when. Product truth is in `PRODUCT.md` (local only), and code rules are in [docs/CODE_STANDARDS.md](docs/CODE_STANDARDS.md).

**A review comment is a rule for the whole site.** When one page breaks a rule, check every page.

> **Status: rewritten from the shipped home (the run map), 2026-11-18.** Station pages, About and Contact are not built yet; their rules below are carried over and marked where still open. When a rule here and the built result disagree, raise it and don't quietly diverge.

## 0. The world

The site is **a roguelike run map**. My own path (muted grey) drops from the portrait. Each line of work branches off it at its real start date and runs down in its own lane, one node per shipped thing. Every road ends at the Contact "boss". A small pixel sprite of me walks the road as you scroll. Lines have identity colors: **dotCMS** (purple), **independent** (amber) and **tooling** (teal).

- **Nodes are outlined pixel-icon tiles**, never filled discs (the boss is the one filled node). An "in progress" tag marks live work.
- **Roads are pixels:** square dots on a grid, never a continuous stroke.
- **Live lines don't end.** They continue as a grey "road ahead" to a `?` door. Finished lines end at a "line cleared" flag.
- Everything serves that one idea. No glow, no gradients, no glass, no cards as page structure.

## 1. Words

- **Sentence case everywhere:** headings, buttons, labels, node names (proper nouns keep their capitals). Never Title Case for UI. All caps only in the `pixel` role, which imitates game UI.
- **One narrator, first person:** "I led Content Drive", "Lideré Content Drive". Never "Jalinson is…".
- **Ownership first:** every node says what I did (*led*, *planned and built*, *built*, *built most of*) before what it's made with.
- **Bilingual, equal:** every string exists in `en.json` and `es.json`. Spanish is neutral and uses tú ("Escríbeme", not "Escribime"). The one exception is Che Bondi's page: the app is for Buenos Aires, so its Spanish may sound Argentine ("colectivo", "cerca tuyo") (owner, 2026-11-23). Keep product names and English terms of art (Product Engineer, framework, SDK) as they are.
- **No invented claims:** no metrics, quotes or outcomes that aren't real and sourced.
- **Personality is seasoning:** game and music references (the sprite, the pixel icons, the `?` doors, the "line cleared" and "in progress" tags) appear in small text and decoration, never in headings or in the facts about work.

## 2. Spacing

A 4px grid (0.25rem) with named steps (`--space-*`). Use a step, never a raw number.

**Everything is in `rem`**, so the whole layout scales with the reader's font size (owner, 2026-11-18). The px below are at the default 16px, for reference only. Exceptions: 1px hairlines and borders stay 1px, and breakpoints use `em` (40em and 80em).

| Step | rem (px at 16) | Use |
|---|---|---|
| `1` | 0.25 (4) | Icon to label, meta line to its station name |
| `2` | 0.5 (8) | Between chips and buttons; tight stacks |
| `3` | 0.75 (12) | Inside small items |
| `4` | 1 (16) | Item padding; phone gutter; between rows; the line key's swatch |
| `6` | 1.5 (24) | Between related blocks |
| `8` | 2 (32) | Section padding on a phone; around the intro and the line key |
| `12` | 3 (48) | Between sections on a phone |
| `16` | 4 (64) | Desktop gutter; between sections on desktop |
| `24`, `32` | 6, 8 (96, 128) | Breathing room around the map and Contact |

- More space above a heading than below it.
- Siblings get their spacing from the parent's `gap`, not margins on children.
- Gutters are 16px on phones and 64px on desktop (`--layout-gutter-*`). The map maxes out at 1440px, and running text at 68ch (`--layout-measure`).

## 3. Radius

| Token | px | Use |
|---|---|---|
| `sm` | 4 | Focus ring corners, labels, small tags |
| `md` | 8 | Code blocks, media frames |
| `pill` | 999 | Buttons and toggles in the header |
| (circle) | 50% | Nodes, the portrait, the key's swatches only |

Corners stay small: this is a game map, not an app of rounded cards.

## 4. Type

Three families, all self-hosted (latin + latin-ext so Spanish accents render):

- **Overpass** (variable): the wayfinding voice. It derives from the US highway signage typeface (Highway Gothic). Names, nodes, headings, body.
- **Overpass Mono:** data only, meaning roles, dates, the line key, stack lines, code and CLI output. Never a "techy" costume for prose.
- **Departure Mono:** the pixel role only, for game-flavored small text: the "in progress" and "line cleared" tags and the year ticks. It never sets more than one line.

| Role | Token | Size / weight | Use |
|---|---|---|---|
| Display | `--type-display-*` | 36→56 / 800 | My name on the home; a station page's headline. Once per page |
| Title | `--type-title-*` | 30→44 / 800 | A station's punchline; the motto |
| Station | `--type-station-*` | 20→24 / 700 | Node names on the map (phone: heading size) |
| Heading | `--type-heading-*` | 20 / 700 | Headings inside a case study |
| Lead | `--type-lead-*` | 18→22 / 400 | The role line and bio under my name; a case study's opening line |
| Body | `--type-body-*` | 17 / 400, 1.6 | Running text; the names of life nodes |
| Meta | `--type-meta-*` | 13 / 500 mono | What I owned, dates, the line key, the stack |
| Code | `--type-code-*` | 14 / 400 mono | CLI transcripts and code |
| Pixel | `--type-pixel-*` | 11 / Departure | Tags and year ticks only |

- Weight carries hierarchy before size.
- Large type gets negative tracking (the tokens set it); body keeps 0. The tracking floor is −0.04em.
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.
- Use tabular figures (`font-variant-numeric: tabular-nums`) wherever digits line up (dates, versions).
- No kicker or eyebrow labels above headings. The line key is a legend, not an eyebrow.

## 5. Color roles

Each color has one job. A color used outside its role weakens the role. `scripts/check-contrast.ts` must pass for both themes.

| Role | Dark | Light | Use |
|---|---|---|---|
| `bg` | `#120C1F` | `#F7F4FC` | The page. Purple-black and pale lilac, never neutral gray. |
| `surface` | `#1C1530` | `#FFFFFF` | Code blocks, media frames. The map itself sits on `bg`. One level only, never nested. |
| `text` | `#EDE8F7` | `#18121F` | Names, body, station names |
| `muted` | `#A9A0C4` | `#46405A` | My own path, roads ahead and `?` doors, meta, roles, year ticks, the key (≥4.5:1; light aims near 7:1, since thin mono text on the pale page reads fainter than its ratio) |
| `dim` | `#C4BBDA` | `#3A3350` | Names of finished work: recency is tone (≥4.5:1) |
| `link` | `#A891FF` | `#5536C8` | Links inside running text |
| `line-dotcms` | `#8B6CF0` | `#5A3CC8` | The dotCMS line. **Identity, never decoration.** |
| `line-independent` | `#F2B544` | `#7A4D00` | Artemis and Che Bondi's line |
| `line-tooling` | `#4FC9AE` | `#066350` | Scripts and libraries |
| `station` | `#EDE8F7` | `#18121F` | The portrait ring and the Contact boss (the one filled node) |
| `pickup-coral` | `#F28B66` | `#A8401F` | My own life on About: Maracaibo, electronic engineering, a marker, an item |
| `pickup-rose` | `#F2789A` | `#A3213F` | My own life on About: learning to program, a marker, an item |
| `pickup-sky` | `#7EC3E8` | `#1F6188` | My own life on About: Buenos Aires, a marker, an item |
| `focus` | text color | text color | The focus ring: 2px, offset 3px |
| `selection-*` | `#4A3790` / white | `#DCD0FF` / ink | Text selection |
| `bezel` | `#0A0612` | `#241C33` | The dark frame around a recorded screen, so a white app keeps its edge on a white console (≥3:1 on `surface` in light) |
| `hairline` | `#3A2F57` | `#CFC5E3` | Dividers and borders (≥1.3:1) |

- **Purple marks what you can follow.** The dotCMS line and links. Never a background wash, a heading color, or an ornament.
- **Line colors identify lines.** A node takes its line's color for its ring, icon and road. On hover its name's underline takes that color, and a role that names another node ("cornerstone of Artemis") sets that name in that node's line color.
- **Pickup colors are my own life, on About only.** Coral, rose and sky come from the sprite's palette (sneakers, shirt, eyes). They color the life stops on About's road, the "How I work" markers and the off-the-clock inventory. Never on the map, never for work, never as a wash.
- **Grey is mine and what's next.** My own path, side roads, the road ahead and `?` doors use `muted`. A line's color means "walked".
- **Recency is tone.** Live nodes use `text`, and finished ones use `dim` at weight 600. Never lower than `dim`.
- **Dark is designed, not inverted.** Light uses deeper purple, amber and teal so the lines keep 3:1 against `bg`.
- **Themed browser surfaces:** `::selection`, focus rings, link underlines (1px, offset 0.2em, 2px on hover; the footer's links are `dim`), scrollbars and the caret all use these roles.

## 6. The run map

The map is built, not drawn: `features/home/utils/run.ts` computes every position from the stations' real dates, and the stylesheet only places them. Never hand-place a node.

| Token | Value | Use |
|---|---|---|
| `--route-dot` / `-dot-gap` | 0.5rem / 0.25rem | A road's pixel and the gap between pixels |
| `--route-node` (`-phone`) | 3.25rem (2.5rem) | A work node's tile |
| `--route-node-ring` | 0.1875rem | The tile's outline |
| `--route-end` (`-phone`) | 2.25rem (1.5rem) | `?` door and cleared flag |
| `--route-boss` (`-phone`) | 4.5rem (3rem) | The Contact node |
| `--route-icon` (`-phone`) | 1.5rem (1rem) | The pixel icon inside a node |
| `--route-lane-pitch` | 1.75rem | Phone: distance between lanes |
| `--route-label` | 13rem | Widest label on the tree |
| `--route-sprite-width` / `-height` | 2.5rem / 3rem | The sprite |

**Composition**

- **Intro:** the portrait ring, my name, role and bio. Under the bio, a "Now" line links to current work. Under that, the **line key** (see below).
- **My path** (muted) drops from the portrait through the life nodes (small outlined circles with a muted ring and no icon: where I started, the move, the first library). It is never a color line.
- **Branches:** each work line leaves my path horizontally at the top of its first node's floor, at its real start, and runs down its own lane. Lanes are ordered newest first, closest to my path, and a lane exists only from its first floor down, so a branch never crosses a lane that's already there.
- **Floors:** one per node in time order, each tall enough for its label. Work that overlapped runs side by side in different lanes. A road turns at a floor's edge, never through a label.
- **Side roads** (muted) cross between lanes where the run moves to another line, so the sprite can walk there.
- **Nodes:** an outlined tile (no fill, `bg` behind it) with a pixel icon per line, drawn on an 8×8 grid in `PixelIcon`. Only the line's icon varies; the ring and icon share the line color. The "in progress" tag (`pixel`, line color) marks live work.
- **Roads:** pixel dots, trimmed so the first and last pixel sit centered on each node; a pixel always lands exactly on a junction.
- **Ends:** a live line continues as a muted road ahead to a `?` door (dashed ring). A finished line ends at a "line cleared" flag, one floor below its last node. Every road, doors included, gathers into one road that drops into **Contact**, the boss: the one filled node, bigger than the rest. Contact opens email (`mailto:`) until a Contact page exists.
- **Years:** a year tick (`pixel`, `muted`) in the left gutter for every year, beside my path. Years never appear inside labels; a node's own dates ("Mar - May 2023", "since Nov 2023") are `meta` in its label.
- **Line key:** above the map, under the intro, set in `meta`. One entry per line (swatch ring in the line color, name), plus `?` for the next stop and the flag for a cleared line. It is a legend, not navigation.
- **Footer:** the motto (two lines, the first `muted`), then email, GitHub and LinkedIn as `dim` underlined links. Email first, since it is the way to reach me; the two that leave the site carry the arrow.

**Layouts** (one source of positions, two projections):

- **From 48em: one fluid tree.** Lanes sit at fixed shares of the map's width (the first at 17%, then every 28%), so it fills any container up to `--layout-max-map`. Each label hangs under its node and right of its road, and may be as wide as its lane allows (up to 13rem).
- **Phones (<48em): a single column.** The lanes pack beside my path at the lane pitch, and every label sits in one shared column to their right, so no label crosses a lane. The key and motto align to that column.
- **Every named node is a link** with a visible name once its page exists (a node without a page renders as plain text). No hover-only labels, no tooltips. Decorative layers (roads, ticks, sprite, doors, flags) are `aria-hidden`; the ordered list of nodes carries the meaning.

**Hover and focus:** the icon lifts two pixels and floats over a one-bar pixel shadow, like a pickup in a game. The tile never changes size, so the road's pixels around it stay uncovered. The name's underline takes the line color. Focus draws the 2px ring on the tile and on the label.

## 7. Motion

Motion explains a change; it is never decoration. All durations and easings are tokens.

| Band | Token | Duration | Use |
|---|---|---|---|
| Exit | `--motion-exit` | 150ms | Things leaving |
| Micro | `--motion-micro` | 180ms | Hover, the icon lift, toggles, the theme switch |
| Enter | `--motion-enter` | 220ms | Things appearing |
| Page | `--motion-page` | 320ms | Arrival pop; the float cycle is 3×; the sprite's step aside is 1.5×; |
| Reveal | `--motion-reveal` | 480ms | The theme switch's staircase sweep; the toggle's icon turning in |
| Leave | `--motion-leave` | 300ms | The old page fading out (where the browser keeps it on screen) |
| Arrive | `--motion-arrive` | 520ms | The new page settling in, from faint (30%) and slightly blurred, on `--motion-ease-settle` (a cubic ease-out: the UI ease-out is so front-loaded the arrival would be over in a blink) |
| Sprite | `--motion-sprite-frame` | 120ms/frame | The walk cycle and the hop, `steps()` |

**The one authored moment is the sprite walking the road.** Sections don't each get an entrance animation.

- **Between pages** (cross-document view transitions, `global.css`): the old page blurs out as the new one comes into focus, so a language switch reads as the words turning into the other language. The header is its own layer and holds still. The language pill's thumb slides to the new language first (`locale.ts`). Browsers without cross-document view transitions (Firefox) get the arrival on `<main>` from `navigate.ts`, from first paint; the header still holds. **Nothing delays a navigation:** links go at once, and only the arrival animates (`leave`, `arrive`). It starts faint, never invisible, so it never flashes the empty page. **A language switch doesn't move:** it is the same page in other words, so it only fades, and it opens at the scroll position it left from (restored before first paint).
- **Theme switch** (`theme.ts`, the sweep in `global.css`): the new theme sweeps in from the toggle's corner to the opposite one, its edge a staircase of pixel steps like the roads (`--motion-reveal`). Every part of the page changes once: **no full-screen flicker or pixel dither, ever** (photosensitive seizures, WCAG 2.3.1); the toggle's icon turns in. Without view transitions it switches instantly.

- **The walk** (`src/shared/scripts/walk.ts`, constants in `features/home/shared/constants.ts`): as the page scrolls, the sprite walks to the last node above a reading line (55% of the viewport) on its own clock, so a flick of the wheel never makes it jump. Velocity is eased: it speeds up gently and brakes as it nears a node. It rests on the node's center. At the top of the page the reading line starts at the viewport edge and settles over half a viewport of scrolling.
- **Hover and focus:** when the node it stands on is hovered or focused, it steps aside to the node's left and faces the node, so the icon can float, then steps back.
- **Arrival:** the node pops (scale 1.2) and sends out one pixel-stepped ring (`steps(4)`); the sprite hops once.
- **Without JS** the sprite stands on the newest floor.
- **Easing:** `--motion-ease-out` for UI, `--motion-ease-in-out` for the float and the walk's eased moves. Exits are faster than entrances.
- **Properties:** transform (including `translate` and `scale`) and opacity. Nothing animates layout.
- **Reduced motion:** the sprite steps straight to its node with no walking, hop, burst, lift or float. The state still reads: the node it stands on lights up.

## 8. Surfaces and depth

- **Two levels only:** the page (`bg`) and things on it (`surface`). No cards inside cards. The map is flat, and its only shadow is the pixel bar under a floating icon (hover and focus). Separation comes from hairlines, space and the `bg` behind each label.
- **Media** (dotCMS screenshots, the Che Bondi recording) sits in a `md`-radius frame with a hairline border, at its real aspect ratio.

## 9. Icons and personality

- **Map icons are original 8×8 pixel icons** (`PixelIcon`): one per line, plus the `?` door, the cleared flag and the boss. They are drawn in `currentColor` so they take the line's color. UI controls (theme toggle, the external-link arrow) use Material Symbols Rounded as inlined SVG. No emoji or Unicode glyphs as icons.
- **No game art, logos or recreated characters.** Personality comes from:
  - the original sprite and the pixel portrait;
  - the roguelike vocabulary: doors, a cleared flag, a boss, in progress;
  - Contact as the end of every road.
- **Restraint:** the map is the personality. Add no other game flourish on the same screen.

## 10. Station pages

Station pages (`/[lang]/work/[slug]`) are one level of the run. Any station with an entry in `src/content/work.json` gets one, in both languages; the copy comes from the owner's interview.

- **One page, one line color.** The station's line color marks the node tile, the road, the checkpoints, the decision markers, the links, the "in progress" tag and the terminal prompt. Ground, body text and headings stay neutral; no color washes.
- **The node and the road:** the node (boss size) sits beside "Back to the map", and the road runs down the page from it in pixel steps. Each section heading is a checkpoint ring on it.
- **Opening, in my words** (owner's pick, 2026-11-19, "In my words"): the name is small (`station` size, weight 800) with the dates and tag in `meta` beside it. The loudest line is the **headline**: what it is, in plain words ("All the content in dotCMS, in one place.") in `display`. What I owned follows as the `lead` in `dim`, then the project's links. (Ownership-only headlines like "Mine, end to end." read oddly as the biggest line: owner, 2026-11-23.)
- **Sections, in order:** What it does (the key features: a few words each, one per line, each opened by one road pixel), What it fixes, The calls I made, See it work (a recorded terminal session or a media slot that keeps its size before the media arrives), The hard part, What went right (only when the hard part turned into something good; its checkpoint ring is filled), Where it's at. From 64em each section is two columns: the heading on the left (sticky, 3 shares) and the answer on the right (7 shares). Each call I made is a row with a `station`-size title, split by hairlines. See it work sits under its heading (`space-8` between them, not sticky), at most `--layout-stage` (56rem) wide and two thirds of the screen tall.
- **The punchline:** one line of mine (`punchline` in `work.json`) opens the section it belongs to (What it fixes, or The hard part), set in `title`. It is cut from that section's paragraphs, never repeated in them (owner, 2026-11-23).
- **A recording is a replay** (`work/components/Screen`): one `surface` console with a bar (the line's pixel icon, the source in `meta`, a "Replay" tag in `pixel`), the screen matted inside, and a road of pixels under it that lights up in the line color as the clip plays (`--progress`, `shared/scripts/loop.ts`). From 64em a short road branches from my road into the bar. Clips are muted loops that play only on screen; with reduced motion they wait with controls.
- **The end of the level:** previous and next stop in the map's order, through the stations that have a page, as the map's own tiles. After the last one comes Contact (email).
- **Footer:** after the road ends, behind a hairline, the same contact row that closes the home (email, GitHub, LinkedIn; `shared/components/Socials`). No motto: it belongs to the end of the run on the home.
- **Open:** a sticky mini-map, and page transitions.
