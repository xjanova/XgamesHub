"use client";

import { useEffect, useState } from "react";
import type { Game } from "@/data/games";
import type { Phase } from "./constants";

const BOOT_LINES = [
  "XGAMESHUB OS v1.0 — INITIALIZING",
  "CONNECTING TO THE HUB NETWORK ........ OK",
  "LOADING WORLD GRID ................... OK",
  "WAKING UP NOVA ....................... OK",
  "ALL SYSTEMS READY",
];

const NOVA_LINES = [
  "สวัสดี! ฉันชื่อ Nova ยินดีต้อนรับสู่ XgamesHub ✨",
  "แตะประตูมิติเพื่อเลือกเกมที่อยากเล่นได้เลย",
  "เกมใหม่ ๆ กำลังจะเปิดประตูเร็ว ๆ นี้นะ!",
  "จิ้มฉันอีกทีสิ ฉันชอบโบกมือ 👋",
];

/* ------------------------------------------------------------------ */

export function BootScreen({
  phase,
  onStart,
}: {
  phase: Phase;
  onStart: () => void;
}) {
  const [lines, setLines] = useState(0);
  const ready = lines >= BOOT_LINES.length;

  useEffect(() => {
    if (ready) return;
    const id = setTimeout(() => setLines((n) => n + 1), lines === 0 ? 350 : 420);
    return () => clearTimeout(id);
  }, [lines, ready]);

  useEffect(() => {
    if (!ready || phase !== "boot") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") onStart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, phase, onStart]);

  const hidden = phase !== "boot";

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-[12vh] transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#05010f]/70 via-transparent to-[#05010f]/90" />

      <div className="relative flex w-full max-w-xl flex-col items-center gap-8 px-4">
        <div className="text-center">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.5em] text-neon-cyan/80">
            WELCOME, PLAYER ONE
          </p>
          <h1 className="neon-text mt-3 font-[family-name:var(--font-display)] text-5xl font-black tracking-tight sm:text-7xl">
            <span className="text-neon-pink">X</span>gamesHub
          </h1>
        </div>

        <div className="hud-glass scanlines relative w-full rounded-lg p-4 font-mono text-[11px] leading-relaxed text-neon-cyan/90 sm:text-xs">
          {BOOT_LINES.slice(0, lines).map((line) => (
            <div key={line}>&gt; {line}</div>
          ))}
          {!ready && <div className="caret">&gt; </div>}
          <div className="mt-3 h-1 w-full overflow-hidden rounded bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan transition-[width] duration-300"
              style={{ width: `${(lines / BOOT_LINES.length) * 100}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!ready || hidden}
          onClick={onStart}
          className={`start-button pointer-events-auto rounded-full border-2 border-neon-pink bg-neon-pink/15 px-10 py-4 font-[family-name:var(--font-display)] text-lg font-bold tracking-[0.3em] text-white transition hover:scale-105 hover:bg-neon-pink/30 disabled:pointer-events-none ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          ENTER THE HUB
        </button>
        <p
          className={`text-sm text-white/60 transition-opacity ${ready ? "opacity-100" : "opacity-0"}`}
        >
          กด Enter หรือแตะปุ่มเพื่อวาร์ปเข้าสู่โลกของเกม · เปิดเสียงเพื่อประสบการณ์เต็มรูปแบบ
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function WorldHUD({
  visible,
  games,
  hovered,
  selected,
  novaSays,
  onSelect,
  onClose,
  onPlay,
}: {
  visible: boolean;
  games: Game[];
  hovered: string | null;
  selected: Game | null;
  novaSays: string | null;
  onSelect: (slug: string) => void;
  onClose: () => void;
  onPlay: (game: Game) => void;
}) {
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setLine((n) => (n + 1) % NOVA_LINES.length), 6000);
    return () => clearInterval(id);
  }, [visible]);

  const hoveredGame = games.find((g) => g.slug === hovered);
  const speech =
    novaSays ??
    (hoveredGame && !selected
      ? `${hoveredGame.emoji} ${hoveredGame.title} — ${hoveredGame.description}`
      : NOVA_LINES[line]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 font-sans">
      {/* Top bar */}
      <header className="rise-in flex items-start justify-between p-4 sm:p-6">
        <div className="hud-glass pointer-events-auto rounded-lg px-4 py-2">
          <div className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight sm:text-xl">
            <span className="text-neon-pink">X</span>gamesHub
          </div>
          <div className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] text-neon-cyan/80">
            PLAYER: GUEST
          </div>
        </div>
        <div className="hud-glass rounded-lg px-4 py-2 text-right font-[family-name:var(--font-display)] text-[10px] tracking-[0.25em] text-white/70">
          <div>
            WORLDS <span className="text-neon-cyan">{games.length}</span>
          </div>
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#39ff88] shadow-[0_0_8px_#39ff88]" />
            ONLINE
          </div>
        </div>
      </header>

      {/* Nova speech bubble */}
      <div
        className="rise-in absolute bottom-32 left-1/2 w-[min(92vw,30rem)] -translate-x-1/2 sm:bottom-28"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="hud-glass relative rounded-2xl px-5 py-3 text-center text-sm sm:text-base">
          <span className="mr-2 font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.3em] text-neon-pink">
            NOVA
          </span>
          <span key={speech} className="rise-in inline-block">
            {speech}
          </span>
        </div>
      </div>

      {/* Game dock (also the accessible / keyboard way to pick a game) */}
      <nav
        aria-label="เลือกเกม"
        className="rise-in absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 p-3 sm:p-4"
        style={{ animationDelay: "0.5s" }}
      >
        {games.map((g) => (
          <button
            key={g.slug}
            type="button"
            onClick={() => onSelect(g.slug)}
            className={`hud-glass pointer-events-auto flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition hover:scale-105 ${
              selected?.slug === g.slug || hovered === g.slug
                ? "!border-white"
                : ""
            }`}
            style={{ boxShadow: `0 0 16px ${g.color}55` }}
          >
            <span>{g.emoji}</span>
            <span className="font-[family-name:var(--font-display)] text-xs tracking-wider">
              {g.title}
            </span>
          </button>
        ))}
      </nav>

      {/* Selected game panel */}
      {selected && (
        <aside
          key={selected.slug}
          className="hud-glass rise-in pointer-events-auto absolute inset-x-3 bottom-3 z-10 rounded-2xl p-5 sm:inset-x-auto sm:bottom-auto sm:right-8 sm:top-1/2 sm:w-[22rem] sm:-translate-y-1/2 sm:p-6"
          style={{ borderColor: `${selected.color}aa` }}
        >
          <div className="text-5xl sm:text-6xl">{selected.emoji}</div>
          <div
            className="mt-3 font-[family-name:var(--font-display)] text-[10px] tracking-[0.35em]"
            style={{ color: selected.color }}
          >
            {selected.genre.toUpperCase()}
          </div>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-black">
            {selected.title}
          </h2>
          <p className="mt-2 text-white/75">{selected.description}</p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => onPlay(selected)}
              className="flex-1 rounded-full px-5 py-3 font-[family-name:var(--font-display)] text-sm font-bold tracking-widest text-[#05010f] transition hover:brightness-110"
              style={{
                background: selected.color,
                boxShadow: `0 0 24px ${selected.color}`,
              }}
            >
              {selected.url ? "เข้าสู่เกม" : "เร็ว ๆ นี้"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/30 px-5 py-3 text-sm transition hover:bg-white/10"
            >
              กลับ
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
