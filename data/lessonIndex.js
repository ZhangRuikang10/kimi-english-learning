import { helloLesson } from "./lessons/hello.js";

export const lessons = [
  helloLesson,
  { id: "colours", lessonNumber: 2, title: "Colours", icon: "🎨", locked: true },
  { id: "numbers", lessonNumber: 3, title: "Numbers", icon: "🔢", locked: true },
  { id: "body", lessonNumber: 4, title: "Body", icon: "🖐️", locked: true },
];

export const getLesson = (id) => lessons.find((lesson) => lesson.id === id);
