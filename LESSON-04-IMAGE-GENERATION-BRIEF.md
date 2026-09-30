# Lesson 4 — image-generation brief

Use this document only when the Lesson 4 image-generation phase is explicitly started. It specifies assets only; it does not author webpages, register `visualId`s, modify lessons, or generate audio.

## Global production contract

- Produce one static, isolated transparent PNG per asset. Default canvas: 1024×1024 RGBA; `doctor-listening-to-mia` may use 1024×1536 RGBA only if the two figures need it.
- The visual style is the existing polished, friendly 3D child character illustration style: large expressive eyes, soft natural lighting, realistic child proportions, clean readable silhouette. Preserve the specified Tom and Mia wardrobes and hairstyles exactly.
- The instructional image must itself communicate its word. No emoji, text, letters, labels, arrows, diagrams, watermark, logo, busy setting, animation effect, duplicated body part, cropped target feature, or unrequested prop.
- For a pain image, all three signals are mandatory: exact pain location, a hand deliberately at that location, and an uncomfortable facial expression. A small soft red local glow is allowed only at the exact pain point; it is not a generic decoration and must never cover a second body part.
- Never create extra fingers, merged limbs, obscured ear/toes, shoes for foot/toe cards, a hand that accidentally changes a target (for example, throat versus neck), medical equipment that looks threatening, or any text in the image.

## 1. Character anchor references

Use these local files as identity and style references. Do not reproduce their backgrounds or props unless a brief says so.

| Reference | Role in generation |
| --- | --- |
| `assets/images/lesson-1/characters/tom/tom-neutral.png` | **Primary Tom identity anchor.** Lock dense short dark curls, warm brown skin tone, child face, yellow T-shirt, navy shorts, white trainers, full-body proportion. |
| `assets/images/lesson-1/characters/mia/mia-neutral.png` | **Primary Mia identity anchor.** Lock long voluminous dark curls, child face, turquoise T-shirt, orange shorts, white trainers, full-body proportion. |
| `assets/images/lesson-1/characters/tom/tom-stand-up.png` | Tom full-body/action silhouette reference. |
| `assets/images/lesson-1/characters/tom/tom-pointing-at-ball.png` | Reference for readable pointing with a visible no-contact gap. |
| `assets/images/lesson-1/characters/tom/tom-touching-ball.png` | Reference for readable physical contact. |
| `assets/images/lesson-1/characters/mia/mia-listening.png` | Reference for Mia's clear hand placement and friendly expression. |
| `assets/images/lesson-1/characters/mia/mia-tired.png` | Reference for a low-energy but non-frightening Mia expression; do not turn it into pain. |
| `assets/images/lesson-03/characters/tom/tom-fruit-shopkeeper.png` | Supporting proof that Tom can hold an age-appropriate role/prop while keeping identity. Do not carry over shop items or background. |
| `assets/images/lesson-03/characters/mia/mia-shopping-list-basket.png` | Supporting proof that Mia can carry a prop/context. Do not carry over basket/list/background. |

## 2. Generation batches

### Batch 1 — core character and health-role anchors (P1)

Generate `l4-tom-touching-face`, `l4-mia-pointing-shoulder`, `l4-mia-feeling-sick`, `l4-doctor-friendly`, and `l4-doctor-listening-to-mia` first. This validates identity continuity, self-body gesture clarity, the non-specific sick state, and the doctor tone before the large vocabulary set.

### Batch 2 — face vocabulary (P1)

Generate `l4-tom-face`, `l4-mia-hair`, `l4-tom-eye`, `l4-mia-ear`, `l4-tom-nose`, `l4-mia-mouth`, and `l4-tom-teeth`. Review these as a seven-card set at phone-card size so face/head/hair and mouth/teeth do not visually collapse.

### Batch 3 — body vocabulary (head/neck through toes)

Generate P1 items `l4-tom-head` and `l4-mia-neck`, then P2 items `l4-tom-shoulder`, `l4-mia-arm`, `l4-tom-hand`, `l4-mia-finger`, `l4-tom-chest`, `l4-mia-tummy`, `l4-tom-back`, `l4-mia-leg`, `l4-tom-knee`, `l4-mia-foot`, and `l4-tom-toe`. Approve comparison pairs together: head/face/hair, neck/throat, hand/finger/arm, chest/tummy, leg/knee, and foot/toe.

### Batch 4 — exact pain-location cards (P1)

