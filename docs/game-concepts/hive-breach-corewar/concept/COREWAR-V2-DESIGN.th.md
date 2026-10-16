# HIVE//BREACH: COREWAR — คอนเซปต์ฉบับสอง

> ล่าสุด V4: Active Skillsเฉพาะตัวละคร,ข้ามแนวเฉพาะPassive; RTSกล้องไกล+pan/zoom/fog,ฮีโร่ออกสำรวจเก็บEXPจากkill/assistและตั้งAutoPlansได้ทั้งสองฝั่ง ใช้ GUARDIANS-V4-DESIGN.th.md แทนV3 ส่วนข้อมูลสองเผ่าเอเลี่ยน/ราคาresearchในV2ยังอ้างอิงได้


วันที่ 7 ตุลาคม 2026 · ขยายตามคำขอล่าสุดของเจ้าของ · สถานะ: สเปกและภาพคอนเซปต์ ยังไม่มีเกมออนไลน์/เซิร์ฟเวอร์/โมเดลที่สร้างในงานนี้

## 1. รูปแบบเกมหลักใหม่

เกมสงครามป้องกันแกนพลังงานของดาวแบบสองฝั่ง ใช้สนามและเวลาเดียวกัน ฝั่ง Coreward Alliance เป็นปาร์ตี้ฮีโร่ที่แต่ละคนควบคุมตัวละครแบบเกมยิง/แอ็กชัน 2.5D ส่วนฝั่งผู้รุกรานมีคอมมานเดอร์เอเลี่ยนหนึ่งคนควบคุมเศรษฐกิจ อาคาร การผลิตยูนิต วิจัย และคำสั่งกองทัพแบบ RTS

เป้าหมายรุ่นเต็มขนาดเล็ก: 4 ฮีโร่ vs 1 คอมมานเดอร์ เลือกเอเลี่ยนได้หนึ่งในสองเผ่าต่อแมตช์ คอมมานเดอร์ไม่ลงสนามเป็นฮีโร่เอง และยังไม่ผสมสองเผ่าในกองทัพเดียว เดโมแรก: LYRA + VELVET 2 คน vs 1 คอมมานเดอร์ บนแมพเดียว

ผู้เล่นต้องร่วมมือจริง: ลีราโยกตำแหน่งยิงและฟื้นตัว เวลเว็ตยืนคุมฝูงด้วยค้อน อีกคนต้องออกไปยึดเสบียง/ตีเศรษฐกิจเอเลี่ยน ขณะที่คนที่เหลือต้องรักษาแนว การออกไปตี HQ เป็นทางเลือกเสี่ยงเพื่อชนะเร็วกว่าการตั้งรับครบเวลา

ฝั่งมนุษย์และเผ่าพันธมิตรใช้ระบบฮีโร่ร่วมกัน แบ่งเผ่าเพื่อเปิดทางให้ตัวละครในอนาคต ไม่สร้าง roster ใหญ่ในเดโม: มนุษย์ใช้โมดูลอาวุธ/คริสตัล, AURI พันธมิตรสังเคราะห์เสนอแนว shield link, THALEN พันธมิตรชีวภาพเสนอแนวเยียวยาพื้นที่ สองเผ่าพันธมิตรหลังเป็นแนวทางสำรอง ยังไม่มีภาพหรือสกิลเต็มที่เจ้าของยืนยัน

## 2. ฮีโร่เดิมที่คงไว้

- LYRA: ปืนพก เดินเร็ว Heal auto; ชุดขาวมุก กระโปรงโปร่งแสง cyan/lavender ตัวเลขเดิมเป็นค่าต้นแบบ ไม่ใช่บาลานซ์ที่ยืนยัน
- VELVET: ทวินเทลชมพู ชุดโกธิค ค้อนยักษ์ คอมโบ Sweep→Lift→Slam ถึก/ป้องกันสูง ดูดเลือดและพลังเมื่อฆ่า ไม่ฮีลจากการตีทุกครั้งหรือเพียงยืนรอ
- ไม่มี friendly fire ในเดโม; ใช้ collision แบบผลักกันนุ่มหรือข้ามกันระหว่างเพื่อนเพื่อไม่ขังกันในทางแคบ
- กดส่ง ping ป้องกันแกน/ขอช่วย/โจมตีจุดหนึ่งได้ HUD แสดงเพื่อน เลือด สถานะล้ม และทิศที่อยู่ไกลจอ
- ระบบล้ม: downed ประมาณ20วินาที เพื่อนชุบด้วยการค้างปุ่ม3วินาทีและถูกขัดได้ หากหมดเวลาล้มใช้โควตาชุบทีมหนึ่งครั้งแล้วกลับฐานหลัง15วินาที เสนอสำรองทีม4ครั้งต่อแมตช์ ต้องบาลานซ์ใหม่กับจำนวนผู้เล่น

## 3. เงื่อนไขชนะและจังหวะแมตช์

กรอบเริ่มต้นแมตช์15นาที: ตั้งรับ/ทำเศรษฐกิจช่วงต้น → เอเลี่ยนปลดล็อกยูนิตหนักและตีเส้นทางอื่นช่วงกลาง → การปะทะใหญ่ก่อนแกนเสถียรช่วงท้าย ตัวเลขเวลาต้องเปลี่ยนจาก playtest ได้

