"use client";

import { useEffect, useRef, useState } from "react";
import { supportUrl } from "@/lib/community";
import { LiveFunding } from "@/components/fund/CommunitySupport";
import type { Game } from "@/data/games";
import { devNotes } from "@/data/devnotes";
import type { Devlog } from "@/lib/devlog";
import DevlogView from "./DevlogView";
import GameLogo from "./GameLogo";

const STATE_LABEL: Record<Game["state"], string> = {
  play: "เล่นเดโมได้",
  dev: "กำลังพัฒนา",
  concept: "Concept lab",
};

export type DetailTab = "about" | "dev";

export default function DetailDialog({
  game,
  tab,
  devlog,
  onClose,
  onPlay,
}: {
  game: Game | null;
  tab: DetailTab;
  /** live devlog for this game, when it publishes one */
  devlog: Devlog | null | undefined;
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
        <DetailInner key={game.id + tab} game={game} initialTab={tab} devlog={devlog} onClose={onClose} onPlay={onPlay} />
      )}
    </dialog>
  );
}

function DetailInner({
  game,
  initialTab,
  devlog,
  onClose,
  onPlay,
}: {
  game: Game;
  initialTab: DetailTab;
  devlog: Devlog | null | undefined;
  onClose: () => void;
  onPlay: (g: Game) => void;
}) {
  const [tab, setTab] = useState<DetailTab>(initialTab);
  const log = devlog ?? devNotes[game.id];
  return (
    <div className="detail-inner">
      <button type="button" className="detail-close" onClick={onClose} aria-label="ปิดรายละเอียด">
        ×
      </button>
      <div className="detail-visual">
        <img src={game.image} alt={`ภาพเกม ${game.name}`} />
        <div className="detail-visual-fade" />
        <span className="detail-state" data-state={game.state} data-edition={game.edition}>
          {game.edition === "full" ? "★ เกมเต็ม · Early access" : STATE_LABEL[game.state]}
        </span>
      </div>
      <div className="detail-body">
        <div className="eyebrow">{game.genre.toUpperCase()}</div>
        <h2 id="detail-title"><GameLogo game={game} className="detail-game-logo" /></h2>
        <div className="detail-sub">{game.subtitle}</div>

        <div className="detail-tabs" role="tablist" aria-label="ข้อมูลเกม">
          <button type="button" role="tab" aria-selected={tab === "about"} onClick={() => setTab("about")}>
            ภาพรวม
          </button>
          <button type="button" role="tab" aria-selected={tab === "dev"} onClick={() => setTab("dev")} disabled={!log}>
            บันทึกการพัฒนา{log?.version ? <span className="tab-ver">{log.version}</span> : null}
          </button>
        </div>

        {tab === "about" || !log ? (
          <div role="tabpanel">
            <p className="detail-desc">{game.description}</p>
            <ul className="detail-features">
              {game.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="detail-note">
              <span aria-hidden="true">ⓘ</span> {game.note}
            </p>
            {game.fund && (
              <a className="detail-fund" href={game.fund}>
                <span>
                  <b>{game.id === "hive-breach" ? "★ โปรเจกต์หลัก · ร่วมสนับสนุน" : "ร่วมสร้างภารกิจต่อไป · ร่วมสนับสนุน"}</b>
                  <small>เปิดหน้าเกมเต็ม: คอนเซปต์ ตัวละคร แผนพัฒนา และระดับการสนับสนุน</small>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        ) : (
          <div role="tabpanel">
            <DevlogView log={log} />
          </div>
        )}

        <LiveFunding slug={game.id} goal={0} />
        <a className="detail-fund" href={supportUrl(game.id)}>บริจาค / ดูรายนาม / แสดงความคิดเห็น / โหวต / ให้ดาว ↗</a>
        <div className="detail-actions">
          {game.play ? (
            <a className="button primary" href={game.play} target="_blank" rel="noopener" onClick={() => onPlay(game)}>
              <span aria-hidden="true">▷</span>{" "}
              {game.platform === "roblox" ? "เล่นใน Roblox" : game.edition === "full" ? "เข้าเล่น" : "เล่นเดโมเลย"}
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
  );
}
