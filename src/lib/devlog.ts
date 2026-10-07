import { useEffect, useState } from "react";

/**
 * Development notes for each game.
 *
 * Playable games publish /play/<id>/devlog.json themselves (built from the
 * game's DEVLOG.md on every release), so the hub shows their live version
 * without being redeployed. Games without a build fall back to the static
 * notes in src/data/games.ts.
 */
export type DevEntry = { date: string; title: string; items: string[] };

export type Devlog = {
  id: string;
  version?: string;
  built?: string;
  summary?: string;
  status: string;
  entries: DevEntry[];
  roadmap: string[];
};

const str = (v: unknown) => (typeof v === "string" ? v : "");
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

function clean(raw: unknown, id: string): Devlog | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const entries = Array.isArray(r.entries)
    ? r.entries
        .map((e) => e as Record<string, unknown>)
        .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(str(e.date)))
        .map((e) => ({ date: str(e.date), title: str(e.title), items: strs(e.items) }))
    : [];
  return {
    id,
    version: str(r.version) || undefined,
    built: str(r.built) || undefined,
    summary: str(r.summary) || undefined,
    status: str(r.status),
    entries,
    roadmap: strs(r.roadmap),
  };
}

const cache = new Map<string, Promise<Devlog | null>>();

export function loadDevlog(id: string): Promise<Devlog | null> {
  let p = cache.get(id);
  if (!p) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    p = fetch(`/play/${id}/devlog.json`, { cache: "no-cache", signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => clean(j, id))
      .catch(() => null)
      .finally(() => clearTimeout(t));
    cache.set(id, p);
  }
  return p;
}

/** Live devlogs for the given games: undefined while loading, null when there is none. */
export function useDevlogs(ids: string[]) {
  const [logs, setLogs] = useState<Record<string, Devlog | null>>({});
  const key = ids.join(",");
  useEffect(() => {
    let alive = true;
    for (const id of key.split(",").filter(Boolean)) {
      loadDevlog(id).then((d) => {
        if (alive) setLogs((prev) => ({ ...prev, [id]: d }));
      });
    }
    return () => {
      alive = false;
    };
  }, [key]);
  return logs;
}

// lives in a hook-free module so server components (the fund pages) can use it too
export { thaiDate } from "./date";
