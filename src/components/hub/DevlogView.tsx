import type { Devlog } from "@/lib/devlog";
import { thaiDate } from "@/lib/devlog";

/** A game's development log: version, status, dated entries and what comes next. */
export default function DevlogView({ log, limit }: { log: Omit<Devlog, "id">; limit?: number }) {
  const entries = limit ? log.entries.slice(0, limit) : log.entries;
  return (
    <div className="devlog">
      <div className="devlog-head">
        {log.version && <span className="devlog-ver">{log.version}</span>}
        {log.built && <span className="devlog-built">อัปเดต {thaiDate(log.built)}</span>}
      </div>
      {log.status && <p className="devlog-status">{log.status}</p>}
      {log.summary && <p className="devlog-summary">{log.summary}</p>}
      <ol className="devlog-list">
        {entries.map((e) => (
          <li key={e.date + e.title}>
            <time dateTime={e.date}>{thaiDate(e.date)}</time>
            <b>{e.title}</b>
            {e.items.length > 0 && (
              <ul>
                {e.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      {log.roadmap.length > 0 && (
        <div className="devlog-next">
          <span>แผนต่อไป</span>
          <ul>
            {log.roadmap.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
