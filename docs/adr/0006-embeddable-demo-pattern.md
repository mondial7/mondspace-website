# 6. Interactive demos are self-contained, lazily mounted modules

- Date: 2026-07-30
- Status: Accepted

## Context

The vision wants explorable, Bret-Victor-style demos (KPI Explorer, later a Pair
Programming Simulator, AI Adoption Canvas). These are heavier than static content
and shouldn't load on first paint or bloat the world bundle. They also must not
entangle with the Three.js scene or each other.

## Decision

Each demo is a standalone ES module under `js/demos/` exporting
`mount(el) => cleanup?`. A registry (`js/demos.js`) maps a project's
`explore.kind` to a lazy `import()`. The drawer mounts the demo into its
`Explore` slot only when that project is opened, and calls the returned cleanup
when the drawer closes or navigates.

Demos own their styling (a guarded, injected `<style>`), take no dependencies on
the world, and receive only a DOM element.

## Consequences

- Zero cost until a visitor actually opens a project with a demo.
- New demos are added by dropping a module in `js/demos/` and one registry line —
  no changes to the world, HUD or drawer.
- Demos can't leak state: cleanup runs on close, and each is scoped to its mount.
- Trade-off: each demo re-implements small UI primitives rather than sharing a
  framework. Acceptable while demos are few and deliberately distinct.
