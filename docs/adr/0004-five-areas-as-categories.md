# 4. Map six vision themes onto five spatial areas as categories

- Date: 2026-07-30
- Status: Accepted

## Context

The world has five fixed spatial slots — `center`, `up`, `left`, `right`,
`down` — hardwired into navigation (mouse direction / scroll tour), the compass
d-pad, and the world geometry. The vision lists six themes (Engineering Systems,
Thoughtful Products, AI Experiments, Knowledge Garden, Sustainable Engineering,
Continuous Learning). Six themes do not fit five slots one-to-one, and adding a
sixth slot would mean reworking navigation + geometry for little gain.

## Decision

Keep five spatial areas. Promote each area from "a paragraph" to a **category**
that holds multiple project cards. Map the themes:

- `center` → **Spawn** (identity, positioning, timeline, links)
- `left` → **Engineering Systems** (workspace, KPIs, AI assistant, 360 feedback —
  AI Experiments fold in here as systems)
- `right` → **Thoughtful Products** (journaling, puppy, habits, currency, plus
  playful tools like office chores)
- `up` → **Knowledge Garden** (talks as interactive artifacts + Engineering Playbook)
- `down` → **About** (audio CV, written CVs, contact)

Sustainable Engineering and Continuous Learning are cross-cutting *themes* on
cards, not areas.

## Consequences

- No navigation/geometry rework; the spatial model is preserved.
- Areas need a card list + a way to open a card (see ADR 0005).
- Theme tags on cards let cross-cutting pillars surface via the graph (ADR 0007).
