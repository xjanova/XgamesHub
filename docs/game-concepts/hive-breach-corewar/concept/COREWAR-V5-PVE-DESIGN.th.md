# HIVE // BREACH: COREWAR — V5 PvE, Career & Live Progression
วันที่ 7 ตุลาคม 2026 · เอกสารออกแบบเพื่อพัฒนา · ยังเป็นคอนเซปต์ ไม่ใช่ระบบออนไลน์ที่สร้างแล้ว

## 1. สิ่งที่เพิ่มและความสัมพันธ์กับ V4
เพิ่มเนื้อเรื่อง PvE ทั้งฝ่ายผู้ปกป้องและฝ่ายเอเลี่ยน เลเวลบัญชีถาวร อาชีพขั้นสูง ยศจาก PvE การจับคู่เมื่อสองฝั่งไม่สมดุล AI ทดแทน ภารกิจ รายวัน ซีซั่น สัตว์เลี้ยง ร้านค้า และแบตเตอรี่ประตู
บัญชีเดียวเลือกเล่นฝ่ายใดก็ได้ทุกครั้ง ไม่ผูกบัญชีกับฝ่ายถาวร ทุกตัวละครยังเลือกชาย/หญิงตาม V4
V5 แทนข้อความ V4 ที่บอกว่าเลเวลบัญชีเป็นเพียง cosmetics: ตอนนี้ PvE ใช้ปลดล็อกอาชีพและตัวเลือกสกิลจริง แต่เลเวลและแต้มในแมตช์ VS ยังเริ่มใหม่ และใช้พลังตาม Ruleset ที่เท่ากัน
V4 ยังเป็นฐานสำหรับ HeroID สกิลส่วนตัว ผังพาสซีฟ Fog กล้อง RTS และ Auto Plans; V2 เป็นฐานยูนิต/อาคาร/เศรษฐกิจเอเลี่ยน
ตัวเลขทั้งหมดต่อไปนี้เป็นค่าเริ่มทดลอง ต้องวัดการเล่นจริงก่อนกำหนดรุ่นจำหน่าย

## 2. วงจรการเล่น
เลือกเรื่องผู้ปกป้องหรือเรื่องเอเลี่ยน → สำรวจ/ทำภารกิจ/สู้ AI → รับ Account EXP, Mastery และทรัพยากร → ผ่านบททดสอบเพื่อเลื่อนยศ/ปลดอาชีพ → บันทึกบิลด์และแผนอัตโนมัติ → เข้า VS → รับ Season EXP/รางวัล/ประสบการณ์การเล่น → กลับไปเนื้อเรื่องที่ชอบ
ผู้เล่นสายเนื้อเรื่องสามารถเล่น PvE ต่อได้โดยไม่จำเป็นต้องเล่น VS ส่วนคนที่ชอบทั้งสองฝ่ายใช้บัญชีเดิมและเก็บสกิน/สัตว์เลี้ยงร่วมกัน
การสลับฝ่ายไม่ลบเลเวล อาชีพ ยศหรือความเชี่ยวชาญที่เคยได้ แต่ไม่ได้คัดลอก Mastery ของปืนพกไปเป็นฝีมือคอมมานเดอร์โดยอัตโนมัติ

## 3. ความก้าวหน้า 5 รายการ แสดงแยกบน UI
| รายการ | ได้จาก | เก็บถาวรไหม | ใช้ทำอะไร |
|---|---|---|---|
| Account Level 1–60 | PvE ที่มีสิทธิ์รางวัลและบทแรกสำเร็จ | ถาวร | ประตูเนื้อเรื่อง เงื่อนไขอาชีพและยศ |
| Hero / Race Mastery 1–20 | ใช้ HeroID หรือ AlienRaceID ใน PvE รางวัล | ถาวรแยกตัว/เผ่า | ทดสอบความชำนาญ ตัวปรับสกิลภายใน kit และรูปลักษณ์ |
| PvE Service Rank I–VI | เลเวล + ภารกิจ/บททดสอบฝั่งนั้น | ถาวร แยก Guardian/Alien | เครื่องหมายความก้าวหน้าและสิทธิ์สนาม |
| Match Level / Research | EXP ต่อสู้หรือเศรษฐกิจภายใน VS | รีเซ็ตแต่ละแมตช์ | ซื้อ rank สกิล/วิจัยระหว่างการสู้ตาม V4/V2 |
| Season Level 1–50 / VS Rating | ภารกิจรายวัน/สัปดาห์/ผล VS | ซีซั่นรีเซ็ตเฉพาะ Season Level; rating มี calibration | รางวัลซีซั่น และวัดฝีมือสำหรับจับคู่ตามฝั่ง |

Account EXP ไม่ใช่ Match EXP; แต้ม Match ใช้ปลดสกิลที่บัญชีมีสิทธิ์และ ruleset อนุญาต ต้องตรวจสามเงื่อนไข ไม่ให้บัญชี LV60 เริ่ม VS ด้วย LV60
หลัง Account60/Mastery20/RankVI ตัวเลือกพลังถึงเพดาน ผลเกินไปเป็น Prestige/สถิติ/รูปลักษณ์ ไม่มี HP หรือ damage เพิ่มไม่สิ้นสุด
ค่าต้นแบบ AccountXP ไปเลเวลถัดไป = 1000 + 100×(เลเวลปัจจุบัน−1) ถึงLV20รวม36100XPและLV60รวม230100XP ถ้ารับ1000ต่อภารกิจและสำเร็จทุกครั้ง ไม่คิดbonus จะประมาณ13วัน/77วันที่3รอบฟรีต่อวัน หรือ8วัน/47วันที่5รอบรวมbattery นี่เป็นการคำนวณตัวอย่างความเร็วปลดล็อก ไม่ใช่ผลทดลองหรือคำรับประกัน ต้องปรับให้ไม่ยืดเวลาเริ่มVSเกินความสนุก
ผู้เล่นที่สกิลเต็มยังต่างกันที่การอ่านแมพ การเปิด vision การสั่งกองทัพ จังหวะ combo การคุมทรัพยากร การประกอบบิลด์ และการร่วมมือ
ซีซั่นใหม่ไม่ลบอาชีพ สกิลถาวร ยศ PvE หรือสัตว์เลี้ยง บิลด์เก่าที่ node เปลี่ยนต้อง migrate/refund ตาม data version

