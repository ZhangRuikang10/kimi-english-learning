import { activityDone } from "../store.js";

export function progress(lesson) {
  const done = lesson.activities.filter((activity) => activityDone(lesson.id, activity.id)).length;
  const total = lesson.activities.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const wrap = document.createElement("div"); wrap.className = "progress"; wrap.setAttribute("aria-label", `${done} of ${total} complete`);
  wrap.innerHTML = `<span class="sr-only">${done} of ${total} complete</span><div class="progress-dots">${lesson.activities.map((_, index) => `<span class="progress-dot ${index < done ? "done" : ""}"></span>`).join("")}</div><div class="progress-bar" aria-hidden="true"><span class="progress-bar-fill" style="width:${percent}%"></span></div>`;
  return wrap;
}
