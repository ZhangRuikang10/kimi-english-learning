import { replay } from "../audio.js";
import { renderVisual } from "../visuals/renderVisual.js";

// Writing is performed on paper, not simulated with an imprecise screen trace.
export function renderWritingPrompt(stage, activity, api) {
  const card = document.createElement("section"); card.className = "activity-card writing-card activity-card--writing";
  const type = document.createElement("p"); type.className = "activity-type"; type.textContent = "Paper time";
  const title = document.createElement("h1"); title.className = "activity-heading"; title.textContent = activity.title;
  const visual = renderVisual(activity.visualId, { className: "character", size: "hero" });
  const prompt = document.createElement("p"); prompt.className = "instruction"; prompt.textContent = activity.childPrompt || "Use your paper and pencil.";
  const play = document.createElement("button"); play.type = "button"; play.className = "replay-button"; play.innerHTML = '<span class="speaker">🔊</span> Listen again'; play.addEventListener("click", () => replay(activity));
  const complete = document.createElement("button"); complete.type = "button"; complete.className = "replay-button action-complete"; complete.textContent = activity.completeLabel || "I finished!"; complete.addEventListener("click", api.complete);
  const actions = document.createElement("div"); actions.className = "activity-actions writing-actions"; actions.append(play, complete);
  card.append(type, title, visual, prompt, actions); stage.append(card);
}
