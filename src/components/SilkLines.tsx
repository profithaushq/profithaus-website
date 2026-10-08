/**
 * Fine flowing lines that fan out and close in again, like folds of silk.
 * Pure line work (no fills, glow or blur); colour comes from currentColor.
 */
export default function SilkLines({
  className = "",
  count = 16,
}: {
  className?: string;
  count?: number;
}) {
  const paths = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const y = 40 + t * 520;
    // Each line leans a little further than the one before, so they fan.
    const lift = 150 - t * 230;
    const sway = 90 + t * 110;
    return `M -80 ${y} C 320 ${y - lift}, 720 ${y + sway}, 1080 ${
      y - 20 + t * 30
    } S 1560 ${y - sway * 0.8}, 1700 ${y + 40 - t * 60}`;
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
