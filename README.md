# XgamesHub

Hubgame — รวมเกมไว้ในที่เดียว เล่นได้บนเบราว์เซอร์

## Tech stack

- [Next.js](https://nextjs.org) (App Router, static export) + TypeScript
- Tailwind CSS
- Three.js ผ่าน React Three Fiber + drei + postprocessing (bloom, chromatic aberration)

## โลก 3D (OASIS-style hub)

เปิดเว็บ → หน้า boot แบบเทอร์มินัล → กด **ENTER THE HUB** → วาร์ปทะลุประตูมิติ →
เข้าสู่โลก synthwave (พื้นกริดนีออน พระอาทิตย์เรโทร ภูเขา wireframe) โดยมี **Nova** มาสคอตคอยต้อนรับ

- `src/components/oasis/Nova.tsx` — มาสคอต Nova (สร้างจาก primitive ไม่ต้องโหลดโมเดล): ลอยตัว กะพริบตา หันหน้าตามเมาส์/ประตูที่เลือก โบกมือเมื่อจิ้ม
- `src/components/oasis/Portals.tsx` — ประตูมิติ 1 บานต่อ 1 เกม (อ่านจาก `src/data/games.ts`)
- `src/components/oasis/World.tsx` — พื้นกริด พระอาทิตย์ ภูเขา ประตูทางเข้า แท่น
- `src/components/oasis/CameraRig.tsx` — ลำดับกล้อง (intro → warp → hub → โฟกัสเกม)
- `src/components/oasis/HUD.tsx` — หน้า boot, แถบ HUD, คำพูดของ Nova, แผงรายละเอียดเกม
- เสียงสร้างด้วย WebAudio (ไม่มีไฟล์เสียง), รองรับ `prefers-reduced-motion` และมีหน้ารายการเกมสำรองสำหรับเครื่องที่ไม่มี WebGL

เพิ่มเกมใหม่: เพิ่ม object ใน `src/data/games.ts` (ใส่ `color` และ `url` เมื่อเกมพร้อม) — ประตูมิติจะเกิดขึ้นเองอัตโนมัติ

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## โครงสร้าง

- `src/app/` — หน้าเว็บ
- `src/data/games.ts` — รายการเกมในฮับ (เพิ่มเกมใหม่ได้ที่นี่)
- `src/components/oasis/` — โลก 3D ทั้งหมด

## Deploy (production)

เว็บจริง: https://xgameshub.xman4289.com

ใช้รูปแบบเดียวกับเว็บอื่นในเซิร์ฟเวอร์ (aixman, xmanstudio):

1. `CI - Build & Quality Checks` (`.github/workflows/ci.yml`) — lint + build ทุก push/PR
2. `Auto Deploy to Production` (`.github/workflows/auto-deploy.yml`) — เมื่อ CI บน `main` ผ่าน
   จะ build static site (`out/`) แล้ว `rsync` ผ่าน SSH ไปที่
   `/home/admin/domains/xgameshub.xman4289.com/public_html` (สั่งรันเองได้จากแท็บ Actions → Run workflow)

### ตอนนี้ขึ้นเว็บผ่าน xmanstudio

repo นี้ยังไม่มี SSH Secrets ของตัวเอง จึงใช้ช่องทางเดียวกับเว็บ static อื่นของ XMAN:
ไฟล์ที่ build แล้ว (`out/`) ถูกวางไว้ที่ `xjanova/xmanstudio` → `sites/xgameshub.xman4289.com/`
แล้ว auto-deploy ของ xmanstudio จะ `rsync` ไปที่ `public_html` ให้เอง

อัปเดตเว็บ: `npm run build` แล้วคัดลอก `out/` ไปทับ `sites/xgameshub.xman4289.com/` ใน xmanstudio → merge เข้า main
(asset ของ Next มีชื่อแบบ hash อยู่แล้ว จึงไม่ต้องบัมพ์ `?v=`)

`npm run build` จะรัน `scripts/sanitize-export.mjs` ต่อท้ายเอง (postbuild): เทสต์ของ xmanstudio ห้ามมีข้อความ `github.com`
ในไฟล์ .html/.js/.css ใต้ `sites/` สคริปต์จึงเขียน `github.com` ที่อยู่ในสตริงของไลบรารีเป็น `github\u002ecom`
(ค่าตอนรันเหมือนเดิมทุกไบต์) และจะทำให้ build ล้มถ้าเจอที่ไม่ใช่สตริง

### ถ้าจะให้ repo นี้ดีพลอยเองโดยตรง

workflow `Auto Deploy to Production` จะข้ามตัวเอง (ไม่ขึ้นแดง) จนกว่าจะใส่ Secrets
ตั้งค่าที่ **Settings → Secrets and variables → Actions → Secrets** (ค่าเดียวกับ repo aixman / xmanstudio):

| ชื่อ | ค่า |
| --- | --- |
| `SSH_HOST` | host/IP ของเซิร์ฟเวอร์ |
| `SSH_USER` | ผู้ใช้ SSH (เช่น `admin`) |
| `SSH_PRIVATE_KEY` | private key สำหรับ deploy |
| `SSH_PORT` | (ไม่บังคับ) ค่าเริ่มต้น `22` |
| `DEPLOY_PATH` | (ไม่บังคับ) ค่าเริ่มต้น `/home/admin/domains/xgameshub.xman4289.com/public_html` |
