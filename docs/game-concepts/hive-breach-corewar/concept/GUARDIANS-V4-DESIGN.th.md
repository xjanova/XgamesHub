# HIVE//BREACH: COREWAR — Guardians V4 (ฉบับล่าสุด)
วันที่ 7 ตุลาคม 2026 · สเปกและภาพคอนเซปต์ตามคำแก้ของเจ้าของ · ยังไม่ได้สร้างเกมที่เล่นได้

## 1. ข้อกำหนดล่าสุดที่ต้องยึด
1. Active Skills เป็นของตัวละครนั้น ๆ เท่านั้น แต่มีหลายทางเลือกและหลายแนวอัปเกรดภายในชุดความสามารถของตน
2. การข้ามสายใช้เฉพาะ Passive Skills เพื่อเสริมจุดเด่นหรือสร้างบิลด์ผสม ไม่เรียนFireLanceของASTRAให้LYRA หรือย้ายHealPulseของIRISให้NOVA
3. ฝั่งผู้ปกป้องมี4หน้าที่: โจมตี / แท้งค์ / ซัพพอร์ต / ฮีลเลอร์ ตัวละครมีหน้าที่หลักและรูปแบบย่อยชัดเจน
4. สองเผ่าผู้ปกป้อง HUMAN / ANDROID มีOriginต่างกันและเลือกชายหญิงได้ ความสามารถไม่แยกตามเพศ
5. RTSต้องซูมไกล เห็นพื้นที่วางแผน กล้องpan/zoom/กดมินิแมพย้ายตำแหน่งได้ มีFog of Warจริง
6. ฮีโร่เริ่มสำรวจพื้นที่ที่ยังไม่รู้จัก เปิดแมพไปเรื่อย ๆ ฆ่า/มีส่วนร่วมในการต่อสู้เพื่อรับEXPและแต้มสกิล
7. ทั้งสองฝั่งตั้งแผนอัปเกรดล่วงหน้า เปิดAuto Upgrade/Research และAuto Castรายสกิลได้ แต่ยังควบคุมและสั่งเองได้
8. กติกาพื้นฐาน4guardians vs1aliencommander, core15นาที, MYRAX/AETHERIONตามV2ยังใช้ต่อ เดโมแรก2v1ตามลำดับที่วางไว้

**ยกเลิกV3ที่เป็นผังรวมActiveข้ามตัวละคร** และการแจกแต้มตามเวลาในV3 ให้ใช้V4เป็นหลัก ภาพV3ที่เขียนNO CLASS LOCKเป็นร่างเก็บประวัติ ห้ามนำไปเป็นสเปกเกมจริง

## 2. การเลือกตัวละคร / สองเผ่า / ชายหญิง
ลำดับหน้าเลือก RACE & HERO → APPEARANCE → HERO SKILLS → PASSIVE ATLAS → LOADOUT
HeroDefเป็นชุดความสามารถและเผ่าที่กำหนดไว้ Appearanceชายหญิง/ชุด/ผมไม่เปลี่ยนHeroDefหรือค่าสกิล ตัวอย่างLYRAเป็นHuman ส่วนSERAPHเป็นAndroid เปลี่ยนรูปหน้าไม่ทำให้เผ่าเปลี่ยน
แต่ละHeroKitรองรับbodyชาย/หญิงของเผ่าตน ผู้เล่นใช้ชื่อที่ตั้งเองได้ สาวที่วาดเป็นรูปลักษณ์เริ่มต้นที่นำเสนอ ถ้าเลือกbodyชายยังเป็นkitเดิม ไม่สลับสกิลเพราะเพศ
เริ่มartจาก4base bodies (HumanM/F,AndroidM/F) sharedrig/retarget แล้วอุปกรณ์/ผมแยก ไม่สร้างcontrollerแยกตามเพศหรือpresetหน้า
RaceและHeroเป็นการเลือกก่อนmatch ไม่เปลี่ยนเผ่าหรือยืมkitตัวละครอื่นกลางmatch

| เผ่า | ความสามารถOriginที่เสนอ | ข้อแลกเปลี่ยน |
|---|---|---|
| HUMAN | Adaptive Instinct: หลังหลบถูกจังหวะรับdamageลด10%1.5s cd10s; Field Focus: หลังร่วมkillฟื้นenergyเพิ่ม10%3s | ไม่มีbufferของเผ่าตั้งต้น ต้องพึ่งชุดและพาสซีฟ |
| ANDROID | Shield Buffer60HPฟื้น5/sหลังไม่โดน5s; Reactor Overdrive: หลังใช้สกิลregenenergyเพิ่ม15%3s cd8s | EMPที่มีtelegraphหยุดbuffer/energyregen2sแต่ไม่ล็อกเดินหรือยิง |

