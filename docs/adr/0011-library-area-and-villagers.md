# 11. The Library area, About-as-panel, and villager mobs

- Date: 2026-07-30
- Status: Accepted

## Context

The `down` area was "About" — a couple of narration lines (and, historically, the
audio CV). It was the thinnest area and didn't use the card/drawer pattern that
carries the rest of the site. Separately, two scene avatars (the stage speaker
and the workbench builder) read as generic Steve-like humanoids rather than
something characterful and on-theme.

## Decision

**Repurpose `down` into "The Library".** It now holds project-style cards like
every other area:

- an **About Marco** card — the bio moved into a drawer panel (sections
  `now` / `path` / `beyond`), so "about me" is explorable, not a static blurb;
- a starter shelf of **book** cards (sections `about` / `why` / `takeaway`),
  cross-linked into the graph (e.g. Accelerate ↔ Engineering KPIs).

To support non-project section keys, the drawer now renders sections in authored
order via a `SECTION_LABELS` map with a humanised fallback, instead of a fixed
project-only order.

**Re-theme the `down` 3D scene** from a jukebox pit to a sunken **library +
enchanting table**: bookshelf-lined walls, an obsidian table with the red-cloth
top, a floating open book, rising rune particles, and warm + arcane point lights.
New `bookshelf` and `enchantTop` canvas textures; `buildPitAndJukebox` →
`buildPitAndLibrary`; the now-unused `setJukeboxPlaying` hook is removed (the
audio source stays parked per ADR 0008).

**Turn the two mobs into trading villagers.** A new `buildVillager` (big
brow-nose, robe + apron, clasped hands, idle head-bob) replaces `buildAvatar`
on the stage and workbench. `buildAvatar` is kept in the file for reference.

**Refinements after first review:**

- The Engineering Playbook **moves from Knowledge Garden into The Library** (it's
  my writing, and it belongs on the shelf). Knowledge Garden is now purely talks.
- The first library scene read as gray/brown from the top-down pit camera (you
  saw plank tops, not spines). Reworked into a **reading nook**: a tall bookshelf
  back-wall that faces the camera and rises above the rim, side-shelf returns,
  glowstone lanterns, and the **enchanting table lifted onto a dais to rim
  level** so it's unmistakable. The `down` camera drops lower and looks across
  rather than straight down.
- The **jukebox + note particles move to the stage** (up) as scenery — music
  fits the speaker; it no longer belongs in the library.
- **Navigation fix:** hovering the narration card now fully pauses mouse
  navigation (no area change, no parallax drift), so the tall Library card can be
  read without the view sliding away.

## Consequences

- Every area now follows the card/drawer pattern; "about me" gains depth.
- The world's bottom scene matches its new meaning (a library), reinforcing the
  brand rather than showing leftover gray blocks.
- Books enter search and the cross-link graph like any other entry.
- The book list is an editable starter set, not a verified favourites list —
  flagged in the module so it's replaced deliberately.
- 3D changes can't be verified in the CI/sandbox by default; they were checked
  with software-WebGL screenshots and must be eyeballed in a real browser.
