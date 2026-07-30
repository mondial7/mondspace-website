# 7. Split content into per-category modules with a cross-link graph

- Date: 2026-07-30
- Status: Accepted

## Context

By phase 3, `content.js` held 13 projects with full case-study prose in one
file — hard to navigate and edit. The vision also wants a Simon-Willison-style
interconnected garden: ideas that link to each other and are findable by theme,
not just by location.

## Decision

Split content into per-category modules under `js/content/`
(`engineering-systems.js`, `thoughtful-products.js`, `knowledge-garden.js`).
`content.js` imports them, assembles `AREAS`, and derives a flat `PROJECTS`
index by slug. The public API (`AREAS`, `PROJECTS`, `LINKS`, `AUDIO_SRC`,
`PALETTE`) is unchanged, so nothing downstream breaks.

The graph is expressed two ways:

- **`related[]`** on each project — rendered as "Related ideas" cards in the
  drawer; clicking navigates without closing.
- **`themes[]`** — rendered as clickable tags that open **search** prefilled
  with the theme, so a visitor can wander by idea across categories.

Search (`js/search.js`) indexes every project's title, type, summary, themes and
section prose, with whole-word matches outranking substrings, and opens results
in the drawer. A `/` shortcut and a nav button open it.

## Consequences

- Adding a category is a new module + one import; adding a project is one object.
- The site is now navigable three ways: spatially (world), by relationship
  (related), and by idea (themes + search) — the "living garden" the vision asked
  for.
- Content and search share one schema; a new field (e.g. `tech[]`) flows to both.
- Trade-off: search is a linear in-memory scan. Fine for tens of projects; if the
  garden grows to hundreds, revisit with a prebuilt index (new ADR).
