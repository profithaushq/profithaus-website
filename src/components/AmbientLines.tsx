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
        <line
          className="ambient-line ambient-line-1"
          x1="0"
          y1="680"
          x2="1200"
          y2="120"
          stroke="var(--color-brand-red)"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <line
          className="ambient-line ambient-line-2"
          x1="0"
          y1="780"
          x2="1200"
          y2="260"
          stroke="var(--color-brand-black)"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <line
          className="ambient-line ambient-line-3"
          x1="200"
          y1="0"
          x2="900"
          y2="800"
          stroke="var(--color-brand-black)"
          strokeOpacity="0.07"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
