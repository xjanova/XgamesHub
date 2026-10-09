"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { CommunityBoard } from "@/components/fund/CommunitySupport";
import Universe from "@/components/universe/Universe";
import NovaGuide from "@/components/nova/NovaGuide";
import { FACE } from "@/components/nova/clips";
import { counts, featured, featuredFor, gameById, games, matches, type Featured, type Filter, type Game } from "@/data/games";
import { fundHref, fundProjects, mainProject } from "@/data/fund";
import { guide, pick, type Chip, type Line } from "@/lib/guide";
import { motionPref, useMotion } from "@/lib/prefs";
import { devNotes } from "@/data/devnotes";
import { thaiDate, useDevlogs, type DevEntry } from "@/lib/devlog";
import { heroOrder, useHubControl, type Announcement } from "@/lib/hub-control";
import { countItems, useOwnedItems } from "@/lib/items";
import DetailDialog, { type DetailTab } from "./DetailDialog";
import GameCard from "./GameCard";
import { SpotFund } from "./MainProject";
import SpotlightVideo from "./SpotlightVideo";
import HeroStill from "./HeroStill";
import { heroStill, spotlightMedia } from "@/data/spotlight-media";
import GameLogo from "./GameLogo";
import RedeemDialog from "./RedeemDialog";

const pad2 = (n: number) => String(n).padStart(2, "0");
const HUB_VERSION = process.env.NEXT_PUBLIC_HUB_VERSION || "dev";
// games hosted inside the hub, and Roblox games (devlog only), publish /play/<id>/devlog.json
const PLAY_IDS = games
  .filter((g) => g.play?.startsWith("/play/") || g.platform === "roblox")
  .map((g) => g.id);

const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "ทุกโลก", count: counts.all },
  { id: "full", label: "เกมเต็ม", count: counts.full },
  { id: "play", label: "เล่นเดโมได้", count: counts.play },
  { id: "dev", label: "กำลังพัฒนา", count: counts.dev },
  { id: "concept", label: "Concept lab", count: counts.concept },
  { id: "roblox", label: "Roblox", count: counts.roblox },
];

const FILTER_LINES: Partial<Record<Filter, Line>> = {
  full: {
    text: "เกมเต็มของ XMAN Studio! เล่นเป็น guest ได้ทันที แล้วผูก XMAN ID ไว้ ความคืบหน้าจะตามไปทุกเครื่องเลย",
    pose: "cheer",
  },
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

type TourStep = { go: string; line: Line; chips?: Chip[] };
const TOUR: TourStep[] = [
  {
    go: "spotlight",
    line: { text: "เริ่มที่สไลด์ด้านบน! ทุกเกมที่เล่นได้อยู่ในแถบโลโก้ตรงนี้ กดโลโก้ไหนก็ดูวิดีโอหรือภาพจากเกมนั้นได้เลย", pose: "present" },
  },
  {
    go: `feature:${mainProject.gameId}`,
    line: {
      text: "ใบแรกคือโปรเจกต์หลักของเรา HIVE // BREACH: COREWAR! ผู้พิทักษ์ปะทะคอมมานเดอร์เอเลี่ยนในสนามเดียว ตอนนี้เปิดรับการสนับสนุนอยู่ แวะไปดูหน้าโปรเจกต์ได้นะ",
      pose: "cheer",
    },
    chips: [{ label: "ดูหน้าโปรเจกต์ ✦", action: "fund" }],
  },
  {
    go: "feature:theone",
    line: { text: "กดลูกศรหรือเลือกโลโก้ด้านล่างเพื่อสลับโลก — อย่างนี่ THE ONE โลกแฟนตาซีที่โนวาเป็นนางเอก!", pose: "present" },
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

// the fund's main project always opens the hero, then the featured games, then every other game
// that can be played right now — a new playable game joins the hero without touching this file
const SPOTLIGHT: Featured[] = [
  mainProject.spotlight,
  ...[...featured.map((f) => f.id), ...games.filter((g) => g.state === "play").map((g) => g.id)]
    .filter((id, i, all) => all.indexOf(id) === i && id !== mainProject.spotlight.id && gameById(id))
    .map((id) => fundProjects.find((p) => p.gameId === id)?.spotlight ?? featuredFor(gameById(id)!)),
];

const ANN_TAG: Record<Announcement["tone"], string> = { info: "ข่าว", event: "ใหม่", warning: "แจ้งเตือน" };
const ANN_KEY = "xgh.ann.closed";
const closedAnnouncements = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(ANN_KEY) || "[]");
  } catch {
    return [];
  }
};

