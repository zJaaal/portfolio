# Design Guidelines

These are the binding visual rules for every page, in both themes and both languages. The values live in `src/styles/tokens.json`, and `scripts/build-tokens.ts` turns them into `tokens.css`. This document says which value to use and when. Product truth is in `PRODUCT.md` (local only), and code rules are in [docs/CODE_STANDARDS.md](docs/CODE_STANDARDS.md).

**A review comment is a rule for the whole site.** When one page breaks a rule, check every page.

> **Status: draft, written before the build at the owner's request.** It is rewritten from the built site at the finish review. Until then, when a rule here and the built result disagree, raise it and don't quietly diverge.

## 0. The world

The site is **one transit line**. It starts at the About terminus (who I am), runs through stations (each shipped thing, with what I owned), and ends at the Contact terminus. Lines have identity colors: **dotCMS** (purple), **independent** (amber), and **tooling** (teal). A small pixel sprite of me rides the line as you scroll. Everything below serves that one idea. No glow, no gradients, no glass, no cards as page structure.

## 1. Words

- **Sentence case everywhere:** headings, buttons, labels, station names (proper nouns keep their capitals). Never Title Case for UI. All caps only in the `pixel` role, which imitates game UI.
- **One narrator, first person:** "I led Content Drive", "Lideré Content Drive". Never "Jalinson is…".
- **Ownership first:** every station says what I did (*led*, *planned and built*, *redesigned*, *built most of*) before what it's made with.
- **Bilingual, equal:** every string exists in `en.json` and `es.json`. Spanish is neutral and uses tú ("Escríbeme", not "Escribime"). Keep product names and English terms of art (Product Engineer, framework, SDK) as they are.
- **No invented claims:** no metrics, quotes or outcomes that aren't real and sourced.
- **Personality is seasoning:** game and music references (inventory flavor text, the guitar-tab divider, sprite poses) appear in small text and decoration, never in headings or in the facts about work.

## 2. Spacing

A 4px grid (0.25rem) with named steps (`--space-*`). Use a step, never a raw number.

**Everything is in `rem`**, so the whole layout scales with the reader's font size (owner, 2026-11-18). The px below are at the default 16px, for reference only. Exceptions: 1px hairlines and borders stay 1px, and breakpoints use `em` (40em and 80em).

| Step | rem (px at 16) | Use |
|---|---|---|
| `1` | 0.25 (4) | Icon to label, meta line to its station name |
| `2` | 0.5 (8) | Between chips and buttons; tight stacks |
| `3` | 0.75 (12) | Inside small items |
| `4` | 1 (16) | Item padding; phone gutter; between rows |
| `6` | 1.5 (24) | Between stations in a row; between related blocks |
| `8` | 2 (32) | Section padding on a phone; above a key or legend |
| `12` | 3 (48) | Between sections on a phone |
| `16` | 4 (64) | Desktop gutter; between sections on desktop |
| `24`, `32` | 6, 8 (96, 128) | Breathing room around the map and the termini |

- More space above a heading than below it.
- Siblings get their spacing from the parent's `gap`, not margins on children.
- Gutters are 16px on phones and 64px on desktop (`--layout-gutter-*`). The map maxes out at 1440px, and running text at 68ch (`--layout-measure`).

## 3. Radius

| Token | px | Use |
|---|---|---|
| `sm` | 4 | Focus ring corners, small tags, inventory items |
| `md` | 8 | Code blocks, media frames |
| `pill` | 999 | Buttons and toggles in the header |
| (circle) | 50% | Stations, termini, the line bullet only |

Corners stay small: this is a printed diagram, not an app of rounded cards.

## 4. Type

Three families, all self-hosted (latin + latin-ext so Spanish accents render):

- **Overpass** (variable): the wayfinding voice. It derives from the US highway signage typeface (Highway Gothic). Names, stations, headings, body.
- **Overpass Mono:** data only, meaning roles, dates, stack lines, code and CLI output. Never a "techy" costume for prose.
- **Departure Mono:** the pixel role only, for game-flavored small text (inventory, sprite captions, the tab numbers). It never sets more than one line.

| Role | Token | Size / weight | Use |
|---|---|---|---|
| Display | `--type-display-*` | 36→56 / 800 | My name, once per page |
| Title | `--type-title-*` | 30→44 / 800 | A station page's title |
| Station | `--type-station-*` | 20→24 / 700 | Station names on the map |
| Heading | `--type-heading-*` | 20 / 700 | Headings inside a case study |
| Lead | `--type-lead-*` | 18→22 / 400 | The About bio; a case study's opening line |
| Body | `--type-body-*` | 17 / 400, 1.6 | Running text |
| Meta | `--type-meta-*` | 13 / 500 mono | What I owned, the line, dates, the stack |
| Code | `--type-code-*` | 14 / 400 mono | CLI transcripts and code |
| Pixel | `--type-pixel-*` | 11 / Departure | Flavor text only |

- Weight carries hierarchy before size.
- Large type gets negative tracking (the tokens set it); body keeps 0. The tracking floor is −0.04em.
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.
- Use tabular figures (`font-variant-numeric: tabular-nums`) wherever digits line up (dates, versions).
- No kicker or eyebrow labels above headings. Line names in the key are a legend, not eyebrows.

