import { successSound, playText } from "../audio.js";

export function feedbackLine() { const line = document.createElement("p"); line.className = "feedback"; line.setAttribute("aria-live", "assertive"); return line; }
export function correct(card, button, feedback, onDone, text = "Great!") { button.classList.add("correct"); feedback.className = "feedback correct"; feedback.textContent = text; successSound(); window.setTimeout(onDone, 620); }
export function incorrect(button, feedback, replayText) { button.classList.add("incorrect"); feedback.className = "feedback incorrect"; feedback.textContent = "Try again."; window.setTimeout(() => button.classList.remove("incorrect"), 390); window.setTimeout(() => playText(replayText), 430); }

