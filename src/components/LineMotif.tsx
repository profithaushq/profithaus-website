/**
 * A quiet set of concentric hairline circles, like the ripple of the mark.
 * Pure line work (no fills, glows or blur). Colour comes from currentColor.
 */
export default function LineMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 800"
      fill="none"
      stroke="currentColor"
      className={`pointer-events-none absolute ${className}`}
    >
      {[110, 220, 330, 440, 550, 660, 770].map((r) => (
        <circle
          key={r}
          cx="800"
          cy="400"
          r={r}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