Originเป็นpassiveของเผ่า ไม่ใช่พาสซีฟกลางที่ย้ายHumanOriginให้Androidได้ ทั้งสองเผ่าเล่นได้ทุกหน้าที่ผ่านHeroKitของเผ่านั้น ตัวเลขต้องบาลานซ์อีกครั้ง

## 3. ตัวละคร8คน / Hero Skills12โหนดต่อคน
### LYRA — HUMAN / MOBILE MEDIC

รูปลักษณ์: adult beautiful human woman, silver-lavender ponytail, pearl white/graphite armor, flowing translucent cyan/lavender flared skirt over opaque combat shorts, white boots, pulse PISTOL; exact LYRA reference identity

- **PULSE PISTOL**: PULSE SHOT → RICOCHET SHOT → GUARDIAN BURST → PRECISION FEED
- **MOBILE MEDIC**: AUTO HEAL → NANO BOOST → RECOVERY TIMING → MEDIC RESERVE
- **SWIFT STEP**: PHASE STRIDE → RESCUE DASH → FAST FOOTWORK → MOBILE AIM

ชุดกดใช้ที่แสดงในภาพ: PULSE SHOT / RICOCHET SHOT / PHASE STRIDE / GUARDIAN BURST

เอกลักษณ์: AUTO HEAL 3% MAX HP / SEC AFTER 4 SEC WITHOUT DAMAGE; MOVE 120%

### VELVET — HUMAN / REAPER / BLOODGUARD

รูปลักษณ์: adult beautiful human woman, long PINK TWIN TAILS, black crimson silver gothic armored bodice, flowing layered black/pink flared skirt over opaque shorts, thigh boots, huge two-handed REQUIEM HAMMER; exact VELVET reference identity

- **HEAVY COMBO**: SWEEP → LIFT → SLAM → REQUIEM BREAKER
- **BLOOD ENGINE**: BLOOD SIPHON → BLOOD POWER → BLOOD SURGE → SIPHON RESERVOIR
- **REAPER DEFENSE**: REAPER GUARD → CARAPACE BREAK → GUARD WINDOW → HEAVY ENDURANCE

ชุดกดใช้ที่แสดงในภาพ: SWEEP / LIFT / SLAM / REQUIEM BREAKER

เอกลักษณ์: HIGH ARMOR; SIPHON TRIGGERS ON KILL ONLY

### ASTRA — HUMAN / ELEMENTALIST

รูปลักษณ์: adult human woman, long deep-purple braid, amber eyes, black-violet armored bodice with copper trim, violet flowing rune-lit flared skirt over opaque shorts, floating diamond spell focus; roster column1 exact identity

- **FIRE**: FIRE LANCE → EMBER TRAIL → METEOR BURST → BURNING FOCUS
- **FROST**: FROST NOVA → ICE WALL → SHATTER SHOT → COLD MASTERY
- **LIGHTNING**: CHAIN ARC → ARC STEP → STATIC FIELD → LIGHTNING MASTERY

ชุดกดใช้ที่แสดงในภาพ: FIRE LANCE / FROST NOVA / CHAIN ARC / METEOR BURST

เอกลักษณ์: FIRE / FROST / LIGHTNING BELONG TO ASTRA

### ECHO — HUMAN / FIREARMS SPECIALIST

รูปลักษณ์: adult human woman, long auburn high ponytail, green eyes, charcoal-burgundy tactical armor with short flared split coat over opaque shorts, thigh boots, futuristic white-black sniper rifle; roster column2 exact identity

- **PISTOL**: QUICK DRAW → MOBILE SHOT → RICOCHET → PISTOL TUNING
- **SNIPER**: FOCUS → PIERCE SHOT → WEAKPOINT → STEADY AIM
- **MACHINE GUN**: SUPPRESS → HEAT VENT → OVERDRIVE → FEED BELT

ชุดกดใช้ที่แสดงในภาพ: QUICK DRAW / PIERCE SHOT / SUPPRESS / HEAT VENT

เอกลักษณ์: SELECT PISTOL / SNIPER / MACHINE GUN WITHIN ECHO KIT

### RHEA — HUMAN / SHIELD BASTION

รูปลักษณ์: adult human woman, short dark-teal bob, tall athletic body, heavy navy-white/silver segmented armor, armored flared waist coat with opaque leggings and boots, huge physical hexagonal silver-blue TOWER SHIELD as weapon, NO SWORD; roster column3 exact identity

