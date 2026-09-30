# Lesson 4 — Visual plan

Scope: visual-asset planning only. This document does **not** add Lesson 4 lesson data, visual registrations, audio, page code, or changes to Lessons 1–3.

## 1. Current visual system understood from the repository

### Existing organisation and reuse model

- Lesson 1 is the durable character foundation. Its AI-created teaching PNGs live under `assets/images/lesson-1/characters/tom/` and `assets/images/lesson-1/characters/mia/`; its object PNGs live under `assets/images/lesson-1/objects/`.
- Lesson 2 is self-contained by concept (`balls/`, `colours/`, `objects/`) and deliberately reuses the frozen Lesson 1 characters through registry IDs rather than copying them. Its teaching PNGs are mostly 1024×1024 RGBA with transparency; colour cards are SVG.
- Lesson 3 uses the two-digit directory form `assets/images/lesson-03/`. It adds only contextual Tom/Mia poses under `characters/tom/` and `characters/mia/`, plus discrete objects and money. Its manifest explicitly records whether an asset is generated or reused.
- `data/visuals.js` is the single visual registry. A lesson supplies a `visualId`; the registry resolves that ID to one local `src`, `alt`, `concept`, and `approved` status. It also makes character reuse explicit (for example, `boy-child` resolves to Tom neutral and `child-listening` resolves to Mia listening). Lesson 4 should follow this same data-only contract when it is implemented later. **No Lesson 4 registry entries are created in this task.**
- Existing lesson files are data declarations built from those IDs. The standalone build consumes source modules into `play-now.html`; the Lesson 3 release report confirms its source-build workflow and its regression discipline. This task leaves that flow untouched.

### Character identity anchors

The strongest generation anchors are the neutral, transparent, full-body images: `tom-neutral.png` and `mia-neutral.png`. They show the locked identity details clearly: Tom's dense short dark curls, yellow T-shirt, navy shorts and white trainers; Mia's long dark curly hair, turquoise T-shirt, orange shorts and white trainers. Use these first in every Tom/Mia generation batch.

Use the following as supporting pose/expression anchors, not replacements for the neutral anchors:

- `tom-speaking.png`: Tom's open-mouth speaking expression and presentation gesture (opaque legacy background, so reference identity/pose only).
- `tom-stand-up.png`, `tom-pointing-at-ball.png`, `tom-touching-ball.png`: Tom's full-body proportions and readable action language.
- `mia-listening.png` and `mia-tired.png`: Mia's listening hand placement and non-threatening tired expression.
- Lesson 3's `tom-fruit-shopkeeper*.png` and `mia-shopping-list-basket.png`: confirmation that the established identities can carry a role/prop, but they are not doctor references and must not be copied as a visual setting.

### Naming and directory decision

Existing image filenames are lowercase kebab-case, begin with a character name where applicable, and describe the pose or object: `tom-touching-ball.png`, `mia-shopping-list-basket.png`, `pencil-yellow.png`. Lesson 4 therefore uses:

- directory name `lesson-04` (matching the established Lesson 3 two-digit form);
- lowercase kebab-case PNG filenames;
- character prefix for character images (`tom-`, `mia-`, `doctor-`);
- the future registry-ID prefix `l4-` to avoid collisions with frozen IDs;
- `body/face/` for facial targets, `body/parts/` for non-face anatomy, and `health/` for sickness, pain, and doctor-role images.

All listed new assets should be delivered as isolated transparent PNGs. Target 1024×1024 RGBA for single teaching cards, preserving the existing default; a 1024×1536 transparent PNG is acceptable only for a full two-person doctor consultation when it needs vertical room. Do not create placeholder files. New art must pass human visual approval before a future `data/visuals.js` registration.

## 2. Lesson 4 assets that can be reused directly

These are approved existing runtime images. Reuse means reference their future existing `visualId`; do not copy the files into Lesson 4.

