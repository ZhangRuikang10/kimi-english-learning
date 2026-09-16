import { getLesson, lessons } from "../data/lessonIndex.js";
import { replay } from "./audio.js";
import { activityDone, lessonPosition, markActivityDone, openLesson, patch, resetLesson, setLessonPosition, state } from "./store.js";
import { lessonCard } from "./components/lessonCard.js";
import { progress } from "./components/progress.js";
import { openTeacherPanel } from "./components/teacherPanel.js";
import { renderActivity } from "./activities/renderer.js";
import { validateLesson } from "./validation/lessonValidator.js";

const app = document.querySelector("#app");
let page = "home";
let longPress = null;
const lesson = () => getLesson(state.currentLesson);
const activityIndex = () => lessonPosition(state.currentLesson);
const activity = () => lesson().activities[activityIndex()];

export function showHome() {
  page = "home"; document.querySelector(".teacher-overlay")?.remove(); app.replaceChildren();
  const home = document.createElement("section"); home.className = "home";
  const brand = document.createElement("h1"); brand.className = "brand"; brand.textContent = "English Adventure";
  const grid = document.createElement("div"); grid.className = "lesson-grid";
  lessons.forEach((item) => grid.append(lessonCard(item, () => { openLesson(item.id); showPlayer(); }, Boolean(state.completedLessons[item.id]))));
  home.append(brand, grid); app.append(home);
}

export function showPlayer() {
  page = "player"; const currentLesson = lesson(); const currentActivity = activity();
  if (!currentLesson || !currentActivity) return showHome();
  validateLesson(currentLesson, { strict: true });
  app.replaceChildren(); const player = document.createElement("section"); player.className = "player";
  const header = document.createElement("header"); header.className = "topbar";
  const back = button("←", "Back to lessons", "icon-button");
  const title = document.createElement("div"); title.className = "lesson-title"; title.textContent = currentLesson.title; title.setAttribute("aria-label", "Press and hold for teacher controls");
  header.append(back, title, progress(currentLesson));
  const stage = document.createElement("section"); stage.className = "stage"; stage.setAttribute("aria-label", "Learning activity");
  const footer = document.createElement("footer"); footer.className = "bottom-controls";
  const previous = button("‹", "Previous", "nav-button"); previous.innerHTML = '<span aria-hidden="true">‹</span><span>Previous</span>';
  const replayButton = button("🔊", "Replay audio", "replay-button");
  const next = button("›", "Next", "nav-button next"); next.innerHTML = '<span>Next</span><span aria-hidden="true">›</span>';
  const center = document.createElement("div"); center.className = "bottom-center"; center.append(replayButton); footer.append(previous, center, next); player.append(header, stage, footer); app.append(player);
  const complete = () => { markActivityDone(currentLesson.id, currentActivity.id); next.disabled = false; };
  renderActivity(stage, currentActivity, { complete });
  back.addEventListener("click", showHome); replayButton.addEventListener("click", () => replay(currentActivity)); previous.addEventListener("click", previousActivity); next.addEventListener("click", nextActivity); next.disabled = !activityDone(currentLesson.id, currentActivity.id);
  const openTeacher = () => openTeacherPanel({ lesson: currentLesson, activity: currentActivity, onPrevious: previousActivity, onNext: teacherNext, onMarkCorrect: markCorrect, onTryAgain: showPlayer, onClose: () => {}, onHome: showHome });
  title.addEventListener("pointerdown", () => { longPress = window.setTimeout(openTeacher, 1500); });
  ["pointerup", "pointerleave", "pointercancel"].forEach((event) => title.addEventListener(event, () => window.clearTimeout(longPress)));
}

export function nextActivity() {
  const currentLesson = lesson(); const currentActivity = activity();
  if (!activityDone(currentLesson.id, currentActivity.id)) return;
  goNext(false);
}
export function previousActivity() { if (activityIndex() === 0) return showHome(); setLessonPosition(state.currentLesson, activityIndex() - 1); showPlayer(); }
export function markCorrect() { const currentLesson = lesson(); const currentActivity = activity(); markActivityDone(currentLesson.id, currentActivity.id); showPlayer(); }
export function teacherNext() { goNext(true); }
function goNext(force) {
  const currentLesson = lesson(); const currentActivity = activity();
  if (!force && !activityDone(currentLesson.id, currentActivity.id)) return;
  if (activityIndex() >= currentLesson.activities.length - 1) { state.completedLessons[currentLesson.id] = true; patch({}); return showFinish(); }
  setLessonPosition(currentLesson.id, activityIndex() + 1); showPlayer();
}
export function showFinish() {
  page = "finish"; document.querySelector(".teacher-overlay")?.remove();
  app.innerHTML = '<section class="finish"><div class="finish-card"><div class="stars" aria-hidden="true">★ ★ ★</div><h1>Great job!</h1><div class="finish-actions"><button class="nav-button" type="button" data-finish="home">Home</button><button class="nav-button next" type="button" data-finish="again">Again</button></div></div></section>';
  app.querySelector('[data-finish="home"]').addEventListener("click", showHome);
  app.querySelector('[data-finish="again"]').addEventListener("click", () => { resetLesson(lesson().id); showPlayer(); });
}
export function openTeacherFromShortcut() {
  if (page !== "player") return; const currentLesson = lesson(); const currentActivity = activity();
  openTeacherPanel({ lesson: currentLesson, activity: currentActivity, onPrevious: previousActivity, onNext: teacherNext, onMarkCorrect: markCorrect, onTryAgain: showPlayer, onClose: () => {}, onHome: showHome });
}
function button(text, label, className) { const element = document.createElement("button"); element.type = "button"; element.className = className; element.textContent = text; element.setAttribute("aria-label", label); return element; }
