import { getVisual } from "../../data/visuals.js";

const NESTED_VISUAL_FIELDS = new Set(["options", "items"]);

export function validateLesson(lesson, { strict = false } = {}) {
  const issues = [];
  if (!lesson?.id || !Array.isArray(lesson.activities)) issues.push("Lesson requires an id and activities array.");
  lesson?.activities?.forEach((activity) => validateActivity(activity, issues, `lesson ${lesson.id}`));
  issues.forEach((issue) => strict ? console.error(`[Lesson validation] ${issue}`) : console.warn(`[Lesson validation] ${issue}`));
  return issues;
}

export function validateLessons(lessons, options) { return lessons.flatMap((lesson) => validateLesson(lesson, options)); }

function validateActivity(activity, issues, location) {
  if (!activity?.id || !activity?.type) { issues.push(`${location}: activity requires id and type.`); return; }
  validateVisualReference(activity.visualId, issues, `${location}/${activity.id}`);
  for (const field of NESTED_VISUAL_FIELDS) activity[field]?.forEach((item) => validateVisualReference(item.visualId, issues, `${location}/${activity.id}/${field}`));
  validateVisualReference(activity.draggable?.visualId, issues, `${location}/${activity.id}/draggable`);
  validateVisualReference(activity.target?.visualId, issues, `${location}/${activity.id}/target`);
  if (["learn", "speakPrompt", "actionPrompt", "writingPrompt"].includes(activity.type)) requireVisual(activity.visualId, issues, `${location}/${activity.id}`);
  if (["tapChoice", "listenChoose"].includes(activity.type)) activity.options?.forEach((item) => requireVisual(item.visualId, issues, `${location}/${activity.id}/options`));
  if (activity.type === "review") activity.items?.forEach((item) => requireVisual(item.visualId, issues, `${location}/${activity.id}/items`));
  if (activity.type === "dragDrop") { requireVisual(activity.draggable?.visualId, issues, `${location}/${activity.id}/draggable`); requireVisual(activity.target?.visualId, issues, `${location}/${activity.id}/target`); }
  if (activity.type === "challenge") activity.items?.forEach((item) => validateActivity(item, issues, `${location}/${activity.id}/challenge`));
}

function requireVisual(visualId, issues, location) { if (!visualId) issues.push(`${location}: formal teaching activity requires a visualId.`); }

function validateVisualReference(visualId, issues, location) {
  if (!visualId) return;
  const visual = getVisual(visualId);
  if (!visual) { issues.push(`${location}: visualId "${visualId}" does not exist.`); return; }
  for (const field of ["id", "concept", "alt", "src", "type"]) if (!visual[field]) issues.push(`${location}: visual "${visualId}" is missing ${field}.`);
  if (visual.approved !== true) issues.push(`${location}: visual "${visualId}" is not approved.`);
}
