"use client";

import { useState } from "react";
import { supportUrl, useCommunity } from "@/lib/community";
import c from "./community.module.css";

const money = (value: number) =>
  value.toLocaleString("th-TH", { maximumFractionDigits: 2 });

export function LiveFunding({ slug, goal }: { slug: string; goal: number }) {
  const { data, failed } = useCommunity();
  const game = data?.games.find((g) => g.slug === slug);
  const target = game?.goal ?? goal;
  const percent =
    game && target ? Math.min(100, (game.raised / target) * 100) : 0;
  return (
    <div className={c.funding}>
      <div>
        <strong>{game ? `฿${money(game.raised)}` : "—"}</strong>
        <span>
          {target ? `จากเป้า ฿${money(target)}` : "ยังไม่กำหนดเป้าทุน"}
        </span>
      </div>
      {game && target > 0 && (
        <progress
          max={target}
          value={Math.min(game.raised, target)}
          aria-label="ยอดบริจาคที่ตรวจสอบแล้ว"
        />
      )}
      <p>
        {game
          ? `${game.supporters} ผู้สนับสนุน · ${Math.floor(percent)}% · ${game.votes} โหวต · ${game.rating_count ? `${game.stars} ★ (${game.rating_count} คะแนน)` : "ยังไม่มีคะแนนดาว"}`
          : failed
            ? "ยังเชื่อมต่อยอดยืนยันไม่ได้"
            : "กำลังโหลดข้อมูลจาก XMAN Studio…"}
      </p>
      {failed && <p>ข้อมูลที่แสดงอาจยังไม่ใช่ยอดล่าสุด</p>}
      <a href={supportUrl(slug)}>ดูรายการยืนยันและรายนามผู้สนับสนุน ↗</a>
    </div>
  );
}

export default function CommunitySupport({ slug }: { slug: string }) {
  const [amount, setAmount] = useState("300");
  const [copied, setCopied] = useState(false);
  const valid =
    /^\d+(\.\d{1,2})?$/.test(amount) &&
    Number(amount) >= 1 &&
    Number(amount) <= 1000000;
  return (
    <div className={c.panel}>
      <div className={c.bank}>
        <img
          src="/banks/scb.svg"
          alt="ธนาคารไทยพาณิชย์"
          width={180}
          height={50}
        />
        <span>บัญชีกลางสำหรับสนับสนุนทุกเกม</span>
        <b>บริษัท เอ็กซ์แมน เอนเตอร์ไพรส์ จำกัด</b>
        <strong>411-148476-9</strong>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText("4111484769");
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? "คัดลอกแล้ว ✓" : "คัดลอกเลขบัญชี"}
        </button>
        <p>โอนผ่านแอปธนาคาร ตรวจชื่อผู้รับให้ตรงก่อนยืนยัน</p>
      </div>
      <div className={c.form}>
        <h3>เลือกยอด แล้วแจ้งโอนพร้อมคำแนะนำ</h3>
        <div className={c.presets}>
          {[100, 300, 1000, 3000].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={amount === String(n)}
              onClick={() => setAmount(String(n))}
            >
              ฿{money(n)}
            </button>
          ))}
        </div>
        <label>
          ยอดที่ต้องการสนับสนุน (บาท)
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        {!valid && (
          <p role="alert">ใส่ยอด 1–1,000,000 บาท ทศนิยมไม่เกินสองตำแหน่ง</p>
        )}
        <p>
          แนบสลิป ฝากคำแนะนำ เลือกเปิดเผยชื่อ และติดตามรางวัลในบัญชี XMAN ID
          เดียวกัน
        </p>
        <a
          className={c.action}
          href={
            valid
              ? `${supportUrl(slug)}?amount=${encodeURIComponent(amount)}#donate`
              : undefined
          }
          aria-disabled={!valid}
        >
          แจ้งยอดและแนบสลิป ↗
        </a>
        <a href={`${supportUrl(slug)}#comments`}>
          แนะนำเกม / โหวต / ให้ดาว โดยไม่ต้องบริจาค ↗
        </a>
        <small>
          ยอดและสิทธิ์รางวัลเพิ่มหลังเจ้าหน้าที่ตรวจเงินเข้า
          รายละเอียดรางวัลและรายนามดูได้ที่ศูนย์สนับสนุน
        </small>
      </div>
    </div>
  );
}

export function CommunityBoard() {
  const { data, failed } = useCommunity();
  return (
    <section className={c.board} id="community">
      <span className={c.label}>COMMUNITY / ทุกเสียงช่วยให้เกมไปต่อ</span>
      <h2>เกมไหนที่คุณอยากเห็นต่อไป</h2>
      <p>
        อันดับยอดสนับสนุนที่ตรวจสอบแล้ว โหวตเกมที่อยากให้ทำมากที่สุด
        และคะแนนดาวจากผู้เล่น
      </p>
      {data ? (
        <div className={c.rankGrid}>
          {(
            [
              ["raised", "ทุนพัฒนาที่ได้รับ"],
              ["votes", "อยากให้ทำมากที่สุด"],
              ["stars", "คะแนนดาว"],
            ] as const
          ).map(([key, label]) => {
            const rows = [...data.games]
              .filter((g) =>
                key === "stars" ? g.rating_count > 0 : g[key] > 0,
              )
              .sort(
                (a, b) =>
                  b[key] - a[key] ||
                  b.rating_count - a.rating_count ||
                  a.slug.localeCompare(b.slug),
              )
              .slice(0, 5);
            return (
              <div key={key}>
                <h3>{label}</h3>
                {rows.length ? (
                  <ol>
                    {rows.map((g) => (
                      <li key={g.slug}>
                        <a href={supportUrl(g.slug)}>{g.name}</a>
                        <b>
                          {key === "raised"
                            ? `฿${money(g.raised)}`
                            : key === "votes"
                              ? `${g.votes} โหวต`
                              : `${g.stars} ★ · ${g.rating_count} คะแนน`}
                        </b>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>ยังไม่มีข้อมูลในหมวดนี้</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p role="status">
          {failed
            ? "ยังเชื่อมต่ออันดับไม่ได้ ดูข้อมูลได้ที่ศูนย์ชุมชน"
            : "กำลังโหลดอันดับ…"}
        </p>
      )}
      {data && failed && (
        <p role="status">ข้อมูลอันดับอาจยังไม่ใช่ข้อมูลล่าสุด</p>
      )}
      <a className={c.action} href={supportUrl()}>
        ดูทุกเกม รายนาม รางวัล และแสดงความคิดเห็น ↗
      </a>
    </section>
  );
}