## 4. PvE ผู้ปกป้อง — Guardian Chronicle
Solo + AI เพื่อน หรือ co-op 1–4 คน ตัวเลือก difficulty Story / Tactical / Nightmare; ปรับจำนวนศัตรูตามขนาดทีมโดยไม่เปลี่ยนกลางด่านแบบลงโทษคนเก่ง
PvE ใช้มุมฮีโร่ 2.5D สำรวจ Fog ร่วมทีม สกิลส่วนตัวและพาสซีฟ V4, AutoCast/AutoUpgrade เป็นตัวเลือก ใช้เนื้อเรื่องตั้งคำถามว่าทำไมแกนดาวทำให้หลายเผ่ามาบุก

| บท | เป้าหมายหลัก | ระบบที่สอน |
|---|---|---|
| 1 First Signal — Frost Relay | พบสัญญาณแรก เปิด relay และพาผู้รอดชีวิตกลับ | เคลื่อนที่ Fog, XP, skill kit |
| 2 Ash Garden | เก็บชิ้นส่วนระบบป้องกัน ตั้งป้อมคุมทาง | Engineer, trap, resource |
| 3 Orbital Rescue | ฝ่าฝนบนท่าอวกาศ ช่วยทีมและส่งขบวนพลังงาน | tank/heal/cleanse/escort |
| 4 Silent Vault | สำรวจคลังที่ android เก็บประวัติแกนดาว | hidden routes, EMP telegraph |
| 5 Hive Frontier | ทำลายหน่วยย่อยของรังโดยไม่ทิ้งแนวคุ้มกัน | miniboss, split objectives |
| 6 Core of Two Worlds | เลือกเป้าหมายเนื้อเรื่องและป้องกันขั้นสุดท้าย | boss phases, career trial |

ภารกิจแปรผัน Escort / Recovery / Holdout / Hunt / Relay Repair / Boss; ใช้ terrain 3 ชุดเดิมและ objective ใหม่ ลดงานโมเดลและฉาก
บทแรกสำเร็จและ tutorial ไม่ใช้สิทธิ์ประตู; เล่นซ้ำรับรางวัลใช้สิทธิ์รายวัน ฝึก/ดูเรื่องซ้ำได้ไม่จำกัดแต่ไม่มี Account EXP, Mastery หรือวัสดุ
บททดสอบอาชีพพยายามซ้ำได้ฟรี ให้รางวัลใบรับรองครั้งเดียว ไม่มี XP จากการรีเซ็ตด่านทดสอบ

## 5. PvE เอเลี่ยน — Alien Origins
เลือก MYRAX หรือ AETHERION ก่อนภารกิจ เล่น RTS มุมกว้างเลื่อน/ซูมตาม V4 ผลิตคนงาน ขยายฐาน สอดแนม สร้างป้อม วิจัย จัดกองทัพ และโจมตีฝ่าย AI
ฝั่งผู้ปกป้อง AI มีทีมฮีโร่ สกิลเฉพาะตัว บทบาท tank/support/healer จริง ไม่ใช่แค่เป้านิ่ง เลเวล match ฝั่ง AI อยู่ใน ruleset ภารกิจ
Solo คอมมานเดอร์เป็น MVP; co-op 2 commanders บน PvE ต้องมี sectors/ทรัพยากร/คิวผลิตแยก ไม่แชร์ controller unit โดยไม่มี ownership ตั้งเป็นงานภายหลัง

| เผ่า | เส้นเรื่อง | ภารกิจตัวอย่าง |
|---|---|---|
| MYRAX — The Lost Brood | รังเดิมถูกพลังแกนดาวตัดขาด ต้องช่วยไข่และเชื่อมฝูงก่อนโจมตี | Scout the Nest; Escort Brood Eggs; Hold the Brood Heart; Harvest under Siege; Break the AI Bastion |
| AETHERION — Crystal Exodus | อารยธรรมผลึกกำลังสูญเสียการเชื่อมต่อ ต้องฟื้น resonance และเปิดเส้นทางอพยพ | Reconnect Pylons; Protect the Archive; Route a Resonance Convoy; Cut the Relay Grid; Breach the Core |

ศัตรู/เป้าหมายมี script objective แต่ AI ตัดสินใจผ่าน vision จริง ถ้าเรื่องจำเป็นต้องประกาศ wave/boss spawn ให้มีสัญญาณ UI ที่ฝ่ายเล่นเห็น ไม่เรียกการรู้ตำแหน่งลับว่า AI เก่ง
Account EXP ใช้ตารางเวลา/ความยากเดียวกับ Guardian ไม่มีคูณพิเศษให้ฝั่งที่ฆ่า unit ได้เยอะกว่า Mastery เก็บแยก MYRAX/AETHERION
โหมดเลือกฝ่ายใน Hub แสดงสอง campaign เท่าเทียม ไม่มีคำว่าเอเลี่ยนเป็นเพียง PvP-only

