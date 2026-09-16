import { getVisual } from "../../data/visuals.js";

/** Renders approved teaching artwork. UI symbols intentionally do not use this function. */
export function renderVisual(visualId, { className = "", size = "medium", decorative = false } = {}) {
  const visual = getVisual(visualId);
  if (!visual) return unavailableVisual(visualId, "Missing visual asset");
  if (!visual.src || !visual.type || !visual.alt || !visual.concept || visual.approved !== true) {
    console.error(`Invalid teaching visual: ${visualId}`, visual);
    return unavailableVisual(visualId, "Invalid visual asset");
  }

  const image = document.createElement("img");
  image.className = `teaching-visual teaching-visual--${size} ${className}`.trim();
  image.src = visual.src;
  image.alt = decorative ? "" : visual.alt;
  image.loading = "eager";
  image.decoding = "async";
  if (decorative) image.setAttribute("aria-hidden", "true");
  else image.setAttribute("aria-label", visual.alt);
  image.addEventListener("error", () => {
    console.error(`Missing visual asset: ${visualId} (${visual.src})`);
    image.replaceWith(unavailableVisual(visualId, "Image unavailable"));
  }, { once: true });
  return image;
}

function unavailableVisual(visualId, message) {
  console.error(`${message}: ${visualId}`);
  const unavailable = document.createElement("div");
  unavailable.className = "teaching-visual teaching-visual--unavailable";
  unavailable.setAttribute("role", "img");
  unavailable.setAttribute("aria-label", `Image unavailable for ${visualId}`);
  unavailable.textContent = "Image unavailable";
  return unavailable;
}
