---
version: 1
slug: "src-pages-lang-index-astro"
primary_target: "src/pages/[lang]/index.astro"
related_targets: []
---

# Surface brief: home (the run map)

Scope: the home page in both languages (`/en`, `/es`), plus the station pages it links to (each piece of work, About, Contact), which inherit its world. Mode: Experience. The work leads from the first viewport.

Audience and job: a general audience (PRODUCT.md). A visitor skims in under a minute, sees what Jalinson built and owned, then opens one or two stations.

Unresolved: the pixel sprite's final art and the pixel portrait (the sprite is a code placeholder, the portrait is the GitHub avatar pixelated at build time); final copy per node (owner review); dotCMS screenshots and the Che Bondi recording; station and About pages (station links 404 until they exist; life nodes without a page render as plain text).

## Direction contract

THESIS: The career drawn as a roguelike run map: my own path drops from the portrait, each line of work branches off it at its real start, and every road ends at the Contact boss. Every shipped thing is a node you can enter. It refuses the category default of a name hero over a grid of project cards, and it supersedes the earlier transit-line direction.

OWN-WORLD:
- **Ground:** flat purple-black in dark, pale lilac in light, each designed on its own. No glow, no gradients, no glass.
- **Paths:** my own path and every road ahead are muted grey; a line's color means walked. dotCMS is purple, independent work is amber, tooling is teal. Purple marks only what you can follow (the dotCMS line and links).
- **Roads are pixels:** square dots (0.5rem, gap 0.25rem) on a grid, trimmed so a pixel sits centered at each node and each junction.
- **Nodes:** outlined tiles with an original 8x8 pixel icon per line, no fill. An "in progress" tag marks live work. Life nodes on my path are plain small rings. Contact is the one filled node.
- **Ends:** live lines continue as a grey road ahead to a `?` door; finished lines end at a "line cleared" flag one floor below their last node.
- **Labels:** node names in a wayfinding sans; small monospace roles and dates. Finished work steps down in tone, live work stays at full strength.
- **Hover:** the icon lifts and floats over a pixel shadow, like a pickup. The sprite steps aside to make room.

STORY: The visitor reads the run top to bottom, newest at the bottom:
1. **Origin:** portrait, name, Product Engineer, one bio sentence, and a "Now" line linking to current work.
2. **Life nodes on my path:** where I started, the move, the first library.
3. **Branches:** dotCMS, then tooling and independent work, each in its own lane, concurrent work side by side.
4. **Doors and flags:** `?` for what's next on live lines, "line cleared" for finished ones.
5. **Contact (the boss):** every road ends here; the node opens email until a Contact page exists. Then the motto and email, GitHub and LinkedIn.

They believe he owns things end to end, then open a node or write to him.

FIRST VIEWPORT:
- **Header:** the wordmark, the EN | ES switch pill and the theme toggle.
- **Intro:** the portrait ring at the left, my name beside it at display size, the role in muted text, the bio, then the "Now" line and the line key (three lines, `?` next stop, the flag).
- **The map starts directly below:** my path drops from the portrait, with a year tick in the left gutter for every year.
- **Phone:** the same run as a single column. Lanes pack beside my path and every label sits in one shared column to their right.
- **The primary action is the nodes themselves.** Contact is reachable at the end of the road and in the footer.

FORM: A roguelike run map (the branching floors of Slay the Spire and Hades) drawn as a git graph in pixels. The structure is a tree in time: one fluid layout from 48em up (lanes at fixed shares of the container, labels hanging under their nodes to the right of the road), and a single column below.

Signature interaction: a small pixel-art sprite of the owner walks the road as the page scrolls. It is velocity-eased, so a flick never makes it jump; it rests on each node as it arrives, with a hop and a pixel-stepped burst ring on the node. It steps aside when the node it stands on is hovered or focused. Under reduced motion it moves straight to its node without walking, hop or burst. It is decorative and hidden from assistive technology.

Time and space (owner, 2026-11-18): the lines are coherent in time and space.
- **Axis:** the map's long axis (always vertical now) is time, oldest at the top, with a year tick for every year.
- **Lines:** each line branches off my path at its real start date (dotCMS on the joining date, independent on the first own project, tooling on the first library).
- **Nodes:** each node sits on its floor in time order; floors are as tall as their labels need, so the axis is ordinal with years marked, not a linear scale.
- **Concurrency:** work that overlapped runs side by side in different lanes.
- **Data:** dates live in the content collection, and positions are computed at build time (`utils/run.ts`), never hand-placed.

Level select (owner, 2026-11-18): the intent carries over; the mechanics are still open.
- **Nodes are levels:** each work node opens its own page (`/[lang]/work/[slug]`), plus `/[lang]/about` and `/[lang]/contact`. A station page's header carries its node's icon tile, line color and ownership verb. Each page ends with "Previous stop" and "Next stop", in the map's order.
- **Open:** a sticky mini-map on station pages (the whole run, the sprite at the current node, each node a link, a link back to the map); how it reads on phones; whether the sprite persists across pages with view transitions.
- **No soft-skills list:** nodes show those skills through what was owned. About carries a short "How I work" of three or four behavioral sentences.

Motion grammar: transform and opacity only; exits are faster than entrances; no ease-in on UI. The sprite's legs step on a `steps()` clock; the hover float and the walk's moves use the in-out ease.

Raises (kept from the earlier contract):
- flat fills only;
- one narrator voice;
- the accent is the control: color marks what you can follow;
- recency is tone: finished work steps down;
- a marker always shows where you are: the sprite and the lit node.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
