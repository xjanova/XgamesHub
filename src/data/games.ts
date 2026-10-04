/**
 * The XMAN Studio catalogue shown in the hub.
 *
 * Status is kept honest: only X-NOVA and THE ONE have a web demo that opens.
 * Demo builds are not in this repo (the repo is public) — they are uploaded to
 * the server under /play/<id>/ by scripts/deploy-demos.sh.
 */

export type GameState = "play" | "dev" | "concept";

/** Planet look for the 3D scene: 0 banded gas giant, 1 continents, 2 dark crystal world. */
export type PlanetStyle = 0 | 1 | 2;

export type Game = {
  id: string;
  name: string;
  /** Short tracked line under the title in the spotlight. */
  subtitle: string;
  genre: string;
  state: GameState;
  /** Small footer label on the card. */
  stage: string;
  tagline: string;
  description: string;
  features: string[];
  note: string;
  image: string;
  /** Playable web demo (opens in a new tab). */
  play?: string;
  palette: [string, string, string];
  planet: PlanetStyle;
  /** What Nova says about this world. */
  nova: string[];
};

export type Featured = {
  id: string;
  thumb: string;
  hook: string;
  /** Two short lines for the spotlight copy. */
  pitch: [string, string];
  sector: string;
  sectorName: string;
  tags: string[];
};

