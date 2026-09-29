"use client";

import { useCallback, useEffect, useState } from "react";
import { games, type Game } from "@/data/games";
import { WARP_MS, type Phase } from "./constants";
import { BootScreen, WorldHUD } from "./HUD";
import Scene from "./Scene";
import { playBlip, playWarp } from "./sound";

export default function OasisApp() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [waveSignal, setWaveSignal] = useState(0);
  const [novaSays, setNovaSays] = useState<string | null>(null);

  const start = useCallback(() => {
    if (phase !== "boot") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setPhase("world");
      setWaveSignal((n) => n + 1);
      return;
    }
    playWarp(WARP_MS / 1000 + 0.4);
    setPhase("warp");
  }, [phase]);

  const onWarpDone = useCallback(() => {
    setPhase("world");
    setWaveSignal((n) => n + 1);
  }, []);

  const select = useCallback((slug: string) => {
    setSelected(slug);
    setNovaSays(null);
    playBlip(true);
  }, []);

  const hover = useCallback((slug: string | null) => {
    setHovered(slug);
    if (slug) playBlip();
  }, []);

  const deselect = useCallback(() => setSelected(null), []);

  const pokeNova = useCallback(() => {
    setWaveSignal((n) => n + 1);
    setNovaSays("เย้! สวัสดีอีกครั้ง 👋 พร้อมลุยเกมไหนดี?");
    playBlip(true);
  }, []);

  const play = useCallback((game: Game) => {
    if (game.url) {
      window.location.href = game.url;
      return;
    }
    setWaveSignal((n) => n + 1);
    setNovaSays(`ประตูสู่ ${game.title} กำลังเปิดเร็ว ๆ นี้ รอติดตามนะ! 🚀`);
  }, []);

  // Let a Nova one-off line linger, then return to her usual chatter
  useEffect(() => {
    if (!novaSays) return;
    const id = setTimeout(() => setNovaSays(null), 5000);
    return () => clearTimeout(id);
  }, [novaSays]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectedGame = games.find((g) => g.slug === selected) ?? null;

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-void">
      <div className="absolute inset-0">
        <Scene
          phase={phase}
          games={games}
          hovered={hovered}
          selected={selected}
          waveSignal={waveSignal}
          onHover={hover}
          onSelect={select}
          onDeselect={deselect}
          onWarpDone={onWarpDone}
          onPokeNova={pokeNova}
        />
      </div>

      <BootScreen phase={phase} onStart={start} />
      <WorldHUD
        visible={phase === "world"}
        games={games}
        hovered={hovered}
        selected={selectedGame}
        novaSays={novaSays}
        onSelect={select}
        onClose={deselect}
        onPlay={play}
      />
    </main>
  );
}
