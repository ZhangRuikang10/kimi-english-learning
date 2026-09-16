const STORAGE_KEY = "english-adventure-progress";
const defaults = () => ({ currentLesson: "hello", lessonPositions: { hello: 0 }, lessonProgress: {}, completedLessons: {}, soundOn: true });

function read() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const positions = { ...(stored.lessonPositions || {}) };
    if (Number.isInteger(stored.currentActivity) && !Number.isInteger(positions[stored.currentLesson || "hello"])) positions[stored.currentLesson || "hello"] = stored.currentActivity;
    delete stored.currentActivity;
    return { ...defaults(), ...stored, lessonPositions: { ...defaults().lessonPositions, ...positions } };
  }
  catch { return defaults(); }
}

export const state = read();
export function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
export function patch(values) { Object.assign(state, values); save(); }
export function lessonPosition(lessonId) { return state.lessonPositions[lessonId] ?? 0; }
export function setLessonPosition(lessonId, position) { state.lessonPositions[lessonId] = Math.max(0, position); save(); }
export function openLesson(lessonId) { state.currentLesson = lessonId; if (!Number.isInteger(state.lessonPositions[lessonId])) state.lessonPositions[lessonId] = 0; save(); }
export function activityDone(lessonId, activityId) { return Boolean(state.lessonProgress[lessonId]?.includes(activityId)); }
export function markActivityDone(lessonId, activityId) {
  const done = new Set(state.lessonProgress[lessonId] || []); done.add(activityId);
  state.lessonProgress[lessonId] = [...done]; save();
}
export function resetLesson(lessonId) { state.currentLesson = lessonId; state.lessonPositions[lessonId] = 0; delete state.lessonProgress[lessonId]; delete state.completedLessons[lessonId]; save(); }
export function resetAll() { Object.assign(state, defaults()); save(); }
