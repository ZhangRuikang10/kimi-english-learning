import { replay } from "../audio.js";
import { choiceButton, compactChoiceSet } from "./tapChoice.js";
import { correct, feedbackLine, incorrect } from "../components/feedback.js";

export function renderListenChoose(stage, activity, api) {
  const card = document.createElement("section");
  card.className = "activity-card activity-card--listen-choice";
  card.innerHTML = '<p class="activity-type">Listen</p><h1 class="activity-heading">Listen.</h1>';

  const speaker = document.createElement("button");
  speaker.type = "button";
  speaker.className = "listen-orb";
  speaker.textContent = "🔊";
  speaker.setAttribute("aria-label", "Play instruction");
  speaker.addEventListener("click", () => replay(activity));

  const grid = document.createElement("div");
  grid.className = `choice-grid choice-grid--listen choice-grid--count-${activity.options.length}${compactChoiceSet(activity.options) ? " choice-grid--compact" : ""}`;
  const feedback = feedbackLine();
  activity.options.forEach((option) => {
    const button = choiceButton(option, { showLabel: activity.showLabels === true });
    button.addEventListener("click", () => {
      if (option.id === activity.correctAnswer) {
        grid.querySelectorAll("button").forEach((item) => item.disabled = true);
        correct(card, button, feedback, api.complete, "Good job!");
      } else {
        incorrect(button, feedback, activity.ttsText);
      }
    });
    grid.append(button);
  });

  card.append(speaker, grid, feedback);
  stage.append(card);
}
