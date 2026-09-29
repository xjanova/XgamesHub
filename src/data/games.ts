export type Game = {
  slug: string;
  title: string;
  description: string;
  genre: string;
  emoji: string;
  /** Neon accent used for the game's portal in the 3D hub */
  color: string;
  url?: string;
};

export const games: Game[] = [
  {
    slug: "snake",
    title: "Snake",
    description: "เกมงูคลาสสิก เก็บอาหารให้ได้มากที่สุด",
    genre: "Arcade",
    emoji: "🐍",
    color: "#39ff88",
  },
  {
    slug: "2048",
    title: "2048",
    description: "รวมตัวเลขให้ถึง 2048",
    genre: "Puzzle",
    emoji: "🔢",
    color: "#ffb938",
  },
  {
    slug: "tetris",
    title: "Tetris",
    description: "เรียงบล็อกให้เต็มแถว",
    genre: "Puzzle",
    emoji: "🧱",
    color: "#3fd2ff",
  },
  {
    slug: "flappy",
    title: "Flappy",
    description: "บินหลบท่อให้ได้ไกลที่สุด",
    genre: "Casual",
    emoji: "🐦",
    color: "#ff4fd8",
  },
];
