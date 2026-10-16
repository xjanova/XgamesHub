# HIVE // BREACH: COREWAR — สรุปคอนเซปต์และไฟล์งาน

อัปเดต: 2026-10-07

## ภาพรวมเกม

เกมแอ็กชันยิงเอเลี่ยนแบบ 2.5D ในโลกไซไฟที่มีแกนพลังงานของดาวเป็นศูนย์กลางสงคราม จุดขายคือการเล่นสองฝั่งในแมตช์เดียวกัน:

- **ฝ่ายผู้พิทักษ์**: ผู้เล่นรวมปาร์ตี้ฮีโร่มนุษย์/พันธมิตร ออกสำรวจแมพสุ่ม เปิดพื้นที่จากหมอกสงคราม เก็บ XP ทำภารกิจ และป้องกัน Star Core
- **ฝ่ายคอมมานเดอร์เอเลี่ยน**: ผู้เล่นมองจากมุม RTS สร้างฐาน วางป้อม ผลิตยูนิต วิจัยเทคโนโลยี และวางแผนบุกฐาน/แกนพลังงานของฝ่ายผู้พิทักษ์
- แมพถูกสุ่มสร้างเพื่อไม่ให้จำเส้นทางได้ มี Fog of War จุดทรัพยากร เหตุการณ์ และเส้นทางบุกหลายแบบ
- มี PvE เนื้อเรื่องสำหรับเก็บเลเวลบัญชี/ปลดสายอาชีพขั้นสูง และ PvP แบบฝ่ายมนุษย์/พันธมิตรปะทะคอมมานเดอร์เอเลี่ยน
- ระบบจัดสมดุลรองรับ AI เติมฝั่งที่ขาด ผู้เล่นมีระดับยศจากความก้าวหน้า PvE และประสบการณ์จริงในสนาม
- มี Daily/Battle Season, ภารกิจ, ร้านค้า และสกิน สกินเป็นเครื่องแต่งกาย ไม่มีโบนัสสเตตัสใน PvE/PvP

## ฝ่ายผู้พิทักษ์ — 8 ตัวละครหลัก

| ตัวละคร | อาชีพ | ความสามารถ/ภาพจำ | เส้นทางขั้นสูงในคอนเซปต์ |
|---|---|---|---|
| **LYRA** | MOBILE MEDIC | ปืนพก, เดินเร็ว, Auto Heal เมื่อปลอดภัยจากการโดนโจมตี | PULSE SAINT / PHASE GUNNER |
| **VELVET** | BLOODGUARD | สาวทวินเทลชมพู ชุดโกธิค ค้อนยักษ์ ถึกมาก ดูดเลือดเมื่อสังหาร และคอมโบ Rose Sweep → Grave Lift → Requiem Slam | REQUIEM VANGUARD / CRIMSON REAPER |
| **ASTRA** | ELEMENTALIST | เวทไฟ น้ำแข็ง สายฟ้า และเอฟเฟกต์ธาตุ | STORM WEAVER / FROSTFIRE ORACLE |
| **ECHO** | FIREARMS SPECIALIST | ปืนพก สไนเปอร์ ปืนกล | DEADEYE / ARSENAL RUNNER |
| **RHEA** | SHIELD BASTION | แทงค์โล่หนัก ฟื้นฟูตัวเอง รับดาเมจแทนทีม | IRON CITADEL / IMPACT WARDEN |
| **SERAPH-09** | LIGHTBLADE GUARDIAN | โล่พลังงานกับดาบแสง แทงค์คล่องตัว | PRISM PALADIN / PHOTON DUELIST |
| **NOVA-7** | FIELD ENGINEER | สร้างป้อม วางกับดัก ใช้โดรนสนับสนุน | SIEGE ARCHITECT / TRAP ARTIFICER |
| **IRIS-3** | RESONANCE HEALER | ฮีลทีม ชำระสถานะ และชุบชีวิต | RESONANCE ORACLE / RESCUE SERAPH |

การอัปสกิลต้องอยู่ในสายของตัวละครนั้น ๆ ส่วน **Passive Skill** สามารถเลือกแนวสนับสนุนตัวเองได้หลากหลาย เช่น ความเร็ว การลดคูลดาวน์ การป้องกัน หรือการเสริมสกิลหลัก โดยไม่ย้าย Active Skill ของตัวละครหนึ่งไปเป็นอีกอาชีพ

## ฝ่ายเอเลี่ยน — 2 เผ่า

### MYRAX BROOD

เผ่าชีวภาพ กระดองสีงาช้าง แสง Magenta และกรดเขียว เน้นจำนวนยูนิตสูง การฟื้นฟู และการบุกเร็ว

- **ยูนิต**: Harvester, Skitter, Venom Spitter, Carapace Brute, Brood Mortar, Synapse Warden
- **สิ่งก่อสร้าง**: Brood Heart, Brood Chamber, Spine Nest, Gene Vault
- **สายวิจัย**: Biomass Cycle, Rapid Hatch, Colony Growth, Chitin Plating, Acid Catalyst, Brood Fury, Spore Surge, Synapse Web, Predator Mark
- **ทรัพยากร**: Biomass + Core Shards
- **ผู้บัญชาการ**: KHAEL และ SAERYN

### AETHERION SYNOD

เผ่าผลึก Obsidian/มุกม่วง มีแกนพลังงาน Cyan เน้นยูนิตน้อยแต่แพง เกราะพลังงาน ระยะยิง และการควบคุมพื้นที่

