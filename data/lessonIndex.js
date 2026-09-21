import { helloLesson } from "./lessons/hello.js";
import { coloursLesson } from "./lessons/colours.js";

export const lessons = [
  helloLesson,
  coloursLesson,
  { id: "numbers", lessonNumber: 3, title: "Numbers", icon: "🔢", locked: true },
  { id: "body", lessonNumber: 4, title: "Body", icon: "🖐️", locked: true },
];

export const getLesson = (id) => lessons.find((lesson) => lesson.id === id);
