export function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-maroon bg-maroon text-white"
          : "border-ink/15 text-ink hover:border-maroon/50"
      }`}
    >
      {label}
    </button>
  );
}

export function OptionCard({
  title,
  description,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-maroon bg-maroon/5"
          : "border-ink/15 hover:border-maroon/40"
      }`}
    >
      <p
        className={`font-[family-name:var(--font-heading)] text-lg font-medium ${
          selected ? "text-maroon" : "text-ink"
        }`}
      >
        {title}
      </p>
      <p className="mt-1 text-sm text-ink-soft">{description}</p>
    </button>
  );
}

export function ProgressBar({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <div className="mb-2">
      <p className="text-center font-[family-name:var(--font-mono-accent)] text-xs uppercase tracking-[0.2em] text-ink-soft">
        Step {step} of {total}
      </p>
      <div className="mt-4 flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? "bg-maroon" : "bg-ink/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