Alliance ชนะเมื่อแกนยังมี HP และการปรับเสถียรครบ100%เมื่อถึงเวลา หรือทำลาย HQ เอเลี่ยนก่อน เอเลี่ยนชนะเมื่อ CoreHP=0 หรือฮีโร่ทั้งหมดตายจริงและไม่เหลือโควตากลับสนาม เซิร์ฟเวอร์ตัดสินลำดับเหตุการณ์ใน tick เดียวกันชัดเจน: ความเสียหาย/การตายก่อนการตรวจครบเวลา แล้วตรวจผลชนะเพียงครั้งเดียว

CoreHP กับ Stabilization เป็นคนละแถบ การซ่อมคืน HP ไม่ย้อนหรือเร่ง timer ของการปรับเสถียร การซ่อมใช้ Scrap และมีอัตรารวมสูงสุด ไม่มี heal auto ของลีราหรือ siphon ของเวลเว็ตไปฮีลแกนโดยอัตโนมัติ

เอเลี่ยนเสียหน่วยแล้วต้องผลิตใหม่ มีราคากับเวลา และจอง supply ของยูนิตในคิวด้วย ไม่มีการเกิดศัตรูฟรีจาก WaveDirector ที่ทำงานซ้อนกับคอมมานเดอร์ แมตช์ vs AI ใช้บอทคอมมานเดอร์ทำเศรษฐกิจและผลิตตามกฎเดียวกัน

## 4. แมพต้นแบบ ECHO CORE

แมพสถานีแกนบนพื้นดาวหิน ใช้โมดูลเหล็ก/หินชุดเดียวกับไฟและชิ้นส่วนเผ่า สภาพแวดล้อมมีฐานฝ่ายป้องกันทางตะวันออกเฉียงเหนือและฐานเอเลี่ยนตะวันตกเฉียงใต้

- เส้นบน: ช่องเขาแคบ แต่มีจุดกำบังและทางวนหลบ เหมาะกับ flank/แยกทีม
- เส้นกลาง: สะพานกว้างที่สุด มองเห็นการบุกง่าย แต่ต้องรับกองทัพใหญ่
- เส้นล่าง: ร่องหินยาวกว่า มีจุดทรัพยากรกลางและทางอ้อมสำหรับปาร์ตี้ไปตีฐาน
- กลางแมพมี2จุดเสบียง/ทรัพยากรที่ต้องเสี่ยงออกจากแกนไปคุม ไม่แจกข้อได้เปรียบให้เอเลี่ยนจากฆ่าฮีโร่อย่างเดียว
- Alliance เริ่มด้วยที่กั้นและป้อมเล็ก2แห่ง เสนอช่องซ่อม/สร้างป้อมคงที่ไม่เกิน4จุดในเดโม ใช้ Scrap ทีมเดียวกัน
- เอเลี่ยนสร้างบนกริดเฉพาะพื้นที่ที่เครือข่ายเผ่าถึงและมองเห็น ห้ามสร้างในวงกันพื้นที่แกน/จุดเกิดฮีโร่ ห้ามอาคารปิดทางหลักทั้งหมด
- สร้างอาคารใช้workerและเวลา มี blueprint HP ต่ำระหว่างสร้าง เรียกคืนได้บางส่วนตามกฎเกม ไม่วางป้อมสำเร็จทันทีหน้าฮีโร่

ไม่มีหลายชั้น แอร์ยูนิต อุโมงค์ teleport หรือกล้องหมุนในเดโม วัตถุที่ดูเหมือนลอยยังเคลื่อนตามเส้นทางพื้นเพื่อให้ physics/nav เป็นชุดเดียว

แมพหลังเดโมใช้กติกา15นาทีเดิมและโมดูลเดิม: **FROST RELAY** สถานีผลึกน้ำแข็ง เส้นกลางสั้นแต่โล่ง/เส้นข้างอ้อมมีที่กำบัง; **ASH GARDEN** สถานีชีวภาพถูกบุกรุก มีแนวโค้งกับช่องผ่านแคบสลับลานกว้าง เปลี่ยนความคุ้มค่าของหน่วยฝูงกับหน่วยยิงไกล โดยยังไม่เพิ่มอากาศแปรปรวนหรือพื้นทำดาเมจจนระบบแมพแรกผ่านการทดสอบ เป้าหมายคือแต่ละแมพเปลี่ยนการเลือกแนวบุกและการแบ่งหน้าที่ของปาร์ตี้

ภาพ hero กับภาพ commander เป็นการมองสนามเดียวกันด้วยการซูม/pan ต่างกัน ไม่แยกเกมหรือทำฉากอีกชุดให้ RTS กราฟิกใช้ fixed isometric sprites, feet pivot, y-sort และผนัง fade ที่สอดคล้องกัน

## 5. สองเผ่าเอเลี่ยน

### MYRAX BROOD — ฝูงชีวภาพ

ภาพ: กระดองสีงาช้าง ร่างชีวภาพเข้ม แกน magenta กรดเขียว อาคารเป็นอวัยวะ/กระดองที่ยึดพื้นด้วยเส้นประสาท เอกลักษณ์: ราคาต่อหน่วยต่ำ ผลิตเร็ว ฝูงและกรดเก่ง คุมพื้นที่ด้วยเครือข่ายชีวภาพ ต้องพึ่งจำนวนกับ support

