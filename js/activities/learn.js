import { replay } from "../audio.js";
import { renderVisual } from "../visuals/renderVisual.js";

export function renderLearn(stage, activity, api) {
  const card = document.createElement("section");
  card.className = "activity-card activity-card--learn";
  const type = textElement("p", "activity-type", activity.activityLabel || "Learn");
  const title = textElement("h1", "activity-heading", activity.title);
  const visual = renderVisual(activity.visualId, { className: "character", size: "hero" });
  const play = document.createElement("button");
  play.type = "button";
  play.className = "replay-button learn-replay";
  play.innerHTML = '<span class="speaker" aria-hidden="true">🔊</span>';
  play.append(` ${activity.replayLabel || `Play ${activity.title}`}`);
  play.setAttribute("aria-label", activity.replayLabel || `Play ${activity.title}`);
  play.addEventListener("click", () => { replay(activity); api.complete(); });
  card.append(play);
  stage.append(card);
  card.prepend(type, title, visual);
}

function textElement(tag, className, value) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = value;
  return element;
}