- **SHIELD STRIKE**: SHIELD BASH → SHIELD RUSH → IMPACT EDGE → STAGGER FORCE
- **FORTRESS**: IRON WALL → CORE ANCHOR → FORTRESS FIELD → UNBREAKABLE
- **SECOND WIND**: SECOND WIND → RECOVERY TIMING → CHALLENGE PULSE → HEAVY ENDURANCE

ชุดกดใช้ที่แสดงในภาพ: SHIELD BASH / IRON WALL / CORE ANCHOR / SHIELD RUSH

เอกลักษณ์: TOWER SHIELD IS THE WEAPON; VERY HIGH DURABILITY

### SERAPH-09 — ANDROID / LIGHTBLADE GUARDIAN

รูปลักษณ์: adult female android, long straight WHITE hair, golden eyes, pearl-white/gold segmented armor with subtle mechanical joints, flared articulated armored skirt and translucent cyan hem over opaque shorts, cyan LIGHT SWORD right hand and hard-light SHIELD left hand; roster column4 exact identity

- **LIGHTBLADE**: LIGHT SLASH → PHOTON EDGE → PHOTON TEMPEST → BLADE MASTERY
- **PRISM GUARD**: PRISM PARRY → REFRACT GUARD → PRISM BUFFER → GUARD WINDOW
- **AEGIS MOTION**: AEGIS DASH → BLADE ORBIT → DASH RESET → ENERGY FLOW

ชุดกดใช้ที่แสดงในภาพ: LIGHT SLASH / PRISM PARRY / AEGIS DASH / PHOTON TEMPEST

เอกลักษณ์: LIGHT SWORD + ENERGY SHIELD; ANDROID ORIGIN

### NOVA-7 — ANDROID / FIELD ENGINEER

รูปลักษณ์: adult female android, short MINT bob, amber eyes, navy-orange utility armor, flared pleated technical skirt over opaque shorts, visible mechanical joints, holographic construction wrist tool, wrench drone and compact deployable turret; roster column5 exact identity

- **TURRETS**: DEPLOY TURRET → OVERCLOCK → SENTRY LINK → CORE REPAIR
- **TRAPS**: ARC TRAP → CRYO MINE → CHAIN GRID → QUICK RESET
- **DRONES**: SCOUT DRONE → FIELD REPAIR → AMMO RELAY → RECOVERY DRONE

ชุดกดใช้ที่แสดงในภาพ: DEPLOY TURRET / ARC TRAP / SCOUT DRONE / OVERCLOCK

เอกลักษณ์: BUILD TURRETS / TRAPS / DRONES; NO TEAM HEAL CAST

### IRIS-3 — ANDROID / RESONANCE HEALER

รูปลักษณ์: adult female android, lavender/teal hair in two short orbital-loop buns, luminous teal eyes, pearl-white/lilac medical armor with flowing layered flared skirt over opaque shorts, subtle mechanical joints, cyan crystal healing staff and medical drones; roster column6 exact identity

- **RESTORE**: HEAL PULSE → RENEWAL FIELD → PULSE AMPLIFY → REGEN AURA
- **CLEANSE**: CLEANSE → PURIFY WAVE → STABILITY → WARD
- **RESCUE**: REVIVE LINK → EMERGENCY SHIELD → LAST LIGHT → SAFE RETURN

ชุดกดใช้ที่แสดงในภาพ: HEAL PULSE / CLEANSE / REVIVE LINK / EMERGENCY SHIELD

เอกลักษณ์: HEALS HUMAN + ANDROID; DOES NOT REPAIR THE CORE

ต้นไม้แต่ละคนมี12โหนดรวมActive/ตัวปรับActive/Signatureเฉพาะตัว รูปเส้นในภาพเป็นการสื่อแนวทาง ให้กำหนดAND/ORและrankในdataจริง ไม่ยึดเส้นAIที่อาจพาดผิด การเรียนโหนดส่วนตัวตรวจHeroIDเสมอ
เลือกActive4ช่องQ/E/R/Fจากสกิลที่เรียนในkitตนได้ DodgeSpaceแยก SkillModifiersของตัวเองอัปเพิ่มdamage/range/cooldown/จังหวะcombo ไม่ย้ายไปเปิดActiveของตัวอื่น
LYRAคงปืนพก autohealและmove120%; VELVETคงค้อน ถึก และsiphonเมื่อkillเท่านั้น; RHEAใช้โล่เป็นอาวุธ ไม่ต้องถือดาบ; SERAPHโล่+ดาบแสง; ECHOเลือกปืนพก/สไนเปอร์/ปืนกลได้ภายในkitตน; ASTRAใช้focusเวทย์ธาตุ; NOVAสร้างป้อมกับดัก; IRISฮีลทีม
PassiveSignatureเช่นLYRAAutoHeal/VELVETSiphon/RHEASecondWindยังเฉพาะkit ส่วนSharedPassiveด้านล่างเป็นตัวเสริมที่ข้ามแนวได้ ไม่มีการยืมActiveเพราะเลือกพาสซีฟสาขาเดียวกัน