Generate all ten pain assets as a controlled set: `l4-tom-head-hurts`, `l4-mia-eye-hurts`, `l4-tom-neck-hurts`, `l4-mia-sore-throat`, `l4-tom-arm-hurts`, `l4-mia-leg-hurts`, `l4-tom-knee-hurts`, `l4-mia-tummy-hurts`, `l4-tom-toothache`, and `l4-mia-earache`. Compare every potentially confusable pair before accepting an image.

### Batch 5 — final integration check

Do not generate more art by default. Verify the 35-card set against the 45-page plan. Only create an extra asset if a later, frozen page specification introduces a genuinely new target word or action that no listed image can teach without ambiguity.

## 3. Per-asset executable briefs

### Character actions and health-role anchors

#### `l4-tom-touching-face` — `characters/tom/tom-touching-face.png`

Purpose: pages 9 and 20–24, model “Touch your face.” Reference `tom-neutral.png` and `tom-touching-ball.png`. Full or three-quarter Tom, yellow shirt/navy shorts, one index fingertip gently touching his cheek; face, hand, and contact point must all be unobstructed. Transparent background. Do not point at, touch, or hold any object; do not make the gesture look like toothache, earache, or headache.

#### `l4-mia-pointing-shoulder` — `characters/mia/mia-pointing-shoulder.png`

Purpose: pages 21–24, model “Point to your …”. Reference `mia-neutral.png` and `tom-pointing-at-ball.png`. Full or three-quarter Mia points with an extended index finger to one shoulder, leaving a clear air gap; show the whole pointing hand. Transparent background. No contact, no object, no pain expression, no ambiguous point at arm/neck.

#### `l4-mia-feeling-sick` — `health/status/mia-feeling-sick.png`

Purpose: pages 34–38 and 45, model “I don't feel well.” Reference `mia-neutral.png` and `mia-tired.png`. Mia is slightly slumped with a gentle pale/unwell expression and one hand resting on her forehead. Transparent background. Do not add a red glow, thermometer, medicine, bed, tears, a hand at a specific pain location, or a frightening illness.

#### `l4-doctor-friendly` — `characters/doctor/doctor-friendly.png`

Purpose: pages 35–38 and 45, establish doctor role. Reference the Tom/Mia 3D rendering quality, lighting, and warm proportions, but create a distinct friendly adult of diverse appearance. White coat over a simple coloured shirt, one stethoscope and clipboard, open calm posture and kind smile, isolated transparent background. No needle, mask, logo, text, hospital scene, dramatic equipment, or intimidating adult expression.

#### `l4-doctor-listening-to-mia` — `health/doctor/doctor-listening-to-mia.png`

Purpose: pages 35–38 and 45, show a safe consultation. Reference `doctor-friendly.png` and `mia-feeling-sick.png`. Doctor crouches/sits at Mia's eye level and listens kindly while Mia looks generally unwell; stethoscope can rest at the doctor's side. Transparent background, preferably a vertical two-figure composition. Do not stage an examination, injection, medicine, clinic background, or a singled-out pain location.

### Face vocabulary

#### `l4-tom-face` — `body/face/tom-face-closeup.png`

Purpose: teach *face* on pages 3 and 8–10, then reuse through pages 18–21, 25, and 40–44. Reference `tom-neutral.png`. Isolated front face crop, neutral expression, clear face oval/cheeks/chin/eyes/nose/mouth; hair is cropped or subdued so the card does not teach *head* or *hair*. Transparent background. No hand, text, pointer, pain glow, or expression that implies illness.

#### `l4-mia-hair` — `body/face/mia-hair-closeup.png`

Purpose: teach *hair*. Reference `mia-neutral.png`. Isolated crop with Mia's long curly hair texture and outline occupying most of the frame; show only minimal facial context. Transparent background. Do not create a full face/head portrait or add hair accessories.

#### `l4-tom-eye` — `body/face/tom-eye-closeup.png`

Purpose: teach *eye / eyes*. Reference `tom-neutral.png`. Close crop with both natural open eyes centred and in focus; brows and a small amount of face are context. Transparent background. No hand, tears, eyewear, red glow, wink, or sickness.

#### `l4-mia-ear` — `body/face/mia-ear-closeup.png`

Purpose: teach *ear / ears*. Reference `mia-neutral.png`. Three-quarter/side crop with one complete ear clearly visible and hair swept away from it. Transparent background. No hand, headphone, earring, sound-wave icon, pain glow, or crop that hides the ear rim.

