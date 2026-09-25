# Lesson 3 QA report

Date: 2026-09-25

## Audio QA — PASS

| Check | Result |
| --- | ---: |
| Runtime playback points | 62 |
| Unique utterances | 58 |
| Reused approved MP3 | 2 |
| Newly generated MP3 | 56 |
| Lesson 3 physical MP3 | 56 |
| Missing runtime MP3 | 0 |
| Broken MP3 paths | 0 |
| Registry collisions | 0 |
| `speechSynthesis` fallbacks | 0 |

ADC preflight used `Three red apples.`. It generated a valid 24 kHz mono MP3 and was removed from the temporary QA directory. New production audio uses Google Cloud Gemini TTS, `gemini-2.5-flash-tts`, Kore, `en-GB`, MP3.

## Content / assets / build — PASS

- Lesson 3 has 34 top-level activities.
- All Lesson 3 runtime visual paths resolve: 0 missing.
- JavaScript syntax validation passed across `data/` and `js/`.
- All new and reused runtime MP3 files resolve and have a non-zero valid MP3 stream.
- `play-now.html` was regenerated from source after audio integration.

## Regression — PASS

- Lesson 1: 92 audio registry entries, 0 missing/broken files.
- Lesson 2: 50 audio registry entries, 0 missing/broken files.
- Existing approved Lesson 1/2 MP3 files were not changed.
- Lesson 1 and Lesson 2 first-page formal replay controls were exercised in the browser: 0 console errors.

## Human review items

- Listen to every newly generated utterance before promotion from `RC_PENDING_HUMAN_REVIEW`.
- Check key flows on target desktop and mobile devices, especially basket/payment layouts and the final challenge.

## Corrective preview QA — PASS

| Area | Result |
| --- | --- |
| Formal teaching-object assets | PASS — 10 new transparent PNG objects plus Tom-with-banana action are registered and resolve. |
| Quantity / colour integrity | PASS — repeated visual counts match the displayed answers on One or Many, Number + Colour + Object, Speak, Memory Shop and Mini Interview. |
| Correct-answer feedback | PASS — correct numeric, price, picture-group and comparison choices retain clear green state; wrong choices show red feedback. |
| Listen and Choose | PASS — four visual groups are the only choices; no duplicated textual answer controls. |
| Basket recovery | PASS — Undo last / Clear basket exercised; correct basket completes. |
| Give Me delivery | PASS — tested green book → Tom and two cookies → Mia; Undo/Clear delivery supplied. |
| Memory Shop | PASS — answer controls lock during the five-second reveal and unlock after the product panel is covered. |
| Final Shopping Challenge | PASS — 2 red apples + 3 blue pencils, payment (€5), and Thank you steps require completion in sequence. |
| Interview count visuals | PASS — checked 3 apples, 4-versus-2 More prompt, and 3 pencils. |
| Narrow responsive layout | PASS — product grid uses compact three-column layout at the narrow preview breakpoint; no clipped product card observed. |
| Browser console | PASS — sampled formal MP3 replay produced 0 browser errors. |
| Final price / delivery alignment | PASS — price products are centered over their question and coin choices; recipient titles, characters and delivered items align as one centered group. |

### Remaining human checks

- Listen to the regenerated `Give Tom one green book and Mia two cookies.` MP3 for final voice quality approval.
- Confirm that **Mia** is heard as **MEE-uh**, not as individual letters.
- Review visual identity/style of the newly generated object PNGs and Tom-with-banana action on the intended physical devices.
