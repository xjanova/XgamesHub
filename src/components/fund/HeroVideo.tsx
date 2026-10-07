"use client";

import { useEffect, useRef, useState } from "react";
import { motionPref } from "@/lib/prefs";
import s from "./fund.module.css";

type Source = { src: string; media?: string };

/**
 * Looping, muted reveal footage behind the hero. It only starts when the
 * visitor's motion setting allows it and Save-Data is off; otherwise the
 * poster stays, and nothing past the poster is downloaded (preload="none").
 */
export default function HeroVideo({ poster, sources, label }: { poster: string; sources: Source[]; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!motionPref.get() || conn?.saveData) return;
    v.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <>
      <video
        ref={ref}
        className={s.heroArt}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {sources.map((x) => (
          <source key={x.src} src={x.src} media={x.media} type="video/mp4" />
        ))}
      </video>
      <button type="button" className={s.heroPlay} onClick={toggle} aria-label={playing ? "หยุดวิดีโอ" : "เล่นวิดีโอ"}>
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
    </>
  );
}
