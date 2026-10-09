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
  xnova: { src: "/art/xnova.webp", style: "art", focus: "50% 28%", kind: "KEY ART" },
  theone: { src: "/art/theone.webp", style: "art", focus: "55% 35%", kind: "KEY ART" },
  umbra: { src: "/art/umbra.webp", style: "art", focus: "62% 45%", kind: "KEY ART" },
  chanthra: { src: "/art/hero/chanthra.webp", style: "art", focus: "50% 30%", kind: "KEY ART" },
  tetrisvs: { src: "/art/tetrisvs.webp", style: "screen", kind: "IN-GAME" },
  snake: { src: "/art/snake.webp", style: "screen", kind: "TITLE SCREEN" },
  "8ball": { src: "/art/8ball.webp", style: "screen", kind: "IN-GAME" },
  snooker: { src: "/art/snooker.webp", style: "screen", kind: "IN-GAME" },
  tetris: { src: "/art/tetris.webp", style: "screen", kind: "IN-GAME" },
  "space-shooter": { src: "/art/space-shooter.webp", style: "screen", kind: "IN-GAME" },
};

/** Games without an entry fall back to their card art. */
export const heroStill = (g: Game): HeroStill => heroStills[g.id] ?? { src: g.image, style: "art", kind: "KEY ART" };
