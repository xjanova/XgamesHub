import { useEffect, useRef } from "react";
import { baht, fundHref, fundPercent, mainProject, type FundProject } from "@/data/fund";
import { gameById } from "@/data/games";
import { useMotion } from "@/lib/prefs";

const pct = (n: number) => (n > 0 && n < 1 ? n.toFixed(1) : String(Math.floor(n)));

/** The reveal footage in miniature; it follows the hub's Motion switch and never downloads while Motion is off. */
function BannerArt({ poster }: { poster: string }) {
  const motion = useMotion();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (motion) v.play().catch(() => {});
    else v.pause();
  }, [motion]);
  return (
    <video ref={ref} className="main-banner-art" poster={poster} muted loop playsInline preload="none" aria-hidden="true">
      <source src="/video/corewar-reveal-thumb.mp4" type="video/mp4" />
    </video>
  );
}

/** Strip above the spotlight: the studio's main project and how far its funding has come. */
export default function MainProjectBanner() {
  const p = mainProject;
  const g = gameById(p.gameId);
  if (!g) return null;
  const percent = fundPercent(p);
  return (
    <a
      className="main-banner rise"
      href={fundHref(p)}
      style={{ ["--accent" as string]: g.palette[2], ["--accent2" as string]: g.palette[0] }}
    >
      <BannerArt poster="/art/corewar-reveal-thumb.webp" />
      <span className="main-banner-tag">
        <span aria-hidden="true">★</span> โปรเจกต์หลัก · ร่วมสนับสนุน
      </span>
      <span className="main-banner-copy">
        <b>{g.name}</b>
        <small>{g.tagline}</small>
      </span>
      <span className="main-banner-fund">
        <span className="main-banner-nums">
          ฿{baht(p.raised)} <i>/ ฿{baht(p.goal)}</i>
          <em>{pct(percent)}%</em>
        </span>
        <span className="main-banner-bar" aria-hidden="true">
          <i style={{ width: `${percent}%` }} />
        </span>
      </span>
      <span className="main-banner-cta">
        ดูหน้าเกม <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}

/** Funding line for the project currently selected in the spotlight. */
export function SpotFund({ project }: { project: FundProject }) {
  const percent = fundPercent(project);
  return (
    <div className="spot-fund">
      <div className="spot-fund-row">
        <span>
          ระดมทุน <b>฿{baht(project.raised)}</b> / ฿{baht(project.goal)}
        </span>
        <em>{pct(percent)}%</em>
      </div>
      <span className="spot-fund-bar" aria-hidden="true">
        <i style={{ width: `${percent}%` }} />
      </span>
      <a className="spot-fund-cta" href={fundHref(project)}>
        เปิดหน้าเกมเต็ม · ร่วมสนับสนุน <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
