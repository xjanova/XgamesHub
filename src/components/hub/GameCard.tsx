"use client";

import type { PointerEvent } from "react";
import type { Game } from "@/data/games";

const BADGE: Record<Game["state"], string> = {
  play: "WEB DEMO",
  dev: "IN DEVELOPMENT",
  concept: "CONCEPT",
};

/** Card with real depth: art, badge and text sit on different Z planes and the card tilts toward the pointer. */
export default function GameCard({
  game,
  index,
  version,
  onOpen,
  onHover,
}: {
  game: Game;
  index: number;
  /** live version from the game's devlog, when it publishes one */
  version?: string;
  onOpen: (g: Game) => void;
  onHover: (g: Game | null) => void;
}) {
  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || document.documentElement.dataset.motion === "off") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const reset = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    onHover(null);
  };

  return (
    // In a preserve-3d card the raised layers sit in front of anything flat, so the
    // whole card takes the click; the button is there for keyboard and screen readers.
    <article
      className="card"
      data-state={game.state}
      data-id={game.id}
      style={{ ["--accent" as string]: game.palette[2], ["--accent2" as string]: game.palette[0] }}
      onPointerMove={tilt}
      onPointerEnter={() => onHover(game)}
      onPointerLeave={reset}
      onClick={() => onOpen(game)}
    >
      <button
        type="button"
        className="card-hit"
        onClick={(e) => {
          e.stopPropagation();
          onOpen(game);
        }}
        onFocus={() => onHover(game)}
        aria-label={`ดูรายละเอียด ${game.name}`}
      />
      <div className="card-3d">
        <div className="card-art">
          <img src={game.image} alt="" loading="lazy" decoding="async" draggable={false} />
          <div className="card-art-fade" />
        </div>
        <span className={`card-badge ${game.state}`}>
          {game.state === "play" ? "▷ " : game.state === "concept" ? "✳ " : ""}
          {BADGE[game.state]}
        </span>
        {game.platform && game.platform !== "web" && (
          <span className={`card-platform ${game.platform}`}>{game.platform === "roblox" ? "ROBLOX" : "PC"}</span>
        )}
        <span className="card-num">X / {String(index + 1).padStart(2, "0")}</span>
        {game.fund && <span className="card-main">{game.id === "hive-breach" ? "★ โปรเจกต์หลัก" : "ร่วมสนับสนุน"}</span>}
        <div className="card-body">
          <h3>{game.name}</h3>
          <div className="card-genre">{game.genre.toUpperCase()}</div>
          <p>{game.tagline}</p>
          <div className="card-foot">
            <span className="card-stage">
              <i /> {game.stage}
              {version && <em className="card-ver">{version}</em>}
            </span>
            {game.play ? (
              <a className="card-cta play" href={game.play} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                {game.platform === "roblox" ? "เล่นใน Roblox" : "เล่นเลย"} <span aria-hidden="true">▷</span>
              </a>
            ) : (
              <span className="card-cta">
                สำรวจเกม <span aria-hidden="true">⊕</span>
              </span>
            )}
          </div>
        </div>
        <div className="card-glare" />
      </div>
    </article>
  );
}
