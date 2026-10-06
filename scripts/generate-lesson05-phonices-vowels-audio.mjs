import { execFileSync, execSync } from "node:child_process";
import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Standalone production asset generator. It intentionally has no runtime-registry imports.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lessonId = "lesson-05";
const lessonDir = path.join(root, "assets", "audio", lessonId, "phonics-vowels");
const mp3Dir = path.join(lessonDir, "mp3");
const manifestPath = path.join(lessonDir, `${lessonId}-phonics-vowels-audio-manifest.csv`);
const qaReportPath = path.join(lessonDir, `${lessonId}-phonics-vowels-audio-qa-report.md`);
const projectId = "kimi-english-tts-test";
const endpoint = "https://texttospeech.googleapis.com/v1/text:synthesize";
const provider = "Google Gemini TTS";
const model = "gemini-2.5-flash-tts";
const voice = "Kore";
const locale = "en-GB";
const gcloud = "C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd";
const forceRegenerate = process.env.PHONICS_REGENERATE === "true";
const requestPacingMs = 5000;

const lessons = [
  ["a", "æ", [["cat", "k æ t"], ["hat", "h æ t"], ["bat", "b æ t"], ["mat", "m æ t"], ["map", "m æ p"], ["cap", "k æ p"], ["tap", "t æ p"], ["bag", "b æ g"], ["man", "m æ n"], ["fan", "f æ n"], ["pan", "p æ n"], ["jam", "dʒ æ m"], ["sad", "s æ d"], ["mad", "m æ d"], ["van", "v æ n"]]],
  ["i", "ɪ", [["pig", "p ɪ g"], ["big", "b ɪ g"], ["sit", "s ɪ t"], ["hit", "h ɪ t"], ["fit", "f ɪ t"], ["lip", "l ɪ p"], ["pin", "p ɪ n"], ["fin", "f ɪ n"], ["win", "w ɪ n"], ["dig", "d ɪ g"], ["kid", "k ɪ d"], ["lid", "l ɪ d"], ["zip", "z ɪ p"], ["fig", "f ɪ g"], ["wig", "w ɪ g"]]],
  ["o", "ɒ", [["hot", "h ɒ t"], ["pot", "p ɒ t"], ["top", "t ɒ p"], ["mop", "m ɒ p"], ["hop", "h ɒ p"], ["dog", "d ɒ g"], ["log", "l ɒ g"], ["fog", "f ɒ g"], ["cot", "k ɒ t"], ["dot", "d ɒ t"], ["nod", "n ɒ d"], ["rod", "r ɒ d"], ["job", "dʒ ɒ b"], ["pop", "p ɒ p"], ["lot", "l ɒ t"]]],
  ["e", "e", [["red", "r e d"], ["bed", "b e d"], ["pen", "p e n"], ["hen", "h e n"], ["ten", "t e n"], ["leg", "l e g"], ["net", "n e t"], ["pet", "p e t"], ["wet", "w e t"], ["jet", "dʒ e t"], ["men", "m e n"], ["den", "d e n"], ["get", "g e t"], ["let", "l e t"], ["web", "w e b"]]],
  ["u", "ʌ", [["sun", "s ʌ n"], ["cup", "k ʌ p"], ["bus", "b ʌ s"], ["run", "r ʌ n"], ["fun", "f ʌ n"], ["bug", "b ʌ g"], ["rug", "r ʌ g"], ["cut", "k ʌ t"], ["nut", "n ʌ t"], ["hut", "h ʌ t"], ["mud", "m ʌ d"], ["mum", "m ʌ m"], ["bun", "b ʌ n"], ["pup", "p ʌ p"], ["tub", "t ʌ b"]]],
];

function ipa(sequence) { return sequence.split(" ").map((sound) => `/${sound}/`).join(" "); }
function phonemePromptText(sequence, word) {
  // Keep IPA out of the provider text field. The prompt, not literal IPA notation,
  // tells Gemini how each grapheme must be pronounced.
  const plain = { "æ": "a", "e": "e", "ɪ": "i", "ɒ": "o", "ʌ": "u", "dʒ": "j" };
  return `${sequence.split(" ").map((sound) => plain[sound] || sound).join(" ")} ${word}`;
}
function csv(value) { const text = String(value ?? ""); return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; }
function mp3IsReadable(buffer) { return buffer.length > 4 && (buffer.subarray(0, 3).toString("ascii") === "ID3" || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)); }
async function exists(file) { try { await access(file); return true; } catch { return false; } }
function accessToken() { return execSync(`"${gcloud}" auth application-default print-access-token`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], windowsHide: true }).trim(); }
function assertTechnicalMp3(file) {
  const probe = execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_name,sample_rate,channels", "-of", "csv=p=0", file], { encoding: "utf8", windowsHide: true }).trim();
  if (!/mp3,24000,1/.test(probe)) throw new Error(`Unexpected MP3 encoding for ${file}: ${probe}`);
}

