import type { Move, Pose } from "@/lib/guide";

/**
 * Nova's clips (transparent VP9 WebM made with scripts/nova/{green,key}.py,
 * same method as the xmanstudio universe guide). Frame 0 of every clip is its
 * still, so the page can swap still -> clip without a jump.
 *
 * pad: the clip was made from a still with an 8% green margin (green.py --pad)
 * and is drawn 16% bigger so the figure lines up with the still.
 */
export const CLIPS: Record<Move, { still: Pose; loop: boolean; pad: boolean }> = {
  idle: { still: "welcome", loop: true, pad: false },
  talk: { still: "welcome", loop: true, pad: false },
  wave: { still: "welcome", loop: true, pad: true },
  present: { still: "present", loop: true, pad: true },
  cheer: { still: "cheer", loop: true, pad: true },
  play: { still: "play", loop: true, pad: true },
  wink: { still: "welcome", loop: false, pad: true },
  surprise: { still: "welcome", loop: false, pad: true },
};

/** Bump when a clip is re-encoded under the same name: Cloudflare keeps the old file. */
export const CLIP_V = "1";

export const POSES: Pose[] = ["welcome", "present", "cheer", "play"];

export const POSE_LOOP: Record<Pose, Move> = {
  welcome: "idle",
  present: "present",
  cheer: "cheer",
  play: "play",
};

export const stillSrc = (p: Pose) => `/nova/stills/${p}.webp?v=${CLIP_V}`;
export const clipSrc = (m: Move) => `/nova/clips/${m}.webm?v=${CLIP_V}`;
export const FACE = `/nova/stills/face.webp?v=${CLIP_V}`;
