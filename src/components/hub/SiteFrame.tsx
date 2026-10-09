"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { counts } from "@/data/games";
import { fundHref, fundProjects } from "@/data/fund";
import { supportUrl } from "@/lib/community";
import { MY_CODES_URL } from "@/lib/items";

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * The hub's sidebar and top bar around a sub-page (/fund/<id>/), so every page sits in the
 * same frame as the home page. Same classes as Hub.tsx; links lead back into the home page.
 */
export default function SiteFrame({ crumb, active, children }: { crumb: string; active?: string; children: ReactNode }) {
  const [menu, setMenu] = useState(false);

  const nav = (
    <nav aria-label="เมนูหลัก" className="side-nav">
      <Link href="/" className="side-link">
        <span className="nav-icon">◇</span>Discover
      </Link>
      <Link href="/?f=full#games" className="side-link">
        <span className="nav-icon">★</span>Closed Beta<span className="nav-count">{pad2(counts.full)}</span>
      </Link>
      <Link href="/?f=play#games" className="side-link">
        <span className="nav-icon">▷</span>Play now<span className="nav-count">{pad2(counts.play)}</span>
      </Link>
      <Link href="/?f=dev#games" className="side-link">
        <span className="nav-icon">▧</span>In development<span className="nav-count">{pad2(counts.dev)}</span>
      </Link>
      <Link href="/?f=concept#games" className="side-link">
        <span className="nav-icon">✳</span>Concept lab<span className="nav-count">{pad2(counts.concept)}</span>
      </Link>
      <Link href="/?f=roblox#games" className="side-link">
        <span className="nav-icon">⬢</span>Roblox<span className="nav-count">{counts.roblox ? pad2(counts.roblox) : "SOON"}</span>
      </Link>
      <span className="side-group">ร่วมสร้างเกม</span>
      {fundProjects.map((p) => (
        <Link key={p.id} href={fundHref(p)} className={`side-link${active === p.id ? " active" : ""}`} aria-current={active === p.id ? "page" : undefined}>
          <span className="nav-icon">♦</span>
          {p.page.title}
          {active === p.id && <span className="nav-marker" />}
        </Link>
      ))}
      <a href={supportUrl()} className="side-link">
        <span className="nav-icon">♥</span>Community
      </a>
      <Link href="/#redeem" className="side-link">
        <span className="nav-icon">✦</span>Supporter items
      </Link>
      <Link href="/#devlog" className="side-link">
        <span className="nav-icon">✎</span>Dev log
      </Link>
      <Link href="/#studio" className="side-link">
        <span className="nav-icon">⌘</span>Meet the studio
      </Link>
    </nav>
  );

  return (
    <>
      <div className="nebula-fallback frame-bg" aria-hidden="true" />
      <aside className="sidebar">
        <Link href="/" className="brand" aria-label="XMAN GAMES HUB หน้าแรก">
          <img src="/art/logo-v2.webp" alt="XMAN GAMES HUB" width={760} height={314} />
        </Link>
        <div className="side-caption">YOUR GATEWAY TO PLAY</div>
        {nav}
        <div className="side-divider" />
        <div className="universe-note">
          <span className="tiny-label">XMAN ORIGINALS</span>
          <p>
            Small studio.
            <br />
            <strong>Infinite worlds.</strong>
          </p>
        </div>
      </aside>

      <div className="app-shell frame-shell">
        <header className="topbar">
          <button type="button" className="menu-button" aria-expanded={menu} aria-controls="frame-menu" onClick={() => setMenu((m) => !m)}>
            <span />
            <span />
            <span />
            <b className="sr-only">เมนู</b>
          </button>
          <Link className="mobile-brand" href="/" aria-label="XMAN GAMES HUB">
            <img src="/art/logo-v2.webp" alt="XMAN GAMES HUB" width={760} height={314} />
          </Link>
          <div className="breadcrumb">
            XMAN UNIVERSE <span>/</span> <b>{crumb}</b>
          </div>
          <a className="pill-button" href={MY_CODES_URL} title="ไอเท็มและโค้ดของฉันที่ XMAN Studio">
            <span aria-hidden="true">✦</span>
            <span className="pill-word">ไอเท็มของฉัน</span>
          </a>
          <Link className="pill-button" href="/">
            <span aria-hidden="true">←</span>
            <span className="pill-word">หน้าหลัก</span>
          </Link>
        </header>
        <div id="frame-menu" className="mobile-menu" data-open={menu ? "1" : "0"} onClick={() => setMenu(false)}>
          {nav}
        </div>
        {children}
      </div>
    </>
  );
}
