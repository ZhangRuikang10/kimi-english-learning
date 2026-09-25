import { replay } from "../audio.js";
import { renderVisual } from "../visuals/renderVisual.js";
import { correct, feedbackLine } from "../components/feedback.js";

const element = (tag, className, value) => { const node = document.createElement(tag); node.className = className; if (value != null) node.textContent = value; return node; };
const playButton = (activity) => { const button = element("button", "replay-button", "🔊 Listen"); button.type = "button"; button.addEventListener("click", () => replay(activity)); return button; };
const visual = (id, className = "") => renderVisual(id, { className, size: "choice", decorative: true });
function cardShell(stage, activity, label = "Play") { const card = element("section", "activity-card activity-card--l3"); card.append(element("p", "activity-type", label), element("h1", "activity-heading", activity.title)); stage.append(card); return card; }
function repeatVisuals(items, className = "l3-count-items") { const wrap = element("div", className); items.forEach(({ visualId, count }) => { for (let i = 0; i < count; i += 1) wrap.append(visual(visualId, "l3-object")); }); return wrap; }

export function renderCover(stage, activity, api) {
  const card = cardShell(stage, activity, "Welcome");
  card.classList.add("activity-card--cover");
  card.append(element("p", "l3-subtitle", activity.subtitle), renderVisual(activity.visualId, { className: "character", size: "hero" }), playButton(activity));
  const start = element("button", "nav-button next", "Let's go!"); start.type = "button"; start.addEventListener("click", api.complete); card.append(start);
}

export function renderQuantity(stage, activity, api) {
  const card = cardShell(stage, activity, activity.activityLabel || "Count");
  card.append(playButton(activity), element("p", "instruction", activity.prompt || "Count the things."));
  const groups = element("div", "l3-quantity-groups");
  const memoryStage = activity.memoryRevealSeconds ? element("div", "l3-memory-stage") : null;
  const memoryStatus = memoryStage ? element("p", "l3-memory-status", `Look carefully: ${activity.memoryRevealSeconds}`) : null;
  const feedback = feedbackLine();
  const selectGroup = (group, button) => {
    if (group.id !== activity.correctAnswer) { button.classList.add("incorrect"); feedback.className = "feedback incorrect"; feedback.textContent = "Try again. Listen and look carefully."; window.setTimeout(() => button.classList.remove("incorrect"), 520); return; }
    groups.querySelectorAll("button").forEach((item) => item.disabled = true);
    correct(card, button, feedback, api.complete, "Great listening!");
  };
  activity.groups.forEach((group) => {
    const section = element(activity.groupChoices ? "button" : "section", `l3-quantity-group${activity.groupChoices ? " l3-quantity-group--choice" : ""}`);
    if (activity.groupChoices) { section.type = "button"; section.setAttribute("aria-label", group.label); section.addEventListener("click", () => selectGroup(group, section)); }
    section.append(repeatVisuals([{ visualId: group.visualId, count: group.count }]));
    if (group.label) section.append(element("p", "l3-object-label", group.label));
    groups.append(section);
  });
  if (memoryStage) { memoryStage.append(groups, memoryStatus); card.append(memoryStage); } else card.append(groups);
  card.append(element("p", "l3-question", activity.question));
  if (activity.groupChoices) { card.append(feedback); return; }
  const answer = element("div", "l3-answer-row");
  activity.options.forEach((option) => { const button = element("button", "l3-number-choice", option.label); button.type = "button"; button.addEventListener("click", () => { if (option.id !== activity.correctAnswer) { button.classList.add("incorrect"); feedback.className = "feedback incorrect"; feedback.textContent = "Try again. Count carefully."; window.setTimeout(() => button.classList.remove("incorrect"), 520); return; } answer.querySelectorAll("button").forEach((item) => item.disabled = true); correct(card, button, feedback, api.complete, "Great counting!"); }); answer.append(button); });
  card.append(answer, feedback);
  if (memoryStage) {
    const buttons = [...answer.querySelectorAll("button")];
    buttons.forEach((button) => button.disabled = true);
    let remaining = activity.memoryRevealSeconds;
    const cover = element("div", "l3-memory-cover", "The shop is covered. Now answer from memory.");
    memoryStage.append(cover);
    const countdown = window.setInterval(() => { remaining -= 1; if (remaining > 0) memoryStatus.textContent = `Look carefully: ${remaining}`; }, 1000);
    window.setTimeout(() => { window.clearInterval(countdown); memoryStage.classList.add("is-covered"); memoryStatus.remove(); buttons.forEach((button) => button.disabled = false); }, activity.memoryRevealSeconds * 1000);
  }
}