## 4. Passive Constellation Atlas — ข้ามแนวได้
ผังดวงดาวกลางมี4กลุ่มละ10โหนด +6ดาวผสม รวม46โหนด ต่างจากHeroSkills12โหนดของแต่ละคน มีzoom/filter/pathpreviewและคืนแต้มในฐานได้
| กลุ่ม | โหนดพาสซีฟ10รายการ | ประโยชน์ |
|---|---|---|
| OFFENSE | Power Focus, Precision, Critical Flow, Finisher, Armor Break, Element Potency, Range Discipline, Combo Rhythm, Suppression Edge, Opportunist | เพิ่มโจมตี/คริติคอล/ประสิทธิภาพอาวุธหรือธาตุที่มีอยู่ |
| DEFENSE | Vitality, Armor Weave, Shield Efficiency, Status Resist, Guard Stability, Impact Resist, Fortitude, Emergency Buffer, Frontline Resolve, Survival Instinct | HPเกราะโล่ต้านสถานะและการอยู่รอด |
| RECOVERY | Steady Recovery, Heal Received, Energy Regen, Kill Recovery, Recovery Delay, Medical Efficiency, Resource Return, Sustain Focus, Restorative Flow, Last Reserve | เสริมการฟื้นตัว การรับฮีลและenergy |
| UTILITY | Move Speed, Cooldown Flow, Resource Efficiency, Scout Range, Cast Stability, Reload Flow, Tool Efficiency, Revive Speed, Supply Sense, Team Link | คล่องตัว คูลดาวน์สำรวจและช่วยทีม |

ดาวผสม6: Sustained Guard(Defense+Recovery), Battle Tempo(Offense+Utility), Hunter Focus(Offense+Utility), Field Sustain(Recovery+Utility), Bulwark Rhythm(Defense+Offense), Rescue Network(Recovery+Defense)
ทุกคนเลือกได้จากทุกกลุ่ม แต่UIแสดงว่าmodifierบางอันต้องมีกลไกที่เข้ากัน เช่นElementPotencyจะไม่สร้างเวทย์ธาตุให้LYRA; ShieldEfficiencyจะไม่ให้ECHOใช้โล่ของSERAPH; ToolEfficiencyเสริมtoolที่kitมีเท่านั้น
ตัวอย่างLYRA: MoveSpeed+CriticalFlow+SteadyRecovery; VELVET:Vitality+KillRecovery+ComboRhythm; RHEA:ArmorWeave+HealReceived+CooldownFlow; NOVA:ToolEfficiency+ScoutRange+EnergyRegen; IRIS:CastStability+EnergyRegen+Vitality
ค่าต้นแบบโหนดปกติ1PassivePoint/rank,ดาวผสม2points; rankcap3. ผลเพิ่ม3–10%ตามชนิดและคุมstackgroup ไม่บวกDamageReductionจน100% หรือทำcooldownเป็นศูนย์
SteadyRecoveryให้การฟื้นตัวเองแบบอ่อนหลังพ้นการโจมตีและเสริมผู้มีsignatureregenตามรายละเอียดด้านล่าง ไม่สร้างHealPulseให้ผู้ไม่มี; KillRecoveryแบบกลางเสนอคืน0.5%maxHP/kill cap2%/s แยกidentityVELVET4%/kill+BloodPower กลุ่มฟื้นจากkillใช้สูตรและเพดานชัด ไม่double-event
ตัวละครหนึ่งมี12personal+46shared+2raceorigin=60โหนดที่เกี่ยวข้อง catalog8hero96+46passive+4origin=146records ภาพpassiveatlasแสดงเฉพาะshared46และshortcutHeroSkills

