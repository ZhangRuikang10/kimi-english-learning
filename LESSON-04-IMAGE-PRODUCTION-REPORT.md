# Lesson 4 — Image production report

## Summary

- Planned NEW_REQUIRED assets: **35**
- Successfully generated and saved: **35**
- Failed / missing after retry: **0**
- Directly reused approved existing images: **9**
- Total Lesson 4 manifest assets: **44**
- Final asset root: `assets/images/lesson-04/`
- New-image status: **`GENERATED_PENDING_HUMAN_REVIEW`**
- Reused-image status: **`REUSED_APPROVED`**

One `mia-mouth-closeup.png` generation was replaced because its first output had an opaque painted background despite an alpha channel. One Tom face card also required a descriptive fallback prompt after the reference-image prompt was rejected by the image safety filter; it is saved and technically valid but needs an explicit Tom-identity review.

## Technical QA

The manifest paths were checked against the working tree after the final retry.

| Check | Result |
| --- | --- |
| Missing NEW_REQUIRED files | **0** |
| Broken / unreadable PNG files | **0** |
| Wrong extensions | **0** — all 35 new files are `.png` |
| Zero-byte files | **0** |
| RGBA / alpha channel failures | **0** |
| Alpha-channel presence failures | **0** — all 35 PNGs decode as RGBA/ARGB |
| Clean visual cutout / halo review | **Pending human review** — several pain renders retain a visible soft aura in the preview despite transparent outer pixels; do not promote these cards until the edge treatment is accepted or repaired |
| Square 1024×1024 outputs | 5 |
| Non-square outputs | 30; accepted as portrait or close-crop teaching compositions and visually suitable for direct webpage use |
| Files outside `assets/images/lesson-04/` | **0** |

Observed generated dimension groups include 1024×1536 (8), 1254×1254 (5), 1312×1199 (6), and other transparent portrait/close-crop ratios. Existing project assets already include non-square transparent character PNGs, so these are recorded as dimension variation rather than silently resized or distorted.

## Category totals

| Category | New images |
| --- | ---: |
| Body-part cards | 13 |
| Face-part cards | 7 |
| Pain / hurt cards | 10 |
| Character action cards | 2 |
| Sick / general health status | 1 |
| Doctor role character | 1 |
| Doctor consultation scene | 1 |
| **Total new** | **35** |

Character coverage among new files: **Tom 17**, **Mia 16**, **Doctor 2**. The remaining nine manifest entries point to the approved Lesson 1 images and were not copied or modified.

## Human review checklist

Technical QA cannot confirm teaching semantics, identity continuity, anatomy quality, or whether a soft generated aura is acceptable as a teaching cutout. Before promotion from `GENERATED_PENDING_HUMAN_REVIEW`, inspect the PNGs visually at both full size and mobile card size:

- Tom identity: curls, face, yellow T-shirt, navy shorts, proportions, and continuity with `tom-neutral.png`.
- Mia identity: curls, face, turquoise T-shirt, orange shorts, proportions, and continuity with `mia-neutral.png`.
- Hands and fingers: five natural fingers, no merges or extra digits, and correct point/touch contact.
- Feet and toes: full foot versus toe crop, no unintended shoe in foot/toe cards.
- Head vs face vs hair: each card must teach only its intended region.
- Neck versus front throat: side/back neck and front-centre throat gestures must be visibly different.
- Chest versus tummy: upper torso versus lower abdomen must not collapse into one region.
- Toothache versus earache versus headache: jaw/mouth, ear, and temple/top-head hand positions must be distinct.
- Knee versus leg: knee joint must be central in the knee card; leg card must avoid knee-specific holding.
- Pain location: every hurt card must show exact location, hand position, and mild uncomfortable expression; reject a frown-only card.
- Sick status: `mia-feeling-sick` must communicate general unwellness, not a hidden headache or tummy pain.
- Doctor friendliness: doctor must feel warm, safe, child-level, and professional without needles, blood, threatening tools, or intimidating scene treatment.
- Generated transparency: check every edge on both light and dark backgrounds; reject any residual painted backdrop or halo.

No `data/visuals.js`, `data/lessons/*.js`, CSS, renderer, audio, `play-now.html`, or Lesson 1–3 asset was changed in this production pass.
