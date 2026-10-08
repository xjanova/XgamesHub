import type { Featured } from "@/data/games";
import { hiveBreachPage, type FundPage } from "@/data/fund-hive-breach";
import { breakerPage, type BreakerPage } from "@/data/fund-breaker";

/**
 * Projects that take donations, each with its own page at /fund/<id>/.
 *
 * The site is a static export, so nothing here updates by itself: after
 * checking incoming transfers, edit `raised`, `backers` and `updated` (and
 * `supporters` for names people asked to show), then rebuild and deploy.
 * Leave `promptpay.id` empty to show the page with donations closed.
 */

export type FundTier = {
  id: string;
  /** Baht — also the amount put into the QR when the tier is picked. */
  amount: number;
  name: string;
  title: string;
  perks: string[];
  /** Limited tiers show "x / limit" from `taken`. */
  limit?: number;
  taken?: number;
  highlight?: boolean;
};

export type FundProject = {
  /** URL segment: /fund/<id>/ */
  id: string;
  /** Matching entry in games.ts. */
  gameId: string;
  /** Baht. */
  goal: number;
  raised: number;
  backers: number;
  /** YYYY-MM-DD of the last time raised/backers were checked. */
  updated: string;
  /** Mobile number, national/tax ID or e-wallet ID; empty = not taking donations yet. */
  promptpay: { id: string; name: string };
  /** Where donors send the slip and the name they want shown. */
  contact: { label: string; href: string };
  tiers: FundTier[];
  /** Names donors asked to show on the page. */
  supporters: string[];
  /** Pinned first in the hub's spotlight. */
  spotlight: Featured;
  page: FundPage | BreakerPage;
};

