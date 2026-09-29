export type Game = {
  slug: string;
  title: string;
  description: string;
  genre: string;
  emoji: string;
  url?: string;
};

export const games: Game[] = [
  {
    slug: "snake",
    title: "Snake",
    description: "เกมงูคลาสสิก เก็บอาหารให้ได้มากที่สุด",
    genre: "Arcade",
    emoji: "🐍",
  },
  {
    slug: "2048",
    title: "2048",
    description: "รวมตัวเลขให้ถึง 2048",
    genre: "Puzzle",
    emoji: "🔢",
  },
  {
    slug: "tetris",
    title: "Tetris",
    description: "เรียงบล็อกให้เต็มแถว",
    genre: "Puzzle",
    emoji: "🧱",
  },
  {
    slug: "flappy",
    title: "Flappy",
    description: "บินหลบท่อให้ได้ไกลที่สุด",
    genre: "Casual",
    emoji: "🐦",
  },
];
