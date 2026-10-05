"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import Universe from "@/components/universe/Universe";
import NovaGuide from "@/components/nova/NovaGuide";
import { FACE } from "@/components/nova/clips";
import { counts, featured, gameById, games, matches, type Filter, type Game } from "@/data/games";
import { guide, pick, type Line } from "@/lib/guide";
import { motionPref, useMotion } from "@/lib/prefs";
import { devNotes } from "@/data/devnotes";
import { thaiDate, useDevlogs, type DevEntry } from "@/lib/devlog";
import DetailDialog, { type DetailTab } from "./DetailDialog";
import GameCard from "./GameCard";

const pad2 = (n: number) => String(n).padStart(2, "0");
const HUB_VERSION = process.env.NEXT_PUBLIC_HUB_VERSION || "dev";
// games hosted inside the hub, and Roblox games (devlog only), publish /play/<id>/devlog.json
const PLAY_IDS = games
  .filter((g) => g.play?.startsWith("/play/") || g.platform === "roblox")
  .map((g) => g.id);

const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "ทุกโลก", count: counts.all },
  { id: "play", label: "เล่นเดโมได้", count: counts.play },
  { id: "dev", label: "กำลังพัฒนา", count: counts.dev },
  { id: "concept", label: "Concept lab", count: counts.concept },
  { id: "roblox", label: "Roblox", count: counts.roblox },
];

const FILTER_LINES: Partial<Record<Filter, Line>> = {
  play: {
    text: `เดโมที่เล่นได้ตอนนี้มี ${counts.play} เกม — ${games
      .filter((g) => g.play)
      .slice(0, 3)
      .map((g) => g.name)
      .join(", ")} และอีกเพียบ กดเล่นบนเบราว์เซอร์ได้ทันทีเลย!`,
    pose: "cheer",
  },
  dev: { text: "นี่คือโลกที่ทีมกำลังสร้างอยู่ บางเกมมีเดโมให้ลองแล้วด้วยนะ", pose: "play" },
  concept: { text: "Concept lab! โลกที่ยังอยู่บนกระดานออกแบบ แอบดูก่อนใครได้เลย", pose: "present" },
  roblox: {
    text: "หมวด Roblox! ทีมกำลังสร้างเกมให้เล่นใน Roblox อยู่ เปิดเมื่อไหร่โนวาจะพาไปเล่นคนแรกเลย~",
    pose: "cheer",
  },
};

type TourStep = { go: string; line: Line };
const TOUR: TourStep[] = [
  {
    go: "spotlight",
    line: { text: "เริ่มที่ Spotlight! เกมเด่นของฮับอยู่ตรงนี้ ลากที่ดาวเคราะห์เพื่อหมุนดูได้เลย", pose: "present" },
  },
  {
    go: "feature:theone",
    line: { text: "กดลูกศรหรือเลือกด้านล่างเพื่อสลับโลก — อย่างนี่ THE ONE โลกแฟนตาซีที่โนวาเป็นนางเอก!", pose: "present" },
  },
  {
    go: "filter:play",
    line: { text: "อยากเล่นเลย? กด “เล่นเดโมได้” จะเหลือแต่เกมที่เปิดเล่นบนเบราว์เซอร์ได้ทันที", pose: "cheer" },
  },
  {
    go: "filter:concept",
    line: { text: "ส่วน Concept lab คือโลกที่ทีมยังออกแบบอยู่ ชี้ที่การ์ดใบไหน โนวาจะเล่าให้ฟัง", pose: "present" },
  },
  {
    go: "studio",
    line: { text: "และนี่คือ XMAN Studio ผู้สร้างทุกโลกในฮับนี้ จบทัวร์แล้ว! ไปเล่นกันเลย~", pose: "welcome", after: "wave" },
  },
];

