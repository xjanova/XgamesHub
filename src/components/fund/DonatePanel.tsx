"use client";

import { useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import s from "./fund.module.css";
import { baht, type FundProject, type FundTier } from "@/data/fund";
import { motionPref } from "@/lib/prefs";
import { formatPromptPayId, MAX_AMOUNT, promptPayPayload, promptPayTarget, validAmount } from "@/lib/promptpay";

const CUSTOM = "custom";
const QUIET = 4; // modules of white border around the code, as the QR spec asks

type Props = Pick<FundProject, "tiers" | "promptpay" | "contact"> & { project: string; customNote?: string };

const soldOut = (t: FundTier) => t.limit !== undefined && (t.taken ?? 0) >= t.limit;

function parseAmount(text: string) {
  const clean = text.replace(/[,\s฿]/g, "");
  return /^\d+(\.\d{1,2})?$/.test(clean) ? Number(clean) : NaN;
}

/** QR modules as one SVG path, so it renders crisp at any size without a canvas. */
function qrPath(payload: string) {
  const { modules } = QRCode.create(payload, { errorCorrectionLevel: "M" });
  let d = "";
  for (let y = 0; y < modules.size; y++) {
    for (let x = 0; x < modules.size; x++) {
      if (modules.get(y, x)) d += `M${x + QUIET} ${y + QUIET}h1v1h-1z`;
    }
  }
  return { d, size: modules.size + QUIET * 2, modules };
}

export default function DonatePanel({ tiers, promptpay, contact, project, customNote = "รับของรางวัลของระดับที่ยอดถึง" }: Props) {
  const [pick, setPick] = useState(() => (tiers.find((t) => t.highlight && !soldOut(t)) ?? tiers[0]).id);
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);
  const payRef = useRef<HTMLElement>(null);

  // one column (phones, tablets): the QR sits under the whole tier list, so bring it into view
  const chooseTier = (id: string) => {
    setPick(id);
    if (matchMedia("(max-width: 1100px)").matches)
      payRef.current?.scrollIntoView({ behavior: motionPref.get() ? "smooth" : "auto", block: "start" });
  };

  const open = promptPayTarget(promptpay.id) !== null;
  const tier = tiers.find((t) => t.id === pick);
  const amount = pick === CUSTOM ? parseAmount(custom) : (tier?.amount ?? NaN);
  const amountOk = validAmount(amount) && amount >= 1;
  const qr = useMemo(() => (open && amountOk ? qrPath(promptPayPayload(promptpay.id, amount)) : null), [open, amountOk, promptpay.id, amount]);

  const saveQr = () => {
    if (!qr) return;
    // white card with the code and the amount underneath, sized for a banking app's "scan from photo"
    const scale = 12;
    const side = qr.size * scale;
    const canvas = document.createElement("canvas");
    canvas.width = side;
    canvas.height = side + 120;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0b0d17";
    for (let y = 0; y < qr.modules.size; y++)
      for (let x = 0; x < qr.modules.size; x++)
        if (qr.modules.get(y, x)) ctx.fillRect((x + QUIET) * scale, (y + QUIET) * scale, scale, scale);
    const font = getComputedStyle(document.body).fontFamily;
    ctx.textAlign = "center";
    ctx.font = `600 40px ${font}`;
    ctx.fillText(`฿${baht(amount)}`, side / 2, side + 44);
    ctx.font = `400 26px ${font}`;
    ctx.fillStyle = "#4a4f66";
    ctx.fillText(`พร้อมเพย์ · ${promptpay.name || formatPromptPayId(promptpay.id)} · ${project}`, side / 2, side + 92, side - 40);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `promptpay-${amount}.png`;
      a.click();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }, "image/png");
  };

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(promptpay.id.replace(/[\s-]/g, ""));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={s.donate}>
      <div className={s.tiers} role="radiogroup" aria-label="ระดับการสนับสนุน">
        {tiers.map((t) => {
          const out = soldOut(t);
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={pick === t.id}
              disabled={out}
              className={`${s.tier}${t.highlight ? ` ${s.tierHot}` : ""}`}
              onClick={() => chooseTier(t.id)}
            >
              <span className={s.tierTop}>
                <span className={s.tierName}>{t.name}</span>
                {t.highlight && <span className={s.tierBadge}>แนะนำ</span>}
              </span>
              <b className={s.tierAmount}>฿{baht(t.amount)}</b>
              <span className={s.tierTitle}>{t.title}</span>
              <ul>
                {t.perks.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              {t.limit !== undefined && (
                <span className={s.tierLimit}>{out ? "ครบจำนวนแล้ว" : `จำกัด ${t.limit} ที่ · เหลือ ${t.limit - (t.taken ?? 0)}`}</span>
              )}
            </button>
          );
        })}
        <div
          role="radio"
          aria-checked={pick === CUSTOM}
          tabIndex={0}
          className={`${s.tier} ${s.tierCustom}`}
          onClick={() => setPick(CUSTOM)}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              setPick(CUSTOM);
            }
          }}
        >
          <span className={s.tierTop}>
            <span className={s.tierName}>ANY AMOUNT</span>
          </span>
          <span className={s.tierTitle}>ใส่ยอดเอง</span>
          <label className={s.amountField}>
            <span>฿</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="เช่น 500"
              value={custom}
              aria-label="จำนวนเงินที่ต้องการสนับสนุน (บาท)"
              onFocus={() => setPick(CUSTOM)}
              onChange={(e) => setCustom(e.target.value)}
            />
          </label>
          <ul>
            <li>ทุกยอดช่วยให้เกมเดินหน้า</li>
            <li>{customNote}</li>
          </ul>
        </div>
      </div>

      <aside ref={payRef} className={s.pay} aria-live="polite">
        <span className={s.eyebrow}>{open ? "สแกนจ่ายด้วยพร้อมเพย์" : "ช่องทางสนับสนุน / ยังไม่เปิดรับ"}</span>
        <div className={s.payAmount}>
          {amountOk ? (
            <>
              <b>฿{baht(amount)}</b>
              <span>{pick === CUSTOM ? "ยอดที่ใส่เอง" : tier?.title}</span>
            </>
          ) : (
            <span className={s.payHint}>ใส่ยอดระหว่าง 1–{baht(MAX_AMOUNT)} บาท ทศนิยมไม่เกิน 2 ตำแหน่ง</span>
          )}
        </div>

        {!open ? (
          <div className={s.qrClosed}>
            <span aria-hidden="true">⌁</span>
            <b>กำลังเตรียมช่องทางรับบริจาค</b>
            <p>QR พร้อมเพย์จะขึ้นตรงนี้เมื่อเปิดรับ ระหว่างนี้ดูระดับการสนับสนุนไว้ก่อนได้เลย</p>
          </div>
        ) : qr ? (
          <>
            <div className={s.qr}>
              <svg viewBox={`0 0 ${qr.size} ${qr.size}`} role="img" aria-label={`QR พร้อมเพย์ ยอด ${baht(amount)} บาท`} shapeRendering="crispEdges">
                <rect width={qr.size} height={qr.size} fill="#fff" />
                <path d={qr.d} fill="#0b0d17" />
              </svg>
            </div>
            <dl className={s.payTo}>
              {promptpay.name && (
                <div>
                  <dt>ชื่อบัญชี</dt>
                  <dd>{promptpay.name}</dd>
                </div>
              )}
              <div>
                <dt>พร้อมเพย์</dt>
                <dd>{formatPromptPayId(promptpay.id)}</dd>
              </div>
            </dl>
            <div className={s.payActions}>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={saveQr}>
                บันทึกภาพ QR
              </button>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={copyId}>
                {copied ? "คัดลอกแล้ว ✓" : "คัดลอกหมายเลข"}
              </button>
            </div>
          </>
        ) : (
          <div className={s.qrClosed}>
            <span aria-hidden="true">฿</span>
            <p>ใส่ยอดที่ต้องการ แล้ว QR จะขึ้นให้ทันที</p>
          </div>
        )}

        <ol className={s.howTo}>
          <li>สแกนด้วยแอปธนาคารที่รองรับพร้อมเพย์ ยอดเงินจะขึ้นให้เอง</li>
          <li>ตรวจชื่อบัญชีก่อนยืนยัน แล้วเก็บสลิปไว้</li>
          <li>
            ส่งสลิปพร้อมชื่อเกม {project} ระดับที่เลือก และชื่อที่อยากให้แสดง ที่{" "}
            <a href={contact.href} target="_blank" rel="noopener">
              {contact.label}
            </a>
          </li>
        </ol>
      </aside>
    </div>
  );
}