export const games: Game[] = [
  {
    id: "xnova",
    name: "X-NOVA",
    subtitle: "STELLAR ASSAULT",
    genre: "Arcade / Space shooter",
    state: "play",
    stage: "Browser demo",
    tagline: "อัปเกรดยาน ฝ่าเนบิวลา และท้าทายบอสจักรกล",
    description:
      "เกมยิงยานสไตล์ Gradius บนเว็บ ทะลวงเนบิวลา แถบอุกกาบาต และป้อมปราการอวกาศ เก็บแคปซูลอัปเกรดอาวุธ แล้วเผชิญหน้าบอส ASTRAEA ที่แตกร่างได้สามชิ้น",
    features: ["Stage 1: Nebula Front", "Power meter", "Nova Burst", "WebGL2 HDR"],
    note: "เดโมเว็บเปิดเล่นได้ในแท็บใหม่ ใช้คีย์บอร์ดหรือจอยก็ได้ ยังอยู่ระหว่างพัฒนา",
    image: "/art/xnova.webp",
    play: "/play/xnova/",
    palette: ["#6b4cff", "#2a1a7a", "#6ff0ff"],
    planet: 0,
    nova: [
      "X-NOVA คือเกมยิงยานที่โนวาเป็นนักบินเอง! เก็บแคปซูลให้ครบ แล้วกด NOVA BURST ตอนกระสุนเต็มจอนะ",
      "บอส ASTRAEA แตกได้สามชิ้นเลยล่ะ ใครผ่านด่านแรกได้มาอวดโนวาหน่อย~",
    ],
  },
  {
    id: "umbra",
    name: "NOVA·UMBRA",
    subtitle: "FOLLOW THE LIGHT",
    genre: "Adventure / Puzzle / 2.5D",
    state: "dev",
    stage: "Prototype",
    tagline: "เดินทางผ่านโลกแห่งเงาและปริศนาแสง",
    description:
      "เดินทางกับโนวาและลูมิผ่านป่าเรืองแสงและทะเลสาบกระจก แก้ปริศนาด้วยแสงและเงา ปลุกโลกที่หลับใหลให้ตื่นขึ้นอีกครั้ง",
    features: ["ปริศนาแสง", "ฉากพารัลแลกซ์", "ทะเลสาบกระจก", "Godot 4"],
    note: "มีต้นแบบและด่านแรกแล้ว สายหลักย้ายไป Godot จึงยังไม่เปิดให้เล่นบนเว็บ",
    image: "/art/umbra.webp",
    palette: ["#8fe6ff", "#141a3a", "#8a6bff"],
    planet: 2,
    nova: [
      "NOVA·UMBRA เงียบ ๆ แต่สวยมาก โนวาต้องพาลูมิตามแสงไปปลุกโลกที่หลับใหล",
      "เกมนี้ยังเป็นต้นแบบอยู่ แต่ทะเลสาบกระจกน่ะ… โนวาชอบที่สุดเลย",
    ],
  },
  {
    id: "theone",
    name: "THE ONE",
    subtitle: "LEGEND OF THE STAR WITCH",
    genre: "Action RPG / Fantasy / 3D",
    state: "play",
    stage: "Browser demo",
    tagline: "ผจญภัยกับโนวาในโลกแฟนตาซีแห่งดวงดาว",
    description:
      "ออกผจญภัยกับโนวาในโลกแฟนตาซีสามมิติ สำรวจทุ่งหญ้า ซากวิหาร และทะเลสาบ ใช้คอมโบดาวและสกิลเพื่อเผชิญหน้าบอสไททันผลึก",
    features: ["4 สกิล", "5 ช่วงเควส", "บอส 2 เฟส", "เซฟในอุปกรณ์"],
    note: "ต้นแบบเว็บเล่นครบวงจรได้ บนมือถือให้เล่นแนวนอน",
    image: "/art/theone.webp",
    play: "/play/theone/",
    palette: ["#ffcf6b", "#1f6f7a", "#7af0d6"],
    planet: 1,
    nova: [
      "THE ONE โนวาเป็นนางเอกเองนะ! คอมโบดาวสามจังหวะแล้วปล่อยสกิล — บอสไททันผลึกก็ไม่รอด",
      "อย่าลืมแวะทะเลสาบในเควสสุดท้าย วิวสวยมากกก",
    ],
  },
  {
    id: "tetrisvs",
    name: "TetrisVS",
    subtitle: "STACK. CLASH. WIN.",
    genre: "Puzzle / Versus / Arcade",
    state: "dev",
    stage: "Prototype",
    tagline: "เรียงบล็อก แข่งกับ AI และวางแผนชนะคู่ต่อสู้",
    description:
      "เกมเรียงบล็อกแข่งขัน มีโหมด Solo คู่แข่ง AI และระบบออนไลน์ที่พัฒนาไว้ พร้อมรีเพลย์และตารางคะแนน",
    features: ["Solo", "AI opponent", "Versus", "Replay"],
    note: "มีโค้ดและระบบเกมแล้ว ยังไม่ได้เชื่อมเซิร์ฟเวอร์ออนไลน์กับฮับนี้",
    image: "/art/tetris.svg",
    palette: ["#4fe3ff", "#3a2a8a", "#b6ff4f"],
    planet: 0,
    nova: [
      "TetrisVS ส่งแถวขยะไปถล่มคู่แข่งได้ด้วย! โนวาแพ้ AI ไปสามรอบแล้ว…",
      "ถ้าเปิดออนไลน์เมื่อไหร่ มาแข่งกับโนวานะ",
    ],
  },
  {
    id: "breaker",
    name: "X-NOVA: BREAKER",
    subtitle: "STEAL THEIR GUNS",
    genre: "Space shooter / 2.5D",
    state: "dev",
    stage: "Prototype in progress",
    tagline: "ยิงชิ้นส่วนศัตรูมาติดยาน แล้วสวนกลับ",
    description:
      "ยิงชิ้นส่วนศัตรูให้หลุด ดึงมาติดยานสามจุด แล้วดีดกลับไปโจมตีบอส เปลี่ยนยานของคุณด้วยอาวุธที่ชิงมาได้ระหว่างการต่อสู้",
    features: ["ชิงอาวุธ", "3 จุดติดตั้ง", "บอสโมดูลาร์", "เดโม 6–8 นาทีในแผน"],
    note: "ภาคต่อยอดจาก X-NOVA กำลังสร้างต้นแบบระบบชิงอาวุธ ภาพเป็นภาพคอนเซปต์",
    image: "/art/breaker.webp",
    palette: ["#ff7a3d", "#1b2433", "#49d6ff"],
    planet: 2,
    nova: [
      "BREAKER คือ X-NOVA ที่ขโมยปืนศัตรูมาใช้ได้! ยิงโล่ให้หลุด ดูดมาติดยาน แล้วดีดใส่บอสเลย",
    ],
  },
  {
    id: "runeward",
    name: "RUNEWARD",
    subtitle: "GUARD THE SKY ISLES",
    genre: "Tower defense / Strategy / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "วางป้อม ผสานรูน ปกป้องเกาะลอยฟ้า",
    description:
      "ปกป้องหัวใจคริสตัลของหมู่เกาะลอยฟ้า วางป้อมให้เกิดคอมโบ ย้ายคอมมานเดอร์ไปช่วยแนวรบ และเลือกรูนระหว่างคลื่น เล่นรอบละ 8–12 นาที",
    features: ["4 ป้อมเริ่มต้น", "Commander skills", "Rune combos", "10 คลื่นในแผนเดโม"],
    note: "ชื่อชั่วคราวและแผนพัฒนา ภาพเป็นคอนเซปต์ ไม่ใช่ภาพจากเกมจริง",
    image: "/art/runeward.webp",
    palette: ["#66d17a", "#1d4a6a", "#59e0ff"],
    planet: 1,
    nova: [
      "RUNEWARD เสาน้ำแข็งกับปืนครกเข้ากันสุด ๆ แช่แข็งแล้วตูม! แตกกระจาย",
    ],
  },
  {
    id: "lucky",
    name: "LUCKY ISLES",
    subtitle: "ROLL. BUILD. RULE.",
    genre: "Board game / Party / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "ทอยเต๋า เลือกเส้นทาง สร้างอาณาจักรร้านค้า",
    description:
      "เศรษฐีเกาะป่วน ทอยเต๋าสองลูกแล้วเลือกเดินหนึ่งลูก ซื้อร้าน อัปเกรดย่าน และพลิกเกมด้วยสกิลเฉพาะตัวละคร เล่นกับเพื่อน 2–4 คน",
    features: ["2–4 ผู้เล่น", "24 ช่อง", "4 ตัวละครเริ่มต้น", "แผนที่จังหวัดไทย"],
    note: "มีคอนเซปต์ กติกา และภาพ UI แล้ว ยังไม่ได้เริ่มสร้างเกมจริง",
    image: "/art/lucky.webp",
    palette: ["#36c2e8", "#2a5a8a", "#ffd27a"],
    planet: 1,
    nova: [
      "LUCKY ISLES ทอยเต๋าสองลูกแต่เลือกเดินได้ลูกเดียว — วางแผนดี ๆ ร้านของเพื่อนจะเป็นของเรา!",
    ],
  },
  {
    id: "neon",
    name: "NEON COVEN",
    subtitle: "CYBER GOTHIC VERSUS",
    genre: "Fighting / Versus / 2D",
    state: "concept",
    stage: "Design in progress",
    tagline: "ต่อสู้ด้วยสกิลในโลกไซไฟโกธิค",
    description:
      "เกมต่อสู้ไซไฟโกธิค สาวไซบอร์ก แม่มด และมนุษย์สัตว์ ใช้โจมตี สกิล ป้องกัน และแดช ในแมตช์ที่เข้าใจง่ายแต่เล่นลึก",
    features: ["1v1", "4 ปุ่มหลัก", "Overdrive", "เดโม 2 ตัวละครในแผน"],
    note: "ข้อเสนอคอนเซปต์ ชื่อและขอบเขตยังเป็นชื่อชั่วคราว",
    image: "/art/neon.webp",
    palette: ["#ff3dbe", "#2a0f4a", "#9a6bff"],
    planet: 2,
    nova: [
      "NEON COVEN สี่ปุ่มก็สู้ได้ แต่ Overdrive ตอนเลือดเหลือน้อยนี่แหละไม้ตาย",
    ],
  },
  {
    id: "cafe",
    name: "CAFÉ PROJECT",
    subtitle: "BREW YOUR DREAM",
    genre: "Simulation / Management / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "ตกแต่งและบริหารร้านกาแฟในฝัน",
    description:
      "ออกแบบร้านกาแฟในฝัน จัดวางเฟอร์นิเจอร์ ดูแลลูกค้า และบริหารร้านผ่านมุมมองไอโซเมตริก UI ภาษาไทยทั้งเกม",
    features: ["ตกแต่งร้าน", "บริหารคาเฟ่", "UI ภาษาไทย", "Isometric"],
    note: "ชื่อในฮับเป็นชื่อเรียกโครงการ มีสเปกและภาพ UI สำหรับพัฒนาต่อ",
    image: "/art/cafe.webp",
    palette: ["#d8a36e", "#3a5a3a", "#f4e2c4"],
    planet: 1,
    nova: [
      "CAFÉ PROJECT โนวาขอเป็นบาริสต้าได้มั้ย~ ลาเต้อาร์ตรูปดาวนะ",
    ],
  },
  {
    id: "juntra",
    name: "JUNTRA",
    subtitle: "READING ROOM OF THE MOON",
    genre: "Interactive experience / Tarot / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "สัมผัสโลกไพ่ทาโรต์ในห้องพยากรณ์จันทรา",
    description:
      "ห้องพยากรณ์จันทรา ประสบการณ์โต๊ะไพ่แบบ 2.5D ตั้งแต่เลือกสำรับจนถึงเปิดไพ่ ในบรรยากาศห้องแม่หมอใต้แสงจันทร์",
    features: ["โต๊ะไพ่ 2.5D", "เปิดไพ่", "คอนเซปต์ UI", "Interactive"],
    note: "ประสบการณ์อินเทอร์แอคทีฟในห้อง Concept lab ยังไม่ได้เชื่อมบริการพยากรณ์จริง",
    image: "/art/juntra.webp",
    palette: ["#f2c45a", "#24205e", "#8e5cff"],
    planet: 2,
    nova: [
      "JUNTRA ห้องพยากรณ์ใต้แสงจันทร์… โนวาชอบพระจันทร์อยู่แล้วด้วย อิอิ",
    ],
  },
];

