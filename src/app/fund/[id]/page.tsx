import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommunitySupport, { LiveFunding } from "@/components/fund/CommunitySupport";
import HeroVideo from "@/components/fund/HeroVideo";
import Lightbox from "@/components/fund/Lightbox";
import BreakerFundPage from "@/components/fund/BreakerFundPage";
import s from "@/components/fund/fund.module.css";
import type { FundImage } from "@/data/fund-hive-breach";
import { fundById, fundHref, fundProjects, type FundProject } from "@/data/fund";
import { promptPayTarget } from "@/lib/promptpay";

// static export: only the projects listed in src/data/fund.ts get a page
export const dynamicParams = false;

export function generateStaticParams() {
  return fundProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: PageProps<"/fund/[id]">): Promise<Metadata> {
  const p = fundById((await props.params).id);
  if (!p) return {};
  const title = `${p.page.title} — ${p.page.kicker} | XMAN GAMES HUB`;
  const description = p.page.lede;
  return {
    title,
    description,
    alternates: { canonical: fundHref(p) },
    openGraph: {
      title,
      description,
      url: fundHref(p),
      siteName: "XMAN GAMES HUB",
      locale: "th_TH",
      type: "website",
      images: [{ url: p.page.og, width: 1200, height: 630, alt: p.page.title }],
    },
    twitter: { card: "summary_large_image", images: [p.page.og] },
  };
}

const NAV = [
  ["concept", "คอนเซปต์"],
  ["story", "เนื้อเรื่อง"],
  ["gameplay", "เกมเพลย์"],
  ["world", "โลก"],
  ["characters", "ตัวละคร"],
  ["sales", "แนวการขาย"],
  ["roadmap", "Roadmap"],
  ["budget", "งบ"],
  ["faq", "FAQ"],
] as const;

const STATE_LABEL = { done: "เสร็จแล้ว", next: "ขั้นถัดไป", planned: "ในแผน" } as const;

function Shot({ img, big, className }: { img: FundImage; big?: boolean; className?: string }) {
  return (
    <figure className={`${s.shot}${className ? ` ${className}` : ""}`}>
      <button type="button" className={s.zoom} data-zoom={img.src} data-alt={img.alt} aria-label={`ขยายภาพ: ${img.alt}`}>
        <img src={img.src} alt={img.alt} width={big ? 1120 : 960} height={big ? 630 : 540} loading="lazy" decoding="async" />
        <span className={s.conceptTag}>ภาพคอนเซปต์</span>
      </button>
      {img.caption && <figcaption>{img.caption}</figcaption>}
    </figure>
  );
}

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className={s.head}>
      <span className={s.eyebrow}>{eyebrow}</span>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </header>
  );
}

function Progress({ p }: { p: FundProject; large?: boolean }) { return <LiveFunding slug={p.id} goal={p.goal} />; }

