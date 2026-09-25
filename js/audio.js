import { state, patch } from "./store.js";
import { resolveTeachingAudio } from "../data/audio/audioRegistry.js";

let currentAudio = null;

function stopCurrentPlayback() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

export function playText(text, explicitSrc = null) {
  if (!state.soundOn || !text) return;

  stopCurrentPlayback();

  const audioSrc = explicitSrc || resolveTeachingAudio(text);
  if (!audioSrc) {
    // Formal lessons never substitute browser speech synthesis for approved MP3.
    console.warn("[Teaching audio unavailable] No approved MP3 for:", text);
    return;
  }

  currentAudio = new Audio(audioSrc);
  currentAudio.preload = "auto";

  currentAudio.play().catch((error) => {
    console.error("[Teaching audio failed]", audioSrc, error);
  });
}

export function replay(activity) {
  if (!state.soundOn || !activity) return;
  if (activity.audioEnabled === false || activity.audioDisposition === "INTENTIONALLY_SILENT") return;
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
