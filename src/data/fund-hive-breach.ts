/**
 * Page copy for /fund/hive-breach/ — HIVE // BREACH: COREWAR.
 *
 * Every fact here comes from the COREWAR design documents (V2–V7, the LYRA and
 * VELVET sheets and the MV summary). Numbers in those documents are starting
 * values for playtests, so the page says so wherever it quotes one. All
 * images are concept art and MV stills, not captures of a running game.
 */

export type FundImage = { src: string; alt: string; caption?: string };

export type FundCharacter = {
  name: string;
  side: string;
  role: string;
  image: string;
  text: string;
  /** Skill lines in the hero's own kit, or the race's command style. */
  lines?: string[];
  /** Advanced career paths. */
  paths?: string;
};

export type FundPage = {
  title: string;
  kicker: string;
  tagline: string;
  lede: string;
  facts: string[];
  /** Still behind the hero, also the video's poster. */
  hero: string;
  /** Looping reveal footage over the hero still; the first source whose media query matches plays. */
  video?: { label: string; sources: { src: string; media?: string }[] };
  logo: string;
  og: string;
  status: string;
  /** Stills from the theme-song MV, shown as a full-width film strip. */
  cinematic: { title: string; text: string; shots: FundImage[] };
  concept: { title: string; paragraphs: string[]; pillars: { title: string; text: string }[]; image: FundImage };
  story: {
    title: string;
    paragraphs: string[];
    quote: { th: string; en: string; source: string };
    image: FundImage;
    campaigns: { name: string; side: string; text: string; steps: { name: string; text: string }[] }[];
  };
  gameplay: {
    title: string;
    sides: { name: string; mode: string; image: FundImage; points: string[] }[];
    flow: { phase: string; text: string }[];
    win: { side: string; text: string }[];
    systems: { title: string; text: string; image: FundImage }[];
  };
  world: {
    title: string;
    intro: string;
    maps: { name: string; text: string; image: FundImage }[];
    origins: { name: string; text: string }[];
    originsImage: FundImage;
    factions: {
      name: string;
      kind: string;
      text: string;
      economy: string;
      units: string[];
      buildings: string[];
      commanders: string;
      image: FundImage;
    }[];
  };
  characters: { title: string; guardians: FundCharacter[]; commanders: FundCharacter[]; note: string };
  sales: { title: string; intro: string; points: { title: string; text: string }[]; image: FundImage; note: string };
  roadmap: {
    title: string;
    intro: string;
    phases: { when: string; title: string; state: "done" | "next" | "planned"; items: string[] }[];
  };
  budget: {
    title: string;
    intro: string;
    free: { name: string; use: string }[];
    spend: { title: string; text: string }[];
    note: string;
  };
  faq: { q: string; a: string }[];
  /** Closing card beside the FAQ. */
  closing: { title: string; text: string };
};