export default async function FundPage(props: PageProps<"/fund/[id]">) {
  const p = fundById((await props.params).id);
  if (!p) notFound();
  // a typo in the PromptPay number should stop the build, not ship a QR that pays nobody
  if (p.promptpay.id && !promptPayTarget(p.promptpay.id)) {
    throw new Error(`fund "${p.id}": promptpay.id must be a mobile number, a national/tax ID or an e-wallet ID`);
  }
  const page = p.page;
  if ("layout" in page) return <BreakerFundPage project={p} />;

  return (
    <div className={s.fund}>
      <a className={s.skip} href="#support">
        ข้ามไปส่วนร่วมสนับสนุน
      </a>

      <header className={s.top}>
        <Link href="/" className={s.back} aria-label="กลับไปที่ XMAN GAMES HUB">
          <span aria-hidden="true">←</span>
          <img src="/art/logo-v2.webp" alt="" width={760} height={314} />
        </Link>
        <nav className={s.nav} aria-label="หัวข้อในหน้านี้">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <a className={`${s.btn} ${s.btnFund} ${s.btnSmall}`} href="#support">
          ร่วมสนับสนุน
        </a>
      </header>

      <main className={s.main}>
        <section className={s.hero} aria-labelledby="fund-title">
          {page.video ? (
            <HeroVideo poster={page.hero} sources={page.video.sources} label={page.video.label} />
          ) : (
            <img className={s.heroArt} src={page.hero} alt="" width={1920} height={1080} fetchPriority="high" />
          )}
          <div className={s.heroShade} aria-hidden="true" />
          <span className={`${s.conceptTag} ${s.heroTag}`}>
            {page.video ? "ภาพเคลื่อนไหวคอนเซปต์" : "ภาพคอนเซปต์"} · ไม่ใช่ภาพจากเกมจริง
          </span>
          <div className={s.heroInner}>
            <div className={s.heroCopy}>
              <span className={s.kicker}>
                <i aria-hidden="true">★</i> {page.kicker}
              </span>
              <h1 id="fund-title">
                <img src={page.logo} alt={page.title} width={900} height={320} />
              </h1>
              <p className={s.tagline}>{page.tagline}</p>
              <p className={s.lede}>{page.lede}</p>
              <ul className={s.facts}>
                {page.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className={s.actions}>
                <a className={`${s.btn} ${s.btnFund}`} href="#support">
                  ร่วมสนับสนุน <span aria-hidden="true">→</span>
                </a>
                <a className={`${s.btn} ${s.btnGhost}`} href="#gameplay">
                  ดูเกมเพลย์
                </a>
              </div>
            </div>
            <aside className={s.heroFund} aria-label="ความคืบหน้าการระดมทุน">
              <span className={s.eyebrow}>เป้าระดมทุน</span>
              <Progress p={p} large />
              <a className={`${s.btn} ${s.btnFund} ${s.btnBlock}`} href="#support">
                เลือกระดับการสนับสนุน
              </a>
            </aside>
          </div>
        </section>

        <p className={s.status}>
          <b>สถานะโปรเจกต์</b>
          {page.status}
        </p>

        <section id="concept" className={s.section} aria-labelledby="concept-title">
          <SectionHead id="concept" eyebrow="CONCEPT · คอนเซปต์" title={page.concept.title} />
          <div className={s.split}>
            <div className={s.prose}>
              {page.concept.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <Shot img={page.concept.image} big />
          </div>
          <ul className={s.pillars}>
            {page.concept.pillars.map((x, i) => (
              <li key={x.title}>
                <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                <b>{x.title}</b>
                <p>{x.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="story" className={s.section} aria-labelledby="story-title">
          <SectionHead id="story" eyebrow="STORY · เนื้อเรื่อง" title={page.story.title} />
          <div className={`${s.split} ${s.splitFlip}`}>
            <Shot img={page.story.image} big />
            <div className={s.prose}>
              {page.story.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <blockquote className={s.quote}>
                <p>“{page.story.quote.th}”</p>
                <p lang="en">{page.story.quote.en}</p>
                <cite>{page.story.quote.source}</cite>
              </blockquote>
            </div>
          </div>
          <div className={s.campaigns}>
            {page.story.campaigns.map((c) => (
              <article key={c.name} className={s.panel}>
                <span className={s.eyebrow}>{c.side}</span>
                <h3>{c.name}</h3>
                <p className={s.muted}>{c.text}</p>
                <ol className={s.steps}>
                  {c.steps.map((st) => (
                    <li key={st.name}>
                      <b>{st.name}</b>
                      <span>{st.text}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className={s.cinema} aria-labelledby="cinema-title">
          <div className={s.cinemaHead}>
            <span className={s.eyebrow}>THEME SONG · MV</span>
            <h2 id="cinema-title">{page.cinematic.title}</h2>
            <p>{page.cinematic.text}</p>
          </div>
          <ul className={s.film}>
            {page.cinematic.shots.map((img) => (
              <li key={img.src}>
                <Shot img={img} />
              </li>
            ))}
          </ul>
        </section>

        <section id="gameplay" className={s.section} aria-labelledby="gameplay-title">
          <SectionHead id="gameplay" eyebrow="GAMEPLAY · เกมเพลย์" title={page.gameplay.title} />
          <div className={s.sides}>
            {page.gameplay.sides.map((side) => (
              <article key={side.name} className={s.side}>
                <Shot img={side.image} />
                <div className={s.sideBody}>
                  <span className={s.eyebrow}>{side.mode}</span>
                  <h3>{side.name}</h3>
                  <ul className={s.ticks}>
                    {side.points.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
            <span className={s.versus} aria-hidden="true">
              VS
            </span>
          </div>

          <div className={s.match}>
            <div className={s.panel}>
              <span className={s.eyebrow}>หนึ่งแมตช์ · ประมาณ 15 นาที</span>
              <ol className={s.flow}>
                {page.gameplay.flow.map((f) => (
                  <li key={f.phase}>
                    <b>{f.phase}</b>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ol>
              <p className={s.small}>เวลาและตัวเลขในแมตช์เป็นค่าตั้งต้น จะปรับตามผลทดสอบเล่น</p>
            </div>
            <div className={s.wins}>
              {page.gameplay.win.map((w) => (
                <div key={w.side} className={s.panel}>
                  <b>{w.side}</b>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className={s.subhead}>ระบบเด่น</h3>
          <div className={s.systems}>
            {page.gameplay.systems.map((x) => (
              <article key={x.title} className={s.system}>
                <Shot img={x.image} />
                <div>
                  <h4>{x.title}</h4>
                  <p>{x.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="world" className={s.section} aria-labelledby="world-title">
          <SectionHead id="world" eyebrow="WORLD · โลก" title={page.world.title}>
            <p>{page.world.intro}</p>
          </SectionHead>
          <div className={s.maps}>
            {page.world.maps.map((m) => (
              <article key={m.name} className={s.map}>
                <Shot img={m.image} />
                <h3>{m.name}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>

          <h3 className={s.subhead}>ผู้พิทักษ์สองเผ่า</h3>
          <div className={s.split}>
            <div className={s.origins}>
              {page.world.origins.map((o) => (
                <div key={o.name} className={s.panel}>
                  <b className={s.originName}>{o.name}</b>
                  <p>{o.text}</p>
                </div>
              ))}
            </div>
            <Shot img={page.world.originsImage} />
          </div>

          <h3 className={s.subhead}>เผ่าเอเลี่ยน</h3>
          <div className={s.factions}>
            {page.world.factions.map((f) => (
              <article key={f.name} className={s.faction}>
                <Shot img={f.image} />
                <div className={s.factionBody}>
                  <span className={s.eyebrow}>{f.kind}</span>
                  <h4>{f.name}</h4>
                  <p>{f.text}</p>
                  <dl>
                    <div>
                      <dt>ทรัพยากร</dt>
                      <dd>{f.economy}</dd>
                    </div>
                    <div>
                      <dt>ยูนิต</dt>
                      <dd>{f.units.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>อาคาร</dt>
                      <dd>{f.buildings.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>คอมมานเดอร์</dt>
                      <dd>{f.commanders}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="characters" className={s.section} aria-labelledby="characters-title">
          <SectionHead id="characters" eyebrow="CHARACTERS · ตัวละคร" title={page.characters.title} />
          <h3 className={s.subhead}>CORE GUARDIANS · ฝ่ายผู้พิทักษ์</h3>
          <ul className={s.roster}>
            {page.characters.guardians.map((c) => (
              <li key={c.name} className={s.hero8}>
                <div className={s.portrait}>
                  <img src={c.image} alt={`${c.name} ${c.role}`} width={600} height={560} loading="lazy" decoding="async" />
                </div>
                <div className={s.heroBody}>
                  <span className={s.side8}>
                    {c.side} · {c.role}
                  </span>
                  <h4>{c.name}</h4>
                  <p>{c.text}</p>
                  {c.lines && (
                    <ul className={s.lines} aria-label="สายสกิล">
                      {c.lines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                  {c.paths && (
                    <span className={s.paths}>
                      อาชีพขั้นสูง: <b>{c.paths}</b>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <h3 className={s.subhead}>ALIEN COMMANDERS · คอมมานเดอร์</h3>
          <ul className={`${s.roster} ${s.rosterCmd}`}>
            {page.characters.commanders.map((c) => (
              <li key={c.name} className={s.hero8} data-race={c.side}>
                <div className={s.portrait}>
                  <img src={c.image} alt={`${c.name} คอมมานเดอร์ ${c.side}`} width={600} height={560} loading="lazy" decoding="async" />
                </div>
                <div className={s.heroBody}>
                  <span className={s.side8}>
                    {c.side} · {c.role}
                  </span>
                  <h4>{c.name}</h4>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={s.small}>{page.characters.note} · ภาพตัวละครทั้งหมดเป็นภาพคอนเซปต์</p>
        </section>

        <section id="sales" className={s.section} aria-labelledby="sales-title">
          <SectionHead id="sales" eyebrow="BUSINESS · แนวการขาย" title={page.sales.title}>
            <p>{page.sales.intro}</p>
          </SectionHead>
          <div className={s.split}>
            <ul className={s.salesList}>
              {page.sales.points.map((x) => (
                <li key={x.title}>
                  <b>{x.title}</b>
                  <p>{x.text}</p>
                </li>
              ))}
            </ul>
            <div>
              <Shot img={page.sales.image} />
              <p className={s.small}>{page.sales.note}</p>
            </div>
          </div>
        </section>

        <section id="roadmap" className={s.section} aria-labelledby="roadmap-title">
          <SectionHead id="roadmap" eyebrow="ROADMAP" title={page.roadmap.title}>
            <p>{page.roadmap.intro}</p>
          </SectionHead>
          <ol className={s.roadmap}>
            {page.roadmap.phases.map((ph) => (
              <li key={ph.title} data-state={ph.state}>
                <span className={s.dot} aria-hidden="true" />
                <div className={s.phaseHead}>
                  <span className={s.when}>{ph.when}</span>
                  <span className={s.state}>{STATE_LABEL[ph.state]}</span>
                </div>
                <h3>{ph.title}</h3>
                <ul>
                  {ph.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="budget" className={s.section} aria-labelledby="budget-title">
          <SectionHead id="budget" eyebrow="BUDGET · งบ" title={page.budget.title}>
            <p>{page.budget.intro}</p>
          </SectionHead>
          <div className={s.budget}>
            <div className={s.panel}>
              <div className={s.freeHead}>
                <span className={s.eyebrow}>เครื่องมือหลัก</span>
                <b>฿0</b>
              </div>
              <ul className={s.freeList}>
                {page.budget.free.map((x) => (
                  <li key={x.name}>
                    <b>{x.name}</b>
                    <span>{x.use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className={s.spend}>
              {page.budget.spend.map((x) => (
                <li key={x.title} className={s.panel}>
                  <b>{x.title}</b>
                  <p>{x.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className={s.small}>{page.budget.note}</p>
        </section>

        <section id="support" className={`${s.section} ${s.support}`} aria-labelledby="support-title">
          <SectionHead id="support" eyebrow="SUPPORT · ร่วมสนับสนุน" title={`ร่วมสร้าง ${page.title}`}>
            <p>เลือกยอด โอนเข้าบัญชีบริษัท แล้วแนบสลิปพร้อมคำแนะนำในศูนย์สนับสนุน XMAN Studio</p>
          </SectionHead>
          <Progress p={p} large />
          <CommunitySupport slug={p.id} />
          {p.supporters.length > 0 && (
            <div className={s.wall}>
              <h3 className={s.subhead}>กำแพงผู้สนับสนุน</h3>
              <ul>
                {p.supporters.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section id="faq" className={s.section} aria-labelledby="faq-title">
          <SectionHead id="faq" eyebrow="FAQ" title="คำถามที่พบบ่อย" />
          <div className={s.faqWrap}>
            <div className={s.faq}>
              {page.faq.map((x) => (
                <details key={x.q}>
                  <summary>{x.q}</summary>
                  <p>{x.a}</p>
                </details>
              ))}
            </div>
            <aside className={s.closing}>
              <img src={page.logo} alt="" width={900} height={320} loading="lazy" decoding="async" />
              <h3>{page.closing.title}</h3>
              <p>{page.closing.text}</p>
              <a className={`${s.btn} ${s.btnFund} ${s.btnBlock}`} href="#support">
                ร่วมสนับสนุน <span aria-hidden="true">→</span>
              </a>
              <Link className={`${s.btn} ${s.btnGhost} ${s.btnBlock}`} href="/">
                กลับไปที่ XMAN GAMES HUB
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p>
          ภาพทั้งหมดในหน้านี้เป็นภาพคอนเซปต์และภาพจาก MV ไม่ใช่ภาพจากเกมจริง ชื่อ ตัวเลข และกรอบเวลาเป็นข้อมูลจากเอกสารออกแบบ
          ซึ่งอาจเปลี่ยนตามผลการพัฒนาและทดสอบเล่น
        </p>
        <div className={s.footRow}>
          <span>© 2026 XMAN STUDIO</span>
          <Link href="/">← กลับไปที่ XMAN GAMES HUB</Link>
        </div>
      </footer>

      <Lightbox />
    </div>
  );
}
