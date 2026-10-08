import Link from "next/link";
import type { ReactNode } from "react";
import DonatePanel from "./DonatePanel";
import Lightbox from "./Lightbox";
import ShareCampaign from "./ShareCampaign";
import f from "./fund.module.css";
import s from "./breaker.module.css";
import { baht, fundPercent, type FundProject } from "@/data/fund";
import { breakerBudget, breakerFaq, breakerMissions, breakerRoadmap, breakerShots } from "@/data/fund-breaker";
import { thaiDate } from "@/lib/date";
import { futureShips, futureWeapons, futureArenas, futureQuests } from "@/data/breaker-future";

const PLAY = "https://xgameshub.xman4289.com/play/breaker/";
const ART = "/art/breaker/";

function Heading({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <header className={s.heading}><span className={s.eyebrow}>{label}</span><h2>{title}</h2>{children && <p>{children}</p>}</header>;
}

function Progress({ project: p }: { project: FundProject }) {
  const percent = fundPercent(p);
  return <div className={s.progress}>
    <div className={s.progressNumbers}><strong>฿{baht(p.raised)}</strong><span>จากเป้า ฿{baht(p.goal)}</span><b>{Math.floor(percent)}%</b></div>
    <div className={s.meter} role="progressbar" aria-label="ยอดสนับสนุน BREAKER" aria-valuemin={0} aria-valuemax={p.goal} aria-valuenow={Math.min(p.raised, p.goal)} aria-valuetext={`${baht(p.raised)} จาก ${baht(p.goal)} บาท`}><i style={{ width: `${percent}%` }} /></div>
    <div className={s.progressMeta}><span>{baht(p.backers)} ผู้สนับสนุน</span><span>อัปเดต {thaiDate(p.updated)}</span></div>
  </div>;
}

export default function BreakerFundPage({ project: p }: { project: FundProject }) {
  return <div className={`${f.fund} ${s.page}`}>
    <a className={f.skip} href="#support">ข้ามไปส่วนร่วมสนับสนุน</a>
    <header className={s.top}>
      <Link className={s.brand} href="/" aria-label="กลับ XMAN GAMES HUB"><img src="/art/logo-v2.webp" alt="XMAN GAMES HUB" width={130} height={54} /></Link>
      <nav aria-label="หัวข้อ X-NOVA BREAKER"><a href="#gameplay">เกมเพลย์จริง</a><a href="#missions">ด่านใหม่</a><a href="#fleet">ยาน / VS / เควส</a><a href="#roadmap">แผนพัฒนา</a><a href="#budget">การใช้ทุน</a></nav>
      <a href="#support" className={s.smallButton}>ร่วมสนับสนุน <span aria-hidden="true">↗</span></a>
    </header>
    <main className={s.main}>
      <section className={s.hero} aria-labelledby="breaker-title">
        <img className={s.heroImage} src={`${ART}argus.webp`} alt="การต่อสู้กับ ARGUS จากเดโมจริง" width={1572} height={884} fetchPriority="high" />
        <div className={s.heroShade} />
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <span className={s.live}><i /> PLAYABLE DEMO / เล่นได้แล้ว</span>
            <h1 id="breaker-title"><span>X-NOVA:</span> BREAKER</h1>
            <p className={s.tagline}>ปืนที่กำลังยิงคุณ<br /><em>กำลังจะเป็นของคุณ</em></p>
            <p className={s.lede}>ยิงจุดยึดให้หลุด ดึงอาวุธมาติดยาน แล้วดีดสวนกลับ<br className={s.desktopBreak} /> เกมยานยิง 2.5D ที่ให้คุณเปลี่ยนวิธีสู้กลางสนามรบ</p>
            <div className={s.actions}><a className={s.primary} href={PLAY} target="_blank" rel="noopener">▷ ลองเดโมฟรี</a><a className={s.secondary} href="#support">สนับสนุนภารกิจต่อไป ↗</a></div>
            <span className={s.platform}>คอมพิวเตอร์ · Chrome / Edge · คีย์บอร์ด / จอย</span>
          </div>
          <div className={s.heroLabel}><span className={s.liveDot} /> ACTUAL GAMEPLAY<span>ARGUS / KESSLER GRAVEYARD</span></div>
        </div>
        <div className={s.heroBottom}><span>STEAL. EQUIP. BREAK.</span><span>ภาพจับจากเดโมเว็บจริง · 07 OCT 2026</span><a href="#gameplay">สำรวจภารกิจ ↓</a></div>
      </section>

      <section className={s.fundStrip} aria-label="แคมเปญพัฒนาด่านใหม่">
        <div><span className={s.eyebrow}>NEXT MISSION / ภารกิจต่อไป</span><h2>เดโมคือจุดเริ่มต้น<br />สามโลกใหม่ รอให้เราบินไปด้วยกัน</h2></div>
        <div><Progress project={p} /><p className={s.note}>{p.promptpay.id ? "ยอดยืนยันโดยทีมหลังตรวจรายการโอน ไม่ใช่ยอดเรียลไทม์" : "ยังไม่เปิดรับโอน · กำลังเตรียมช่องทางพร้อมเพย์"}</p></div>
      </section>

      <section className={s.section} id="gameplay">
        <Heading label="01 / IN THE GAME" title="นี่คือเกมที่คุณลองเล่นได้ตอนนี้">ภาพทั้งหมดในแกลเลอรีนี้จับจากเดโมที่เปิดเล่นได้จริง คลิกเพื่อดูเต็มภาพ แล้วลองชิงอาวุธด้วยตัวเอง</Heading>
        <div className={s.stats}><div><b>3</b><span>อุปกรณ์ที่ชิงได้</span></div><div><b>2</b><span>เส้นทางให้เลือก</span></div><div><b>3</b><span>เฟสของบอส ARGUS</span></div><div><b>6–8 <small>นาที</small></b><span>เดโมพร้อมเนื้อเรื่อง</span></div></div>
        <div className={s.gallery}>{breakerShots.map((shot, i) => <figure key={shot.src}>
          <button type="button" data-zoom={shot.src} data-alt={shot.alt} data-kind="ภาพจากเดโมจริง" aria-label={`ขยายภาพ: ${shot.alt}`}><img src={shot.src} alt={shot.alt} width={1572} height={884} loading="lazy" decoding="async" /><span className={s.shotTag}>● ภาพจากเดโมจริง</span><span className={s.zoomMark} aria-hidden="true">↗</span></button>
          <figcaption><span className={s.shotNumber}>0{i + 1}</span><div><h3>{shot.title}</h3><p>{shot.text}</p></div></figcaption>
        </figure>)}</div>
        <div className={s.loop}>{[
          ["BREAK", "ยิงให้หลุด", "เล็งจุดยึด แยกอุปกรณ์ก่อนศัตรูระเบิด"],
          ["CAPTURE", "ดึงมาติด", "เลือกเติมหนึ่งในสามช่องบนตัวยาน"],
          ["OVERHEAT", "ใช้ให้คุ้ม", "บริหารความร้อนและพลังงานระหว่างยิง"],
          ["EJECT", "ดีดสวนกลับ", "เปลี่ยนของร้อนเป็นกระสุนหนักทุบแกนบอส"],
        ].map(([en, th, text], i) => <article key={en}><span>0{i + 1} / {en}</span><h3>{th}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={s.arsenal} aria-labelledby="arsenal-title"><div className={s.sectionInner}>
        <span className={s.eyebrow}>SALVAGE LOADOUT / มีในเดโมแล้ว</span><h2 id="arsenal-title">ทุกชิ้นที่ชิงมา<br /><em>เปลี่ยนวิธีเอาตัวรอด</em></h2>
        <div className={s.moduleGrid}>{[
          ["m_shield.webp", "REFLECTOR", "โล่สะท้อน", "รับกระสุนและลำแสงบอส เก็บไว้ป้องกัน หรือสละเพื่อเปิดช่องโจมตี"],
          ["m_rail.webp", "RAILGUN", "ปืนเจาะเกราะ", "ยิงทะลุแนวศัตรู ต้องเลือกจังหวะใช้พลังงานและระบายความร้อน"],
          ["m_drone.webp", "ARC DRONE", "โดรนสายฟ้า", "ช็อตเป้าหมายต่อเนื่อง เติมบทบาทให้ยานเมื่อรับมือฝูงศัตรู"],
        ].map(([img, en, th, text]) => <article key={en}><img src={ART + img} alt={th} width={300} height={200} loading="lazy" /><span>{en}</span><h3>{th}</h3><p>{text}</p></article>)}</div>
        <p className={s.note}>ภาพอุปกรณ์เป็นแอสเซ็ตที่ใช้ในเดโม · เมื่อเกจเต็ม กด Space เพื่อปล่อยท่า NOVA BREAKER</p>
      </div></section>

      <section className={s.section} id="story">
        <div className={s.storyGrid}><div><Heading label="AFTER ARGUS / เนื้อเรื่องที่อยากพาไปต่อ" title="สุสานเคสเลอร์ ยังมีสัญญาณอีกสาย" />
          <p>ปี 2189 เร็นบินเข้าสู่สุสานกองเรือรบจักรกล โดยมีมิร่าคอยนำทางและโนวาเป็น AI ประจำยาน นี่คือจุดเริ่มต้นที่เล่นได้แล้วในเดโม</p>
          <p>บทถัดไปที่เสนอ: หลังเอาชนะ ARGUS โนวาถอดรหัสสัญญาณที่ชี้ไปยังโรงหลอม สถานีไอออน และเรือบัญชาการใกล้รอยแยก ทุกภารกิจเผยว่ากองเรือที่ควรตายไปแล้วกำลังสร้างอะไรขึ้นมาใหม่</p><span className={s.planBadge}>เนื้อเรื่องบทถัดไป / อยู่ในแผน</span>
        </div><div className={s.crew}>{[
          ["ren_1.webp", "REN", "นักบินผู้เปลี่ยนซากให้เป็นอาวุธ"], ["nova_face.webp", "NOVA", "AI คู่หูและพลัง NOVA BREAKER"], ["mira_1.webp", "MIRA", "เสียงนำทางที่ไม่ทิ้งคุณกลางศึก"],
        ].map(([img, name, text]) => <figure key={name}><img src={ART + img} alt={name} width={250} height={330} loading="lazy" /><figcaption><b>{name}</b><span>{text}</span></figcaption></figure>)}</div></div>
        <p className={s.note}>ภาพตัวละครจากแอสเซ็ตเดโม · เดโมมีเสียงพากย์ญี่ปุ่นและซับไทย</p>
      </section>

      <section className={`${s.section} ${s.missions}`} id="missions">
        <Heading label="02 / EXPANSION CONCEPT" title="สามด่านใหม่ สามวิธีพลิกเกม">ทุกด่านต่อยอดการชิงอุปกรณ์ให้ใช้กับสภาพแวดล้อมได้ด้วย รายการด้านล่างเป็นคอนเซปต์ ยังไม่เปิดเล่น และจะทำทีละด่านตามผลทดสอบ</Heading>
        <div className={s.missionList}>{breakerMissions.map((m) => <article key={m.id} className={s.mission} data-accent={m.accent}>
          <div className={s.missionBrief}><span className={s.eyebrow}>MISSION {m.id} <i>อยู่ในแผน</i></span><h3>{m.name}</h3><span className={s.missionThai}>{m.th}</span><p className={s.missionHook}>{m.hook}</p><p>{m.description}</p>
            <ol className={s.routeMap} aria-label={`เส้นทางคอนเซปต์ ${m.name}`}>{m.route.map((r, i) => <li key={r}><span>{i + 1}</span>{r}</li>)}</ol>
          </div>
          <div className={s.missionSystems}><dl><div><dt>จังหวะการเล่น</dt><dd>{m.mechanic}</dd></div><div><dt>อุปกรณ์ที่อยากให้ชิงได้</dt><dd>{m.module}</dd></div><div><dt>บอสประจำด่าน</dt><dd>{m.boss}</dd></div></dl><details><summary>สิ่งที่ต้องพิสูจน์ในต้นแบบ</summary><p>{m.test}</p></details></div>
        </article>)}</div>
      </section>

      <section className={`${s.section} ${s.future}`} id="fleet">
        <Heading label="BEYOND THE EXPANSION / แนวคิดระยะถัดไป" title="เลือกยาน แล้วสร้างวิธีสู้ของคุณ">สี่ยานใหม่ที่เปลี่ยนวิธีเล่น พร้อมสองสายเฉพาะลำ BREAKER เดิมยังเป็นยานเริ่มต้นสำหรับสายชิงอาวุธที่สมดุล</Heading>
        <p className={s.conceptNotice}>ยาน อาวุธทดลอง VS อันดับออนไลน์ และเควสด้านล่างยังไม่มีในเดโม เป็นแนวทางขยายหลังสามด่านหลัก ต้องประเมินต้นแบบ เวลา และงบเพิ่มเติม ไม่ใช่รายการที่รับประกันว่าจะส่งทั้งหมดด้วยทุน 150,000 บาท</p>
        <div className={`${s.futureGrid} ${s.fleetGrid}`}>{futureShips.map((ship, i) => <article className={s.futureCard} key={ship.name}><span className={s.eyebrow}>FRAME 0{i + 2} / CONCEPT</span><h3>{ship.name}</h3><strong>{ship.role}</strong><p>{ship.skill}</p><div className={s.upgradeChoices}>{ship.paths.map(([name, text]) => <div key={name}><b>{name}</b><p>{text}</p></div>)}</div><p className={s.tradeoff}>{ship.cost}</p></article>)}</div>
        <div className={s.scoreRules}><div><h3>เลือกอัปเกรดระหว่างภารกิจ</h3><p>ที่จุดพัก เลือก 1 จาก 3 การ์ดของยานลำนั้น สาย A หรือ B เปลี่ยนสกิลหลัก ส่วนการ์ดทั่วไปช่วยเรื่องความร้อน พลังงาน และการชิงอุปกรณ์ ทดลองผสมได้ภายในแต้มที่กำหนด</p></div><div><h3>ปลดทางเลือก ไม่สะสมความได้เปรียบ</h3><p>กลับโรงเก็บแล้วเปลี่ยนสายได้ฟรี การปลดถาวรเพิ่มทางเลือกการเล่น สำหรับ VS ใช้แต้มจัดยานเท่ากันและชุดตัวเลือกมาตรฐาน ไม่มีพลังพิเศษจากการบริจาค</p></div></div>
      </section>

      <section className={s.section} id="new-weapons"><Heading label="EXPERIMENTAL ARSENAL / คอนเซปต์อาวุธ" title="อาวุธที่ให้คิด มากกว่ากดยิง">หกแนวทางทดลอง ทุกชิ้นมีจังหวะใช้และข้อแลกเปลี่ยน เริ่มทดสอบทีละชิ้นให้เข้ากับระบบชิงอาวุธเดิม</Heading><div className={s.futureGrid}>{futureWeapons.map((w) => <article className={s.futureCard} key={w.name}><h3>{w.name}</h3><strong>{w.th}</strong><p>{w.action}</p><p className={s.tradeoff}>{w.limit}</p></article>)}</div></section>

      <section className={s.section} id="versus"><Heading label="RIVALS / VS & RANKINGS · อยู่ในแผน" title="สนามเดียวกัน ใครพลิกเกมได้ดีกว่า">เริ่มจากแข่งคะแนนและเวลากับเงารีเพลย์ ก่อนพิจารณาการต่อสู้ออนไลน์พร้อมกัน เพื่อพิสูจน์ว่ากติกาสนุกและยุติธรรม</Heading><div className={s.futureGrid}>{futureArenas.map((a) => <article className={s.futureCard} key={a.name}><span className={s.eyebrow}>{a.mode}</span><h3>{a.name}</h3><p>{a.text}</p><p className={s.tradeoff}>{a.rule}</p></article>)}</div>
        <div className={s.scoreRules}><div><h3>บอร์ดอันดับที่เทียบกันได้</h3><ul><li>แยก SCORE, TIME ATTACK และอันดับเพื่อน</li><li>แบ่งตามด่าน เวอร์ชัน ความยาก และกติกาประจำสัปดาห์</li><li>คะแนนเสนอ: จบด่าน + ทำลายจุดยึด + ชิงแล้วดีดใช้จริง + โบนัสต่อเนื่อง จำกัดการฟาร์มซ้ำ</li><li>คะแนนเท่ากันใช้เวลา แล้วใช้ความเสียหายที่ได้รับตัดสิน</li></ul></div><div><h3>ผลที่ตรวจสอบได้ก่อนขึ้นอันดับ</h3><p>เดโมปัจจุบันมีคะแนนในเครื่อง ยังไม่มีอันดับออนไลน์ บอร์ดจริงจะรับเฉพาะรอบที่ตรวจเหตุการณ์หรือรีเพลย์ได้ ใช้ด่านสุ่มชุดเดียวกัน และแยกโหมดฝึก จุดเซฟ และโหมดทดสอบออกจากรอบจัดอันดับ</p></div></div>
      </section>

      <section className={s.section} id="quests"><Heading label="MISSION BOARD / เควสที่วางแผนไว้" title="กลับมาบิน เพราะมีอะไรให้ลอง">เควสชวนเปลี่ยนวิธีเล่น เลือกงานที่ชอบและสะสมข้ามรอบได้ รางวัลเน้นสี ลวดลาย ตรานักบิน และเนื้อเรื่อง</Heading><div className={s.questList}>{futureQuests.map((q) => <article className={s.futureCard} key={q.title}><h3>{q.title}</h3><strong>{q.time}</strong><ul>{q.examples.map(x => <li key={x}>{x}</li>)}</ul><p className={s.tradeoff}>{q.reward}</p></article>)}</div><p className={s.conceptNotice}>กติกาที่เสนอ: เปลี่ยนงานเวลา 05:00 น. ตามเวลาไทย / สัปดาห์ใหม่วันจันทร์ / เดือนใหม่วันที่ 1 ยึดเวลาระบบกลางเมื่อออนไลน์ ไม่มีโทษจากการขาดวัน ไม่บังคับชนะ VS และมีทางเก็บของตกแต่งย้อนหลัง</p></section>

      <section className={`${s.section} ${s.roadmapSection}`} id="roadmap"><Heading label="03 / FLIGHT PLAN" title="ทำให้จบด่าน แล้วค่อยไปต่อ">ทุกช่วงต้องมีตัวเกมให้ทดสอบ เริ่มจากปรับเดโมปัจจุบัน แล้วพิสูจน์ด่านใหม่หนึ่งด่านก่อนขยายอีกสองธีม</Heading>
        <ol className={s.roadmap}>{breakerRoadmap.map((r, i) => <li key={r.title} data-state={r.state}><span className={s.phaseNumber}>{r.state === "done" ? "✓" : `0${i}`}</span><div><span className={s.eyebrow}>{r.label}</span><h3>{r.title}</h3><p>{r.text}</p></div></li>)}</ol>
        <p className={s.note}>กรอบเวลาเป็นประมาณการต่อช่วง เมื่อมีผู้ดูแลงานหลัก 15–25 ชั่วโมงต่อสัปดาห์ร่วมกับผู้ช่วย AI ขึ้นกับทุนและผลทดสอบ ไม่ใช่วันส่งที่รับประกัน</p>
        <p className={s.conceptNotice}>หลังรุ่นขยาย: ทดสอบยานใหม่ 1 ลำกับอาวุธ 2 ชิ้น → ระบบเลือกอัปเกรดและเควสในเครื่อง → แข่งกับรีเพลย์และอันดับที่ตรวจผลได้ → ทดลอง 1v1 ออนไลน์ แต่ละช่วงจะประเมินงบและประกาศขอบเขตก่อนเริ่ม</p>
      </section>

      <section className={s.section} id="budget"><Heading label="04 / WHERE SUPPORT GOES" title={`เป้า ฿${baht(p.goal)} ใช้สร้างอะไร`}>แผนจัดสรรเบื้องต้นสำหรับรุ่นขยายสามด่าน เงินสนับสนุนรวมเป็นทุนโครงการและจัดลำดับตามงานที่ต้องทำจริง</Heading>
        <div className={s.budgetGrid}><div className={s.budgetSummary}><span>EXPANSION FUND</span><strong>฿{baht(p.goal)}</strong><p>จากเดโมหนึ่งภารกิจ<br />สู่แคมเปญที่มีโลกให้สำรวจมากขึ้น</p><a className={s.primary} href="#support">ร่วมเป็นแรงส่ง ↗</a></div><ul className={s.budgetList}>{breakerBudget.map((b) => <li key={b.name}><div><b>{b.name}</b><span>฿{baht(b.amount)}</span></div><p>{b.text}</p><div className={s.budgetBar} aria-hidden="true"><i style={{ width: `${b.amount / p.goal * 100}%` }} /></div></li>)}</ul></div>
        <p className={s.note}>เป็นแผนจัดสรร ไม่ใช่ยอดใช้จ่ายแล้ว หากขอบเขตหรือลำดับเปลี่ยน ทีมจะอัปเดตพร้อมบันทึกการพัฒนา</p>
      </section>

      <section className={`${s.section} ${s.support}`} id="support"><Heading label="05 / JOIN THE CREW" title="เติมพลังให้ภารกิจถัดไป">เดโมเปิดให้ทุกคนลองฟรี การสนับสนุนเป็นความสมัครใจ ทุกระดับช่วยพัฒนาเกมเดียวกัน และไม่มีโบนัสพลังให้ผู้จ่ายเงิน</Heading>
        <div className={s.supportIntro}><Progress project={p} /><p>{p.promptpay.id ? "เลือกระดับหรือใส่ยอดเอง แล้วตรวจชื่อผู้รับในแอปธนาคารก่อนยืนยัน" : "ยังไม่เปิดรับโอน: เลือกดูระดับการสนับสนุนได้ ระบบจะแสดง QR เมื่อยืนยันช่องทางรับเงินแล้ว"}</p></div>
        <DonatePanel tiers={p.tiers} promptpay={p.promptpay} contact={p.contact} project={p.page.title} customNote="แสดงชื่อได้ตามความสมัครใจ ทุกระดับไม่มีโบนัสพลัง" />
        <p className={s.note}>ยอดบนหน้านี้อัปเดตหลังทีมตรวจรายการโอน กรุณาระบุชื่อเกม X-NOVA: BREAKER เพื่อแยกยอดจากโครงการอื่น</p>
        {p.supporters.length > 0 && <div className={s.supporters}><h3>ทีมสนับสนุนภารกิจ</h3><ul>{p.supporters.map((n) => <li key={n}>{n}</li>)}</ul></div>}
        <div className={s.shareRow}><div><b>ส่งต่อให้เพื่อนร่วมฝูงบิน</b><p>การลองเดโมและแชร์ก็ช่วยให้เกมไปต่อได้</p></div><ShareCampaign /></div>
      </section>

      <section className={s.section} id="faq"><Heading label="MISSION BRIEF / FAQ" title="ก่อนออกบินด้วยกัน" /><div className={s.faq}>{breakerFaq.map((x) => <details key={x.q}><summary>{x.q}<span aria-hidden="true">＋</span></summary><p>{x.a}</p></details>)}</div></section>
      <section className={s.lastCall}><span className={s.eyebrow}>YOUR NEXT WEAPON IS OUT THERE.</span><h2>ลองหนึ่งรอบ<br /><em>แล้วบอกเราว่าอยากบินไปไหนต่อ</em></h2><div className={s.actions}><a className={s.primary} href={PLAY} target="_blank" rel="noopener">▷ เล่นเดโมตอนนี้</a><a className={s.secondary} href="https://xman4289.com/contact" target="_blank" rel="noopener">ส่งความคิดเห็น ↗</a></div></section>
    </main>
    <footer className={s.footer}><p>ภาพเกมเพลย์จับจากเดโมเว็บจริง · ภาพตัวละครและอุปกรณ์เป็นแอสเซ็ตในเดโม · สามด่านใหม่เป็นแผนพัฒนา</p><div><span>© 2026 XMAN STUDIO / X-NOVA: BREAKER</span><Link href="/">← กลับ XMAN GAMES HUB</Link></div></footer>
    <Lightbox />
  </div>;
}