เศรษฐกิจใช้ Biomass และ Core Shards เป็นสอง resource เอาworkerเก็บBiomassจากnodeและนำส่งHQ; Core Shards จากจุดแร่จำกัดกลาง/ด้านข้าง เครือข่ายชีวภาพเป็นกฎพื้นที่สร้าง/บัฟการฟื้นตัว ไม่ให้เดินทะลุกำแพงหรือรู้ตำแหน่งศัตรูทั้งแมพ

จุดอ่อน: ตัวเล็กแพ้การกวาด/ทุบวงกว้างของเวลเว็ต ปืนพกลีราสามารถเลือกยิงspitter/wardenที่อยู่หลังแนว ถ้าปาร์ตี้ทำลายproductionหรือworkerจำนวนทดแทนจะลดลง

ราคา/เวลา/pop ต่อไปนี้เป็น baseline สำหรับ graybox ไม่ใช่บาลานซ์ที่ยืนยัน:

| ยูนิต | บทบาท/ความสามารถ | สิ่งที่ฮีโร่ใช้แก้ | Biomass/Shards · Pop · เวลา |
|---|---|---|---|
| Harvester | worker เก็บแร่ สร้าง/ซ่อมอาคาร ไม่ใช่หน่วยรบหลัก | บุกเศรษฐกิจทำให้ผลิตช้าลง | 50/0 ·1·8s |
| Skitter | ประชิดเร็ว กัดเป็นฝูง | กวาดวงกว้าง/คุมทางแคบ | 30/0 ·1·6s |
| Venom Spitter | ยิงกรดเป็นโค้ง มีเตือนพื้นและDOT | เคลื่อนหลบ กระโดดเข้าจัดตัวหลังแนว | 70/10 ·2·12s |
| Carapace Brute | เกราะหน้า พุ่งกระแทกหลังเตือน1วินาที | หลบข้างแล้วยิงหลัง/ทุบตอน recovery | 140/25 ·4·22s |
| Brood Mortar | ยิงกรดไกล โหมดประจำที่เพื่อ siege แกน/ป้อม | ลอบเข้าด้านข้างหรือทำลายก่อนตั้งยิง | 180/60 ·4·28s |
| Synapse Warden | support ฟื้นยูนิตใกล้และตรวจสอดแนม | เลือกฆ่าsupportก่อน ไม่ยืนแลกกับแนวที่มีheal | 100/30 ·3·20s |

อาคาร4ชนิด: **Brood Heart** HQ/รับทรัพยากร/ฐานสร้าง; **Brood Chamber** คิวผลิต; **Spine Nest** ป้อมคุมทรัพยากรและฐาน; **Gene Vault** วิจัยและปลดล็อกtier หน้าตาต่างแต่ใช้Building componentร่วมกัน

### AETHERION SYNOD — ผลึกพลังงาน

ภาพ: ผลึกobsidian/มุกม่วง แกนcyan เรขาคณิตยึดด้วยพลังงาน เงาร่างชัด เกราะเป็นแผ่นผลึก อาคารเป็นวงแหวนและเสาผลึก เอกลักษณ์: ยูนิตน้อย ราคาแพง ป้องกันหน้า/โล่ ยิงไกล และสร้างพื้นที่ชะลอ ต้องคุมตำแหน่งและรักษาตัวแพง

เศรษฐกิจใช้ Flux และ Core Shards โดย Fluxเป็นชื่อresourceหลักของเผ่านี้ ต้นทุนใช้ระบบข้อมูลร่วมกับBiomass แต่ผลเก็บ/ราคาแตกต่าง เครือข่ายพลังจากHQ/อาคารกำหนดเขตสร้าง ไม่ทำให้ป้อมวางได้ทั่วแมพ

จุดอ่อน: ต้องการเวลาและposition ยิงลำแสงมีwind-up/telegraph ชัด หน่วยหนักหันด้านหน้าได้ช้า ปาร์ตี้flankหรือบีบเดินหลายเส้นทางจะทำให้เสียโล่หน้า และ unitแพงตายแล้วกระทบเศรษฐกิจมากกว่าMYRAX

| ยูนิต | บทบาท/ความสามารถ | สิ่งที่ฮีโร่ใช้แก้ | Flux/Shards · Pop · เวลา |
|---|---|---|---|
| Shard Collector | worker เก็บflux/สร้าง/ซ่อม ดูเหมือนลอยต่ำแต่ใช้navพื้น | ตัดเศรษฐกิจและป้องกันจุดขยาย | 60/0 ·1·10s |
| Prism Lancer | ประชิด ใช้phase stepระยะสั้นมีคูลดาวน์ | หลอกให้ใช้stepแล้วสวนโจมตี | 60/10 ·2·10s |
| Ray Sentinel | ยิงลำแสงแม่น ต้องเตรียมยิง | หลบตอนเตือน/ใช้กำบัง/เข้าใกล้ | 100/20 ·3·15s |
| Bulwark | หนัก โล่เฉพาะด้านหน้า คุ้มครองแนวหลัง | วนตีด้านข้าง/หลัง ทุบให้เสียจังหวะ | 180/35 ·5·25s |
| Rift Artillery | ประจำที่ยิงsiege ลำแสงยาว chargeก่อนยิง | เข้าจัดช่วงตั้งตัวหรือวิ่งออกแนวเล็ง | 220/70 ·5·32s |
| Nexus Weaver | เชื่อมฟื้นโล่ของพันธมิตรจำกัด2ตัว | ฆ่าweaver/แยกเป้าหมายออกจากระยะlink | 130/40 ·3·22s |

