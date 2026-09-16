import { replay } from "../audio.js";
import { correct, feedbackLine } from "../components/feedback.js";
import { renderVisual } from "../visuals/renderVisual.js";

export function renderDragDrop(stage, activity, api) {
  const card = document.createElement("section"); card.className = "activity-card activity-card--drag";
  const type = document.createElement("p"); type.className = "activity-type"; type.textContent = activity.activityLabel || "Play";
  const title = document.createElement("h1"); title.className = "activity-heading"; title.textContent = activity.title;
  card.append(type, title);
  const replayButton = document.createElement("button"); replayButton.type = "button"; replayButton.className = "replay-button"; replayButton.innerHTML = '<span class="speaker">🔊</span> Listen'; replayButton.addEventListener("click", () => replay(activity));
  const draggable = document.createElement("div"); draggable.className = "drag-object"; draggable.append(renderVisual(activity.draggable.visualId, { size: "drag", decorative: true })); draggable.setAttribute("role", "button"); draggable.tabIndex = 0; draggable.setAttribute("aria-label", `Drag ${activity.draggable.label} to ${activity.target.label}`);
  const target = document.createElement("div"); target.className = "drop-target";
  const targetLabel = document.createElement("span"); targetLabel.className = "target-label"; targetLabel.textContent = activity.target.label;
  target.append(targetLabel, renderVisual(activity.target.visualId, { className: "target-visual", size: "target", decorative: true })); target.setAttribute("aria-label", `Drop ${activity.draggable.label} on ${activity.target.label}`);
  const feedback = feedbackLine(); let origin = null; let placed = false;
  const restore = () => { draggable.style.cssText = ""; draggable.className = "drag-object"; };
  const drop = (x, y) => { const box = target.getBoundingClientRect(); if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) { placed = true; draggable.style.display = "none"; const placedVisual = renderVisual(activity.draggable.visualId, { className: "placed-visual", size: "placed", decorative: true }); target.append(placedVisual); correct(card, target, feedback, api.complete, "Great!"); } else { restore(); feedback.className = "feedback incorrect"; feedback.textContent = "Try again."; window.setTimeout(() => feedback.textContent = "", 650); } };
  draggable.addEventListener("pointerdown", (event) => { if (placed) return; origin = { x: event.clientX, y: event.clientY }; draggable.setPointerCapture(event.pointerId); draggable.style.position = "fixed"; draggable.style.zIndex = "5"; draggable.style.pointerEvents = "none"; });
  draggable.addEventListener("pointermove", (event) => { if (!origin || placed) return; draggable.style.left = `${event.clientX - 59}px`; draggable.style.top = `${event.clientY - 59}px`; target.classList.toggle("over", document.elementFromPoint(event.clientX, event.clientY)?.closest(".drop-target") === target); });
  draggable.addEventListener("pointerup", (event) => { if (!origin || placed) return; origin = null; target.classList.remove("over"); drop(event.clientX, event.clientY); });
  draggable.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); const rect = target.getBoundingClientRect(); drop(rect.left + rect.width / 2, rect.top + rect.height / 2); } });
  card.append(replayButton, draggable, target, feedback); stage.append(card);
}