export const fundProjects: FundProject[] = [
  {
    id: "hive-breach",
    gameId: "hive-breach",
    goal: 500_000,
    raised: 0,
    backers: 0,
    updated: "2026-10-07",
    // same PromptPay account as XMAN Studio's checkout — fill in to open donations
    promptpay: { id: "", name: "" },
    contact: { label: "ส่งสลิปที่หน้าติดต่อ XMAN Studio", href: "https://xman4289.com/contact" },
    tiers: [
      {
        id: "signal",
        amount: 100,
        name: "SIGNAL",
        title: "สัญญาณแรก",
        perks: ["ชื่อของคุณบนกำแพงผู้สนับสนุนในหน้านี้ (ถ้าต้องการ)", "คำขอบคุณจากทีม XMAN Studio"],
      },
      {
        id: "guardian",
        amount: 300,
        name: "CORE GUARDIAN",
        title: "ผู้พิทักษ์แกนดาว",
        perks: [
          "ทุกอย่างในระดับก่อนหน้า",
          "ป้ายชื่อแสงสี “Core Founder” ในเกม · ไม่มีจำหน่าย",
          "ชุดวอลเปเปอร์ภาพคอนเซปต์ความละเอียดสูง",
        ],
      },
      {
        id: "vanguard",
        amount: 1_000,
        name: "STAR VANGUARD",
        title: "แนวหน้าแห่งดวงดาว",
        perks: [
          "ทุกอย่างในระดับก่อนหน้า",
          "กรอบโปรไฟล์และแบนเนอร์ผู้สนับสนุนรุ่นแรก · ไม่มีจำหน่าย",
          "ชื่อของคุณในเครดิตของเกม",
        ],
      },
      {
        id: "founder",
        amount: 3_000,
        name: "FOUNDER'S REGALIA",
        title: "ชุดผู้ก่อตั้ง",
        highlight: true,
        perks: [
          "ทุกอย่างในระดับก่อนหน้า",
          "สกินผู้พิทักษ์ “Founder” 1 ชุด เลือก LYRA หรือ VELVET · ไม่มีจำหน่าย",
          "สิทธิ์ลงชื่อทดสอบเดโมรอบแรก",
        ],
      },
      {
        id: "commander",
        amount: 10_000,
        name: "COMMANDER'S CROWN",
        title: "มงกุฎผู้บัญชาการ",
        perks: [
          "ทุกอย่างในระดับก่อนหน้า",
          "สกินคอมมานเดอร์ “Founder” เลือก MYRAX หรือ AETHERION ใช้ได้ทั้งร่างชายและหญิง · ไม่มีจำหน่าย",
          "ร่วมโหวตดีไซน์สกินชุดถัดไป",
        ],
      },
      {
        id: "patron",
        amount: 30_000,
        name: "STAR CORE PATRON",
        title: "ผู้อุปถัมภ์แกนดาว",
        limit: 20,
        taken: 0,
        perks: [
          "ทุกอย่างในระดับก่อนหน้า",
          "ชื่อของคุณสลักบนอนุสรณ์ผู้พิทักษ์ในเกม",
          "เอฟเฟกต์ป้ายชื่อแสงสีเฉพาะระดับนี้ · ไม่มีจำหน่าย",
        ],
      },
    ],
    supporters: [],
    spotlight: {
      id: "hive-breach",
      thumb: "/art/thumb-hive-corewar.webp",
      hook: "โปรเจกต์หลัก · ร่วมสนับสนุน",
      pitch: ["ผู้พิทักษ์ 4 คนปกป้องแกนดาว ปะทะคอมมานเดอร์เอเลี่ยนแบบ RTS", "ร่วมสนับสนุนให้ COREWAR ไปถึงเดโมแรก"],
      sector: "SECTOR / 00",
      sectorName: "STAR CORE",
      tags: ["Main project", "Action × RTS", "ร่วมสนับสนุน"],
    },
    page: hiveBreachPage,
  },
  {
    id: "breaker",
    gameId: "breaker",
    goal: 150_000,
    raised: 0,
    backers: 0,
    updated: "2026-10-07",
    // Intentionally closed until the owner supplies a public receiving account.
    promptpay: { id: "", name: "" },
    contact: { label: "ส่งสลิป BREAKER ที่หน้าติดต่อ XMAN Studio", href: "https://xman4289.com/contact" },
    tiers: [
      { id: "spark", amount: 100, name: "SPARK", title: "ประกายแรก", perks: ["ร่วมสมทบทุนภารกิจใหม่", "แสดงชื่อบนกำแพงผู้สนับสนุนเมื่อยืนยันรายการ (เลือกไม่เปิดเผยชื่อได้)"] },
      { id: "salvager", amount: 300, name: "SALVAGER", title: "ทีมเก็บกู้", highlight: true, perks: ["ร่วมสมทบทุนงานด่านและอุปกรณ์", "รับคำขอบคุณและแสดงชื่อได้เช่นเดียวกับทุกระดับ"] },
      { id: "wingmate", amount: 1000, name: "WINGMATE", title: "เพื่อนร่วมฝูงบิน", perks: ["ร่วมสมทบทุนงานบอสและเอฟเฟกต์", "ทุกระดับไม่มีโบนัสพลังหรืออาวุธพิเศษที่ซื้อได้ด้วยเงิน"] },
      { id: "pathfinder", amount: 3000, name: "PATHFINDER", title: "ผู้เปิดเส้นทาง", perks: ["ร่วมสมทบทุนการทดสอบและเก็บรายละเอียด", "เป็นการสนับสนุนโดยสมัครใจ ไม่ใช่การสั่งซื้อเกมเต็ม"] },
    ],
    supporters: [],
    spotlight: { id: "breaker", thumb: "/art/breaker/combat.webp", hook: "เดโมพร้อมเล่น · ภารกิจใหม่รอคุณ", pitch: ["ชิงอาวุธจากศัตรู แล้วดีดสวนกลับ", "ร่วมสร้างสามด่านใหม่ของเร็นและโนวา"], sector: "SECTOR / 02", sectorName: "KESSLER GRAVEYARD", tags: ["Playable demo", "2.5D", "ร่วมสนับสนุน"] },
    page: breakerPage,
  },
];

/** The project pinned first in the hub's spotlight and promoted by Nova. */
export const mainProject = fundProjects[0];

export const fundById = (id: string) => fundProjects.find((p) => p.id === id);

export const fundHref = (p: FundProject) => `/fund/${p.id}/`;

export const fundPercent = (p: FundProject) => (p.goal > 0 ? Math.min(100, (p.raised / p.goal) * 100) : 0);

/** 500000 -> "500,000" (same output on the build machine and in every browser). */
export const baht = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });
