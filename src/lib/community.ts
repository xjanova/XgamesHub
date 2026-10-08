"use client";

import { useEffect, useState } from "react";

import { STUDIO, type CommunityGame } from "./game-support";
export { supportUrl } from "./game-support";
type Result = { games: CommunityGame[]; updated_at: string };
let cache: { data: Result; at: number } | undefined;
let pending: Promise<Result> | undefined;
function load(): Promise<Result> {
  if (cache && Date.now() - cache.at < 30000)
    return Promise.resolve(cache.data);
  if (pending) return pending;
  pending = fetch(`${STUDIO}/games-support/summary.json`, {
    credentials: "omit",
    signal: AbortSignal.timeout(8000),
  })
    .then(async (r) => {
      if (!r.ok) throw new Error("unavailable");
      const data: Result = await r.json();
      if (!Array.isArray(data.games)) throw new Error("invalid response");
      cache = { data, at: Date.now() };
      return data;
    })
    .finally(() => {
      pending = undefined;
    });
  return pending;
}
export function useCommunity() {
  const [data, setData] = useState<Result | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    const update = () =>
      load()
        .then((r) => {
          if (alive) {
            setData(r);
            setFailed(false);
          }
        })
        .catch(() => {
          if (alive) setFailed(true);
        });
    update();
    const timer = window.setInterval(update, 60000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);
  return { data, failed };
}