## 6. อาชีพและอาชีพขั้นสูง
เลือก HeroKit ก่อน ตาม V4: อาชีพหลักถูกกำหนดกับชุดความสามารถ ไม่เปลี่ยน LYRA เป็น ASTRA จากต้นไม้เดียว
Account20 + HeroMastery5 + ผ่านบททดสอบยศIII เปิดสอง specialization ของ hero คนนั้น เปลี่ยนที่ฐานหรือก่อน matchmaking ได้ฟรี; ใช้หนึ่ง specialization ต่อ loadout
เพิ่มได้เป็นตัวปรับ/สกิลประจำ kit ที่ data ใส่ ownerHeroID ไม่เกิน 4 active slots เดิม และยังต้องเรียนด้วย MatchPoints ใน VS
ตัวเลือกชื่อ/ผลต่อไปนี้เป็นแนวออกแบบ ยังต้องทำ ability budgets และทดสอบ
| Hero | หลัก | ขั้นสูง A | ขั้นสูง B |
|---|---|---|---|
| LYRA | Mobile Medic | Pulse Saint: เสริม auto-heal/การฟื้นตัวและปืนพกของตน | Phase Gunner: ปืนพกเคลื่อนที่/จังหวะ dash |
| VELVET | Bloodguard | Requiem Vanguard: เกราะและค้อนคุมฝูง | Crimson Reaper: combo และพลังเมื่อ kill |
| ASTRA | Elementalist | Storm Weaver: สายฟ้า chain/คล่องตัว | Frostfire Oracle: ไฟ+น้ำแข็งภายใน kit |
| ECHO | Firearms Specialist | Deadeye: sniper/weakpoint | Arsenal Runner: pistol/MG และเวลาสลับปืน |
| RHEA | Shield Bastion | Iron Citadel: โล่หนักยึดพื้นที่ | Impact Warden: shield strike/stagger |
| SERAPH-09 | Lightblade Guardian | Prism Paladin: timing parry/โล่ | Photon Duelist: lightblade/mobility |
| NOVA-7 | Field Engineer | Siege Architect: turret/sentry link | Trap Artificer: trap/scout drone |
| IRIS-3 | Resonance Healer | Resonance Oracle: area recovery | Rescue Seraph: cleanse/revive/shield |

เอเลี่ยนใช้ Command Doctrine แทนอาชีพฮีโร่:
- MYRAX: Brood Sovereign (ฝูง), Acid Architect (กรด/ล้อมฐาน), Blood Matriarch (ทนทาน/ฟื้นตัว)
- AETHERION: Prism Marshal (shield front), Void Strategist (position/control), Resonance Artillerist (ยิงไกล/เครือข่ายพลัง)
Account20 + RaceMastery5 + Command Trial เปิด doctrine ภายใน race นั้น เลือกหนึ่งก่อน match
Doctrine เปลี่ยน cost/range/timing ภายใต้งบเดียวกัน ไม่ให้ผลิต AETHERION artillery ใน MYRAX และไม่แจกยูนิตใหม่ฟรีก่อนสร้างอาคาร
คอมมานเดอร์ที่ไม่มีบัญชีใบรับรองยังเล่น PvE/tutorial/Quick Training ได้ Master tier ไม่ได้เพิ่ม worker speed หรือทรัพยากรลับให้คนจ่ายเงิน

## 7. ยศจาก PvE ชัดเจน แต่ไม่แทนคะแนนฝีมือ VS
Guardian Service Rank และ Alien Command Rank แยกกัน ผู้เล่นมี Account Level ร่วม ยศจึงไม่เลื่อนอีกฝั่งจากการเล่นเฉพาะฝั่งเดียว
ตัวอย่างบัญชี24: GuardianIII, AlienII; ต้องผ่าน Alien Trial จึงขึ้น AlienIII ไม่เสียเลเวลบัญชี
| ยศ | ชื่อ | Account LVขั้นต่ำ | สิ่งที่ต้องผ่าน |
|---|---|---:|---|
| I | Recruit / Hatchling | 1 | tutorial ฝั่งนั้น |
| II | Operative / Brood Officer | 10 | บทแรก + สอบ vision/objective |
| III | Specialist / Hive Strategist | 20 | Mastery5 + Advanced Career Trial |
| IV | Veteran / Brood Regent | 30 | Mastery10 + Tactical Trial |
| V | Elite / Nexus Lord | 45 | ทำภารกิจหลายประเภท + Leadership Trial |
| VI | Legend / Overmind | 60 | Mastery20 ของ kit/race ที่สอบ + Final Master Trial |

ซื้อ battery เพิ่มจำนวนรอบรางวัลจึงช่วยให้ถึงเลเวลเร็วขึ้นได้ แต่ไม่ซื้อใบรับรอง ข้ามบททดสอบ หรือซื้อยศโดยตรง
ข้อแลกเปลี่ยนนี้เป็น paid acceleration ใน PvE จริง ต้องสื่อบนร้านค้าอย่างตรงไปตรงมา ไม่กล่าวว่าการจ่ายไม่มีผลต่อความเร็วปลดล็อก
RankVI รับรองความชำนาญตามการสอบนั้น ไม่ได้แปลว่าผู้เล่นใช้ทุก hero/race เก่งเท่ากัน ยังต้องมี Mastery/ใบอาชีพของ kit ใหม่
บน lobby แสดง account level, service badge ของฝั่งที่เลือก, career, และ VS tier แยก label

