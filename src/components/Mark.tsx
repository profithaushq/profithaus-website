import type { SVGProps } from "react";

const SERIF = "'Instrument Serif', Georgia, serif";

/** The letters must not pick up case or spacing from whatever label they sit in. */
const INK = {
  fontFamily: SERIF,
  textTransform: "none",
  letterSpacing: "normal",
  fontWeight: 400,
} as const;

/**
 * The seal: a lowercase p, the divide and an italic H. For anywhere the
 * wordmark will not fit: avatars, favicons, stamps and sign-offs (Brand Book 02).
 * Colours come from --mark-disc, --mark-glyph and --mark-divide so it can sit
 * on any ground. The divide stays pink.
 */
export default function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden {...props}>
      <circle
        className="ph-mark-disc"
        cx="50"
        cy="50"
        r="50"
        fill="var(--mark-disc, #5e1424)"
      />
      <text
        className="ph-mark-p"
        x="34.5"
        y="66"
        textAnchor="middle"
        style={{ ...INK, fontSize: 54 }}
        fill="var(--mark-glyph, #ffffff)"
      >
        p
      </text>
      <line
        className="ph-mark-divide"
        x1="50"
        y1="26"
        x2="50"
        y2="74"
        stroke="var(--mark-divide, #e8a9b4)"
        strokeWidth="1.8"
      />
      <text
        className="ph-mark-h"
        x="67.5"
        y="64.5"
        textAnchor="middle"
        style={{ ...INK, fontStyle: "italic", fontSize: 44 }}
        fill="var(--mark-glyph, #ffffff)"
      >
        H
      </text>
    </svg>
  );
}
