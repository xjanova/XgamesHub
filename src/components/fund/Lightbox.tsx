"use client";

import { useEffect, useRef, useState } from "react";
import s from "./fund.module.css";

/**
 * One dialog for every concept image on the page: the server-rendered
 * `[data-zoom]` buttons stay plain HTML, a single listener opens them large.
 */
export default function Lightbox() {
  const ref = useRef<HTMLDialogElement>(null);
  const [img, setImg] = useState<{ src: string; alt: string; kind: string } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element | null)?.closest<HTMLElement>("[data-zoom]");
      if (!btn) return;
      setImg({ src: btn.dataset.zoom ?? "", alt: btn.dataset.alt ?? "", kind: btn.dataset.kind || "ภาพคอนเซปต์" });
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={ref}
      className={s.lightbox}
      aria-label={img?.alt || "ภาพขยาย"}
      onClick={() => ref.current?.close()}
      onClose={() => setImg(null)}
    >
      {img && (
        <figure>
          <img src={img.src} alt={img.alt} />
          <figcaption>
            {img.alt} <span>· {img.kind} · แตะเพื่อปิด</span>
          </figcaption>
        </figure>
      )}
      <button type="button" className={s.lightboxClose} aria-label="ปิดภาพขยาย">
        ×
      </button>
    </dialog>
  );
}