อาคาร4ชนิด: **Nexus Core** HQ; **Prism Gate** ผลิต; **Lens Pylon** ป้อม; **Resonance Archive** วิจัย ฐานเดียวกันกับMYRAXในแง่ระบบ แต่data/visual/abilityต่าง

## 6. วิจัย/สกิลเผ่า — ครบสองเผ่า

เป็น research ระหว่างแมตช์ จ่ายresourceและรอเวลา ไม่ใช้แต้มmetaถาวรที่ทำให้ผู้เล่นเก่าเหนือกว่าคนใหม่ ทุกแมตช์เริ่มกฎเทคเดียวกัน ฝั่งบัญชีปลดล็อกความสะดวก/รูปลักษณ์/รูปแบบloadoutที่มีงบเท่ากันได้ภายหลัง

มี3สาย Economy/Army/Command เผ่าละ9โหนดในภาพ แสดงtier/prerequisite/resource/time/queue ปุ่มเริ่มresearchหักและจองต้นทุนที่server หลังเสร็จจึงเปลี่ยนความสามารถ ระหว่างเปิดหน้าวิจัยเกมไม่pause มีทางกลับbattleทันที จำกัด1researchพร้อมกันต่อtech buildingในเดโม

### MYRAX Gene Vault

| สาย | โหนด | ผลเริ่มต้นที่เสนอ |
|---|---|---|
| Economy | Biomass Cycle | workerเก็บresourceหลักเร็วขึ้น10% |
| Economy | Rapid Hatch | ลดเวลาผลิต10% |
| Economy | Colony Growth | เพิ่มsupply cap40→60 |
| Army | Chitin Plating | โบนัสลดดาเมจที่เกราะรองรับ: TierI8%→TierII12% |
| Army | Acid Catalyst | ดาเมจกรดต่อเวลา+15% |
| Army | Brood Fury | ดาเมจประชิด+12% |
| Command | Spore Surge | สั่งบัฟความเร็วกลุ่มที่เลือก20%ช่วง10s |
| Command | Synapse Web | เพิ่มผลฟื้นของWarden15% |
| Command | Predator Mark | เปิดตำแหน่งฮีโร่ที่เลือกซึ่งมองเห็นตอนสั่งช่วง6s |

ตัวอย่างภาพ: Chitin Plating I→II ใช้Biomass150+Shards30 รอ30s ต้องมีGeneVault เสร็จแล้วผลเข้าหน่วยรบMYRAXเท่านั้น ไม่บัฟworkerฟรีจากทุกresearch เปอร์เซ็นต์โบนัสเกราะจะถูกคิดกับbaseด้วยสูตรที่กำหนดและมีเพดาน ไม่บวกจนอมตะ

### AETHERION Resonance Archive

| สาย | โหนด | ผลเริ่มต้นที่เสนอ |
|---|---|---|
| Economy | Flux Efficiency | workerเก็บFluxเร็วขึ้น10% |
| Economy | Power Grid | supply cap40→60 |
| Economy | Gate Calibration | ลดเวลาผลิต10% |
| Army | Prism Coating | เพิ่มความจุโล่15% |
| Army | Resonant Lenses | โบนัสยิงไกลTierI12%→TierII18% |
| Army | Siege Focus | ลดเวลาchargeของArtillery15% |
| Command | Phase Step | เพิ่มระยะstepของLancer15%ภายใต้ระยะสูงสุด |
| Command | Linked Aegis | เพิ่มระยะlinkของWeaver20% |
| Command | Gravity Pulse | commanderวางพื้นที่ชะลอ20%ช่วง8s มีเตือนก่อนทำงาน |

ตัวอย่างภาพ: Resonant Lenses I→II ใช้Flux175+Shards40 รอ35s ต้องมีArchive ผลเข้าการยิงไกลที่รองรับเท่านั้น ไม่เพิ่มค้อนฮีโร่หรือworker

Active commander abilities ใช้energyส่วนกลางที่ฟื้นตามเวลา มีcooldownและradius/cast range เซิร์ฟเวอร์ตรวจtargetvisionและเงื่อนไข การmarkจากยูนิตที่มองเห็นแล้วเป็นexceptionที่อนุญาตให้แสดงข้อมูลช่วงสั้น ไม่ให้clientเปิดfogเอง Telegraphed slow/beam ต้องมีเวลาหลบแม้pingปานกลาง

หน่วยเดโมแรกเผ่าละworker+ประชิด+ยิงไกล+ตัวถึก ส่วนsiege/supportกับ9researchเต็มเพิ่มหลังgrayboxผ่าน ภาพทั้งหมดเป็นเป้าหมายรุ่นถัดไป ไม่ตีความว่าทุกอย่างต้องยัดเข้าเดโมแรก

### ตารางต้นทุน/เงื่อนไขวิจัยสำหรับเริ่มทำข้อมูลเกม

