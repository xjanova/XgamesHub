# BREAKER — ภาพคอนเซปต์ยานใหม่

สร้างด้วยเครื่องมือ imagegen ในตัว วันที่ 8 ตุลาคม 2026 สำหรับหน้าเว็บแคมเปญและหน้าร่างโรงเก็บยาน ยังไม่ใช่ยานที่เลือกเล่นได้ในเดโม ภาพแต่ละลำมีไฟล์ของตัวเองและเปลี่ยนตามตัวเลือกในหน้าสกิล

| ยาน     | รูปทรงที่สื่อความสามารถ                              | ไฟล์ที่ใช้บนเว็บ                        |
| ------- | ---------------------------------------------------- | --------------------------------------- |
| WRAITH  | โครงบาง ปีกแยก แกนวาร์ปสีม่วงและสมอใต้ท้องยาน        | `public/art/breaker/ships/wraith.webp`  |
| MANTIS  | ยานอุตสาหกรรมหนัก แขนกลคู่และก้ามจับซาก              | `public/art/breaker/ships/mantis.webp`  |
| ORBIT   | ลำยานกะทัดรัดอยู่ในวงแหวนรับกระสุน                   | `public/art/breaker/ships/orbit.webp`   |
| CHIMERA | แกนยานกลาง ปืนข้างแยกส่วนและข้อต่อเปลี่ยนการจ่ายพลัง | `public/art/breaker/ships/chimera.webp` |

ต้นฉบับ PNG ขนาด 1536 × 1024 อยู่ในพื้นที่ generated_images ของ Codex; เว็บใช้ WebP ที่คงช่อง alpha ภาพหันหัวขวาตามแนวการบินของเดโม ยังต้องแยกชิ้นส่วน ทำเอฟเฟกต์ แอนิเมชัน และทดสอบขนาดที่อ่านออกระหว่างเล่นก่อนนำเข้าเกมจริง

## คำสั่งสร้างภาพ

### WRAITH

Use case: stylized-concept. Asset type: individual 2.5D shoot-em-up spaceship concept render for X-NOVA BREAKER website hangar and fleet cards. One spacecraft only, entire silhouette in frame with generous clear margin. Side-scrolling game orientation: nose points RIGHT, visible near-side hull and a little top surface, long horizontal profile. Detailed hand-painted hard-surface sci-fi game sprite/render, worn metal plates, restrained emissive lights, crisp readable silhouette. Transparent background with real alpha, no floor, no scenery, no labels, no text, no logo, no watermark, no diagram. Landscape 1536x1024. Avoid copying another ship's silhouette. WRAITH phase-anchor interceptor: slender charcoal and pale silver needle hull, swept split fork wings, compact purple phase generator integrated mid-hull, two narrow rear thrusters, a clearly visible small deployable anchor node under the aft hull. Violet and cyan luminous edges, stealthy agile silhouette, subtle violet engine flame confined close to the engines, no ghost duplicate. Different from bulky white-orange starter ship.

### MANTIS

Use case: stylized-concept. Asset type: individual 2.5D shoot-em-up spaceship concept render for X-NOVA BREAKER website hangar and fleet cards. One spacecraft only, entire silhouette in frame with generous clear margin. Side-scrolling game orientation: nose points RIGHT, visible near-side hull and a little top surface, long horizontal profile. Detailed hand-painted hard-surface sci-fi game sprite/render, worn metal plates, restrained emissive lights, crisp readable silhouette. Transparent background with real alpha, no floor, no scenery, no labels, no text, no logo, no watermark, no diagram. Landscape 1536x1024. Avoid copying another ship's silhouette. MANTIS salvage tug: stocky industrial moss-green and ochre chassis, exposed robust hydraulic joints, TWO articulated mantis-like grabbing arms extending toward the right ahead of cockpit around a clear empty grasping space, broad reinforced rear engine block, reinforced armor with chipped edges, bright amber utility lights. Claws are mechanical tools not animal legs. Clearly heavier and more utilitarian than a fighter, no held scrap or extra objects.

### ORBIT

Use case: stylized-concept. Asset type: individual 2.5D shoot-em-up spaceship concept render for X-NOVA BREAKER website hangar and fleet cards. One spacecraft only, entire silhouette in frame with generous clear margin. Side-scrolling game orientation: nose points RIGHT, visible near-side hull and a little top surface, long horizontal profile. Detailed hand-painted hard-surface sci-fi game sprite/render, worn metal plates, restrained emissive lights, crisp readable silhouette. Transparent background with real alpha, no floor, no scenery, no labels, no text, no logo, no watermark, no diagram. Landscape 1536x1024. Avoid copying another ship's silhouette. ORBIT sling-ring interceptor: compact ivory and midnight-blue dart-shaped central fuselage pointing right, centered within ONE large clearly readable circular gyroscopic ring seen as an oval around the body, ring with separated cyan emitter segments, small rear twin engines, luminous cyan energy accents. Ring attaches plausibly via struts; silhouette defined by ring rather than normal swept wings. No orbiting planets, no extra craft, no excessive glow.

### CHIMERA

Use case: stylized-concept. Asset type: individual 2.5D shoot-em-up spaceship concept render for X-NOVA BREAKER website hangar and fleet cards. One spacecraft only, entire silhouette in frame with generous clear margin. Side-scrolling game orientation: nose points RIGHT, visible near-side hull and a little top surface, long horizontal profile. Detailed hand-painted hard-surface sci-fi game sprite/render, worn metal plates, restrained emissive lights, crisp readable silhouette. Transparent background with real alpha, no floor, no scenery, no labels, no text, no logo, no watermark, no diagram. Landscape 1536x1024. Avoid copying another ship's silhouette. CHIMERA modular weapons fighter: red, graphite and titanium angular central core, long forward lance nose pointing right, two distinctive detachable-looking side weapons pods on articulated mounting rails, folded variable-geometry fins and separate rear thrust modules with visible mechanical locking joints and amber power conduits. Clearly modular three-part silhouette with asymmetric useful equipment details, restrained red-orange engine lights; no explosion, no alternate forms or duplicate craft.
