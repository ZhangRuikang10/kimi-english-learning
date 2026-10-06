const AUDIO_ROOT = "assets/audio/lesson-05/phonics-vowels/mp3";
const target = (word, vowel) => ({
  word,
  vowel,
  letters: [...word],
  wholeWordAudio: `${AUDIO_ROOT}/words/word-${word}.mp3`,
  blendAudio: `${AUDIO_ROOT}/blends/blend-${word}.mp3`,
});

const vowelSection = (id, letter, sound, words) => ({
  id: `0${id}-short-${letter}`,
  type: "phonicsPractice",
  mode: "vowel",
  title: `Short ${letter.toUpperCase()}`,
  letter,
  sound,
  vowelAudio: `${AUDIO_ROOT}/vowels/short-${letter}.mp3`,
  rounds: [
    { type: "learn", label: "Learn to Blend", words: words.slice(0, 5).map((word) => target(word, letter)) },
    { type: "practice", label: "Your Turn", words: words.slice(5, 10).map((word) => target(word, letter)) },
    { type: "quick-read", label: "Quick Read", words: words.slice(10, 15).map((word) => target(word, letter)) },
  ],
});

const vowels = [
  { letter: "a", sound: "/æ/", words: ["cat", "hat", "bat", "mat", "map", "cap", "tap", "bag", "man", "fan", "pan", "jam", "sad", "mad", "van"] },
  { letter: "i", sound: "/ɪ/", words: ["pig", "big", "sit", "hit", "fit", "lip", "pin", "fin", "win", "dig", "kid", "lid", "zip", "fig", "wig"] },
  { letter: "o", sound: "/ɒ/", words: ["hot", "pot", "top", "mop", "hop", "dog", "log", "fog", "cot", "dot", "nod", "rod", "job", "pop", "lot"] },
  { letter: "e", sound: "/e/", words: ["red", "bed", "pen", "hen", "ten", "leg", "net", "pet", "wet", "jet", "men", "den", "get", "let", "web"] },
  { letter: "u", sound: "/ʌ/", words: ["sun", "cup", "bus", "run", "fun", "bug", "rug", "cut", "nut", "hut", "mud", "mum", "bun", "pup", "tub"] },
];

const vowelReference = Object.fromEntries(vowels.map((item) => [item.letter, { sound: item.sound, audio: `${AUDIO_ROOT}/vowels/short-${item.letter}.mp3` }]));
const mixWords = ["cat", "pig", "hot", "red", "sun", "bag", "fin", "dog", "pen", "cup", "jam", "wig", "lot", "web", "mud"];
const vowelForWord = Object.fromEntries(vowels.flatMap((item) => item.words.map((word) => [word, item.letter])));
const finalWords = ["rag", "vet", "rim", "pod", "gum"];

export const phonicsLesson = {
  id: "phonics-vowels",
  lessonNumber: 5,
  title: "Phonics Power",
  subtitle: "A E I O U",
  icon: "🔤",
  activities: [
    { id: "01-vowel-warmup", type: "phonicsPractice", mode: "warmup", title: "Vowel Power", vowels: vowelReference },
    vowelSection(2, "a", "/æ/", vowels[0].words),
    vowelSection(3, "i", "/ɪ/", vowels[1].words),
    vowelSection(4, "o", "/ɒ/", vowels[2].words),
    vowelSection(5, "e", "/e/", vowels[3].words),
    vowelSection(6, "u", "/ʌ/", vowels[4].words),
    { id: "07-mix-it-up", type: "phonicsPractice", mode: "mixed", title: "Mix It Up!", words: mixWords.map((word) => target(word, vowelForWord[word])) },
    { id: "08-reading-challenge", type: "phonicsPractice", mode: "final", title: "Reading Challenge", words: finalWords.map((word) => ({ word, letters: [...word], vowel: word[1], wholeWordAudio: null, blendAudio: null, audioStatus: "pending" })) },
    { id: "09-finish", type: "phonicsPractice", mode: "finish", title: "Great reading!", vowels: vowelReference },
  ],
};

export const phonicsAudioRoot = AUDIO_ROOT;
export const phonicsFinalChallengeMissingAudio = finalWords;
