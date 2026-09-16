import { state, resetAll, resetLesson } from "../store.js";
import { replay, toggleSound } from "../audio.js";

export function openTeacherPanel({ lesson, activity, onPrevious, onNext, onMarkCorrect, onTryAgain, onClose, onHome }) {
  document.querySelector(".teacher-overlay")?.remove();
  const overlay = document.createElement("div"); overlay.className = "teacher-overlay";
  const position = state.lessonPositions[lesson.id] ?? 0;
  const note = activity.teacherNote ? `<section class="teacher-note"><h3>Teacher note</h3><p>${activity.teacherNote}</p>${activity.teacherChecks ? `<p><strong>Observe:</strong> ${activity.teacherChecks}</p>` : ""}</section>` : "";
  overlay.innerHTML = `<aside class="teacher-drawer" role="dialog" aria-modal="true" aria-label="Teacher controls"><button class="drawer-close" type="button" aria-label="Close teacher controls">×</button><h2>Teacher controls</h2><p class="teacher-meta">Current Activity: ${position + 1} — ${activity.type}</p>${note}<div class="teacher-grid"><button class="teacher-action" data-action="previous">Previous</button><button class="teacher-action" data-action="next">Next</button><button class="teacher-action" data-action="replay">Replay</button><button class="teacher-action" data-action="sound">Sound ${state.soundOn ? "On" : "Off"}</button><button class="teacher-action success" data-action="correct">Mark Correct</button><button class="teacher-action primary" data-action="again">Try Again</button><button class="teacher-action wide" data-action="reset-lesson">Reset Lesson</button><button class="teacher-action wide" data-action="reset-all">Reset All Progress</button></div></aside>`;
  const close = () => { overlay.remove(); onClose?.(); };
  overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
  overlay.querySelector(".drawer-close").addEventListener("click", close);
  overlay.querySelector(".teacher-grid").addEventListener("click", (event) => {
    const action = event.target.dataset.action; if (!action) return;
    if (action === "previous") { close(); onPrevious(); }
    if (action === "next") { close(); onNext(); }
    if (action === "replay") replay(activity);
    if (action === "sound") { toggleSound(); openTeacherPanel({ lesson, activity, onPrevious, onNext, onMarkCorrect, onTryAgain, onClose, onHome }); }
    if (action === "correct") { close(); onMarkCorrect(); }
    if (action === "again") { close(); onTryAgain(); }
    if (action === "reset-lesson") { resetLesson(lesson.id); close(); onHome(); }
    if (action === "reset-all") { resetAll(); close(); onHome(); }
  });
}
