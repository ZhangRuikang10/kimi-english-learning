const choice = (id, visualId, label) => ({ id, visualId, label });
const colour = (name) => choice(name, `l2-colour-${name}`, name[0].toUpperCase() + name.slice(1));
const ball = (name) => choice(name, `ball-${name}`, `${name[0].toUpperCase() + name.slice(1)} ball`);
const listenChoice = (id, ttsText, options, correctAnswer, teacherNote = "") => ({ id, type: "listenChoose", title: "Listen.", audioSrc: null, ttsText, showLabels: false, options, correctAnswer, teacherNote });
const action = (id, ttsText, visualId, teacherNote = "", teacherChecks = "", hideNestedHeader = false) => ({ id, type: "actionPrompt", title: "Listen and do!", childPrompt: "Listen. Then do it!", audioSrc: null, ttsText, visualId, teacherNote, teacherChecks, hideNestedHeader });
const speak = (id, title, prompt, visualId, ttsText = title, teacherNote = "", teacherChecks = "") => ({ id, type: "speakPrompt", title, prompt, visualId, completeLabel: "I said it!", audioSrc: null, ttsText, teacherNote, teacherChecks });
const learn = (id, title, visualId, ttsText = title, teacherNote = "") => ({ id, type: "learn", title, visualId, audioSrc: null, ttsText, teacherNote });
const reviewItem = (name) => ({ visualId: `l2-colour-${name}`, text: name[0].toUpperCase() + name.slice(1), ttsText: `${name[0].toUpperCase() + name.slice(1)}.` });

const oldColours = ["red", "blue", "yellow", "green"];
const setOneColours = ["orange", "pink", "purple"];
const setTwoColours = ["black", "white", "brown"];
const allColours = [...oldColours, ...setOneColours, ...setTwoColours];
const colourBalls = allColours.map((name) => ({ visualId: `ball-${name}`, text: `${name[0].toUpperCase() + name.slice(1)} ball`, ttsText: `${name[0].toUpperCase() + name.slice(1)} ball.` }));
const colourObjects = [
  { visualId: "ball-red", text: "A red ball", ttsText: "A red ball." },
  { visualId: "pencil-blue", text: "A blue pencil", ttsText: "A blue pencil." },
  { visualId: "star-yellow", text: "A yellow star", ttsText: "A yellow star." },
  { visualId: "apple-green", text: "A green apple", ttsText: "A green apple." },
  { visualId: "bag-pink", text: "A pink bag", ttsText: "A pink bag." }
];

