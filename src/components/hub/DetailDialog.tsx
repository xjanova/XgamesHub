"use client";

import { useEffect, useRef } from "react";
import type { Game } from "@/data/games";

const STATE_LABEL: Record<Game["state"], string> = {
  play: "เล่นเดโมได้",
  dev: "กำลังพัฒนา",
  concept: "Concept lab",
};

export default function DetailDialog({
  game,
  onClose,
  onPlay,
}: {
  game: Game | null;
  onClose: () => void;
  onPlay: (g: Game) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (game && !d.open) d.showModal();
    if (!game && d.open) d.close();
  }, [game]);

  return (
    <dialog
      ref={ref}
      className="detail"
      aria-labelledby="detail-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={game ? { ["--accent" as string]: game.palette[2], ["--accent2" as string]: game.palette[0] } : undefined}
    >
      {game && (
        <div className="detail-inner" key={game.id}>
          <button type="button" className="detail-close" onClick={onClose} aria-label="ปิดรายละเอียด">
            ×
          </button>
          <div className="detail-visual">
            <img src={game.image} alt={`ภาพเกม ${game.name}`} />
            <div className="detail-visual-fade" />
            <span className="detail-state" data-state={game.state}>
              {STATE_LABEL[game.state]}
            </span>
          </div>
          <div className="detail-body">
            <div className="eyebrow">{game.genre.toUpperCase()}</div>
            <h2 id="detail-title">{game.name}</h2>
            <div className="detail-sub">{game.subtitle}</div>
            <p className="detail-desc">{game.description}</p>
            <ul className="detail-features">
              {game.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="detail-note">
              <span aria-hidden="true">ⓘ</span> {game.note}
            </p>
            <div className="detail-actions">
              {game.play ? (
                <a className="button primary" href={game.play} target="_blank" rel="noopener" onClick={() => onPlay(game)}>
                  <span aria-hidden="true">▷</span> เล่นเดโมเลย
                </a>
              ) : (
                <span className="button ghost" aria-disabled="true">
                  ยังไม่เปิดให้เล่น · ติดตามเร็ว ๆ นี้
                </span>
              )}
              <button type="button" className="button secondary" onClick={onClose}>
                กลับไปสำรวจ
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