## 8. นำบิลด์ PvE เข้า VS อย่างสมดุล
นำ career entitlement, loadout ที่บันทึก, appearances และ Auto Plans เข้าได้ Gear/skill power ต้องแปลงตาม PvP ruleset ไม่คัดลอก HP/damage PvE ตรง ๆ
Starter / Advanced / Master เป็น combat ruleset:
- Starter ยศI–II: kit พื้นฐาน, advanced modifier ปิด; ranked เปิดหลังยศII/tutorialครบ
- Advanced ยศIII–V: career slot1 และ normalized stat/crystal budget; advanced choices หลักเปิดตอนIII ส่วนIV–Vเพิ่มความชำนาญ PvE/สิทธิ์เรื่อง/รูปลักษณ์ ไม่มี PvP flat stat advantage
- Master ยศVI: catalog ของ kit ที่ผ่าน mastery เต็มและแข่งขันบน budgetเดียวกัน เป้าหมายเมื่อ power ตันวัดเกมเพลย์
เกมเต็มแบ่งลีกย่อยด้วย VS rating ภายใน ruleset ยศต่างกันยังมองออกจาก badge แต่ไม่ถือว่าผู้ที่ลง PvE มากกว่าจะเล่น VS ชนะเสมอ
งบ crystal PvP10 ตามV2: ยัด crystal ต้องเสีย budgetและslotเท่ากัน rarity PvEเปลี่ยน cosmeticในVSได้แต่ไม่ขยายงบ
Hero MatchLV1 และเลเวลต่อสู้ V4 รีเซ็ต; alien เริ่ม worker/resources/research เท่ากันตามmap/ruleset ค่อยใช้ doctrine ที่เลือกและวิจัยระหว่างmatch
ผู้ยศสูงเลือกลง Starter/Advanced แบบ normalized เพื่อเล่นกับเพื่อนได้ แต่ใช้ VS ratingเดิม ไม่รีเซ็ตเป็น novice และปิด option ที่ rulesetนั้นไม่รองรับ
Pre-made party เลือก rulesetที่สมาชิกทุกคนมีสิทธิ์ ใช้ภารกิจฝึก/AI เมื่อมีสมาชิกใหม่ ไม่บังคับ noviceไปMaster
Career/สกิลจริงใหม่ของseasonรับได้ในเส้นฟรีและภารกิจถาวรหลังseason ถ้าต้อง unlockใช้PvEtrialภายในkit; PREMIUMให้รูปลักษณ์/VFX ไม่ผูกcombatentitlementกับการซื้อpass
โปรเจกต์นี้เป็นPvEunlock-drivenจึงมีเวลาลงPvEก่อนเข้าลีกสูง ต้องทดสอบว่าช่วงเริ่มต้นไม่ยาวจนผู้เล่นVSเลิกเล่น

## 9. Matchmaking เมื่อคนสองฝั่งไม่สมดุล
4 Guardians ต่อ1Commander: สมดุลที่จำนวนแมตช์จัดได้ ไม่ใช่จำนวนออนไลน์เท่ากัน
matchCapacity = min(floor(guardianReadyCount/4), commanderReadyCount) คำนวณแยกregion/ruleset และparty constraints
ตัวอย่าง80 Guardians กับ8 commanders →20squadsแต่เริ่มได้8matches เหลือ48guardians; ถ้ามี16guardiansกับ20commanders เริ่มได้4matchesและcommandersล้น
ReadyCountคือคนที่เลือกคิวเข้ากันและพร้อมจริง ไม่นับคนในร้านค้า/กำลังเล่นPvEเป็นคนพร้อมจับคู่
ตัวเลือก GUARDIAN / COMMANDER / FLEX; FLEX เลือกassignedsideก่อนreadyและส่งcareerที่มีสิทธิ์ ห้ามเปลี่ยนผู้เล่นที่เลือกฝั่งตายตัวเงียบ ๆ
ชวนไปฝั่งขาดด้วยseason XP/mission credit/สกิน cosmetic แบบมีเพดาน ไม่ให้damage/AccountXP/Ranktrialฟรี
คะแนนฝีมือเก็บguardianRatingและcommanderRatingแยก พร้อม uncertainty/calibration; ผู้เล่นสูงฝั่งหนึ่งยังใหม่อีกฝั่งได้
เริ่มMVPจากmode-specific Elo/Glicko-style calibration + constraint scoring และเก็บtelemetry ไม่ต้องใช้LLM liveเพื่อตัดสินทุกqueue
เมื่อมีข้อมูลมากจึงฝึกโมเดลคาดโอกาสชนะ4v1ด้วยcomposition/map/party/ruleset; อย่านำratingเดี่ยวcommanderไปเทียบค่าเฉลี่ยฮีโร่ตรง ๆโดยไม่มี calibration ของความไม่สมมาตร
Hard constraints: ruleset/สิทธิ์career/region latency/party integrity/novice protection; Soft: predictedwinbalance/waittime/rolecoverage/repeatedopponents
เป้าหมายทดลอง predicted win45–55%; ค่าpingเป้าหมายต่ำกว่า120ms แต่ไม่มีคำรับประกันเวลาเมื่อจำนวนคนไม่พอ
ช่วง0–30sหาคู่แคบ;30–90sขยายratingอย่างจำกัด;หลัง90sเสนอบอท/FLEX/รอต่อในQuick การเลือกของผู้เล่นต้องยืนยันในready screen
Rankedยังรอผู้เล่นจริง ไม่ข้ามrulesetหรือเอาbotมาอ้างว่าเป็นhumanเพื่อทำเวลาwaitให้สั้น ตัวเลขwaitเริ่มต้นเป็นpolicyทดลอง
Party4guardiansเก็บทีมเดิม; ถ้าเฉพาะDPSเต็มทีมแจ้งองค์ประกอบก่อนreadyหรือqueueopt-instrictrole ไม่แอบเปลี่ยนตัวละครผู้เล่น
ระบบไม่รับประกันmatchสมบูรณ์ในทุกpopulation ปรับเวลารอ/คิว/Botตามข้อมูลจริง ห้ามอ้างว่าAIแก้การขาดคนได้โดยไม่มีข้อแลกเปลี่ยน

