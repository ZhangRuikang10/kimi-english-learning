import { openTeacherFromShortcut, showHome } from "./router.js";
import { lessons } from "../data/lessonIndex.js";
import { validateLessons } from "./validation/lessonValidator.js";

validateLessons(lessons.filter((lesson) => Array.isArray(lesson.activities)), { strict: true });

document.addEventListener("keydown", (event) => {
  if (event.shiftKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "t") { event.preventDefault(); openTeacherFromShortcut(); }
});
showHome();
