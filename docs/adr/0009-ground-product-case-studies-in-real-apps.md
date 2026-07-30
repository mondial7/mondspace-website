# 9. Ground the product case studies in the real apps

- Date: 2026-07-30
- Status: Accepted

## Context

The Thoughtful Products case studies (journaling, habit tracker, currency
converter) began as plausible mock copy. Three of them are backed by real,
shipping iOS apps in sibling repos (`mondspace-journal` → **Mira**,
`mondspace-habits` → **Leafstep**, `mondspace-finance` → **MConverter**). The
mock copy had drifted from what the apps actually do, and in two cases made
claims the code contradicts.

## Decision

Rewrite those three case studies from the actual source. Concretely:

- Use the real product names, platform (iOS / SwiftUI) and status (App Store,
  where verified), and real architecture details (SwiftData, CloudKit, the pure
  `JournalKit` package, the on-device nudge scoring, ExchangeRate-API caching).
- **Correct two overclaims:**
  - Journal — drop "no streaks, no badges, no guilt"; v1.1 shipped a *gentle*
    streak. The copy now says so, and reframes around structured, private capture.
  - Currency — replace "offline-first" with "works offline on cached rates"; the
    app is offline-*capable* (graceful fallback), not offline-first by design.
- Keep the habit tracker's "re-engagement over streaks" thesis — it is validated
  by the real nudge scoring (days-since-action ×3 vs streak-protection ×0.5).

Puppy Companion and Office Chores remain as-is (no backing repo provided).

## Consequences

- Case studies now match the shipping products; claims are defensible.
- New themes (Privacy by design, Travel) enter the graph/search.
- Standing rule: prefer verifiable detail from the source over inventive copy;
  when the product changes, update the case study rather than let it drift.
