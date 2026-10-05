"use client";

import { useEffect, useRef } from "react";
import { gameById, games, type Game } from "@/data/games";
import { motionPref, useMotion } from "@/lib/prefs";
import { HubEngine, type World } from "./engine";

function seedOf(id: string) {
  let h = 7;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return h / 97;
}

const toWorld = (g: Game): World => ({ palette: g.palette, style: g.planet, seed: seedOf(g.id) });

/** The fixed WebGL layer behind the whole page. */
export default function Universe({ featuredId }: { featuredId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<HubEngine | null>(null);
  const shownRef = useRef<string | null>(null);
  const motion = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let engine: HubEngine;
    try {
      engine = new HubEngine(canvas, { motion: motionPref.get() });
    } catch {
      document.documentElement.classList.add("no-webgl");
      return;
    }
    engineRef.current = engine;
    engine.setWorlds(games.map(toWorld));
    const first = gameById(shownRef.current ?? featuredId) ?? games[0];
    engine.setFeatured(toWorld(first), false);
    shownRef.current = first.id;

    let alive = true;
    engine.warmup().then(() => {
      if (!alive) return;
      engine.start();
      engine.invalidate();
      canvas.classList.add("ready");
    });

    const onResize = () => {
      engine.resize();
      engine.invalidate();
    };
    const onScroll = () => engine.invalidate();
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      engine.pointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const onSpin = (e: Event) => engine.spin((e as CustomEvent<number>).detail);
    const onVisible = () => {
      if (document.hidden) engine.stop();
      else {
        engine.start();
        engine.invalidate();
      }
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      engine.stop();
      document.documentElement.classList.add("no-webgl");
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("xgh:spin", onSpin);
    document.addEventListener("visibilitychange", onVisible);
    canvas.addEventListener("webglcontextlost", onLost);
    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("xgh:spin", onSpin);
      document.removeEventListener("visibilitychange", onVisible);
      canvas.removeEventListener("webglcontextlost", onLost);
      engine.dispose();
      engineRef.current = null;
    };
    // The engine is created once; featured/motion changes go through the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    const g = gameById(featuredId);
    if (!engine || !g || shownRef.current === featuredId) return;
    shownRef.current = featuredId;
    engine.setFeatured(toWorld(g), motionPref.get());
    engine.invalidate();
  }, [featuredId]);

  useEffect(() => {
    engineRef.current?.setMotion(motion);
    engineRef.current?.invalidate();
  }, [motion]);

  return <canvas ref={canvasRef} className="universe" aria-hidden="true" />;
}