#### `l4-tom-nose` — `body/face/tom-nose-closeup.png`

Purpose: teach *nose*. Reference `tom-neutral.png`. Centre facial crop with Tom's nose unmistakeably the focal feature; eyes and mouth secondary. Transparent background. No pointing finger, mucus, sickness, or pain glow.

#### `l4-mia-mouth` — `body/face/mia-mouth-closeup.png`

Purpose: teach *mouth*. Reference `mia-neutral.png`. Close crop of a relaxed closed or lightly open friendly mouth, with enough chin/cheeks for context. Transparent background. Teeth must not dominate; do not use speech bubbles or a hand.

#### `l4-tom-teeth` — `body/face/tom-teeth-closeup.png`

Purpose: teach *teeth*. Reference `tom-neutral.png`. Close crop of a friendly open smile with a clean row of several visible teeth. Transparent background. It must not look like a single aching tooth, a tooth-brushing scene, or a mouth-only card.

### Body vocabulary

#### `l4-tom-head` — `body/parts/tom-head.png`

Purpose: teach *head*. Reference `tom-neutral.png`. Isolated whole head and top of neck; include curls, forehead, ears, face, chin, and complete outer silhouette. Transparent background. Do not crop to just face or conceal hair/ears.

#### `l4-mia-neck` — `body/parts/mia-neck.png`

Purpose: teach *neck*. Reference `mia-neutral.png`. Head-and-shoulders crop in which the neck is visually centred and visibly connects head to shoulders. Transparent background. No hand, red glow, scarf, high collar, or front-centre throat gesture.

#### `l4-tom-shoulder` — `body/parts/tom-shoulder.png`

Purpose: teach *shoulder*. Reference `tom-neutral.png`. Upper torso crop with one rounded shoulder joint central; the arm appears only for orientation. Transparent background. Do not place a hand there or make the neck/chest dominant.

#### `l4-mia-arm` — `body/parts/mia-arm.png`

Purpose: teach *arm*. Reference `mia-neutral.png`. One complete arm shown from shoulder to wrist with natural relaxed pose; crop/minimise the hand. Transparent background. Do not turn it into a hand, elbow, or shoulder card.

#### `l4-tom-hand` — `body/parts/tom-hand.png`

Purpose: teach *hand*. Reference `tom-neutral.png`. One open palm from wrist onward, all five fingers visible and anatomically correct. Transparent background. No object, point gesture, arm-dominant composition, or pain.

#### `l4-mia-finger` — `body/parts/mia-finger.png`

Purpose: teach *finger*. Reference `mia-neutral.png`. One extended index finger is the unmistakable focal feature; remaining hand is supporting context. Transparent background. Do not create a whole-hand card or a pointing-at-an-object scene.

#### `l4-tom-chest` — `body/parts/tom-chest.png`

Purpose: teach *chest*. Reference `tom-neutral.png`. Front upper torso crop from collarbone to above waist; the chest zone of Tom's yellow shirt is central. Transparent background. No hand, pain glow, tummy crop, or stethoscope.

#### `l4-mia-tummy` — `body/parts/mia-tummy.png`

Purpose: teach *tummy*. Reference `mia-neutral.png`. Front midsection crop around lower abdomen/waist in Mia's turquoise shirt and orange shorts; tummy zone central. Transparent background. No hand, pain expression/glow, or chest-dominant crop.

#### `l4-tom-back` — `body/parts/tom-back.png`

Purpose: teach *back*. Reference `tom-neutral.png`. Rear upper-body view of Tom with his back clearly central. Transparent background. Do not use a side view, backpack, chair, or hand on back.

#### `l4-mia-leg` — `body/parts/mia-leg.png`

Purpose: teach *leg*. Reference `mia-neutral.png`. One straight bare leg from hip/shorts edge to ankle, with knee included only as neutral context. Transparent background. Do not crop to knee/foot or add pain pose.

#### `l4-tom-knee` — `body/parts/tom-knee.png`

Purpose: teach *knee*. Reference `tom-neutral.png`. Bent-leg crop where the knee joint is central, neutral expression/no pain. Transparent background. Do not show a full leg as the main subject or a hand holding the knee.

#### `l4-mia-foot` — `body/parts/mia-foot.png`

