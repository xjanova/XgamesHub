import { gameLogos } from "@/data/game-logos";
import type { Game } from "@/data/games";

export default function GameLogo({ game, className, lazy = false }: { game: Game; className: string; lazy?: boolean }) {
  const logo = gameLogos[game.id];
  return logo ? (
    <img className={className} src={logo.src} width={logo.width} height={logo.height} alt={game.name} loading={lazy ? "lazy" : "eager"} decoding="async" draggable={false} />
  ) : <>{game.name}</>;
}
