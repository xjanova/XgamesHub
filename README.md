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

ทุกครั้งที่ push เข้า `main` GitHub Actions (`.github/workflows/deploy.yml`) จะ build เป็น static site (`out/`)
แล้วอัปโหลดผ่าน FTP ไปที่ `/domains/xgameshub.xman4289.com/public_html/` (สั่งรันเองได้จากแท็บ Actions → Run workflow)

ตั้งค่าที่ **Settings → Secrets and variables → Actions**:

| ประเภท | ชื่อ | ค่า |
| --- | --- | --- |
| Secret | `FTP_SERVER` | host ของ FTP เช่น `ftp.xman4289.com` หรือ IP ของโฮสต์ |
| Secret | `FTP_USERNAME` | ชื่อผู้ใช้ FTP |
| Secret | `FTP_PASSWORD` | รหัสผ่าน FTP |
| Variable (ไม่บังคับ) | `FTP_PROTOCOL` | `ftps` (ค่าเริ่มต้น) หรือ `ftp` ถ้าโฮสต์ไม่รองรับ TLS |
| Variable (ไม่บังคับ) | `FTP_PORT` | ค่าเริ่มต้น `21` |
| Variable (ไม่บังคับ) | `FTP_SERVER_DIR` | ค่าเริ่มต้น `/domains/xgameshub.xman4289.com/public_html/` |

> ถ้าบัญชี FTP ถูกล็อกไว้ที่โฟลเดอร์ `public_html` อยู่แล้ว ให้ตั้ง `FTP_SERVER_DIR` เป็น `./`
