# 10. Distinguish project context: business vs indie vs talk

- Date: 2026-07-30
- Status: Accepted

## Context

The garden mixes three kinds of work that a visitor (especially a hiring
manager) reads very differently: professional work done in a business context,
indie projects built for myself, and conference talks. Without a signal they all
look alike, which both undersells the organisational leverage of the business
work and blurs the personal craft of the indie apps.

## Decision

Add a `context` field to every project — `"business"`, `"indie"` or `"talk"` —
and a `CONTEXTS` map in `content.js` giving each a short label, a full label and
a colour:

- **business** → "Work" / "Business project" · cyan (#7ec0ee)
- **indie** → "Indie" / "Indie project" · amber (#FF9800)
- **talk** → "Talk" / "Conference talk" · orchid (#DA70D6)

Surfaced in three places:

- **Area cards** — a small colour-coded eyebrow (a dot + short label) above the
  title.
- **Drawer** — a coloured pill (the full label) as the first badge, visually
  distinct from the neutral type/status/meta badges.
- **Search** — the context labels are indexed, so "indie" or "work" filters.

Classification: the four apps (Mira, Mare, Leafstep, LempiraEUR) and the
Engineering Playbook are `indie`; the uButler systems and the Office Chores tool
are `business`; the three conference sessions are `talk`.

## Consequences

- Business impact and indie craft read as distinct at a glance, everywhere.
- Adding a project now includes one honest `context` value; the field is used by
  cards, drawer and search from the shared map (no per-surface duplication).
- The drawer badge uses `color-mix()` for its tint — fine for the modern
  browsers this Three.js site already targets.
- If a fourth kind ever appears (e.g. open-source contributions), extend the
  `CONTEXTS` map rather than special-casing the UI.
