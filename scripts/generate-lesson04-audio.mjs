import { execFileSync, execSync } from "node:child_process";
import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveTeachingAudio } from "../data/audio/audioRegistry.js";
import { lesson04Entries } from "../data/audio/lesson04Entries.js";
import { collectLesson04RuntimeAudio } from "./lesson04-audio-runtime.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "assets", "audio", "lesson-04", "mp3");
const manifestPath = path.join(root, "assets", "audio", "lesson-04", "lesson-04-audio-manifest.csv");
const entriesPath = path.join(root, "data", "audio", "lesson04Entries.js");
const projectId = "kimi-english-tts-test";
const endpoint = "https://texttospeech.googleapis.com/v1/text:synthesize";
const model = "gemini-2.5-flash-tts";
const voice = "Kore";
const locale = "en-GB";
const gcloud = "C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd";

const basePrompt = [
  "Speak in warm, calm, natural British English for a five-to-six-year-old child.",
  "Use clear word boundaries and a slightly slower teacher-like pace.",
  "Be friendly and encouraging, never theatrical, robotic, babyish, or shouted.",
].join(" ");

const targetedGuidance = new Map([
  ["My head hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My eye hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My neck hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My throat hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My arm hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My leg hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My knee hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My tummy hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My tooth hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["My ear hurts.", "Use a gentle classroom demonstration tone, with a clear natural boundary before 'hurts'; do not sound seriously distressed."],
  ["I have a headache.", "Pronounce 'headache' clearly and naturally in British English."],
  ["I have a stomachache.", "Pronounce 'stomachache' clearly, at an unhurried pace, in British English."],
  ["I have a toothache.", "Pronounce 'toothache' clearly and naturally in British English."],
  ["I have an earache.", "Pronounce 'earache' clearly and naturally in British English."],
  ["I have a sore throat.", "Pronounce 'sore throat' clearly with a natural boundary between the words."],
  ["Are you okay?", "Use a friendly, calm doctor-like question intonation."],
  ["What's wrong?", "Use a friendly, calm doctor-like question intonation."],
  ["Does your head hurt? Yes.", "Use clear friendly question intonation, then a short calm answer."],
  ["Does your tummy hurt? Yes.", "Use clear friendly question intonation, then a short calm answer."],
  ["Does your ear hurt? Yes.", "Use clear friendly question intonation, then a short calm answer."],
  ["Do you have a headache?", "Use a friendly, calm doctor-like question intonation. Pronounce 'headache' clearly."],
  ["Touch your head and clap your hands.", "Use clear instructional pacing with a brief natural pause between the two actions."],
  ["Touch your nose and raise your arms.", "Use clear instructional pacing with a brief natural pause between the two actions."],
  ["Touch your knees and stand up.", "Use clear instructional pacing with a brief natural pause between the two actions."],
  ["Show me your hands and close your eyes.", "Use clear instructional pacing with a brief natural pause between the two actions."],
  ["Touch your head, touch your shoulders, and clap your hands.", "Use clear instructional pacing with brief natural pauses between all three actions."],
  ["Touch your nose, touch your knees, and sit down.", "Use clear instructional pacing with brief natural pauses between all three actions."],
]);

const phonicsGuidance = "Phonics requirement: whenever the notation /h/ appears, pronounce the isolated unvoiced /h/ phoneme as a short breathy h sound, never as the letter name 'aitch', 'slash h slash', or any words describing the notation.";

function guidanceFor(text) {
  const normal = targetedGuidance.get(text);
  return [normal, text.includes("/h/") ? phonicsGuidance : ""].filter(Boolean).join(" ");
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function fileStem(text) {
  const stem = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\//g, " ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return stem || "lesson-04-audio";
}

function mp3IsReadable(buffer) {
  return buffer.length > 4 && (
    buffer.subarray(0, 3).toString("ascii") === "ID3" ||
    (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)
  );
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function accessToken() {
  if (process.platform === "win32") {
    return execSync(`"${gcloud}" auth application-default print-access-token`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    }).trim();
  }
  return execFileSync(gcloud, ["auth", "application-default", "print-access-token"], {
    encoding: "utf8",
    windowsHide: true,
  }).trim();
}

async function synthesize(text, token) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-goog-user-project": projectId,
      },
      body: JSON.stringify({
        input: { text, prompt: [basePrompt, guidanceFor(text)].filter(Boolean).join(" ") },
        voice: { languageCode: locale, name: voice, modelName: model },
        audioConfig: { audioEncoding: "MP3", sampleRateHertz: 24000 },
      }),
    });
    if (response.ok) {
      const payload = await response.json();
      const audio = Buffer.from(payload.audioContent || "", "base64");
      if (!mp3IsReadable(audio)) throw new Error(`TTS returned an invalid MP3 for: ${text}`);
      return audio;
    }
    const detail = await response.text();
    if (response.status !== 429 || attempt === 4) throw new Error(`TTS ${response.status}: ${detail}`);
    const waitMs = 65000;
    console.warn(`TTS rate-limited; retrying ${JSON.stringify(text)} in ${waitMs / 1000}s (attempt ${attempt + 1}/5).`);
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  throw new Error(`TTS retry loop ended unexpectedly for: ${text}`);
}

