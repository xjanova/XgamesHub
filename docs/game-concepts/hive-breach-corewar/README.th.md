# HIVE // BREACH: COREWAR — ชุดข้อมูลสำหรับเขียนเว็บ

ชุดนี้นำคอนเซปต์และภาพอัปเดตจาก `D:/GameProject/HIVE II BREACH` เข้า `XgamesHub` เพื่อรอทำหน้าเว็บจริง โดยยังไม่เปลี่ยน layout หรือ component ของฮับในรอบนี้

## โครงสร้าง

- `concept/` — เอกสารเกมฉบับล่าสุดจากโฟลเดอร์ Concept: COREWAR V2/V5, PVE, procedural maps, guardians, commanders/skins, LYRA, VELVET, crystals และ system data
- `movie/` — สรุป MV, prompt, timeline, manifest และซับอังกฤษ/ไทย
- ภาพเว็บอยู่ที่ `public/concepts/hive-breach-corewar/`

## คอนเซปต์หลัก

เกมเป็น asymmetric sci-fi action/RTS:

1. ฝ่ายผู้พิทักษ์รวมปาร์ตี้ 2.5D สำรวจแมพสุ่ม เปิด Fog of War เก็บ XP และป้องกัน Star Core
2. ฝ่ายคอมมานเดอร์เอเลี่ยนเล่น RTS สร้างฐาน วางป้อม ผลิตยูนิต วิจัย และโจมตีแกนพลังงาน
3. เผ่าเริ่มต้นคือ MYRAX BROOD และ AETHERION SYNOD
4. ผู้พิทักษ์หลัก 8 คนมี Active Skill ตามตัวละคร และ Passive Skill ที่ปรับแนวสนับสนุนตัวเองได้โดยไม่ย้าย Active ข้ามสาย
5. คริสตัลใส่ Socket ของอาวุธ/เกราะ มี preview ก่อน commit และสกินไม่มีโบนัสสเตตัส

## MV ที่เกี่ยวข้อง

MV เต็มอยู่ในเครื่องผู้สร้างที่:

`D:/GameProject/HIVE II BREACH/Movies/Guard-the-Star-Core/Exports/HIVE-BREACH-Guard-the-Star-Core-MV-1080p-TH.mp4`

ไฟล์ดังกล่าวมีขนาดเกินข้อจำกัดไฟล์ปกติของ GitHub จึงไม่ใส่ลง repo รอบนี้ ส่วนภาพคอนเซปต์และเอกสารที่ใช้สร้างเว็บถูกนำเข้าแล้วครบชุด ส่วนเพลงต้นฉบับและคลิป Digen อยู่ในโฟลเดอร์งานต้นทางเช่นเดิม

## สถานะความถูกต้อง

ภาพและวิดีโอ Digen เป็น animated concept footage สำหรับโปรโมต ไม่ใช่ภาพจาก game runtime ที่สร้างเสร็จแล้ว ตัวเลข balance ในภาพ UI ต้องอ่านจากเอกสาร data/spec ใน `concept/` ก่อนนำไปแสดงเป็นข้อมูลเกม
