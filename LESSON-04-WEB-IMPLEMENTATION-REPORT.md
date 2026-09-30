# Lesson 4 — Web Implementation Report

## Summary

- Top-level activities: **45 exactly** (`01-ready-to-move` through `45-final-doctor-mission`)
- Unique top-level + challenge activity IDs: **133**
- Registered Lesson 4 visuals: **35 new `l4-*` visuals**; **44 total manifest assets** when the 9 approved reused visuals are included
- New renderer types: **bodyMap, bodyBuilder, wordChoice, wordBuilder, miniReading**
- Reused renderer types: **learn, listenChoose, tapChoice, actionPrompt, speakPrompt, review, challenge** (plus the existing Lesson 3 renderers remain available)
- Formal Lesson 4 audio: **not generated**; all speaking/listening data carries the intended `ttsText`

## Core files

- `data/lessons/body.js`
- `data/lessonIndex.js`
- `data/visuals.js`
- `js/activities/lesson04.js`
- `js/activities/renderer.js`
- `js/validation/lessonValidator.js`
- `css/components.css`
- `scripts/lesson04-audit.mjs`
- `package.json` (`qa:lesson04`)
- `play-now.html` rebuilt by `node scripts/build-standalone.mjs`

No Lesson 1–3 lesson data, audio registry, renderer architecture, or generated Lesson 4 images were changed.

## QA results

| Check | Result |
| --- | --- |
| Lesson 4 top-level structure | **PASS — 45/45** |
| Unique IDs and `01–45` order | **PASS** |
| Visual registry / approved metadata | **PASS — 35 Lesson 4 visuals** |
| Referenced visual paths | **PASS — 0 missing** |
| Unknown activity types | **0** |
| JavaScript syntax checks | **PASS** |
| Standalone build | **PASS — 30 modules bundled** |
| Browser console errors during smoke test | **0** |
| 1440×900 desktop overflow | **PASS** |
| 393×852 portrait overflow | **PASS** |
| 375×667 portrait overflow | **PASS** |
| 320×568 portrait overflow | **PASS** |
| 852×393 landscape overflow | **PASS; vertical scroll retained where content is taller than the viewport** |
| Lessons 1–3 open regression | **PASS** |
| Existing Lesson 3 audit | **PASS — 0 missing visuals, 0 broken audio paths, 0 registry collisions** |

## Browser smoke coverage

The browser smoke run completed Lesson 4 from Home through Finish and exercised:

- Ready-to-move challenge
- Body and face maps, including listen mode
- Body builder selection-and-zone matching
- Body action challenges and two/three-step prompts
- Pain listening choices and doctor language
- Phonics, silent word reading, word builder, sentence reading
- Mini reading comprehension
- Body detective
- Final doctor mission

## Known issues / follow-up

- Lesson 4 MP3 files are intentionally not part of this implementation; replay currently follows the existing audio architecture and logs unavailable audio until the next audio-production phase.
- New visual registry entries are marked `approved: true` for the web contract as requested; the production manifest retains its human-review status separately.
- The short landscape shell allows vertical scrolling for tall body-map/builder cards so teaching visuals and 48px+ touch zones are not made too small.

## Audio-production readiness

The web/data layer is ready for the next formal audio phase: extract and deduplicate `ttsText`, generate approved Kore MP3 files, then populate the existing `audioRegistry` without changing the Lesson 4 activity structure.
