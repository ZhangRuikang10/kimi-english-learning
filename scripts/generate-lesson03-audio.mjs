import { execFileSync, execSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, stat, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { numbersLesson } from "../data/lessons/numbers.js";
import { normalizeAudioText, resolveTeachingAudio } from "../data/audio/audioRegistry.js";
import { lesson03Entries } from "../data/audio/lesson03Entries.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const project = "kimi-english-tts-test";
const outputDir = path.join(root, "assets", "audio", "lesson-03", "mp3");
const manifestPath = path.join(root, "assets", "audio", "lesson-03", "lesson-03-audio-manifest.csv");
const entriesPath = path.join(root, "data", "audio", "lesson03Entries.js");
const provider = "Google Cloud Text-to-Speech / Gemini TTS";
const model = "gemini-2.5-flash-tts";
const voice = "Kore";
const locale = "en-GB";
const stylePrompt = "Speak only the exact text. Use a warm, clear, friendly British English voice for a five- to six-year-old child. Speak slightly slower than ordinary adult conversation, with clean word boundaries and natural short pauses. Do not add words, sounds, music, or dramatic acting.";
const pronunciationGuidance = new Map([
  [normalizeAudioText("Give Tom one green book and Mia two cookies."), "Pronounce Mia as the given name MEE-uh (/ˈmiːə/), never as individual letters."]
]);
const forcedRegenerations = new Set(process.argv.filter((value) => value.startsWith("--regenerate=")).map((value) => normalizeAudioText(value.slice("--regenerate=".length))));

function runtimeUtterances() {
  const found = new Map();
  const add = (text, usage) => { if (!text) return; const key = normalizeAudioText(text); const current = found.get(key) || { text, usages: [] }; current.usages.push(usage); found.set(key, current); };
  const visit = (activity, parent = "") => {
    const usage = parent ? `${parent}/${activity.id}` : activity.id;
    if (activity.ttsText && activity.audioEnabled !== false && activity.audioDisposition !== "INTENTIONALLY_SILENT") add(activity.ttsText, usage);
    if (activity.type === "review") activity.items?.forEach((item, index) => add(item.ttsText || item.text, `${usage}/review-${index + 1}`));
    if (activity.type === "challenge") activity.items?.forEach((item) => visit(item, usage));
  };
  numbersLesson.activities.forEach(visit); return [...found.values()];
}
function fileStem(text) { return normalizeAudioText(text).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90); }
function getAdcToken() {
  if (process.platform === "win32") {
    const command = '"C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd" auth application-default print-access-token';
    return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  }
  return execFileSync("gcloud", ["auth", "application-default", "print-access-token"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}
async function synthesize(text) {
  const token = getAdcToken();
  const response = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "x-goog-user-project": project, "Content-Type": "application/json" },
    body: JSON.stringify({ input: { text, prompt: [stylePrompt, pronunciationGuidance.get(normalizeAudioText(text))].filter(Boolean).join(" ") }, voice: { languageCode: locale, name: voice, modelName: model }, audioConfig: { audioEncoding: "MP3", sampleRateHertz: 24000 } })
  });
  if (!response.ok) throw new Error(`Gemini TTS request failed with HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json(); const audio = Buffer.from(data.audioContent || "", "base64");
  if (audio.length < 1024 || !(audio.subarray(0, 3).toString() === "ID3" || audio[0] === 0xff)) throw new Error("Gemini TTS returned invalid or empty MP3 data.");
  return audio;
}
function probe(file) { return execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_name,sample_rate,channels", "-of", "csv=p=0", file], { stdio: "pipe" }).toString().trim(); }
async function preflight() {
  const directory = await mkdtemp(path.join(os.tmpdir(), "lesson03-tts-")); const file = path.join(directory, "three-red-apples.mp3");
  try { await writeFile(file, await synthesize("Three red apples.")); const details = probe(file); if (!/mp3,24000,1/.test(details)) throw new Error(`Unexpected preflight MP3 format: ${details}`); console.log("TTS_PREFLIGHT=PASS"); }
  finally { await rm(directory, { recursive: true, force: true }); }
}
const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
async function generate() {
  await preflight(); await mkdir(outputDir, { recursive: true });
  const utterances = runtimeUtterances(); const existingLesson03 = new Map(lesson03Entries.map(([text, file]) => [normalizeAudioText(text), file])); const lesson03 = []; const newlyGenerated = []; const reused = [];
  for (const item of utterances) {
    const normalized = normalizeAudioText(item.text); const existingFile = existingLesson03.get(normalized);
    if (existingFile) {
      const destination = path.join(outputDir, existingFile); let valid = !forcedRegenerations.has(normalized); try { valid = valid && /mp3,24000,1/.test(probe(destination)); } catch { valid = false; }
      if (!valid) { await writeFile(destination, await synthesize(item.text)); if (!/mp3,24000,1/.test(probe(destination))) throw new Error(`Invalid MP3 regenerated for ${item.text}`); newlyGenerated.push(item.text); }
      lesson03.push([item.text, existingFile, item.usages.join(" | ")]); continue;
    }
    const historical = resolveTeachingAudio(item.text);
    if (historical) { reused.push([item.text, historical, item.usages.join(" | ")]); continue; }
    const file = `${fileStem(item.text)}.mp3`; const destination = path.join(outputDir, file);
    await writeFile(destination, await synthesize(item.text));
    if (!/mp3,24000,1/.test(probe(destination))) throw new Error(`Invalid MP3 generated for ${item.text}`);
    lesson03.push([item.text, file, item.usages.join(" | ")]); newlyGenerated.push(item.text); console.log(`Generated: ${file}`);
  }
  const entries = `// Generated by scripts/generate-lesson03-audio.mjs. Do not hand-edit filenames.\nexport const lesson03Entries = [\n${lesson03.map(([text, file]) => `  [${JSON.stringify(text)}, ${JSON.stringify(file)}],`).join("\n")}\n];\n`;
  await writeFile(entriesPath, entries);
  const activeFiles = new Set(lesson03.map(([, file]) => file));
  for (const entry of await readdir(outputDir)) if (entry.endsWith(".mp3") && !activeFiles.has(entry)) await unlink(path.join(outputDir, entry));
  const rows = [["ID","TeachingText","Mp3File","Source","ReusedFrom","Provider","Model","Voice","Locale","ApprovalStatus","RuntimeUsage"]];
  for (const [text, file, usage] of lesson03) rows.push([fileStem(text), text, file, "GENERATED_LESSON_03", "", provider, model, voice, locale, "RC_PENDING_HUMAN_REVIEW", usage]);
  for (const [text, source, usage] of reused) rows.push([fileStem(text), text, path.basename(source), "REUSED_APPROVED", source, provider, model, voice, locale, "REUSED_APPROVED", usage]);
  await writeFile(manifestPath, rows.map((row) => row.map(quote).join(",")).join("\n") + "\n");
  console.log(JSON.stringify({ runtimePlaybackPoints: utterances.reduce((sum, item) => sum + item.usages.length, 0), uniqueRuntimeUtterances: utterances.length, reusedApproved: reused.length, lesson03Mp3: lesson03.length, newlyGeneratedThisRun: newlyGenerated.length }, null, 2));
}
if (process.argv.includes("--preflight")) await preflight(); else await generate();