## 10. AI สองงานที่แยกกัน
### AI สำหรับจัดคิว
คัดcandidate squad/commanderด้วยconstraints +predictor ไม่กดเล่นเกมให้ผู้เล่นและไม่เกี่ยวกับAutoCast
เริ่มheuristicsและratingก่อน; simulationหลายpopulation, offline validation/calibrationก่อนนำmodelเข้าคิวจริง ไม่มีโมเดลเรียนอัตโนมัติเปลี่ยนกฎกลางmatch
### AI ผู้เล่นทดแทน/ศัตรูเนื้อเรื่อง
Quickเปิด Allow AI แบบเห็นชัด ตัวอย่างMYRAX // AI COMMANDER; starterเลือกTrainingBotได้ทั้งฝั่ง
บอทcommanderใช้strategic utility/behavior tree: scout→economy→tech→composition→multi-lane attack→retreat/defend; ระดับสูงอ่านlast-seenintelและปรับcounterจากสิ่งที่เคยเห็นจริง
บอทguardianใช้role state machine: follow objective/scout cover/focus visibleenemy/tank hold/heal lowHP/deploy legalturret/revive when safe
TacticalAIใช้nav/LOS/targetselectionเดียวกับhuman และรับเฉพาะfilteredobservation: ไม่เห็นenemyhidden, ไม่เพิ่มเงิน, ไม่ข้ามcooldown, ไม่สั่งunitทันทีทั่วmapเหนือcommand budget
ระดับ Recruit/Veteran/Elite ต่างที่response delay, command budget, planning horizon, composition quality, error rate ไม่ต่างที่ทรัพยากรโกง
ตารางเริ่มต้น response delay1.2/0.6/0.3s, strategic planning2/1/0.5s ต้องวัดCPUและความรู้สึกในการสู้; ไม่เปลี่ยนระดับเพื่อทำให้ผู้เล่นแพ้ตามความอยากซื้อitem
Auto helpersที่ผู้เล่นเปิดยังเหมือนกันในPvE/Quick/RankedตามV4 คนใช้autoไม่ได้รับMMRพิเศษและbotต้องจ่ายresource
Quickมีbot = No Ranked Rating; ได้mission/SeasonEXPแบบcap ไม่ให้farmAccountXPหรือServiceRankจากVSbot
Ranked เริ่มด้วยผู้เล่นจริงทั้งหมด หาก disconnect ให้กลับภายใน90s มีAIคุมชั่วคราวพร้อมป้ายชัดเจน ถ้ากลับทันคิดผลแมตช์ตามปกติ หากไม่กลับให้เซิร์ฟเวอร์บันทึก forfeit: ฝ่ายอยู่ครบได้win ฝ่ายขาดได้loss ผู้ที่ออกมีabandon penaltyเพิ่มเติม ไม่ลบผลแพ้ด้วยการออกเกม หลังบันทึกผลเสนอเล่นต่อเป็นQuick vsAIในinstanceใหม่แบบไม่คิดMMRและใช้รางวัลตามcap การคืนผลไม่มีratingทำได้เฉพาะserverfailureที่ยืนยันแล้ว รายละเอียดpenalty/party-abuseต้องplaytest
ระบบcaptureเหตุการณ์ก่อนdisconnect+idempotentresultเพื่อauditและหาวิธีกันcancelabuse ไม่แสร้งว่าแทนAIแล้วเป็นrankedhumanที่ยุติธรรมสมบูรณ์

## 11. ประตูรายวันและแบตเตอรี่
ต้นแบบให้3 rewardedPvEentriesต่อบัญชีต่อวัน ใช้ร่วมทั้งสองฝั่ง ยศขึ้นได้จากทุกcampaignของฝั่งนั้น ไม่บังคับเล่นdailyหลายระบบซ้ำ
reset05:00 Asia/Bangkok (22:00UTCวันก่อน) ใช้serverclock ไม่ให้เปลี่ยนเวลาคอมพิวเตอร์รับใหม่ Freechargesไม่สะสม แต่batteryinventoryเก็บได้
1 Portal Battery = +1 rewardedPvEentry; เพิ่มได้สูงสุด2batteryentriesต่อaccountday รวมรางวัลPvEสูงสุด5entries/day ในต้นแบบ
tutorial/firstclearบทเปิดเรื่อง/skilltrial/freepracticeไม่ใช้entry แต่ไม่มีreplayXP/วัสดุจากการresetพวกนี้ รายการfreefirstclearกำหนดในMissionDefไม่ให้clientอ้าง
รอบรางวัลปกติ10–18นาที AccountXP1000/clear +firstclearbonus500เฉพาะครั้งแรกที่ระบบกำหนด; difficultyrewardต้องอิงเวลา/ความเสี่ยง ไม่ให้เลือกฝั่งฆ่าunitมากเพื่อlevelเร็วกว่า
reserveentryเมื่อpartyreadyและmissioninstanceพร้อม; chargecommitเมื่อเข้าสู่combat; ยกเลิกก่อนcombatrelease การdisconnectกลับinstanceเดิมได้10นาที
ถ้าserverล่มคืนสิทธิ์ด้วยrefundtransactionเดียว Missionabort/disconnectจากฝั่งclientหลังcombatไม่คืนอัตโนมัติ; failXPตามmilestoneที่สำเร็จและจ่ายครั้งเดียว ไม่มีฟาร์มkillแล้วabortรับXPซ้ำ
serverบันทึกentryreservation/chargedstate/missionrewardledgerต่อaccountinstance ทั้งfreeและbatteryเหมือนกัน
ที่ประตูแสดงจำนวนentry, เวลาฟรีreset, รางวัลก่อนเข้า, โหมดฝึกฟรี และราคาbatteryให้เห็นก่อนซื้อ ไม่มีauto-purchaseเมื่อหมดentry
Batteryไม่ข้ามMastery/Trial ไม่ใช้ซื้อwinratebot ไม่เติมแต้มระหว่างRanked

