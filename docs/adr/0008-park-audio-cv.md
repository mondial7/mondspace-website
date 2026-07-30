# 8. Park the audio CV (remove from UI, keep the source)

- Date: 2026-07-30
- Status: Accepted

## Context

The site shipped with an "8 min · Play" audio CV (an AI-narrated recording) as a
jukebox control in the narration panel, plus a matching 3D jukebox in the About
area. While the site is a preview and its content is still under review, the
audio CV isn't ready to represent Marco and shouldn't be surfaced anywhere.

## Decision

Remove the audio CV from the page entirely for now, but keep all source so it can
return later — specifically in the About card only.

Removed from the running UI:

- the jukebox controls and the `<audio>` element in `index.html`;
- the `createAudio()` wiring in `main.js` and the `jukeboxEl` handling in
  `hud.js`;
- the `audio: true` flag on the About area, and the audio reference in its copy.

Kept as parked source (untouched, unreferenced):

- `js/audio.js` (the player module);
- `mmcv-2025-05-26.m4a` (the recording);
- `AUDIO_SRC` in `content.js` and the jukebox CSS, both annotated.

The About copy was rewritten to stand on its own (bio + GitHub/LinkedIn + "a
fuller CV lands here soon"), consistent with the site-wide preview badge
(ADR-less, see `.wip-badge`).

Note: the unrelated `resumeAudio()` path (the dog's bark WebAudio context) is
kept — it is not the CV audio.

## Consequences

- No audio CV appears anywhere in the UI.
- Re-adding it is a small, localised change: restore the markup + `createAudio`
  call and set `audio: true` on About. The 3D jukebox scenery and its
  `setJukeboxPlaying` hook remain in the world, ready to reconnect.
- Some now-dead code/CSS remains on purpose; it is annotated to avoid confusion.
