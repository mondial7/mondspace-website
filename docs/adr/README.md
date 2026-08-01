# Architecture Decision Records

Each ADR captures one decision in a simple, incremental format. New decisions
get the next number; superseded ones are marked, not deleted.

Format per file:

```
# N. Short title

- Date: YYYY-MM-DD
- Status: Proposed | Accepted | Superseded by ADR-XXXX

## Context
What forces are at play?

## Decision
What we chose.

## Consequences
What follows — good and bad.
```

## Index

- [0001](0001-keep-voxel-three-js-world.md) — Keep the voxel Three.js world as the presentation layer
- [0002](0002-content-driven-data-layer.md) — Content stays a thin data layer, separate from the world
- [0003](0003-site-stays-at-repo-root.md) — Site stays at repo root for GitHub Pages (no monorepo move)
- [0004](0004-five-areas-as-categories.md) — Map six vision themes onto five spatial areas as categories
- [0005](0005-case-study-drawer-overlay.md) — Deep content lives in a DOM overlay, not the 3D scene
- [0006](0006-embeddable-demo-pattern.md) — Interactive demos are self-contained, lazily mounted modules
- [0007](0007-content-modules-and-graph.md) — Split content into per-category modules with a cross-link graph
- [0008](0008-park-audio-cv.md) — Park the audio CV (remove from UI, keep the source)
- [0009](0009-ground-product-case-studies-in-real-apps.md) — Ground the product case studies in the real apps
- [0010](0010-project-context-distinction.md) — Distinguish project context: business vs indie vs talk
- [0011](0011-library-area-and-villagers.md) — The Library area, About-as-panel, and villager mobs
