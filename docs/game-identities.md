# Catalogue game identities

The hub uses one logo registry for all 29 games, shared by spotlight slides,
catalogue cards and game detail dialogs. The game name remains the image's
accessible label. New vector marks are editable design proposals for the existing
game concepts; the game executables themselves are unchanged.

## Existing identities

- HIVE // BREACH: COREWAR: original `public/art/corewar-logo.webp`.
- X-NOVA: BREAKER: original in-game `public/art/breaker/logo.webp`.
- SIAM SPEED: original `D:/GameProject/SiamSpeed/assets/ui/logo.png`, converted
  to WebP without visual edits, saved as `public/art/logos/siam-speed.webp`.
- X-NOVA: title-screen italic heavy wordmark, gold X and violet NOVA from
  `XNova/css/xnova.css`, adapted into a transparent SVG.
- THE ONE: title-screen gold serif typography from `TheOne/css/game.css`.
- NOVA·UMBRA: title-screen ivory serif wordmark and lavender interpunct from
  `Umbra/css/umbra.css`.

`JuntraGame/assets/banners/logo.webp` was inspected and rejected: it is a full
MAE MO CHANTHRA banner, not a JUNTRA game logo. Do not map it to JUNTRA.

## Newly designed marks

All output paths are `public/art/logos/<id>.svg`. Their exact editable vector
design definitions are in `scripts/build-game-logos.mjs` (run with Node).

| Game | Symbol |
| --- | --- |
| MAE MO CHANTHRA | Crescent and divination eye |
| TetrisVS | Interlocking blocks and versus lightning |
| SNAKE.IO | Continuous snake trail |
| 8 BALL POOL | Numbered eight ball |
| SNOOKER 2D | Cue, ball and pocket geometry |
| TETRIS CLASSIC | T-block and falling squares |
| SPACE SHOOTER | Fighter silhouette and tracer lines |
| ROLLABRAIN | Rolling globe and orbital trail |
| MAZE CHASE | Open maze and collectible |
| RUBLICX | Subdivided isometric cube |
| RUNEWARD | Rune-bearing shield |
| LUCKY ISLES | Tilted dice and island baseline |
| NEON COVEN | Neon circle, triangle and energy bolt |
| CAFÉ PROJECT | Cup, steam and saucer |
| JUNTRA | Reading book under a crescent |
| THE ONE · สูญกัป | Ritual sword and broken circular seal |
| XENON | Light gunship silhouette |
| ASTRAL PACT | Tarot card and pact star |
| TYPE//NOVA | Code brackets and slash |
| SOI RIOT | Street-sports ball |
| PARADOX PINBALL | Pinball cabinet and phase bumper |
| LOTUS ASCENSION | Layered lotus crest |
| SKYSHARD | Rune shard above an artillery tank |

Vector assets are repo-native designs, not AI-generated raster images. Transparent
backgrounds, exact catalogue names and individual palettes are preserved.

## Spotlight media

HIVE uses the original responsive concept-reveal video sources and poster from
its full fundraising page. BREAKER uses its actual demo gameplay recording.
Other slides retain their interactive planets; no footage is substituted from
another game. The duplicate main-project banner above the carousel is removed.
The carousel retains funding totals, page links, navigation and game actions.
Videos pause offscreen, in background tabs and when Motion is disabled, and do
not autoplay for a data-saving connection. Each clip has a pause/play control.
