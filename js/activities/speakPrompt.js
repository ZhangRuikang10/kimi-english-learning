import { replay } from "../audio.js";
import { renderVisual } from "../visuals/renderVisual.js";

export function renderSpeakPrompt(stage, activity, api) {
  const card = document.createElement("section"); card.className = "activity-card activity-card--speak";
  const type = document.createElement("p"); type.className = "activity-type"; type.textContent = activity.activityLabel || "Speak";
  const title = document.createElement("h1"); title.className = "activity-heading"; title.textContent = activity.title;
  const turn = document.createElement("p"); turn.className = "speak-turn"; turn.textContent = activity.turnLabel || "YOUR TURN";
  const prompt = document.createElement("p"); prompt.className = "speak-question"; prompt.textContent = activity.prompt;
  const visualArea = document.createElement("div");
  visualArea.className = activity.quantityGroups ? "l3-speak-groups" : activity.quantityItems ? "l3-speak-quantity" : "";
  if (activity.quantityGroups) {
    activity.quantityGroups.forEach((group) => {
      const groupNode = document.createElement("div"); groupNode.className = "l3-speak-group";
      for (let i = 0; i < group.count; i += 1) groupNode.append(renderVisual(group.visualId, { className: "l3-speak-object", size: "choice", decorative: true }));
      visualArea.append(groupNode);
    });
  } else if (activity.quantityItems) {
    activity.quantityItems.forEach((item) => { for (let i = 0; i < item.count; i += 1) visualArea.append(renderVisual(item.visualId, { className: "l3-speak-object", size: "choice", decorative: true })); });
  } else {
    visualArea.append(renderVisual(activity.visualId, { className: "character", size: "hero" }));
  }
  card.append(type, visualArea, title);
  if (activity.listenText) { const listenText = document.createElement("p"); listenText.className = "l3-listen-text"; listenText.textContent = activity.listenText; card.append(listenText); }
  card.append(turn, prompt);
  const button = document.createElement("button"); button.type = "button"; button.className = "replay-button"; button.innerHTML = '<span class="speaker">🔊</span> Replay'; button.addEventListener("click", () => replay(activity));
  const complete = document.createElement("button"); complete.type = "button"; complete.className = "replay-button speak-complete"; complete.textContent = activity.completeLabel || "I said it!"; complete.addEventListener("click", api.complete);
  const actions = document.createElement("div"); actions.className = "activity-actions speak-actions"; actions.append(button, complete); card.append(actions); stage.append(card);
}
