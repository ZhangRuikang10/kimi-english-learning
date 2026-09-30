# Lesson 4 Audio Production Report

Status: **READY FOR HUMAN AUDIO REVIEW**

## Summary

- Runtime playback points: 167
- Unique runtime utterances: 137
- Intentional-silent activities: 4 (18 excluded playback points): 18-build-the-body, 40-read-body-word, 42-read-the-sentence, 43-mini-reading
- Reused approved MP3: 3
- Newly generated MP3: 135
- Total Lesson 4 physical MP3: 135 local files (plus 3 approved files resolved from earlier lesson directories)

## Technical QA

- Missing runtime MP3: 0
- Missing physical MP3: 0
- Broken paths / unreadable MP3: 0
- Registry collisions: 0
- Unexpected speechSynthesis fallback: 0
- Generated local MP3 encoding: MP3, 24 kHz, mono (validated by ffprobe during generation and coverage audit)

## Production Configuration

- Provider: Google Cloud / Gemini TTS
- Model: gemini-2.5-flash-tts
- Voice: Kore
- Locale: en-GB

## Human Review

Use `LESSON-04-AUDIO-HUMAN-REVIEW.md` before changing any entry to final approved. Prioritise health vocabulary, doctor questions, multi-step instructions, /h/ phonics, pain expressions, and natural pacing.

## Browser Smoke Test

Static runtime coverage passed. The available browser automation surface blocks local `file://` URLs, so an interactive local standalone playback/console pass was not performed in this environment. This is a tooling limitation, not a failed audio check.
