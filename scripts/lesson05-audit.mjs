import { execFileSync } from "node:child_process";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { phonicsFinalChallengeMissingAudio, phonicsLesson } from "../data/lessons/phonics.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "assets/audio/lesson-05/phonics-vowels/lesson-05-phonics-vowels-audio-manifest.csv");
const issues = [];
const expectedVowelOrder = ["a", "i", "o", "e", "u"];
const expectedMix = ["cat", "pig", "hot", "red", "sun", "bag", "fin", "dog", "pen", "cup", "jam", "wig", "lot", "web", "mud"];

async function fileExists(relative) { try { await access(path.join(root, relative)); return true; } catch { return false; } }
function mp3IsValid(relative) {
  try { return execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=codec_name", "-of", "csv=p=0", path.join(root, relative)], { encoding: "utf8", windowsHide: true }).trim() === "mp3"; }
  catch { return false; }
}
function expect(condition, message) { if (!condition) issues.push(message); }

expect(phonicsLesson.activities.length === 9, `Expected 9 top-level sections; got ${phonicsLesson.activities.length}`);
const vowelActivities = phonicsLesson.activities.filter((activity) => activity.mode === "vowel");
expect(vowelActivities.map((activity) => activity.letter).join(",") === expectedVowelOrder.join(","), "Vowel teaching order must be A, I, O, E, U.");
expect(vowelActivities.every((activity) => activity.rounds.length === 3 && activity.rounds.every((round) => round.words.length === 5)), "Every vowel section must have three rounds of five words.");
expect(vowelActivities.flatMap((activity) => activity.rounds.flatMap((round) => round.words)).length === 75, "Expected 75 core practice words.");
const mixed = phonicsLesson.activities.find((activity) => activity.mode === "mixed");
expect(mixed?.words.map((item) => item.word).join(",") === expectedMix.join(","), "Mixed challenge does not match its fixed formal list.");
const final = phonicsLesson.activities.find((activity) => activity.mode === "final");
expect(final?.words.map((item) => item.word).join(",") === phonicsFinalChallengeMissingAudio.join(","), "Final challenge list is incorrect.");
expect(final?.words.every((item) => !item.wholeWordAudio && !item.blendAudio), "Final challenge must not invent missing formal audio.");

const allAudio = vowelActivities.flatMap((activity) => [activity.vowelAudio, ...activity.rounds.flatMap((round) => round.words.flatMap((item) => [item.wholeWordAudio, item.blendAudio]))]);
const warmup = phonicsLesson.activities.find((activity) => activity.mode === "warmup");
allAudio.push(...Object.values(warmup.vowels).map((vowel) => vowel.audio));
const uniqueAudio = [...new Set(allAudio)];
expect(uniqueAudio.length === 155, `Expected 155 unique lesson audio references; got ${uniqueAudio.length}`);
for (const relative of uniqueAudio) {
  if (!await fileExists(relative)) { issues.push(`Missing audio asset: ${relative}`); continue; }
  if ((await stat(path.join(root, relative))).size <= 0) issues.push(`Empty audio asset: ${relative}`);
  else if (!mp3IsValid(relative)) issues.push(`Broken MP3: ${relative}`);
}
const manifest = await readFile(manifestPath, "utf8").catch(() => "");
expect(manifest.split(/\r?\n/).filter(Boolean).length === 156, "Audio manifest must contain one header plus 155 entries.");
expect(!/speechSynthesis|SpeechRecognition/.test(await readFile(path.join(root, "js/activities/phonicsPractice.js"), "utf8")), "Phonics component must not use browser speech APIs.");
console.log(`Lesson 5 audit: ${phonicsLesson.activities.length} sections; 75 practice words; 15 mixed words; 5 final unseen words; ${uniqueAudio.length} verified MP3 references; final audio pending for ${phonicsFinalChallengeMissingAudio.join(", ")}.`);
if (issues.length) { console.error(issues.map((issue) => `- ${issue}`).join("\n")); process.exit(1); }
console.log("Lesson 5 audit passed: data structure, formal audio coverage, MP3 validity, fixed mixed list and audio-free final challenge are valid.");