export function renderPhraseBuilder(stage, activity, api) {
  const card = cardShell(stage, activity, "Build");
  const builderVisual = activity.quantityItems ? repeatVisuals(activity.quantityItems, "l3-builder-quantity") : renderVisual(activity.visualId, { className: "l3-builder-visual", size: "hero", decorative: true });
  card.append(playButton(activity), builderVisual);
  const sentence = element("p", "l3-built-phrase", "Choose the words."); const feedback = feedbackLine(); const selected = [];
  activity.parts.forEach((part, partIndex) => { const row = element("div", "l3-builder-row"); part.options.forEach((option) => { const button = element("button", "l3-word-choice", option); button.type = "button"; button.addEventListener("click", () => { selected[partIndex] = option; row.querySelectorAll("button").forEach((node) => node.classList.toggle("selected", node === button)); sentence.textContent = selected.filter(Boolean).join(" "); if (selected.length === activity.parts.length && selected.every(Boolean)) { if (sentence.textContent === activity.answer) correct(card, button, feedback, api.complete, "You built it!"); else { feedback.className = "feedback incorrect"; feedback.textContent = "Try again. Listen and build the phrase."; } } }); row.append(button); }); card.append(row); }); card.append(sentence, feedback);
}

export function renderBasketShop(stage, activity, api) {
  const card = cardShell(stage, activity, activity.activityLabel || "Shop"); card.append(playButton(activity));
  if (activity.customerRequest) card.append(element("p", "l3-customer-request", activity.customerRequest));
  card.append(element("p", "instruction", activity.prompt));
  const products = element("div", "l3-shop-products"); const feedback = feedbackLine(); const recipientMode = Array.isArray(activity.recipients);
  const chosen = []; const productButtons = []; let selectedProduct = null;
  const recipientStates = new Map((activity.recipients || []).map((recipient) => [recipient.id, { items: [], zone: null }]));
  const history = [];
  const updateSelectedProduct = () => productButtons.forEach(({ button, visualId }) => button.classList.toggle("is-selected", visualId === selectedProduct));
  activity.products.forEach((item) => {
    const button = element("button", "l3-product", item.label); button.type = "button"; button.prepend(visual(item.visualId));
    button.addEventListener("click", () => {
      if (recipientMode) { selectedProduct = item.visualId; updateSelectedProduct(); feedback.className = "feedback"; feedback.textContent = `Now choose who receives the ${item.label}.`; return; }
      const limit = activity.request.reduce((total, value) => total + value.count, 0); if (chosen.length >= limit) return; chosen.push(item.visualId); summary();
    });
    productButtons.push({ button, visualId: item.visualId }); products.append(button);
  });
  const basket = recipientMode ? null : element("div", "l3-basket");
  const summary = () => { if (!basket) return; basket.querySelectorAll(".l3-basket-item").forEach((node) => node.remove()); chosen.forEach((id) => basket.append(visual(id, "l3-basket-item"))); };
  if (basket) basket.append(visual("l3-basket", "l3-basket-image"));
  const targets = recipientMode ? element("div", "l3-delivery-targets") : null;
  const updateRecipient = (recipient) => { const state = recipientStates.get(recipient.id); const items = state.zone.querySelector(".l3-delivery-items"); items.replaceChildren(...state.items.map((id) => visual(id, "l3-delivery-item"))); };
  if (recipientMode) activity.recipients.forEach((recipient) => {
    const target = element("button", "l3-delivery-target"); target.type = "button"; target.setAttribute("aria-label", `Give the selected item to ${recipient.name}`);
    target.append(visual(recipient.visualId, "l3-delivery-character"), element("strong", "", `Give to ${recipient.name}`), element("span", "l3-delivery-items"));
    recipientStates.get(recipient.id).zone = target;
    target.addEventListener("click", () => {
      if (!selectedProduct) { feedback.className = "feedback incorrect"; feedback.textContent = "Choose an item first, then choose Tom or Mia."; return; }
      recipientStates.get(recipient.id).items.push(selectedProduct); history.push({ recipientId: recipient.id, visualId: selectedProduct }); selectedProduct = null; updateSelectedProduct(); updateRecipient(recipient); feedback.className = "feedback"; feedback.textContent = "Good giving!";
    });
    targets.append(target);
  });
  const controls = element("div", "l3-basket-controls");
  const undo = element("button", "l3-basket-action", "Undo last"); undo.type = "button"; undo.addEventListener("click", () => {
    if (recipientMode) { const last = history.pop(); if (!last) return; const state = recipientStates.get(last.recipientId); state.items.pop(); updateRecipient(activity.recipients.find((recipient) => recipient.id === last.recipientId)); return; }
    chosen.pop(); summary();
  });
  const clear = element("button", "l3-basket-action", recipientMode ? "Clear delivery" : "Clear basket"); clear.type = "button"; clear.addEventListener("click", () => {
    if (recipientMode) { history.length = 0; recipientStates.forEach((state, id) => { state.items.length = 0; updateRecipient(activity.recipients.find((recipient) => recipient.id === id)); }); selectedProduct = null; updateSelectedProduct(); return; }
    chosen.length = 0; summary();
  });
  controls.append(undo, clear);
  const check = element("button", "nav-button next", recipientMode ? "Check delivery" : "Check basket"); check.type = "button"; check.addEventListener("click", () => {
    const deliveryMatches = recipientMode && activity.recipients.every((recipient) => { const expected = recipient.request.flatMap((item) => Array(item.count).fill(item.visualId)).sort().join("|"); return recipientStates.get(recipient.id).items.slice().sort().join("|") === expected; });
    const basketMatches = !recipientMode && chosen.slice().sort().join("|") === activity.request.flatMap((item) => Array(item.count).fill(item.visualId)).sort().join("|");
    if (!deliveryMatches && !basketMatches) { feedback.className = "feedback incorrect"; feedback.textContent = recipientMode ? "Not yet — check who receives each item. You can undo or clear your delivery." : "Not yet — check the colour and number. You can undo or clear your basket."; return; }
    correct(card, check, feedback, api.complete, recipientMode ? "Perfect delivery!" : "Perfect shopping!");
  });
  card.append(products); if (targets) card.append(targets); if (basket) card.append(basket); card.append(controls, check, feedback);
}

