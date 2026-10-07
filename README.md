# XMAN GAMES HUB

ฮับรวมโลกเกมของ XMAN Studio — **https://xgameshub.xman4289.com**

ดีไซน์ต่อยอดจากต้นแบบ "XMAN Games Hub — Future UI v2" (Codex): เมนูข้าง, Spotlight เกมเด่น,
คลัง 10 โลก, ส่วนแนะนำสตูดิโอ — แล้วยกทั้งหน้าขึ้นเป็น 3D เต็มรูปแบบ โดยมี **โนวา (Nova)**
มาสคอตของ XMAN ในลุคสาวเกมเมอร์เป็นไกด์

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, `output: "export"`) + TypeScript
- Tailwind CSS 4 (preflight) + CSS เขียนเองใน `src/app/globals.css`
- [three.js](https://threejs.org) แบบไม่มี wrapper — ฉาก 3D ทั้งหมดอยู่ใน `src/components/universe/`
- ฟอนต์ Chakra Petch + IBM Plex Sans Thai (self-host ผ่าน `next/font`)

## โครงสร้าง

| ที่อยู่ | ทำอะไร |
| --- | --- |
| `src/data/games.ts` | รายการเกมทั้ง 10 โลก + เกมเด่น 3 เกม + คำพูดของโนวาต่อเกม — **เพิ่ม/แก้เกมที่นี่ที่เดียว** |
| `src/components/hub/` | หน้าเว็บ: `Hub.tsx` (เมนู, Spotlight, คลัง, สตูดิโอ, ทัวร์, สุ่มเกม), `GameCard.tsx` (การ์ด 3D), `DetailDialog.tsx` |
| `src/components/universe/` | `engine.ts` เอนจิน three.js, `shaders.ts` GLSL, `Universe.tsx` ผูกกับ React |
| `src/components/nova/` | ไกด์โนวา: `NovaGuide.tsx` (คำพูด/ตำแหน่ง), `NovaFigure.tsx` (สลับภาพนิ่ง↔คลิป), `clips.ts` (รายการคลิป) |
| `src/lib/guide.ts` | "สมอง" ของโนวา — ส่วนไหนของหน้าก็ `guide.say({...})` ให้โนวาพูดได้ |
| `src/data/fund.ts` | โปรเจกต์ที่เปิดรับการสนับสนุน: เป้า ยอด จำนวนผู้สนับสนุน PromptPay ระดับรางวัล — ดู "หน้าโปรเจกต์หลัก" ด้านล่าง |
| `src/app/fund/[id]/` + `src/components/fund/` | หน้าเต็มของโปรเจกต์ `/fund/<id>/` (เนื้อหาอยู่ใน `src/data/fund-<id>.ts`) |
| `public/art/` | ภาพปกเกม (WebP), โลโก้ |
| `public/nova/` | ภาพนิ่ง (`stills/`) และคลิปโปร่งใส (`clips/`) ของโนวา |
| `scripts/nova/` | `green.py` / `key.py` — ทำคลิปโนวา (ดูด้านล่าง) |
| `scripts/deploy-demos.sh` | อัปโหลดเดโมเกมขึ้น `/play/` |

## ฉาก 3D (`src/components/universe/engine.ts`)

canvas WebGL เดียว fixed อยู่หลังทั้งหน้า

- **ท้องฟ้าเนบิวลา** — shader fbm เรนเดอร์ลง cube map เฉพาะตอนสีเปลี่ยน (ตามโลกที่เลือก) ไม่ได้คำนวณทุกเฟรม
- **ดาวเคราะห์** — พื้นผิว procedural 3 แบบ (ดาวแก๊ส / ทวีป / โลกคริสตัลมืด) bake ลง texture ครั้งเดียวต่อโลก
  แล้วจัดแสง, บรรยากาศ, วงแหวน, วงโคจรและดวงจันทร์แบบเรียลไทม์
- **ดาวและฝุ่นอวกาศ** — เลื่อนหน้า = กล้องบินไปข้างหน้าและเลี้ยว, เมาส์ = parallax
- วัตถุที่เป็นของ section (ดาวใน Spotlight, โลโก้ X + 10 โลกโคจรในส่วนสตูดิโอ) เป็นลูกของกล้อง
  และถูก "ตรึง" กับตำแหน่ง DOM (`#spotlight-stage`, `#core-stage`) ทุกเฟรม จึงเลื่อนไปพร้อมหน้าเว็บ
- ลากที่ดาวเพื่อหมุน (หรือปุ่มลูกศร), สลับเกมเด่น = ดาวเปลี่ยนพื้นผิวแบบ cross-fade + กล้องกระตุกแบบวาร์ป
- ประสิทธิภาพ: compile shader ล่วงหน้า (`compileAsync`), ลด pixel ratio อัตโนมัติถ้าเฟรมช้า, หยุดเมื่อแท็บถูกซ่อน,
  ปุ่ม **Motion** = ภาพนิ่ง (ค่าเริ่มต้นปิดถ้าเครื่องตั้ง reduce motion), ไม่มี WebGL = ภาพสำรอง

## โนวา — ไกด์แบบวิดีโอ (แบบเดียวกับน้อง Nova บน xmanstudio)

ภาพนิ่ง 4 ท่า (`welcome` `present` `cheer` `play`) วาดด้วย ChatGPT และคลิปที่ทำให้แต่ละท่ามีชีวิต
(Grok Imagine บนพื้นเขียว → คีย์เป็น VP9 WebM โปร่งใส) — เฟรมแรกของคลิปคือภาพนิ่ง จึงสลับได้ไม่กระตุก

- ยืนข้างดาวเคราะห์ใน Spotlight บนจอกว้าง (≥1280px) แล้วบินไปมุมขวาล่างเมื่อเลื่อนลง; มือถือเป็นรูปหน้ากลม ๆ
- พูดตามบริบท: ทักทาย (ครั้งแรก/กลับมา), เล่าเกมที่ชี้หรือเลือก, ตัวกรอง, ค้นหาไม่เจอ, พาทัวร์ 5 จุด, สุ่มเกม, จิ้มแล้วมีปฏิกิริยา
- Safari/iOS (วาด VP9 alpha เป็นสีดำ), Save-Data, Motion ปิด และจอเล็ก = ใช้ภาพนิ่ง

ทำคลิปใหม่ (ต้องมี ffmpeg + libvpx-vp9 และ Python + Pillow):

```bash
python scripts/nova/green.py public/nova/stills/welcome.webp .nova-work/green-welcome.jpg [--pad]
# ส่งภาพเขียวให้ Grok Imagine (720p, 6 วิ, ปิดเสียง, บทบาท Loop สำหรับคลิปวน)
python scripts/nova/key.py .nova-work/raw.mp4 .nova-work/green-welcome.jpg public/nova/clips/idle.webm once [--padded]
```

แล้วแก้ `CLIPS` ใน `src/components/nova/clips.ts` (`pad: true` ถ้าใช้ `--pad`) — ไฟล์ชื่อเดิมที่ encode ใหม่ต้องบัมพ์ `CLIP_V`

## หน้าโปรเจกต์หลัก (`/fund/<id>/`)

โปรเจกต์ใน `src/data/fund.ts` ได้หน้าเต็มของตัวเอง ตัวแรก (`mainProject`) ถูกปักเป็นอันดับแรกใน Spotlight
มีแบนเนอร์ "โปรเจกต์หลัก · ร่วมสนับสนุน" เหนือ Spotlight และโนวาชวนไปดูทั้งตอนทักทาย ทัวร์ และอีกครั้งหลังเปิดหน้า ~26 วินาที (ครั้งเดียวต่อการเข้าชม)

เว็บเป็น static export ตัวเลขจึงไม่อัปเดตเอง หลังตรวจรายการโอนให้แก้ใน `src/data/fund.ts` แล้ว build/deploy ใหม่:

- `raised` / `backers` / `updated` — ยอดเงิน (บาท) จำนวนผู้สนับสนุน และวันที่ตรวจล่าสุด
- `supporters` — ชื่อที่ผู้สนับสนุนขอให้แสดง (ว่าง = ไม่แสดงกำแพงผู้สนับสนุน)
- `tiers[].taken` — จำนวนที่ถูกจองไปแล้วของระดับที่จำกัดจำนวน
- `promptpay.id` — เบอร์มือถือ 10 หลัก / เลขบัตรประชาชนหรือเลขผู้เสียภาษี 13 หลัก / e-Wallet 15 หลัก
  **เว้นว่าง = ยังไม่เปิดรับ** (หน้าแสดง "กำลังเตรียมช่องทางรับบริจาค") ใส่เลขผิดรูปแบบ build จะล้มทันที
  `promptpay.name` คือชื่อบัญชีที่แสดงใต้ QR

QR สร้างในเบราว์เซอร์ (`src/lib/promptpay.ts` — payload EMVCo + CRC16 ตรงกับไลบรารี `promptpay-qr`) ใส่ยอดตามระดับที่เลือกหรือยอดที่พิมพ์เอง
บันทึกเป็นรูป PNG ได้สำหรับสแกนจากรูปในแอปธนาคาร

วิดีโอเปิดตัว (`public/video/corewar-reveal-*.mp4`) เล่นวนแบบปิดเสียง เฉพาะเมื่อปุ่ม Motion เปิดและไม่ได้ใช้ Save-Data
ไม่งั้นจะเห็นแค่ภาพ poster และไม่โหลดวิดีโอ ภาพและวิดีโอทุกชิ้นของหน้านี้เป็นคอนเซปต์ ไม่ใช่ภาพจากเกมจริง

## เกมที่เล่นได้ (`/play/`) และบันทึกการพัฒนา

เกมแต่ละเกมอยู่ใน repo ของตัวเอง (private) และ **deploy ตัวเองเข้าฮับ** ทุกครั้งที่ push เข้า `main`:

| เกม | repo | ขึ้นที่ |
| --- | --- | --- |
| X-NOVA | `xjanova/XNova` | `/play/xnova/` |
| X-NOVA: BREAKER | `xjanova/XNova-Breaker` | `/play/breaker/` |
| THE ONE | `xjanova/TheOne` | `/play/theone/` |
| NOVA·UMBRA (เวอร์ชันเว็บ) | `xjanova/NovaUmbra` | `/play/umbra/` |
| แม่หมอจันทรา · บทที่ ๑ | `xjanova/juntragame` (deploy game.จันทรา.online ด้วย) | `/play/chanthra/` |
| TetrisVS (browser edition, `npm run hub:build`) | `xjanova/TetrisVS` | `/play/tetrisvs/` |
| 8 Ball Pool | `xjanova/EightBallPool` | `/play/8ball/` |
| Snooker 2D | `xjanova/Snooker2D` | `/play/snooker/` |
| Tetris Classic | `xjanova/TetrisClassic` | `/play/tetris/` |
| Space Shooter | `xjanova/SpaceShooter2D` | `/play/space-shooter/` |

SNAKE.IO ลิงก์ไปเล่นบนเว็บ Thai Prompt (ยังผูกกับเซิร์ฟเวอร์เกมของที่นั่น) — ไม่มี `/play/` ของตัวเอง

ในแต่ละ repo เกม:

- `tools/hub-publish.mjs` — แพ็กไฟล์ที่เบราว์เซอร์โหลด (ค่าเริ่มต้น index.html, manifest, css, js, assets หรือกำหนดใน `hub.json`
  `{ "root": "...", "ship": [...] }`) และแปลง `DEVLOG.md` เป็น `devlog.json` · ถ้า `package.json` มีสคริปต์ `hub:build` workflow จะ build ก่อน
  — **ถ้ามีคำว่า github ในไฟล์ที่จะขึ้นเว็บจะไม่ยอม publish** (ลูกค้าต้องไม่เห็น)
- `.github/workflows/deploy-xgameshub.yml` — rsync ขึ้น `play/<id>/` ด้วยคีย์ที่ล็อก `rrsync` ไว้เฉพาะโฟลเดอร์ของเกมนั้น,
  เช็ก `devlog.json` บนเว็บจริง แล้วออก release `v1.0.<run>`
- `DEVLOG.md` — บันทึกการพัฒนาที่ผู้เล่นอ่าน (รูปแบบ: `# ชื่อ — บันทึกการพัฒนา`, `> สรุป`, `**สถานะ:** …`,
  `## YYYY-MM-DD — หัวข้อ` + bullet, `## แผนต่อไป`)

ฮับอ่าน `/play/<id>/devlog.json` ตอนเปิดหน้า (`src/lib/devlog.ts`) — เกมออกเวอร์ชันใหม่แล้วฮับเห็นทันทีโดยไม่ต้อง deploy ฮับ
เกมที่ยังไม่มี build (คอนเซปต์ / ต้นแบบ Godot) ใช้บันทึกใน `src/data/devnotes.ts`

เพิ่มเกมใหม่ที่เล่นบนเว็บได้: สร้าง repo ของเกม → คัดลอก `tools/hub-publish.mjs` + workflow (แก้ `GAME_ID`) + เขียน `DEVLOG.md`
→ สร้างโฟลเดอร์ `play/<id>` บนเซิร์ฟเวอร์ + คีย์ deploy ของเกมนั้น (`restrict,command="/usr/bin/rrsync -wo -munge …/public_html/play/<id>"`)
→ ตั้ง secrets `DEPLOY_HOST/USER/SSH_KEY/KNOWN_HOSTS` → เพิ่มเกมใน `src/data/games.ts` (ใส่ `play: "/play/<id>/"`)

ชุดเครื่องมือสำหรับ repo เกมใหม่อยู่ที่ `scripts/gamekit/`:
`hub-publish.mjs` (→ `tools/`), `deploy-xgameshub.yml` (→ `.github/workflows/`, แทน `__GAME_ID__`),
และ `setup-game-keys.sh id:Repo …` (สร้างโฟลเดอร์ `play/<id>`, ติดตั้งคีย์ rrsync เฉพาะโฟลเดอร์นั้น, ทดสอบว่าเปิด shell ไม่ได้,
ตั้ง secrets แล้วลบ private key — รันจากเครื่องที่มีคีย์ admin)

### เกม Roblox

หมวด **Roblox** ในฮับ (`platform: "roblox"` ใน `src/data/games.ts`, `play` = ลิงก์หน้าเกมบน Roblox)
ตอนยังไม่มีเกม หมวดนี้จะแสดงแผง "กำลังสร้าง"
repo ของเกม Roblox ใช้ชุดเครื่องมือเดียวกันโดยใส่ `hub.json` = `{ "devlogOnly": true }` —
publish แค่ `devlog.json` ขึ้น `/play/<id>/` ให้ฮับแสดงเวอร์ชันและบันทึกการพัฒนา ส่วนตัวเกมอยู่บน Roblox

`scripts/deploy-demos.sh` ยังใช้อัปโหลดมือได้ถ้าจำเป็น (ใช้คีย์ admin)
การ deploy ของฮับไม่แตะ `/play/` (`--exclude=/play`)

## พัฒนา

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export -> out/
```

## Release & Deploy อัตโนมัติ

merge เข้า `main` → CI (`ci.yml`) ผ่าน → workflow **Release & Deploy** (`auto-deploy.yml`):

1. build static site (`out/`)
2. `rsync` ขึ้น `/home/admin/domains/xgameshub.xman4289.com/public_html` (ไม่แตะ `/play`, `/cgi-bin`, `/.well-known`)
3. เช็กว่าหน้าเว็บจริงเสิร์ฟ build นี้แล้ว
4. ออก **GitHub Release** `v2.0.<run>` พร้อม release notes (จาก PR) และไฟล์ `xgameshub-site-<tag>.zip`

ย้อนเวอร์ชัน: Actions → Release & Deploy → Run workflow → เลือก tag เวอร์ชันที่ต้องการ

### ตั้งค่าครั้งเดียว (deploy key)

ถ้ายังไม่มี secrets workflow จะออก release อย่างเดียว ไม่ deploy (ขึ้น notice ไม่ขึ้นแดง)
คีย์ deploy ล็อกบนเซิร์ฟเวอร์ด้วย `rrsync` ให้เขียนได้เฉพาะ web root ของเว็บนี้ (แบบเดียวกับ bass-build):

```
restrict,command="/usr/bin/rrsync -wo -munge /home/admin/domains/xgameshub.xman4289.com/public_html" ssh-ed25519 … xgameshub-gha-deploy
```

Secrets ใน **Settings → Secrets and variables → Actions**:

| ชื่อ | ค่า |
| --- | --- |
| `DEPLOY_HOST` | IP เซิร์ฟเวอร์ต้นทาง (ดูใน BrainX / ถามเจ้าของ — ห้ามใส่ใน repo นี้ เพราะเว็บอยู่หลัง Cloudflare) |
| `DEPLOY_USER` | `admin` |
| `DEPLOY_SSH_KEY` | private key ของ `xgameshub-gha-deploy` |
| `DEPLOY_KNOWN_HOSTS` | ผลของ `ssh-keyscan -t ed25519 <host>` — ตรวจลายนิ้วมือ SHA256:gjB6mR0eu8RqxRtZKJAQtV4PpQzSOf1cg7VG8Nozm1I ก่อนใช้ |

เมื่อเปิดใช้แล้ว ต้องลบ `sites/xgameshub.xman4289.com/` ออกจาก `xjanova/xmanstudio`
ไม่งั้น deploy ของ xmanstudio จะเอาสำเนาเก่าในนั้นมาทับเว็บ

### ระหว่างที่ยังไม่มี deploy key (ทางเดิม)

เว็บจริงเสิร์ฟผ่าน `xjanova/xmanstudio`: ไฟล์ที่ build แล้ว (`out/`) วางไว้ที่ `sites/xgameshub.xman4289.com/`
แล้ว Auto Deploy ของ xmanstudio จะ `rsync` ไปที่ `public_html` ให้เอง (merge PR ใน xmanstudio)

```bash
npm ci && npm run build
# ใน xmanstudio: ลบของเดิมก่อน เพื่อไม่ให้ไฟล์ hash เก่าค้างใน repo
rm -rf sites/xgameshub.xman4289.com && cp -a ../GamesHub/out sites/xgameshub.xman4289.com
```

### หมายเหตุการ build

- `npm run build` รัน `scripts/sanitize-export.mjs` ต่อท้ายเอง: เขียน `github.com` ที่อยู่ในสตริงของไลบรารีเป็น `github\u002ecom`
  (ค่าตอนรันเหมือนเดิมทุกไบต์ — เทสต์ของ xmanstudio ห้ามมีข้อความนี้ใต้ `sites/` และลูกค้าไม่ควรเห็นลิงก์ GitHub)
- asset ของ Next มีชื่อแบบ hash; ภาพ/คลิปโนวาใช้ `?v=` (`CLIP_V`); ภาพเกมใน `art/` cache 1 วัน
- `.htaccess` มาจาก `public/.htaccess`
- lock file: CI ใช้ npm 10 (Node 22) — ถ้าแก้ dependency บน Windows ด้วย npm 11 แล้ว `npm ci` ใน CI ล้ม ให้สร้าง lock ใหม่ด้วย
  `npx -y npm@10 install --package-lock-only`
