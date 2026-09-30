import { replay } from "../audio.js";
import { correct, feedbackLine, incorrect } from "../components/feedback.js";
import { renderVisual } from "../visuals/renderVisual.js";
import { shuffled } from "./shuffle.js";

export function choiceButton(option, { showLabel = true } = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `choice ${showLabel ? "choice--labelled" : "choice--visual-only"}`;
  button.append(renderVisual(option.visualId, { className: "choice-visual", size: "choice", decorative: false }));
  if (showLabel) {
    const label = document.createElement("span");
    label.className = "choice-label";
    label.textContent = option.label;
    button.append(label);
  }
  button.setAttribute("aria-label", option.label);
  return button;
}


export function compactChoiceSet(options = []) {
  const compactIds = new Set(["ball", "table", "chair", "apple", "box"]);
  return options.length > 0 && options.every((option) =>
    /^(colour|numeral|letter)-/.test(option.visualId || "") || compactIds.has(option.visualId)
  );
}

export function renderTapChoice(stage, activity, api) {
  const card = document.createElement("section");
  card.className = "activity-card activity-card--tap-choice";
  card.innerHTML = '<p class="activity-type">Play</p>';
  if (activity.showActivityTitle !== false) {
    const title = document.createElement("h1");
    title.className = "activity-heading";
    title.textContent = activity.title;
    card.append(title);
  }
  if (activity.question) {
    const question = document.createElement("p");
    question.className = "instruction";
    question.textContent = activity.question;
    card.append(question);
  }

  const grid = document.createElement("div");
  grid.className = `choice-grid choice-grid--tap choice-grid--count-${activity.options.length}${compactChoiceSet(activity.options) ? " choice-grid--compact" : ""}`;
  const feedback = feedbackLine();
  shuffled(activity.options).forEach((option) => {
    const button = choiceButton(option, { showLabel: activity.showLabels !== false });
    button.addEventListener("click", () => {
      if (option.id === activity.correctAnswer) {
        grid.querySelectorAll("button").forEach((item) => item.disabled = true);
        correct(card, button, feedback, api.complete, "Great!");
      } else {
        incorrect(button, feedback, activity.ttsText);
      }
    });
    grid.append(button);
  });

  if (activity.audioEnabled !== false) {
    const listen = document.createElement("button");
    listen.type = "button";
    listen.className = "replay-button choice-replay";
    listen.innerHTML = '<span class="speaker" aria-hidden="true">🔊</span> Listen';
    listen.addEventListener("click", () => replay(activity));
    card.append(listen);
  }
  card.append(grid, feedback);
  stage.append(card);
}
