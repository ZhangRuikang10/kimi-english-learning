export function lessonCard(lesson, onOpen, completed = false) {
  const card = document.createElement("button"); card.type = "button"; card.className = `lesson-card ${lesson.locked ? "locked" : ""} ${completed ? "completed" : ""}`; card.disabled = Boolean(lesson.locked);
  card.innerHTML = `<span class="lesson-icon" aria-hidden="true">${lesson.icon}</span><span><span class="lesson-label">Lesson ${lesson.lessonNumber}</span><span class="lesson-name">${lesson.title}</span></span><span class="status">${lesson.locked ? "Locked" : completed ? "Completed" : "Ready"}</span>`;
  if (!lesson.locked) card.addEventListener("click", onOpen); return card;
}
