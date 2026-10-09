"use client";

import { supportUrl } from "@/lib/community";
import { useGameReviews } from "@/lib/hub-control";
import { thaiDate } from "@/lib/devlog";

const stars = (n: number) => "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));

/** Approved player reviews from the XMAN Studio community; writing one happens there, signed in with XMAN ID. */
export default function GameReviews({ slug }: { slug: string }) {
  const { data, failed } = useGameReviews(slug);
  const write = data?.write_url ?? `${supportUrl(slug)}#reviews`;
  return (
    <div className="reviews">
      <div className="reviews-head">
        {data ? (
          <span className="reviews-score">
            <b>{data.rating_count ? data.stars.toFixed(1) : "—"}</b>
            <span aria-hidden="true">{stars(Math.round(data.stars))}</span>
            <small>
              {data.rating_count} คะแนน · {data.review_count} รีวิว
            </small>
          </span>
        ) : (
          <span className="reviews-score">
            <small>{failed ? "ยังโหลดรีวิวไม่ได้ ลองดูที่ศูนย์ชุมชน" : "กำลังโหลดรีวิว…"}</small>
          </span>
        )}
        <a className="reviews-write" href={write} target="_blank" rel="noopener">
          เขียนรีวิว ↗
        </a>
      </div>
      {data && data.reviews.length === 0 && <p className="reviews-empty">ยังไม่มีรีวิวที่เผยแพร่ เป็นคนแรกที่รีวิวเกมนี้ได้เลย</p>}
      {data && data.reviews.length > 0 && (
        <ol className="reviews-list">
          {data.reviews.map((r, i) => (
            <li key={i} className={r.featured ? "featured" : undefined}>
              <span className="reviews-meta">
                <span className="reviews-stars" aria-label={`${r.rating} ดาว`}>
                  {stars(r.rating)}
                </span>
                <b>{r.name}</b>
                <time dateTime={r.date}>{thaiDate(r.date)}</time>
                {r.featured && <em>รีวิวแนะนำ</em>}
              </span>
              {r.title && <strong>{r.title}</strong>}
              <p>{r.comment}</p>
            </li>
          ))}
        </ol>
      )}
      <p className="reviews-note">รีวิวผ่านการตรวจโดยทีม XMAN Studio ก่อนแสดง · ดาวนับจากผู้เล่นที่ให้คะแนนทุกคน</p>
    </div>
  );
}
