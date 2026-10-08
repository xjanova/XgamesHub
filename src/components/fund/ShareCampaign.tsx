"use client";

import { useState } from "react";
import s from "./breaker.module.css";

export default function ShareCampaign() {
  const [status, setStatus] = useState("");
  const [fallback, setFallback] = useState(false);
  const url = "https://xgameshub.xman4289.com/fund/breaker/";
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setFallback(false);
      setStatus("คัดลอกลิงก์แล้ว");
    } catch {
      setFallback(true);
      setStatus("เลือกและคัดลอกลิงก์ด้านล่างได้เลย");
    }
  }
  return <div className={s.shareControl}><button className={s.secondary} type="button" onClick={copy}>คัดลอกลิงก์แคมเปญ ↗</button><span role="status">{status}</span>{fallback && <input aria-label="ลิงก์แคมเปญสำหรับคัดลอก" readOnly value={url} onFocus={(e) => e.target.select()} />}</div>;
}