## 12. Mission System และ Battle Daily
QuestประเภทStory / Career Trial / Daily / Weekly / Season / Faction / Event มีservereventcondition ไม่รับprogressตัวเลขที่clientส่งเอง
Daily3งานต่อวันตัวอย่าง: Complete any rewardedstory1; Assist10takedowns; Scout3relays. งานฝั่งเลือกGuardian/Alienมีvariantนับตามระบบ ไม่ให้คอมมานเดอร์ต้องทำhealing
GuardiansassistจากV4; Alienassistเป็นdestroytargetด้วยownedunit/ป้อม; ScoutRelayต้องเปิดvisionและinteractobjective ไม่ใช่ลากcameraผ่านfog
Weekly5งานแบบobjective: ทำ3ประเภทmission; ชนะ/จบVS3match; ผ่านTactical1; use2loadouts; completeeithercampaign. ให้reroll1งานฟรี/วัน ไม่ซื้อrerollเพื่อบังคับเล่นฝั่งไม่ชอบ
SeasonXPมาจากtask/matchcompletionเป็นหลัก ไม่จ่ายต่อkillไม่จำกัด; free/paidPvEentriesมีDailySeasonXPcapเดียวกัน เช่น2000/day +weeklytasksแยกcap จึงซื้อbatteryเพื่อlooppassไม่จำกัดไม่ได้
Questโหนดcareerสำเร็จจ่ายcertificateครั้งเดียว Dailyquestidรวมaccountday Weeklyรวมweek SeasonรวมseasonID
Rewardclaimดึงresultพร้อมserverrevision ไม่ให้กดCLAIMสองเครื่องรับdouble; ถ้าservercommitแล้วแต่UItimeoutใช้idempotencykeyรับผลเดิม
Ranktrialวัดobjectivesและmechanics เช่นLYRAรักษาจังหวะautoheal/dash/pistol; commanderคุมscout/economyและบุก2lane ไม่วัดเวลาซื้อbatteryหรือยอดเติมเงิน
Narrativechoicesเปลี่ยนmissiondialogue/route/cosmeticsได้ แต่ไม่ทำให้บัญชีเสียสิทธิ์ไปเล่นอีกฝั่ง

## 13. Season / Battle Pass / Skill / Pet / Gear
ต้นแบบSeason8สัปดาห์50levels ทุก1000SeasonXP =1level เป็นตัวเลขวัดภายหลัง ไม่ resetAccountRank
FREE track: currencies, batteriesจำนวนจำกัด, petพื้นฐาน, careertrialblueprint, skillVFXบางแบบ, crystalcraftresources
PREMIUM track:ชุด/อาวุธappearance, frame, animation, petappearance, เพิ่มทางเลือกVFXที่สื่อhitboxชัดเท่าเดิม ไม่ขายextraactiveslotหรือcrystalbudgetPvP
ซื้อpremiumทีหลังรับรางวัลpremiumที่ระดับถึงแล้ว ไม่ปลดผ่าน50levelsเอง สินค้าข้ามpasslevelถ้าทำภายหลังให้ข้ามcosmeticrewardเท่านั้นและห้ามข้ามcareertrial
สกิลจริงใหม่ไม่อยู่premiumexclusive FREE SKILL TRIALเปิดภารกิจHeroID/RaceIDที่ตรง;หลังseasonย้ายภารกิจไปPermanentArchive ไม่มีคนพลาดseasonแล้วขาดcounterถาวร
Petตัวอย่าง:
- Fox Drone: เก็บlootที่พบในPvE;ไม่เดินเปิดFog/สร้างvisionฟรี
- Broodling: PvEdecoyสั้นตามcooldown มีงบmissionและenemyมองเห็นจริง
- Prism Wisp: PvEshieldช่วยตามcooldownและขนาดที่กำหนด
PvPpetเป็นcosmetic/animation ไม่มีstat/vision/targeting ไม่กีดขวางhitbox และไม่มีเสียงบอกศัตรูในFog
GearPvEweapon/armor/crystalsมีtiersและต้นแบบstatเพดานจำกัด; accountmasteryต่อยอดcrafting PvPโหลดnormalizedtemplateและ10crystalbudget ไม่อ่านraritystatจากinventoryตรง ๆ
ตัวเกมต้องขายแรงจูงใจจากเรื่อง/รูปลักษณ์/ความสะดวก ไม่ทำAIยากขึ้นลับ ๆเพื่อขายbatteryหรือmedkit

