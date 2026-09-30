const learn = (id, title, visualId, ttsText = title) => ({ id, type: "learn", title, visualId, ttsText });
const speak = (id, title, prompt, visualId, ttsText = prompt) => ({ id, type: "speakPrompt", title, prompt, visualId, ttsText, completeLabel: "I said it!", teacherNote: "Wait for the child to say the full English phrase, then confirm." });
const action = (id, title, ttsText, visualId = "boy-child", childPrompt = "Listen. Then do it!") => ({ id, type: "actionPrompt", title, ttsText, visualId, childPrompt, completeLabel: "I did it!", teacherNote: "Play the instruction, watch the real-life action, then confirm." });
const choice = (id, visualId, label) => ({ id, visualId, label });

const faceZones = [
  { id: "hair", label: "hair", x: 28, y: 4, w: 44, h: 25, visualId: "l4-mia-hair", ttsText: "Touch the hair." },
  { id: "eyes", label: "eyes", x: 32, y: 28, w: 36, h: 15, visualId: "l4-tom-eyes", ttsText: "Touch the eyes." },
  { id: "ears", label: "ears", x: 17, y: 29, w: 66, h: 20, visualId: "l4-mia-ears", ttsText: "Touch the ears." },
  { id: "nose", label: "nose", x: 40, y: 39, w: 20, h: 19, visualId: "l4-tom-nose", ttsText: "Touch the nose." },
  { id: "mouth", label: "mouth", x: 34, y: 55, w: 32, h: 18, visualId: "l4-mia-mouth", ttsText: "Touch the mouth." }
];

const bodyZones = [
  { id: "head", label: "head", x: 35, y: 2, w: 30, h: 20, visualId: "l4-tom-head", ttsText: "Touch your head." },
  { id: "arms", label: "arms", x: 9, y: 29, w: 82, h: 31, visualId: "l4-mia-arm", ttsText: "Touch your arms." },
  { id: "hands", label: "hands", x: 5, y: 53, w: 90, h: 22, visualId: "l4-tom-hand", ttsText: "Touch your hands." },
  { id: "tummy", label: "tummy", x: 34, y: 37, w: 32, h: 20, visualId: "l4-mia-tummy", ttsText: "Touch your tummy." },
  { id: "legs", label: "legs", x: 31, y: 58, w: 38, h: 30, visualId: "l4-mia-leg", ttsText: "Touch your legs." },
  { id: "knees", label: "knees", x: 28, y: 72, w: 44, h: 17, visualId: "l4-tom-knee", ttsText: "Touch your knees." },
  { id: "feet", label: "feet", x: 22, y: 87, w: 56, h: 12, visualId: "l4-mia-foot", ttsText: "Touch your feet." }
];
const bodyTouchZones = [...bodyZones, { id: "nose", label: "nose", x: 39, y: 18, w: 22, h: 10, visualId: "l4-tom-nose", ttsText: "Touch your nose." }, { id: "neck", label: "neck", x: 39, y: 21, w: 22, h: 10, visualId: "l4-mia-neck", ttsText: "Touch your neck." }];

const pain = {
  head: "l4-tom-head-hurts", eye: "l4-mia-eye-hurts", neck: "l4-tom-neck-hurts", throat: "l4-mia-sore-throat",
  arm: "l4-tom-arm-hurts", leg: "l4-mia-leg-hurts", knee: "l4-tom-knee-hurts", tummy: "l4-mia-tummy-hurts",
  tooth: "l4-tom-toothache", ear: "l4-mia-earache"
};

const bodyFunctionChoices = (id, question, options, correctAnswer, ttsText) => ({ id, type: "tapChoice", title: "What do you use?", showActivityTitle: false, question, ttsText, options, correctAnswer, showLabels: true });

