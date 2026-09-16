import { renderActivity } from "./renderer.js";

// Challenge only sequences activity data; it never owns choice, audio or feedback logic.
export function renderChallenge(stage, activity, api) {
  const card = document.createElement("section"); card.className = "activity-card challenge-card activity-card--challenge";
  const type = document.createElement("p"); type.className = "activity-type"; type.textContent = "Challenge";
  const title = document.createElement("h1"); title.className = "activity-heading"; title.textContent = activity.title;
  const count = document.createElement("p"); count.className = "challenge-count";
  const inner = document.createElement("div"); inner.className = "challenge-stage";
  const continueButton = document.createElement("button"); continueButton.type = "button"; continueButton.className = "nav-button next challenge-next"; continueButton.textContent = "Next challenge"; continueButton.hidden = true;
  card.append(type, title, count, inner, continueButton); stage.append(card);
  let index = 0;
  const show = () => {
    const item = activity.items?.[index];
    if (!item) { api.complete(); return; }
    if (item.type === "challenge") { console.error("Challenge cannot contain another challenge.", item); return; }
    count.textContent = `${index + 1} / ${activity.items.length}`;
    continueButton.hidden = true; inner.replaceChildren();
    renderActivity(inner, item, { complete: () => { continueButton.hidden = false; continueButton.focus(); } });
  };
  continueButton.addEventListener("click", () => { index += 1; show(); });
  show();
}
