import { useSyncExternalStore } from "react";

/**
 * "Motion" switch in the top bar. Defaults to off for visitors who asked their
 * OS for reduced motion; the choice is remembered on this device.
 */
type Listener = () => void;
const listeners = new Set<Listener>();
let motion: boolean | null = null;

function read(): boolean {
  if (motion !== null) return motion;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem("xgh.motion");
  } catch {}
  const reduced =
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  motion = stored ? stored === "on" : !reduced;
  return motion;
}

function apply(on: boolean) {
  document.documentElement.dataset.motion = on ? "on" : "off";
}

export const motionPref = {
  get: read,
  set(on: boolean) {
    motion = on;
    try {
      localStorage.setItem("xgh.motion", on ? "on" : "off");
    } catch {}
    apply(on);
    for (const l of listeners) l();
    document.documentElement.dispatchEvent(new Event("xgh:motion"));
  },
  init() {
    apply(read());
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useMotion() {
  return useSyncExternalStore(motionPref.subscribe, motionPref.get, () => true);
}

/** Video with alpha only where it is decoded with alpha and the visitor can afford it. */
export function canPlayAlphaVideo(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // WebKit (Safari, every iOS browser) draws VP9 alpha as black.
  const webkitOnly = /AppleWebKit/.test(ua) && !/Chrome|Chromium|Edg|Firefox|FxiOS|CriOS/.test(ua);
  const ios = /iPhone|iPad|iPod/.test(ua);
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (webkitOnly || ios || conn?.saveData) return false;
  if (!read()) return false;
  return matchMedia("(min-width: 720px)").matches;
}
