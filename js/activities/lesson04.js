import { playText, replay } from "../audio.js";
import { feedbackLine } from "../components/feedback.js";
import { renderVisual } from "../visuals/renderVisual.js";
import { shuffled } from "./shuffle.js";

const el = (tag, className, text = "") => { const node = document.createElement(tag); node.className = className; if (text) node.textContent = text; return node; };
const heading = (card, activity, label) => card.append(el("p", "activity-type", label), el("h1", "activity-heading", activity.title));
const listenButton = (text, onClick) => { const button = el("button", "replay-button l4-listen", `🔊 ${text || "Listen"}`); button.type = "button"; button.addEventListener("click", onClick); return button; };

function zoneButton(zone, showLabel) {
  const button = el("button", `l4-hotspot${showLabel ? " is-labelled" : ""}`, showLabel ? zone.label : "");
  button.type = "button";
  button.dataset.zone = zone.id;
  button.setAttribute("aria-label", zone.label);
  button.style.left = `${zone.x}%`; button.style.top = `${zone.y}%`; button.style.width = `${zone.w}%`; button.style.height = `${zone.h}%`;
  return button;
}

function renderBodyCards(stage, activity, api) {
  const card = el("section", "activity-card activity-card--l4 l4-body-map-card l4-body-cards-card");
  heading(card, activity, "Learn");
  card.append(el("p", "instruction", "Tap each clear picture to learn the body word."));
  const feedback = feedbackLine();
  const targets = activity.targets?.length ? [...activity.targets] : activity.zones.map((zone) => zone.id);
  const visited = new Set();
  const grid = el("div", `l4-body-card-grid${activity.title === "My Face" ? " l4-body-card-grid--face" : ""}`);
  const buttons = new Map();
  activity.zones.filter((zone) => targets.includes(zone.id)).forEach((zone) => {
    const button = el("button", "l4-body-part-card");
    button.type = "button";
    button.setAttribute("aria-label", `Learn ${zone.label}`);
    button.append(renderVisual(zone.visualId, { className: "l4-body-part-image", size: "choice", decorative: true }), el("span", "l4-body-part-label", zone.label));
    button.addEventListener("click", () => {
      visited.add(zone.id);
      button.classList.add("is-correct");
      feedback.className = "feedback correct";
      feedback.textContent = `${zone.label}.`;
      playText(zone.ttsText || zone.label);
      if (visited.size === targets.length) window.setTimeout(api.complete, 420);
    });
    buttons.set(zone.id, button);
    grid.append(button);
  });
  const replay = listenButton("Hear the next body word", () => {
    const zone = activity.zones.find((item) => targets.includes(item.id) && !visited.has(item.id));
    playText(zone?.ttsText || activity.ttsText || activity.title);
  });
  card.append(grid, replay, feedback);
  stage.append(card);
}

function renderSelfTouch(stage, activity, api) {
  const card = el("section", "activity-card activity-card--l4 l4-body-map-card l4-self-touch-card");
  heading(card, activity, "Listen and move");
  card.append(el("p", "instruction", "Listen. Touch your own face. Then tell us when you did it."));
  const round = el("div", "l4-self-touch-round");
  const feedback = feedbackLine();
  const targets = activity.targets?.length ? [...activity.targets] : activity.zones.map((zone) => zone.id);
  let index = 0;
  const playCurrent = () => {
    const zone = activity.zones.find((item) => item.id === targets[index]);
    playText(zone?.ttsText || activity.ttsText || activity.title);
  };
  const renderRound = () => {
    round.replaceChildren();
    const progress = el("p", "l4-self-touch-progress", `Action ${index + 1} of ${targets.length}`);
    const face = renderVisual(activity.visualId, { className: "l4-self-touch-face", size: "hero", decorative: true });
    const hint = el("p", "l4-self-touch-hint", "Use your own face — do not tap the picture.");
    const listen = listenButton("Listen", playCurrent);
    const done = el("button", "nav-button next l4-self-touch-done", "I did it!");
    done.type = "button";
    done.addEventListener("click", () => {
      feedback.className = "feedback correct";
      if (index >= targets.length - 1) {
        feedback.textContent = "Great listening and moving!";
        done.disabled = true;
        window.setTimeout(api.complete, 420);
        return;
      }
      feedback.textContent = "Great! Listen for the next action.";
      index += 1;
      renderRound();
    });
    round.append(progress, face, hint, listen, done);
  };
  renderRound();
  card.append(round, feedback);
  stage.append(card);
}