- **ยูนิต**: Shard Collector, Prism Lancer, Ray Sentinel, Bulwark, Rift Artillery, Nexus Weaver
- **สิ่งก่อสร้าง**: Nexus Core, Prism Gate, Lens Pylon, Resonance Archive
- **สายวิจัย**: Flux Efficiency, Power Grid, Gate Calibration, Prism Coating, Resonant Lenses, Siege Focus, Phase Step, Linked Aegis, Gravity Pulse
- **ทรัพยากร**: Flux + Core Shards
- **ผู้บัญชาการ**: VAEL และ NYXARA

คอมมานเดอร์ทั้งสี่เป็นรูปลักษณ์ชาย/หญิงของ kit เผ่าเดิม ไม่ใช่อาชีพใหม่ และยาน/องค์ประกอบไกลในภาพ NYXARA เป็น worldbuilding สำหรับภาพยนตร์ ยังไม่ใช่การรับรองยูนิตบินใน MVP

## ระบบอัปเกรดและคริสตัล

- อาวุธและเกราะมีช่อง Socket สำหรับคริสตัล
- **Ruby** เสริมพลังโจมตีอาวุธ
- **Sapphire** ลดดาเมจ/เสริมเกราะ
- **Emerald** เพิ่ม HP เกราะ
- **Amethyst** เพิ่ม Stagger อาวุธ
- มี Tier I/II/III, preview ค่า Before/After, ค่าใช้จ่าย และปุ่มยืนยันก่อนติดตั้ง
- คริสตัลเป็นชิ้นเฉพาะ ไม่ควรอยู่ทั้งในคลังและ Socket พร้อมกัน
- Skill Tree ถาวรของตัวละครแยกจากการ์ดสกิลชั่วคราวระหว่างรอบ

## ภาษาภาพและการพัฒนา

- มุมมอง Fixed Isometric/2.5D ใช้ภาพเรนเดอร์จาก Blender และ sprite หลายทิศทาง ลดต้นทุนโมเดล
- Godot 4 + GDScript เป็นแกนเกม, Blender ทำโมเดล/เรนเดอร์, Krita ทำภาพ 2D, Audacity ทำเสียง, Kenney/Poly Haven ใช้ asset ที่มีใบอนุญาตเหมาะสม
- ภาพ AI, Digen และ UI ในชุดนี้เป็น **concept/prototype visual** ไม่ใช่ runtime game capture หรือโมเดล 3D ที่ทำเสร็จแล้ว
- งานออนไลน์จริงควรใช้ authoritative server ตรวจคำสั่ง ทรัพยากร การมองเห็น Fog of War การสร้างสิ่งก่อสร้าง และการจับคู่

## งาน MV ที่ผลิตจริงแล้ว

เพลง **Guard the Star Core.mp3** ความยาว 217.2 วินาที (3:37.2) ถูกตัดเป็น MV 1920×1080 / 24fps พร้อมซับไทย มี 56 cuts ประกอบด้วย:

- ช็อตเปิดโลกและ Star Core
- การ์ดชื่ออาชีพผู้พิทักษ์ 8 คน พร้อมสายอาชีพและทางเลือกขั้นสูง
- การ์ด KHAEL, SAERYN, VAEL, NYXARA
- Gameplay 2.5D ของฝั่งผู้พิทักษ์
- Gameplay RTS มุมกว้างพร้อม Fog of War ของ MYRAX/AETHERION
- คัตซีนผู้บัญชาการเอเลี่ยนและฉากปกป้องแกนพลังงาน
- โลโก้ปิดท้าย HIVE // BREACH: COREWAR

## โครงสร้างไฟล์สำคัญ

- `Exports/HIVE-BREACH-Guard-the-Star-Core-MV-1080p-TH.mp4` — MV เต็มเพลงที่เรนเดอร์และตรวจแล้ว
- `Shots/` — คลิป Digen ที่ใช้จริง: cinematic, commander และ gameplay `gp-01` ถึง `gp-08`
- `Source/corewar-mv-v4/cinematic/` — ภาพคัตซีนหลัก 10 ช็อต
- `Source/corewar-mv-v4/intro/` — ภาพขึ้นชื่อ 12 ตัวละคร/คอมมานเดอร์
- `Source/corewar-mv-v4/commander/` — ภาพคอมมานเดอร์ 4 ช็อต พร้อม prompt, SRT และ gallery
- `Source/gameplay/` — ภาพ gameplay ฝ่ายผู้พิทักษ์และ RTS ทั้งสองเผ่า
- `Subtitles/` — เนื้อเพลงอังกฤษ, คำแปลไทย, SRT และ ASS สำหรับซับ
- `Work/edit-timeline.json` — ไทม์ไลน์ 56 cuts ของ MV
- `Work/render_mv.py` — สคริปต์ประกอบคลิป ใส่เพลง และ burn-in ซับ
- `Work/digen-production-jobs.json` — รายการงาน Digen และสถานะดาวน์โหลด
- `Work/` — ไฟล์ตรวจภาพ, checksum, log และคลิปตัดย่อย

## สถานะปัจจุบัน

MV พร้อมใช้งานเป็นตัวอย่างโปรโมตเกมและเป็น visual target สำหรับทีมพัฒนา ตัวเกมจริง ระบบเน็ตเวิร์ก โมเดล 3D และ gameplay runtime ยังต้องพัฒนาตามลำดับ MVP ภายหลัง