const commonPrompt = "This is atomic British English phonics audio for a five-to-six-year-old child. Use a clear, calm, natural teacher voice. Do not add any introduction, explanation, praise, letter names, words, or sounds beyond the exact requested audio.";
function vowelPrompt(vowel, sound, example) {
  return `${commonPrompt} Produce only the short vowel sound /${sound}/, as heard in British English '${example}'. Do not say the letter name '${vowel.toUpperCase()}'. Do not say the example word. Do not pronounce slash notation.`;
}
function wholeWordPrompt(word) {
  return `${commonPrompt} Say the complete word '${word}' naturally exactly once, slightly slowly but not mechanically.`;
}
function blendPrompt(word, sequence) {
  const [first, vowel, last] = sequence.split(" ");
  return `${commonPrompt} Produce this exact four-part phonics sequence: first the pure consonant sound /${first}/ with no added schwa or vowel; pause about 350 milliseconds; then the short vowel sound /${vowel}/; pause about 350 milliseconds; then the pure consonant sound /${last}/ with no added schwa or vowel; pause about 600 milliseconds; then say the complete word '${word}' naturally once. Do not speak IPA notation, letter names, or any instructional text.`;
}

async function synthesize(text, prompt, token) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "x-goog-user-project": projectId }, body: JSON.stringify({ input: { text, prompt }, voice: { languageCode: locale, name: voice, modelName: model }, audioConfig: { audioEncoding: "MP3", sampleRateHertz: 24000 } }) });
    if (response.ok) { const payload = await response.json(); const audio = Buffer.from(payload.audioContent || "", "base64"); if (!mp3IsReadable(audio)) throw new Error(`TTS returned an invalid MP3 for ${text}`); return audio; }
    const detail = await response.text();
    if (response.status !== 429 || attempt === 4) throw new Error(`TTS ${response.status}: ${detail}`);
    console.warn(`TTS rate-limited; retrying ${JSON.stringify(text)} in 65 seconds (attempt ${attempt + 1}/5).`);
    await new Promise((resolve) => setTimeout(resolve, 65000));
  }
  throw new Error(`TTS retry loop ended unexpectedly for ${text}`);
}

async function ensureAudio(row, prompt, tokenRef) {
  const absolute = path.join(mp3Dir, row.Mp3File);
  await mkdir(path.dirname(absolute), { recursive: true });
  if (!forceRegenerate && await exists(absolute)) { const data = await readFile(absolute); if (!mp3IsReadable(data)) throw new Error(`Existing file is not a readable MP3: ${absolute}`); assertTechnicalMp3(absolute); return false; }
  tokenRef.value ||= accessToken();
  const audio = await synthesize(row.TtsText, prompt, tokenRef.value);
  await writeFile(absolute, audio);
  assertTechnicalMp3(absolute);
  process.stdout.write(`Generated ${row.Mp3File}\n`);
  // Gemini TTS has a conservative per-minute quota in this production project.
  // Pacing avoids 429 retry cycles while keeping the existing provider workflow intact.
  await new Promise((resolve) => setTimeout(resolve, requestPacingMs));
  return true;
}

function buildRows() {
  const rows = [];
  for (const [vowel, sound, words] of lessons) {
    const example = { a: "cat", e: "red", i: "pig", o: "hot", u: "sun" }[vowel];
    rows.push({ ID: `phonics-short-${vowel}`, Category: "vowel", Vowel: vowel, Word: "", PhonemeSequence: `/${sound}/`, AudioType: "vowel-sound", TeachingText: `/${sound}/`, Mp3File: `vowels/short-${vowel}.mp3`, Provider: provider, Model: model, Voice: voice, Locale: locale, GenerationStatus: "generated", HumanApprovalStatus: "pending", Notes: `Short vowel sound only; British English ${example} reference used in generation instruction.`, TtsText: vowel, prompt: vowelPrompt(vowel, sound, example) });
    for (const [word, sequence] of words) {
      const phonemes = ipa(sequence);
      rows.push({ ID: `phonics-${vowel}-${word}-word`, Category: "word", Vowel: vowel, Word: word, PhonemeSequence: phonemes, AudioType: "whole-word", TeachingText: word, Mp3File: `words/word-${word}.mp3`, Provider: provider, Model: model, Voice: voice, Locale: locale, GenerationStatus: "generated", HumanApprovalStatus: "pending", Notes: "Atomic whole-word pronunciation only.", TtsText: word, prompt: wholeWordPrompt(word) });
      rows.push({ ID: `phonics-${vowel}-${word}-blend`, Category: "blend", Vowel: vowel, Word: word, PhonemeSequence: phonemes, AudioType: "phoneme-blend", TeachingText: `${phonemes} → ${word}`, Mp3File: `blends/blend-${word}.mp3`, Provider: provider, Model: model, Voice: voice, Locale: locale, GenerationStatus: "generated", HumanApprovalStatus: "pending", Notes: "Pure phonemes with prompted pauses, followed by the natural whole word.", TtsText: phonemePromptText(sequence, word), prompt: blendPrompt(word, sequence) });
    }
  }
  return rows;
}