ทุกแถวต้องมีอาคารวิจัยเผ่าตัวเองที่สร้างเสร็จและยังมีชีวิต ก่อนหักต้นทุน ตรวจอาคาร/ทรัพยากร/เทคที่ต้องมีอีกครั้งฝั่งเซิร์ฟเวอร์ ราคาและเวลาเหล่านี้เป็นข้อเสนอสำหรับทดสอบ ไม่ใช่ผลบาลานซ์จากเกมจริง แต่ละสายวิจัยตามลำดับแนวตั้งใน UI:

| MYRAX | Biomass/Shards | เวลา | ต้องมีมาก่อน |
|---|---|---|---|
| Biomass Cycle | 100/0 | 20s | Gene Vault |
| Rapid Hatch | 140/20 | 25s | Biomass Cycle |
| Colony Growth | 180/30 | 30s | Rapid Hatch |
| Chitin Plating I | 100/15 | 20s | Gene Vault |
| Chitin Plating II | 150/30 | 30s | Chitin Plating I |
| Acid Catalyst | 160/35 | 30s | Chitin Plating I |
| Brood Fury | 200/50 | 35s | Acid Catalyst |
| Spore Surge | 120/20 | 25s | Gene Vault |
| Synapse Web | 150/35 | 30s | Spore Surge |
| Predator Mark | 200/50 | 35s | Synapse Web |

| AETHERION | Flux/Shards | เวลา | ต้องมีมาก่อน |
|---|---|---|---|
| Flux Efficiency | 110/0 | 20s | Resonance Archive |
| Power Grid | 150/25 | 25s | Flux Efficiency |
| Gate Calibration | 190/40 | 30s | Power Grid |
| Prism Coating | 130/20 | 25s | Resonance Archive |
| Resonant Lenses I | 125/20 | 25s | Prism Coating |
| Resonant Lenses II | 175/40 | 35s | Resonant Lenses I |
| Siege Focus | 230/60 | 40s | Resonant Lenses I |
| Phase Step | 120/20 | 25s | Resonance Archive |
| Linked Aegis | 170/40 | 30s | Phase Step |
| Gravity Pulse | 220/60 | 40s | Linked Aegis |

Chitin และ Resonant เป็นโหนดเดียวที่กดเพิ่มrankได้ จึงยังมี9โหนดต่อเผ่าแม้ตารางต้นทุนมี10แถว UpgradeII เป็นทางเลือกเสริม ไม่บังคับให้ต้องจ่ายก่อนเปิดโหนดถัดไป ผลแต่ละrankแทนค่าก่อนหน้า ไม่บวกI+IIซ้ำ วิจัยเสร็จอัปเดตทั้งยูนิตปัจจุบันและที่ผลิตใหม่ซึ่งมีtagตรงกับผลวิจัย

Commander energy เริ่ม50/สูงสุด100 ฟื้น1ต่อวินาทีเป็นค่าเสนอ: Spore Surge ใช้35/cooldown45s/วงรัศมี4ช่อง บัฟยูนิตฝ่ายตนที่อยู่ในวงตอนร่าย; Predator Mark ใช้30/cooldown40s/เป้าหมายฮีโร่ที่มองเห็นในระยะ12ช่อง; Gravity Pulse ใช้40/cooldown50s/วง3ช่องในพื้นที่มองเห็น เตือน1วินาทีก่อนชะลอ8วินาที สิ่งปลูกสร้าง/แกนไม่รับbuffหรือslowเหล่านี้ ระหว่างcooldownปุ่มแสดงเวลาที่เหลือและปิดการกดอย่างชัดเจน

สถานะโหนดในUI: lockedแสดงprerequisite, availableแสดงราคา/เวลา, researchingแสดงprogressและqueue, completedแสดงผลที่ใช้อยู่, maxrankปิดปุ่มและเขียนMAX. เปิดหน้าUIไม่ทำให้resourceหยุดผลิตหรือเกมpause. ยกเลิกresearchคืน75%ของต้นทุนเป็นข้อเสนอ อาคารถูกทำลายยกเลิกงานและคืน0% โดยresearchที่เสร็จแล้วไม่หาย

## 7. คริสตัล/อัปเกรดในโหมดผู้เล่นสองฝั่ง

คงระบบRubyโจมตี, Sapphireป้องกัน, EmeraldHP, Amethyststagger และอาวุธ3ช่อง/เกราะ2ช่องในฐาน ใช้กับลีราและเวลเว็ต ข้อเสนอCorewarPvPให้ทุกคนเข้าถึงชุดคริสตัลแข่งขันเดียวกันตามงบbuildรวม10แต้ม TierI/II/IIIใช้1/2/3แต้ม ไม่ได้เปรียบจากเลเวลบัญชีหรือความหายากที่ฟาร์มมานานกว่า

ภาพLYRAforgeเป็นตัวอย่างงบ4/10: WeaponRubyI+AmethystI และArmorEmeraldII; ใส่RubyIIอีกก้อนใช้2แต้มจะเป็น6/10 ค่าโจมตี180→240 (bonus+60) ไม่มีการเปลี่ยนความเร็ว/autohealจากactionนี้ ค่าจริงจะกำหนดหลังทดสอบmatch

ถอด/แทนที่คืนgemฟรีในฐานและก่อนแมตช์ ระหว่างแข่งขันเปลี่ยนในจุดพักที่ปลอดภัยตามกฎเดียวกันของทีมและต้องรอเวลาทำรายการ UIไม่pauseแมตช์ และฝ่ายRTSยังเล่นต่อได้ Buffการ์ดระหว่างรอบต้องใช้pool/งบที่กำหนด ไม่สุ่มแจกpowerสูงโดยไม่มีฝั่งคู่แข่งตอบโต้ได้