## 14. ร้านค้า — ตัวอย่างสินค้า ไม่ใช่ราคาจำหน่ายจริง
| สินค้า | ใช้ได้ที่ไหน | ผลที่เสนอ |
|---|---|---|
| PortalBattery | rewardPvE | +1entry ภายใต้cap2/day |
| Medkit/RepairCharge | PvE | consumableจำกัดslots ไม่ใช่อุปกรณ์Ranked |
| LootDroneContract | PvE | เก็บlootที่พบแล้ว ความสะดวก |
| Hero/Alien skins + skillVFX | ทั้งสองโหมด | appearanceโดยhitbox/telegraphเดิม |
| Petappearance | ทั้งสองโหมด | PvPcosmetic;PvEabilityตามpettemplateที่หาเล่นได้ฟรี |
| PremiumSeasonPass | rewardtrack | cosmetics/VFXตามระดับที่เล่นถึง |

VirtualPremiumCrystalsเป็นcurrencyร้านค้า แยกCoreShardsในRTSและcrystalstonesที่socketอุปกรณ์; UIต้องใช้ไอคอน/ชื่อแยกป้องกันสับสน
ภาพร้านใช้1Battery80PremiumCrystals /3Battery240เพื่อสื่อlayoutเท่านั้น ไม่กำหนดราคาเงินจริงหรือเปิดขาย
ทุกcombatpet/template,gearrecipeและcareerมีทางรับจากPvEฟรี การซื้อappearanceไม่ปลดcombattemplateที่ผู้เล่นยังไม่ผ่านtrial
Freebatteryได้บางquest/pass/freecompensation Inventoryแยกpaid/grantedlotsเพื่อตรวจrefund;เงินจริงยังไม่ทำในต้นแบบ
Purchaseflow:ดูสินค้า→ยืนยันรายการ/จำนวน/ราคา→serverตรวจreceiptและidempotency→ลงledger→ให้item→UIแสดงผล ไม่มีclientให้สินค้าตัวเอง
ต้องรองรับrequestซ้ำ/receiptซ้ำ/refund/serverretry ไม่ลบCareerที่ได้โดยสุจริตจากcompletedmissionเพราะrefundbatteryทีหลัง แต่จัดledger/debtตามpolicyที่กำหนดก่อนเปิดขาย
นี่เป็นข้อกำหนดระบบ ไม่ใช่การวิเคราะห์กฎหมาย/อัตราค่าบริการแพลตฟอร์มใด ต้องเลือกแพลตฟอร์มจริงก่อนเชื่อมระบบชำระเงิน

## 15. Data และระบบสำหรับพัฒนา
GameclientGodot2Dและserverauthorityเดิมเพิ่มAccount/Profile service, MissionDirector, ProgressionService, EntitlementService, QueueCoordinator, BotController, SeasonService, RewardLedger, StoreService
ต้นแบบofflineใช้JSONlocalstate+mockledgerทดสอบflow ไม่ถือว่าJSONclientปลอดภัยสำหรับออนไลน์จริง
รุ่นออนไลน์ใช้server-owneddatabase +authenticatedAPI; Matchresultลงaccountrewardได้เฉพาะserverที่ได้รับสิทธิ์ ไม่clientบอกว่าชนะเอง
Records:
AccountProfile(accountID,level,xp,prestige); HeroMastery(heroID,level); RaceMastery(raceID,level)
ServiceRank(side,rank,certificateIDs); CareerUnlock(ownerID,specializationID,trialID)
RulesetDef(normalizedstats,nodecatalog,budget10,slot4); Loadout(ownerID,careerID,crystalIDs,plans)
QueueTicket(sidePreferences,partyID,rulesetID,latency,sideRating,uncertainty,allowAI)
MissionDef(side,objectivegraph,difficulty,rewardpolicy,firstclearflag,portalchargepolicy)
MissionInstance(instanceID,checkpoint,entryReservationIDs,participants,result)
AccountDay(accountID,resetEpoch,freeused,batteryused,seasonXPearned)
WalletLots(currency,origin,receiptID); RewardLedger(idempotencyKey,account,source,grants,status)
QuestProgress(questID,periodID,eventsequence); SeasonProfile(seasonID,level,xp,claimedtiers,premium)
PetDef(pveability,pvpcosmetictemplate); BotProfile(responsebudget,visionpolicy,plannerweights)

Serverreserveportal/payment/reward/claimใช้atomictransactionและuniqueidempotencykeys ไม่ให้currencyติดลบจากrequestพร้อมกัน
Botไม่มีdatabaseสิทธิ์เติมเงิน/ปรับratingข้ามpolicy PlayerAIรับfilteredworldstateด้วยinterfaceเดียวกับclients
AIplanner/queueคำนวณเป็นbudgetedtick แยกจากrenderและsimpleunitmovement ไม่เรียกLLMต่อunitต่อframe
Performance/render/assetsต่อจากV4 ตั้งscopegrayboxเล็กก่อน live serviceครบ ห้ามตีความภาพshopว่าbackendพร้อมขายแล้ว

## 16. ลำดับพัฒนาที่ทำจริงได้
1. ยืนยันcombat2v1+Fog+XPจากV4ก่อน; เพิ่มprofilemockและloadoutconvertแบบมีdataauthority
2. VerticalSlice: LYRA1storymission + MYRAX1RTSstorymission, Account1–20, Mastery1–5, RankI–III, career2/ฝ่าย, freeentry3/batterytest2
3. MissionDirector,careertrial,daily3quest,ledger/idempotency+save/rejoin; currencyร้านเป็นเงินทดลอง
4. QuickQueue+side-specificrating+FLEX+AIcommander/AIguardianระดับRecruit/Veteran; simulationpopulationและbotfogtests
5. Rankedhumansonly,normalization,party/noviceprotection,reconnect/disconnectabuseก่อนเพิ่มMasterleague
6. BattlePass10leveltest+petscosmetic/PvEsimplepet+storemock; ทดลองeconomy/XP/entrycap/ความสนุก
7. หลังข้อมูลผ่านค่อยขยาย3terrains,2aliens,8heroes,rankVI/level60,50passlevels,Elitebots และเชื่อมเงินจริง