export default function Hub() {
  const motion = useMotion();
  const [feat, setFeat] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Game | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("about");
  const devlogs = useDevlogs(PLAY_IDS);
  const [menu, setMenu] = useState(false);
  const [section, setSection] = useState("Discover");
  const [cycle, setCycle] = useState(0);
  const touched = useRef(0);
  const hoverTimer = useRef(0);
  const spotlightVisible = useRef(true);
  const tourStep = useRef(-1);
  const said = useRef(new Set<string>());

  const fGame = gameById(featured[feat].id)!;
  const fMeta = featured[feat];
  const list = useMemo(() => games.filter((g) => matches(g, filter, query)), [filter, query]);

  // newest development entries across every game: live devlogs first, static notes as fallback
  const timeline = useMemo(() => {
    const rows: { game: Game; entry: DevEntry; version?: string }[] = [];
    for (const g of games) {
      const log = devlogs[g.id] ?? devNotes[g.id];
      if (!log) continue;
      // real development news first: the "now in the hub" entry every game got on launch
      // day says the same thing for all of them, so it only shows when a game has nothing else
      const news = log.entries.filter((e) => !e.title.includes("XMAN GAMES HUB"));
      const pick = (news.length ? news : log.entries).sort((x, y) => y.date.localeCompare(x.date));
      // at most two per game, so one busy game does not fill the whole timeline
      for (const entry of pick.slice(0, 2)) rows.push({ game: g, entry, version: log.version });
    }
    return rows.sort((a, b) => b.entry.date.localeCompare(a.entry.date)).slice(0, 9);
  }, [devlogs]);

  useEffect(() => {
    motionPref.init();
    document.documentElement.classList.add("js");
    let min = false;
    try {
      min = localStorage.getItem("xgh.nova.min") === "1";
    } catch {}
    if (min) guide.setMinimized(true);
  }, []);

  /* ---------------- helpers ---------------- */

  const scrollTo = useCallback((id: string, block: ScrollLogicalPosition = "start") => {
    document.getElementById(id)?.scrollIntoView({ behavior: motionPref.get() ? "smooth" : "auto", block });
  }, []);

  const chooseFeature = useCallback((i: number, byUser: boolean) => {
    const n = (i + featured.length) % featured.length;
    setFeat(n);
    setCycle((c) => c + 1);
    if (byUser) {
      touched.current = performance.now();
      const g = gameById(featured[n].id)!;
      guide.say({ text: g.nova[0], pose: "present", priority: 3 });
    }
  }, []);

  const applyFilter = useCallback(
    (f: Filter, opts: { scroll?: boolean; speak?: boolean } = {}) => {
      setFilter(f);
      if (opts.scroll) scrollTo("games");
      const line = FILTER_LINES[f];
      if (line && opts.speak !== false) guide.say({ ...line, priority: 3 });
      setMenu(false);
    },
    [scrollTo],
  );

  const openGame = useCallback((g: Game, speak = true, tab: DetailTab = "about") => {
    setDetailTab(tab);
    setDetail(g);
    if (speak) guide.say({ text: pick(g.nova), pose: "present", priority: 3 });
  }, []);

  const playGame = useCallback((g: Game) => {
    guide.say({ text: `ขอให้สนุกกับ ${g.name} นะ! เล่นเสร็จแล้วกลับมาเล่าให้โนวาฟังด้วย`, pose: "cheer", priority: 3 });
  }, []);

  /* ---------------- Nova's actions (chips) ---------------- */

  useEffect(() => {
    const runStep = (i: number) => {
      tourStep.current = i;
      const step = TOUR[i];
      if (!step) return;
      const [kind, arg] = step.go.split(":");
      if (kind === "spotlight") scrollTo("spotlight", "center");
      if (kind === "feature") {
        scrollTo("spotlight", "center");
        const idx = featured.findIndex((f) => f.id === arg);
        if (idx >= 0) chooseFeature(idx, false);
        touched.current = performance.now();
      }
      if (kind === "filter") {
        setQuery("");
        applyFilter(arg as Filter, { scroll: true, speak: false });
      }
      if (kind === "studio") scrollTo("studio", "center");
      const last = i === TOUR.length - 1;
      guide.say({
        ...step.line,
        priority: 4,
        hold: 60000,
        chips: last
          ? [
              { label: "สุ่มเกมให้หน่อย", action: "random", primary: true },
              { label: "เล่น X-NOVA", action: "play:xnova" },
            ]
          : [
              { label: `ถัดไป › (${i + 1}/${TOUR.length})`, action: "tourNext", primary: true },
              { label: "จบทัวร์", action: "tourEnd" },
            ],
      });
    };

    const random = () => {
      setFilter("all");
      setQuery("");
      const g = pick(games);
      window.setTimeout(() => {
        const card = document.querySelector<HTMLElement>(`.card[data-id="${g.id}"]`);
        card?.scrollIntoView({ behavior: motionPref.get() ? "smooth" : "auto", block: "center" });
        card?.classList.remove("spot");
        void card?.offsetWidth;
        card?.classList.add("spot");
      }, 60);
      guide.say({
        text: `โนวาสุ่มได้… ${g.name}! ${g.tagline}`,
        pose: "cheer",
        react: "wink",
        priority: 3,
        hold: 15000,
        chips: [
          { label: "ดูรายละเอียด", action: `open:${g.id}`, primary: true },
          ...(g.play ? [{ label: "เล่นเลย", action: `play:${g.id}` }] : []),
          { label: "สุ่มอีก", action: "random" },
        ],
      });
    };

    return guide.register({
      tour: () => runStep(0),
      tourNext: () => runStep(tourStep.current + 1),
      tourEnd: () => {
        tourStep.current = -1;
        guide.say({ text: "โอเค! อยากให้ช่วยอะไรเมื่อไหร่ จิ้มโนวาได้เลยนะ", pose: "welcome", after: "wave", priority: 3 });
      },
      random,
      open: (id) => {
        const g = id ? gameById(id) : undefined;
        if (g) openGame(g, false);
      },
      play: (id) => {
        const g = id ? gameById(id) : undefined;
        if (g?.play) {
          window.open(g.play, "_blank", "noopener");
          playGame(g);
        }
      },
      dismiss: () =>
        guide.say({ text: "ได้เลย~ ถ้าต้องการโนวา จิ้มที่ตัวโนวาได้ทุกเมื่อ", pose: "welcome", priority: 3 }),
    });
  }, [applyFilter, chooseFeature, openGame, playGame, scrollTo]);

  /* ---------------- greeting ---------------- */

  useEffect(() => {
    let back = false;
    try {
      back = localStorage.getItem("xgh.visited") === "1";
      localStorage.setItem("xgh.visited", "1");
    } catch {}
    const t = window.setTimeout(() => {
      guide.say(
        back
          ? {
              text: "กลับมาแล้ว! วันนี้อยากเล่นอะไรดี? ให้โนวาสุ่มให้ก็ได้นะ",
              pose: "welcome",
              after: "wave",
              priority: 3,
              hold: 9000,
              chips: [
                { label: "สุ่มเกมให้หน่อย", action: "random", primary: true },
                { label: "พาทัวร์", action: "tour" },
              ],
            }
          : {
              text: `สวัสดีค่า~ โนวาเองค่ะ ไกด์ประจำ XMAN GAMES HUB! ที่นี่มี ${counts.all} โลกเกมจาก XMAN Studio ให้สำรวจ อยากให้โนวาพาทัวร์มั้ย?`,
              pose: "welcome",
              after: "wave",
              priority: 3,
              hold: 14000,
              chips: [
                { label: "พาทัวร์หน่อย", action: "tour", primary: true },
                { label: "สุ่มเกมให้หน่อย", action: "random" },
                { label: "เดี๋ยวดูเอง", action: "dismiss" },
              ],
            },
      );
    }, 1400);
    return () => window.clearTimeout(t);
  }, []);

  /* ---------------- sections: breadcrumb, first-visit lines, reveal ---------------- */

  useEffect(() => {
    const names: Record<string, string> = { spotlight: "Discover", games: "Collection", devlog: "Dev log", studio: "Studio" };
    const firstLines: Record<string, Line> = {
      games: { text: `นี่คือคลังทั้ง ${counts.all} โลก ชี้ที่การ์ดใบไหน โนวาจะเล่าให้ฟังเอง~`, pose: "present", priority: 1 },
      devlog: {
        text: "ทุกเกมมีบันทึกการพัฒนาให้อ่านนะ ทีมทำอะไรไปบ้าง อัปเดตเวอร์ชันไหน ดูได้ตรงนี้เลย!",
        pose: "present",
        priority: 1,
      },
      studio: {
        text: "XMAN Studio สตูดิโอเล็ก ๆ ที่สร้างโลกใหม่อยู่ตลอด แวะมาบ่อย ๆ นะ!",
        pose: "welcome",
        after: "wave",
        priority: 1,
      },
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (id === "spotlight") spotlightVisible.current = e.isIntersecting;
          if (!e.isIntersecting) continue;
          setSection(names[id] ?? "Discover");
          if (firstLines[id] && !said.current.has(id) && tourStep.current < 0) {
            said.current.add(id);
            guide.say(firstLines[id]);
          }
        }
      },
      { threshold: 0.35 },
    );
    for (const id of Object.keys(names)) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }

    // 3D rise-in for blocks as they enter
    const rise = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            rise.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const els = document.querySelectorAll(".rise");
    els.forEach((el) => rise.observe(el));
    // never leave content hidden if the observer is late or missing
    const backstop = window.setTimeout(() => els.forEach((el) => el.classList.add("in")), 3500);
    return () => {
      io.disconnect();
      rise.disconnect();
      window.clearTimeout(backstop);
    };
  }, []);

  // cards that appear after filtering, and timeline rows that arrive with a live devlog, are visible right away
  useEffect(() => {
    document.querySelectorAll("#cards .rise:not(.in)").forEach((el) => el.classList.add("in"));
  }, [list]);
  useEffect(() => {
    const t = window.setTimeout(
      () => document.querySelectorAll("#devlog .timeline .rise:not(.in)").forEach((el) => el.classList.add("in")),
      400,
    );
    return () => window.clearTimeout(t);
  }, [timeline]);

  /* ---------------- spotlight auto-advance ---------------- */

  useEffect(() => {
    if (!motion) return;
    const t = window.setInterval(() => {
      const idle = performance.now() - touched.current > 20000;
      if (idle && spotlightVisible.current && !detail && !document.hidden) chooseFeature(feat + 1, false);
    }, 9000);
    return () => window.clearInterval(t);
  }, [motion, feat, detail, chooseFeature, cycle]);

  /* ---------------- search ---------------- */

  const onSearch = (v: string) => {
    setQuery(v);
    if (v && filter !== "all") setFilter("all");
    if (v.length === 1) scrollTo("games");
  };

  useEffect(() => {
    if (!query) return;
    const t = window.setTimeout(() => {
      if (list.length === 0)
        guide.say({
          text: "อุ๊ย หาไม่เจอเลย ลองคำอื่นดูนะ เช่น “RPG” “2.5D” หรือ “Puzzle”",
          pose: "welcome",
          react: "surprise",
          priority: 2,
        });
    }, 700);
    return () => window.clearTimeout(t);
  }, [query, list.length]);

  /* ---------------- planet drag ---------------- */

  const drag = useRef<{ x: number; id: number } | null>(null);
  const onStageDown = (e: RPointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, id: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
    touched.current = performance.now();
  };
  const onStageMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== e.pointerId) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    window.dispatchEvent(new CustomEvent("xgh:spin", { detail: dx }));
  };
  const onStageUp = () => {
    drag.current = null;
  };

  const lastHover = useRef("");
  const onHover = (g: Game | null) => {
    window.clearTimeout(hoverTimer.current);
    if (!g || g.id === lastHover.current) return;
    hoverTimer.current = window.setTimeout(() => {
      // only once per card in a row, so sweeping the pointer back and forth is not a chatterbox
      if (guide.say({ text: pick(g.nova), pose: "present", priority: 1, hold: 1200 })) lastHover.current = g.id;
    }, 650);
  };

  const navActive = (id: string) =>
    (id === "discover" && section === "Discover") ||
    (section !== "Discover" && section !== "Studio" && filter === id) ||
    (id === "studio" && section === "Studio");

  const nav = (
    <nav aria-label="เมนูหลัก" className="side-nav">
      <a
        href="#top"
        className={`side-link${navActive("discover") ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setMenu(false);
          window.scrollTo({ top: 0, behavior: motionPref.get() ? "smooth" : "auto" });
        }}
      >
        <span className="nav-icon">◇</span>Discover<span className="nav-marker" />
      </a>
      <a
        href="#games"
        className={`side-link${navActive("play") ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          applyFilter("play", { scroll: true });
        }}
      >
        <span className="nav-icon">▷</span>Play now<span className="nav-count">{pad2(counts.play)}</span>
      </a>
      <a
        href="#games"
        className={`side-link${navActive("dev") ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          applyFilter("dev", { scroll: true });
        }}
      >
        <span className="nav-icon">▧</span>In development<span className="nav-count">{pad2(counts.dev)}</span>
      </a>
      <a
        href="#games"
        className={`side-link${navActive("concept") ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          applyFilter("concept", { scroll: true });
        }}
      >
        <span className="nav-icon">✳</span>Concept lab<span className="nav-count">{pad2(counts.concept)}</span>
      </a>
      <a
        href="#games"
        className={`side-link${navActive("roblox") ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          applyFilter("roblox", { scroll: true });
        }}
      >
        <span className="nav-icon">⬢</span>Roblox<span className="nav-count">{counts.roblox ? pad2(counts.roblox) : "SOON"}</span>
      </a>
      <a
        href="#devlog"
        className={`side-link${section === "Dev log" ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setMenu(false);
          scrollTo("devlog");
        }}
      >
        <span className="nav-icon">✎</span>Dev log
      </a>
      <a
        href="#studio"
        className={`side-link${navActive("studio") ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setMenu(false);
          scrollTo("studio", "center");
        }}
      >
        <span className="nav-icon">⌘</span>Meet the studio
      </a>
    </nav>
  );

  return (
    <>
      <Universe featuredId={fGame.id} />
      <div className="nebula-fallback" aria-hidden="true" />
      <a className="skip" href="#games">
        ข้ามไปยังคลังเกม
      </a>

      <aside className="sidebar">
        <a href="#top" className="brand" aria-label="XMAN GAMES HUB หน้าแรก">
          <img src="/art/logo-v2.webp" alt="XMAN GAMES HUB" width={760} height={314} />
        </a>
        <div className="side-caption">YOUR GATEWAY TO PLAY</div>
        {nav}
        <div className="side-divider" />
        <div className="universe-note">
          <span className="tiny-label">XMAN ORIGINALS</span>
          <p>
            Small studio.
            <br />
            <strong>Infinite worlds.</strong>
          </p>
        </div>
        <button type="button" className="side-tour" onClick={() => guide.run("tour")}>
          <img src={FACE} alt="" />
          <span>
            <b>ให้โนวาพาทัวร์</b>
            <small>ไกด์ประจำฮับ</small>
          </span>
        </button>
      </aside>

      <div className="app-shell" id="top">
        <header className="topbar">
          <button type="button" className="menu-button" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
            <span />
            <span />
            <span />
            <b className="sr-only">เมนู</b>
          </button>
          <a className="mobile-brand" href="#top" aria-label="XMAN GAMES HUB">
            <img src="/art/logo-v2.webp" alt="XMAN GAMES HUB" width={760} height={314} />
          </a>
          <div className="breadcrumb">
            XMAN UNIVERSE <span>/</span> <b>{section}</b>
          </div>
          <label className="search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="10" r="6" />
              <path d="m15 15 5 5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="ค้นหาโลกใบถัดไปของคุณ…"
              aria-label="ค้นหาเกม"
            />
            <span className="search-hint">{counts.all} WORLDS</span>
          </label>
          <button
            type="button"
            className="pill-button"
            aria-pressed={motion}
            onClick={() => motionPref.set(!motion)}
            title={motion ? "พักเอฟเฟกต์เคลื่อนไหว" : "เปิดเอฟเฟกต์เคลื่อนไหว"}
          >
            <span aria-hidden="true">{motion ? "Ⅱ" : "▷"}</span>
            <span className="pill-word">Motion</span>
          </button>
          <a className="studio-avatar" href="https://xman4289.com" target="_blank" rel="noopener" aria-label="XMAN Studio (เปิดแท็บใหม่)">
            X
          </a>
        </header>

        <div id="mobile-menu" className="mobile-menu" data-open={menu ? "1" : "0"}>
          {nav}
          <button type="button" className="side-tour" onClick={() => { setMenu(false); guide.run("tour"); }}>
            <img src={FACE} alt="" />
            <span>
              <b>ให้โนวาพาทัวร์</b>
              <small>ไกด์ประจำฮับ</small>
            </span>
          </button>
        </div>

        <main>
          <div className="page-intro rise">
            <div>
              <div className="eyebrow">
                <span className="short-line" /> A NEW WORLD IS ONE CLICK AWAY
              </div>
              <h1 className="title-3d">
                Worlds <span>await.</span>
              </h1>
            </div>
            <span className="intro-note">เลือกโลกที่ใช่ แล้วออกผจญภัย</span>
          </div>

          <section
            id="spotlight"
            className="spotlight rise"
            aria-labelledby="feature-title"
            style={{ ["--accent" as string]: fGame.palette[2], ["--accent2" as string]: fGame.palette[0] }}
          >
            <div className="spot-shade" />
            <div className="spot-scan" aria-hidden="true" />
            <div className="spot-head">
              <span className="spot-kicker">
                <span className="spark">✦</span> IN THE SPOTLIGHT
              </span>
              <div className="spot-pagination">
                <span className="spot-num">{pad2(feat + 1)}</span>
                <span className="spot-total">/ {pad2(featured.length)}</span>
                <button type="button" onClick={() => chooseFeature(feat - 1, true)} aria-label="เกมเด่นก่อนหน้า">
                  ‹
                </button>
                <button type="button" onClick={() => chooseFeature(feat + 1, true)} aria-label="เกมเด่นถัดไป">
                  ›
                </button>
              </div>
            </div>

            <div className="spot-copy" key={fGame.id}>
              <span className="spot-category">{fGame.genre.toUpperCase()}</span>
              <h2 id="feature-title" className="spot-title" data-long={fGame.name.length > 10 ? "1" : undefined}>
                {fGame.name}
              </h2>
              <div className="spot-subtitle">{fGame.subtitle}</div>
              <p>
                {fMeta.pitch[0]}
                <br />
                {fMeta.pitch[1]}
              </p>
              <div className="spot-tags">
                {fMeta.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="spot-actions">
                {fGame.play ? (
                  <a className="button primary" href={fGame.play} target="_blank" rel="noopener" onClick={() => playGame(fGame)}>
                    <span aria-hidden="true">▷</span> เล่นเดโมเลย
                  </a>
                ) : null}
                <button type="button" className={`button ${fGame.play ? "secondary" : "primary"}`} onClick={() => openGame(fGame)}>
                  สำรวจเกม <span aria-hidden="true">⊕</span>
                </button>
              </div>
            </div>

            <div
              id="spotlight-stage"
              className="spot-stage"
              role="img"
              aria-label={`ดาวเคราะห์ของ ${fGame.name} ลากเพื่อหมุน`}
              tabIndex={0}
              onPointerDown={onStageDown}
              onPointerMove={onStageMove}
              onPointerUp={onStageUp}
              onPointerCancel={onStageUp}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("xgh:spin", { detail: e.key === "ArrowLeft" ? -40 : 40 }));
                }
              }}
            >
              <img className="spot-fallback-art" src={fGame.image} alt="" aria-hidden="true" />
            </div>

            <div className="world-coordinates" aria-hidden="true">
              <span>{fMeta.sector}</span>
              <span>{fMeta.sectorName}</span>
              <i />
            </div>
            <div className="spot-bottom">
              <span className="ambient-label">
                INTERACTIVE UNIVERSE<span className="ambient-dot" />
              </span>
              <span className="spot-hint">ลากเพื่อหมุนดาวเคราะห์ · ใช้ปุ่มลูกศรได้</span>
              <span className="spot-status">{fGame.play ? "DEMO AVAILABLE" : "IN DEVELOPMENT"}</span>
            </div>
          </section>

          <div
            className="spot-selector rise"
            role="group"
            aria-label="เลือกเกมเด่น"
            style={{ ["--n" as string]: featured.length }}
          >
            {featured.map((f, i) => {
              const g = gameById(f.id)!;
              return (
                <button
                  key={f.id}
                  type="button"
                  className={`spot-choice${i === feat ? " selected" : ""}`}
                  aria-pressed={i === feat}
                  onClick={() => chooseFeature(i, true)}
                  style={{ ["--accent" as string]: g.palette[2] }}
                >
                  <span className="choice-number">{pad2(i + 1)}</span>
                  <img src={f.thumb} alt="" />
                  <span className="choice-text">
                    <b>{g.name}</b>
                    <small>{f.hook}</small>
                  </span>
                  <span className={`choice-status${g.play ? "" : " dim"}`}>{g.play ? "WEB DEMO" : "IN DEV"}</span>
                  {i === feat && <i key={cycle} className={motion ? "run" : undefined} />}
                </button>
              );
            })}
          </div>

          <section id="games" className="library" aria-labelledby="library-heading">
            <div className="library-heading rise">
              <div>
                <span className="eyebrow">EVERY WORLD HAS A STORY</span>
                <h2 id="library-heading">
                  Explore the collection<span className="count">{list.length}</span>
                </h2>
              </div>
              <span className="collection-caption">CURATED BY XMAN STUDIO</span>
            </div>
            <div className="filter-row rise">
              <div className="filters" role="group" aria-label="สถานะเกม">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={filter === f.id ? "on" : undefined}
                    aria-pressed={filter === f.id}
                    onClick={() => applyFilter(f.id)}
                  >
                    {f.label} <span>{f.count}</span>
                  </button>
                ))}
              </div>
              <span className="result-label" aria-live="polite">
                {list.length} {list.length === 1 ? "project" : "projects"} to discover
              </span>
            </div>
            <div id="cards" className="cards">
              {list.map((g) => (
                <div key={g.id} className="rise card-wrap">
                  <GameCard
                    game={g}
                    index={games.indexOf(g)}
                    version={devlogs[g.id]?.version}
                    onOpen={openGame}
                    onHover={onHover}
                  />
                </div>
              ))}
            </div>
            {list.length === 0 && filter === "roblox" && !query && (
              <div className="roblox-soon">
                <div className="roblox-mark" aria-hidden="true">
                  <span />
                </div>
                <div>
                  <span className="eyebrow">XMAN × ROBLOX · NEW PLATFORM</span>
                  <h3>โลกใหม่ของเรากำลังสร้างใน Roblox</h3>
                  <p>
                    XMAN Studio กำลังพัฒนาเกมที่เล่นได้ใน Roblox เมื่อเปิดตัว เกมจะขึ้นในหมวดนี้พร้อมปุ่มเล่นใน Roblox
                    และบันทึกการพัฒนาให้ติดตามทุกเวอร์ชัน
                  </p>
                  <ul>
                    <li>เล่นได้ทั้งคอม มือถือ และแท็บเล็ตผ่านแอป Roblox</li>
                    <li>เล่นกับเพื่อนแบบออนไลน์ในโลกเดียวกัน</li>
                    <li>อัปเดตใหม่แจ้งในบันทึกการพัฒนาของฮับ</li>
                  </ul>
                  <button type="button" className="button secondary" onClick={() => applyFilter("all", { speak: false })}>
                    กลับไปดูทุกโลก
                  </button>
                </div>
              </div>
            )}
            {list.length === 0 && !(filter === "roblox" && !query) && (
              <div className="empty">
                <span aria-hidden="true">⌕</span>
                <h3>ยังไม่พบโลกที่คุณค้นหา</h3>
                <p>ลองชื่อเกมหรือแนวเกมอื่นได้เลย</p>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                >
                  แสดงเกมทั้งหมด
                </button>
              </div>
            )}
          </section>

          <section id="devlog" className="devlog-section" aria-labelledby="devlog-heading">
            <div className="library-heading rise">
              <div>
                <span className="eyebrow">LATEST FROM THE LAB</span>
                <h2 id="devlog-heading">บันทึกการพัฒนา</h2>
              </div>
              <span className="collection-caption">UPDATED BY EVERY RELEASE</span>
            </div>
            <ol className="timeline">
              {timeline.map(({ game: g, entry, version }) => (
                <li key={g.id + entry.date + entry.title} className="rise" style={{ ["--accent" as string]: g.palette[2] }}>
                  <button type="button" className="tl-card" onClick={() => openGame(g, false, "dev")}>
                    <span className="tl-top">
                      <time dateTime={entry.date}>{thaiDate(entry.date)}</time>
                      {version && <span className="tl-ver">{version}</span>}
                    </span>
                    <span className="tl-game">
                      <i /> {g.name}
                    </span>
                    <b>{entry.title}</b>
                    <ul>
                      {entry.items.slice(0, 2).map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                    <span className="tl-more">
                      อ่านบันทึกทั้งหมด <span aria-hidden="true">→</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </section>

          <section className="studio rise" id="studio" aria-labelledby="studio-title">
            <div className="studio-grid" aria-hidden="true" />
            <div className="studio-copy">
              <span className="eyebrow">INDEPENDENT MINDS. INFINITE POSSIBILITIES.</span>
              <h2 id="studio-title">
                We don&apos;t just make games.
                <br />
                <span>We build worlds.</span>
              </h2>
              <p>
                จากไอเดียเล็ก ๆ สู่จักรวาลที่คุณมีส่วนร่วม
                <br />
                นี่คือโลกของ XMAN Studio และทุกเรื่องราวที่กำลังเริ่มต้น
              </p>
              <div className="studio-stats">
                <div>
                  <strong>{pad2(counts.all)}</strong>
                  <span>WORLDS IN THE MAKING</span>
                </div>
                <div>
                  <strong>{pad2(counts.play)}</strong>
                  <span>PLAYABLE WEB DEMOS</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>GUIDE NAMED NOVA</span>
                </div>
              </div>
            </div>
            <div id="core-stage" className="core-stage" aria-hidden="true" />
          </section>

          <footer className="footer">
            <span>© 2026 XMAN STUDIO · HUB {HUB_VERSION}</span>
            <span>IMAGINATION IS OUR ENGINE.</span>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: motionPref.get() ? "smooth" : "auto" });
              }}
            >
              กลับด้านบน ↑
            </a>
          </footer>
        </main>
      </div>

      <DetailDialog
        game={detail}
        tab={detailTab}
        devlog={detail ? devlogs[detail.id] : undefined}
        onClose={() => setDetail(null)}
        onPlay={playGame}
      />
      <NovaGuide />
    </>
  );
}