โหมดcoopvsAIในอนาคตใช้การเติบโตถาวรเต็มได้โดยแยกกติกาจากCorewarPvP อย่าใช้loadoutไม่จำกัดจากโหมดนั้นเข้าแมตช์แข่งขัน

## 8. UI สองฝั่ง

HeroHUD: healthตัวเอง, เพื่อน/โควตาชุบ, CoreHP, Stabilization, timer, ปืนหรือคอมโบ, skillcooldowns, minimapและping ไม่เห็นresource/คิวผลิตศัตรู

CommanderHUD: resource2ชนิด, supplyปัจจุบัน/เพดาน, minimap+fog, drag-select, selection portraits, orders Move/Attack/Hold/Stop, Build/Train/Research grid, คิวผลิตและresearch, energy commander ไม่มีammo/XPของฮีโร่

ภาพRTSแสดงbasewestและcoreNEที่กำลังถูกscout ไม่ได้แปลว่าคอมมานเดอร์มองเห็นแมพทั้งหมด กล้องpartyใกล้และตามตัวละคร; RTSซูมออก/pan/ย่อแผนที่ ใช้มุมภาพเดียวกันไม่มีrotatingcamera

ไฟล์ภาพเป้าหมาย6ภาพ:
1. lyra-weapon-forge-v2.png
2. corewar-party-gameplay-v1.png
3. myrax-rts-gameplay-v1.png
4. aetherion-rts-gameplay-v1.png
5. myrax-research-ui-v1.png
6. aetherion-research-ui-v1.png

ภาพเป็นคอนเซปต์การจัดวาง/อารมณ์ ไม่ใช่screenshotเกมที่สร้างแล้ว ตัวเลข/selectionบางจุดที่AIวาดอาจไม่ตรงdata เช่นแถบHPของVELVETในภาพparty ให้ยึดสเปกและข้อมูลเกมในเอกสารเป็นหลัก ตอนสร้างUIจริงข้อความ/ค่าต้องอ่านจากstateของเกม และสถานะresearch/selectedunitต้องมีแหล่งข้อมูลเดียว

## 9. สถาปัตยกรรมที่พัฒนาได้จริง

ใช้Godot4.x stableที่ล็อกเวอร์ชัน/GDScript/เกม2D/spritesจากBlender ระบบเครือข่ายGodot ENet client–server ฝั่งserverเป็นผู้ตัดสินเกมทั้งหมด. GodotมีAPI multiplayerและการexport dedicated/headless serverอยู่แล้ว ไม่ต้องสร้างengineหรือprotocolทุกส่วนใหม่

หนึ่ง MatchWorld, physics/navigation/damage/LOS/abilities/production/economy/research ชุดเดียวกัน บทบาทplayerกำหนดคำสั่งที่อนุญาตและUI HeroControllerส่งmove/aim/action; CommanderControllerส่งselection/orders/build/train/research ไม่แยกsimulationเป็นสองเกม

serverตรวจpeer/team/unitownership, ราคา/ทรัพยากร, reserved supply, prerequisites, cooldown/range/vision, ตำแหน่งสร้าง,nav reachabilityและการชน ไม่รับHPหรือผลฆ่าที่clientอ้างมาเอง ไม่ส่งคำสั่งยิงแบบclientตัดสินdamageก่อนแล้วให้serverเชื่อ

ค่าเริ่มต้นเพื่อวัด: server simulation30Hz, clientrender60Hz, state snapshotsประมาณ10–15Hz พร้อมinterpolation remoteunits และprediction/reconciliationเฉพาะheroตัวเอง ตามผลทดสอบปรับได้. ส่งคำสั่งbuild/train/researchเชื่อถือได้และมีsequenceกันซ้ำ; ใช้snapshotsคงความสดของposition ไม่ล็อกเดินรอคำสั่งทรัพยากร

Fog-of-war: serverเป็นคนคำนวณvisionทีม/LOSและกรองentity/stateก่อนส่ง ไม่ใช่ส่งตำแหน่งศัตรูทั้งหมดแล้วแค่ทาสีดำทับจอ ใช้visibility filters/interest managementเท่าที่Godotรองรับ ทีมมนุษย์แชร์visionระหว่างเพื่อน/ป้อม; RTSได้visionจากworker/unit/buildingตัวเอง. building last-seenเป็นcacheภาพตำแหน่งเดิม ส่วนmovingunitsหายเมื่อไม่เห็น ไม่มีข้อมูลองค์กรลับหลุดจากminimap/selection

การชนและpath: staticnavก่อน, squad ordersมีปลายทางย่อยหลายจุด,ทยอยrepathช่วง0.2–0.5sต่อหน่วย, spatialbucketsหาenemyใกล้/vision, capจำนวนunitsจริง, poolVFX/projectile. Buildingsบนgridตรวจว่าทางหลักยังผ่านได้ก่อนยืนยัน ต้องอัปเดตnavเมื่อสร้าง/ตายโดยไม่rebuildทุกเฟรม

