import { playText, stopTeachingAudio } from "../audio.js";

const el = (tag, className, text = "") => { const node = document.createElement(tag); node.className = className; if (text) node.textContent = text; return node; };
const audioButton = (label, source, onPlay) => { const button = el("button", "phonics-audio-button", `🔊 ${label}`); button.type = "button"; button.addEventListener("click", () => { if (!source) return; playText(label, source); onPlay?.(); }); return button; };
const primaryButton = (label, onClick) => { const button = el("button", "nav-button next phonics-primary", label); button.type = "button"; button.addEventListener("click", onClick); return button; };

function heading(card, title, kicker = "Phonics") { card.append(el("p", "activity-type", kicker), el("h1", "activity-heading", title)); }
function wordDisplay(item, { split = true, animate = false } = {}) {
  const wrap = el("div", `phonics-word${animate ? " is-blending" : ""}`);
  wrap.setAttribute("aria-label", item.word);
  if (!split) { wrap.textContent = item.word; return wrap; }
  item.letters.forEach((letter, index) => {
    const span = el("span", `phonics-letter${index === 1 ? " is-target" : ""}`, letter);
    span.style.setProperty("--letter-index", String(index)); wrap.append(span);
  });
  return wrap;
}

function roundIndicator(round) {
  const labels = ["Learn", "Your Turn", "Quick Read"];
  const wrap = el("div", "phonics-rounds");
  labels.forEach((label, index) => wrap.append(el("span", `phonics-round${index === round ? " is-current" : index < round ? " is-done" : ""}`, label)));
  return wrap;
}

function renderWarmup(card, activity, api) {
  heading(card, activity.title, "Phonics");
  card.append(el("p", "phonics-helper", "今天我们练习五个最重要的声音。听一听，然后跟着读。"));
  const grid = el("div", "phonics-vowel-grid"); const heard = new Set();
  Object.entries(activity.vowels).forEach(([letter, vowel]) => {
    const button = el("button", "phonics-vowel-tile"); button.type = "button";
    button.append(el("strong", "phonics-vowel-letter", `${letter.toUpperCase()} ${letter}`), el("span", "phonics-vowel-sound", vowel.sound), el("span", "phonics-vowel-speaker", "🔊"));
    button.addEventListener("click", () => { heard.add(letter); button.classList.add("is-heard"); playText(`Short ${letter}`, vowel.audio); }); grid.append(button);
  });
  const start = primaryButton("Let's read!", () => api.complete());
  card.append(grid, start);
}

function renderVowel(card, activity, api) {
  const state = { index: 0, checked: false, blending: false };
  const allWords = activity.rounds.flatMap((round) => round.words);
  const render = () => {
    const roundIndex = Math.floor(state.index / 5); const round = activity.rounds[roundIndex]; const item = allWords[state.index]; const inRound = state.index % 5;
    card.replaceChildren(); heading(card, `Short ${activity.letter.toUpperCase()}`, "Phonics");
    const meter = el("p", "phonics-meter", `${state.index + 1} / ${allWords.length}`); card.append(meter, roundIndicator(roundIndex));
    const vowelHead = el("div", "phonics-vowel-head"); vowelHead.append(el("strong", "phonics-vowel-letter", `${activity.letter.toUpperCase()} ${activity.letter}`), el("span", "phonics-vowel-sound", activity.sound), audioButton("听声音", activity.vowelAudio)); card.append(vowelHead);
    const title = round.type === "quick-read" ? "Can you read it?" : round.label;
    card.append(el("h2", "phonics-task-title", title), wordDisplay(item, { split: round.type !== "quick-read", animate: state.blending }));
    const helper = round.type === "learn" ? "一个音一个音读，再连起来。" : round.type === "practice" ? "先自己拼一拼。" : "先自己读。"; card.append(el("p", "phonics-helper", helper));
    const controls = el("div", "phonics-controls");
    const advance = () => { stopTeachingAudio(); if (state.index === allWords.length - 1) { api.complete(); return; } state.index += 1; state.checked = false; state.blending = false; render(); };
    const showBlend = () => { state.blending = true; playText(`Blend ${item.word}`, item.blendAudio); render(); };
    if (round.type === "learn") {
      controls.append(audioButton("听拼读", item.blendAudio, () => { state.blending = true; render(); }), audioButton("听整词", item.wholeWordAudio), primaryButton("我读好了 ✓", advance));
    } else if (round.type === "practice") {
      const done = primaryButton(state.checked ? (inRound === 4 && state.index === allWords.length - 1 ? "完成" : "Next word") : "我读好了 ✓", () => { if (!state.checked) { state.checked = true; playText(item.word, item.wholeWordAudio); render(); } else advance(); });
      controls.append(done, audioButton("需要帮助？听拼读", item.blendAudio, () => { state.blending = true; render(); }));
    } else {
      const check = primaryButton(state.checked ? (state.index === allWords.length - 1 ? "完成" : "Next word") : "Check ✓", () => { if (!state.checked) { state.checked = true; playText(item.word, item.wholeWordAudio); render(); } else advance(); });
      controls.append(check, audioButton("Help me", item.blendAudio, () => { state.blending = true; render(); }));
    }
    card.append(controls);
  };
  render();
}

