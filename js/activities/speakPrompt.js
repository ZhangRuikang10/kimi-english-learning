import { replay } from "../audio.js";
import { renderVisual } from "../visuals/renderVisual.js";

export function renderSpeakPrompt(stage, activity, api) {
  const card = document.createElement("section"); card.className = "activity-card activity-card--speak";
  const type = document.createElement("p"); type.className = "activity-type"; type.textContent = activity.activityLabel || "Speak";
  const title = document.createElement("h1"); title.className = "activity-heading"; title.textContent = activity.title;
  const turn = document.createElement("p"); turn.className = "speak-turn"; turn.textContent = activity.turnLabel || "YOUR TURN";
  const prompt = document.createElement("p"); prompt.className = "speak-question"; prompt.textContent = activity.prompt;
  card.append(type, renderVisual(activity.visualId, { className: "character", size: "hero" }), title, turn, prompt);
  const button = document.createElement("button"); button.type = "button"; button.className = "replay-button"; button.innerHTML = '<span class="speaker">🔊</span> Replay'; button.addEventListener("click", () => replay(activity));
  const complete = document.createElement("button"); complete.type = "button"; complete.className = "replay-button speak-complete"; complete.textContent = activity.completeLabel || "I said it!"; complete.addEventListener("click", api.complete);
  const actions = document.createElement("div"); actions.className = "activity-actions speak-actions"; actions.append(button, complete); card.append(actions); stage.append(card);
}
