# 1. Keep the voxel Three.js world as the presentation layer

- Date: 2026-07-30
- Status: Accepted

## Context

The existing site is a compact (~1,900 line) Three.js voxel world: five
navigable areas, a roaming dog, custom HUD, audio CV, mobile scroll navigation.
The rework could have replaced it with a conventional content site. But the
world's playfulness and memorability *is* the brand — it communicates "how Marco
thinks" better than a template would, and the vision explicitly says to keep it.

## Decision

Keep the voxel world, Three.js, the dog, the compass, the loading sequence and
the audio CV. Improve the site by deepening content, not by adding visual
effects or replacing the engine.

## Consequences

- The world remains the atmospheric "lobby." New capabilities layer *on top*.
- We inherit the five-fixed-spatial-slot constraint (see ADR 0004).
- No build tooling is pulled in for its own sake; the site stays static.