ห้ามเพิ่มบริการเงินจริง/คิวRankedเต็มก่อนcombatสนุกและmissionrewardsกันdupได้
ประมาณเฉพาะส่วนเพิ่มV5หลังcombatV4ที่เล่นได้: verticalslice8–14สัปดาห์สำหรับผู้ดูแลงานGodot/backendที่มีประสบการณ์20–30h/weekร่วมcodingagents;ระบบออนไลน์จริงที่คุมreward/store/matchmakerพร้อมเนื้อเรื่องเพิ่มประมาณ4–8เดือนตามทีม/QA เป็นสมมติฐานวางงานไม่ใช่สัญญาส่ง
ไม่บวกเวลานี้เป็นตัวเลขแน่นอนกับV4เพราะmissionassets/serviceบางส่วนทำร่วมกันได้ ต้องประเมินใหม่จากgrayboxและmetricsจริง
เครื่องมือที่มีอยู่ใช้ต่อได้สำหรับprototype;serverhosting/payment/AIassetบริการภายนอกมีต้นทุนแยก ไม่อ้างว่าระบบlive-serviceฟรีไม่จำกัด

## 17. ตรวจรับที่มีความหมาย
- บัญชีเดียวswitchsideแล้วcareer/rank/masteryถูกตัวและไม่หาย;allappearanceM/Fใช้statเหมือนกัน
- AccountEXP/MatchEXP/SeasonXPเข้ากระเป๋าถูก ไม่duplicateจากresume/kill/claimสองเครื่อง
- purchasebatteryได้entryจริงภายใต้dailycap เปลี่ยนclientclockไม่ได้;serverfailurerefundเพียงครั้งเดียว
- careertrialต้องผ่านจริง ต่อให้LVถึงแล้วซื้อbatteryก็ไม่ข้าม; foreignHeroIDskillถูกปฏิเสธ
- VS normalizedstats/budget/slotsเท่ากัน ไม่อ่านPvEgear/medkit/petstat/paidinventoryมาเพิ่มpower
- accountpowercap60/mastery20 มีจริง prestigeไม่เพิ่มPvPdamage seasonไม่ลบcareer
- Queue4v1/party/FLEXรักษาsidechoices คำนวณcapacityตามคนready ไม่onlineheadcount
- simulate80G/8C,16G/20C,zeroC,zeroG,party4,newplayerhighrankalt,latencyสูงและเงื่อนไขpopulationบางruleset
- botใช้Fog/last-seen/LOSจริง ไม่เห็นentityhiddenและไม่เพิ่มทรัพยากรเหนือhuman;plannerไม่ทำframebudgetพัง
- QuickbotแสดงAIก่อนready ไม่จ่ายRankedMMR;Rankeddisconnectมีaudit/penalty/compensationไม่เปิดช่องcancel-loss
- ฟรีหาcombatentitlements/pettemplatesได้ premiumrewardเป็นappearance actualseasonabilityยังเข้าถึงหลังseason
- replayreceipt/refund/missionresultปลอมไม่ได้เพิ่มitem/EXP;purchaseUIระบุโหมด/limit/ราคาvirtualชัด
- playtestทั้งฝ่ายPVEและVS;เป้าหมายตัวเลขtime/XP/winrateเป็นเป้าทดลอง ไม่ใช่ผลทดสอบที่ทำแล้ว

## 18. ภาพและแหล่งอ้างอิง
ภาพใหม่4ใบ:
pve-campaign-account-hub-v5-final.png
career-ranks-advanced-classes-v5-final.png
matchmaking-ai-balancer-ui-v5-final.png
daily-season-battery-shop-ui-v5.png
corewar-v5-gallery.htmlรวมภาพใหม่กับV4รวม25ใบ;corewar-v5-image-prompts.txtเก็บpromptเต็ม ใช้ImageGenในตัว ไม่ใช่CLI
ภาพเป็นUIconcept ตัวเลข/ป้ายจากAIอาจต่างจากpolicyในเอกสาร ไม่ใช่หลักฐานว่ามีgame/backend/storeที่เล่นได้
อ้างอิงบริบทBrainXที่เคยอ่าน: HIVE BREACH — คอนเซปต์เกมยิงเอเลี่ยน 2.5D และแผนเดโม;รอบนี้ค้นพบแต่brain_get_noteต้องขออนุมัติในเซสชันapprovalnever จึงใช้สเปกworkspaceV4เป็นฐาน
หลักrating+uncertaintyดู Microsoft Research TrueSkill: https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/
หลักconstraints/queueก่อนmatchจาก Microsoft Research TrueMatch: https://www.microsoft.com/en-us/research/project/truematch/
รองรับdedicatedserver/headlessจากเอกสารGodot: https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_dedicated_servers.html
ใช้แหล่งเหล่านี้สนับสนุนแนวทางrating/serverเท่านั้น ไม่อ้างว่ามีTrueSkill/TrueMatchติดตั้งหรือรองรับCOREWAR4v1สำเร็จแล้ว ระบบเฉพาะเกมยังต้องcalibrateและplaytest