Steady Recoveryนิยามเพิ่มความหลากหลาย: ฟื้นตัวเอง4/8/12HPต่อวินาทีตามrankหลังไม่โดน6s เป็นPassiveที่ทุกkitเรียนได้และทำงานเพิ่มจากsignatureในstackgroupflat_regenเดียวกัน ไม่มีปุ่มฮีลทีมและไม่ปลดActiveตัวละครอื่น เหมาะกับผู้ไม่มีregenหรือเสริมการฟื้นของLYRA/RHEA ต้องทดสอบร่วมกับค่ารับฮีล/เกราะ ไม่ใช้โหนดเดียวกันซ้ำหลายครั้งเพื่อstack

สกิลปืนของECHOมีequipment requirementของตน: ปุ่มสไนเปอร์ต้องถือสไนเปอร์ ปุ่มปืนกลต้องถือปืนกล UIแสดงinactiveพร้อมเหตุผลเมื่ออุปกรณ์ไม่ตรง ภาพต้นไม้แสดงตัวเลือกครบสามสาย ไม่ได้หมายความว่าฮีโร่ใช้สามปืนพร้อมกันได้โดยไม่มีเวลาสลับ

## 5. เริ่มสำรวจ / EXP / เลเวล / แต้ม
Matchเริ่มLV1 ช่วงแรกฝ่ายป้องกันมองเห็นเฉพาะฐานแกนและvisionรอบปาร์ตี้ พื้นที่ส่วนมากไม่เปิด ทีมต้องไปหาเสบียง จุดrelay และตรวจเส้นบุก ไม่เริ่มจากสนามที่เปิดทั้งหมด
KillXPตัวอย่าง: worker8,skitter20,spitter30,brute70,siege80,support35. ค่านี้แยกจากทรัพยากรฝ่ายRTS ต้องปรับเศรษฐกิจXPจากplaytest
EXPเกิดจากserverdeath eventเพียงครั้งเดียว จ่ายให้ผู้ร่วมต่อสู้ในวง9ช่องหรือมีdamage/block/supportassistใน8วินาทีที่ผ่านมา ผู้ฮีลเพื่อนที่มีส่วนร่วมkillและเจ้าของป้อมได้รับสิทธิ์ ไม่ต้องlast-hitแย่งกัน
แต่ละeligibleplayerรับbaseXPเดียวกันจากkillนั้น ไม่ให้การhealspamขณะไม่มีenemydeathหรือkillซ้ำinstanceเดิมผลิตXPฟรี ผู้ชุบช่วยทีมได้แต้มassistตามกฎcombat แสดงเหตุผลEXPบนHUD
LV1เริ่มbasicattack+สกิลแรกของhero+dodge; ทุกlevelตั้งแต่2ได้1HeroPoint,ทุกlevelคู่ได้1PassivePoint แยกสองกระเป๋า ใช้HeroPointซื้อkitตัวเอง ใช้PassivePointซื้อsharedpassive
XPcurveตัวอย่างLV1→2ต้อง100,→3ต้อง140,→4ต้อง190,→5ต้อง250,→6ต้อง320,→7ต้อง400 หลังจากนั้นปรับเพิ่ม เป้าหมายจบmatchประมาณLV8–10/สูงสุด12เพื่อทดลอง ไม่ถือว่าค่าตายตัวหรือเพดานบัญชีระยะยาว
**ไม่มีแต้มฟรีตามเวลาแบบV3** เลเวลmatchรีเซ็ตเมื่อเริ่มPvPทุกคนในกฎเดียวกัน ความก้าวหน้าบัญชีเป็นmastery/cosmetics/templates/ความรู้ ไม่เพิ่มpowerเริ่มต้นคนเก่าแบบไม่จำกัด
โหนดActiveIและrankทั่วไปใช้1HeroPoint ตัวพิเศษ/ultimate2pointsและLVเงื่อนไข SkillPointไม่เปลี่ยนslotsเกิน4 การเลือกสกิลใช้งานยังอยู่ภายในkitตัวเอง
อัปได้ระหว่างmatchโดยเกมไม่pause; serverตรวจแต้มและrankตอนtransaction การrefund/respecทั้งต้นไม้ทำที่ฐาน/ก่อนmatch ไม่ย้ายแต้มทันทีเพื่อหนีdamageกลางสู้
LYRAautoheal3%/sหลังไม่โดน4s RHEASecondWind2%หลัง4s VELVETSiphon4%/killcap12%/sตามฐานเดิม ทั้งสามไม่ซ่อมcoreหรือฮีลเพื่อนเอง
HealPulseIRISฟื้น120HPวง3ช่อง cd8s energy25เข้าHuman/Androidเท่านั้น; Cleanseล้างDOT/slow; ReviveLinkchannel2sโดนขัดได้; EmergencyShield140HP6s ยังต้องวัดค่าจริง
NOVAป้อม2/heroและteamcap4,trap3/heroteamcap6; Deploy60Scrap2s,ArcTrap35Scrapslow35%3s; CoreRepair40Scrapซ่อม300HP3s capทีม100HP/s เป็นsupportabilityไม่ใช่healerspell