export function renderBodyMap(stage, activity, api) {
  if (activity.presentation === "cards") { renderBodyCards(stage, activity, api); return; }
  if (activity.interaction === "selfTouch") { renderSelfTouch(stage, activity, api); return; }
  const card = el("section", "activity-card activity-card--l4 l4-body-map-card");
  heading(card, activity, activity.mode === "listen" ? "Listen and touch" : "Learn");
  const instruction = el("p", "instruction", activity.mode === "listen" ? "Listen, then touch the right place." : "Touch each body part to learn it.");
  const map = el("div", "l4-body-map");
  map.append(renderVisual(activity.visualId, { className: "l4-map-image", size: "hero", decorative: true }));
  const feedback = feedbackLine();
  const targets = activity.targets?.length ? [...activity.targets] : activity.zones.map((zone) => zone.id);
  let index = 0; const visited = new Set();
  const buttons = new Map();
  activity.zones.forEach((zone) => {
    const button = zoneButton(zone, activity.mode !== "listen");
    button.addEventListener("click", () => {
      if (activity.mode === "listen") {
        const expected = targets[index];
        if (zone.id !== expected) { button.classList.add("is-wrong"); feedback.className = "feedback incorrect"; feedback.textContent = "Try again. Listen carefully."; window.setTimeout(() => button.classList.remove("is-wrong"), 420); return; }
        button.classList.add("is-correct"); index += 1; feedback.className = "feedback correct"; feedback.textContent = `Good! ${zone.label}.`;
        if (index >= targets.length) { window.setTimeout(api.complete, 420); }
        return;
      }
      if (!targets.includes(zone.id)) return;
      visited.add(zone.id); button.classList.add("is-correct"); feedback.className = "feedback correct"; feedback.textContent = `${zone.label}.`;
      playText(zone.ttsText || zone.label);
      if (visited.size === new Set(targets).size) window.setTimeout(api.complete, 420);
    });
    buttons.set(zone.id, button); map.append(button);
  });
  const replay = listenButton(activity.mode === "listen" ? "Listen" : "Hear the body word", () => {
    const zone = activity.zones.find((item) => item.id === (activity.mode === "listen" ? targets[index] : targets.find((id) => !visited.has(id))));
    playText(zone?.ttsText || activity.ttsText || activity.title);
  });
  card.append(instruction, map, replay, feedback); stage.append(card);
}

export function renderBodyBuilder(stage, activity, api) {
  const card = el("section", "activity-card activity-card--l4 l4-body-builder-card"); heading(card, activity, "Build");
  card.append(el("p", "instruction", "Choose a body part, then touch its place on Tom."));
  const map = el("div", "l4-body-map l4-builder-map"); map.append(renderVisual(activity.visualId, { className: "l4-map-image", size: "hero", decorative: true }));
  const feedback = feedbackLine(); const parts = el("div", "l4-builder-parts"); let selected = null; const placed = new Set();
  const partButtons = new Map();
  activity.parts.forEach((part) => {
    const button = el("button", "l4-builder-part"); button.type = "button"; button.append(renderVisual(part.visualId, { className: "l4-builder-part-image", size: "choice", decorative: true }), el("span", "", part.label)); button.setAttribute("aria-label", `Choose ${part.label}`);
    button.addEventListener("click", () => { if (placed.has(part.id)) return; selected = part.id; partButtons.forEach((item, id) => item.classList.toggle("is-selected", id === selected)); feedback.className = "feedback"; feedback.textContent = `Now touch the ${part.label}.`; });
    partButtons.set(part.id, button); parts.append(button);
  });
  activity.zones.forEach((zone) => {
    const button = zoneButton(zone, false); button.addEventListener("click", () => {
      if (!selected) { feedback.className = "feedback incorrect"; feedback.textContent = "Choose a body part first."; return; }
      if (selected !== zone.id) { button.classList.add("is-wrong"); feedback.className = "feedback incorrect"; feedback.textContent = "That is not the right place. Try again."; window.setTimeout(() => button.classList.remove("is-wrong"), 420); return; }
      placed.add(selected); button.classList.add("is-correct"); partButtons.get(selected)?.classList.add("is-placed"); partButtons.get(selected)?.setAttribute("disabled", "true"); feedback.className = "feedback correct"; feedback.textContent = `Great — ${zone.label}.`; selected = null; partButtons.forEach((item) => item.classList.remove("is-selected")); if (placed.size === activity.parts.length) window.setTimeout(api.complete, 420);
    }); map.append(button);
  });
  card.append(map, parts, feedback); stage.append(card);
}

