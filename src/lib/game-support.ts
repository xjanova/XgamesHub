export const STUDIO =
  process.env.NEXT_PUBLIC_XMAN_STUDIO_URL || "https://xman4289.com";
export const supportUrl = (slug?: string) =>
  `${STUDIO}/games-support${slug ? `/${encodeURIComponent(slug)}` : ""}`;
export type CommunityGame = {
  slug: string;
  name: string;
  goal: number;
  raised: number;
  supporters: number;
  votes: number;
  stars: number;
  rating_count: number;
};
