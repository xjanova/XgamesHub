"use client";
import { useEffect, useRef, useState } from "react";
import s from "./breaker.module.css";

export default function BreakerHeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !connection?.saveData
    )
      ref.current?.play().catch(() => {});
  }, []);
  return (
    <>
      <video
        ref={ref}
        className={s.heroImage}
        poster="/art/breaker/argus.webp"
        muted
        loop
        playsInline
        preload="none"
        aria-label="วิดีโอเกมเพลย์จริงจากเดโม BREAKER"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/video/breaker/gameplay.mp4" type="video/mp4" />
      </video>
      <button
        className={s.videoToggle}
        type="button"
        onClick={() => {
          if (ref.current?.paused) ref.current.play().catch(() => {});
          else ref.current?.pause();
        }}
      >
        {playing ? "❚❚ หยุดวิดีโอ" : "▶ เล่นเกมเพลย์จริง"}
      </button>
    </>
  );
}
