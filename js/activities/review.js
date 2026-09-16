import { playText } from "../audio.js";
import { renderVisual } from "../visuals/renderVisual.js";

export function renderReview(stage, activity, api) {
  const card = document.createElement("section"); card.className = "activity-card activity-card--review"; card.innerHTML = `<p class="activity-type">Review</p><h1 class="activity-heading">${activity.title}</h1>`;
  const list = document.createElement("div"); list.className = "review-list"; let count = 0;
  activity.items.forEach((item) => { const button = document.createElement("button"); button.type = "button"; button.className = "review-item"; button.append(renderVisual(item.visualId, { className: "review-visual", size: "review", decorative: true })); const label = document.createElement("span"); label.textContent = item.text; const icon = document.createElement("span"); icon.setAttribute("aria-hidden", "true"); icon.textContent = "🔊"; button.append(label, icon); button.addEventListener("click", () => { playText(item.ttsText || item.text, item.audioSrc || null); if (!button.classList.contains("done")) { button.classList.add("done"); count += 1; if (count === activity.items.length) api.complete(); } }); list.append(button); }); card.append(list); stage.append(card);
}