## 6. กล้อง RTS และ Fog of War ทั้งสองฝั่ง
RTSCamera2D panด้วยWASD/edge scroll/middle drag, mousewheelซูม, clickminimapย้ายcamera, HomeกลับHQ, focusselectedunit. อัตรากล้องเริ่มแสดงพื้นที่กว้างประมาณ4–5เท่าของhero view ปรับได้หลังทดสอบ แต่ไม่ยึดมุมclose-upเดิม
ที่1080p RTSunitเป้าหมาย12–24pxสูง ส่วนheroใกล้ประมาณ65–90px รักษาsilhouette/selectionringและhoveroutline ห้ามเอาenemyclose-upสูง200pxใส่playfieldRTSแทนmap
มีminimapcamera rectangleที่เคลื่อนตามviewport การออกคำสั่งไม่ย้ายกล้องอัตโนมัติทุกครั้ง ผู้เล่นดูฐาน/แนวบุก/เศรษฐกิจคนละจุดได้ UIbottomfixedเหมือนเดิม
Fogมี3สถานะ: Unexploredเกือบดำ / ExploredNotVisibleเห็นterraindim / CurrentlyVisibleเต็มแสง
Guardianvisionแชร์ทั้งทีมจากhero/relay/ป้อมที่มีvision; RTSvisionจากunit/buildingตัวเอง คนงาน/scoutเปิดแมพได้ ต้องส่งscout ไม่เปิดข้อมูลเพราะภาพcameraซูมออก
Serverคำนวณvisionและกรองenemyentitiesก่อนส่ง client ไม่ส่งตำแหน่งhiddenแล้วเพียงลงสีดำทับ รูปfogในmockupเป็นตัวอย่างvisualไม่ใช่proofว่าป้องกันข้อมูลรั่วแล้ว
Terrainexploredเก็บตลอดmatch; อาคารlast-seenเป็นghostสถานะเก่าตามกฎ; enemyunitเคลื่อนที่หายทันทีพ้นvision ไม่เห็นhealth/คิวผลิต/targethiddenบนminimap
CoreSignalเป็นobjectiveโดยประมาณที่ประกาศให้รู้ ไม่ใช่การเห็นตัวcore/ฮีโร่จริง เปิดรายละเอียดเมื่อvisionถึง ห้ามminimapแดงบอกenemyในพื้นที่ยังไม่เห็น
แผนที่/ฟิสิกส์/nav/LOSชุดเดียวกับV2 กล้องต่างกันไม่ทำให้เปิดvisionฟรี Particle/skilltelegraphไม่แสดงเกินfogโดยเผลอ
เมื่อส่งmoveในfogใช้ตำแหน่งพื้นปลายทางได้ แต่attacktarget/build/auto-castต้องvisionและเงื่อนไขserver ไม่ให้คลิกhiddenIDเพื่อยิง
AutoScout/auto-movementไม่รวมในrequestเริ่มต้น ปาร์ตี้ยังเดินสำรวจเอง คอมมานเดอร์ยังเลือกจังหวะและแนวบุกเอง

## 7. Auto Upgrade / Auto Research / Auto Cast
สามระบบแยกtoggleกัน ไม่ใช่เปิดปุ่มเดียวให้เกมชนะเอง:
- HeroAutoUpgrade: templateเฉพาะHeroID เรียงลำดับdesirednode/rank/LV/pointtype
- RTSAutoResearch: templateเฉพาะRaceID เรียงresearchID resource2ชนิด/prereq/building/time และreserveที่ต้องเหลือ
- AutoCast: เลือกเปิดแต่ละabilityพร้อมcondition มีLOS/range/cooldown/energy/reserve ไม่ถือว่าAutoHealsignatureต้องกดcast