| Existing visual / teaching meaning | Existing file | Why it is reusable | Suggested Lesson 4 pages |
| --- | --- | --- | --- |
| Tom neutral — a whole child body / Tom identity | `assets/images/lesson-1/characters/tom/tom-neutral.png` | Clear full-body, transparent identity anchor; suitable for an overview and character selection, but not precise enough to teach individual parts alone. | 2, 18, 19, 35–38, 45 |
| Mia neutral — a whole child body / Mia identity | `assets/images/lesson-1/characters/mia/mia-neutral.png` | Matching full-body transparent anchor; provides gender-balanced familiar patient/player choice. | 2, 18, 19, 35–38, 45 |
| Tom speaking — model speaking | `assets/images/lesson-1/characters/tom/tom-speaking.png` | Existing speaking pose can frame oral prompts; it must not be used as a mouth/teeth teaching card because its background and gesture add noise. | 33–38, 42–45 |
| Tom standing — ready to move | `assets/images/lesson-1/characters/tom/tom-stand-up.png` | Already approved as the explicit `stand up` concept, so no duplicate movement icon is justified. | 1, 22–24 |
| Mia listening — listen / remember | `assets/images/lesson-1/characters/mia/mia-listening.png` | Existing hand-to-ear pose expresses listening without teaching an ear anatomy card. | 21–24, 44 |
| Tom pointing at an object — point (not touch) | `assets/images/lesson-1/characters/tom/tom-pointing-at-ball.png` | Preserves the previously checked point-versus-touch distinction. It is a procedural cue only, not a body-part illustration. | 21–24 |
| Tom touching an object — touch | `assets/images/lesson-1/characters/tom/tom-touching-ball.png` | Preserves the previously checked physical contact concept. A new self-touch pose remains required for page 9. | 20–24 |
| Mia tired — tired | `assets/images/lesson-1/characters/mia/mia-tired.png` | Useful only to contrast the known word *tired* with the new *I don't feel well* language. It does not communicate illness or pain location. | 34–36 |
| Tom happy — okay / reassuring outcome | `assets/images/lesson-1/characters/tom/tom-happy.png` | Familiar positive affect supports an “Are you okay?” contrast or successful role-play ending. | 35, 38, 45 |

There are **9 direct old-image reuses** in the proposed plan. The Lesson 3 shopkeeper and shopping images are reference anchors only: reusing them in a medical task would introduce an irrelevant shop/list/basket meaning.

## 3. Assets that must be newly generated

### Why this set is new

No existing asset teaches a named body part in isolation, shows a child touching or pointing to their own body, establishes a specific pain location, represents non-specific illness, or provides a friendly doctor role. Cropping a frozen image at runtime is not a replacement: it would be inconsistent across layouts and would not produce a reusable approved teaching asset.

“P1” means first-batch/high-priority generation; “P2” means generate after the body vocabulary visual style is approved. Every item below is a static transparent PNG, with no emoji, text, labels, arrows, UI chrome, background scene, or animation.