async function qa(rows) {
  const requiredHeaders = ["ID", "Category", "Vowel", "Word", "PhonemeSequence", "AudioType", "TeachingText", "Mp3File", "Provider", "Model", "Voice", "Locale", "GenerationStatus", "HumanApprovalStatus", "Notes"];
  const ids = new Set(); const paths = new Set(); const issues = []; let empty = 0; let broken = 0;
  for (const row of rows) {
    if (ids.has(row.ID)) issues.push(`Duplicate ID: ${row.ID}`); ids.add(row.ID);
    if (paths.has(row.Mp3File)) issues.push(`Duplicate output path: ${row.Mp3File}`); paths.add(row.Mp3File);
    const absolute = path.join(mp3Dir, row.Mp3File);
    try { if ((await stat(absolute)).size <= 0) { empty += 1; issues.push(`Empty MP3: ${row.Mp3File}`); } else { assertTechnicalMp3(absolute); } } catch (error) { broken += 1; issues.push(`Broken or missing MP3: ${row.Mp3File} (${error.message})`); }
    for (const header of requiredHeaders) if (!(header in row)) issues.push(`Manifest row missing ${header}: ${row.ID}`);
    if (row.HumanApprovalStatus !== "pending") issues.push(`Human approval must remain pending: ${row.ID}`);
  }
  const count = (category) => rows.filter((row) => row.Category === category).length;
  const expectedWords = 75;
  if (count("vowel") !== 5) issues.push(`Expected 5 vowel rows; got ${count("vowel")}`);
  if (count("word") !== expectedWords) issues.push(`Expected 75 word rows; got ${count("word")}`);
  if (count("blend") !== expectedWords) issues.push(`Expected 75 blend rows; got ${count("blend")}`);
  if (rows.length !== 155) issues.push(`Expected 155 rows; got ${rows.length}`);
  const report = ["# Lesson 05 Phonics Vowels Audio QA", "", `- Lesson: ${lessonId}`, `- Provider/model/voice/locale: ${provider} / ${model} / ${voice} / ${locale}`, `- Vowel sound MP3: ${count("vowel")}`, `- Whole-word MP3: ${count("word")}`, `- Blend MP3: ${count("blend")}`, `- Total MP3: ${rows.length}`, `- Missing: ${issues.filter((issue) => issue.startsWith("Broken or missing")).length}`, `- Broken MP3: ${broken}`, `- Empty MP3: ${empty}`, `- Duplicate ID: ${[...ids].length === rows.length ? 0 : rows.length - ids.size}`, `- Duplicate output path: ${[...paths].length === rows.length ? 0 : rows.length - paths.size}`, `- Manifest coverage errors: ${issues.length}`, "- Human review: pending for all rows", "", "## Automated checks", "", "Technical checks validate file existence, non-zero size, MP3 parsing/encoding, exact counts, unique IDs/output paths, manifest coverage, and pending human approval. They cannot verify phoneme accuracy, lack of consonant schwa, pause quality, or naturalness; those require human listening.", "", "## Result", "", issues.length ? issues.map((issue) => `- FAIL: ${issue}`).join("\n") : "- PASS: all automated production checks passed.", ""];
  await writeFile(qaReportPath, report.join("\n"), "utf8");
  if (issues.length) throw new Error(`QA failed with ${issues.length} issue(s). See ${qaReportPath}`);
}

async function main() {
  const rows = buildRows();
  const headers = ["ID", "Category", "Vowel", "Word", "PhonemeSequence", "AudioType", "TeachingText", "Mp3File", "Provider", "Model", "Voice", "Locale", "GenerationStatus", "HumanApprovalStatus", "Notes"];
  const tokenRef = { value: null }; let newlyGenerated = 0;
  for (const row of rows) if (await ensureAudio(row, row.prompt, tokenRef)) newlyGenerated += 1;
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, [headers, ...rows.map((row) => headers.map((header) => row[header]))].map((line) => line.map(csv).join(",")).join("\r\n") + "\r\n", "utf8");
  await qa(rows);
  console.log(JSON.stringify({ lessonId, vowelSounds: 5, wholeWords: 75, blends: 75, totalMp3: 155, newlyGenerated, manifestPath, qaReportPath }, null, 2));
}

main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