ตัวอย่างLYRA MobileMedic: LV2PulseShotII →LV3PhaseStrideI →LV4SteadyRecoveryI(sharedpassive) →LV5RicochetShotI. เมื่อLVไม่ถึง/แต้มไม่พอรอ ห้ามให้skillของASTRAเข้าคิวLYRA
ตัวอย่างMYRAX EarlySwarm: BiomassCycle →ChitinPlatingI →RapidHatch →AcidCatalyst. GeneVaultต้องมีและreserves150primaryก่อนเริ่มresearch รอบละหนึ่งตามV2; ใช้ราคา/เวลาจากตารางV2 ไม่ยึดราคาAIที่วาดผิดในภาพ
AETHERION ShieldFront: PrismCoating →ResonantLensesI →FluxEfficiency →PowerGrid. ใช้Archive/Flux+Shards; ถึงprereqแล้วค่อยเริ่ม ราคากับเวลาเท่าmanualresearchทุกอย่าง
UIเรียงstepด้วยลาก,เลือก WAIT หรือ NEXT VALID ได้ (defaultWAIT),สั่งskip/พักplanหนึ่งstep,แสดงreasonwaiting,NEXTpreview,reserve,reset/savepreset,manualoverrideได้
AutoCastIRISHealPulseเมื่อallyHP<60%และมีtargetในวง/vision; LYRA GuardianBurstเมื่อมีenemyvisible2+ในconeและgunพร้อม; MYRAXSporeSurgeเมื่อownunits8+กำลังเข้าปะทะ; AETHERIONGravityPulseเมื่อenemyheroที่เห็นเข้าวง2+และenergyพอ. ใช้สกิลที่researchแล้วเท่านั้น
Skill-castเองมาก่อนautoในtickเดียวกัน กันซ้ำด้วยsequence/lastCastTick ไม่ให้autoแอบใช้ข้อมูลhiddenหรือใช้energy/cooldownฟรี
AutoUpgradeทำหลังserverเพิ่มXP/levelและแสดงtoast LVUP→skillrank; AutoResearchทำเมื่องานเก่าจบ/ทรัพยากรเปลี่ยน/อาคารพร้อม ไม่pollทุกframe
AutoEquipสกิลใหม่เข้าempty slotเป็นoption ปิดเป็นค่าเริ่มต้น เมื่อslotเต็มไม่เขี่ยskillเดิมทิ้งโดยไม่สั่ง
Coop/PvPเปิดตัวช่วยเดียวกันทุกคนตามกติกา ไฟล์planไม่ให้รันscript arbitrary มีเฉพาะdeclarativeIDs/conditionsตามschema และserverตรวจทุกstep

## 8. ภาพครบ21ไฟล์
- guardian-roster-v4.png / corewar-main-menu-v4.png: ใช้ภาพรูปลักษณ์และหน้าเกมที่ยังตรงกับกติกาใหม่
- guardian-creation-ui-v4.png / passive-constellation-atlas-ui-v4.png
- lyra-character-skill-tree-ui-v4.png
- velvet-character-skill-tree-ui-v4.png
- astra-character-skill-tree-ui-v4.png
- echo-character-skill-tree-ui-v4.png
- rhea-character-skill-tree-ui-v4.png
- seraph-character-skill-tree-ui-v4.png
- nova-character-skill-tree-ui-v4.png
- iris-character-skill-tree-ui-v4.png
- attack-frost-relay-gameplay-v4.png
- tank-ash-garden-gameplay-v4.png
- support-ash-garden-gameplay-v4.png
- healer-orbital-rain-gameplay-v4.png
- corewar-logo-transparent-v4.png
- myrax-strategic-fog-gameplay-v4.png / aetherion-strategic-fog-gameplay-v4.png
- guardian-early-exploration-gameplay-v4.png / auto-skills-upgrade-plans-ui-v4.png

FrostRelayแสดงเวทย์และปืน;AshGardenแสดงโล่/ป้อม/กับดัก;OrbitalRainแสดงฮีล/ล้างสถานะ เลือกterrain/VFXร่วมmodularstation ไม่เพิ่มunitบิน/ฉากหลายชั้นในMVP
ภาพเป็นconceptstatic ไม่ใช่วิดีโอหรือเกมเล่นได้ Text/เลข/portraitsย่อย/เส้นprereqAIอาจไม่ตรงdata ให้ยึดเอกสาร HeroID SkillID ResearchIDเป็นหลัก UIจริงแยกข้อความจากภาพให้เปลี่ยนภาษา/สถานะได้
โลโก้PNGพื้นโปร่งเป็นraster brandconcept ไม่ใช่vectorproduction