| Asset ID | Proposed file | Meaning / primary pages | Why old art cannot serve | Key visual requirement | BG / priority |
| --- | --- | --- | --- | --- | --- |
| `l4-tom-touching-face` | `assets/images/lesson-04/characters/tom/tom-touching-face.png` | Tom gently touches his own face; 9, 20–24 | Existing touch image touches a ball, not a body. | One fingertip visibly contacts cheek/face; face, hand, and contact point all readable. | Transparent PNG / P1 |
| `l4-mia-pointing-shoulder` | `assets/images/lesson-04/characters/mia/mia-pointing-shoulder.png` | Mia points to her own shoulder; 21–24 | Existing point image points at a ball. | Extended index finger stops just above one shoulder; no physical contact, full hand visible. | Transparent PNG / P1 |
| `l4-tom-face` | `assets/images/lesson-04/body/face/tom-face-closeup.png` | *face*; 3, 8–10, 18–21, 25, 40–44 | No isolated face teaching image exists. | Front face crop; the face contour is primary, with hair visually de-emphasised so it is not mistaken for *hair* or *head*. | Transparent PNG / P1 |
| `l4-mia-hair` | `assets/images/lesson-04/body/face/mia-hair-closeup.png` | *hair*; 3, 8–10, 18–21, 40–44 | No hair-only concept art exists. | Curl texture and hair silhouette dominate; only enough face is shown for scale, never a full-face card. | Transparent PNG / P1 |
| `l4-tom-eye` | `assets/images/lesson-04/body/face/tom-eye-closeup.png` | *eye / eyes*; 3–4, 10, 18–21, 25, 40–44 | Existing characters are too small for precise eye teaching. | Close crop showing both eyes clearly; no hand, pain, eyewear, or arrow. | Transparent PNG / P1 |
| `l4-mia-ear` | `assets/images/lesson-04/body/face/mia-ear-closeup.png` | *ear / ears*; 3, 5, 10, 18–21, 25, 40–44 | Listening pose teaches an action, not ear anatomy. | Three-quarter or side crop with one complete ear unobscured by hair. | Transparent PNG / P1 |
| `l4-tom-nose` | `assets/images/lesson-04/body/face/tom-nose-closeup.png` | *nose*; 3, 6, 10, 18–21, 25, 40–44 | No facial-feature asset exists. | Centre face crop where nose is unmistakably dominant; mouth and eyes remain secondary. | Transparent PNG / P1 |
| `l4-mia-mouth` | `assets/images/lesson-04/body/face/mia-mouth-closeup.png` | *mouth*; 3, 7, 10, 18–21, 25, 40–44 | Speaking image includes unrelated body and opaque background. | Closed or lightly open smile with mouth contour clear; do not foreground teeth. | Transparent PNG / P1 |
| `l4-tom-teeth` | `assets/images/lesson-04/body/face/tom-teeth-closeup.png` | *teeth*; 3, 7, 10, 18–21, 25, 40–44 | No clear teeth visual exists. | Open friendly smile with several clean visible teeth; must read as plural teeth, not mouth or toothache. | Transparent PNG / P1 |
| `l4-tom-head` | `assets/images/lesson-04/body/parts/tom-head.png` | *head*; 2, 11, 18–21, 25, 40–44 | A face crop would blur face/head; neutral figure is too small. | Whole head outline including hair, forehead, ears, face and chin; neck visibly begins below it. | Transparent PNG / P1 |
| `l4-mia-neck` | `assets/images/lesson-04/body/parts/mia-neck.png` | *neck*; 2, 11, 18–21, 25, 40–44 | Existing image has no clear neck-focused crop. | Head-and-shoulders crop where the side/front neck is centred; no hand on throat. | Transparent PNG / P1 |
| `l4-tom-shoulder` | `assets/images/lesson-04/body/parts/tom-shoulder.png` | *shoulder*; 2, 12, 18–21, 25, 40–44 | No shoulder-target visual exists. | Upper torso crop; rounded shoulder joint is central, with arm only as context. | Transparent PNG / P2 |
| `l4-mia-arm` | `assets/images/lesson-04/body/parts/mia-arm.png` | *arm*; 2, 12, 18–21, 25, 40–44 | Hand and arm must not be conflated. | Full arm from shoulder to wrist is visible; hand is cropped/minimised. | Transparent PNG / P2 |
| `l4-tom-hand` | `assets/images/lesson-04/body/parts/tom-hand.png` | *hand*; 2, 13, 18–21, 25, 40–44 | Existing gesture art includes an object/context. | One open palm and wrist, all five fingers visible, no arm-dominant crop. | Transparent PNG / P2 |
| `l4-mia-finger` | `assets/images/lesson-04/body/parts/mia-finger.png` | *finger*; 2, 13, 18–21, 25, 40–44 | A hand card cannot teach the singular finger precisely. | One extended index finger is clear; remaining hand is supporting context only. | Transparent PNG / P2 |
| `l4-tom-chest` | `assets/images/lesson-04/body/parts/tom-chest.png` | *chest*; 2, 14, 18–21, 25, 40–44 | Existing shirted full body is not a chest teaching card. | Front upper torso, collarbone to just above waist; chest zone is central and distinct from tummy. | Transparent PNG / P2 |
| `l4-mia-tummy` | `assets/images/lesson-04/body/parts/mia-tummy.png` | *tummy*; 2, 14, 18–21, 25, 40–44 | No abdomen-focused teaching visual exists. | Front midsection around the navel/lower abdomen; no pain expression or hand. | Transparent PNG / P2 |
| `l4-tom-back` | `assets/images/lesson-04/body/parts/tom-back.png` | *back*; 2, 15, 18–21, 25, 40–44 | No rear-view visual exists. | Back-facing upper-body crop; clearly show the back, not a side or shoulder. | Transparent PNG / P2 |
| `l4-mia-leg` | `assets/images/lesson-04/body/parts/mia-leg.png` | *leg*; 2, 16, 18–21, 25, 40–44 | Leg and knee require distinct concepts. | A straight leg from hip to ankle; knee present only as context, not highlighted. | Transparent PNG / P2 |
| `l4-tom-knee` | `assets/images/lesson-04/body/parts/tom-knee.png` | *knee*; 2, 16, 18–21, 25, 40–44 | No knee-specific visual exists. | Bent leg close-up where the knee joint is visually central; no hurt expression. | Transparent PNG / P2 |
| `l4-mia-foot` | `assets/images/lesson-04/body/parts/mia-foot.png` | *foot*; 2, 17, 18–21, 25, 40–44 | Existing trainers conceal the foot shape. | Bare foot from ankle to heel/toes; not a shoe. | Transparent PNG / P2 |
| `l4-tom-toe` | `assets/images/lesson-04/body/parts/tom-toe.png` | *toe / toes*; 2, 17, 18–21, 25, 40–44 | Foot and toe require distinct concepts. | Forefoot crop with toes dominant and separated enough to count; not a whole-foot card. | Transparent PNG / P2 |
| `l4-tom-head-hurts` | `assets/images/lesson-04/health/pain/tom-head-hurts.png` | *My head hurts*; 26–27, 32–33, 36–38, 44–45 | Existing tired/sad art gives no pain location. | Tom's hand presses temple/top side of head; clear pained face and a subtle local red pain glow only at head. | Transparent PNG / P1 |
| `l4-mia-eye-hurts` | `assets/images/lesson-04/health/pain/mia-eye-hurts.png` | *My eye hurts*; 26–27, 32–33, 36–38, 44–45 | No eye pain or location gesture exists. | Mia gently cups one eye, other eye and discomfort expression visible; local glow at that eye only. | Transparent PNG / P1 |
| `l4-tom-neck-hurts` | `assets/images/lesson-04/health/pain/tom-neck-hurts.png` | *My neck hurts*; 26, 28, 32–33, 36–38, 44–45 | Neck and throat pain must be distinguishable. | Hand is on the side/back of neck below ear, never centre throat; local glow follows neck. | Transparent PNG / P1 |
| `l4-mia-sore-throat` | `assets/images/lesson-04/health/pain/mia-sore-throat.png` | *My throat hurts / sore throat*; 26, 28, 32–33, 36–38, 44–45 | No throat-location asset exists. | Flat open hand at front-centre throat beneath chin; neck sides remain visible; local glow only there. | Transparent PNG / P1 |
| `l4-tom-arm-hurts` | `assets/images/lesson-04/health/pain/tom-arm-hurts.png` | *My arm hurts*; 26, 29, 32–33, 36–38, 44–45 | Existing images do not identify an arm pain site. | Other hand holds middle of upper/lower arm, away from hand, shoulder and elbow; pained face. | Transparent PNG / P1 |
| `l4-mia-leg-hurts` | `assets/images/lesson-04/health/pain/mia-leg-hurts.png` | *My leg hurts*; 26, 29, 32–33, 36–38, 44–45 | Knee pose cannot substitute for the leg. | Hand holds mid-thigh or mid-shin, explicitly away from knee joint; pained face. | Transparent PNG / P1 |
| `l4-tom-knee-hurts` | `assets/images/lesson-04/health/pain/tom-knee-hurts.png` | *My knee hurts*; 26, 29, 32–33, 36–38, 44–45 | No knee-pain visual exists. | Bent knee is central and held by both hands; red glow is confined to knee joint. | Transparent PNG / P1 |
| `l4-mia-tummy-hurts` | `assets/images/lesson-04/health/pain/mia-tummy-hurts.png` | *My tummy hurts*; 26, 30, 32–33, 36–38, 44–45 | Existing tired pose does not specify abdomen pain. | Both hands protect lower front abdomen; pained face; glow is below chest, not on the chest. | Transparent PNG / P1 |
| `l4-tom-toothache` | `assets/images/lesson-04/health/pain/tom-toothache.png` | *My tooth hurts / toothache*; 26, 31–33, 36–38, 44–45 | A hand-on-face pose could mean headache or earache. | Hand presses lower cheek/jaw next to mouth, mouth/teeth visible; glow at one cheek/tooth location, never ear. | Transparent PNG / P1 |
| `l4-mia-earache` | `assets/images/lesson-04/health/pain/mia-earache.png` | *My ear hurts / earache*; 26, 31–33, 36–38, 44–45 | Existing listening pose is positive and does not show pain. | Hand cups the visible ear, not temple/jaw; pained face and local ear-only glow. | Transparent PNG / P1 |
| `l4-mia-feeling-sick` | `assets/images/lesson-04/health/status/mia-feeling-sick.png` | *I don't feel well*; 34–38, 45 | Tired is a known state, not illness. | Slightly slumped Mia, pale/unwell expression, one hand on forehead; no pain glow and no specific pain-location gesture. | Transparent PNG / P1 |
| `l4-doctor-friendly` | `assets/images/lesson-04/characters/doctor/doctor-friendly.png` | Friendly doctor role; 35–38, 45 | No doctor character exists. | Warm, diverse adult in the same 3D child-friendly style; white coat, simple stethoscope and clipboard; kind eye-level smile; no needle, mask, logo, text or intimidating posture. | Transparent PNG / P1 |
| `l4-doctor-listening-to-mia` | `assets/images/lesson-04/health/doctor/doctor-listening-to-mia.png` | Doctor consultation / final role-play; 35–38, 45 | A solo doctor cannot show the communication relationship. | Doctor crouches or sits at Mia's eye level, listening kindly; stethoscope at side, Mia looks unwell but no body part is singled out; no clinic background. | Transparent PNG / P1 |

