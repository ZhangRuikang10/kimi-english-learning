import { execFileSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bodyLesson } from "../data/lessons/body.js";
import { visuals } from "../data/visuals.js";
import { lesson01Entries, lesson02Entries, normalizeAudioText, resolveTeachingAudio } from "../data/audio/audioRegistry.js";
import { lesson03Entries } from "../data/audio/lesson03Entries.js";
import { lesson04Entries } from "../data/audio/lesson04Entries.js";
import { collectLesson04RuntimeAudio } from "./lesson04-audio-runtime.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowedTypes = new Set(["actionPrompt", "bodyBuilder", "bodyMap", "challenge", "learn", "listenChoose", "miniReading", "review", "speakPrompt", "tapChoice", "wordBuilder", "wordChoice"]);
const errors = [];
const allIds = new Set();
const visualRefs = new Set();
const addVisual = (id, where) => { if (!id) return; visualRefs.add(id); const visual = visuals[id]; if (!visual) { errors.push(`${where}: missing registry visual ${id}`); return; } for (const field of ["id", "type", "src", "alt", "concept"]) if (!visual[field]) errors.push(`${where}: visual ${id} missing ${field}`); if (visual.approved !== true) errors.push(`${where}: visual ${id} is not approved`); };
const walk = (activity, where, nested = false) => {
  if (!activity?.id || !activity.type) errors.push(`${where}: missing id/type`);
  if (activity.id && allIds.has(activity.id)) errors.push(`${where}: duplicate id ${activity.id}`);
  if (activity.id) allIds.add(activity.id);
  if (!allowedTypes.has(activity.type)) errors.push(`${where}: unknown activity type ${activity.type}`);
  addVisual(activity.visualId, where);
  (activity.options || []).forEach((item) => addVisual(item.visualId, `${where}/options`));
  (activity.items || []).forEach((item) => { if (activity.type === "challenge") walk(item, `${where}/${item.id || "item"}`, true); else addVisual(item.visualId, `${where}/items`); });
  (activity.zones || []).forEach((zone) => addVisual(zone.visualId, `${where}/zones`));
  (activity.parts || []).forEach((part) => addVisual(part.visualId, `${where}/parts`));
  (activity.rounds || []).forEach((round) => addVisual(round.visualId, `${where}/rounds`));
  (activity.draggable || {}).visualId && addVisual(activity.draggable.visualId, `${where}/draggable`);
  (activity.target || {}).visualId && addVisual(activity.target.visualId, `${where}/target`);
};

if (bodyLesson.activities.length !== 45) errors.push(`Expected 45 top-level activities, got ${bodyLesson.activities.length}`);
bodyLesson.activities.forEach((activity, index) => {
  const expected = `${String(index + 1).padStart(2, "0")}-`;
  if (!activity.id.startsWith(expected)) errors.push(`Top-level order mismatch at ${index + 1}: ${activity.id}`);
  walk(activity, `body/${activity.id}`);
});

for (const visualId of visualRefs) {
  const src = visuals[visualId]?.src;
  if (src) { try { await access(path.join(root, src)); } catch { errors.push(`Broken visual path for ${visualId}: ${src}`); } }
}

const lesson04Visuals = Object.values(visuals).filter((visual) => visual.id.startsWith("l4-"));
if (lesson04Visuals.length !== 35) errors.push(`Expected 35 l4- registered visuals, got ${lesson04Visuals.length}`);
const audioRuntime = collectLesson04RuntimeAudio();
let missingRuntimeMp3 = 0;
let brokenAudioPaths = 0;
for (const utterance of audioRuntime.uniqueUtterances) {
  const src = resolveTeachingAudio(utterance.text);
  if (!src) {
    missingRuntimeMp3 += 1;
    errors.push(`Missing runtime MP3 registry entry: ${utterance.text}`);
    continue;
  }
  const audioPath = path.join(root, src);
  try {
    const probe = execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_name", "-of", "csv=p=0", audioPath], { encoding: "utf8", windowsHide: true }).trim();
    if (probe !== "mp3") throw new Error(`codec ${probe || "unknown"}`);
  } catch (error) {
    brokenAudioPaths += 1;
    errors.push(`Broken runtime MP3: ${src} (${error.message})`);
  }
}

const registryEntries = [
  ...lesson01Entries.map(([text, file]) => [text, `assets/audio/lesson-01/mp3/${file}`]),
  ...lesson02Entries.map(([text, file]) => [text, `assets/audio/lesson-02/mp3/${file}`]),
  ...lesson03Entries.map(([text, file]) => [text, `assets/audio/lesson-03/mp3/${file}`]),
  ...lesson04Entries.map(([text, file]) => [text, `assets/audio/lesson-04/mp3/${file}`]),
];
const registryKeys = new Map();
let registryCollisions = 0;
for (const [text, src] of registryEntries) {
  const key = normalizeAudioText(text);
  const previous = registryKeys.get(key);
  if (previous && previous !== src) {
    registryCollisions += 1;
    errors.push(`Registry collision for "${text}": ${previous} vs ${src}`);
  }
  registryKeys.set(key, src);
}

const audioRuntimeSource = await readFile(path.join(root, "js", "audio.js"), "utf8");
const speechSynthesisFallbacks = /speechSynthesis|SpeechSynthesisUtterance/.test(audioRuntimeSource) ? 1 : 0;
if (speechSynthesisFallbacks) errors.push("Unexpected browser speechSynthesis fallback found in js/audio.js");

console.log(`Lesson 4 audit: ${bodyLesson.activities.length} top-level activities, ${allIds.size} unique activity ids, ${visualRefs.size} referenced visuals, ${lesson04Visuals.length} l4 visuals.`);
console.log(`Lesson 4 audio coverage: ${audioRuntime.runtimePlaybackPoints} runtime playback points, ${audioRuntime.uniqueUtterances.length} unique utterances, ${audioRuntime.intentionalSilence.length} intentional-silent activities (${audioRuntime.intentionalSilentPlaybackPoints} excluded playback points), ${missingRuntimeMp3} missing runtime MP3, ${brokenAudioPaths} broken paths, ${registryCollisions} registry collisions, ${speechSynthesisFallbacks} speechSynthesis fallback(s).`);
if (errors.length) { console.error(errors.map((error) => `- ${error}`).join("\n")); process.exit(1); }
console.log("Lesson 4 audit passed: structure, renderer types, visual registry, audio coverage, physical asset paths and fallback policy are valid.");