export const coloursLesson = {
  id: "colours",
  lessonNumber: 2,
  title: "Colours",
  icon: "🎨",
  activities: [
    speak("01-hello", "Hello!", "Hello!", "waving-child", "Hello!"),
    speak("02-name", "What's your name?", "My name is …", "speaking-child", "What's your name?"),
    speak("03-age", "How old are you?", "I'm five. / I'm six.", "speaking-child", "How old are you?"),
    speak("04-feeling", "How are you?", "I'm happy. / I'm sad. / I'm tired.", "happy-face", "How are you?"),
    { id: "05-listen-and-do", type: "challenge", title: "Listen and do!", items: [action("05a-stand", "Stand up.", "child-standing", "", "", true), action("05b-sit", "Sit down.", "child-sitting", "", "", true), action("05c-look", "Look.", "child-looking", "", "", true), action("05d-listen", "Listen.", "child-listening", "", "", true)] },
    { id: "06-point-or-touch", type: "challenge", title: "Point or touch?", items: [listenChoice("06a-point", "Point.", [choice("point", "child-pointing", "Point"), choice("touch", "child-touching", "Touch")], "point"), listenChoice("06b-touch", "Touch.", [choice("point", "child-pointing", "Point"), choice("touch", "child-touching", "Touch")], "touch"), listenChoice("06c-touch", "Touch.", [choice("point", "child-pointing", "Point"), choice("touch", "child-touching", "Touch")], "touch"), listenChoice("06d-point", "Point.", [choice("point", "child-pointing", "Point"), choice("touch", "child-touching", "Touch")], "point")] },
    { id: "07-old-colours-review", type: "review", title: "Colour quick review", items: oldColours.map(reviewItem) },
    listenChoice("08-find-red", "Find red.", oldColours.map(colour), "red"),
    listenChoice("09-touch-blue", "Touch blue.", oldColours.map(colour), "blue"),
    listenChoice("10-point-yellow", "Point to yellow.", oldColours.map(colour), "yellow"),
    listenChoice("11-show-green", "Show me green.", oldColours.map(colour), "green"),
    learn("12-orange", "Orange.", "l2-colour-orange"),
    learn("13-pink", "Pink.", "l2-colour-pink"),
    learn("14-purple", "Purple.", "l2-colour-purple"),
    { id: "15-new-colours-one", type: "challenge", title: "New colours: listen!", items: [listenChoice("15a-orange", "Orange.", setOneColours.map(colour), "orange"), listenChoice("15b-pink", "Pink.", setOneColours.map(colour), "pink"), listenChoice("15c-purple", "Purple.", setOneColours.map(colour), "purple")] },
    learn("16-black", "Black.", "l2-colour-black"),
    learn("17-white", "White.", "l2-colour-white"),
    learn("18-brown", "Brown.", "l2-colour-brown"),
    { id: "19-new-colours-two", type: "challenge", title: "Black / White / Brown listening", items: [listenChoice("19a-black", "Black.", setTwoColours.map(colour), "black"), listenChoice("19b-white", "White.", setTwoColours.map(colour), "white"), listenChoice("19c-brown", "Brown.", setTwoColours.map(colour), "brown")] },
    { id: "20-new-colours-review", type: "review", title: "New colours", items: [...setOneColours, ...setTwoColours].map(reviewItem) },
    listenChoice("21-find-purple", "Find purple.", [...setOneColours, "blue"].map(colour), "purple"),
    listenChoice("22-touch-orange", "Touch orange.", ["orange", "yellow", "brown", "pink"].map(colour), "orange"),
    listenChoice("23-point-black", "Point to black.", ["black", "white", "blue", "purple"].map(colour), "black"),
    listenChoice("24-show-pink", "Show me pink.", ["pink", "red", "purple", "orange"].map(colour), "pink"),
    { id: "25-ten-colours-review", type: "review", title: "Ten colours", items: allColours.map(reviewItem) },
    { id: "26-colour-listening-mix-one", type: "challenge", title: "Colour listening mix 1", items: [listenChoice("26a-red", "Red.", ["red", "purple", "yellow", "brown"].map(colour), "red"), listenChoice("26b-purple", "Purple.", ["red", "purple", "yellow", "brown"].map(colour), "purple"), listenChoice("26c-yellow", "Yellow.", ["red", "purple", "yellow", "brown"].map(colour), "yellow"), listenChoice("26d-brown", "Brown.", ["red", "purple", "yellow", "brown"].map(colour), "brown")] },
    { id: "27-colour-listening-mix-two", type: "challenge", title: "Colour listening mix 2", items: [listenChoice("27a-orange", "Orange.", ["orange", "brown", "red", "pink"].map(colour), "orange"), listenChoice("27b-brown", "Brown.", ["orange", "brown", "red", "pink"].map(colour), "brown"), listenChoice("27c-red", "Red.", ["orange", "brown", "red", "pink"].map(colour), "red"), listenChoice("27d-pink", "Pink.", ["orange", "brown", "red", "pink"].map(colour), "pink")] },
    { id: "28-colour-listening-mix-three", type: "challenge", title: "Colour listening mix 3", items: [listenChoice("28a-black", "Black.", ["black", "white", "blue", "purple"].map(colour), "black"), listenChoice("28b-white", "White.", ["black", "white", "blue", "purple"].map(colour), "white"), listenChoice("28c-green", "Green.", ["green", "yellow", "blue", "purple"].map(colour), "green"), listenChoice("28d-yellow", "Yellow.", ["green", "yellow", "blue", "purple"].map(colour), "yellow")] },
    speak("29-what-colour-red", "What colour is it?", "It's red.", "ball-red", "What colour is it? It's red.", "Model the whole question-and-answer exchange before the child repeats."),
    speak("30-what-colour-blue", "What colour is it?", "It's ______.", "ball-blue", "What colour is it?", "Teacher expects: It's blue."),
    speak("31-what-colour-yellow", "What colour is it?", "It's ______.", "ball-yellow", "What colour is it?", "Teacher expects: It's yellow."),
    speak("32-what-colour-orange", "What colour is it?", "It's ______.", "ball-orange", "What colour is it?", "Teacher expects: It's orange."),
    speak("33-what-colour-purple", "What colour is it?", "It's ______.", "ball-purple", "What colour is it?", "Teacher expects: It's purple."),
    speak("34-what-colour-brown", "What colour is it?", "It's ______.", "ball-brown", "What colour is it?", "Teacher expects: It's brown."),
    { id: "35-colour-balls", type: "review", title: "Colour balls", items: colourBalls },
    listenChoice("36-find-red-ball", "Find the red ball.", [ball("red"), ball("blue"), ball("yellow"), ball("green")], "red"),
    listenChoice("37-touch-blue-ball", "Touch the blue ball.", [ball("red"), ball("blue"), ball("yellow"), ball("green")], "blue"),
    listenChoice("38-point-yellow-ball", "Point to the yellow ball.", [ball("red"), ball("blue"), ball("yellow"), ball("green")], "yellow"),
    listenChoice("39-find-purple-ball", "Find the purple ball.", [ball("purple"), ball("pink"), ball("black"), ball("brown")], "purple"),
    { id: "40-colour-and-object", type: "review", title: "Colour and object", items: colourObjects },
    listenChoice("41-find-blue-pencil", "Find the blue pencil.", [choice("pencil-blue", "pencil-blue", "Blue pencil"), choice("ball-blue", "ball-blue", "Blue ball"), choice("bag-blue", "bag-blue", "Blue bag"), choice("star-yellow", "star-yellow", "Yellow star")], "pencil-blue"),
    listenChoice("42-touch-green-apple", "Touch the green apple.", [choice("apple-green", "apple-green", "Green apple"), choice("apple-red", "apple-red", "Red apple"), choice("ball-green", "ball-green", "Green ball"), choice("bag-pink", "bag-pink", "Pink bag")], "apple-green"),
    listenChoice("43-point-yellow-star", "Point to the yellow star.", [choice("star-yellow", "star-yellow", "Yellow star"), choice("star-red", "star-red", "Red star"), choice("ball-yellow", "ball-yellow", "Yellow ball"), choice("pencil-blue", "pencil-blue", "Blue pencil")], "star-yellow"),
    speak("44-ball-question", "What colour is the ball?", "It's red.", "ball-red", "What colour is the ball? It's red."),
    speak("45-bag-question", "What colour is the bag?", "It's pink.", "bag-pink", "What colour is the bag? It's pink."),
    { id: "46-build-it", type: "challenge", title: "Build it!", items: [learn("46a-red", "Red.", "ball-red"), learn("46b-red-ball", "Red ball.", "ball-red"), learn("46c-a-red-ball", "A red ball.", "ball-red"), speak("46d-its-a-red-ball", "It's a red ball.", "It's a red ball.", "ball-red", "It's a red ball.")] },
    { id: "47-colour-hunt", type: "challenge", title: "Colour Hunt", teacherNote: "These are real-world tasks. Observe the child, then let them tap I did it.", items: [action("47a-find-red", "Find something red.", "l2-colour-red"), action("47b-touch-blue", "Touch something blue.", "l2-colour-blue"), action("47c-show-green", "Show me something green.", "l2-colour-green"), action("47d-find-black", "Find something black.", "l2-colour-black")] },
    { id: "48-think-with-colours", type: "challenge", title: "Think with colours", items: [listenChoice("48a-same-colour", "Which one is the same colour as the red ball?", [choice("apple-red", "apple-red", "Red apple"), choice("pencil-blue", "pencil-blue", "Blue pencil"), choice("star-yellow", "star-yellow", "Yellow star")], "apple-red"), listenChoice("48b-different", "Which one is different?", [choice("ball-red", "ball-red", "Red ball"), choice("apple-red", "apple-red", "Red apple"), choice("star-red", "star-red", "Red star"), choice("bag-blue", "bag-blue", "Blue bag")], "bag-blue"), listenChoice("48c-red-things", "Which one belongs with the red things?", [choice("apple-red", "apple-red", "Red apple"), choice("ball-blue", "ball-blue", "Blue ball"), choice("star-yellow", "star-yellow", "Yellow star"), choice("bag-pink", "bag-pink", "Pink bag")], "apple-red")] },
    { id: "49-read-it", type: "challenge", title: "Read it!", teacherNote: "For 49a–49c, test reading without clicking Replay. The replay control exists only because this uses the standard activity component.", items: [
      { id: "49a-read-red", type: "tapChoice", title: "red", audioSrc: null, audioEnabled: false, audioDisposition: "INTENTIONALLY_SILENT", silenceReason: "Early reading comprehension — audio would reveal the answer.", showLabels: false, options: [colour("red"), colour("blue"), colour("green")], correctAnswer: "red", teacherNote: "Reading check: the task is intentionally silent." },
      { id: "49b-read-blue-ball", type: "tapChoice", title: "blue ball", audioSrc: null, audioEnabled: false, audioDisposition: "INTENTIONALLY_SILENT", silenceReason: "Early reading comprehension — audio would reveal the answer.", showLabels: false, options: [ball("red"), ball("blue"), ball("green")], correctAnswer: "blue", teacherNote: "Reading check: the task is intentionally silent." },
      { id: "49c-read-sentence", type: "tapChoice", title: "The ball is blue.", audioSrc: null, audioEnabled: false, audioDisposition: "INTENTIONALLY_SILENT", silenceReason: "Early reading comprehension — audio would reveal the answer.", showLabels: false, options: [ball("red"), ball("blue"), ball("green")], correctAnswer: "blue", teacherNote: "Reading check: the task is intentionally silent." },
      { id: "49d-phonics-b", type: "tapChoice", title: "Which one starts with /b/?", audioSrc: null, ttsText: "Which one starts with the b sound?", showLabels: true, options: [choice("blue", "l2-colour-blue", "blue"), choice("red", "l2-colour-red", "red"), choice("yellow", "l2-colour-yellow", "yellow")], correctAnswer: "blue", teacherNote: "Initial-sound awareness only. Do not ask the child to spell the word. Audio requires special phonics review." },
      { id: "49e-phonics-b-two", type: "tapChoice", title: "Which one starts with /b/?", audioSrc: null, ttsText: "Which one starts with the b sound?", showLabels: true, options: [choice("black", "l2-colour-black", "black"), choice("pink", "l2-colour-pink", "pink"), choice("green", "l2-colour-green", "green")], correctAnswer: "black", teacherNote: "Initial-sound awareness only. Do not ask the child to spell the word. Audio requires special phonics review." }
    ] },
    { id: "50-write-red", type: "writingPrompt", title: "Write red.", childPrompt: "Copy red on your paper.", visualId: "l2-colour-red", audioSrc: null, ttsText: "Write red.", teacherNote: "Use real paper and pencil. Do not turn this into a screen-writing task." },
    { id: "51-write-blue", type: "writingPrompt", title: "Write blue.", childPrompt: "Copy blue on your paper.", visualId: "l2-colour-blue", audioSrc: null, ttsText: "Write blue.", teacherNote: "Use real paper and pencil. Do not turn this into a screen-writing task." },
    { id: "52-final-colour-challenge", type: "challenge", title: "English Adventure Colour Challenge", teacherNote: "The final two-step instruction is an advanced observation. If it is difficult, return to one-step instructions; do not treat Lesson 2 as failed.", teacherChecks: "Colour listening, colour plus object, real-world transfer, and two-step attention.", items: [action("52a-touch-red", "Touch red.", "l2-colour-red"), listenChoice("52b-find-purple", "Find purple.", ["purple", "pink", "blue", "brown"].map(colour), "purple"), listenChoice("52c-touch-red-ball", "Touch the red ball.", [ball("red"), ball("blue"), ball("yellow"), ball("green")], "red"), listenChoice("52d-point-blue-pencil", "Point to the blue pencil.", [choice("pencil-blue", "pencil-blue", "Blue pencil"), choice("ball-blue", "ball-blue", "Blue ball"), choice("bag-blue", "bag-blue", "Blue bag"), choice("star-yellow", "star-yellow", "Yellow star")], "pencil-blue"), listenChoice("52e-show-green-apple", "Show me the green apple.", [choice("apple-green", "apple-green", "Green apple"), choice("apple-red", "apple-red", "Red apple"), choice("ball-green", "ball-green", "Green ball"), choice("bag-pink", "bag-pink", "Pink bag")], "apple-green"), action("52f-find-black", "Find something black.", "l2-colour-black"), action("52g-two-step", "Touch the red ball and point to the blue pencil.", "ball-red", "Advanced two-step observation. The teacher can use the screen choices or nearby real objects.")] },
    { id: "53-mini-interview", type: "challenge", title: "Mini Interview", teacherNote: "A Lesson 1 and Lesson 2 wrap-up. Keep the exchange natural and encouraging.", items: [speak("53a-hello", "Hello!", "Hello!", "waving-child", "Hello!"), speak("53b-name", "What's your name?", "My name is …", "speaking-child", "What's your name?"), speak("53c-age", "How old are you?", "I'm five. / I'm six.", "speaking-child", "How old are you?"), speak("53d-feeling", "How are you?", "I'm happy. / I'm sad. / I'm tired.", "happy-face", "How are you?"), speak("53e-blue", "What colour is it?", "It's blue.", "ball-blue", "What colour is it?"), speak("53f-orange", "What colour is it?", "It's orange.", "ball-orange", "What colour is it?"), listenChoice("53g-find-red-ball", "Find the red ball.", [ball("red"), ball("blue"), ball("yellow"), ball("green")], "red"), speak("53h-goodbye", "Goodbye!", "Goodbye!", "goodbye-child", "Goodbye!")] }
  ]
};