function renderReading(card, activity, api) {
  const state = { index: 0, checked: false, blending: false };
  const render = () => {
    const item = activity.words[state.index]; const hasAudio = Boolean(item.wholeWordAudio && item.blendAudio);
    card.replaceChildren(); heading(card, activity.title, "Phonics");
    card.append(el("p", "phonics-meter", `${state.index + 1} / ${activity.words.length}`), el("h2", "phonics-task-title", activity.mode === "mixed" ? "Can you read it?" : "Can you read it?"), wordDisplay(item, { split: false }), el("p", "phonics-helper", activity.mode === "mixed" ? "看看中间的字母，自己拼出来。" : "这次没有练过，自己试试看。"));
    const controls = el("div", "phonics-controls");
    const next = () => { stopTeachingAudio(); if (state.index === activity.words.length - 1) { api.complete(); return; } state.index += 1; state.checked = false; state.blending = false; render(); };
    if (hasAudio) {
      controls.append(primaryButton(state.checked ? (state.index === activity.words.length - 1 ? "完成" : "Next") : "Check ✓", () => { if (!state.checked) { state.checked = true; playText(item.word, item.wholeWordAudio); render(); } else next(); }), audioButton("Help me", item.blendAudio));
    } else {
      controls.append(primaryButton(state.checked ? (state.index === activity.words.length - 1 ? "完成" : "Next") : "我读好了 ✓", () => { if (!state.checked) { state.checked = true; render(); } else next(); }), (() => { const button = el("button", "phonics-audio-button", "需要帮助（音频待补）"); button.type = "button"; button.disabled = true; return button; })());
    }
    card.append(controls);
  };
  render();
}

function renderFinish(card, activity, api) {
  heading(card, activity.title, "Finish"); card.append(el("p", "phonics-finish-copy", "75 words practised · 5 vowel sounds"));
  const list = el("div", "phonics-finish-vowels"); ["a", "e", "i", "o", "u"].forEach((letter) => { const vowel = activity.vowels[letter]; list.append(el("span", "phonics-finish-vowel", `${letter.toUpperCase()}  ${vowel.sound}`)); }); card.append(list);
  const controls = el("div", "phonics-controls"); controls.append(primaryButton("Read again", () => api.restart?.()), primaryButton("Back to Lessons", () => api.home?.())); card.append(controls); api.complete();
}

export function renderPhonicsPractice(stage, activity, api) {
  const card = el("section", "activity-card phonics-card");
  if (activity.mode === "warmup") renderWarmup(card, activity, api);
  else if (activity.mode === "vowel") renderVowel(card, activity, api);
  else if (activity.mode === "mixed" || activity.mode === "final") renderReading(card, activity, api);
  else if (activity.mode === "finish") renderFinish(card, activity, api);
  stage.append(card);
}
