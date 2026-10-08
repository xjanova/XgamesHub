import { baht, fundHref, type FundProject } from "@/data/fund";
import { useCommunity } from "@/lib/community";

const pct = (n: number) => (n > 0 && n < 1 ? n.toFixed(1) : String(Math.floor(n)));

/** Funding line for the project currently selected in the spotlight. */
export function SpotFund({ project }: { project: FundProject }) {
  const { data } = useCommunity();
  const live = data?.games.find(x => x.slug === project.id);
  const percent = live && live.goal ? Math.min(100, live.raised / live.goal * 100) : 0;
  return (
    <div className="spot-fund">
      <div className="spot-fund-row">
        <span>
          ระดมทุน <b>{live ? `฿${baht(live.raised)}` : "—"}</b> / ฿{baht(live?.goal ?? project.goal)}
        </span>
        <em>{live ? `${pct(percent)}%` : "รอยอดยืนยัน"}</em>
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
