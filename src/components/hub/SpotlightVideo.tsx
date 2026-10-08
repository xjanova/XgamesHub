"use client";

import { useEffect, useRef, useState } from "react";
import type { SpotlightMedia } from "@/data/spotlight-media";

export default function SpotlightVideo({
  media,
  motion,
  onInteract,
}: {
  media: SpotlightMedia;
  motion: boolean;
  onInteract: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    let visible = false;
    const sync = () => {
      if (
        motion &&
        !saveData &&
        visible &&
        !document.hidden &&
        !manuallyPaused.current
      ) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [motion]);

  return (
    <div className="spot-media">
      <video
        ref={ref}
        className="spot-footage"
        poster={media.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {media.sources.map((source) => (
          <source
            key={source.src}
            src={source.src}
            media={source.media}
            type="video/mp4"
          />
        ))}
      </video>
      <button
        type="button"
        className="spot-video-toggle"
        disabled={!motion}
        onClick={() => {
          onInteract();
          const video = ref.current;
          if (!video) return;
          // Use the action shown on the button, even if tab visibility paused
          // the element just before this click arrived.
          manuallyPaused.current = playing;
          if (playing) video.pause();
          else video.play().catch(() => {});
        }}
        aria-label={
          !motion
            ? "เปิด Motion เพื่อเล่นวิดีโอ"
            : playing
              ? "หยุดวิดีโอสไลด์"
              : "เล่นวิดีโอสไลด์"
        }
      >
        {!motion
          ? "Motion ปิดอยู่"
          : playing
            ? "❚❚ หยุดวิดีโอ"
            : "▶ เล่นวิดีโอ"}
      </button>
    </div>
  );
}