function assertTechnicalMp3(file) {
  const probe = execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "stream=codec_name,sample_rate,channels",
    "-of", "csv=p=0", file,
  ], { encoding: "utf8", windowsHide: true }).trim();
  if (!/mp3,24000,1/.test(probe)) throw new Error(`Unexpected MP3 encoding for ${file}: ${probe}`);
}

async function writeEntries(entries) {
  const lines = [
    "// Generated by scripts/generate-lesson04-audio.mjs. Do not hand-edit filenames.",
    "export const lesson04Entries = [",
    ...entries.map(([text, file]) => `  [${JSON.stringify(text)}, ${JSON.stringify(file)}],`),
    "];",
    "",
  ];
  await writeFile(entriesPath, lines.join("\n"), "utf8");
}

async function main() {
  const runtime = collectLesson04RuntimeAudio();
  const existingLocal = new Map(lesson04Entries);
  const rows = [];
  const localEntries = [];
  const usedFiles = new Set();
  let token = null;
  let newlyGenerated = 0;

  await mkdir(outputDir, { recursive: true });

  for (const utterance of runtime.uniqueUtterances) {
    const historical = resolveTeachingAudio(utterance.text);
    const previousFile = existingLocal.get(utterance.text);
    if (historical && !previousFile) {
      rows.push({
        id: `l4-audio-${rows.length + 1}`,
        text: utterance.text,
        file: historical,
        source: "REUSED_APPROVED",
        approval: "REUSED_APPROVED",
        notes: `Exact approved match; ${utterance.usages.length} runtime use(s).`,
      });
      continue;
    }

    let file = previousFile || `${fileStem(utterance.text)}.mp3`;
    if (usedFiles.has(file) && !previousFile) {
      throw new Error(`Filename collision for ${utterance.text}: ${file}`);
    }
    usedFiles.add(file);
    const absolute = path.join(outputDir, file);
    if (await exists(absolute)) {
      const data = await readFile(absolute);
      if (!mp3IsReadable(data)) throw new Error(`Existing file is not a valid MP3: ${absolute}`);
      assertTechnicalMp3(absolute);
    } else {
      token ||= accessToken();
      const data = await synthesize(utterance.text, token);
      await writeFile(absolute, data);
      assertTechnicalMp3(absolute);
      newlyGenerated += 1;
      process.stdout.write(`Generated ${file}\n`);
    }
    localEntries.push([utterance.text, file]);
    rows.push({
      id: `l4-audio-${rows.length + 1}`,
      text: utterance.text,
      file: `assets/audio/lesson-04/mp3/${file}`,
      source: "GENERATED",
      approval: "RC_PENDING_HUMAN_REVIEW",
      notes: `${utterance.usages.length} runtime use(s).${guidanceFor(utterance.text) ? " Targeted TTS guidance applied." : ""}`,
    });
  }

  await writeEntries(localEntries);
  const header = ["ID", "TeachingText", "Mp3File", "Source", "Provider", "Model", "Voice", "Locale", "ApprovalStatus", "Notes"];
  const csvText = [header, ...rows.map((row) => [
    row.id, row.text, row.file, row.source, "Google Cloud / Gemini TTS", model, voice, locale, row.approval, row.notes,
  ])].map((line) => line.map(csv).join(",")).join("\r\n") + "\r\n";
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, csvText, "utf8");

  const generatedPhysical = await Promise.all(localEntries.map(async ([, file]) => stat(path.join(outputDir, file))));
  console.log(JSON.stringify({
    runtimePlaybackPoints: runtime.runtimePlaybackPoints,
    uniqueUtterances: runtime.uniqueUtterances.length,
    intentionalSilentActivities: runtime.intentionalSilence.length,
    intentionalSilentPlaybackPoints: runtime.intentionalSilentPlaybackPoints,
    reusedApproved: rows.filter((row) => row.source === "REUSED_APPROVED").length,
    localPhysicalMp3: generatedPhysical.length,
    newlyGenerated,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