Artpipeline: โมเดลต้นแบบมนุษย์sharedrigเดิม2ตัว, MYRAXใช้rigสัตว์ต้นแบบร่วมกับกระดองและbackweapon, AETHERIONใช้รูปทรงผลึก/rigง่ายใช้ชิ้นส่วนร่วม. Buildingsทำstaticsprites, abilityVFXร่วมtextureแล้วเปลี่ยนสี. HeroกับRTSใช้spriteatlasเดียวกัน แต่RTSลดdetailที่ซูมไกล. ไม่ต้องปั้นฉากใหม่เพราะสองฝั่งมีUIต่างกัน

เครื่องมือฟรีสำหรับpipelineหลัก: [Godot](https://godotengine.org/license/) ทำเกม/UI/เครือข่าย, [Blender](https://www.blender.org/about/) ทำโมเดล/rig/animation/เรนเดอร์, [Krita](https://krita.org/en/about/license/) วาดtexture/ไอคอน/แก้ภาพ. Tripoเป็นตัวช่วยโมเดลเริ่มต้นตามที่เจ้าของอยากใช้ แต่ไม่เป็นdependencyบังคับของโครงการและไม่ได้สมมติว่าquota/การส่งออกของบริการนั้นใช้ฟรีไม่จำกัด. โมเดลที่ได้ยังต้องตรวจtopology/rig/ชิ้นส่วนโปร่ง/วัสดุก่อนใช้ ขอบกระโปรงLYRAและผ้าVELVETใช้กระดูกเสริมไม่กี่ข้อในเดโม ไม่เริ่มด้วยcloth simulationออนไลน์

เริ่มสไปรต์8ทิศที่กล้องคงที่ ใช้idle/walk/attack/hit/deathร่วมระบบ มีเฉพาะฮีโร่ที่ต้องแอนิเมชันคอมโบเต็ม วัดขนาดatlas/หน่วยความจำก่อนเพิ่มframeหรือทิศทาง ต้นแบบenemyหนึ่งตัวต่อrigเป็นquality gateก่อนปั้นทั้งroster; workerอาจใช้animationน้อยกว่าหน่วยรบ อาคาร4ชนิดต่อเผ่าใช้ภาพstaticพร้อมเอฟเฟกต์สร้าง/โดนตี/แตกจากระบบกลาง

UIจริงสร้างด้วยGodot Control/container และข้อความแยกจากภาพ เพื่อแปลไทย/อังกฤษและเปลี่ยนเลขได้ ตัดกรอบมุม/พื้นแผงเป็นชิ้นนำกลับใช้ซ้ำแทนการใช้ภาพAIเต็มจอเป็นUIโต้ตอบ หน้าคอนเซปต์16:9ใช้เป็นแนวทางจัดวาง: minimapประมาณ240px, แถบคำสั่งท้ายจอประมาณ190px, researchแบ่งleftpreview/center3branches/rightdetail ปรับscaleและตัวหนังสือทดสอบที่1366×768ด้วย ไม่ใช้สีอย่างเดียวแยกlocked/selected/enemy

ภาพเป้าหมายมีแสง/ควัน/เศษแตกหนาแน่นเพื่อสื่ออารมณ์ เกมจริงต้องมีค่าVFX low/medium/high จำกัดparticleและแสดงวงเตือนอันตรายเหนือeffect ให้เห็นเงาร่าง/เท้าตัวละครเสมอ ใช้normal mapและแสง2Dเฉพาะจุดสำคัญ ภาพนิ่งสวยไม่ใช่หลักฐานว่าเกมทำframe rateได้ตามเป้า

LAN/hostบนคอมเดิมเริ่มได้โดยไม่เสียค่าบริการเซิร์ฟเวอร์ ทดสอบInternetผ่านENetต้องมีเส้นทางเข้าถึงhost เช่นUDPforwarding/เครื่องserverที่เข้าถึงได้ หากใช้hosting/relayมีต้นทุนแยก ไม่รับประกันpubliconlineฟรีตลอด ไม่มีmatchmaking/ranked/hostmigrationในเดโม

## 10. แผนพัฒนาที่แทนกรอบเดโมเดิม

ขอบเขตใหม่นี้ใหญ่กว่าเกมยิงofflineเดิม กรอบ6–8สัปดาห์เดิมไม่ครอบคลุมPvP RTS+party. สมมติคนดูแลงานมีพื้นฐานGodotและทำ20–30ชั่วโมง/สัปดาห์ร่วมcodingagents เดโม2v1ประมาณ12–16สัปดาห์หลังเริ่มจริงเป็นกรอบประมาณ ต้องประเมินจากgraybox; รุ่นเล็ก4v1พร้อมสองเผ่า6ยูนิต/เผ่าและภาพpolishมีกรอบหลายเดือน ประมาณ6–12เดือนตามกำลังคน/งานศิลป์ ไม่รับประกันวันส่ง

| ช่วง | ผลส่งมอบ | เงื่อนไขผ่าน |
|---|---|---|
| W1–2 | ห้องgraybox1hero vs commander1 unitผ่านLAN/loopback | serverตัดสินmove/damage/coreชนะร่วมกัน; ไม่แยกข้อมูลsimulation |
| W3–4 | RTSworkerresource/build/train/selection/orders | ผลิตตามราคาเวลาpop, รับคำสั่งซ้ำไม่เกิดunitฟรี, ยกเลิกคืนตามกฎ |
| W5–6 | ECHO CORE3lane, fog, path, timer/repair | ไม่มีentityhiddenหลุดclient, ไม่มีunitติดค้างถาวร, สร้างไม่ปิดทุกทาง |
| W7–8 | LYRA+VELVET2v1, downed/revive, ping, normalizedloadout | เพื่อนช่วยกันจริง, gem/statuspreviewถูก, reconnectดึงstateใหม่ |
| W9–10 | art sliceฮีโร่2/สองเผ่าอย่างละunitต้นแบบ/HQ | ทั้งheroและRTSอ่านภาพเดียวกันชัด, framebudgetผ่านเครื่องอ้างอิง |
| W11–12 | race2 worker+3combat, researchย่อย3/เผ่า | swapraceไม่เปลี่ยนcoregame, แต่ tacticsต่างกันจริง |
| W13–16 | เสียง/Internettest/bug/balance/export | เล่น2v1จบหลายseedหลายรอบก่อนเพิ่ม4v1 |

หลังเดโม: siege/supportทั้งสองเผ่า, researchครบ9ต่อเผ่า, อีก2ฮีโร่/พันธมิตร, 4v1, แมพใหม่2ใบ. ต้องวัดหลังเพิ่มจำนวนผู้เล่นกับunits ไม่ถือว่าเดโม2v1ผ่านแล้ว4v1จะผ่านอัตโนมัติ

## 11. เกณฑ์ทดสอบหลัก

- เล่นหนึ่งแมตช์15นาทีทั้ง2v1หลายครั้ง คอร์/timer/kill/revive/resourcesสอดคล้องทุกเครื่องและผลชนะครั้งเดียว
- ปาร์ตี้ทำลายproduction/workerแล้วเศรษฐกิจเอเลี่ยนลดจริง commanderย้ายแนวบุกแล้วฮีโร่ต้องตอบโต้ ไม่ใช่UIRTSที่กดแล้วspawnwaveฟรี
- Unitที่เลือกMove/Attack/Hold/Stopและproductionqueueทำงานครบทั้งสองเผ่า เวลาวิจัยตรงและไม่pauseเวลาเกม
- ทดสอบlatencyจำลอง100–150msและpacket lossเล็กน้อย ไม่มีunitduplicate/resourceฟรี/regenkillซ้ำ; combohit windowserverยืนยันได้
- fogตรวจที่ข้อมูลnetworkไม่ใช่ดูภาพอย่างเดียว hiddenhero/unitไม่ถูกส่งให้ศัตรูโดยไม่เข้าเงื่อนไขvision
- ประสิทธิภาพเป้าหมายหลังระบุเครื่องอ้างอิง: client1080p60FPSที่60alienunitsพร้อม4heroes/ป้อม; serverP95simtick≤33.3msที่loadเดียวกัน. เป้าหมายนี้ยังไม่verifiedจากconcept
- disconnectคนใดคนหนึ่งไม่ทำให้matchค้าง: heroสำรองโดยAIง่ายหลังช่วงรอ หรือpauseบทบาทตามกฎcustomlobby; commanderถูกAIแทน. Rejoinช่วงสั้นดึงsnapshotและสถานะงานวิจัยจากserver
- save/loadคริสตัล/skillไม่ซ้ำitem ล็อกcompetitivecatalog/งบbuildเหมือนกันสำหรับทุกคน ไม่มีrankถาวรฝ่ายRTSที่เพิ่มpowerตั้งต้น

## 12. งานร่วม coding agents ที่เสนอ

Codexดูserverauthority/commandprotocol/combat/validation/data; ClaudeCodeดูRTSselection/orders/buildUI, production/researchUI และasset tooling; เจ้าของplaytestทั้งสองฝั่งและเลือกภาพ. ทบทวนงานกันข้ามฝั่งและแบ่งmodule/branch/worktree ไม่แก้ไฟล์coreเดียวพร้อมกัน บทบาทนี้เป็นข้อเสนอ ยังไม่ได้ส่งงานหรือเริ่มทีมจริง

งานแรกเมื่อเริ่มสร้าง: graybox2clientsบนคอมเดียว หนึ่งheroหนึ่งcommander สามารถเดิน ยิง เลือกunitและสั่งattackcore จบmatchเดียวกันได้ ก่อนทำresearchเต็มและเอฟเฟกต์

## แหล่งทางการที่ตรวจ

- [Godot high-level multiplayer / ENet / hosting](https://docs.godotengine.org/en/stable/tutorials/networking/high_level_multiplayer.html)
- [Dedicated server export](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_dedicated_servers.html)
- [MultiplayerSynchronizer visibility filters](https://docs.godotengine.org/en/stable/classes/class_multiplayersynchronizer.html)
- [Godot license](https://godotengine.org/license/)
- [Blender free/open source](https://www.blender.org/about/)
- [Krita license and artwork use](https://krita.org/en/about/license/)

อิงโน้ตที่อ่าน “HIVE BREACH — คอนเซปต์เกมยิงเอเลี่ยน 2.5D และแผนเดโม” ส่วนคริสตัล/อัปสกิล และภาพLYRA/VELVETเดิม การใช้คำว่าRTSแบบStarCraftเป็นคำอธิบายรูปแบบควบคุม เผ่า ชื่อ ยูนิต อาคารและภาพในข้อเสนอนี้เป็นการออกแบบใหม่
