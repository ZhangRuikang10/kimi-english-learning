import { replay } from "../audio.js";
import { renderVisual } from "../visuals/renderVisual.js";

// The child acts away from the screen; the teacher observes before completion.
export function renderActionPrompt(stage, activity, api) {
  const card = document.createElement("section"); card.className = "activity-card action-card activity-card--action";
  const type = document.createElement("p"); type.className = "activity-type"; type.textContent = activity.activityLabel || "Listen and do";
  const title = document.createElement("h1"); title.className = "activity-heading"; title.textContent = activity.title || "Listen and do.";
  const prompt = document.createElement("p"); prompt.className = "action-prompt"; prompt.textContent = activity.childPrompt || "Listen. Then do it!";
  const visual = renderVisual(activity.visualId, { className: "character", size: "hero" });
  const play = document.createElement("button"); play.type = "button"; play.className = "replay-button"; play.innerHTML = '<span class="speaker">🔊</span> Listen again'; play.addEventListener("click", () => replay(activity));
  const complete = document.createElement("button"); complete.type = "button"; complete.className = "replay-button action-complete"; complete.textContent = activity.completeLabel || "I did it!"; complete.addEventListener("click", api.complete);
  const actions = document.createElement("div"); actions.className = "activity-actions action-actions"; actions.append(play, complete);
  if (activity.hideNestedHeader) card.append(visual, prompt, actions);
  else card.append(type, title, visual, prompt, actions);
  stage.append(card);
}
