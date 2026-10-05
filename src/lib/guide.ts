/**
 * Nova's brain: a tiny store the page talks to ("say this", "do that") and the
 * NovaGuide component renders. Kept outside React so any section can make her
 * speak without prop drilling.
 */

export type Pose = "welcome" | "present" | "cheer" | "play";
export type Move =
  | "idle"
  | "talk"
  | "wave"
  | "present"
  | "cheer"
  | "play"
  | "wink"
  | "surprise";

export type Chip = { label: string; action: string; primary?: boolean };

export type Line = {
  text: string;
  pose?: Pose;
  /** Clip to hold after the text has been typed (defaults to the pose's loop). */
  after?: Move;
  /** One-off move played the moment the line starts. */
  react?: "wink" | "surprise";
  chips?: Chip[];
  /** Higher wins; a lower one does not interrupt a line still being read. */
  priority?: number;
  /** ms the line stays protected after it finished typing. */
  hold?: number;
};

export type GuideState = {
  line: (Line & { id: number }) | null;
  minimized: boolean;
};

type Listener = () => void;

let state: GuideState = { line: null, minimized: false };
const listeners = new Set<Listener>();
const actions = new Map<string, (arg?: string) => void>();
let seq = 0;
let protectedUntil = 0;
let currentPriority = 0;

function emit() {
  for (const l of listeners) l();
}

export const guide = {
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => state,

  say(line: Line) {
    const now = performance.now();
    const p = line.priority ?? 1;
    if (now < protectedUntil && p < currentPriority) return false;
    currentPriority = p;
    // Rough reading time: Thai has no spaces, count characters.
    protectedUntil = now + 900 + line.text.length * 38 + (line.hold ?? 2200);
    state = { ...state, line: { ...line, id: ++seq } };
    emit();
    return true;
  },

  /** Let lower-priority lines through again (e.g. after a chip was clicked). */
  release() {
    protectedUntil = 0;
    currentPriority = 0;
  },

  setMinimized(minimized: boolean) {
    state = { ...state, minimized };
    try {
      localStorage.setItem("xgh.nova.min", minimized ? "1" : "0");
    } catch {}
    emit();
  },

  register(map: Record<string, (arg?: string) => void>) {
    for (const [k, fn] of Object.entries(map)) actions.set(k, fn);
    return () => {
      for (const k of Object.keys(map)) actions.delete(k);
    };
  },

  run(action: string) {
    const [name, arg] = action.split(":");
    actions.get(name)?.(arg);
  },
};

/** Split for the typewriter without breaking Thai vowels/tone marks off their consonant. */
export function graphemes(text: string): string[] {
  try {
    const seg = new Intl.Segmenter("th", { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  } catch {
    return Array.from(text);
  }
}

export const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

export const tips = [
  "ลากที่ดาวเคราะห์เพื่อหมุนได้นะ หรือกดลูกศรซ้าย–ขวาก็ได้",
  "พิมพ์ชื่อเกมหรือแนวเกมในช่องค้นหาด้านบนได้เลย เช่น “RPG” หรือ “2.5D”",
  "การ์ดที่มีป้าย WEB DEMO กดเล่นได้ทันทีบนเบราว์เซอร์!",
  "ถ้าเครื่องเริ่มหน่วง กดปุ่ม Motion ด้านบนเพื่อพักเอฟเฟกต์ได้",
  "อยากให้โนวาเลือกให้? กด “สุ่มเกมให้หน่อย” ได้ทุกเมื่อ",
];
