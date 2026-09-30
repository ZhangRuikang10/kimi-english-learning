import { bodyLesson } from "../data/lessons/body.js";
import { normalizeAudioText } from "../data/audio/audioRegistry.js";

const isIntentionallySilent = (activity) =>
  activity?.audioEnabled === false || activity?.audioDisposition === "INTENTIONALLY_SILENT";

function playbackText(activity) {
  return activity?.ttsText || activity?.title || "";
}

/**
 * Collects only text which is reachable by the current Lesson 4 renderers or
 * the shared footer Replay button. It deliberately excludes visual labels,
 * model answers, and reading content that has no audio control.
 */
export function collectLesson04RuntimeAudio(lesson = bodyLesson) {
  const points = [];
  const intentionalSilence = [];

  const addPoint = (text, usage) => {
    if (!text) return;
    points.push({ text, usage });
  };

  const addSilent = (activity, usage, count = 1) => {
    intentionalSilence.push({
      id: activity.id,
      title: activity.title,
      usage,
      playbackPoints: count,
    });
  };

  const collectBodyMap = (activity, usage, includeFallback) => {
    if (includeFallback) addPoint(playbackText(activity), `${usage}: replay fallback`);
    const zones = new Map((activity.zones || []).map((zone) => [zone.id, zone]));
    const playableZones = activity.mode === "listen"
      ? (activity.targets || []).map((target) => zones.get(target)).filter(Boolean)
      : activity.zones || [];
    playableZones.forEach((zone) => addPoint(zone.ttsText || zone.label, `${usage}: ${zone.id}`));
  };

  const collectWordChoice = (activity, usage, includeFallback) => {
    if (includeFallback) addPoint(playbackText(activity), `${usage}: replay fallback`);
    (activity.rounds || []).forEach((round, index) => {
      addPoint(round.ttsText || round.question, `${usage}: round ${index + 1}`);
    });
  };

  const visit = (activity, { topLevel = false, parentUsage = "" } = {}) => {
    if (!activity) return;
    const usage = parentUsage || activity.id || activity.type || "activity";

    if (isIntentionallySilent(activity)) {
      // A silent word-choice page has a footer Replay plus one disabled listen
      // control per round. Mini reading has only the disabled footer Replay.
      const count = activity.type === "wordChoice" ? 1 + (activity.rounds?.length || 0) : 1;
      addSilent(activity, usage, count);
      return;
    }

    const includeFooterReplay = topLevel;

    switch (activity.type) {
      case "challenge":
        if (includeFooterReplay) addPoint(playbackText(activity), `${usage}: footer replay`);
        (activity.items || []).forEach((item, index) =>
          visit(item, { parentUsage: `${usage} > item ${index + 1}` }),
        );
        break;

      case "bodyMap":
        collectBodyMap(activity, usage, includeFooterReplay);
        break;

      case "wordChoice":
        collectWordChoice(activity, usage, includeFooterReplay);
        break;

      case "review":
        if (includeFooterReplay) addPoint(playbackText(activity), `${usage}: footer replay`);
        (activity.items || []).forEach((item, index) =>
          addPoint(item.ttsText || item.text, `${usage}: review item ${index + 1}`),
        );
        break;

      case "learn":
      case "listenChoose":
      case "tapChoice":
      case "actionPrompt":
      case "speakPrompt":
        // The renderer and footer use the same text. One content-level point
        // is sufficient for coverage, even though it can be replayed in both places.
        addPoint(playbackText(activity), `${usage}: replay`);
        break;

      case "bodyBuilder":
      case "wordBuilder":
      case "miniReading":
        // These renderers do not play their item content; only the shared
        // footer can play a top-level title.
        if (includeFooterReplay) addPoint(playbackText(activity), `${usage}: footer replay`);
        break;

      default:
        if (includeFooterReplay) addPoint(playbackText(activity), `${usage}: footer replay`);
        break;
    }
  };

  lesson.activities.forEach((activity) => visit(activity, { topLevel: true }));

  const unique = new Map();
  points.forEach((point) => {
    const key = normalizeAudioText(point.text);
    if (!key) return;
    const entry = unique.get(key) || { text: point.text, key, usages: [] };
    entry.usages.push(point.usage);
    unique.set(key, entry);
  });

  return {
    runtimePlaybackPoints: points.length,
    uniqueUtterances: [...unique.values()],
    intentionalSilence,
    intentionalSilentPlaybackPoints: intentionalSilence.reduce(
      (total, item) => total + item.playbackPoints,
      0,
    ),
  };
}

