import { helloLesson } from "./lessons/hello.js";
import { coloursLesson } from "./lessons/colours.js";
import { numbersLesson } from "./lessons/numbers.js";

export const lessons = [
  helloLesson,
  coloursLesson,
  numbersLesson,
  { id: "body", lessonNumber: 4, title: "Body", icon: "🖐️", locked: true },
];

export const getLesson = (id) => lessons.find((lesson) => lesson.id === id);
