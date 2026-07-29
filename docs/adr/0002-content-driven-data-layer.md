# 2. Content stays a thin data layer, separate from the world

- Date: 2026-07-30
- Status: Accepted

## Context

`js/content.js` already declares the intent: "All site content lives here so the
world stays a thin presentation layer." The vision needs the site to grow
substantially (case studies, projects, talks, a playbook) without the world code
growing in lockstep.

## Decision

All human-facing content lives in data (`content.js`, later `js/content/`
modules). The world, HUD and drawer render *from* that data and never hardcode
copy. Growing the site means editing data, not rendering code.

## Consequences

- Content is reusable, searchable and easy to extend.
- Rendering code (world/HUD/drawer) is generic and stable.
- A shared content schema must be defined and honoured (see ADR 0004, 0007).
