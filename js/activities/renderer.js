import { renderLearn } from "./learn.js";
import { renderTapChoice } from "./tapChoice.js";
import { renderListenChoose } from "./listenChoose.js";
import { renderDragDrop } from "./dragDrop.js";
import { renderSpeakPrompt } from "./speakPrompt.js";
import { renderReview } from "./review.js";
import { renderChallenge } from "./challenge.js";
import { renderActionPrompt } from "./actionPrompt.js";
import { renderWritingPrompt } from "./writingPrompt.js";

export const renderers = {
  learn: renderLearn,
  tapChoice: renderTapChoice,
  listenChoose: renderListenChoose,
  dragDrop: renderDragDrop,
  speakPrompt: renderSpeakPrompt,
  review: renderReview,
  challenge: renderChallenge,
  actionPrompt: renderActionPrompt,
  writingPrompt: renderWritingPrompt
};
export function renderActivity(stage, activity, api) {
  const renderer = renderers[activity?.type];
  if (!renderer) {
    const message = `Unknown activity type: ${activity?.type || "(missing)"}`;
    console.error(message, activity);
    const error = document.createElement("p"); error.className = "renderer-error"; error.textContent = message; stage.replaceChildren(error); return;
  }
  renderer(stage, activity, api);
}
