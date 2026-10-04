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

## เดโมที่เล่นได้ (`/play/`)

X-NOVA และ THE ONE เปิดเล่นที่ `/play/xnova/` และ `/play/theone/`
**ซอร์สเกมไม่อยู่ใน repo นี้** (repo เป็น public) — ต้นฉบับอยู่ที่โฟลเดอร์ข้าง ๆ (`../XNova`, `../TheOne`)

```bash
bash scripts/deploy-demos.sh            # อัปโหลดทั้งสองเกม
bash scripts/deploy-demos.sh xnova      # เฉพาะเกมเดียว
```

การ deploy ของฮับ (ด้านล่าง) ไม่ใช้ `--delete` จึงไม่ลบ `/play/`

## พัฒนา

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export -> out/
```

## Deploy (production)

เว็บจริงเสิร์ฟผ่าน repo `xjanova/xmanstudio`: ไฟล์ที่ build แล้ว (`out/`) วางไว้ที่
`sites/xgameshub.xman4289.com/` แล้ว Auto Deploy ของ xmanstudio จะ `rsync` ไปที่
`/home/admin/domains/xgameshub.xman4289.com/public_html` ให้เอง

```bash
npm ci && npm run build
# ใน xmanstudio: ลบของเดิมก่อน เพื่อไม่ให้ไฟล์ hash เก่าค้างใน repo
rm -rf sites/xgameshub.xman4289.com && cp -a ../GamesHub/out sites/xgameshub.xman4289.com
```

- `npm run build` รัน `scripts/sanitize-export.mjs` ต่อท้ายเอง: เทสต์ของ xmanstudio ห้ามมีข้อความ `github.com`
  ในไฟล์ .html/.js/.css ใต้ `sites/` สคริปต์จึงเขียน `github.com` ที่อยู่ในสตริงของไลบรารีเป็น `github.com`
  (ค่าตอนรันเหมือนเดิมทุกไบต์) และจะทำให้ build ล้มถ้าเจอที่ไม่ใช่สตริง
- asset ของ Next มีชื่อแบบ hash; ภาพ/คลิปโนวาใช้ `?v=` (`CLIP_V`); ภาพเกมใน `art/` cache 1 วัน
- `.htaccess` มาจาก `public/.htaccess`

### ถ้าจะให้ repo นี้ดีพลอยเองโดยตรง

workflow `Auto Deploy to Production` จะข้ามตัวเอง (ไม่ขึ้นแดง) จนกว่าจะใส่ Secrets
`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY` (+ `SSH_PORT`, `DEPLOY_PATH` ถ้าต้องการ)
ถ้าเปิดใช้ ให้ลบ `sites/xgameshub.xman4289.com/` ออกจาก xmanstudio ด้วย ไม่งั้นสองทางจะทับกัน
(workflow ตั้ง `--exclude '/play'` ไว้แล้ว เดโมจึงไม่ถูกลบ)
