"use client";

import { useSyncExternalStore } from "react";
import { STUDIO } from "./game-support";

/**
 * Supporter items on this browser. Same storage as public/sdk/xman-items.js: the games on
 * /play/<id>/ share the hub's origin, so an item redeemed in the hub is unlocked in the game
 * too (XmanItems.forGame(id).owns(key)). Codes come from XMAN Studio after a donation is
 * confirmed; the server limits how many devices one code unlocks.
 */

export type OwnedItem = { key: string; name: string; kind: string; description: string | null; image_url: string | null };
export type OwnedByGame = Record<string, Record<string, OwnedItem>>;
export type RedeemResult =
  | { ok: true; game: string; gameName: string; item: OwnedItem; devicesUsed: number; devicesMax: number; already: boolean }
  | { ok: false; error: string; message: string };

export const ITEM_KIND: Record<string, string> = { cosmetic: "ของแต่ง", title: "ฉายา", badge: "ตรา", pass: "บัตรผ่าน" };
export const MY_CODES_URL = `${STUDIO}/games-support/my-items`;

const DEVICE = "xman.items.device";
const PREFIX = "xman.items.";
const EMPTY: OwnedByGame = {};

const read = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // private mode or a full quota: the unlock still shows until the page closes
  }
};

function deviceId(): string {
  let id = read<string | null>(DEVICE, null);
  if (!id || !/^[A-Za-z0-9_-]{8,128}$/.test(id)) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    id = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    write(DEVICE, id);
  }
  return id;
}

/* ---- a tiny store so every component sees a redeem at once (and games in other tabs) ---- */

let cache: OwnedByGame | null = null;
const listeners = new Set<() => void>();

function load(): OwnedByGame {
  const all: OwnedByGame = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(PREFIX) || key === DEVICE) continue;
      const items = read<Record<string, OwnedItem>>(key, {});
      if (items && typeof items === "object" && Object.keys(items).length) all[key.slice(PREFIX.length)] = items;
    }
  } catch {}
  return all;
}

function changed() {
  cache = null;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key.startsWith(PREFIX)) changed();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Items on this browser, by game id. Empty during the static render. */
export function useOwnedItems(): OwnedByGame {
  return useSyncExternalStore(
    subscribe,
    () => (cache ??= load()),
    () => EMPTY,
  );
}

export const countItems = (owned: OwnedByGame) => Object.values(owned).reduce((n, g) => n + Object.keys(g).length, 0);

/** Redeem a code for whichever game it belongs to. */
export async function redeemCode(code: string, signal?: AbortSignal): Promise<RedeemResult> {
  const offline = { ok: false as const, error: "network", message: "เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้ง" };
  let body: Record<string, unknown>;
  try {
    const r = await fetch(`${STUDIO}/api/gameshub/redeem`, {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ code: code.trim(), device: deviceId() }),
      signal,
    });
    body = await r.json().catch(() => ({}));
    if (r.status === 429) return { ok: false, error: "rate_limited", message: "ลองถี่เกินไป รอสักครู่แล้วลองใหม่" };
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    return offline;
  }
  if (!body.ok || typeof body.game !== "string" || !body.item) {
    return { ok: false, error: String(body.error ?? "unknown"), message: String(body.message ?? offline.message) };
  }
  const item = body.item as OwnedItem;
  const key = PREFIX + body.game;
  write(key, { ...read<Record<string, OwnedItem>>(key, {}), [item.key]: item });
  changed();
  return {
    ok: true,
    game: body.game,
    gameName: String(body.game_name ?? body.game),
    item,
    devicesUsed: Number(body.devices_used ?? 0),
    devicesMax: Number(body.devices_max ?? 0),
    already: Boolean(body.already_on_this_device),
  };
}