export const featured: Featured[] = [
  {
    id: "xnova",
    thumb: "/art/thumb-xnova.webp",
    hook: "ทะยานสู่สมรภูมิอวกาศ",
    pitch: ["ทะลวงเนบิวลา อัปเกรดยาน และท้าทายบอสจักรกล", "การผจญภัยครั้งใหม่เริ่มจากคุณ"],
    sector: "SECTOR / 07",
    sectorName: "NEBULA FRONT",
    tags: ["Browser game", "Single player", "Web demo"],
  },
  {
    id: "theone",
    thumb: "/art/thumb-theone.webp",
    hook: "ตำนานแม่มดดวงดาว",
    pitch: ["ออกผจญภัยกับโนวาในโลกแฟนตาซีสามมิติ", "คอมโบดาว สกิล และบอสไททันผลึกรอคุณอยู่"],
    sector: "SECTOR / 01",
    sectorName: "STARFALL MEADOW",
    tags: ["Action RPG", "3D", "Web demo"],
  },
  {
    id: "umbra",
    thumb: "/art/thumb-umbra.webp",
    hook: "ตามแสงสู่โลกที่หลับใหล",
    pitch: ["ตามแสงของลูมิผ่านป่าเรืองแสงและทะเลสาบกระจก", "ปลุกโลกที่หลับใหลด้วยปริศนาแห่งแสงและเงา"],
    sector: "SECTOR / 13",
    sectorName: "MIRROR LAKE",
    tags: ["Adventure", "Puzzle", "In development"],
  },
];

export const gameById = (id: string) => games.find((g) => g.id === id);

export const counts = {
  all: games.length,
  play: games.filter((g) => g.state === "play").length,
  dev: games.filter((g) => g.state !== "concept").length,
  concept: games.filter((g) => g.state === "concept").length,
};

export type Filter = "all" | "play" | "dev" | "concept";

export function matches(g: Game, filter: Filter, query: string) {
  if (filter === "play" && g.state !== "play") return false;
  if (filter === "dev" && g.state === "concept") return false;
  if (filter === "concept" && g.state !== "concept") return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [g.name, g.genre, g.tagline, g.subtitle, ...g.features]
    .join(" ")
    .toLowerCase()
    .includes(q);
}