/** Items redeemed on this browser; its own component so a redeem re-renders only this. */
function SupporterCount() {
  const n = countItems(useOwnedItems());
  return <span className="nav-count">{n ? pad2(n) : "CODE"}</span>;
}

const railLabel = (g: Game) =>
  g.edition === "full"
    ? "FULL GAME"
    : g.play
      ? g.play.startsWith("/play/")
        ? "WEB DEMO"
        : "PLAY ONLINE"
      : g.fund
        ? "MAIN PROJECT"
        : g.state === "dev"
          ? "IN DEV"
          : "CONCEPT";

export default function Hub() {
  const motion = useMotion();
  // the XMAN Studio back office can pin, hide and announce; without it the built-in order stands
  const control = useHubControl();
  const spot = useMemo(() => heroOrder(SPOTLIGHT, control?.hero), [control]);
  // the slide is tracked by game, so a reorder from the back office never swaps what is on screen;
  // until something picks a slide (null), the hero opens on whatever comes first
  const [featId, setFeatId] = useState<string | null>(null);
  const feat = featId ? Math.max(0, spot.findIndex((f) => f.id === featId)) : 0;
  const [closedAnn, setClosedAnn] = useState<number[]>([]);
  const [redeem, setRedeem] = useState<{ open: boolean; code: string }>({ open: false, code: "" });
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

  const fMeta = spot[feat];
  const fGame = gameById(fMeta.id)!;
  const fMedia = spotlightMedia[fGame.id];
  const fStill = heroStill(fGame);
  const fFund = fundProjects.find((p) => p.gameId === fGame.id);
  // control only arrives after mount, so reading localStorage here never differs from the static HTML
  const announcement = control?.announcements.find((a) => !closedAnn.includes(a.id) && !closedAnnouncements().includes(a.id));
  const annLink = announcement?.link_url && /^(https:\/\/|\/(?!\/))/.test(announcement.link_url) ? announcement.link_url : null;
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

  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#redeem(?:=([A-Za-z0-9 -]{0,40}))?$/);
      if (!m) return;
      setDetail(null); // one modal at a time
      setRedeem({ open: true, code: m[1] ?? "" });
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    const t = window.setTimeout(fromHash, 0);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  /* ---------------- helpers ---------------- */

  const scrollTo = useCallback((id: string, block: ScrollLogicalPosition = "start") => {
    document.getElementById(id)?.scrollIntoView({ behavior: motionPref.get() ? "smooth" : "auto", block });
  }, []);

  const chooseFeature = useCallback(
    (i: number, byUser: boolean) => {
      const n = (i + spot.length) % spot.length;
      setFeatId(spot[n].id);
      setCycle((c) => c + 1);
      if (byUser) {
        touched.current = performance.now();
        const g = gameById(spot[n].id)!;
        guide.say({ text: g.nova[0], pose: "present", priority: 3 });
      }
    },
    [spot],
  );

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
        const idx = spot.findIndex((f) => f.id === arg);
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
              ...(step.chips ?? []),
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
      fund: () => {
        window.location.href = fundHref(mainProject);
      },
    });
  }, [applyFilter, chooseFeature, openGame, playGame, scrollTo, spot]);

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
                { label: "โปรเจกต์หลัก ✦", action: "fund" },
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
                { label: "โปรเจกต์หลัก ✦", action: "fund" },
                { label: "เดี๋ยวดูเอง", action: "dismiss" },
              ],
            },
      );
    }, 1400);
    // a little later Nova invites people to the main project — once per visit, never over the tour
    let invited = false;
    try {
      invited = sessionStorage.getItem("xgh.fund.invited") === "1";
    } catch {}
    const invite = invited
      ? 0
      : window.setTimeout(() => {
          if (tourStep.current >= 0) return;
          const shown = guide.say({
            text: "อ้อ! อย่าลืมแวะดูโปรเจกต์หลักของเรา HIVE // BREACH: COREWAR นะ ทีมกำลังเปิดรับการสนับสนุนให้ไปถึงเดโมแรก~",
            pose: "present",
            priority: 2,
            hold: 12000,
            chips: [
              { label: "ไปดูหน้าโปรเจกต์ ✦", action: "fund", primary: true },
              { label: "ไว้ก่อน", action: "dismiss" },
            ],
          });
          if (shown) {
            try {
              sessionStorage.setItem("xgh.fund.invited", "1");
            } catch {}
          }
        }, 26000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(invite);
    };
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

  /* ---------------- hero: pointer parallax, logo rail ---------------- */

  const parallax = useRef(0);
  const onHeroMove = (e: RPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || parallax.current) return;
    const el = e.currentTarget;
    const { clientX: x, clientY: y } = e;
    parallax.current = requestAnimationFrame(() => {
      parallax.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", ((x - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty("--py", ((y - r.top) / r.height - 0.5).toFixed(3));
    });
  };
  useEffect(() => () => cancelAnimationFrame(parallax.current), []);

  // keep the chosen logo in view inside the rail (never scrolls the page itself)
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = railRef.current;
    const tile = rail?.children[feat] as HTMLElement | undefined;
    if (!rail || !tile) return;
    const left = tile.offsetLeft - (rail.clientWidth - tile.offsetWidth) / 2;
    rail.scrollTo({ left, behavior: motionPref.get() ? "smooth" : "auto" });
  }, [feat]);

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
        className={`side-link${navActive("full") ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          applyFilter("full", { scroll: true });
        }}
      >
        <span className="nav-icon">★</span>Full games<span className="nav-count">{pad2(counts.full)}</span>
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
        href="#redeem"
        className="side-link"
        onClick={(e) => {
          e.preventDefault();
          setMenu(false);
          setRedeem({ open: true, code: "" });
        }}
      >
        <span className="nav-icon">✦</span>Supporter items<SupporterCount />
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
            className="pill-button redeem-pill"
            onClick={() => setRedeem({ open: true, code: "" })}
            title="แลกโค้ดไอเท็มผู้สนับสนุน"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-1.5-3-5-3.5-5-1.2C7 7 9.5 7 12 7zm0 0c1.5-3 5-3.5 5-1.2C17 7 14.5 7 12 7z" />
            </svg>
            <span className="pill-word">แลกโค้ด</span>
          </button>
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
          <section
            id="spotlight"
            // every slide carries media now (video or a still), so Nova docks instead of standing on it
            className="spotlight has-media"
            aria-labelledby="feature-title"
            onPointerMove={onHeroMove}
            style={{
              ["--accent" as string]: fGame.palette[2],
              ["--accent2" as string]: fGame.palette[0],
            }}
          >
            <h1 className="sr-only">XMAN GAMES HUB</h1>
            {announcement && (
              <div className={`hero-ann ${announcement.tone}`} role="status">
                <span className="hero-ann-tag">{ANN_TAG[announcement.tone] ?? ANN_TAG.info}</span>
                <p>{announcement.message}</p>
                {annLink && (
                  <a href={annLink} {...(annLink.startsWith("/") ? {} : { target: "_blank", rel: "noopener" })}>
                    {announcement.link_label || "ดูเพิ่ม"} <span aria-hidden="true">→</span>
                  </a>
                )}
                <button
                  type="button"
                  aria-label="ปิดประกาศนี้"
                  onClick={() => {
                    const ids = [...closedAnnouncements(), announcement.id].slice(-30);
                    try {
                      localStorage.setItem(ANN_KEY, JSON.stringify(ids));
                    } catch {}
                    setClosedAnn(ids);
                  }}
                >
                  ×
                </button>
              </div>
            )}
            <div className="hero-media">
              {fMedia ? (
                <SpotlightVideo
                  key={`video-${fGame.id}`}
                  media={fMedia}
                  motion={motion}
                  onInteract={() => {
                    touched.current = performance.now();
                  }}
                />
              ) : (
                <HeroStill key={`still-${fGame.id}`} still={fStill} alt={`ภาพจากเกม ${fGame.name}`} flip={feat % 2 === 1} />
              )}
            </div>
            <div className="spot-shade" />
            <div className="spot-scan" aria-hidden="true" />
            <div className="spot-head">
              {fGame.fund ? (
                <a className="spot-kicker main" href={fGame.fund}>
                  <span className="spark">★</span>{" "}
                  {fGame.id === mainProject.gameId
                    ? "โปรเจกต์หลัก · ร่วมสนับสนุน"
                    : "เดโมพร้อมเล่น · ร่วมสนับสนุน"}
                </a>
              ) : (
                <span className="spot-kicker">
                  <span className="spark">✦</span> IN THE SPOTLIGHT
                </span>
              )}
              <div className="spot-pagination">
                <span className="spot-num">{pad2(feat + 1)}</span>
                <span className="spot-total">/ {pad2(spot.length)}</span>
                <button
                  type="button"
                  onClick={() => chooseFeature(feat - 1, true)}
                  aria-label="เกมเด่นก่อนหน้า"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => chooseFeature(feat + 1, true)}
                  aria-label="เกมเด่นถัดไป"
                >
                  ›
                </button>
              </div>
              <span className="hero-meta" aria-hidden="true">
                <span className="ambient-dot" />
                {fMedia?.kind ?? fStill.kind}
                <i />
                {fMeta.sector} · {fMeta.sectorName}
              </span>
            </div>

            <div className="spot-copy" key={`copy-${fGame.id}`}>
              <span className="spot-category">{fGame.genre.toUpperCase()}</span>
              <h2
                id="feature-title"
                className="spot-title"
                data-long={fGame.name.length > 10 ? "1" : undefined}
              >
                <GameLogo game={fGame} className="spot-game-logo" />
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
              {fFund && <SpotFund project={fFund} />}
              <div className="spot-actions">
                {fGame.play ? (
                  <a
                    className="button primary"
                    href={fGame.play}
                    target="_blank"
                    rel="noopener"
                    onClick={() => playGame(fGame)}
                  >
                    <span aria-hidden="true">▷</span> {fGame.edition === "full" ? "เข้าเล่น" : "เล่นเดโมเลย"}
                  </a>
                ) : null}
                <button
                  type="button"
                  className={`button ${fGame.play ? "secondary" : "primary"}`}
                  onClick={() => openGame(fGame)}
                >
                  สำรวจเกม <span aria-hidden="true">⊕</span>
                </button>
              </div>
            </div>

            <div className="hero-rail" role="group" aria-label="เลือกเกมเด่น">
              <div className="rail-track" ref={railRef}>
                {spot.map((f, i) => {
                  const g = gameById(f.id)!;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      className={`rail-choice${i === feat ? " selected" : ""}${g.fund ? " main" : ""}`}
                      aria-pressed={i === feat}
                      aria-label={`${g.name} — ${f.hook}`}
                      title={f.hook}
                      onClick={() => chooseFeature(i, true)}
                      style={{ ["--accent" as string]: g.palette[2] }}
                    >
                      <GameLogo game={g} className="rail-logo" lazy />
                      <span className={`rail-state${g.edition === "full" ? " full" : g.play ? "" : " dim"}`}>{railLabel(g)}</span>
                      {i === feat && <i key={cycle} className={motion ? "run" : undefined} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

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

          <CommunityBoard />
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
      <RedeemDialog open={redeem.open} initialCode={redeem.code} onClose={() => setRedeem({ open: false, code: "" })} />
      <NovaGuide />
    </>
  );
}
