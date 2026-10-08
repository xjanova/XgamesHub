# Production PNG game identities

All 29 games have individual transparent PNG master logos for actual project use.
The same identity is shared by hub slides, catalogue cards and detail dialogs.
The web uses smaller alpha WebP versions via a picture source, with PNG fallback.
Names remain accessible labels and work with the existing catalogue search.

## Files

- Full-resolution masters: `public/art/logos/<game-id>.png` (29 files).
- Optimised generated-logo previews: `public/art/logos/<game-id>.webp` (26 files).
- Existing HIVE and BREAKER web previews remain at their original paths.
- Registry and actual dimensions: `src/data/game-logos.ts`.
- Exact final prompt set and provenance: `docs/game-logo-prompts.json`.
- Optional local packaging script: `scripts/prepare-png-game-logos.mjs`.

## Existing artwork preserved

- HIVE // BREACH: COREWAR uses its original transparent PNG from
  `HIVE II BREACH/Art/Game/corewar-logo-transparent-v4.png`.
- X-NOVA: BREAKER uses the actual game's transparent `assets/img/logo.webp`,
  decoded to PNG without visual edits. The raw `art_src/raw/logo.png` has a baked
  checkerboard and is deliberately not used as a production master.
- SIAM SPEED uses the game's original `assets/ui/logo.png`.

`JuntraGame/assets/banners/logo.webp` was inspected and rejected: it is a full
MAE MO CHANTHRA banner, not a JUNTRA game logo.

## Newly created production art

26 new logos were generated separately with the built-in imagegen tool, each
with genuine transparency, exact catalogue wording and its own game-specific
materials and crest. X-NOVA retains its gold X / violet NOVA identity; UMBRA
keeps ivory and lavender lunar motifs; THE ONE keeps gold astral fantasy motifs.
Other logos reflect their actual genres: neon combat, billiards, rune defense,
cozy cafe, tarot, Thai street sports, puzzle blocks and gunships. No simple SVG
wordmarks or vector placeholders are used by the production logo registry.

The original generated PNGs are retained unchanged at full resolution. WebP
conversion only resizes/encodes the same pixels while preserving alpha.

## Spotlight

The duplicate main-project banner above the carousel is removed. HIVE uses the
original responsive concept-reveal video and poster from its full fund page.
BREAKER uses the actual demo gameplay recording. Both slides retain their own
logos, campaign links and live funding totals. Other slides retain interactive
planets. Video playback respects Motion, tab visibility and data saving, with a
visible play/pause control positioned clear of Nova. Nova docks for video slides.

## Context

Existing hub context was read from the BrainX note:
“Session 2026-10-05 - XgamesHub full-3D hub + Nova gamer-girl video guide
(deployed via xmanstudio sites)”. The note is historical context; current releases
are deployed by this repository's Release & Deploy workflow.
