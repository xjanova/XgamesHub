"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { games } from "@/data/games";

const OasisApp = dynamic(() => import("./OasisApp"), {
  ssr: false,
  loading: () => <Splash />,
});

function Splash() {
  return (
    <div className="flex h-dvh items-center justify-center bg-void">
      <div className="text-center">
        <div className="neon-text font-[family-name:var(--font-display)] text-4xl font-black">
          <span className="text-neon-pink">X</span>gamesHub
        </div>
        <div className="caret mt-4 font-mono text-xs tracking-[0.4em] text-neon-cyan/80">
          LOADING WORLD
        </div>
      </div>
    </div>
  );
}

/** Plain list for devices without WebGL. */
function Fallback() {
  return (
    <main className="mx-auto flex h-dvh max-w-3xl flex-col justify-center overflow-y-auto px-4 py-10">
      <h1 className="neon-text font-[family-name:var(--font-display)] text-4xl font-black">
        <span className="text-neon-pink">X</span>gamesHub
      </h1>
      <p className="mt-2 text-white/60">
        อุปกรณ์นี้ไม่รองรับโลก 3D — เลือกเกมจากรายการด้านล่างได้เลย
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {games.map((g) => (
          <li key={g.slug} className="hud-glass rounded-xl p-5">
            <div className="text-4xl">{g.emoji}</div>
            <h2 className="mt-2 text-lg font-semibold">{g.title}</h2>
            <p className="text-sm text-white/60">{g.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

const noop = () => () => {};

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function OasisLoader() {
  // null during prerender, then true/false in the browser
  const webgl = useSyncExternalStore(noop, detectWebGL, () => null);
  if (webgl === null) return <Splash />;
  return webgl ? <OasisApp /> : <Fallback />;
}
