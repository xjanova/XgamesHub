"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { guide, graphemes, pick, tips, type Chip, type Line, type Move, type Pose } from "@/lib/guide";
import { motionPref } from "@/lib/prefs";
import { FACE, POSE_LOOP } from "./clips";
import NovaFigure, { type NovaFigureHandle } from "./NovaFigure";

const POKES: Line[] = [
  { text: "ว้าย! จิ้มโนวาทำไมเนี่ย~", react: "surprise", pose: "welcome" },
  { text: "แหะ ๆ ชอบโนวาเหรอ? งั้นไปเล่นเกมด้วยกันนะ!", react: "wink", pose: "welcome" },
  { text: "เฮ้! โนวากำลังตั้งใจเป็นไกด์อยู่นะ", react: "surprise", pose: "welcome" },
  {
    text: "อยากให้โนวาสุ่มเกมให้มั้ย?",
    react: "wink",
    pose: "welcome",
    chips: [{ label: "สุ่มเลย!", action: "random", primary: true }],
  },
];

type Mode = "stage" | "dock" | "mini";
const DOCK_H = 340;

export default function NovaGuide() {
  const st = useSyncExternalStore(guide.subscribe, guide.get, guide.get);
  const fig = useRef<NovaFigureHandle>(null);
  const root = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [bubble, setBubble] = useState(false);
  const [mode, setMode] = useState<Mode>("dock");
  const [missing, setMissing] = useState(false);
  const loopRef = useRef<Move>("idle");
  const poseRef = useRef<Pose>("welcome");
  const busyRef = useRef(false);
  const typingRef = useRef(false);
  const lastLineAt = useRef(0);
  const tipCount = useRef(0);
  const modeRef = useRef<Mode>("dock");

  const playOnce = useCallback((m: Move, then?: () => void) => {
    busyRef.current = true;
    fig.current?.show(m, () => {
      busyRef.current = false;
      if (then) then();
      else fig.current?.show(loopRef.current);
    });
  }, []);

  /* ---- speak: type the line out, talk while typing, then settle into a pose ---- */
  useEffect(() => {
    const line = st.line;
    if (!line) return;
    lastLineAt.current = performance.now();
    const pose = line.pose ?? "welcome";
    poseRef.current = pose;
    const talk: Move = pose === "welcome" ? "talk" : POSE_LOOP[pose];
    const settle: Move = line.after ?? POSE_LOOP[pose];
    const parts = graphemes(line.text);
    let i = 0;
    let timer = 0;
    let hideTimer = 0;
    let cancelled = false;

    const finish = () => {
      typingRef.current = false;
      loopRef.current = settle;
      if (!busyRef.current) fig.current?.show(settle);
      // the corner bubble tidies itself away; on phones even one with buttons does
      if (modeRef.current === "mini" || (!line.chips?.length && modeRef.current !== "stage")) {
        const extra = line.chips?.length ? 6000 : 0;
        hideTimer = window.setTimeout(() => setBubble(false), 9000 + extra + line.text.length * 40);
      }
    };
    const type = () => {
      if (cancelled) return;
      typingRef.current = true;
      loopRef.current = talk;
      if (!busyRef.current) fig.current?.show(talk);
      if (!motionPref.get()) {
        setTyped(line.text);
        finish();
        return;
      }
      timer = window.setInterval(() => {
        i = Math.min(parts.length, i + 1);
        setTyped(parts.slice(0, i).join(""));
        if (i >= parts.length) {
          window.clearInterval(timer);
          finish();
        }
      }, 32);
    };

    // state updates are deferred a frame so the effect body stays side-effect only
    const raf = requestAnimationFrame(() => {
      setTyped("");
      setChips(line.chips ?? []);
      setBubble(true);
      if (line.react) playOnce(line.react, type);
      else type();
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
      window.clearTimeout(hideTimer);
    };
  }, [st.line, playOnce]);

  /* ---- where she stands: beside the spotlight planet on wide screens, else the corner ---- */
  useEffect(() => {
    let raf = 0;
    let flyTimer = 0;
    const el = root.current;
    if (!el) return;
    const place = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const spot = document.getElementById("spotlight");
      const r = spot?.getBoundingClientRect();
      const small = vw < 720;
      const H = Math.max(DOCK_H, Math.min((r?.height ?? 560) * 1.12, vh * 0.8));
      const W = H * (2 / 3);
      // she stands on the panel only while her head clears the top bar; scroll further and she docks
      const stageOK = !small && vw >= 1280 && !!r && r.top < vh * 0.55 && r.bottom - H * 0.96 >= 40;
      const m: Mode = small ? "mini" : stageOK ? "stage" : "dock";
      if (m !== modeRef.current) {
        el.classList.add("flying");
        window.clearTimeout(flyTimer);
        flyTimer = window.setTimeout(() => el.classList.remove("flying"), 750);
        modeRef.current = m;
        setMode(m);
      }
      // the box is laid out at stage size and scaled DOWN for the dock (stays sharp)
      let x: number;
      let y: number;
      let s: number;
      if (m === "stage" && r) {
        s = 1;
        x = r.right - W * 0.78;
        y = r.bottom - H * 0.96;
      } else {
        s = Math.min(DOCK_H, vh * 0.42) / H;
        x = vw - W * s - 10;
        y = vh - H * s + 4;
      }
      el.style.setProperty("--nh", `${H}px`);
      el.style.setProperty("--nw", `${W}px`);
      el.style.setProperty("--nx", `${x}px`);
      el.style.setProperty("--ny", `${y}px`);
      el.style.setProperty("--ns", `${s}`);
      // speech bubble: to the left of her head
      // speech bubble: stage = beside her head; dock = above her head
      if (m === "stage") {
        el.style.setProperty("--bx", `${Math.max(16, x + W * 0.24)}px`);
        el.style.setProperty("--by", `${Math.max(80, y + H * 0.15)}px`);
      } else {
        el.style.setProperty("--bx", `${Math.min(vw - 10, x + W * s * 0.94)}px`);
        el.style.setProperty("--by", `${y + H * s * 0.1}px`);
      }
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(flyTimer);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  /* ---- idle life: little fidgets, and an occasional tip ---- */
  useEffect(() => {
    let next = performance.now() + 9000 + Math.random() * 9000;
    const t = window.setInterval(() => {
      const now = performance.now();
      if (document.hidden || typingRef.current || busyRef.current) return;
      if (now - lastLineAt.current > 38000 && tipCount.current < 3) {
        tipCount.current++;
        guide.say({ text: pick(tips), pose: "welcome", priority: 0, react: "wink" });
        return;
      }
      if (now > next && poseRef.current === "welcome" && motionPref.get()) {
        next = now + 9000 + Math.random() * 9000;
        playOnce(Math.random() < 0.7 ? "wink" : "wave");
      }
    }, 1000);
    return () => window.clearInterval(t);
  }, [playOnce]);

  const poke = () => {
    guide.release();
    guide.say({ ...pick(POKES), priority: 2 });
  };

  const minimized = st.minimized;
  if (missing) return null;

  return (
    <div
      ref={root}
      className="nova"
      data-mode={mode}
      data-min={minimized ? "1" : "0"}
      data-bubble={bubble && (!minimized || mode === "mini") ? "1" : "0"}
    >
      <div className="nova-body" aria-hidden={minimized}>
        <NovaFigure ref={fig} onMissing={() => setMissing(true)} />
        <button className="nova-hit" type="button" onClick={poke} aria-label="จิ้มโนวา" tabIndex={minimized ? -1 : 0} />
      </div>

      <section className="nova-bubble" aria-label="โนวา ไกด์ของ XMAN GAMES HUB">
        <header>
          <span className="nova-name">
            <i /> NOVA · GUIDE
          </span>
          <button type="button" className="nova-x" onClick={() => setBubble(false)} aria-label="ปิดคำพูด">
            ×
          </button>
        </header>
        <p aria-hidden="true">
          {typed}
          <span className="caret" />
        </p>
        <p className="sr-only" role="status" aria-live="polite">
          {st.line?.text}
        </p>
        {chips.length > 0 && (
          <div className="nova-chips">
            {chips.map((c) => (
              <button
                key={c.action + c.label}
                type="button"
                className={c.primary ? "primary" : undefined}
                onClick={() => {
                  guide.release();
                  guide.run(c.action);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </section>

      <div className="nova-controls">
        {!minimized && mode !== "mini" && (
          <button type="button" className="nova-ctl" onClick={() => guide.setMinimized(true)} aria-label="ย่อโนวา">
            –
          </button>
        )}
      </div>

      <button
        type="button"
        className="nova-face"
        onClick={() => {
          if (minimized) guide.setMinimized(false);
          if (mode === "mini") setBubble((b) => !b);
          else poke();
        }}
        aria-label={minimized ? "เรียกโนวากลับมา" : "คุยกับโนวา"}
      >
        <img src={FACE} alt="" draggable={false} />
        <span className="nova-dot" />
      </button>
    </div>
  );
}