## 5. Color roles

Each color has one job. A color used outside its role weakens the role. `scripts/check-contrast.ts` must pass for both themes.

| Role | Dark | Light | Use |
|---|---|---|---|
| `bg` | `#120C1F` | `#F7F4FC` | The page. Purple-black and pale lilac, never neutral gray. |
| `surface` | `#1C1530` | `#FFFFFF` | Code blocks, inventory items, media frames. One level only, never nested. |
| `text` | `#EDE8F7` | `#18121F` | Names, body, station names |
| `muted` | `#A9A0C4` | `#5C5470` | Meta, roles, legend (≥4.5:1) |
| `dim` | `#C4BBDA` | `#4E4663` | Older stations' names: recency is tone (≥4.5:1) |
| `link` | `#A891FF` | `#5536C8` | Links inside running text |
| `line-dotcms` | `#8B6CF0` | `#6A4BDB` | The dotCMS line and the "zJ" bullet. **Identity, never decoration.** |
| `line-independent` | `#F2B544` | `#A86A00` | Artemis and Che Bondi's line |
| `line-tooling` | `#4FC9AE` | `#0B8A70` | Scripts and libraries |
| `station` | `#EDE8F7` | `#18121F` | Station rings and termini |
| `focus` | text color | text color | The focus ring: 2px, offset 3px |
| `selection-*` | `#4A3790` / white | `#DCD0FF` / ink | Text selection |
| `hairline` | `#3A2F57` | `#CFC5E3` | Dividers, borders, the guitar-tab strings (≥1.3:1) |

- **Purple marks what you can follow.** The lines, the bullet and links. Never a background wash, a heading color, or an ornament.
- **Line colors identify lines.** A station inherits its line's color for its stroke, and on hover the station name's underline takes that color.
- **Recency is tone.** The newest stations use `text`, and older ones use `dim` at weight 600. Never lower than `dim`.
- **Dark is designed, not inverted.** Light uses deeper purple, amber and teal so the lines keep 3:1 against `bg`.
- **Themed browser surfaces:** `::selection`, focus rings, link underlines (1px, offset 0.2em, 2px on hover), scrollbars and the caret all use these roles.

## 6. The line

| Token | Value | Use |
|---|---|---|
| `--route-stroke-desktop` | 10px | Route stroke at ≥960px |
| `--route-stroke-phone` | 8px | The left rail on phones |
| `--route-station-radius` / `-ring` | 14px / 5px | A station: `bg` fill, `station` ring |
| `--route-terminus-radius` | 22px | About and Contact termini: filled `station` |
| `--route-sprite-size` | 96px | The sprite: 32px art at 3× (or 8px placeholder at 12×) |

- **One continuous stroke.** The route never breaks between sections. Branches leave and rejoin with a smooth curve, like `git log --graph` drawn by a transit designer.
- **Every station is a link** with a visible name. There are no hover-only labels and no tooltips.
- **Desktop:** a horizontal map in the first viewport (≥80em). dotCMS arcs above the trunk; independent work and tooling arc below.
- **Phone and tablet (<80em, 1280px at default size):** one vertical rail down the left edge, colored by section, with stations stacked to its right.
- **The sprite** sits on the line. It is decorative, `aria-hidden`, and never covers a station name.

## 7. Motion

Motion explains a change; it is never decoration. All durations and easings are tokens.

| Band | Token | Duration | Use |
|---|---|---|---|
| Exit | `--motion-exit` | 150ms | Things leaving |
| Micro | `--motion-micro` | 180ms | Hover, toggles, the theme switch |
| Enter | `--motion-enter` | 220ms | Things appearing |
| Page | `--motion-page` | 320ms | A station page sliding in along the line's direction |
| Sprite | `--motion-sprite-frame` | 120ms/frame | The walk cycle, `steps()` |

- **One authored moment:** the sprite riding the line. Sections don't each get their own entrance animation.
- **Easing:** `--motion-ease-out`. No ease-in on UI. Exits are faster than entrances.
- **Properties:** transform and opacity, plus `clip-path` where it stays smooth. Nothing animates layout.
- **Reduced motion:** the sprite stops walking and shows the pose of the nearest station, and page transitions become instant.

## 8. Surfaces and depth

- **Two levels only:** the page (`bg`) and things on it (`surface`). No cards inside cards and no shadows, since the diagram is flat. Separation comes from hairlines and space.
- **Media** (dotCMS screenshots, the Che Bondi recording) sits in a `md`-radius frame with a hairline border, at its real aspect ratio.

## 9. Icons and personality

- **One icon set** of authored SVG with a consistent stroke, or none. No emoji or Unicode glyphs as icons, so the theme toggle gets a drawn icon.
- **No game art, logos or recreated characters.** Personality comes from:
  - the original sprite;
  - the guitar-tab divider (six `hairline` strings, a few fret numbers in `pixel`);
  - inventory flavor text in `pixel`;
  - Contact as the end of the line.
- **Restraint:** one personality touch per screen at most, besides the sprite.
