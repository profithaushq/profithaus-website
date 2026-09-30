export default function AmbientLines({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`ambient-lines pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1200 800"
        className="ambient-lines-svg absolute -top-1/4 -left-1/4 h-[150%] w-[150%]"
        fill="none"
      >
        <path
          className="ambient-line ambient-line-1"
          d="M-100 200C150 100 300 300 550 220C800 140 900 320 1300 180"
          stroke="var(--color-brand-red)"
          strokeOpacity="0.08"
          strokeWidth="1.5"
        />
        <path
          className="ambient-line ambient-line-2"
          d="M-100 420C200 500 380 320 620 420C860 520 1000 360 1300 460"
          stroke="var(--color-brand-black)"
          strokeOpacity="0.06"
          strokeWidth="1.5"
        />
        <path
          className="ambient-line ambient-line-3"
          d="M-100 620C180 560 420 680 640 600C860 520 1050 660 1300 600"
          stroke="var(--color-brand-red)"
          strokeOpacity="0.05"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
