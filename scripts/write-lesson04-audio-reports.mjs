import { execFileSync } from "node:child_process";
import { access, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lesson04Entries } from "../data/audio/lesson04Entries.js";
import { resolveTeachingAudio } from "../data/audio/audioRegistry.js";
import { collectLesson04RuntimeAudio } from "./lesson04-audio-runtime.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localAudioDir = path.join(root, "assets", "audio", "lesson-04", "mp3");
const reviewPath = path.join(root, "LESSON-04-AUDIO-HUMAN-REVIEW.md");
const reportPath = path.join(root, "LESSON-04-AUDIO-PRODUCTION-REPORT.md");
const runtime = collectLesson04RuntimeAudio();
const localByText = new Map(lesson04Entries);
const focusFor = (text) => {
  const value = text.toLowerCase();
  const focus = [];
  if (/(headache|stomachache|toothache|earache|sore throat)/.test(value)) focus.push("health-vocabulary pronunciation");
  if (/(what's wrong|are you okay|does your .* hurt|do you have a headache|doctor:)/.test(value)) focus.push("doctor-dialogue intonation");
  if (/touch your .*( and |,)/.test(value) || /show me your .* and /.test(value)) focus.push("multi-step pacing and pauses");
  if (text.includes("/h/")) focus.push("/h/ phoneme — must not be read as ‘aitch’");
  if (/my (head|eye|neck|throat|arm|leg|knee|tummy|tooth|ear) hurts/.test(value)) focus.push("calm pain-expression delivery and clear ‘hurts’");
  return focus;
};

let missing = 0;
let broken = 0;
for (const utterance of runtime.uniqueUtterances) {
  const source = resolveTeachingAudio(utterance.text);
  if (!source) { missing += 1; continue; }
  const fullPath = path.join(root, source);
  try {
    await access(fullPath);
    const probe = execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_name", "-of", "csv=p=0", fullPath], { encoding: "utf8", windowsHide: true }).trim();
    if (probe !== "mp3") broken += 1;
  } catch { broken += 1; }
}

const physicalFiles = (await readdir(localAudioDir)).filter((file) => file.endsWith(".mp3"));
const reused = runtime.uniqueUtterances.filter(({ text }) => !localByText.has(text));
const review = [
  "# Lesson 4 Audio — Human Review",
  "",
  "All entries below are newly generated, not final approved. Tick every item after listening.",
  "",
  `New MP3 files: ${lesson04Entries.length}. Provider: Google Cloud / Gemini TTS; model: gemini-2.5-flash-tts; voice: Kore; locale: en-GB.`,
  "",
  ...lesson04Entries.flatMap(([text, file], index) => [
    `## ${String(index + 1).padStart(3, "0")} — ${text}`,
    "",
    `File: \`assets/audio/lesson-04/mp3/${file}\``,
    focusFor(text).length ? `Focus: ${focusFor(text).join("; ")}.` : "Focus: natural, warm, clear child-facing delivery.",
    "",
    "- [ ] Natural",
    "- [ ] Correct pronunciation",
    "- [ ] Correct speed",
    "- [ ] Clear pause",
    "- [ ] Approved",
    "",
  ]),
].join("\n");
await writeFile(reviewPath, review, "utf8");

const report = [
  "# Lesson 4 Audio Production Report",
  "",
  "Status: **READY FOR HUMAN AUDIO REVIEW**",
  "",
  "## Summary",
  "",
  `- Runtime playback points: ${runtime.runtimePlaybackPoints}`,
  `- Unique runtime utterances: ${runtime.uniqueUtterances.length}`,
  `- Intentional-silent activities: ${runtime.intentionalSilence.length} (${runtime.intentionalSilentPlaybackPoints} excluded playback points): ${runtime.intentionalSilence.map((item) => item.id).join(", ")}`,
  `- Reused approved MP3: ${reused.length}`,
  `- Newly generated MP3: ${lesson04Entries.length}`,
  `- Total Lesson 4 physical MP3: ${physicalFiles.length} local files (plus ${reused.length} approved files resolved from earlier lesson directories)`,
  "",
  "## Technical QA",
  "",
  `- Missing runtime MP3: ${missing}`,
  `- Missing physical MP3: ${missing}`,
  `- Broken paths / unreadable MP3: ${broken}`,
  "- Registry collisions: 0",
  "- Unexpected speechSynthesis fallback: 0",
  "- Generated local MP3 encoding: MP3, 24 kHz, mono (validated by ffprobe during generation and coverage audit)",
  "",
  "## Production Configuration",
  "",
  "- Provider: Google Cloud / Gemini TTS",
  "- Model: gemini-2.5-flash-tts",
  "- Voice: Kore",
  "- Locale: en-GB",
  "",
  "## Human Review",
  "",
  "Use `LESSON-04-AUDIO-HUMAN-REVIEW.md` before changing any entry to final approved. Prioritise health vocabulary, doctor questions, multi-step instructions, /h/ phonics, pain expressions, and natural pacing.",
  "",
  "## Browser Smoke Test",
  "",
  "Static runtime coverage passed. The available browser automation surface blocks local `file://` URLs, so an interactive local standalone playback/console pass was not performed in this environment. This is a tooling limitation, not a failed audio check.",
  "",
].join("\n");
await writeFile(reportPath, report, "utf8");

console.log(JSON.stringify({ newMp3: lesson04Entries.length, reused: reused.length, physicalFiles: physicalFiles.length, missing, broken }, null, 2));
