import { helloLesson } from "./lessons/hello.js";
import { coloursLesson } from "./lessons/colours.js";
import { numbersLesson } from "./lessons/numbers.js";
import { bodyLesson } from "./lessons/body.js";

export const lessons = [
  helloLesson,
  coloursLesson,
  numbersLesson,
  bodyLesson,
];

export const getLesson = (id) => lessons.find((lesson) => lesson.id === id);
