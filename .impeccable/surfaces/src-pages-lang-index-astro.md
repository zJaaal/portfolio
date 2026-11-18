---
version: 1
slug: "src-pages-lang-index-astro"
primary_target: "src/pages/[lang]/index.astro"
related_targets: []
---

# Surface brief: home (the route map)

Scope: the home page in both languages (`/en`, `/es`), plus the station pages it links to (About, each case study, Contact), which inherit its world. Mode: Experience. The work leads from the first viewport.

Audience and job: a general audience (PRODUCT.md). A visitor skims in under a minute, sees what Jalinson built and owned, then opens one or two stations.

Unresolved: the pixel sprite's maker (owner draws, commissioned, or a code placeholder for now); final station copy; dotCMS screenshots and the Che Bondi recording; the domain.

## Direction contract

THESIS: The career drawn as one transit line, from who he is to how to reach him, with every shipped thing a station you can get off at. It refuses the category default of a name hero over a grid of project cards.

OWN-WORLD:
- **Ground:** flat purple-black in dark, pale lilac in light. No glow, no gradients, no glass.
- **Line colors:** each line has its own identity color. dotCMS is purple, independent work is amber, tooling is teal. Purple marks only things you can follow (lines and links).
- **Stations:** white-ringed dots on one continuous route stroke.
- **Labels:** station names in a wayfinding sans; small monospace labels for role and metadata.
- **Recency is tone:** newer stations render at full strength, older ones step down.
- **Divider:** a thin guitar-tab rule between sections.

STORY: The visitor reads the line left to right on desktop, or top to bottom on a phone:
1. **Start terminus (About):** name, Product Engineer, and two or three sentences in first person.
2. **dotCMS line:** Content Drive (leading and building), UVE + SDKs (planned and built), Content Types form builder (built the redesign), Template Builder (built most of it).
3. **Tooling spur:** dev scripts on Artemis, react-scroll-utilities.
4. **Independent line:** Artemis, Che Bondi.
5. **End terminus (Contact):** email as text.

They believe he owns things end to end, then open a station or write to him.

FIRST VIEWPORT:
- **Desktop:** the route map fills the screen.
  - **Top left:** a name plate with a "zJ" line bullet, the name at about 44px, and the title in muted text.
  - **Top right:** nav, language switch and theme toggle.
  - **Middle:** the trunk runs horizontally at about mid-height. The dotCMS branch arcs above it, the independent branch and tooling spur arc below, and stations are labeled at 24px with monospace roles.
  - **Ends:** the About terminus is the left end and the Contact terminus the right end; the pixel sprite stands at the left end.
  - **Bottom:** a line key.
- **Phone:** the same line becomes one rail down the left edge, colored by section. Stations stack with their labels, and the header is sticky.
- **The primary action is the stations themselves:** every station is a link.

FORM: Transit line diagram crossed with `git log --graph`. Grounded list position 3 of 7. seed: 6370e93dfd8c489a.

Signature interaction: a small original pixel-art sprite of the owner (32px, shown at 3×) rides the line as the visitor scrolls. It walks between stations and changes pose at each one: laptop at dotCMS, bus stop at Che Bondi, guitar at Contact. Under reduced motion it shows only the right pose at each station. It is decorative and hidden from assistive technology.

Time and space (owner, 2026-11-18): the parallel lines are coherent in time and space.
- **Axis:** the map's long axis (horizontal on desktop, vertical on phones) is a real time scale with discreet year ticks.
- **Lines:** each line starts at its real start date: dotCMS on the joining date, independent on the first own project, tooling on the first library.
- **Stations:** each station sits at its real ship or handoff date.
- **Concurrency:** work that overlapped in time runs side by side.
- **Now:** "now" is at the far end, just before the Contact terminus.
- **Data:** dates live in the content collection, and positions are computed from them, never hand-placed.

Level select (owner, 2026-11-18):
- **Stations are levels:** each station opens its own page (`/[lang]/work/[slug]`, plus `/[lang]/about` and `/[lang]/contact`).
- **The map never disappears:** on a station page it shrinks into a sticky mini-map at the top, with the whole line visible and the sprite at the current station. Every station on it is a link, and the mini-map itself links back to the full map.
- **Transitions:** the map morphs into the mini-map through Astro view transitions, and the sprite persists across pages. Without JS, these are plain page loads.
- **Phone:** the mini-map is a slim sticky strip with the parallel lines shown horizontally, plus Map and previous/next stop controls within thumb reach.
- **Ending a level:** each station page ends with "Previous stop" and "Next stop".
- **No soft-skills list:** stations show those skills through what was owned. The About terminus carries a short "How I work" of three or four behavioral sentences.
- **Your face:** the About terminus is a large portrait circle (a pixel portrait of the owner, matching the sprite), and the parallel lines start from it.

Motion grammar: transform and opacity only; exits are faster than entrances; no ease-in. The sprite's walk is a stepped CSS animation (`steps()`). Station pages enter with a short slide along the line's direction.

Raises (from declined challengers):
- flat fills only (elbow panel);
- one narrator voice (choice frame);
- the accent is the control (drawcord cape);
- one continuous stroke (neon circuit);
- newest is darkest (ink basin);
- a marker always shows where you are (step row).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