export function renderPricePlay(stage, activity, api) {
  const card = cardShell(stage, activity, "Prices"); card.append(playButton(activity), element("p", "instruction", activity.prompt), visual(activity.visualId, "l3-price-product"));
  const grid = element("div", "l3-money-choices"); const feedback = feedbackLine(); activity.options.forEach((option) => { const button = element("button", "l3-money-choice"); button.type = "button"; button.append(visual(option.visualId), element("span", "", option.label)); button.addEventListener("click", () => { if (option.id !== activity.correctAnswer) { button.classList.add("incorrect"); feedback.className = "feedback incorrect"; feedback.textContent = "Try again. Listen to the price again."; window.setTimeout(() => button.classList.remove("incorrect"), 520); return; } grid.querySelectorAll("button").forEach((item) => item.disabled = true); correct(card, button, feedback, api.complete, "That is the right price!"); }); grid.append(button); });
  card.append(element("p", "l3-question", activity.question));
  if (activity.modelAnswer) card.append(element("p", "l3-model-answer", activity.modelAnswer));
  if (activity.choicePrompt) card.append(element("p", "l3-choice-prompt", activity.choicePrompt));
  card.append(grid, feedback);
}

export function renderCompare(stage, activity, api) {
  const card = cardShell(stage, activity, "Think"); card.append(playButton(activity), element("p", "l3-question l3-think-question", activity.prompt)); const groups = element("div", "l3-compare-groups");
  activity.groups.forEach((group) => { const button = element("button", "l3-compare-group"); button.type = "button"; button.setAttribute("aria-label", group.label || `${group.count} items`); button.append(repeatVisuals([{ visualId: group.visualId, count: group.count }])); button.addEventListener("click", () => { const feedback = card.querySelector(".feedback"); const accepted = activity.correctAnswers || [activity.correctAnswer]; if (!accepted.includes(group.id)) { feedback.className = "feedback incorrect"; feedback.textContent = "Try again."; return; } correct(card, button, feedback, api.complete, "Great thinking!"); }); groups.append(button); }); card.append(groups, feedbackLine());
}
