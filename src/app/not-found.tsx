import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/hub/SiteFrame";
import { supportUrl } from "@/lib/game-support";

export const metadata: Metadata = {
  title: "ไม่พบหน้านี้ | XMAN GAMES HUB",
  robots: { index: false },
};

/** out/404.html: a lost link still lands inside the hub's frame. */
export default function NotFound() {
  return (
    <SiteFrame crumb="ไม่พบหน้านี้">
      <main className="lost-main">
        <section className="lost" aria-labelledby="lost-title">
          <img className="lost-art" src="/art/hero/nova-lost.webp" alt="" aria-hidden="true" width={1536} height={1024} />
          <div className="lost-copy">
            <span className="eyebrow">404 · SIGNAL LOST</span>
            <h1 id="lost-title">โนวาหาหน้านี้ไม่เจอ</h1>
            <p>ลิงก์นี้อาจเปลี่ยนไปแล้ว หรือโลกนี้ยังไม่เปิดให้สำรวจ ลองกลับไปเลือกเกมจากหน้าแรกของฮับนะ</p>
            <div className="lost-actions">
              <Link className="button primary" href="/">
                <span aria-hidden="true">◇</span> กลับหน้าแรก
              </Link>
              <Link className="button secondary" href="/?f=play#games">
                เกมที่เล่นได้ตอนนี้
              </Link>
              <a className="lost-link" href={supportUrl()}>
                ศูนย์ชุมชน ↗
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
