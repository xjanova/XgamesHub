import { hiveBreachPage } from "./fund-hive-breach";

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
