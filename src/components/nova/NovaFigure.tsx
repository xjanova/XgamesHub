"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { Move, Pose } from "@/lib/guide";
import { canPlayAlphaVideo } from "@/lib/prefs";
import { CLIPS, POSES, clipSrc, stillSrc } from "./clips";

export type NovaFigureHandle = {
  /** Show a clip (or its still where clips cannot play). `onEnd` fires for one-off moves. */
  show(move: Move, onEnd?: () => void): void;
};

const MOVES = Object.keys(CLIPS) as Move[];

/**
 * Stills underneath, clip layers on top. A new clip fades in OVER the old one,
 * which stays opaque until the fade is done — two half-faded layers would let
 * the page show through her body.
 */
const NovaFigure = forwardRef<NovaFigureHandle, { onMissing?: () => void }>(function NovaFigure(
  { onMissing },
  ref,
) {
  const stills = useRef<Partial<Record<Pose, HTMLImageElement>>>({});
  const videos = useRef<Partial<Record<Move, HTMLVideoElement>>>({});
  const active = useRef<HTMLVideoElement | null>(null);
  const wanted = useRef<Move>("idle");
  const broken = useRef(new Set<Move>());
  const brokenStill = useRef(new Set<Pose>());
  const z = useRef(2);
  const videoOK = useRef(false);

  useEffect(() => {
    videoOK.current = canPlayAlphaVideo();
    const onPrefs = () => {
      videoOK.current = canPlayAlphaVideo();
      if (!videoOK.current && active.current) {
        active.current.classList.remove("on");
        active.current.pause();
        active.current = null;
      }
    };
    window.addEventListener("resize", onPrefs);
    document.documentElement.addEventListener("xgh:motion", onPrefs);
    // trickle-load the one-off moves after the page settles
    const t = window.setTimeout(() => {
      if (!videoOK.current) return;
      const queue: Move[] = ["talk", "present", "wink", "surprise"];
      const next = () => {
        const m = queue.shift();
        const v = m && videos.current[m];
        if (!v) return;
        if (!v.src) {
          v.preload = "auto";
          v.src = v.dataset.src!;
          v.load();
        }
        v.addEventListener("canplaythrough", next, { once: true });
        v.addEventListener("error", next, { once: true });
      };
      next();
    }, 6000);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onPrefs);
      document.documentElement.removeEventListener("xgh:motion", onPrefs);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    show(move, onEnd) {
      const clip = CLIPS[move];
      wanted.current = move;
      // a pose whose picture failed to load falls back to the welcome pose
      const still = brokenStill.current.has(clip.still) ? "welcome" : clip.still;
      for (const p of POSES) stills.current[p]?.classList.toggle("on", p === still);

      const v = videos.current[move];
      if (!videoOK.current || !v || broken.current.has(move)) {
        // no clip: hide any clip of another pose, and let a one-off end on a timer
        if (active.current && CLIPS[(active.current.dataset.move as Move) ?? "idle"].still !== clip.still) {
          active.current.classList.remove("on");
          active.current.pause();
          active.current = null;
        }
        if (onEnd) window.setTimeout(onEnd, 1600);
        return;
      }

      const start = () => {
        if (wanted.current !== move) return;
        const prev = active.current;
        v.loop = clip.loop;
        v.onended = clip.loop ? null : () => onEnd?.();
        try {
          v.currentTime = 0;
        } catch {}
        v.style.zIndex = String(++z.current);
        v.classList.add("on");
        const p = v.play();
        p?.catch((e: DOMException) => {
          // AbortError = paused right after play(); not a broken clip
          if (e?.name !== "AbortError") {
            broken.current.add(move);
            v.classList.remove("on");
            if (onEnd) onEnd();
          }
        });
        active.current = v;
        if (prev && prev !== v) {
          window.setTimeout(() => {
            if (active.current !== prev) {
              prev.classList.remove("on");
              prev.pause();
            }
          }, 260);
        }
      };

      if (!v.src) {
        v.src = v.dataset.src!;
        v.load();
      }
      if (v.readyState >= 3) start();
      else {
        // until it is ready: keep the previous clip if it is the same pose, else the still
        if (active.current && CLIPS[(active.current.dataset.move as Move) ?? "idle"].still !== clip.still) {
          active.current.classList.remove("on");
          active.current.pause();
          active.current = null;
        }
        v.addEventListener("canplay", start, { once: true });
        v.addEventListener(
          "error",
          () => {
            broken.current.add(move);
            if (wanted.current === move && onEnd) onEnd();
          },
          { once: true },
        );
      }
    },
  }));

  return (
    <div className="nova-figure">
      {POSES.map((p) => (
        <img
          key={p}
          ref={(el) => {
            if (el) stills.current[p] = el;
          }}
          className={`nova-still${p === "welcome" ? " on" : ""}`}
          src={stillSrc(p)}
          alt=""
          draggable={false}
          decoding="async"
          loading={p === "welcome" ? "eager" : "lazy"}
          onError={() => {
            if (p === "welcome") onMissing?.();
            brokenStill.current.add(p);
            const el = stills.current[p];
            if (el?.classList.contains("on")) {
              el.classList.remove("on");
              stills.current.welcome?.classList.add("on");
            }
          }}
        />
      ))}
      {MOVES.map((m) => (
        <video
          key={m}
          ref={(el) => {
            if (el) videos.current[m] = el;
          }}
          className={`nova-clip${CLIPS[m].pad ? " pad" : ""}`}
          data-move={m}
          data-src={clipSrc(m)}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden="true"
        />
      ))}
    </div>
  );
});

export default NovaFigure;
