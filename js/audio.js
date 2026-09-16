import { state, patch } from "./store.js";
import { resolveTeachingAudio } from "../data/audio/audioRegistry.js";

let currentAudio = null;

function stopCurrentPlayback() {
  window.speechSynthesis?.cancel();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function browserTtsFallback(text) {
  if (!state.soundOn || !text || !("speechSynthesis" in window)) return;
  console.warn("[Teaching audio fallback] Browser TTS used for:", text);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = 0.78;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

export function playText(text, explicitSrc = null) {
  if (!state.soundOn || !text) return;

  stopCurrentPlayback();

  const audioSrc = explicitSrc || resolveTeachingAudio(text);
  if (!audioSrc) {
    browserTtsFallback(text);
    return;
  }

  currentAudio = new Audio(audioSrc);
  currentAudio.preload = "auto";

  currentAudio.play().catch((error) => {
    console.error("[Teaching audio failed]", audioSrc, error);
    browserTtsFallback(text);
  });
}

export function replay(activity) {
  if (!state.soundOn || !activity) return;
  const text = activity.ttsText || activity.title;
  playText(text, activity.audioSrc || null);
}

export function speak(text) {
  // Backward-compatible API. Existing callers now use fixed teaching audio
  // whenever the text exists in the registry.
  playText(text);
}

export function toggleSound() {
  patch({ soundOn: !state.soundOn });
  if (!state.soundOn) stopCurrentPlayback();
  return state.soundOn;
}

export function successSound() {
  if (!state.soundOn || !window.AudioContext) return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.setValueAtTime(523, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(783, context.currentTime + .16);
  gain.gain.setValueAtTime(.045, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .28);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + .29);
}
