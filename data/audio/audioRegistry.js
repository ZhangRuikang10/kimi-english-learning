const LESSON_01_BASE = "assets/audio/lesson-01/mp3/";
const LESSON_02_BASE = "assets/audio/lesson-02/mp3/";
export function normalizeAudioText(text) {
  return String(text ?? "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u2026/g, "...")
    .toLowerCase()
    .replace(/[.!?,;:]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const lesson01Entries = [
  ["Listen.", "listen.mp3"],
  ["Listen. Then do it!", "listen-then-do-it.mp3"],
  ["Hello!", "hello.mp3"],
  ["Hi!", "hi.mp3"],
  ["Goodbye!", "goodbye.mp3"],
  ["What's your name?", "whats-your-name.mp3"],
  ["My name is ...", "my-name-is.mp3"],
  ["My name is Tom.", "my-name-is-tom.mp3"],
  ["Who is Tom?", "who-is-tom.mp3"],
  ["How old are you?", "how-old-are-you.mp3"],
  ["I'm five.", "im-five.mp3"],
  ["I'm six.", "im-six.mp3"],
  ["Five or six?", "five-or-six.mp3"],
  ["Boy.", "boy.mp3"],
  ["Girl.", "girl.mp3"],
  ["Boy or girl?", "boy-or-girl.mp3"],
  ["Are you a boy or a girl?", "are-you-a-boy-or-a-girl.mp3"],
  ["I'm a boy.", "im-a-boy.mp3"],
  ["I'm a girl.", "im-a-girl.mp3"],
  ["My name is Kimi. I'm six. I'm a boy.", "about-me-kimi.mp3"],
  ["Happy.", "happy.mp3"],
  ["Sad.", "sad.mp3"],
  ["Tired.", "tired.mp3"],
  ["Where is tired?", "where-is-tired.mp3"],
  ["How are you?", "how-are-you.mp3"],
  ["I'm happy.", "im-happy.mp3"],
  ["I'm sad.", "im-sad.mp3"],
  ["I'm tired.", "im-tired.mp3"],
  ["How is she?", "how-is-she.mp3"],
  ["She is happy.", "she-is-happy.mp3"],
  ["Stand up.", "stand-up.mp3"],
  ["Sit down.", "sit-down.mp3"],
  ["Stand or sit?", "stand-or-sit.mp3"],
  ["Look.", "look.mp3"],
  ["Look or listen?", "look-or-listen.mp3"],
  ["Point.", "point.mp3"],
  ["Touch.", "touch.mp3"],
  ["Point or touch?", "point-or-touch.mp3"],
  ["Show me.", "show-me.mp3"],
  ["Point to the ball.", "point-to-the-ball.mp3"],
  ["Touch the table.", "touch-the-table.mp3"],
  ["Give me the ball.", "give-me-the-ball.mp3"],
  ["Take the ball.", "take-the-ball.mp3"],
  ["Give or take?", "give-or-take.mp3"],
  ["Find red.", "find-red.mp3"],
  ["Touch blue.", "touch-blue.mp3"],
  ["Point to yellow.", "point-to-yellow.mp3"],
  ["Show me green.", "show-me-green.mp3"],
  ["Touch green.", "touch-green.mp3"],
  ["Point to red.", "point-to-red.mp3"],
  ["Show me blue.", "show-me-blue.mp3"],
  ["Show me yellow.", "show-me-yellow.mp3"],
  ["Touch red.", "touch-red.mp3"],
  ["Point to blue.", "point-to-blue.mp3"],
  ["Find three.", "find-three.mp3"],
  ["Touch five.", "touch-five.mp3"],
  ["How many?", "how-many.mp3"],
  ["One.", "one.mp3"],
  ["Two.", "two.mp3"],
  ["Three.", "three.mp3"],
  ["Three balls.", "three-balls.mp3"],
  ["Four.", "four.mp3"],
  ["Four stars.", "four-stars.mp3"],
  ["Point to five.", "point-to-five.mp3"],
  ["Show me two.", "show-me-two.mp3"],
  ["Touch three.", "touch-three.mp3"],
  ["Come here.", "come-here.mp3"],
  ["Stop.", "stop.mp3"],
  ["Go.", "go.mp3"],
  ["Show me three.", "show-me-three.mp3"],
  ["Sit down and point to blue.", "sit-down-and-point-to-blue.mp3"],
  ["Stand up and show me three.", "stand-up-and-show-me-three.mp3"],
  ["Stand up and touch red.", "stand-up-and-touch-red.mp3"],
  ["Find A.", "find-a.mp3"],
  ["Find B.", "find-b.mp3"],
  ["Find C.", "find-c.mp3"],
  ["Find D.", "find-d.mp3"],
  ["Find E.", "find-e.mp3"],
  ["Use your paper and pencil.", "use-your-paper-and-pencil.mp3"],
  ["Write your name.", "write-your-name.mp3"],
  ["Copy A on your paper.", "copy-a-on-your-paper.mp3"],
  ["Write A.", "write-a.mp3"],
  ["What colour is it?", "what-colour-is-it.mp3"],
  ["Red.", "red.mp3"],
  ["Blue.", "blue.mp3"],
  ["Yellow.", "yellow.mp3"],
  ["Green.", "green.mp3"],
  ["It's red.", "its-red.mp3"],
  ["Five.", "five.mp3"],
  ["Five balls.", "five-balls.mp3"],
  ["Point to three.", "point-to-three.mp3"],
  ["Show me red.", "show-me-red.mp3"],
];

export const lesson02Entries = [
  ["Orange.", "orange.mp3"], ["Pink.", "pink.mp3"], ["Purple.", "purple.mp3"], ["Black.", "black.mp3"], ["White.", "white.mp3"], ["Brown.", "brown.mp3"],
  ["Find purple.", "find-purple.mp3"], ["Touch orange.", "touch-orange.mp3"], ["Point to black.", "point-to-black.mp3"], ["Show me pink.", "show-me-pink.mp3"],
  ["What colour is it? It's red.", "what-colour-is-it-it-s-red.mp3"],
  ["Red ball.", "red-ball.mp3"], ["Blue ball.", "blue-ball.mp3"], ["Yellow ball.", "yellow-ball.mp3"], ["Green ball.", "green-ball.mp3"], ["Orange ball.", "orange-ball.mp3"], ["Pink ball.", "pink-ball.mp3"], ["Purple ball.", "purple-ball.mp3"], ["Black ball.", "black-ball.mp3"], ["White ball.", "white-ball.mp3"], ["Brown ball.", "brown-ball.mp3"],
  ["Find the red ball.", "find-the-red-ball.mp3"], ["Touch the blue ball.", "touch-the-blue-ball.mp3"], ["Point to the yellow ball.", "point-to-the-yellow-ball.mp3"], ["Find the purple ball.", "find-the-purple-ball.mp3"],
  ["A red ball.", "a-red-ball.mp3"], ["A blue pencil.", "a-blue-pencil.mp3"], ["A yellow star.", "a-yellow-star.mp3"], ["A green apple.", "a-green-apple.mp3"], ["A pink bag.", "a-pink-bag.mp3"],
  ["Find the blue pencil.", "find-the-blue-pencil.mp3"], ["Touch the green apple.", "touch-the-green-apple.mp3"], ["Point to the yellow star.", "point-to-the-yellow-star.mp3"],
  ["What colour is the ball? It's red.", "what-colour-is-the-ball-it-s-red.mp3"], ["What colour is the bag? It's pink.", "what-colour-is-the-bag-it-s-pink.mp3"], ["It's a red ball.", "it-s-a-red-ball.mp3"],
  ["Find something red.", "find-something-red.mp3"], ["Touch something blue.", "touch-something-blue.mp3"], ["Show me something green.", "show-me-something-green.mp3"], ["Find something black.", "find-something-black.mp3"],
  ["Which one is the same colour as the red ball?", "which-one-is-the-same-colour-as-the-red-ball.mp3"], ["Which one is different?", "which-one-is-different.mp3"], ["Which one belongs with the red things?", "which-one-belongs-with-the-red-things.mp3"], ["Which one starts with the b sound?", "which-one-starts-with-the-b-sound.mp3"],
  ["Write red.", "write-red.mp3"], ["Write blue.", "write-blue.mp3"], ["Touch the red ball.", "touch-the-red-ball.mp3"], ["Point to the blue pencil.", "point-to-the-blue-pencil.mp3"], ["Show me the green apple.", "show-me-the-green-apple.mp3"], ["Touch the red ball and point to the blue pencil.", "touch-the-red-ball-and-point-to-the-blue-pencil.mp3"],
];

const teachingAudioRegistry = new Map(
  lesson01Entries.map(([text, file]) => [
    normalizeAudioText(text),
    LESSON_01_BASE + file,
  ]).concat(lesson02Entries.map(([text, file]) => [
    normalizeAudioText(text),
    LESSON_02_BASE + file,
  ]))
);

export function resolveTeachingAudio(text) {
  if (!text) return null;
  return teachingAudioRegistry.get(normalizeAudioText(text)) ?? null;
}

export function hasTeachingAudio(text) {
  return Boolean(resolveTeachingAudio(text));
}