### Reading and phonics support

No additional reading/phonics artwork is required. Pages 39–43 can reuse the already-generated body-part cards: `/h/` can contrast *head*, *hair*, and *hand*; reading and word-building can use the corresponding clear picture cards. This avoids decorative letter art and keeps the image as the word meaning.

## 4. Minimal usable new asset set

The minimal adequate set is **35 new images**, not 45 page-specific images:

| Reusable asset family | Image count | Pages covered | Why this is sufficient |
| --- | ---: | --- | --- |
| Self-body action poses | 2 | 9, 20–24 | One explicit self-touch and one explicit self-point distinguish the action language; activities can vary the spoken target with the body cards and real child movement. |
| Face-part cards | 7 | 3–10, 18–21, 25, 39–44 | Each required facial concept has a distinct semantic crop; the same cards serve direct teaching, counting, reading, and detective tasks. |
| Non-face body-part cards | 13 | 2, 11–21, 25, 39–44 | Every potentially confusable vocabulary target has its own card. The old neutral full-body images supply the overview/build context. |
| Specific pain cards | 10 | 26–33, 36–38, 44–45 | One precise card per stated pain location eliminates unsafe/ambiguous “sad face means hurt” shortcuts. |
| General sick status | 1 | 34–38, 45 | Separates being unwell from tired and from a named pain. |
| Doctor role assets | 2 | 35–38, 45 | A standalone role card plus one consultation scene is enough for all doctor dialogue and the final mission. |

