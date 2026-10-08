"use client";

import { useState } from "react";
import { futureShips } from "@/data/breaker-future";
import { crewSkills, masteryRanks } from "@/data/breaker-ranks";
import s from "./upgrade.module.css";

export default function UpgradeLab() {
  const [ship, setShip] = useState(0);
  const [path, setPath] = useState(0);
  const [crew, setCrew] = useState(0);
  const [rank, setRank] = useState(0);
  const selected = futureShips[ship];
  const pilot = crewSkills[crew];
  return (
    <div className={s.lab}>
      <div className={s.topline}>
        <span>HANGAR / BUILD LAB</span>
        <b>ต้นแบบหน้าจอ · ยังไม่บันทึกลงเกม</b>
      </div>
      <div className={s.shipTabs} aria-label="เลือกยานคอนเซปต์">
        {futureShips.map((x, i) => (
          <button
            key={x.name}
            type="button"
            aria-pressed={ship === i}
            onClick={() => {
              setShip(i);
              setPath(0);
            }}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className={s.buildGrid}>
        <div className={s.frame}>
          <span>FRAME / {selected.name}</span>
          <img
            src="/art/breaker/ship.webp"
            width={560}
            height={260}
            alt="ยาน BREAKER เดิม ใช้ประกอบหน้าจอต้นแบบ"
          />
          <small>ภาพยาน BREAKER จากเดโม ใช้ประกอบการร่างหน้าจอ</small>
          <h3>{selected.role}</h3>
          <p>{selected.skill}</p>
          <p className={s.cost}>{selected.cost}</p>
        </div>
        <div className={s.paths}>
          <span>เลือกสายสกิล / เปลี่ยนในโรงเก็บได้ฟรี</span>
          {selected.paths.map(([title, text], i) => (
            <button
              key={title}
              type="button"
              aria-pressed={path === i}
              onClick={() => setPath(i)}
            >
              <small>PATH {i === 0 ? "A" : "B"}</small>
              <strong>{title}</strong>
              <p>{text}</p>
              <b>{path === i ? "✓ เลือกสายนี้แล้ว" : "เลือกสายนี้ →"}</b>
            </button>
          ))}
          <p>
            จุดพักในภารกิจจะให้เลือก 1 จาก 3 การ์ดของสายที่ใช้
            บิลด์มีแต้มจำกัดและเริ่มใหม่ในรอบถัดไป
          </p>
        </div>
      </div>
      <div className={s.crewHeader}>
        <span>CREW MASTERY / คอนเซปต์สกิลตามยศ</span>
        <h3>ยานกำหนดวิธีบิน ตัวละครกำหนดวิธีพลิกเกม</h3>
        <p>
          เลือกตัวละครสนับสนุนหนึ่งคนต่อรอบ
          มิร่าและโนวาทำหน้าที่สนับสนุนเร็นผ่านระบบยาน
          ไม่จำเป็นต้องเปลี่ยนเนื้อเรื่องให้ทุกคนเป็นนักบิน
        </p>
      </div>
      <div className={s.crewTabs} aria-label="เลือกตัวละคร">
        {crewSkills.map((x, i) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={crew === i}
            onClick={() => setCrew(i)}
          >
            <img
              src={`/art/breaker/${x.portrait}`}
              alt=""
              width={70}
              height={85}
            />
            <span>
              {x.name}
              <small>{x.th}</small>
            </span>
          </button>
        ))}
      </div>
      <div className={s.rankTabs} aria-label="เลือกยศความชำนาญ">
        {masteryRanks.map((r, i) => (
          <button
            key={r.name}
            type="button"
            aria-pressed={rank === i}
            onClick={() => setRank(i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {r.name}
          </button>
        ))}
      </div>
      <div className={s.skillDetail} aria-live="polite">
        <div>
          <span>
            {pilot.name} / {masteryRanks[rank].name}
          </span>
          <h4>{pilot.skills[rank][0]}</h4>
          <p>{pilot.skills[rank][1]}</p>
        </div>
        <div>
          <b>{masteryRanks[rank].th}</b>
          <p>แนวทางปลด: {masteryRanks[rank].gate}</p>
          <small>{pilot.role}</small>
        </div>
      </div>
      <details className={s.allRanks}>
        <summary>ดูสกิลทุกยศของ {pilot.name}</summary>
        {masteryRanks.map((r, i) => (
          <div key={r.name}>
            <b>
              {r.name} / {r.th}
            </b>
            <span>{pilot.skills[i][0]}</span>
            <p>{pilot.skills[i][1]}</p>
          </div>
        ))}
      </details>
      <p className={s.notice}>
        ยศความชำนาญแยกจากอันดับ VS ยศสูงปลดตัวเลือก ไม่ได้เปิดทุกสกิลซ้อนกัน
        เลือกติดตั้งสกิลหลัก 1 และพรสวรรค์ 1 ภายใต้งบแต้มเดียวกัน ใน VS
        เปิดชุดแข่งขันมาตรฐานให้ทุกคน ไม่มีสกิลจากการบริจาค
        ตัวเลขและเงื่อนไขทั้งหมดต้องทดสอบสมดุลก่อนใช้จริง
      </p>
    </div>
  );
}
