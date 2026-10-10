/**
 * The profithaus wordmark: "profit" set upright, the divide, "haus" in italic.
 * Always lowercase, always one colour, always with the divide (Brand Book 02).
 * The divide is 82% of the type size and centred on the x-height; pink is
 * reserved for it, so it is the only thing that ever carries that colour.
 *
 * Size it with font-size (text-*). On dark grounds pass tone="light".
 */
export default function Logo({
  tone = "dark",
  className = "",
  style,
  divide = true,
}: {
  tone?: "dark" | "light";
  className?: string;
  style?: React.CSSProperties;
  /** false keeps the gap but hides the pink line, for the hero where the subject covers it */
  divide?: boolean;
}) {
  const ink = tone === "light" ? "text-white" : "text-oxblood";
  return (
    <span
      role="img"
      aria-label="profithaus"
      className={`inline-flex items-baseline font-serif leading-none tracking-[-0.04em] ${ink} ${className}`}
      style={style}
    >
      <span aria-hidden className="ph-logo-profit">
        profit
      </span>
      <span
        aria-hidden
        className={`ph-divide self-center ${divide ? "bg-pink" : "bg-transparent"}`}
        style={{
          width: "max(1.5px, 0.0165em)",
          height: "0.82em",
          margin: "0 0.1em 0 0.12em",
        }}
      />
      <span aria-hidden className="ph-logo-haus italic">
        haus
      </span>
    </span>
  );
}
