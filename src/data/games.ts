/**
 * The XMAN Studio catalogue shown in the hub.
 *
 * Status is kept honest: only games with a `play` URL have a web demo that opens.
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
  /** Donation page for a project the studio is raising funds for (src/data/fund.ts). */
  fund?: string;
  palette: [string, string, string];
  planet: PlanetStyle;
  /** What Nova says about this world. */
  nova: string[];
  /** Where it runs (default "web"): "native" = desktop build only, "roblox" = a Roblox experience. */
  platform?: "web" | "native" | "roblox";
  /** "full" = built as a complete game with accounts and saves, not a demo or a prototype. */
  edition?: "full";
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
    id: "krungsri",
    name: "ขุนศึกกรุงศรี",
    subtitle: "WARLORDS OF KRUNGSRI",
    genre: "Idle loot RPG / Fantasy Ayutthaya / 2.5D",
    state: "play",
    edition: "full",
    stage: "Early access",
    tagline: "เปิดหีบมหาลาภ เลือกอาวุธ แล้วคุ้มกันกองเรือค้าขายทั่วกรุงศรี",
    description:
      "เกมเต็มเกมแรกของ XMAN Studio ขุนศึกกรุงศรี: หีบมหาลาภ เป็น RPG เปิดหีบแบบ idle รับบทกล้าหรือมะลิ นักรบคุ้มกันการค้าในกรุงศรีแฟนตาซี เปิดหีบหาอุปกรณ์ 6 ช่อง จัดวิชาดาบไว สวนกลับ หรือยืนระยะ ชวนสหายร่วมทาง แล้วล้มบอสทั้งสามท่าน้ำ ระหว่างทางมีมินิเกมหกเกม เควสรายวันและรายสัปดาห์ และท่าเรือที่เก็บรายได้ให้แม้ไม่ได้เล่น",
    features: ["24 ด่าน 3 บท บอส 3 ตัว", "มินิเกม 6 เกม", "สหายร่วมทาง 3 ตัว", "เล่นแบบ guest ได้ทันที"],
    note: "เปิดทดสอบบนเว็บ (Early access) เริ่มเล่นแบบ guest ได้ทันที ผูก XMAN ID เพื่อเก็บความคืบหน้าข้ามเครื่อง ร้านค้าของแต่งปิดอยู่ระหว่างพัฒนา ชุดแต่งตัวและท่าต่อสู้บางส่วนยังอยู่ระหว่างผลิต",
    image: "/art/krungsri.webp",
    play: "/play/krungsri/",
    palette: ["#e8b54a", "#5a1a14", "#ffd88a"],
    planet: 1,
    nova: [
      "ขุนศึกกรุงศรีเป็นเกมเต็มเกมแรกของเราเลยนะ! ได้ดาบลายกนกจากหีบเมื่อไหร่ อย่าลืมเทียบค่าพลังก่อนกดสวมใส่~",
      "บอสท่าน้ำตีหนักมาก ลองวิชาสวนกลับดูสิ กันจังหวะดี ๆ แล้วสวนคืนได้เลย",
      "พักจากการสู้ไปตกปลาที่ท่าน้ำบ้างก็ได้ ปลาทุกตัวที่จับได้จะถูกจดไว้ในสมุดกรุงศรีเลยนะ!",
    ],
  },
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
    state: "play",
    stage: "Web edition",
    tagline: "เดินทางผ่านโลกแห่งเงาและปริศนาแสง",
    description:
      "เดินทางกับโนวาและลูมิผ่านป่าเรืองแสงและทะเลสาบกระจก แก้ปริศนาด้วยแสงและเงา ปลุกโลกที่หลับใหลให้ตื่นขึ้นอีกครั้ง",
    features: ["6 โซนเงาขาวดำ", "เก็บดาว 7 ดวง", "แมงมุมยักษ์ไล่ล่า", "สายหลักบน Godot 4"],
    note: "เวอร์ชันเว็บเป็นแบบเงาขาวดำ เล่นจบเส้นทาง 6 โซนได้ — สายหลักแบบภาพสีกำลังพัฒนาต่อบน Godot",
    play: "/play/umbra/",
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
    id: "chanthra",
    name: "MAE MO CHANTHRA",
    subtitle: "CHAPTER 1 · AWAKENING",
    genre: "Platformer / Adventure / 2D",
    state: "play",
    stage: "Browser demo",
    tagline: "ตามแม่หมอจันทราฝ่าหมอกในภพใหม่ แพลตฟอร์มเงาแนว LIMBO",
    description:
      "แม่หมอจันทรา · บทที่ ๑ ตื่นในภพใหม่ — เกมแพลตฟอร์มเงาบนเว็บ พาจันทราเด็กสาวผมขาวฝ่าหมอกหนา หลบอสูรในเงามืด และเดินตามแสงตะเกียง",
    features: ["แพลตฟอร์มเงาแนว LIMBO", "ผมขาวขยับตามฟิสิกส์", "หมอก 4 ชั้นพารัลแลกซ์", "ควบคุมลื่นแบบเกมแพลตฟอร์ม"],
    note: "เดโมเว็บเล่นได้ทันที ใช้คีย์บอร์ด (ลูกศร/WASD และ Space)",
    image: "/art/chanthra.webp",
    play: "/play/chanthra/",
    palette: ["#c8b6ff", "#1a1430", "#e9e2ff"],
    planet: 2,
    nova: [
      "แม่หมอจันทรา บทที่ ๑ เงียบ ๆ แต่ขนลุกมาก หมอกหนาจนต้องเดินตามแสงตะเกียงเลยล่ะ",
      "ผมขาวของจันทรามี 14 เส้น ขยับตามฟิสิกส์ทุกเส้นเลยนะ โนวาอิจฉา~",
    ],
  },
  {
    id: "tetrisvs",
    name: "TetrisVS",
    subtitle: "STACK. CLASH. WIN.",
    genre: "Puzzle / Versus / Arcade",
    state: "play",
    stage: "Browser edition",
    tagline: "เรียงบล็อก แข่งกับ AI และวางแผนชนะคู่ต่อสู้",
    description:
      "เกมเรียงบล็อกแข่งขัน เล่น Solo ทำคะแนน ท้าดวลคู่แข่ง AI 4 ระดับ หรือเล่นสองคนบนคีย์บอร์ดเดียวกัน ส่งแถวขยะไปถล่มฝั่งตรงข้ามให้ล้นจอก่อน",
    features: ["Solo", "AI 4 ระดับ", "2 คนเครื่องเดียว", "ออนไลน์ เร็ว ๆ นี้"],
    note: "เวอร์ชันเบราว์เซอร์เล่นด้วยคีย์บอร์ด (ยังไม่รองรับจอสัมผัส) โหมดออนไลน์และตารางอันดับจะตามมา",
    image: "/art/tetrisvs.webp",
    play: "/play/tetrisvs/",
    palette: ["#4fe3ff", "#3a2a8a", "#b6ff4f"],
    planet: 0,
    nova: [
      "TetrisVS ส่งแถวขยะไปถล่มคู่แข่งได้ด้วย! โนวาแพ้ AI ระดับยากไปสามรอบแล้ว…",
      "ลองโหมดสองคนกับเพื่อนบนคีย์บอร์ดเดียวกันสิ สนุกกว่าที่คิดนะ",
    ],
  },
  {
    id: "breaker",
    name: "X-NOVA: BREAKER",
    subtitle: "STEAL THEIR GUNS",
    genre: "Space shooter / 2.5D",
    state: "play",
    stage: "Browser demo",
    tagline: "ยิงชิ้นส่วนศัตรูมาติดยาน แล้วดีดสวนกลับ",
    description:
      "ปืนที่กำลังยิงคุณ อีกสิบวินาทีอาจกลายเป็นปืนของคุณ — ยิงจุดยึดอุปกรณ์ของศัตรูให้หลุด ดูดมาติดยาน 3 ช่อง ใช้งาน แล้วดีดใส่ศัตรูเป็นกระสุนหนัก เกจ BREAKER เต็มเมื่อไหร่ ให้โนวา AI ประจำยานปล่อยท่าไม้ตาย NOVA BREAKER",
    features: ["ชิงอาวุธศัตรู", "3 ช่องติดตั้ง", "ทางแยก 2 เส้นทาง", "บอส ARGUS 3 เฟส"],
    note: "เดโมเว็บเล่นได้ 6–8 นาที มีเช็คพอยต์ คัตซีน และเสียงพากย์ เล่นบนคอมด้วยคีย์บอร์ดหรือจอย (Chrome / Edge)",
    image: "/art/breaker.webp",
    play: "/play/breaker/",
    fund: "/fund/breaker/",
    palette: ["#ff7a3d", "#1b2433", "#49d6ff"],
    planet: 2,
    nova: [
      "BREAKER คือ X-NOVA ที่ขโมยปืนศัตรูมาใช้ได้! ยิงโล่ให้หลุด กดค้างดูดมาติดยาน แล้วดีดใส่แกนบอสเลย",
      "เคล็ดลับ: ยิ่งอุปกรณ์ร้อน ดีดยิ่งแรงนะ ทุบแกนบอส ARGUS ได้เกือบสามเท่า!",
    ],
  },
  {
    id: "snake",
    name: "SNAKE.IO",
    subtitle: "EAT. GROW. SURVIVE.",
    genre: ".io / Arcade / Multiplayer",
    state: "play",
    stage: "Play online",
    tagline: "หนอนออนไลน์สามมิติ กินแล้วโต หลบให้รอด แข่งกับเพื่อนหรือบอท",
    description:
      "เกม .io สามมิติ กินอาหารให้ตัวยาวขึ้น ล่อคู่แข่งให้ชนแล้วกินพลังที่ทิ้งไว้ เล่นออนไลน์กับผู้เล่นจริงหรือโหมดออฟไลน์กับบอท AI มีร้านสกินและพาวเวอร์อัป",
    features: ["3D บนเบราว์เซอร์", "ออนไลน์ + บอท AI", "ร้านสกิน 5 แบบ", "พาวเวอร์อัป 3 แบบ"],
    note: "เล่นบนเว็บ Thai Prompt (เปิดแท็บใหม่) รองรับคอม มือถือ และแท็บเล็ต",
    image: "/art/snake.webp",
    play: "https://main.thaiprompt.online/games/snake-io",
    palette: ["#3ff6c8", "#0b2a3a", "#ff4fd8"],
    planet: 0,
    nova: [
      "SNAKE.IO! กินให้ยาว แล้วล่อให้คู่แข่งชนหัวเรา เขาจะระเบิดเป็นอาหารให้เรากินต่อ ฮ่า ๆ",
    ],
  },
  {
    id: "8ball",
    name: "8 BALL POOL",
    subtitle: "BREAK. AIM. SINK.",
    genre: "Sports / Billiards / 2D",
    state: "play",
    stage: "Browser demo",
    tagline: "แทงพูล 8 ลูกกับ AI หรือชวนเพื่อนแข่งบนเครื่องเดียว",
    description:
      "พูล 8 ลูกบนเว็บ เล็งด้วยเส้นช่วยและลูกเงา ชาร์จแรงแล้วแทง เล่นตามกติกา 8 ลูกพร้อมฟาวล์ แข่งกับ AI หรือเพื่อนบนเครื่องเดียวกัน",
    features: ["แข่งกับ AI", "2 คนเครื่องเดียว", "เส้นช่วยเล็งและลูกเงา", "กติกา 8 ลูกพร้อมฟาวล์"],
    note: "เล่นได้ทันทีบนเว็บ แต้มเดิมพันเป็นแต้มจำลองเริ่ม 10,000 ทุกครั้งที่เปิดเกม บนมือถือแนะนำให้เล่นแนวนอน",
    image: "/art/8ball.webp",
    play: "/play/8ball/",
    palette: ["#00e5ff", "#126630", "#ffd700"],
    planet: 1,
    nova: [
      "8 BALL POOL! แทงลูกบอลแข็งหรือลูกลายให้หมดก่อน แล้วค่อยปิดเกมด้วยลูก 8 นะ ห้ามลงก่อนเด็ดขาด!",
    ],
  },
  {
    id: "snooker",
    name: "SNOOKER 2D",
    subtitle: "POT. SCORE. CLEAR.",
    genre: "Sports / Snooker / 2D",
    state: "play",
    stage: "Browser demo",
    tagline: "สนุ๊กเกอร์และ 9-Ball แบบ 2 มิติ เล็ง ชาร์จแรง แล้วแทงลงหลุม",
    description:
      "โต๊ะสนุ๊กเกอร์บนเว็บ เลือกเล่นสนุ๊กเกอร์หรือ 9-Ball กดค้างเพื่อชาร์จแรงตี แข่งกับ AI หรือสลับกันเล่นสองคน",
    features: ["สนุ๊กเกอร์และ 9-Ball", "เล่นกับ AI", "2 ผู้เล่นสลับกัน", "กดค้างชาร์จแรงตี"],
    note: "เล่นได้ทันทีบนเว็บ เหมาะกับคอมพิวเตอร์และเมาส์ บนมือถือโต๊ะจะเล็กมาก",
    image: "/art/snooker.webp",
    play: "/play/snooker/",
    palette: ["#ffd700", "#1a5f2e", "#dc143c"],
    planet: 1,
    nova: [
      "SNOOKER 2D มีทั้งสนุ๊กเกอร์และ 9-Ball นะ กดค้างให้แรงพอดี ๆ อย่าแรงจนลูกขาวลงหลุมตามล่ะ~",
    ],
  },
  {
    id: "tetris",
    name: "TETRIS CLASSIC",
    subtitle: "DROP. CLEAR. SURVIVE.",
    genre: "Puzzle / Falling blocks",
    state: "play",
    stage: "Browser demo",
    tagline: "เรียงบล็อก ทำคอมโบ และเอาตัวรอดจากแถวขยะที่ดันขึ้นมา",
    description:
      "เกมเรียงบล็อกแบบคลาสสิก มีช่องเก็บชิ้น (Hold) คอมโบโบนัส แถวขยะที่ดันขึ้นมาตามระดับความยาก และตารางคะแนน 10 อันดับในเครื่อง",
    features: ["เก็บชิ้น (Hold)", "คอมโบโบนัส", "แถวขยะตามระดับ", "ตาราง 10 อันดับในเครื่อง"],
    note: "เล่นได้ทันทีบนเว็บด้วยคีย์บอร์ด บล็อกเริ่มตกทันทีที่เปิดหน้า ยังไม่มีปุ่มสัมผัสสำหรับมือถือ",
    image: "/art/tetris.webp",
    play: "/play/tetris/",
    palette: ["#a855f7", "#1e1b4b", "#00f0f0"],
    planet: 0,
    nova: [
      "TETRIS CLASSIC ระวังแถวขยะที่ดันขึ้นมาจากข้างล่างให้ดี เก็บชิ้นยาวไว้ใน Hold แล้วรอเคลียร์ทีละสี่แถวเลย!",
    ],
  },
  {
    id: "space-shooter",
    name: "SPACE SHOOTER",
    subtitle: "LOCK. FIRE. HOLD THE LINE.",
    genre: "Arcade / Space shooter / 2D",
    state: "play",
    stage: "Browser demo",
    tagline: "ขับยานยิงฝูงศัตรูให้ร่วงก่อนจะหลุดผ่านแนวป้องกัน",
    description:
      "เกมยิงยานแนวตั้งแบบคลาสสิก บังคับยานหลบและยิงฝูงศัตรูที่มาถี่ขึ้นเรื่อย ๆ บนฉากดาวเลื่อน เล่นใหม่ได้ทันที",
    features: ["ยิงด้วย Space หรือคลิก", "ศัตรูมาถี่ขึ้นเรื่อย ๆ", "ฉากดาวเลื่อน", "เล่นใหม่ได้ทันที"],
    note: "เล่นได้ทันทีบนเว็บด้วยคีย์บอร์ดหรือเมาส์ ยังบังคับยานบนมือถือไม่ได้",
    image: "/art/space-shooter.webp",
    play: "/play/space-shooter/",
    palette: ["#667eea", "#000033", "#ffff00"],
    planet: 0,
    nova: [
      "SPACE SHOOTER เป็นรุ่นพี่ของ X-NOVA เลยนะ เกมยิงยานเกมแรก ๆ ของทีม สั้น ๆ ง่าย ๆ แต่ติดมือ!",
    ],
  },
  {
    id: "rollabrain",
    name: "ROLLABRAIN",
    subtitle: "ROLL. COLLECT. BEAT THE CLOCK.",
    genre: "Arcade / Physics / 3D",
    state: "dev",
    stage: "Unity prototype",
    tagline: "กลิ้งลูกบอลเก็บคิวบ์เรืองแสงให้ครบในสนามปิด",
    description:
      "เกมลูกบอลกลิ้งบน Unity สนาม 30×30 มีกำแพงล้อม บังคับลูกบอลฟิสิกส์เก็บคิวบ์หมุน 8 ชิ้น กล้องตามตัว พร้อมคะแนนและตัวจับเวลา — เกม Unity เกมแรกที่ทีมสร้างผ่านระบบอัตโนมัติทั้งหมด",
    features: ["Unity 6", "ฟิสิกส์ลูกบอล", "เก็บคิวบ์ 8 ชิ้น", "บิลด์ Windows"],
    note: "ต้นแบบบน Windows ยังไม่มีเวอร์ชันเว็บ",
    image: "/art/rollabrain.webp",
    palette: ["#8b7bff", "#14163a", "#c0ff4b"],
    planet: 0,
    platform: "native",
    nova: [
      "ROLLABRAIN เกม Unity เกมแรกของทีม! กลิ้งลูกบอลเก็บคิวบ์ให้ครบ 8 ชิ้น ตอนนี้ยังเป็นบิลด์ Windows อยู่นะ",
    ],
  },
  {
    id: "maze",
    name: "MAZE CHASE",
    subtitle: "EAT. DODGE. TURN THE TABLES.",
    genre: "Arcade / Maze / Retro",
    state: "dev",
    stage: "Retro prototype",
    tagline: "เก็บจุดให้ครบ หลบผี และกินพลังเพื่อสวนกลับ",
    description:
      "เกมเขาวงกตแนวอาร์เคดคลาสสิกบนเบราว์เซอร์ UI ภาษาไทย เก็บจุดทั่วแผนที่ หลบผีที่ไล่ล่า และกินเม็ดพลังเพื่อไล่กลับ — ชื่อในฮับเป็นชื่อชั่วคราว",
    features: ["เขาวงกตคลาสสิก", "ผีไล่ล่า", "เม็ดพลังสวนกลับ", "คุมด้วยลูกศร / WASD"],
    note: "ต้นแบบเล่นได้ในเครื่องทีม กำลังปรับตัวละคร ชื่อ และเขาวงกตให้เป็นของ XMAN เองก่อนเปิดให้เล่น",
    image: "/art/maze.webp",
    palette: ["#ffd84a", "#0a1a5a", "#2b6bff"],
    planet: 0,
    nova: [
      "MAZE CHASE เกมเขาวงกตย้อนยุค! กินเม็ดพลังแล้วผีจะกลัวเรา ตอนนั้นแหละไล่กลับได้เลย",
    ],
  },
  {
    id: "rublicx",
    name: "RUBLICX",
    subtitle: "MASTER THE CUBE",
    genre: "Puzzle / Cube trainer / 3D",
    state: "dev",
    stage: "Web app in development",
    tagline: "ฝึกแก้ลูกบาศก์ 2×2 และ 3×3 สแกนด้วยกล้อง แล้วให้ระบบหาวิธีแก้",
    description:
      "เว็บแอปสอนแก้ลูกบาศก์ เรนเดอร์ 3 มิติหมุนได้ สแกนสีจากกล้อง หาวิธีแก้ 3×3 ได้ไม่เกิน 22 ท่า มีบทเรียน CFOP จับเวลาแข่งกับตัวเอง และระบบเลเวลกับความสำเร็จ ภาษาไทยและอังกฤษ",
    features: ["ลูกบาศก์ 3D", "สแกนด้วยกล้อง", "แก้ 3×3 ใน ≤22 ท่า", "จับเวลา + ความสำเร็จ"],
    note: "ใช้งานได้แล้วสำหรับ 2×2 และ 3×3 ส่วน 4×4 / 5×5 และคลังสูตรเต็มกำลังพัฒนา ยังไม่ได้ย้ายมาเปิดในฮับ",
    image: "/art/rublicx.webp",
    palette: ["#ffd500", "#0b1030", "#3b6bff"],
    planet: 1,
    nova: [
      "RUBLICX สอนแก้ลูกบาศก์ได้จริงนะ สแกนด้วยกล้อง แล้วมันจะบอกท่าให้ทีละขั้น โนวายังจำสูตรไม่หมดเลย…",
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
    state: "dev",
    stage: "Godot prototype",
    tagline: "ทอยเต๋า เลือกเส้นทาง สร้างอาณาจักรร้านค้า",
    description:
      "เศรษฐีเกาะป่วน ทอยเต๋าสองลูกแล้วเลือกเดินหนึ่งลูก ซื้อร้าน อัปเกรดย่าน และพลิกเกมด้วยสกิลเฉพาะตัวละคร เล่นกับเพื่อน 2–4 คน",
    features: ["2–4 ผู้เล่น", "24 ช่อง", "4 ตัวละครเริ่มต้น", "แผนที่จังหวัดไทย"],
    note: "ต้นแบบบน Godot เล่นได้ในเครื่องทีม (แผนที่ไทย 24 ช่อง 4 ผู้เล่น อัปเกรด 3 ระดับ) ภาพบนการ์ดมาจากต้นแบบจริง",
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
  {
    id: "theone-sunkalp",
    name: "THE ONE · สูญกัป",
    subtitle: "DARK XIANXIA ARPG",
    genre: "Action RPG / Xianxia / Isometric",
    state: "concept",
    stage: "Concept · UI mockup",
    tagline: "ARPG แฟนตาซีจีนโทนมืดในยุคสูญกัป มุมมองไอโซเมตริก",
    description:
      "แนวคิดภาคแยกของ THE ONE: ARPG แฟนตาซีจีนโทนมืดในยุคสูญกัป มุมมองไอโซเมตริก ผสมดาบ เวท ปืน ธนู และการรักษา พร้อมกลุ่มดาวทักษะ 97 ดวง — ตอนนี้เป็นแบบ UI ที่กดลองได้",
    features: ["มุมมองไอโซเมตริก", "กลุ่มดาวทักษะ 97 ดวง", "5 สายการต่อสู้", "โทนไซอานเซียมืด"],
    note: "เป็นคอนเซปต์และแบบ UI แยกจาก THE ONE เวอร์ชันโนวาที่เล่นได้",
    image: "/art/theone-sunkalp.webp",
    palette: ["#d4a24a", "#1a1410", "#c23b2b"],
    planet: 2,
    nova: [
      "THE ONE · สูญกัป โลกเดียวกันแต่มืดกว่ามาก กลุ่มดาวทักษะ 97 ดวงนี่โนวาดูแล้วตาลายเลย",
    ],
  },
  {
    id: "xenon",
    name: "XENON",
    subtitle: "LIGHT GUNSHIP",
    genre: "Space shooter / 3D model study",
    state: "concept",
    stage: "3D model study",
    tagline: "ยานยิงเบาแบบ 3 มิติ หมุนดูได้รอบทิศ",
    description:
      "งานออกแบบยานยิงเบา (Light Gunship) เป็นโมเดล 3 มิติ หมุน ซูม และเลื่อนดูได้รอบทิศ ส่งออกเป็นไฟล์โมเดลได้ ยังไม่มีตัวเกม",
    features: ["โมเดล 3D หมุนดูได้", "ส่งออก GLB / OBJ", "ยานยิงเบา", "ยังไม่มีเกมเพลย์"],
    note: "เป็นงานออกแบบยานและสเตจ 3 มิติ ยังไม่ได้เริ่มสร้างตัวเกม",
    image: "/art/xenon.webp",
    palette: ["#ff8a3d", "#20242e", "#e8e4da"],
    planet: 2,
    nova: [
      "XENON ยานยิงเบาลำนี้ยังไม่มีเกมนะ แต่ดีไซน์เท่มาก ปีกสีส้มนั่นโนวาชอบ!",
    ],
  },
  {
    id: "siam-speed",
    name: "SIAM SPEED",
    subtitle: "CAR DRIVING THAILAND",
    genre: "Driving / Car tuning / Open world",
    state: "dev",
    stage: "Roblox prototype",
    tagline: "ขับเที่ยวเมืองไทย แต่งรถ แล้วไปอวดเพื่อนที่ลานนัดริมทะเล",
    description:
      "เกมขับรถโลกเปิดบน Roblox ในเมืองชายทะเลและถนนตึกแถวแบบไทย รับงานส่งของหรือขับตุ๊กตุ๊กหาเงิน ซื้อรถ แต่งสี ล้อ และไฟใต้ท้อง แล้วนัดเพื่อนมาโชว์รถที่ลานริมทะเล ออกแบบให้เล่นได้ทั้งคอม มือถือ และแท็บเล็ตผ่านแอป Roblox",
    features: ["ขับรถโลกเปิด", "แต่งสี ล้อ ไฟใต้ท้อง", "กระบะซิ่ง ตุ๊กตุ๊ก สองแถว", "ลานนัดโชว์รถ"],
    note: "ต้นแบบขับได้แล้วใน Roblox Studio มีกระบะซิ่ง แผนที่เมืองชายทะเล เพลง และเสียงโนวา ยังไม่เปิดให้เล่นทั่วไป ภาพบนการ์ดเป็นคอนเซปต์",
    image: "/art/siam-speed.webp",
    palette: ["#ff8a3d", "#1d2a5e", "#38e2ff"],
    planet: 1,
    nova: [
      "SIAM SPEED โนวาขอนั่งท้ายกระบะซิ่งไปลานนัดริมทะเลด้วยนะ ไฟใต้ท้องสีฟ้าสวยสุด ๆ!",
    ],
    platform: "roblox",
  },
  {
    id: "astral-pact",
    name: "ASTRAL PACT",
    subtitle: "CARDS OF THE PACT",
    genre: "Card battler / Turn-based / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "เรียงไพ่ธาตุ ปิดคอมโบ อัญเชิญสัตว์เทพ",
    description:
      "เกมไพ่เทิร์นเบสแบบจัดเด็ค ดูท่าที่ศัตรูเตรียมไว้ แล้วเรียงไพ่ธาตุได้สูงสุด 3 ใบ เรียงถูกลำดับเมื่อไหร่ สัตว์เทพจะออกมาปิดคอมโบ สะสมตราพันธสัญญาครบ 3 ตราเพื่อปล่อยท่าอัญเชิญใหญ่",
    features: ["คอมโบเรียง 3 ใบ", "Break & Stagger", "Oath & Invoke", "สัตว์เทพ 2 ตนในแผน"],
    note: "ชื่อ ตัวเลข และขอบเขตยังเป็นข้อเสนอ ยังไม่ได้เริ่มสร้างตัวเกม ภาพเป็นคอนเซปต์ UI ไม่ใช่ภาพจากเกมจริง",
    image: "/art/astral-pact.webp",
    palette: ["#e8b65a", "#141c34", "#4294c2"],
    planet: 2,
    nova: [
      "ASTRAL PACT เรียงไฟ ไฟ สายฟ้าปุ๊บ สิงห์ปีกทองออกมาปิดคอมโบให้เลย โนวาขอลูบแผงคอหน่อยนะ~",
    ],
  },
  {
    id: "type-nova",
    name: "TYPE//NOVA",
    subtitle: "TYPE TO FIRE",
    genre: "Typing / Arcade shooter / 2.5D",
    state: "concept",
    stage: "Concept · UI mockup",
    tagline: "พิมพ์คำบนยานศัตรูเพื่อยิง ฝึกไทยและอังกฤษ",
    description:
      "พิมพ์คำบนยานศัตรูให้ครบเพื่อยิงทำลาย ต่อคอมโบจนเกจเต็มแล้วเลเซอร์ NOVA จะยิงออกเอง เลือกฝึกภาษาไทยหรืออังกฤษ เล่นคนเดียว แข่งกับบอท หรือดวลกับเพื่อนรอบละ 3 นาที",
    features: ["พิมพ์ไทย / อังกฤษ", "บอท 3 ระดับ", "ดวลเพื่อน 1v1", "คอมโบเลเซอร์ NOVA"],
    note: "ชื่อชั่วคราวและแผนพัฒนา ยังไม่ได้เริ่มสร้างเกม แผนแรกเล่นบนเบราว์เซอร์ด้วยคีย์บอร์ด ภาพเป็นคอนเซปต์ ไม่ใช่ภาพจากเกมจริง",
    image: "/art/type-nova.webp",
    palette: ["#22e8f8", "#0b1227", "#a060e0"],
    planet: 2,
    nova: ["TYPE//NOVA พิมพ์ถูกต่อกันหลายคำ เกจเต็มแล้วเลเซอร์ยิงเองเลย ไม่ต้องกดปุ่มเพิ่ม~"],
  },
  {
    id: "soi-riot",
    name: "SOI RIOT",
    subtitle: "STREET SPORTS BRAWL",
    genre: "Arcade sports / Versus / 2.5D",
    state: "concept",
    stage: "Concept · UI mockup",
    tagline: "หลบ รับ ส่ง ปาอัดหน้า จนอีกทีมตาปลิ้น",
    description:
      "ดอดจ์บอลทีมละ 2 คนกลางซอย หลบ ตั้งรับ ส่งให้เพื่อน แล้วชาร์จปาจนอีกทีมหมดหัวใจ ชนะ 3 ใน 5 ยก ตัวละครหัวโตโดนบอลแล้วตาปลิ้นหน้ายู่",
    features: ["2v2 Dodgeball", "Hype · Super Throw", "โดนบอลแล้วตาปลิ้น", "2 คนเครื่องเดียว"],
    note: "ชื่อชั่วคราวและแผนพัฒนา ยังไม่ได้เริ่มสร้างเกม ภาพเป็นคอนเซปต์ ไม่ใช่ภาพจากเกมจริง ฟุตบอลและกีฬาอื่นอยู่ในแผนหลังเดโม",
    image: "/art/soi-riot.webp",
    palette: ["#fb621c", "#145759", "#48dedd"],
    planet: 1,
    nova: ["SOI RIOT รับบอลได้แล้วปาสวนทันที โนวาชอบตอนอีกฝั่งตาปลิ้นที่สุดเลย ฮ่า ๆ"],
  },
  {
    id: "paradox-pinball",
    name: "PARADOX PINBALL",
    subtitle: "MIDNIGHT MARKET",
    genre: "Pinball / Roguelite / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "ยิงพินบอล หลอมของ สลับมิติ สู้มังกรทวงหนี้",
    description:
      "รับบทช่างซ่อมเครื่องรางที่ติดหนี้ตลาดข้ามมิติ ยิงพินบอลทำสัญญาทีละงาน เลือกเครื่องรางจากเตาหลอมมาต่อคอมโบ และสลับเข้ามิติวิญญาณเพื่อเปิดจุดอ่อนของมังกรทวงหนี้ ตั้งเป้ารอบละ 10–15 นาที",
    features: ["5 สัญญา จบที่บอส", "Phase shift", "Relic combos", "6 เครื่องรางในแผนเดโม"],
    note: "ชื่อชั่วคราวและแผนพัฒนา ยังไม่ได้เริ่มสร้างเกม ภาพเป็นคอนเซปต์ ไม่ใช่ภาพจากเกมจริง",
    image: "/art/paradox-pinball.webp",
    palette: ["#41e0ef", "#0d1b37", "#f2b65e"],
    planet: 2,
    nova: ["PARADOX PINBALL เกจเต็มเมื่อไหร่กด Space ข้ามไปมิติวิญญาณ จุดอ่อนมังกรโผล่ให้ยิงเลย!"],
  },
  {
    id: "lotus-ascension",
    name: "LOTUS ASCENSION",
    subtitle: "THAI CULTIVATION ARPG",
    genre: "Action RPG / Sect management / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "สร้างสำนักเซียน ผูกพันธสัญญา ออกศึกวิชาประสาน",
    description:
      "รับบทเจ้าสำนักในโลกเซียนแบบไทย ออกศึกกับคู่พันธสัญญาสองคน ติดตราธาตุแล้วปล่อยวิชาประสานใส่บอส จากนั้นกลับสำนักไปฝึกศิษย์และอัปเกรดอาคาร ยิ่งผูกพันธสัญญามาก พลังโจมตียิ่งเพิ่ม",
    features: ["คู่ร่วมศึก 2 จาก 3", "วิชาประสาน 3 คู่", "สำนัก 5 อาคาร", "3 ภารกิจในแผนเดโม"],
    note: "แผนพัฒนาเกม PC ยังไม่ได้เริ่มสร้างตัวเกม ชื่อและตัวเลขเป็นข้อเสนอ ภาพเป็นคอนเซปต์ ไม่ใช่ภาพจากเกมจริง",
    image: "/art/lotus-ascension.webp",
    palette: ["#3fd6cf", "#1a1b33", "#f29ad6"],
    planet: 1,
    nova: ["LOTUS ASCENSION ติดตราธาตุให้ครบสองแบบก่อนนะ แล้วกด R ปล่อยนาคบุปผา โนวาชอบท่านี้สุด!"],
  },
  {
    id: "hive-breach",
    name: "HIVE // BREACH: COREWAR",
    subtitle: "GUARD THE STAR CORE",
    genre: "Action × RTS / Asymmetric PvP / 2.5D",
    state: "concept",
    stage: "Main project · Concept",
    tagline: "ผู้พิทักษ์ 4 คนปกป้องแกนดาว ปะทะคอมมานเดอร์เอเลี่ยนที่บุกแบบ RTS",
    description:
      "HIVE//BREACH ยกระดับเป็น COREWAR โปรเจกต์หลักของ XMAN Studio: สงครามสองฝั่งในสนามเดียว ฝ่ายผู้พิทักษ์มนุษย์และแอนดรอยด์รวมปาร์ตี้ 4 คน สำรวจแมพสุ่มใต้หมอกสงคราม เก็บ EXP และป้องกัน Star Core ส่วนคอมมานเดอร์เอเลี่ยนเลือกเผ่า MYRAX หรือ AETHERION แล้วบัญชาการแบบ RTS สร้างฐาน ผลิตกองทัพ วิจัย และบุกแกนพลังงาน แมตช์ละประมาณ 15 นาที พร้อม PvE เนื้อเรื่องทั้งสองฝั่ง",
    features: ["4 ผู้พิทักษ์ vs 1 คอมมานเดอร์", "ฮีโร่ 8 คน · เอเลี่ยน 2 เผ่า", "แมพสุ่ม + Fog of War", "PvE เนื้อเรื่องสองฝั่ง"],
    note: "โปรเจกต์หลักที่เปิดรับการสนับสนุน มีสเปกระบบ ภาพคอนเซปต์ และ MV เพลงธีมแล้ว แต่ยังไม่มีตัวเกมที่เล่นได้ ภาพทั้งหมดเป็นคอนเซปต์ ไม่ใช่ภาพจากเกมจริง",
    image: "/art/hive-corewar.webp",
    fund: "/fund/hive-breach/",
    palette: ["#ff4fa8", "#140f2a", "#4fe3ff"],
    planet: 2,
    nova: [
      "HIVE // BREACH: COREWAR คือโปรเจกต์หลักของเราเลย! ฝั่งหนึ่งเป็นปาร์ตี้ผู้พิทักษ์ อีกฝั่งเป็นคอมมานเดอร์เอเลี่ยนแบบ RTS แวะไปดูหน้าโปรเจกต์แล้วช่วยกันสนับสนุนนะ~",
      "ใน COREWAR โนวาชอบลีราที่สุด ปืนพก วิ่งไว แถมฮีลตัวเองได้! แต่ถ้าเล่นฝั่งเอเลี่ยน โนวาขอเลือก NYXARA ราชินีผลึก~",
    ],
  },
  {
    id: "skyshard",
    name: "SKYSHARD",
    subtitle: "RUNE TANK ARTILLERY",
    genre: "Artillery / Turn-based / 2.5D",
    state: "concept",
    stage: "Design in progress",
    tagline: "ศึกรถรบรูนผลัดตายิง อ่านลม ปรับมุมและแรง",
    description:
      "ขับรถรบรูนทรงสัตว์บนเกาะลอยฟ้า ผลัดกันเดินหาตำแหน่ง อ่านลม เลือกกระสุน แล้วปรับมุมและแรงยิงกระสุนวิถีโค้งใส่อีกฝ่าย หรือส่งให้ตกขอบสนาม แรงระเบิดขุดพื้นเป็นหลุมจนที่กำบังเปลี่ยนไปเรื่อย ๆ",
    features: ["มุม · แรง · ลม", "พื้นทำลายได้", "6 อาวุธในแผนเดโม", "AI / 2 คนเครื่องเดียว"],
    note: "ชื่อและตัวเลขยังเป็นค่าทดลองในแผน ยังไม่ได้เริ่มสร้างตัวเกม ภาพเป็นคอนเซปต์ UI ไม่ใช่ภาพจากเกมจริง",
    image: "/art/skyshard.webp",
    palette: ["#39c9fc", "#0f2639", "#a36bfa"],
    planet: 1,
    nova: ["SKYSHARD ยิง Vortex ดึงอีกฝ่ายลงหลุม เทิร์นหน้าตามด้วย Cluster โนวาว่าแผนนี้เด็ดสุด!"],
  },
];

export const featured: Featured[] = [
  {
    id: "krungsri",
    thumb: "/art/thumb-krungsri.webp",
    hook: "เกมเต็มเกมแรกของ XMAN",
    pitch: ["เปิดหีบมหาลาภ จัดวิชาดาบ แล้วล้มบอสทุกท่าน้ำของกรุงศรี", "เล่นแบบ guest ได้ทันที แล้วผูก XMAN ID เมื่อพร้อม"],
    sector: "SECTOR / 15",
    sectorName: "AYUTTHAYA PIER",
    tags: ["Full game", "Idle RPG", "Early access"],
  },
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
    id: "breaker",
    thumb: "/art/thumb-breaker.webp",
    hook: "ชิงปืนศัตรูมาเป็นของเรา",
    pitch: ["ยิงอุปกรณ์ศัตรูให้หลุด ดูดมาติดยาน แล้วดีดกลับใส่บอส", "ปืนที่กำลังยิงคุณ อีกสิบวินาทีอาจเป็นของคุณ"],
    sector: "SECTOR / 09",
    sectorName: "ORBITAL GRAVEYARD",
    tags: ["Space shooter", "2.5D", "Web demo"],
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
  full: games.filter((g) => g.edition === "full").length,
  roblox: games.filter((g) => g.platform === "roblox").length,
  play: games.filter((g) => g.state === "play").length,
  dev: games.filter((g) => g.state !== "concept").length,
  concept: games.filter((g) => g.state === "concept").length,
};

export type Filter = "all" | "full" | "play" | "dev" | "concept" | "roblox";

export function matches(g: Game, filter: Filter, query: string) {
  if (filter === "full" && g.edition !== "full") return false;
  if (filter === "roblox" && g.platform !== "roblox") return false;
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