export const bodyLesson = {
  id: "body",
  lessonNumber: 4,
  title: "My Body & I Don't Feel Well",
  icon: "🖐️",
  activities: [
    { id: "01-ready-to-move", type: "challenge", title: "Ready to move?", ttsText: "Stand up! Show me your hands! Clap your hands! Touch your head!", items: [
      action("01a-stand", "Stand up!", "Stand up!", "child-standing"), action("01b-show-hands", "Show me your hands!", "Show me your hands!", "l4-tom-hand"), action("01c-clap", "Clap your hands!", "Clap your hands!", "child-standing"), action("01d-touch-head", "Touch your head!", "Touch your head!", "l4-tom-touching-face")
    ] },
    { id: "02-my-body", type: "bodyMap", title: "My Body", mode: "learn", presentation: "cards", visualId: "boy-child", zones: bodyZones, targets: ["head", "arms", "hands", "legs", "feet"], ttsText: "This is my body. Head. Arms. Hands. Legs. Feet." },
    { id: "03-my-face", type: "bodyMap", title: "My Face", mode: "learn", presentation: "cards", visualId: "l4-tom-face", zones: faceZones, targets: faceZones.map((zone) => zone.id), ttsText: "This is my face. Hair. Eyes. Ears. Nose. Mouth." },
    learn("04-eyes", "Eyes", "l4-tom-eyes", "Eyes. These are my eyes."),
    learn("05-ears", "Ears", "l4-mia-ears", "Ears. These are my ears."),
    { id: "06-nose", type: "challenge", title: "Nose", items: [learn("06a-learn", "Nose", "l4-tom-nose", "Nose. This is my nose."), speak("06b-speak", "This is my nose.", "This is my nose.", "l4-tom-nose")] },
    { id: "07-mouth-teeth", type: "challenge", title: "Mouth & Teeth", items: [learn("07a-mouth", "Mouth", "l4-mia-mouth", "Mouth."), learn("07b-teeth", "Teeth", "l4-tom-teeth", "Teeth."), action("07c-open", "Open your mouth.", "Open your mouth.", "l4-mia-mouth")] },
    { id: "08-hair-face", type: "challenge", title: "Hair & Face", items: [learn("08a-hair", "Hair", "l4-mia-hair", "Hair."), learn("08b-face", "Face", "l4-tom-face", "Face."), speak("08c-speak", "This is my face.", "This is my face.", "l4-tom-face")] },
    { id: "09-touch-your-face", type: "wordChoice", title: "Touch your face", displayLabel: "Listen and choose", visualId: "l4-tom-face", ttsText: "Touch the nose.", rounds: [
      { id: "nose", visualId: "l4-tom-nose", question: "Listen and choose the face word.", options: ["eyes", "nose", "mouth"], correctAnswer: "nose", ttsText: "Touch the nose." },
      { id: "eyes", visualId: "l4-tom-eyes", question: "Listen and choose the face word.", options: ["ears", "eyes", "hair"], correctAnswer: "eyes", ttsText: "Touch the eyes." },
      { id: "ears", visualId: "l4-mia-ears", question: "Listen and choose the face word.", options: ["mouth", "nose", "ears"], correctAnswer: "ears", ttsText: "Touch the ears." },
      { id: "mouth", visualId: "l4-mia-mouth", question: "Listen and choose the face word.", options: ["hair", "mouth", "eyes"], correctAnswer: "mouth", ttsText: "Touch the mouth." },
      { id: "hair", visualId: "l4-mia-hair", question: "Listen and choose the face word.", options: ["ears", "hair", "nose"], correctAnswer: "hair", ttsText: "Touch the hair." }
    ] },
    { id: "10-how-many", type: "wordChoice", title: "How many?", rounds: [
      { id: "eyes", visualId: "l4-tom-eyes", question: "How many eyes do you have?", options: ["One", "Two"], correctAnswer: "Two", ttsText: "How many eyes do you have? Two." },
      { id: "ears", visualId: "l4-mia-ears", question: "How many ears do you have?", options: ["One", "Two"], correctAnswer: "Two", ttsText: "How many ears do you have? Two." },
      { id: "nose", visualId: "l4-tom-nose", question: "How many noses do you have?", options: ["One", "Two"], correctAnswer: "One", ttsText: "How many noses do you have? One." },
      { id: "mouth", visualId: "l4-mia-mouth", question: "How many mouths do you have?", options: ["One", "Two"], correctAnswer: "One", ttsText: "How many mouths do you have? One." }
    ] },
    { id: "11-head-neck", type: "challenge", title: "Head & Neck", items: [learn("11a-head", "Head", "l4-tom-head", "Head. This is my head."), learn("11b-neck", "Neck", "l4-mia-neck", "Neck. This is my neck.")] },
    { id: "12-shoulders-arms", type: "challenge", title: "Shoulders & Arms", items: [learn("12a-shoulders", "Shoulders", "l4-tom-shoulder", "Shoulders."), action("12b-arms", "Raise your arms.", "Raise your arms.", "l4-mia-arm")] },
    { id: "13-hands-fingers", type: "challenge", title: "Hands & Fingers", items: [learn("13a-hands", "Hands", "l4-tom-hand", "Hands."), learn("13b-fingers", "Fingers", "l4-mia-finger", "Fingers."), { id: "13c-count", type: "wordChoice", rounds: [{ id: "fingers", visualId: "l4-tom-hand", question: "How many fingers?", options: ["Five", "Two"], correctAnswer: "Five", ttsText: "How many fingers? Five." }] }] },
    { id: "14-chest-tummy", type: "challenge", title: "Chest & Tummy", items: [learn("14a-chest", "Chest", "l4-tom-chest", "Chest."), learn("14b-tummy", "Tummy", "l4-mia-tummy", "Tummy."), speak("14c-speak", "This is my tummy.", "This is my tummy.", "l4-mia-tummy")] },
    learn("15-back", "Back", "l4-tom-back", "Back. This is my back."),
    { id: "16-legs-knees", type: "challenge", title: "Legs & Knees", items: [learn("16a-legs", "Legs", "l4-mia-leg", "Legs."), action("16b-knees", "Touch your knees.", "Touch your knees.", "l4-tom-knee")] },
    { id: "17-feet-toes", type: "challenge", title: "Feet & Toes", items: [learn("17a-foot", "Foot and feet", "l4-mia-foot", "Foot. Feet."), learn("17b-toes", "Toes", "l4-tom-toe", "Toes.")] },
    { id: "18-build-the-body", type: "wordChoice", title: "Build the body", displayLabel: "Choose", audioEnabled: false, audioDisposition: "INTENTIONALLY_SILENT", rounds: [
      { id: "head", visualId: "l4-tom-head", question: "Which body part is this?", options: ["head", "hand", "foot"], correctAnswer: "head" },
      { id: "arms", visualId: "l4-mia-arm", question: "Which body part is this?", options: ["arms", "legs", "hands"], correctAnswer: "arms" },
      { id: "hands", visualId: "l4-tom-hand", question: "Which body part is this?", options: ["hands", "feet", "knees"], correctAnswer: "hands" },
      { id: "tummy", visualId: "l4-mia-tummy", question: "Which body part is this?", options: ["tummy", "chest", "back"], correctAnswer: "tummy" },
      { id: "legs", visualId: "l4-mia-leg", question: "Which body part is this?", options: ["legs", "arms", "feet"], correctAnswer: "legs" },
      { id: "knees", visualId: "l4-tom-knee", question: "Which body part is this?", options: ["knees", "toes", "hands"], correctAnswer: "knees" },
      { id: "feet", visualId: "l4-mia-foot", question: "Which body part is this?", options: ["feet", "ears", "eyes"], correctAnswer: "feet" }
    ] },
    { id: "19-this-is-my", type: "challenge", title: "This is my...", items: [speak("19a-speak", "What's this?", "This is my hand.", "l4-tom-hand", "What's this? This is my hand."), action("19b-show", "Show me your hand.", "Show me your hand.", "l4-tom-hand", "Listen. Then show the teacher your hand.")] },
    { id: "20-touch-your", type: "wordChoice", title: "Touch your...", displayLabel: "Listen and choose", visualId: "boy-child", ttsText: "Touch your head.", rounds: [
      { id: "head", visualId: "l4-tom-head", question: "Listen and choose the body word.", options: ["head", "nose", "neck"], correctAnswer: "head", ttsText: "Touch your head." },
      { id: "nose", visualId: "l4-tom-nose", question: "Listen and choose the body word.", options: ["ears", "nose", "mouth"], correctAnswer: "nose", ttsText: "Touch your nose." },
      { id: "neck", visualId: "l4-mia-neck", question: "Listen and choose the body word.", options: ["neck", "tummy", "knee"], correctAnswer: "neck", ttsText: "Touch your neck." },
      { id: "tummy", visualId: "l4-mia-tummy", question: "Listen and choose the body word.", options: ["chest", "tummy", "back"], correctAnswer: "tummy", ttsText: "Touch your tummy." },
      { id: "knees", visualId: "l4-tom-knee", question: "Listen and choose the body word.", options: ["legs", "knees", "feet"], correctAnswer: "knees", ttsText: "Touch your knees." },
      { id: "feet", visualId: "l4-mia-foot", question: "Listen and choose the body word.", options: ["hands", "toes", "feet"], correctAnswer: "feet", ttsText: "Touch your feet." }
    ] },
    { id: "21-point-show", type: "challenge", title: "Point to / Show me", items: [action("21a-ears", "Point to your ears.", "Point to your ears.", "l4-mia-ears"), action("21b-mouth", "Point to your mouth.", "Point to your mouth.", "l4-mia-mouth"), action("21c-hands", "Show me your hands.", "Show me your hands.", "l4-tom-hand"), action("21d-fingers", "Show me your fingers.", "Show me your fingers.", "l4-mia-finger")] },
    { id: "22-body-actions", type: "challenge", title: "Body actions", items: [action("22a-open-eyes", "Open your eyes.", "Open your eyes.", "l4-tom-eyes"), action("22b-close-eyes", "Close your eyes.", "Close your eyes.", "l4-tom-eyes"), action("22c-open-mouth", "Open your mouth.", "Open your mouth.", "l4-mia-mouth"), action("22d-clap", "Clap your hands.", "Clap your hands.", "l4-tom-hand"), action("22e-raise", "Raise your arms.", "Raise your arms.", "l4-mia-arm")] },
    { id: "23-two-steps", type: "challenge", title: "Two steps", items: [action("23a-head-clap", "Touch your head and clap your hands.", "Touch your head and clap your hands."), action("23b-nose-arms", "Touch your nose and raise your arms.", "Touch your nose and raise your arms."), action("23c-knees-stand", "Touch your knees and stand up.", "Touch your knees and stand up.", "child-standing"), action("23d-hands-eyes", "Show me your hands and close your eyes.", "Show me your hands and close your eyes.")] },
    { id: "24-listen-remember-do", type: "challenge", title: "Listen, remember, do", items: [action("24a-three", "Three steps", "Touch your head, touch your shoulders, and clap your hands."), action("24b-three", "Three steps", "Touch your nose, touch your knees, and sit down.", "child-sitting")] },
    { id: "25-what-do-you-use", type: "challenge", title: "What do you use?", items: [
      bodyFunctionChoices("25a-see", "What do you use to see?", [choice("eyes", "l4-tom-eyes", "eyes"), choice("ears", "l4-mia-ears", "ears"), choice("nose", "l4-tom-nose", "nose")], "eyes", "What do you use to see? Eyes."),
      bodyFunctionChoices("25b-hear", "What do you use to hear?", [choice("eyes", "l4-tom-eyes", "eyes"), choice("ears", "l4-mia-ears", "ears"), choice("mouth", "l4-mia-mouth", "mouth")], "ears", "What do you use to hear? Ears."),
      bodyFunctionChoices("25c-smell", "What do you use to smell?", [choice("nose", "l4-tom-nose", "nose"), choice("eyes", "l4-tom-eyes", "eyes"), choice("hand", "l4-tom-hand", "hand")], "nose", "What do you use to smell? Nose."),
      bodyFunctionChoices("25d-eat", "What do you use to eat?", [choice("mouth", "l4-mia-mouth", "mouth"), choice("ear", "l4-mia-ears", "ears"), choice("foot", "l4-mia-foot", "feet")], "mouth", "What do you use to eat? Mouth."),
      bodyFunctionChoices("25e-clap", "What do you use to clap?", [choice("hands", "l4-tom-hand", "hands"), choice("legs", "l4-mia-leg", "legs"), choice("eyes", "l4-tom-eyes", "eyes")], "hands", "What do you use to clap? Hands."),
      bodyFunctionChoices("25f-walk", "What do you use to walk?", [choice("legs", "l4-mia-leg", "legs"), choice("ears", "l4-mia-ears", "ears"), choice("mouth", "l4-mia-mouth", "mouth")], "legs", "What do you use to walk? Legs and feet.")
    ] },
    learn("26-ouch", "Ouch! It hurts!", "l4-tom-knee-hurts", "Ouch! It hurts! My knee hurts."),
    { id: "27-head-eye-hurts", type: "challenge", title: "My head / eye hurts", items: [learn("27a-head", "My head hurts.", pain.head, "My head hurts."), learn("27b-eye", "My eye hurts.", pain.eye, "My eye hurts.")] },
    { id: "28-neck-throat-hurts", type: "challenge", title: "My neck / throat hurts", items: [learn("28a-neck", "My neck hurts.", pain.neck, "My neck hurts."), learn("28b-throat", "My throat hurts.", pain.throat, "My throat hurts.")] },
    { id: "29-arm-leg-knee-hurts", type: "challenge", title: "My arm / leg / knee hurts", items: [
      { id: "29a-knee", type: "listenChoose", title: "Listen", ttsText: "My knee hurts.", options: [choice("arm", pain.arm, "arm hurts"), choice("leg", pain.leg, "leg hurts"), choice("knee", pain.knee, "knee hurts")], correctAnswer: "knee" },
      { id: "29b-arm", type: "listenChoose", title: "Listen", ttsText: "My arm hurts.", options: [choice("arm", pain.arm, "arm hurts"), choice("leg", pain.leg, "leg hurts"), choice("knee", pain.knee, "knee hurts")], correctAnswer: "arm" },
      { id: "29c-leg", type: "listenChoose", title: "Listen", ttsText: "My leg hurts.", options: [choice("arm", pain.arm, "arm hurts"), choice("leg", pain.leg, "leg hurts"), choice("knee", pain.knee, "knee hurts")], correctAnswer: "leg" }
    ] },
    { id: "30-tummy-hurts", type: "challenge", title: "My tummy hurts", items: [speak("30a-speak", "What's wrong?", "My tummy hurts.", pain.tummy, "What's wrong? My tummy hurts.")] },
    { id: "31-tooth-ear-hurts", type: "challenge", title: "My tooth / ear hurts", items: [learn("31a-tooth", "My tooth hurts.", pain.tooth, "My tooth hurts."), learn("31b-ear", "My ear hurts.", pain.ear, "My ear hurts.")] },
    { id: "32-where-hurt", type: "challenge", title: "Where does it hurt?", items: [
      { id: "32a-eye", type: "listenChoose", title: "Listen", ttsText: "My eye hurts.", options: [choice("eye", pain.eye, "eye"), choice("neck", pain.neck, "neck"), choice("arm", pain.arm, "arm"), choice("tummy", pain.tummy, "tummy"), choice("leg", pain.leg, "leg")], correctAnswer: "eye" },
      { id: "32b-neck", type: "listenChoose", title: "Listen", ttsText: "My neck hurts.", options: [choice("eye", pain.eye, "eye"), choice("neck", pain.neck, "neck"), choice("arm", pain.arm, "arm"), choice("tummy", pain.tummy, "tummy"), choice("leg", pain.leg, "leg")], correctAnswer: "neck" },
      { id: "32c-arm", type: "listenChoose", title: "Listen", ttsText: "My arm hurts.", options: [choice("eye", pain.eye, "eye"), choice("neck", pain.neck, "neck"), choice("arm", pain.arm, "arm"), choice("tummy", pain.tummy, "tummy"), choice("leg", pain.leg, "leg")], correctAnswer: "arm" },
      { id: "32d-tummy", type: "listenChoose", title: "Listen", ttsText: "My tummy hurts.", options: [choice("eye", pain.eye, "eye"), choice("neck", pain.neck, "neck"), choice("arm", pain.arm, "arm"), choice("tummy", pain.tummy, "tummy"), choice("leg", pain.leg, "leg")], correctAnswer: "tummy" },
      { id: "32e-leg", type: "listenChoose", title: "Listen", ttsText: "My leg hurts.", options: [choice("eye", pain.eye, "eye"), choice("neck", pain.neck, "neck"), choice("arm", pain.arm, "arm"), choice("tummy", pain.tummy, "tummy"), choice("leg", pain.leg, "leg")], correctAnswer: "leg" }
    ] },
    { id: "33-i-have-a", type: "review", title: "I have a...", items: [
      { visualId: pain.head, text: "I have a headache.", ttsText: "I have a headache." }, { visualId: pain.tummy, text: "I have a stomachache.", ttsText: "I have a stomachache." }, { visualId: pain.tooth, text: "I have a toothache.", ttsText: "I have a toothache." }, { visualId: pain.ear, text: "I have an earache.", ttsText: "I have an earache." }, { visualId: pain.throat, text: "I have a sore throat.", ttsText: "I have a sore throat." }
    ] },
    { id: "34-dont-feel-well", type: "challenge", title: "I don't feel well", items: [learn("34a-well", "I don't feel well.", "l4-mia-feeling-sick", "I don't feel well."), learn("34b-sick", "I'm sick.", "l4-mia-feeling-sick", "I'm sick.")] },
    { id: "35-are-you-okay", type: "challenge", title: "Are you okay?", items: [speak("35a-yes", "Are you okay?", "Yes, I'm okay.", "boy-child", "Are you okay? Yes, I'm okay."), speak("35b-no", "Are you okay?", "No. I don't feel well.", "l4-mia-feeling-sick", "Are you okay? No. I don't feel well.")] },
    { id: "36-whats-wrong", type: "challenge", title: "What's wrong?", items: [
      speak("36a-head", "What's wrong?", "My head hurts.", pain.head, "What's wrong? My head hurts."), speak("36b-tummy", "What's wrong?", "My tummy hurts.", pain.tummy, "What's wrong? My tummy hurts."), speak("36c-eye", "What's wrong?", "My eye hurts.", pain.eye, "What's wrong? My eye hurts."), speak("36d-ear", "What's wrong?", "My ear hurts.", pain.ear, "What's wrong? My ear hurts."), speak("36e-neck", "What's wrong?", "My neck hurts.", pain.neck, "What's wrong? My neck hurts."), speak("36f-leg", "What's wrong?", "My leg hurts.", pain.leg, "What's wrong? My leg hurts.")
    ] },
    { id: "37-does-it-hurt", type: "wordChoice", title: "Does it hurt?", rounds: [
      { id: "head", visualId: pain.head, question: "Does your head hurt?", options: ["YES", "NO"], correctAnswer: "YES", ttsText: "Does your head hurt? Yes." },
      { id: "tummy", visualId: pain.tummy, question: "Does your tummy hurt?", options: ["YES", "NO"], correctAnswer: "YES", ttsText: "Does your tummy hurt? Yes." },
      { id: "ear", visualId: pain.ear, question: "Does your ear hurt?", options: ["YES", "NO"], correctAnswer: "YES", ttsText: "Does your ear hurt? Yes." }
    ] },
    { id: "38-at-the-doctor", type: "challenge", title: "At the doctor", items: [
      speak("38a-hello", "Doctor: Hello!", "Hello!", "l4-doctor-friendly", "Doctor: Hello!"), speak("38b-okay", "Are you okay?", "No. I don't feel well.", "l4-doctor-listening", "Are you okay? No. I don't feel well."), speak("38c-wrong", "What's wrong?", "My head hurts.", pain.head, "What's wrong? My head hurts."), speak("38d-round-two", "What's wrong?", "My tummy hurts.", pain.tummy, "What's wrong? My tummy hurts.")
    ] },
    { id: "39-h-sound", type: "wordChoice", title: "The /h/ sound", rounds: [
      { id: "h", visualId: "l4-tom-head", question: "Which word starts with /h/?", options: ["head", "nose", "ear"], correctAnswer: "head", ttsText: "/h/ — head. /h/ — hair. /h/ — hand." },
      { id: "hair", visualId: "l4-mia-hair", question: "Which word starts with /h/?", options: ["hair", "eye", "leg"], correctAnswer: "hair", ttsText: "/h/ — hair." },
      { id: "hand", visualId: "l4-tom-hand", question: "Which word starts with /h/?", options: ["hand", "mouth", "toe"], correctAnswer: "hand", ttsText: "/h/ — hand." }
    ] },
    { id: "40-read-body-word", type: "wordChoice", title: "Read the body word", audioEnabled: false, audioDisposition: "INTENTIONALLY_SILENT", rounds: [
      { id: "hand", visualId: "l4-tom-hand", question: "Read the word.", options: ["hand", "nose", "leg"], correctAnswer: "hand" }, { id: "nose", visualId: "l4-tom-nose", question: "Read the word.", options: ["eye", "ear", "nose"], correctAnswer: "nose" }, { id: "foot", visualId: "l4-mia-foot", question: "Read the word.", options: ["head", "hand", "foot"], correctAnswer: "foot" }
    ] },
    { id: "41-build-the-word", type: "wordBuilder", title: "Build the word", rounds: [{ id: "head", visualId: "l4-tom-head", word: "HEAD", letters: ["A", "H", "D", "E"] }, { id: "hand", visualId: "l4-tom-hand", word: "HAND", letters: ["A", "H", "D", "N"] }] },
    { id: "42-read-the-sentence", type: "wordChoice", title: "Read the sentence", nextLabel: "I said it!", audioEnabled: false, audioDisposition: "INTENTIONALLY_SILENT", rounds: [
      { id: "head", visualId: pain.head, question: "My head hurts.", options: ["My head hurts.", "My tummy hurts.", "I have a toothache."], correctAnswer: "My head hurts." }, { id: "tummy", visualId: pain.tummy, question: "My tummy hurts.", options: ["My head hurts.", "My tummy hurts.", "I don't feel well."], correctAnswer: "My tummy hurts." }, { id: "tooth", visualId: pain.tooth, question: "I have a toothache.", options: ["My ear hurts.", "I have a toothache.", "My leg hurts."], correctAnswer: "I have a toothache." }, { id: "well", visualId: "l4-mia-feeling-sick", question: "I don't feel well.", options: ["I don't feel well.", "My eye hurts.", "My neck hurts."], correctAnswer: "I don't feel well." }
    ] },
    { id: "43-mini-reading", type: "miniReading", title: "Mini reading", visualId: "boy-child", audioEnabled: false, audioDisposition: "INTENTIONALLY_SILENT", text: "Hi! I'm Tom.\n\nI don't feel well.\n\nMy head hurts.\n\nI have a headache.", questions: [
      { id: "who", question: "Who is he?", options: ["Tom", "Mia"], correctAnswer: "Tom" }, { id: "okay", question: "Is Tom okay?", options: ["Yes", "No"], correctAnswer: "No" }, { id: "hurt", question: "What hurts?", options: ["His head", "His foot"], correctAnswer: "His head" }
    ] },
    { id: "44-body-detective", type: "challenge", title: "Body detective", items: [
      { id: "44a-tummy", type: "listenChoose", title: "Find the child", ttsText: "Find the girl whose tummy hurts.", options: [choice("tummy", pain.tummy, "Mia"), choice("head", pain.head, "Tom")], correctAnswer: "tummy" },
      { id: "44b-ear", type: "listenChoose", title: "Find the child", ttsText: "Find the girl with an earache.", options: [choice("ear", pain.ear, "Mia"), choice("head", pain.head, "Tom")], correctAnswer: "ear" },
      { id: "44c-knee", type: "listenChoose", title: "Find the child", ttsText: "Find the boy whose knee hurts.", options: [choice("knee", pain.knee, "Tom"), choice("leg", pain.leg, "Mia")], correctAnswer: "knee" },
      { id: "44d-head", type: "listenChoose", title: "Find the child", ttsText: "Find the boy whose head hurts.", options: [choice("head", pain.head, "Tom"), choice("tummy", pain.tummy, "Mia")], correctAnswer: "head" }
    ] },
    { id: "45-final-doctor-mission", type: "challenge", title: "Final doctor mission", items: [
      speak("45a-hello", "Doctor: Hello!", "Hello!", "l4-doctor-friendly", "Doctor: Hello!"), speak("45b-name", "What's your name?", "My name is ...", "boy-child", "What's your name?"), speak("45c-okay", "Are you okay?", "No. I don't feel well.", "l4-mia-feeling-sick", "Are you okay?"), speak("45d-wrong", "What's wrong?", "My tummy hurts.", pain.tummy, "What's wrong?"), speak("45e-headache", "Do you have a headache?", "Yes.", pain.head, "Do you have a headache?"), speak("45f-goodbye", "Thank you! Goodbye!", "Thank you! Goodbye!", "l4-doctor-listening", "Thank you! Goodbye!")
    ] }
  ]
};
