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
 * One picture or clip on top at a time (as on xman4289.com): the new layer fades
 * in OVER the old one, which stays opaque until the fade is done and is then
 * hidden. Nothing is left on underneath — a still showing through a moving clip
 * reads as a second Nova (a hand where the clip's hand has already moved away).
 */
const NovaFigure = forwardRef<NovaFigureHandle, { onMissing?: () => void }>(function NovaFigure(
  { onMissing },
  ref,
) {
  const stills = useRef<Partial<Record<Pose, HTMLImageElement>>>({});
  const videos = useRef<Partial<Record<Move, HTMLVideoElement>>>({});
  const layer = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const offTimers = useRef(new Map<HTMLElement, number>());
  const wanted = useRef<Move>("idle");
  const broken = useRef(new Set<Move>());
  const brokenStill = useRef(new Set<Pose>());
  const z = useRef(2);
  const videoOK = useRef(false);

  const showLayer = (el: HTMLImageElement | HTMLVideoElement | undefined) => {
    if (!el || layer.current === el) return;
    const prev = layer.current;
    layer.current = el;
    window.clearTimeout(offTimers.current.get(el));
    el.style.zIndex = String(++z.current);
    el.classList.add("on");
    if (prev) {
      offTimers.current.set(
        prev,
        window.setTimeout(() => {
          if (layer.current === prev) return;
          prev.classList.remove("on");
          if (prev instanceof HTMLVideoElement) prev.pause();
        }, 260),
      );
    }
  };

  const stillFor = (move: Move) => stills.current[brokenStill.current.has(CLIPS[move].still) ? "welcome" : CLIPS[move].still];

  useEffect(() => {
    videoOK.current = canPlayAlphaVideo();
    if (!layer.current) layer.current = stills.current.welcome ?? null;
    const onPrefs = () => {
      videoOK.current = canPlayAlphaVideo();
      // clips no longer allowed (Motion off, narrow screen): back to the picture
      const top = layer.current;
      if (!videoOK.current && top instanceof HTMLVideoElement) showLayer(stillFor((top.dataset.move as Move) ?? "idle"));
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
      const still = stillFor(move);
      const v = videos.current[move];

      if (!videoOK.current || !v || broken.current.has(move)) {
        showLayer(still);
        if (onEnd) window.setTimeout(onEnd, 1600);
        return;
      }

      const start = () => {
        if (wanted.current !== move) return;
        v.loop = clip.loop;
        v.onended = clip.loop ? null : () => onEnd?.();
        try {
          v.currentTime = 0;
        } catch {}
        const p = v.play();
        p?.catch((e: DOMException) => {
          // AbortError = paused right after play(); not a broken clip
          if (e?.name !== "AbortError") {
            broken.current.add(move);
            if (wanted.current === move) showLayer(still);
            if (onEnd) onEnd();
          }
        });
        showLayer(v);
      };

      if (!v.src) {
        v.src = v.dataset.src!;
        v.load();
      }
      if (v.readyState >= 3) start();
      else {
        // until it is ready: keep the clip on top if it starts from the same picture, else the picture
        const top = layer.current;
        const samePose = top instanceof HTMLVideoElement && CLIPS[(top.dataset.move as Move) ?? "idle"].still === clip.still;
        if (!samePose) showLayer(still);
        v.addEventListener("canplay", start, { once: true });
        v.addEventListener(
          "error",
          () => {
            broken.current.add(move);
            if (wanted.current === move) {
              showLayer(still);
              if (onEnd) onEnd();
            }
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
            // from now on the welcome picture stands in for this pose
            brokenStill.current.add(p);
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
