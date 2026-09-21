# Lesson 2 — Colours visual manifest

The existing Lesson 1 colour cards are intentionally unchanged. They use a different, frozen visual treatment and do not exactly match the specified Lesson 2 colour values, so Lesson 2 has its own self-contained card set.

| File | Teaching meaning | Used for | Generation method | QA status |
| --- | --- | --- | --- | --- |
| `assets/images/lesson-2/colours/colour-red.svg` | red | Learn, listen, speak, challenge | Programmatic SVG (`#E53935`) | PASS |
| `assets/images/lesson-2/colours/colour-blue.svg` | blue | Learn, listen, speak, challenge | Programmatic SVG (`#1E88E5`) | PASS |
| `assets/images/lesson-2/colours/colour-yellow.svg` | yellow | Learn, listen, speak, challenge | Programmatic SVG (`#FDD835`) | PASS |
| `assets/images/lesson-2/colours/colour-green.svg` | green | Learn, listen, speak, challenge | Programmatic SVG (`#43A047`) | PASS |
| `assets/images/lesson-2/colours/colour-orange.svg` | orange | Learn, listen, speak, challenge | Programmatic SVG (`#FB8C00`) | PASS |
| `assets/images/lesson-2/colours/colour-pink.svg` | pink | Learn, listen, speak, challenge | Programmatic SVG (`#EC407A`) | PASS |
| `assets/images/lesson-2/colours/colour-purple.svg` | purple | Learn, listen, speak, challenge | Programmatic SVG (`#8E24AA`) | PASS |
| `assets/images/lesson-2/colours/colour-black.svg` | black | Learn, listen, speak, challenge | Programmatic SVG (`#212121`) | PASS |
| `assets/images/lesson-2/colours/colour-white.svg` | white | Learn, listen, speak, challenge | Programmatic SVG (`#FFFFFF`), grey border and subtle shadow | PASS |
| `assets/images/lesson-2/colours/colour-brown.svg` | brown | Learn, listen, speak, challenge | Programmatic SVG (`#795548`) | PASS |
| `assets/images/lesson-2/balls/ball-red.png` | red / a red ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/balls/ball-blue.png` | blue / a blue ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/balls/ball-yellow.png` | yellow / a yellow ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/balls/ball-green.png` | green / a green ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/balls/ball-orange.png` | orange / an orange ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/balls/ball-pink.png` | pink / a pink ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/balls/ball-purple.png` | purple / a purple ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/balls/ball-black.png` | black / a black ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background; highlight preserves form |
| `assets/images/lesson-2/balls/ball-white.png` | white / a white ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background; grey rim preserves contrast |
| `assets/images/lesson-2/balls/ball-brown.png` | brown / a brown ball | Learn, listen, speak, challenge | Image generation; shared locked ball template | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/objects/pencil-blue.png` | a blue pencil | Learn, listen, challenge | Image generation | PASS — 1024×1024 RGBA, transparent background; blue is the dominant body colour |
| `assets/images/lesson-2/objects/star-yellow.png` | a yellow star | Learn, listen, challenge | Image generation | PASS — 1024×1024 RGBA, transparent background; no face or text |
| `assets/images/lesson-2/objects/apple-green.png` | a green apple | Learn, listen, challenge | Image generation from the frozen Lesson 1 apple reference | PASS — 1024×1024 RGBA, transparent background; green fruit body dominates |
| `assets/images/lesson-2/objects/bag-pink.png` | a pink bag | Learn, listen, challenge | Image generation | PASS — 1024×1024 RGBA, transparent background; no logo or text |
| `assets/images/lesson-2/objects/apple-red.png` | a red apple | Learn, listen, challenge | Independent copy of the frozen Lesson 1 apple asset | PASS — 1024×1024 RGBA, transparent background |
| `assets/images/lesson-2/objects/star-red.png` | a red star | Learn, listen, challenge | Image generation from the yellow-star template | PASS — 1024×1024 RGBA, transparent background; no face or text |
| `assets/images/lesson-2/objects/bag-blue.png` | a blue bag | Learn, listen, challenge | Image generation from the pink-bag template | PASS — 1024×1024 RGBA, transparent background; no logo or text |

## Visual and teaching QA

- PASS — all ten cards use one 240×200 rounded-rectangle geometry; no card contains text, a pattern, a person, emoji, or decoration. White has the requested visible border and low-contrast shadow.
- PASS — all ten balls are independent 1024×1024 RGBA PNGs with transparent corners, a common centered spherical composition, no markings, and a consistent upper-left / upper-right glossy-light treatment.
- PASS — orange and brown, red and pink, and blue and purple have been checked visually as separate teaching colours.
- PASS — the white ball retains a soft grey rim; the black ball retains bright highlights and a visible spherical form.
- PASS — every object is a single, centered, text-free PNG on transparency; each target colour dominates its intended teaching object.
- PASS — no Lesson 1 files, course data, audio, CSS, or page code were changed.