Purpose: teach *foot*. Reference `mia-neutral.png` for identity only. Isolated bare foot from ankle through heel and toes, natural neutral position. Transparent background. No trainer, sock, pain, or toe-only crop.

#### `l4-tom-toe` — `body/parts/tom-toe.png`

Purpose: teach *toe / toes*. Reference `tom-neutral.png` for identity only. Isolated forefoot crop where the toes are large, visibly separate, and central. Transparent background. No shoe/sock, no whole-foot-dominant framing, no pain.

### Pain vocabulary

#### `l4-tom-head-hurts` — `health/pain/tom-head-hurts.png`

Purpose: “My head hurts.” Reference `tom-neutral.png`. Tom presses temple/top side of head with one hand, with a clearly uncomfortable face and a small soft red glow localised at the head. Transparent background. Do not put hand on ear, jaw, or throat.

#### `l4-mia-eye-hurts` — `health/pain/mia-eye-hurts.png`

Purpose: “My eye hurts.” Reference `mia-neutral.png`. Mia gently cups one eye; keep the other eye and pain expression visible, with eye-only glow. Transparent background. Do not cover the ear/temple or make it look like tiredness.

#### `l4-tom-neck-hurts` — `health/pain/tom-neck-hurts.png`

Purpose: “My neck hurts.” Reference `tom-neutral.png`. Tom's hand supports the side/back of neck under the ear, not the front throat; local neck-only glow and pained face. Transparent background. This pose must differ strongly from sore throat.

#### `l4-mia-sore-throat` — `health/pain/mia-sore-throat.png`

Purpose: “My throat hurts.” Reference `mia-neutral.png`. Mia has an open hand flat over the front-centre throat beneath her chin, with local throat-only glow and pained face. Transparent background. Do not place hand at side/back neck.

#### `l4-tom-arm-hurts` — `health/pain/tom-arm-hurts.png`

Purpose: “My arm hurts.” Reference `tom-neutral.png`. Tom uses one hand to hold the middle of his other arm, clearly away from shoulder, elbow, wrist, and hand; show a pained face and arm-only glow. Transparent background.

#### `l4-mia-leg-hurts` — `health/pain/mia-leg-hurts.png`

Purpose: “My leg hurts.” Reference `mia-neutral.png`. Mia holds mid-thigh or mid-shin, away from knee joint, with pained face and local leg-only glow. Transparent background. Do not use a kneeling/knee-holding pose.

#### `l4-tom-knee-hurts` — `health/pain/tom-knee-hurts.png`

Purpose: “My knee hurts.” Reference `tom-neutral.png`. Tom bends one leg and holds that knee joint with both hands; pained face and a glow only at the joint. Transparent background. This must not be reusable as leg pain.

#### `l4-mia-tummy-hurts` — `health/pain/mia-tummy-hurts.png`

Purpose: “My tummy hurts.” Reference `mia-neutral.png`. Mia places both hands over lower front abdomen, below chest, with pained face and tummy-only glow. Transparent background. Do not show chest pain, a generic sick pose, or stomach contents.

#### `l4-tom-toothache` — `health/pain/tom-toothache.png`

Purpose: “My tooth hurts.” Reference `tom-neutral.png`. Tom presses lower cheek/jaw beside mouth; show a small part of mouth/teeth plus pained face and local cheek/tooth glow. Transparent background. Do not cup ear or temple.

#### `l4-mia-earache` — `health/pain/mia-earache.png`

Purpose: “My ear hurts.” Reference `mia-neutral.png`. Mia cups one clearly visible ear with a pained face and ear-only glow. Transparent background. Do not turn it into the familiar listening pose, toothache, or headache.

## 4. Batch acceptance checklist

- Compare generated Tom/Mia faces, curls, clothing colours, and proportions against their two neutral anchors. Reject identity drift.
- Inspect every transparent PNG on both light and dark backgrounds; reject opaque rectangles, halos, clipped limbs, or loose background remnants.
- Inspect all 20 part cards in their intended comparison pairs before approval; reject any card that could teach a neighbouring word equally well.
- Inspect all 10 pain cards side by side; verify unique hand placement, unique local glow, and visible uncomfortable expression for each.
- Confirm that no image contains text, labels, arrows, logos, emoji, watermarks, extra limbs/digits, animation, or non-instructional scene dressing.
- Keep every accepted file unregistered until the later Lesson 4 implementation task explicitly adds an approved entry to `data/visuals.js` and audits all paths.
