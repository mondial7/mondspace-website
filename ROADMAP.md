# Mondspace Roadmap

> Turning a voxel portfolio into a **living engineering garden**.
>
> Positioning: **Marco Mondini — building systems that help people and engineering teams thrive.**

This roadmap maps the [vision](docs/vision.md) onto the *actual* architecture: a
content-driven Three.js voxel world served statically from the repo root on
GitHub Pages. Almost the entire vision is built incrementally on the existing
`content.js` data layer — no rewrite. Each phase ships something a visitor can
see; no phase is pure plumbing.

Architecture decisions are recorded in [`docs/adr/`](docs/adr/).

---

## Guiding principles

- **The world is the lobby, not the container.** Deep content (case studies,
  demos) lives in HTML/DOM overlays above the 3D scene — per the vision's
  "add deeper content rather than more visual effects."
- **Content stays a thin data layer.** The Three.js world renders from data;
  growing the site means adding content, not rebuilding machinery.
- **Five spatial areas, each a category.** The world has five fixed spatial
  slots (`center/up/left/right/down`). Each becomes a *category* holding
  multiple project cards, so the six vision themes fold cleanly into five areas.
- **Restructure last.** The monorepo folder tree pays off only once there are
  many apps/demos to house — and never at the cost of breaking the live site.

---

## Phase 0 — Identity ✅

The cheapest, highest-leverage change. No new architecture.

- Rewrite `content.js` Spawn to the Staff Engineer positioning.
- Re-theme the five areas to identity pillars: Spawn · Engineering Systems ·
  Thoughtful Products · Knowledge Garden · About.
- Update `index.html` meta description + `<noscript>` fallback.

**Ships:** a coherent positioning the moment someone lands.

## Phase 1 — Depth: the case-study drawer ✅

- Extend the content model: each area holds `projects[]`, each project a
  Problem / Build / Decisions / Learnings / Explore structure ("Pokémon card"
  format, consistent across everything).
- Build one HTML overlay: entering an area / clicking a card expands into a
  scrollable case-study drawer.
- Populate real case studies from career history + thoughtful-product mock data.

**Ships:** proof the format works, with real flagship stories.

## Phase 2 — Interactivity: first explorable ✅

- Build the **Engineering KPI Explorer** as a self-contained module, mounted in
  a project's `Explore` slot.
- Establish the embeddable-demo pattern (isolated, can't bloat the world bundle).

**Ships:** the first genuinely *distinctive*, interactive artifact.

## Phase 3 — Knowledge garden ✅

- Organise content into modules (`js/content/` per category).
- Cross-link projects ("related ideas") into a small knowledge graph.
- Add search across all content.
- Keep the site at repo root for GitHub Pages (see ADR 0003).

**Ships:** the Simon-Willison-style interconnected garden.

---

## Success criteria

After 10–15 minutes, a visitor should think: *Marco is deeply technical,
thinks in systems, improves engineering organisations, builds thoughtful
products, and teaches through interactive experiences.*
