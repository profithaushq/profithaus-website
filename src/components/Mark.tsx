import type { SVGProps } from "react";

export default function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 814 814" fill="none" aria-hidden {...props}>
      <circle
        className="ph-mark-disc"
        cx="407"
        cy="407"
        r="391"
        fill="var(--mark-disc, #a42324)"
      />
      <circle
        className="ph-mark-ring"
        cx="407"
        cy="407"
        r="384"
        stroke="var(--mark-glyph, #ffffff)"
        strokeWidth="14"
        opacity="0"
      />
      <line
        className="ph-mark-stem"
        x1="295"
        y1="190"
        x2="295"
        y2="567"
        stroke="var(--mark-glyph, #ffffff)"
        strokeWidth="46"
      />
      <circle
        className="ph-mark-bowl"
        cx="416.5"
        cy="333.5"
        r="124"
        stroke="var(--mark-glyph, #ffffff)"
        strokeWidth="45"
      />
      <circle
        className="ph-mark-dot"
        cx="447"
        cy="568"
        r="34"
        fill="var(--mark-glyph, #ffffff)"
      />
    </svg>
  );
}