function showWordRound(card, activity, round, api, state) {
  card.replaceChildren(); heading(card, activity, activity.displayLabel || "Read");
  if (round.visualId) card.append(renderVisual(round.visualId, { className: "l4-word-visual", size: "hero", decorative: true }));
  card.append(el("p", "l4-reading-question", round.question));
  if (activity.audioEnabled !== false && activity.audioDisposition !== "INTENTIONALLY_SILENT") card.append(listenButton("Listen", () => playText(round.ttsText || round.question)));
  const grid = el("div", "l4-word-options"); const feedback = feedbackLine();
  shuffled(round.options).forEach((option) => {
    const button = el("button", "l4-word-option", option); button.type = "button"; button.addEventListener("click", () => {
      if (option !== round.correctAnswer) { button.classList.add("is-wrong"); feedback.className = "feedback incorrect"; feedback.textContent = "Try again."; window.setTimeout(() => button.classList.remove("is-wrong"), 420); return; }
      button.classList.add("is-correct"); grid.querySelectorAll("button").forEach((item) => { item.disabled = true; }); feedback.className = "feedback correct"; feedback.textContent = "Great reading!";
      if (state.index >= activity.rounds.length - 1) window.setTimeout(api.complete, 420);
      else { const next = el("button", "nav-button next l4-round-next", activity.nextLabel || "Next"); next.type = "button"; next.addEventListener("click", () => { state.index += 1; showWordRound(card, activity, activity.rounds[state.index], api, state); }); card.append(next); }
    }); grid.append(button);
  });
  card.append(grid, feedback);
}

export function renderWordChoice(stage, activity, api) { const card = el("section", "activity-card activity-card--l4 l4-word-choice-card"); stage.append(card); showWordRound(card, activity, activity.rounds[0], api, { index: 0 }); }

export function renderWordBuilder(stage, activity, api) {
  const card = el("section", "activity-card activity-card--l4 l4-word-builder-card"); heading(card, activity, "Build"); const state = { round: 0, chosen: "" };
  const render = () => {
    const round = activity.rounds[state.round]; card.replaceChildren(); heading(card, activity, "Build"); card.append(renderVisual(round.visualId, { className: "l4-word-visual", size: "hero", decorative: true }), el("p", "instruction", "Tap the letters to build the word."));
    const answer = el("div", "l4-built-word", ""); const letters = el("div", "l4-letter-buttons"); const feedback = feedbackLine();
    round.letters.forEach((letter, index) => { const button = el("button", "l4-letter-button", letter); button.type = "button"; button.dataset.index = String(index); button.addEventListener("click", () => { if (button.disabled) return; state.chosen += letter; answer.textContent = state.chosen; button.disabled = true; if (state.chosen.length === round.word.length) { if (state.chosen === round.word) { feedback.className = "feedback correct"; feedback.textContent = "You built the word!"; letters.querySelectorAll("button").forEach((item) => item.disabled = true); if (state.round === activity.rounds.length - 1) window.setTimeout(api.complete, 520); else { const next = el("button", "nav-button next l4-round-next", "Next word"); next.type = "button"; next.addEventListener("click", () => { state.round += 1; state.chosen = ""; render(); }); card.append(next); } } else { feedback.className = "feedback incorrect"; feedback.textContent = "Try again. Reset and build it again."; } } }); letters.append(button); });
    const reset = el("button", "replay-button l4-reset", "Reset"); reset.type = "button"; reset.addEventListener("click", render); card.append(answer, letters, reset, feedback);
  }; render(); stage.append(card);
}

export function renderMiniReading(stage, activity, api) {
  const card = el("section", "activity-card activity-card--l4 l4-mini-reading"); const state = { index: 0 };
  const render = () => { const question = activity.questions[state.index]; card.replaceChildren(); heading(card, activity, "Read"); const body = el("div", "l4-reading-layout"); body.append(renderVisual(activity.visualId, { className: "l4-reading-character", size: "hero", decorative: true })); const text = el("div", "l4-reading-text", activity.text); text.setAttribute("aria-label", "Reading passage"); body.append(text); card.append(body, el("p", "l4-reading-question", question.question)); const options = el("div", "l4-word-options"); const feedback = feedbackLine(); shuffled(question.options).forEach((option) => { const button = el("button", "l4-word-option", option); button.type = "button"; button.addEventListener("click", () => { if (option !== question.correctAnswer) { button.classList.add("is-wrong"); feedback.className = "feedback incorrect"; feedback.textContent = "Read it again and try."; window.setTimeout(() => button.classList.remove("is-wrong"), 420); return; } button.classList.add("is-correct"); options.querySelectorAll("button").forEach((item) => { item.disabled = true; }); feedback.className = "feedback correct"; feedback.textContent = "Great reading!"; if (state.index === activity.questions.length - 1) window.setTimeout(api.complete, 450); else { const next = el("button", "nav-button next l4-round-next", "Next question"); next.type = "button"; next.addEventListener("click", () => { state.index += 1; render(); }); card.append(next); } }); options.append(button); }); card.append(options, feedback); };
  render(); stage.append(card);
}
