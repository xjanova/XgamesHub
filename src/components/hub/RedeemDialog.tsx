"use client";

import { useEffect, useRef, useState } from "react";
import { gameById } from "@/data/games";
import { supportUrl } from "@/lib/community";
import { ITEM_KIND, MY_CODES_URL, redeemCode, useOwnedItems, type RedeemResult } from "@/lib/items";
import { guide } from "@/lib/guide";

/** Redeem a supporter item code for any game, and see what this browser has unlocked. */
export default function RedeemDialog({ open, initialCode, onClose }: { open: boolean; initialCode: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="redeem"
      aria-labelledby="redeem-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && <RedeemInner key={initialCode} initialCode={initialCode} onClose={onClose} />}
    </dialog>
  );
}

function RedeemInner({ initialCode, onClose }: { initialCode: string; onClose: () => void }) {
  const owned = useOwnedItems();
  const [code, setCode] = useState(initialCode);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RedeemResult | null>(null);
  const abort = useRef<AbortController | null>(null);

  // closing the dialog mid-request drops the answer instead of writing into a closed view
  useEffect(() => () => abort.current?.abort(), []);

  const submit = async () => {
    if (busy || !code.trim()) return;
    setBusy(true);
    setResult(null);
    abort.current = new AbortController();
    try {
      const r = await redeemCode(code, abort.current.signal);
      setResult(r);
      if (r.ok) {
        setCode("");
        guide.say({
          text: r.already
            ? `${r.item.name} อยู่ในเครื่องนี้แล้วนะ ไม่เสียสิทธิ์เพิ่มเลย~`
            : `ได้ ${r.item.name} สำหรับ ${r.gameName} แล้ว! ขอบคุณที่สนับสนุนทีมนะ เข้าเกมไปอวดได้เลย~`,
          pose: "cheer",
          react: "wink",
          priority: 3,
        });
      }
    } catch {
      return; // aborted: the dialog is gone
    } finally {
      setBusy(false);
    }
  };

  const games = Object.entries(owned);
  return (
    <div className="redeem-inner">
      <button type="button" className="detail-close" onClick={onClose} aria-label="ปิด">
        ×
      </button>
      <span className="eyebrow">SUPPORTER ITEMS</span>
      <h2 id="redeem-title">แลกโค้ดไอเท็มผู้สนับสนุน</h2>
      <p className="redeem-lead">
        ร่วมสนับสนุนเกมที่ XMAN Studio แล้วรับโค้ดไอเท็มเมื่อทีมยืนยันยอด กรอกโค้ดที่นี่ครั้งเดียว เกมบนฮับที่รองรับจะปลดล็อกให้เอง
      </p>
      <form
        className="redeem-form"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <label htmlFor="redeem-code" className="sr-only">
          โค้ดไอเท็ม
        </label>
        <input
          id="redeem-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="XG-XXXX-XXXX-XXXX-XXXX"
          maxLength={40}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          autoFocus
        />
        <button type="submit" className="button primary" disabled={busy || !code.trim()}>
          {busy ? "กำลังตรวจ…" : "แลกโค้ด"}
        </button>
      </form>
      <p className={`redeem-status${result ? (result.ok ? " ok" : " bad") : ""}`} role="status" aria-live="polite">
        {result?.ok
          ? `${result.already ? "มีอยู่แล้ว" : "ได้รับแล้ว"}: ${result.item.name} · ${result.gameName} (ใช้ไป ${result.devicesUsed}/${result.devicesMax} เครื่อง)`
          : result?.message ?? ""}
      </p>

      <h3>ไอเท็มบนเครื่องนี้</h3>
      {games.length === 0 ? (
        <p className="redeem-empty">ยังไม่มีไอเท็มบนเครื่องนี้</p>
      ) : (
        <ul className="redeem-list">
          {games.map(([id, items]) => (
            <li key={id}>
              <b>{gameById(id)?.name ?? id}</b>
              <ul>
                {Object.values(items).map((it) => (
                  <li key={it.key}>
                    {it.image_url?.startsWith("https://") && <img src={it.image_url} alt="" loading="lazy" />}
                    <span>
                      <strong>{it.name}</strong>
                      <small>
                        {ITEM_KIND[it.kind] ?? it.kind}
                        {it.description ? ` · ${it.description}` : ""}
                      </small>
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <p className="redeem-note">
        ไอเท็มเก็บไว้ในเบราว์เซอร์นี้ ใช้เครื่องหรือเบราว์เซอร์อื่นให้กรอกโค้ดเดิมอีกครั้ง (โค้ดหนึ่งใช้ได้ตามจำนวนเครื่องที่กำหนด)
      </p>
      <div className="redeem-links">
        <a href={MY_CODES_URL} target="_blank" rel="noopener">
          ดูโค้ดของฉันที่ XMAN Studio ↗
        </a>
        <a href={supportUrl()} target="_blank" rel="noopener">
          ร่วมสนับสนุนเกม ↗
        </a>
      </div>
    </div>
  );
}
