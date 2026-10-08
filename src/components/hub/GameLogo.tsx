import { gameLogos } from "@/data/game-logos";
import type { Game } from "@/data/games";

export default function GameLogo({ game, className, lazy = false }: { game: Game; className: string; lazy?: boolean }) {
  const logo = gameLogos[game.id];
  return logo ? (
    <picture>
      <source type="image/webp" srcSet={logo.src} />
      <img className={className} src={logo.png} width={logo.width} height={logo.height} alt={game.name} loading={lazy ? "lazy" : "eager"} decoding="async" draggable={false} />
    </picture>
  ) : <>{game.name}</>;
}
