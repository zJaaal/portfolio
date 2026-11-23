---
target: home page (Origin + RunMap + footer)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/zjaaal/Desktop/repos/portfolio/src/pages/[lang]/index.astro"
target_fingerprint: "sha256:87033511a39474b16413d3e5e76c0158260d37af10a790055170cfe918b50daa"
target_path: /Users/zjaaal/Desktop/repos/portfolio/src/pages/[lang]/index.astro
timestamp: 2026-11-19T01-14-24Z
slug: src-pages-lang-index-astro
---
# Critique: home (run map), 2026-11-18
Method: dual-agent. Score 20/32 (n/a: 7, 10). Detector: 0 findings (CLI + overlay at 1440 light/dark, 390 light); no overflow, contrast OK, focus visible.

Heuristics: 1:3 2:3 3:3 4:2 5:2 6:2 7:n/a 8:3 9:2 10:n/a

Priority issues:
- [P1] Best work buried under origin story; phone first viewport is biography only. Fix: "Now" line in intro linking Content Drive / Artemis / Che Bondi (or fold origin into About / newest-first).
- [P1] Contact boss node 404s. Fix: mailto:me@zjaaal.dev until a Contact page exists; show the address as its meta.
- [P2] Unexplained grammar: grey road-ahead, ? doors, LINE CLEARED flag, grey "my path". Fix: key above the map with two more entries.
- [P2] Time axis mixed: 2020/2022/2023 inline in origin labels, 2025/2026 gutter ticks, 2024 absent. Fix: one system, tick every year.
- [P2] Live placeholder "Joined dotCMS · 2023 · […]".

Persona flags: hiring manager bounces before shipped work; Casey sees biography only and detached labels; Jordan has no click affordance at rest; Sam hears run-together link names.
Minor: "react-scroll-/utilities" hyphen break at 1440/820; LINE CLEARED for tooling sits at 2026; header zJaaal duplicates h1; DESIGN.md + surface brief still describe the transit line.
Station-page handoff: carry icon tile, line color and verb into the page header; <ol> order = prev/next; bilingual 404 with a way back.
