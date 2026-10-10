export type ImageKey = "hero" | "point" | "approach" | "portrait" | "spread";

export type ImageSlotConfig = {
  /** Path under /public. Leave empty to show the labelled placeholder. */
  src: string;
  alt: string;
  /** What to brief: shown on the placeholder in small capitals. */
  caption: string;
};

export const IMAGES: Record<ImageKey, ImageSlotConfig> = {
  hero: {
    src: "",
    alt: "",
    caption:
      "Hero. Campaign shot, motion-blurred, cool-girl, holding a phone (the ecommerce cue). Face not the focus. From the Kive batch.",
  },
  point: {
    src: "",
    alt: "",
    caption:
      "Supporting lifestyle, small square. Detail of a product or a hand in a quiet, tactile moment.",
  },
  approach: {
    src: "",
    alt: "",
    caption:
      "Supporting lifestyle, tall 3:4. Editorial full-length look or a beauty close-up, soft natural light.",
  },
  portrait: {
    src: "",
    alt: "Heidi Gardner, founder of Profithaus",
    caption:
      "Founder portrait, 4:5. Heidi, editorial, black and white or warm-graded.",
  },
  spread: {
    src: "",
    alt: "",
    caption:
      "Supporting lifestyle, wide strip. Behind-the-scenes or flat-lay of a launch, like a lookbook spread.",
  },
};
