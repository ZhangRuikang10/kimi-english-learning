# Lesson 3 — Numbers in My World: Release Candidate report

Status: **READY FOR HUMAN REVIEW**

## Delivery summary

- Lesson title: **Lesson 3 — Numbers in My World**
- Subtitle: **Count · Choose · Buy**
- Top-level activities: 34
- Runtime playback points: 62
- Unique runtime utterances: 58
- Reused approved MP3: 2
- Newly generated MP3: 56
- Total Lesson 3 physical MP3: 56
- Audio provider/model/voice/locale: Google Cloud Gemini TTS / `gemini-2.5-flash-tts` / Kore / `en-GB`
- Audio data and manifest: `data/audio/lesson03Entries.js`, `assets/audio/lesson-03/lesson-03-audio-manifest.csv`
- Standalone: rebuilt `play-now.html` from source.

## Hard audio gate

- Missing runtime MP3: **0**
- Missing physical MP3: **0**
- Broken MP3 paths: **0**
- Audio registry collisions: **0**
- Browser `speechSynthesis` fallback: **0**
- All new files: MP3, 24 kHz, mono; each verified with `ffprobe`.

## Regression and build

- Lesson 1 registry entries / broken files: 92 / 0; first-page replay smoke test: PASS
- Lesson 2 registry entries / broken files: 50 / 0; first-page replay smoke test: PASS
- Lesson 3 audio runtime coverage: PASS
- JavaScript syntax: PASS
- Lesson 3 visual paths: 0 missing
- `play-now.html` source build: PASS (28 modules)

## Human review remains required

New audio is marked `RC_PENDING_HUMAN_REVIEW`. Review speech naturalness, numbers, plural nouns, shopping dialogue, prices, and final instructions using the accompanying checklist.

## Corrective human-preview pass — 2026-09-25

- Replaced the temporary-style Lesson 3 classroom and food object visuals with 10 clear, transparent PNG teaching objects (banana, orange, cookie, crayon, green book, notebook, eraser, ruler, red pencil and yellow pencil); added Tom's matched banana-shopkeeper action.
- Correct selections now remain visibly green. Incorrect quantity, price and picture choices receive clear temporary red feedback.
- Rebuilt Listen and Choose as four directly selectable picture groups, eliminating the duplicate text-choice interaction.
- Phrase-builder, speaking and interview visuals now repeat the exact number of objects described by the displayed answer.
- Basket pages include **Undo last** and **Clear basket**. The Give Me page is a real person-delivery task: select an item, then give it to Tom or Mia; it has Undo and Clear delivery.
- Price learning now explicitly shows question → model answer → required coin choice. More/Less and Same prompts use the larger thinking-question treatment.
- Memory Shop now reveals the shop for five seconds, covers it, and only then unlocks answer choices.
- Regenerated and registered the corrected exact utterance: `Give Tom one green book and Mia two cookies.` The audio manifest and runtime audit now reflect 58 unique utterances / 56 Lesson 3 MP3 files.
- The regenerated Mia utterance uses an explicit Kore pronunciation instruction: **Mia = MEE-uh (/ˈmiːə/), never M-I-A**. Its on-screen request now exactly matches its spoken text.
- Re-centred the product/question/coin axis on the two price-learning pages, Pay the money, and the final-challenge payment step; aligned the two Give Me recipient cards.
- Source-built `play-now.html` was rebuilt after the corrective pass. Sampled formal-MP3 replay produced no browser console errors.

## Publish status

- NOT PUSHED
- NOT PUBLISHED
- Remote `main` unchanged
