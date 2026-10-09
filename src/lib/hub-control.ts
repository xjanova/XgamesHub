"use client";

import { useEffect, useState } from "react";
import { STUDIO } from "./game-support";

/**
 * What the XMAN Studio back office (/admin/gameshub) controls on this static site at
 * runtime: announcements, the hero order and approved player reviews. Every fetch is
 * public, cookie-less and optional — when it fails the hub keeps its built-in content.
 */

export type Announcement = {
  id: number;
  message: string;
  link_url: string | null;
  link_label: string | null;
  tone: "info" | "event" | "warning";
};
export type HeroControl = { order: string[]; hidden: string[] };
export type HubControl = { announcements: Announcement[]; hero: HeroControl };

export type GameReview = { name: string; rating: number; title: string | null; comment: string; date: string; featured: boolean };
export type GameReviews = { stars: number; rating_count: number; review_count: number; write_url: string; reviews: GameReview[] };

const get = <T,>(path: string) =>
  fetch(`${STUDIO}${path}`, { credentials: "omit", signal: AbortSignal.timeout(8000) }).then(async (r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return (await r.json()) as T;
  });

let control: Promise<HubControl> | undefined;

export function useHubControl() {
  const [data, setData] = useState<HubControl | null>(null);
  useEffect(() => {
    let alive = true;
    control ??= get<HubControl>("/games-support/hub.json").catch((e) => {
      control = undefined; // try again on the next mount
      throw e;
    });
    control
      .then((d) => {
        if (alive && Array.isArray(d.announcements) && d.hero) setData(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return data;
}

/** Pinned games first in the back office's order, hidden ones out; never leaves the hero empty. */
export function heroOrder<T extends { id: string }>(slides: T[], hero: HeroControl | undefined): T[] {
  if (!hero) return slides;
  const shown = slides.filter((s) => !hero.hidden.includes(s.id));
  if (shown.length === 0) return slides;
  const rank = (id: string) => {
    const i = hero.order.indexOf(id);
    return i < 0 ? 1e6 : i;
  };
  // a stable sort keeps the hub's own order for everything the back office did not pin
  return [...shown].sort((a, b) => rank(a.id) - rank(b.id));
}

const reviewCache = new Map<string, Promise<GameReviews>>();

export function useGameReviews(slug: string) {
  const [state, setState] = useState<{ slug: string; data: GameReviews | null; failed: boolean }>({ slug, data: null, failed: false });
  useEffect(() => {
    let alive = true;
    let p = reviewCache.get(slug);
    if (!p) {
      p = get<GameReviews>(`/games-support/${encodeURIComponent(slug)}/reviews.json`);
      reviewCache.set(slug, p);
      p.catch(() => reviewCache.delete(slug));
    }
    p.then((data) => alive && setState({ slug, data, failed: false })).catch(() => alive && setState({ slug, data: null, failed: true }));
    return () => {
      alive = false;
    };
  }, [slug]);
  // a result for another game (the dialog switched) is never shown
  return state.slug === slug ? state : { slug, data: null, failed: false };
}
