import { execFileSync } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { numbersLesson } from "../data/lessons/numbers.js";
import { lesson01Entries, lesson02Entries, normalizeAudioText, resolveTeachingAudio } from "../data/audio/audioRegistry.js";
import { lesson03Entries } from "../data/audio/lesson03Entries.js";
import { getVisual } from "../data/visuals.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function collectRuntime() {
  const found = new Map(); const add = (text, usage) => { if (!text) return; const key = normalizeAudioText(text); const item = found.get(key) || { text, usages: [] }; item.usages.push(usage); found.set(key, item); };
  const visit = (activity, parent = "") => { const usage = parent ? `${parent}/${activity.id}` : activity.id; if (activity.ttsText && activity.audioEnabled !== false && activity.audioDisposition !== "INTENTIONALLY_SILENT") add(activity.ttsText, usage); if (activity.type === "review") activity.items?.forEach((item, index) => add(item.ttsText || item.text, `${usage}/review-${index + 1}`)); if (activity.type === "challenge") activity.items?.forEach((item) => visit(item, usage)); };
  numbersLesson.activities.forEach(visit); return [...found.values()];
}
const probe = (file) => execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_name,sample_rate,channels", "-of", "csv=p=0", file], { encoding: "utf8" }).trim();
const runtime = collectRuntime(); const missing = []; const broken = [];
for (const item of runtime) { const audioPath = resolveTeachingAudio(item.text); if (!audioPath) { missing.push(item.text); continue; } const file = path.join(root, audioPath); try { const info = await stat(file); if (!info.size || !/mp3,24000,1/.test(probe(file))) broken.push(audioPath); } catch { broken.push(audioPath); } }
const allEntries = [...lesson01Entries, ...lesson02Entries, ...lesson03Entries]; const seenText = new Map(); const seenFiles = new Map(); const collisions = [];
for (const [text, file] of allEntries) { const normalized = normalizeAudioText(text); if (seenText.has(normalized)) collisions.push(`text:${normalized}`); else seenText.set(normalized, file); if (seenFiles.has(file) && lesson03Entries.some(([, generated]) => generated === file)) collisions.push(`file:${file}`); else seenFiles.set(file, normalized); }
const visualIds = new Set(); const collectVisuals = (activity) => { [activity.visualId, activity.draggable?.visualId, activity.target?.visualId].filter(Boolean).forEach((id) => visualIds.add(id)); activity.options?.forEach((item) => item.visualId && visualIds.add(item.visualId)); activity.groups?.forEach((item) => item.visualId && visualIds.add(item.visualId)); activity.quantityItems?.forEach((item) => item.visualId && visualIds.add(item.visualId)); activity.quantityGroups?.forEach((item) => item.visualId && visualIds.add(item.visualId)); activity.products?.forEach((item) => item.visualId && visualIds.add(item.visualId)); activity.request?.forEach((item) => item.visualId && visualIds.add(item.visualId)); activity.recipients?.forEach((recipient) => { recipient.visualId && visualIds.add(recipient.visualId); recipient.request?.forEach((item) => item.visualId && visualIds.add(item.visualId)); }); activity.items?.forEach(collectVisuals); }; numbersLesson.activities.forEach(collectVisuals); const missingVisuals = [];
for (const id of visualIds) { const visual = getVisual(id); try { if (!visual) throw new Error(); await stat(path.join(root, visual.src)); } catch { missingVisuals.push(id); } }
const source = await readFile(path.join(root, "js/audio.js"), "utf8"); const fallbackCount = /speechSynthesis|SpeechSynthesisUtterance/.test(source) ? 1 : 0;
console.log(JSON.stringify({ runtimePlaybackPoints: runtime.reduce((total, item) => total + item.usages.length, 0), uniqueRuntimeUtterances: runtime.length, reusedApprovedMp3: runtime.filter((item) => !lesson03Entries.some(([text]) => normalizeAudioText(text) === normalizeAudioText(item.text))).length, newlyGeneratedMp3: lesson03Entries.length, totalLesson03PhysicalMp3: lesson03Entries.length, missingRuntimeMp3: missing.length, brokenAudioPaths: broken.length, registryCollisions: collisions.length, speechSynthesisFallbacks: fallbackCount, missingVisuals: missingVisuals.length }, null, 2));
if (missing.length || broken.length || collisions.length || fallbackCount || missingVisuals.length) process.exitCode = 1;
