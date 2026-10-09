import { hiveBreachPage } from "./fund-hive-breach";
import type { Game } from "./games";

/** Existing game-page media only; never substitute footage from another game. */
export type SpotlightMedia = {
  poster: string;
  sources: { src: string; media?: string }[];
  label: string;
  kind: string;
};

export const spotlightMedia: Partial<Record<string, SpotlightMedia>> = {
  "hive-breach": {
    poster: hiveBreachPage.hero,
    sources: hiveBreachPage.video?.sources ?? [],
    label: hiveBreachPage.video?.label ?? "วิดีโอคอนเซปต์ HIVE // BREACH",
    kind: "CONCEPT REVEAL",
  },
  breaker: {
    poster: "/art/breaker/argus.webp",
    sources: [{ src: "/video/breaker/gameplay.mp4" }],
    label: "วิดีโอเกมเพลย์จริงจากเดโม BREAKER",
    kind: "ACTUAL GAMEPLAY",
  },
};

/**
 * The still a hero slide shows when the game has no video yet.
 * "art" = key art, shown large on the right with a slow camera drift.
 * "screen" = an in-game screenshot, shown as a floating screen over a blurred copy of itself,
 * so the game's own HUD never sits under the slide's text.
 */
export type HeroStill = { src: string; style: "art" | "screen"; /** object-position of the art */ focus?: string; kind: string };

const heroStills: Partial<Record<string, HeroStill>> = {
  xnova: { src: "/art/xnova.webp", style: "art", focus: "50% 8%", kind: "KEY ART" },
  theone: { src: "/art/theone.webp", style: "art", focus: "55% 10%", kind: "KEY ART" },
  umbra: { src: "/art/umbra.webp", style: "art", focus: "62% 45%", kind: "KEY ART" },
  chanthra: { src: "/art/hero/chanthra.webp", style: "art", focus: "50% 12%", kind: "KEY ART" },
  // key art made with ChatGPT for the games whose only picture was a screenshot
  tetrisvs: { src: "/art/hero/tetrisvs.webp", style: "art", focus: "55% 45%", kind: "KEY ART" },
  snake: { src: "/art/hero/snake.webp", style: "art", focus: "70% 45%", kind: "KEY ART" },
  "8ball": { src: "/art/hero/8ball.webp", style: "art", focus: "75% 40%", kind: "KEY ART" },
  snooker: { src: "/art/hero/snooker.webp", style: "art", focus: "50% 55%", kind: "KEY ART" },
  tetris: { src: "/art/hero/tetris.webp", style: "art", focus: "55% 50%", kind: "KEY ART" },
  "space-shooter": { src: "/art/hero/space-shooter.webp", style: "art", focus: "70% 45%", kind: "KEY ART" },
};

/** Games without an entry fall back to their card art, anchored high so a character keeps their head. */
export const heroStill = (g: Game): HeroStill => heroStills[g.id] ?? { src: g.image, style: "art", focus: "50% 10%", kind: "KEY ART" };