export const hiveBreachPage: FundPage = {
  title: "HIVE // BREACH: COREWAR",
  kicker: "เปิดตัวโปรเจกต์หลัก · ร่วมสนับสนุน",
  tagline: "ปกป้องแกนดาวไปด้วยกัน หรือบัญชาการกองทัพบุกยึดมัน",
  lede:
    "สงครามสองฝั่งในสนามเดียว ฝั่งหนึ่งคือปาร์ตี้ผู้พิทักษ์มนุษย์และแอนดรอยด์ที่บุกฝ่าหมอกสงครามในมุมแอ็กชัน 2.5D อีกฝั่งคือคอมมานเดอร์เอเลี่ยนที่มองสนามจากมุม RTS สร้างฐาน ผลิตกองทัพ และวางแผนทำลาย Star Core แกนพลังงานของดวงดาว",
  facts: ["4 ผู้พิทักษ์ ปะทะ 1 คอมมานเดอร์", "แมตช์ละประมาณ 15 นาที", "แมพสุ่มใหม่ทุกแมตช์", "PvE เนื้อเรื่องทั้งสองฝั่ง"],
  hero: "/art/corewar-reveal-poster.webp",
  video: {
    label: "ภาพเคลื่อนไหวคอนเซปต์: กองเรือเอเลี่ยนปิดล้อมดาว ขณะที่ลำแสงจาก Star Core พุ่งขึ้นจากพื้นดาว",
    sources: [
      { src: "/video/corewar-reveal-720.mp4", media: "(max-width: 900px)" },
      { src: "/video/corewar-reveal-1080.mp4" },
    ],
  },
  logo: "/art/corewar-logo.webp",
  og: "/art/og-hive-corewar.jpg",
  status:
    "ตอนนี้มีสเปกระบบ ภาพคอนเซปต์ และ MV เพลงธีมครบแล้ว แต่ยังไม่มีตัวเกมที่เล่นได้ ขั้นต่อไปคือต้นแบบ graybox สองฝั่ง และเงินสนับสนุนจะพาเราไปถึงเดโมแรก",

  cinematic: {
    title: "Guard the Star Core",
    text: "ภาพจาก MV เพลงธีมของเกม ยาว 3:37 ตัดต่อ 56 คัตพร้อมซับไทย ใช้เป็นภาพเป้าหมายของงานศิลป์",
    shots: [
      { src: "/art/corewar-mv-lyra-awakens.webp", alt: "LYRA ตื่นขึ้นในฐานพร้อมปืนพกพลังงาน", caption: "LYRA ตื่นขึ้นรับศึก" },
      { src: "/art/corewar-mv-khael.webp", alt: "KHAEL สั่งฝูง MYRAX บุกจากระเบียงชีวภาพ", caption: "KHAEL สั่งฝูง MYRAX" },
      { src: "/art/corewar-mv-velvet-slam.webp", alt: "VELVET ทุบค้อน Requiem Slam ใส่ฝูงเอเลี่ยน", caption: "VELVET · Requiem Slam" },
      { src: "/art/corewar-mv-nyxara.webp", alt: "NYXARA สั่งเปิดม่านพลังระหว่างเสา Nexus", caption: "NYXARA บัญชาการ AETHERION" },
      { src: "/art/corewar-mv-lyra-heal.webp", alt: "LYRA เคลื่อนที่เร็วกลางสนามรบพร้อมฮีลตัวเอง", caption: "LYRA · เร็วและฟื้นตัวเอง" },
      { src: "/art/corewar-mv-final.webp", alt: "LYRA และ VELVET ยืนเคียงกันหน้าแกนพลังงานยามอาทิตย์ขึ้น", caption: "ผู้พิทักษ์แห่งแกนดาว" },
    ],
  },

  concept: {
    title: "สองฝั่ง สองมุมกล้อง ในโลกใบเดียว",
    paragraphs: [
      "HIVE // BREACH: COREWAR เป็นเกมไซไฟแบบ asymmetric ที่รวมเกมแอ็กชันยิงฝูงเอเลี่ยนกับเกมวางแผน RTS ไว้ในแมตช์เดียว ทั้งสองฝ่ายเล่นบนแผนที่ ฟิสิกส์ และเวลาเดียวกัน ต่างกันแค่มุมกล้องกับข้อมูลที่แต่ละฝ่ายมองเห็น",
      "ผู้พิทักษ์ต้องร่วมมือกันจริง ใครยืนคุมแนว ใครออกไปยึดเสบียงหรือบุกตัดเศรษฐกิจเอเลี่ยน ส่วนคอมมานเดอร์ต้องคุมทรัพยากร เลือกจังหวะ และเปลี่ยนแนวบุกให้ทันเกม บัญชีเดียวเลือกเล่นฝั่งไหนก็ได้ทุกครั้ง",
    ],
    pillars: [
      {
        title: "สนามเดียว สองมุมมอง",
        text: "ฮีโร่เห็นสนามใกล้ ๆ แบบแอ็กชัน คอมมานเดอร์ซูมออกเห็นภาพรวมแบบ RTS เป็นโลกเดียวกัน ไม่ได้แยกเป็นสองเกม",
      },
      {
        title: "ทุกแมตช์คือสนามใหม่",
        text: "แผนที่สุ่มสร้างจริงทั้งเส้นทาง ทางแยก จุดทรัพยากร และเป้าหมาย คลุมด้วย Fog of War จำผังล่วงหน้าไม่ได้ ต้องออกสำรวจเอง",
      },
      {
        title: "ทีมเวิร์กคือหัวใจ",
        text: "4 หน้าที่ โจมตี แท้งค์ ซัพพอร์ต ฮีลเลอร์ ล้มแล้วเพื่อนชุบได้ ส่ง ping บอกเป้าหมาย และแชร์การมองเห็นทั้งทีม",
      },
      {
        title: "แฟร์ ไม่ขายพลัง",
        text: "สกินเปลี่ยนแค่รูปลักษณ์ โหมดแข่งขันใช้ค่าพลังมาตรฐานและงบคริสตัลเท่ากันทุกคน ฝีมือกับการวางแผนเป็นตัวตัดสิน",
      },
    ],
    image: {
      src: "/art/corewar-last-stand.webp",
      alt: "LYRA SERAPH-09 NOVA-7 และ VELVET ยืนหยัดสู้ฝูงเอเลี่ยนหน้าแกนพลังงาน",
      caption: "ด่านสุดท้ายหน้าแกนพลังงาน — ภาพจาก MV",
    },
  },

  story: {
    title: "สงครามรอบแกนพลังแห่งดวงดาว",
    paragraphs: [
      "ในโลกของ COREWAR แกนพลังงานของดาว — Star Core — คือศูนย์กลางของสงคราม เมื่อสัญญาณเตือนสีแดงฉีกท้องฟ้า มนุษย์และแอนดรอยด์ต้องยืนเคียงกันเป็นโล่ด่านสุดท้าย ต้านคลื่นเอเลี่ยนที่ถาโถมผ่านรอยแยกเข้ามา",
      "แต่สงครามนี้ไม่ได้มีความจริงแค่ฝั่งเดียว โหมดเนื้อเรื่องตั้งคำถามว่าทำไมแกนดาวดวงนี้ถึงดึงหลายเผ่าเข้ามาบุก และให้ผู้เล่นได้เห็นศึกครั้งนี้จากทั้งสองมุม",
    ],
    quote: {
      th: "หัวใจมนุษย์และวิญญาณแอนดรอยด์ รวมเราเป็นหนึ่งเดียว",
      en: "Human hearts and android souls unite us all",
      source: "จากเพลงธีม Guard the Star Core",
    },
    image: {
      src: "/art/corewar-world-party.webp",
      alt: "VELVET LYRA SERAPH-09 และ NOVA-7 เดินเข้าสู่ซากเมืองในหมอก",
      caption: "ปาร์ตี้ผู้พิทักษ์ออกสำรวจดินแดนที่ยังไม่มีใครรู้จัก",
    },
    campaigns: [
      {
        name: "GUARDIAN CHRONICLE",
        side: "ฝั่งผู้พิทักษ์",
        text: "เล่นคนเดียวกับเพื่อน AI หรือ co-op 1–4 คน เลือกระดับ Story / Tactical / Nightmare",
        steps: [
          { name: "1 · First Signal", text: "พบสัญญาณแรก เปิด relay และพาผู้รอดชีวิตกลับฐาน" },
          { name: "2 · Ash Garden", text: "เก็บชิ้นส่วนระบบป้องกัน ตั้งป้อมคุมเส้นทาง" },
          { name: "3 · Orbital Rescue", text: "ฝ่าฝนบนท่าอวกาศ ช่วยทีม และคุ้มกันขบวนพลังงาน" },
          { name: "4 · Silent Vault", text: "สำรวจคลังที่แอนดรอยด์เก็บประวัติของแกนดาว" },
          { name: "5 · Hive Frontier", text: "ทำลายหน่วยย่อยของรังโดยไม่ทิ้งแนวคุ้มกัน" },
          { name: "6 · Core of Two Worlds", text: "เลือกเป้าหมายของเรื่อง และป้องกันแกนในศึกสุดท้าย" },
        ],
      },
      {
        name: "ALIEN ORIGINS",
        side: "ฝั่งเอเลี่ยน",
        text: "เล่นเป็นคอมมานเดอร์ในมุม RTS ขยายฐาน สอดแนม วิจัย และบุกแนวป้องกันของผู้พิทักษ์ AI",
        steps: [
          { name: "MYRAX · The Lost Brood", text: "รังเดิมถูกพลังแกนดาวตัดขาด ต้องช่วยไข่และเชื่อมฝูงให้ได้ก่อนบุก" },
          {
            name: "AETHERION · Crystal Exodus",
            text: "อารยธรรมผลึกกำลังสูญเสียการเชื่อมต่อ ต้องฟื้นคลื่น resonance และเปิดเส้นทางอพยพ",
          },
        ],
      },
    ],
  },

  gameplay: {
    title: "เลือกฝั่งได้ทุกครั้ง เล่นได้ทั้งสองแบบ",
    sides: [
      {
        name: "ฝ่ายผู้พิทักษ์",
        mode: "ACTION 2.5D · ปาร์ตี้ 4 คน",
        image: {
          src: "/art/corewar-party.webp",
          alt: "LYRA และ VELVET ป้องกันแกนพลังงานจากฝูงเอเลี่ยน พร้อมแถบ HP ของแกนและการปรับเสถียร",
        },
        points: [
          "ควบคุมฮีโร่หนึ่งคน ยิง ฟัน ใช้สกิล 4 ช่อง และหลบด้วยปุ่ม Dodge",
          "เริ่มแมตช์ที่เลเวล 1 ออกสำรวจพื้นที่ในหมอก เก็บ EXP จากการสังหารและการช่วยทีม ไม่ต้องแย่ง last hit",
          "ขึ้นเลเวลแล้วได้แต้มอัปสกิลของตัวเอง และแต้มพาสซีฟสำหรับผังดาวกลาง",
          "ล้มแล้วเพื่อนชุบได้ภายในเวลาจำกัด และทีมมีโควตากลับสนามร่วมกัน",
          "ใช้ Scrap ซ่อมแกน ตั้งป้อมในจุดที่กำหนด และส่ง ping นัดเป้าหมาย",
        ],
      },
      {
        name: "ฝ่ายคอมมานเดอร์",
        mode: "RTS · ผู้บัญชาการ 1 คน",
        image: {
          src: "/art/corewar-myrax-rts.webp",
          alt: "มุม RTS ของเผ่า MYRAX กำลังสร้างฐาน ผลิตยูนิต และส่งฝูงไปยังแกนพลังงาน",
        },
        points: [
          "เลือกเผ่า MYRAX หรือ AETHERION ก่อนแมตช์ คุมเศรษฐกิจสองทรัพยากร",
          "ส่งคนงานเก็บทรัพยากร สร้างอาคาร ผลิตยูนิต และวิจัยสาย Economy / Army / Command",
          "เลื่อน ซูม และกดมินิแมพย้ายกล้อง เลือกยูนิตเป็นกลุ่ม สั่ง Move / Attack / Hold / Stop",
          "ใช้สกิลคอมมานเดอร์จากพลังงานส่วนกลาง เช่น Spore Surge หรือ Gravity Pulse",
          "ยูนิตที่ตายต้องผลิตใหม่ด้วยทรัพยากรและเวลา ไม่มีคลื่นศัตรูเกิดฟรี",
        ],
      },
    ],
    flow: [
      { phase: "ช่วงต้น", text: "ฝ่ายผู้พิทักษ์ออกสำรวจหาเสบียงและ relay ฝ่ายเอเลี่ยนตั้งฐานและทำเศรษฐกิจ" },
      { phase: "ช่วงกลาง", text: "เอเลี่ยนปลดล็อกยูนิตหนักและเปลี่ยนเส้นทางบุก ผู้พิทักษ์ต้องแบ่งหน้าที่ตอบโต้" },
      { phase: "ช่วงท้าย", text: "ปะทะใหญ่ก่อนแกนปรับเสถียรครบ 100%" },
    ],
    win: [
      {
        side: "ผู้พิทักษ์ชนะ",
        text: "แกนยังไม่แตกเมื่อการปรับเสถียรครบ 100% ตอนหมดเวลา หรือบุกทำลาย HQ ของเอเลี่ยนได้ก่อน",
      },
      { side: "เอเลี่ยนชนะ", text: "ทำให้ HP ของแกนเหลือ 0 หรือผู้พิทักษ์ล้มหมดโดยไม่เหลือโควตากลับสนาม" },
    ],
    systems: [
      {
        title: "แมพสุ่ม + หมอกสามระดับ",
        text: "พื้นที่มี 3 สถานะ ยังไม่รู้จัก · เคยสำรวจ · กำลังมองเห็น เซิร์ฟเวอร์กรองข้อมูลศัตรูที่มองไม่เห็นออกตั้งแต่ต้นทาง ไม่ใช่แค่ทาสีดำทับจอ",
        image: { src: "/art/corewar-explore.webp", alt: "ปาร์ตี้ผู้พิทักษ์สำรวจพื้นที่น้ำแข็งที่ยังปกคลุมด้วยหมอกสงคราม" },
      },
      {
        title: "สกิลเฉพาะตัว + ผังดาวพาสซีฟ",
        text: "ฮีโร่แต่ละคนมีผังสกิล 12 โหนดของตัวเอง ส่วนผังดาวพาสซีฟ 46 ดวงเลือกข้ามสายได้ เพื่อประกอบบิลด์ในแบบของเรา",
        image: { src: "/art/corewar-atlas.webp", alt: "หน้า Passive Atlas ผังดาวพาสซีฟสี่กลุ่ม Offense Defense Recovery Utility" },
      },
      {
        title: "คริสตัลและซ็อกเก็ต",
        text: "Ruby เพิ่มพลังโจมตี Sapphire เสริมเกราะ Emerald เพิ่ม HP Amethyst เพิ่มแรงสะเทือน อาวุธ 3 ช่อง เกราะ 2 ช่อง ดูค่าก่อน–หลังก่อนยืนยัน และถอดคืนได้ฟรี",
        image: { src: "/art/corewar-forge.webp", alt: "หน้า Weapon Forge ของ LYRA ใส่คริสตัลลงช่องปืนพกและเกราะ" },
      },
      {
        title: "วิจัยของเผ่า",
        text: "เผ่าละ 9 โหนดใน 3 สาย จ่ายทรัพยากรแล้วรอเวลา เริ่มใหม่ทุกแมตช์ ไม่มีแต้มถาวรที่ทำให้คนเล่นนานได้เปรียบ",
        image: { src: "/art/corewar-myrax-research.webp", alt: "หน้า Gene Vault งานวิจัยของเผ่า MYRAX" },
      },
      {
        title: "แผนอัตโนมัติ",
        text: "ตั้งลำดับอัปสกิล ลำดับวิจัย และ Auto Cast รายสกิลไว้ล่วงหน้าได้ แต่ยังกดสั่งเองได้ทุกเมื่อ",
        image: { src: "/art/corewar-autoplans.webp", alt: "หน้า Auto Skills และ Upgrade Plans ของ LYRA และ MYRAX" },
      },
      {
        title: "มุม RTS เต็มสนาม",
        text: "ซูมออกได้กว้างราว 4–5 เท่าของมุมฮีโร่ กดมินิแมพย้ายกล้อง และเห็นเฉพาะสิ่งที่ยูนิตของตัวเองมองเห็น",
        image: { src: "/art/corewar-aetherion-fog.webp", alt: "มุม RTS ซูมไกลของเผ่า AETHERION ใต้หมอกสงคราม" },
      },
      {
        title: "PvE · ยศ · อาชีพขั้นสูง",
        text: "เลเวลบัญชี 1–60 ความชำนาญฮีโร่และเผ่า ยศ PvE I–VI แยกสองฝั่ง ผ่านบททดสอบเพื่อปลดอาชีพขั้นสูง ส่วนในแมตช์ VS ทุกคนเริ่มเลเวล 1 ด้วยกติกาเท่ากัน",
        image: { src: "/art/corewar-pve.webp", alt: "หน้า Story Campaigns เลือก Guardian Chronicle หรือ Alien Origins" },
      },
    ],
  },

  world: {
    title: "โลก ธีมสนาม และเผ่าพันธุ์",
    intro:
      "ชื่อธีมด้านล่างคือชุดฉากและบรรยากาศ ส่วนผังสนามจริงจะประกอบใหม่ทุกครั้งที่เริ่มแมตช์หรือเข้าภารกิจ",
    maps: [
      {
        name: "FROST RELAY",
        text: "สถานีผลึกน้ำแข็ง ที่เวทธาตุกับกระสุนปะทะกันกลางลานกว้าง",
        image: { src: "/art/corewar-frost-relay.webp", alt: "ผู้พิทักษ์ต่อสู้ฝูงเอเลี่ยนบนสถานีผลึกน้ำแข็ง" },
      },
      {
        name: "ASH GARDEN",
        text: "สถานีชีวภาพที่ถูกบุกรุก ช่องผ่านแคบสลับลานกว้าง เหมาะกับโล่ ป้อม และกับดัก",
        image: { src: "/art/corewar-ash-garden.webp", alt: "แท้งค์และวิศวกรตั้งแนวรับในสถานีชีวภาพ Ash Garden" },
      },
      {
        name: "ORBITAL RAIN",
        text: "ท่าอวกาศกลางสายฝน ที่ทีมต้องประคองกันด้วยการฮีลและล้างสถานะ",
        image: { src: "/art/corewar-orbital-rain.webp", alt: "IRIS-3 ฮีลเพื่อนร่วมทีมบนท่าอวกาศกลางสายฝน" },
      },
    ],
    origins: [
      {
        name: "HUMAN",
        text: "Adaptive Instinct หลบถูกจังหวะแล้วรับดาเมจลดลงชั่วครู่ และฟื้นพลังงานเร็วขึ้นหลังร่วมสังหาร",
      },
      {
        name: "ANDROID",
        text: "Shield Buffer โล่สำรองที่ฟื้นเองเมื่อไม่โดนโจมตี และเร่งพลังงานหลังใช้สกิล แลกกับจุดอ่อนต่อ EMP",
      },
    ],
    originsImage: {
      src: "/art/corewar-creation.webp",
      alt: "หน้าสร้างผู้พิทักษ์ เลือกเผ่า HUMAN หรือ ANDROID และรูปลักษณ์ชายหรือหญิง",
      caption: "ทั้งสองเผ่าเลือกรูปลักษณ์ชายหรือหญิงได้ ความสามารถไม่เปลี่ยนตามเพศ",
    },
    factions: [
      {
        name: "MYRAX BROOD",
        kind: "ฝูงชีวภาพ",
        text: "กระดองสีงาช้าง แกนเรืองแสง magenta และกรดสีเขียว อาคารเป็นอวัยวะที่ยึดพื้นด้วยเส้นประสาท ยูนิตราคาถูก ผลิตเร็ว เก่งเรื่องฝูงและกรด",
        economy: "Biomass + Core Shards",
        units: ["Harvester", "Skitter", "Venom Spitter", "Carapace Brute", "Brood Mortar", "Synapse Warden"],
        buildings: ["Brood Heart", "Brood Chamber", "Spine Nest", "Gene Vault"],
        commanders: "KHAEL · SAERYN",
        image: { src: "/art/corewar-myrax.webp", alt: "SAERYN คอมมานเดอร์ MYRAX บัญชาการจาก Brood Heart" },
      },
      {
        name: "AETHERION SYNOD",
        kind: "ผลึกพลังงาน",
        text: "ผลึก obsidian และมุกม่วง แกนพลังงาน cyan อาคารเป็นวงแหวนและเสาผลึก ยูนิตน้อยแต่แพง มีโล่หน้า ยิงไกล และคุมพื้นที่",
        economy: "Flux + Core Shards",
        units: ["Shard Collector", "Prism Lancer", "Ray Sentinel", "Bulwark", "Rift Artillery", "Nexus Weaver"],
        buildings: ["Nexus Core", "Prism Gate", "Lens Pylon", "Resonance Archive"],
        commanders: "VAEL · NYXARA",
        image: { src: "/art/corewar-aetherion.webp", alt: "VAEL คอมมานเดอร์ AETHERION จัดแนวกองทัพผลึก" },
      },
    ],
  },

  characters: {
    title: "ผู้พิทักษ์ 8 คน และคอมมานเดอร์ 4 คน",
    guardians: [
      {
        name: "LYRA",
        side: "HUMAN",
        role: "MOBILE MEDIC",
        image: "/art/corewar-lyra.webp",
        text: "ตัวละครหลักของเกม ใช้ปืนพกพลังงาน เดินเร็ว และฮีลตัวเองอัตโนมัติเมื่อพ้นการโจมตี",
        lines: ["PULSE PISTOL", "MOBILE MEDIC", "SWIFT STEP"],
        paths: "Pulse Saint · Phase Gunner",
      },
      {
        name: "VELVET",
        side: "HUMAN",
        role: "BLOODGUARD",
        image: "/art/corewar-velvet.webp",
        text: "สาวทวินเทลชมพูชุดโกธิคกับค้อนยักษ์ คอมโบ Sweep → Lift → Slam เกราะหนา และดูดเลือดเฉพาะตอนสังหาร",
        lines: ["HEAVY COMBO", "BLOOD ENGINE", "REAPER DEFENSE"],
        paths: "Requiem Vanguard · Crimson Reaper",
      },
      {
        name: "ASTRA",
        side: "HUMAN",
        role: "ELEMENTALIST",
        image: "/art/corewar-astra.webp",
        text: "นักเวทธาตุไฟ น้ำแข็ง และสายฟ้า ใช้ผลึกเวทลอยตัวเป็นสื่อพลัง",
        lines: ["FIRE", "FROST", "LIGHTNING"],
        paths: "Storm Weaver · Frostfire Oracle",
      },
      {
        name: "ECHO",
        side: "HUMAN",
        role: "FIREARMS SPECIALIST",
        image: "/art/corewar-echo.webp",
        text: "ผู้เชี่ยวชาญอาวุธปืน สลับปืนพก สไนเปอร์ และปืนกลได้ภายในชุดของตัวเอง",
        lines: ["PISTOL", "SNIPER", "MACHINE GUN"],
        paths: "Deadeye · Arsenal Runner",
      },
      {
        name: "RHEA",
        side: "HUMAN",
        role: "SHIELD BASTION",
        image: "/art/corewar-rhea.webp",
        text: "แท้งค์ที่ใช้โล่ทาวเวอร์ยักษ์เป็นอาวุธ ทนทานสูงมาก และฟื้นตัวเองได้",
        lines: ["SHIELD STRIKE", "FORTRESS", "SECOND WIND"],
        paths: "Iron Citadel · Impact Warden",
      },
      {
        name: "SERAPH-09",
        side: "ANDROID",
        role: "LIGHTBLADE GUARDIAN",
        image: "/art/corewar-seraph.webp",
        text: "แอนดรอยด์ถือดาบแสงกับโล่พลังงาน แท้งค์สายคล่องตัวที่จับจังหวะปัดป้อง",
        lines: ["LIGHTBLADE", "PRISM GUARD", "AEGIS MOTION"],
        paths: "Prism Paladin · Photon Duelist",
      },
      {
        name: "NOVA-7",
        side: "ANDROID",
        role: "FIELD ENGINEER",
        image: "/art/corewar-nova.webp",
        text: "วิศวกรสนาม สร้างป้อม วางกับดัก ส่งโดรนสอดแนม และซ่อมแกนด้วย Scrap",
        lines: ["TURRETS", "TRAPS", "DRONES"],
        paths: "Siege Architect · Trap Artificer",
      },
      {
        name: "IRIS-3",
        side: "ANDROID",
        role: "RESONANCE HEALER",
        image: "/art/corewar-iris.webp",
        text: "ฮีลเลอร์ประจำทีม ฟื้นฟูทั้งมนุษย์และแอนดรอยด์ ล้างสถานะ และชุบชีวิตเพื่อน",
        lines: ["RESTORE", "CLEANSE", "RESCUE"],
        paths: "Resonance Oracle · Rescue Seraph",
      },
    ],
    commanders: [
      {
        name: "KHAEL",
        side: "MYRAX",
        role: "COMMANDER",
        image: "/art/corewar-khael.webp",
        text: "ผู้บัญชาการสุขุม ใบหน้าคม ผิวเทาอมม่วง ตา magenta สวมเกราะกระดองงาช้างกับผ้าคลุมสีเบอร์กันดี",
      },
      {
        name: "SAERYN",
        side: "MYRAX",
        role: "COMMANDER",
        image: "/art/corewar-saeryn.webp",
        text: "ราชินีผู้ควบคุมฝูง ผมเงินม่วงถักเปีย สวมคราวน์หนามชีวภาพและผ้าคลุมสีเลือดนก",
      },
      {
        name: "VAEL",
        side: "AETHERION",
        role: "COMMANDER",
        image: "/art/corewar-vael.webp",
        text: "ขุนนางนักวางแผน ผมเงินยาว ผลึกเล็กที่ขมับ เกราะ obsidian–มุกม่วงกับคอร์ cyan",
      },
      {
        name: "NYXARA",
        side: "AETHERION",
        role: "COMMANDER",
        image: "/art/corewar-nyxara.webp",
        text: "ราชินีผลึก หูและคราวน์เป็นผลึก ผมเงินฟ้าน้ำแข็ง และผ้าคลุมม่วงโปร่ง",
      },
    ],
    note: "คอมมานเดอร์แต่ละคู่คือรูปลักษณ์ชายและหญิงของเผ่าเดียวกัน ไม่เพิ่มพลังหรือยูนิต ชื่อตัวละครทั้งหมดยังเป็นชื่อในงานออกแบบ",
  },

  sales: {
    title: "ขายความสวย ไม่ขายความเก่ง",
    intro:
      "แผนในเอกสารออกแบบวางหลักไว้ชัดตั้งแต่แรก เงินซื้อรูปลักษณ์และความสะดวกใน PvE ได้ แต่ซื้อชัยชนะในโหมดแข่งขันไม่ได้",
    points: [
      {
        title: "ร้านค้าของแต่ง",
        text: "สกินผู้พิทักษ์ สกินคอมมานเดอร์ อาวุธ ยูนิต อาคาร สัตว์เลี้ยง แบนเนอร์ และเอฟเฟกต์ ระดับ Common ถึง Legendary บอกความอลังการของงานภาพ ไม่ใช่ระดับพลัง และสกินคอมมานเดอร์ชุดเดียวใช้ได้ทั้งร่างชายและหญิง",
      },
      {
        title: "Season Pass",
        text: "ซีซั่นต้นแบบยาว 8 สัปดาห์ 50 ระดับ มีเส้นฟรีและเส้น Premium ที่ให้ของแต่งกับเอฟเฟกต์ ส่วนสกิลจริงของซีซั่นปลดได้ฟรีผ่านภารกิจ และยังปลดได้ถาวรหลังจบซีซั่น",
      },
      {
        title: "Portal Battery",
        text: "PvE มีรอบรับรางวัลฟรีวันละ 3 รอบ แบตเตอรี่เพิ่มได้อีกไม่เกินวันละ 2 รอบ เราบอกตรง ๆ ว่ามันช่วยให้เลเวลบัญชีขึ้นเร็วขึ้น แต่ซื้อข้ามบททดสอบหรือซื้อยศไม่ได้",
      },
      {
        title: "VS เท่ากันทุกคน",
        text: "โหมดแข่งขันใช้ค่าพลังมาตรฐาน งบคริสตัล 10 แต้ม และช่องสกิล 4 ช่องเท่ากัน และไม่ใช้กล่องสุ่มเป็นทางหลักในการได้สกิน",
      },
    ],
    image: {
      src: "/art/corewar-shop.webp",
      alt: "หน้า Battle Daily ซีซั่น และร้าน Portal Battery",
      caption: "ภาพหน้าซีซั่นและร้านค้าเป็นการจัดวางเชิงคอนเซปต์ ตัวเลขในภาพไม่ใช่ราคาจริง",
    },
    note: "ราคาจริง แพลตฟอร์มจำหน่าย และระบบชำระเงินในเกมยังไม่กำหนด จะเปิดขายก็ต่อเมื่อการต่อสู้สนุกแล้วและระบบรางวัลกันการได้ของซ้ำได้จริง",
  },

  roadmap: {
    title: "เส้นทางจากคอนเซปต์สู่เกมเต็ม",
    intro:
      "กรอบเวลาด้านล่างมาจากแผนพัฒนา โดยสมมติผู้ดูแลงานหลัก 1 คนทำ 20–30 ชั่วโมงต่อสัปดาห์ร่วมกับผู้ช่วย AI เขียนโค้ด เป็นการประมาณ ไม่ใช่วันส่งที่รับประกัน และจะประเมินใหม่เมื่อได้ต้นแบบ graybox",
    phases: [
      {
        when: "ตุลาคม 2026",
        title: "คอนเซปต์ ภาพ และ MV",
        state: "done",
        items: [
          "สเปกระบบ V2–V7: สองฝั่ง ฮีโร่ 8 คน เอเลี่ยน 2 เผ่า PvE แมพสุ่ม และสกิน",
          "ภาพคอนเซปต์ตัวละคร เกมเพลย์ และ UI",
          "MV เพลงธีม Guard the Star Core ยาว 3:37 พร้อมซับไทย",
          "ตัวอย่างระบบสุ่มแผนที่ ทดสอบแล้ว 1,000 seed เดินถึงกันครบ",
        ],
      },
      {
        when: "สัปดาห์ 1–6",
        title: "ต้นแบบ graybox สองฝั่ง",
        state: "next",
        items: [
          "ฮีโร่ 1 คน ปะทะคอมมานเดอร์ 1 คน ผ่าน LAN โดยเซิร์ฟเวอร์เป็นผู้ตัดสิน",
          "RTS: คนงาน ทรัพยากร สร้างอาคาร ผลิตยูนิต เลือกและสั่งการ",
          "แมพต้นแบบ 3 เส้นทาง Fog of War เวลา และการซ่อมแกน",
        ],
      },
      {
        when: "ประมาณ 12–16 สัปดาห์",
        title: "เดโม 2v1",
        state: "planned",
        items: [
          "LYRA + VELVET ปะทะคอมมานเดอร์ 1 คน ระบบล้ม ชุบ และ ping",
          "art slice ฮีโร่ 2 คน และยูนิตต้นแบบของสองเผ่า",
          "สองเผ่ามีคนงานและยูนิตรบ 3 แบบ วิจัยเผ่าละ 3 โหนด",
          "เสียง ทดสอบผ่านอินเทอร์เน็ต แก้บั๊ก และปรับสมดุล",
        ],
      },
      {
        when: "ประมาณ 20–28 สัปดาห์",
        title: "เดโม 4 หน้าที่",
        state: "planned",
        items: [
          "กล้อง RTS แบบเลื่อน/ซูม EXP ผังสกิลส่วนตัว และพาสซีฟชุดแรก",
          "Auto Upgrade / Auto Research / Auto Cast",
          "ต้นแบบ 4 หน้าที่ และผู้พิทักษ์ HUMAN / ANDROID ทั้งชายและหญิง",
        ],
      },
      {
        when: "+8–14 สัปดาห์",
        title: "PvE vertical slice",
        state: "planned",
        items: [
          "ภารกิจเนื้อเรื่องของ LYRA 1 ภารกิจ และภารกิจ RTS ของ MYRAX 1 ภารกิจ",
          "เลเวลบัญชี 1–20 ยศ I–III และอาชีพขั้นสูงชุดแรก",
          "ภารกิจรายวันและรอบรับรางวัล ทดสอบด้วยเงินจำลอง",
        ],
      },
      {
        when: "ประมาณ 9–18 เดือน",
        title: "รุ่นเต็มตามภาพ",
        state: "planned",
        items: [
          "ผู้พิทักษ์ครบ 8 คน และแมตช์ 4v1",
          "สองเผ่าครบยูนิตและวิจัยเผ่าละ 9 โหนด",
          "แมพสุ่มเต็มรูปแบบในธีม Frost Relay · Ash Garden · Orbital Rain",
          "ระบบออนไลน์ ซีซั่น และร้านของแต่ง (ประเมินแยกหลังเดโม)",
        ],
      },
    ],
  },

  budget: {
    title: "เป้า 500,000 บาท จะนำไปใช้กับอะไร",
    intro:
      "เครื่องมือหลักที่ใช้สร้างเกมนี้ฟรีทั้งหมด เงินสนับสนุนจึงไปลงกับส่วนที่ต้องจ่ายจริงตามแผน",
    free: [
      { name: "Godot 4", use: "เอนจินเกม UI และระบบเครือข่าย" },
      { name: "Blender", use: "โมเดล rig แอนิเมชัน และเรนเดอร์สไปรต์ 8 ทิศ" },
      { name: "Krita", use: "เท็กซ์เจอร์ ไอคอน และงาน UI" },
      { name: "Audacity", use: "ตัดและผสมเสียง" },
      { name: "Kenney · Poly Haven", use: "ชุดฉาก เสียง อนุภาค และวัสดุ CC0" },
    ],
    spend: [
      { title: "บริการ AI และโมเดล 3D", text: "โควตาสร้างภาพและโมเดลตั้งต้น เช่น Tripo ก่อนนำมาเก็บงานต่อใน Blender" },
      {
        title: "เซิร์ฟเวอร์และการทดสอบออนไลน์",
        text: "เครื่องเซิร์ฟเวอร์หรือ relay สำหรับทดสอบผ่านอินเทอร์เน็ต และระบบบัญชีเมื่อขึ้นออนไลน์จริง",
      },
      { title: "ฮาร์ดแวร์", text: "เครื่องอ้างอิงสำหรับวัดเป้าหมาย 1080p 60 FPS และเครื่องทดสอบ" },
      { title: "ช่องทางจำหน่าย", text: "ค่าเปิดช่องทางขายและระบบชำระเงินเมื่อเลือกแพลตฟอร์มจริง" },
    ],
    note: "ยอดสนับสนุนบนหน้านี้ทีมงานเป็นคนอัปเดตหลังตรวจรายการโอน จึงไม่ใช่ตัวเลขแบบเรียลไทม์",
  },

  faq: [
    {
      q: "บริจาคแล้วได้เกมเลยไหม",
      a: "ยังไม่ได้ ตอนนี้ยังไม่มีตัวเกมที่เล่นได้ การสนับสนุนนี้คือการช่วยสร้างเกมตั้งแต่ต้น ไม่ใช่การสั่งซื้อล่วงหน้า ของที่ได้รับเป็นไปตามรายการในระดับที่เลือก",
    },
    {
      q: "ของรางวัลในเกมทำให้เก่งขึ้นไหม",
      a: "ไม่ ป้ายชื่อแสงสี กรอบ แบนเนอร์ และสกินผู้สนับสนุนเป็นรูปลักษณ์อย่างเดียว ไม่มีโบนัสสเตตัสตามหลักของเกม และไม่มีวางจำหน่าย",
    },
    {
      q: "จะได้รับของรางวัลเมื่อไหร่",
      a: "ชื่อบนกำแพงผู้สนับสนุนและวอลเปเปอร์มอบได้หลังทีมยืนยันสลิป ส่วนของในเกมจะผูกกับบัญชีเมื่อระบบบัญชีของเกมพร้อม",
    },
    {
      q: "โอนแล้วต้องทำอะไรต่อ",
      a: "เก็บสลิปไว้ แล้วส่งสลิปพร้อมระดับที่เลือกและชื่อที่อยากให้แสดงมาที่หน้าติดต่อของ XMAN Studio ทีมงานจะยืนยันและอัปเดตยอดบนหน้านี้",
    },
    {
      q: "สแกน QR จากมือถือเครื่องเดียวกันได้ไหม",
      a: "ได้ กดบันทึกภาพ QR แล้วเปิดแอปธนาคาร เลือกสแกนจากรูปในเครื่อง หรือคัดลอกหมายเลขพร้อมเพย์ไปโอนเองก็ได้",
    },
    {
      q: "ภาพในหน้านี้เป็นภาพจากเกมจริงหรือเปล่า",
      a: "ไม่ใช่ ทุกภาพเป็นภาพคอนเซปต์และภาพจาก MV ที่ใช้กำหนดทิศทางงานศิลป์ ตัวเลขบน UI ในภาพเป็นตัวอย่าง ค่าจริงจะมาจากการทดสอบเล่น",
    },
    {
      q: "เกมจะเล่นบนอะไร",
      a: "แผนพัฒนาใช้ Godot 4 และเริ่มทดสอบบนคอมพิวเตอร์ผ่าน LAN ก่อน ส่วนแพลตฟอร์มวางจำหน่ายยังไม่กำหนด",
    },
  ],
  closing: {
    title: "มาสร้างสงครามรอบแกนดาวไปด้วยกัน",
    text: "ทุกการสนับสนุนพา COREWAR เข้าใกล้ต้นแบบที่เล่นได้จริง ติดตามความคืบหน้าได้ในบันทึกการพัฒนาบน XMAN GAMES HUB",
  },
};
