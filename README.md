# XgamesHub

Hubgame — รวมเกมไว้ในที่เดียว เล่นได้บนเบราว์เซอร์

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## โครงสร้าง

- `src/app/` — หน้าเว็บ
- `src/data/games.ts` — รายการเกมในฮับ (เพิ่มเกมใหม่ได้ที่นี่)

## Deploy (production)

เว็บจริง: https://xgameshub.xman4289.com

ใช้รูปแบบเดียวกับเว็บอื่นในเซิร์ฟเวอร์ (aixman, xmanstudio):

1. `CI - Build & Quality Checks` (`.github/workflows/ci.yml`) — lint + build ทุก push/PR
2. `Auto Deploy to Production` (`.github/workflows/auto-deploy.yml`) — เมื่อ CI บน `main` ผ่าน
   จะ build static site (`out/`) แล้ว `rsync` ผ่าน SSH ไปที่
   `/home/admin/domains/xgameshub.xman4289.com/public_html` (สั่งรันเองได้จากแท็บ Actions → Run workflow)

ตั้งค่าที่ **Settings → Secrets and variables → Actions → Secrets** (ค่าเดียวกับ repo aixman / xmanstudio):

| ชื่อ | ค่า |
| --- | --- |
| `SSH_HOST` | host/IP ของเซิร์ฟเวอร์ |
| `SSH_USER` | ผู้ใช้ SSH (เช่น `admin`) |
| `SSH_PRIVATE_KEY` | private key สำหรับ deploy |
| `SSH_PORT` | (ไม่บังคับ) ค่าเริ่มต้น `22` |
| `DEPLOY_PATH` | (ไม่บังคับ) ค่าเริ่มต้น `/home/admin/domains/xgameshub.xman4289.com/public_html` |