Several pages deliberately share the same images:

- Pages 18–19, 20–21, 25, 40–44 all reuse the same 20 body-part cards; only interaction, prompt, and reading level change.
- Pages 26–33, 36–38, 44–45 all reuse the same 10 pain cards; this creates a reliable pain-location vocabulary through listening, speaking, diagnosis, and role-play.
- Pages 35–38 and 45 reuse the sick-status image plus the two doctor-role images; no separate “Are you okay?”, “What’s wrong?”, or final-scene art is needed.
- Pages 1 and 22–24 use the approved existing standing/listening/point/touch action images with the new self-body action poses; no generic animated or decorative movement images are needed.

## 5. Visual QA risks and non-negotiable checks

- **Face vs. head vs. hair:** face must not merely be a full head image; head must include the entire outline including hair; hair must be a hair-dominant crop.
- **Neck vs. throat:** neck pain touches side/back of neck. Sore throat uses the front-centre below the chin. Never use the same pose for both.
- **Hand vs. arm / finger:** the hand card has the palm and all fingers; the arm card visibly spans shoulder to wrist; the finger card makes one finger dominant.
- **Leg vs. knee / foot vs. toe:** a leg-pain hand must avoid the knee joint; knee pain must centre the bent joint. Foot includes the whole ankle-to-toe form; toe is a forefoot/toe crop. Bare feet are required for those two teaching cards, with neutral non-medical presentation.
- **Chest vs. tummy:** chest is upper torso, tummy is lower front abdomen. Keep pain glow/hand placement correspondingly separate. Do not use the clinical word *stomach* as an unlabelled visual replacement for the child-facing *tummy* card.
- **Toothache vs. earache vs. headache:** jaw/cheek next to mouth, ear, and temple/top-of-head must be visibly different. Every pain image must show (1) exact location, (2) a hand at that location, and (3) an unmistakably uncomfortable face. A frown by itself fails QA.
- **General sickness:** `mia-feeling-sick` must not become another tummy-ache or headache image. Use non-specific posture and forehead hand, no local red glow.
- **Doctor tone:** friendly, calm, diverse, at child eye level. No injections, frightening equipment, exaggerated illness, hospital gore, adult seriousness, logos, words, or sterile room background.
- **Asset integrity:** transparent pixels are truly transparent; no clipped fingers, toes, ears, or shoes; no extra fingers/limbs; no text, labels, watermark, or emoji; static pose only. Review at phone-card size as well as full size before approval.

## Deliberate non-changes

- `data/visuals.js` remains untouched; this plan names future IDs only.
- `data/lessons/hello.js`, `data/lessons/colours.js`, and `data/lessons/numbers.js` remain untouched.
- No audio, runtime pages, standalone build output, existing asset, manifest, or release report is changed.