## 9. การพัฒนาจริง / งานร่วม coding agents
Godot2D/GDScript/ENet authoritative server/sharedworldตามV2 Blenderprerenders8directions rigมนุษย์/Androidร่วม,อาวุธ/ผ้า/เกราะmodules; Kritaไอคอนและtexture Tripooptionalโมเดลเริ่มต้นยังต้องตรวจtopology/rig/ผ้า
เพิ่มdata HeroDef/RaceDef/AppearanceDef/HeroSkillDef/PassiveNodeDef/UpgradePlanDef/ResearchPlanDef. ActiveมีownerHeroIDบังคับ. PassiveมีconditionTags/stackgroup/maxrank. Planเก็บversionและIDsไม่ผูกindexรูปUI
เพิ่มXPServiceจากdeath/assist,SkillProgressService,AutoPlanScheduler,AutoCastEvaluator,FogVisibilityService,RTSCameraController. Authority/rank/cost/vision/target/teamcapsตรวจที่server ทดสอบtransaction/sequenceเพื่อกันdup
UIดาวใช้Control/Line2D/drawregion panzoomfilter focus keyboard/gamepad ไม่ใช้ภาพAIเต็มจอแทนUIกดจริง กล้องRTSกับheroใช้Camera2Dคนละcontrollerในworldเดียว
Fogworlddataกับminimapsourceต้องเป็นfilteredstateเดียวกัน ในproductionวัดperformance tick30Hz snapshot10–15Hz visiongridทยอยupdateตามผลtest ไม่อัปทุกunitทุกframe
ลำดับMVP: (1)1hero1commanderเดินยิงสั่งunit/จบmatch (2)LYRA+VELVET2v1 (3)fog+panzoom+XP+treeส่วนตัวเล็ก+sharedpassive8nodes (4)auto-upgrade/researchplan (5)prototype4rolesและAndroidM/F (6)fullroster8/12nodesต่อhero/shared46/full4v1/แมพpolish
ไม่รอสร้าง146nodesเต็มก่อนทดสอบmatch แบ่งworkmodulesพร้อมdataownershipและreviewข้ามCodex/Claude;ยังไม่ได้ส่งงานหรือสร้างเกมในคำขอนี้
กรอบประมาณคนดูแลงานพื้นฐานGodot20–30h/สัปดาห์ร่วมcodingagents:เดโม4roles+2guardianraces+fog/XP/plansประมาณ20–28สัปดาห์รวมพื้นฐานV2 รุ่นเต็มตามภาพทั้งroster/4v1มีกรอบ9–18เดือนตามงานศิลป์/network/balance ต้องประเมินหลังgrayboxไม่รับประกันวันส่ง
ค่าengine/Blender/Kritaฟรีตามแหล่งV2;ค่าAIasset/บริการโมเดล/serverInternetแยก ไม่รับประกันทุกบริการฟรีไม่จำกัด

## 10. เกณฑ์ตรวจ
- Heroทุกคนใช้เฉพาะActiveของตน;Passiveข้ามแนวได้ตามtagsแต่ไม่ปลดActiveคนอื่น
- Male/Femaleของkitเดียวกันdamage/HP/skillเหมือนกัน เผ่าต่างเฉพาะOrigin
- serverจ่ายkillXPครั้งเดียว,heal/block/turretassistได้สิทธิ์จริง,ไม่farmheal/killซ้ำเพื่อแต้ม
- LV/สองกระเป๋าแต้ม/skillranksตรงกันทุกclientและrejoin ไม่มีpassiveghostหลังrefund
- RTSเลื่อนกล้องทุกฐาน/แนวบุกได้ zoomไกลยังเลือกunitเล็กด้วยdrag/outlineได้,minimapviewportถูก
- ทั้งสองฝั่งเริ่มfogและเปิดด้วยvision ไม่มีenemycoords/health/minimap/particlesหลุดในunexplored
- AutoPlansรอแต้ม/prereq/cost/อาคาร/reserve;importwrongHeroID/RaceIDปฏิเสธ;manualกับautoไม่castซ้ำ
- AutoCastใช้visibletarget+LOS+cooldownจริง เปิดปิดตามผู้เล่น ไม่สั่งmove/buildเองนอกrequest
- IRIShealไม่ซ่อมcore;NOVArepairจ่ายScrapจริง;VELVETSiphonkill-only;LYRA/RHEAregenถูกหยุดตามกฎ
- ทดสอบจบ15นาทีหลายรอบทั้งสองฝ่ายก่อนเพิ่มassetครบทุกภาพ

อ้างอิงโน้ตที่อ่าน “HIVE BREACH — คอนเซปต์เกมยิงเอเลี่ยน 2.5D และแผนเดโม” เอกสารCOREWAR-V2-DESIGN.th.mdสำหรับเศรษฐกิจ/เผ่าเอเลี่ยน/แหล่งGodotหลัก และคำแก้ผู้ใช้ในturnนี้
