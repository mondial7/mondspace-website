# 5. Deep content lives in a DOM overlay, not the 3D scene

- Date: 2026-07-30
- Status: Accepted

## Context

Areas need to hold real depth: Problem / Build / Decisions / Learnings, plus an
interactive demo. This is long-form, scrollable, readable content. It could be
rendered inside the Three.js scene (as textured planes or CSS3D), but that would
be hard to read, hard to make accessible, and would couple content to the
renderer — against the vision's "add deeper content rather than more visual
effects."

## Decision

Deep content renders in a plain **HTML/DOM drawer** (`js/drawer.js`) layered
above the canvas. The world is the lobby; the drawer is where you read. Each
project renders from data in a consistent "Pokémon card" shape:
`{ slug, title, type, status, meta, summary, themes[], sections{}, explore?,
related?, links? }`. A tiny markdown subset (paragraphs, bullets, bold, italic,
code) keeps content authorable in plain strings.

The drawer is opened from compact cards in each area's narration panel and is
**deep-linkable** via the URL hash (`/#engineering-product-workspace`).

## Consequences

- Content is readable, accessible (`role="dialog"`, Esc/backdrop close, focus
  restore) and decoupled from the renderer.
- Adding a case study is pure data — no drawer/render changes.
- Interactive demos mount into an `Explore` slot via a registry (see ADR 0006).
- The world and the reading experience can evolve independently.
