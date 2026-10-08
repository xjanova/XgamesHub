/** One identity per catalogue game. Existing game logos take precedence. */
export type GameLogo = { src: string; width: number; height: number };

const ids = ["xnova", "umbra", "theone", "chanthra", "tetrisvs", "snake", "8ball", "snooker", "tetris", "space-shooter", "rollabrain", "maze", "rublicx", "runeward", "lucky", "neon", "cafe", "juntra", "theone-sunkalp", "xenon", "astral-pact", "type-nova", "soi-riot", "paradox-pinball", "lotus-ascension", "skyshard"];

export const gameLogos: Record<string, GameLogo> = Object.fromEntries(
  ids.map(id => [id, { src: `/art/logos/${id}.svg`, width: 900, height: 240 }]),
);
gameLogos["hive-breach"] = { src: "/art/corewar-logo.webp", width: 900, height: 320 };
gameLogos.breaker = { src: "/art/breaker/logo.webp", width: 1400, height: 460 };
gameLogos["siam-speed"] = { src: "/art/logos/siam-speed.webp", width: 1024, height: 416 };
