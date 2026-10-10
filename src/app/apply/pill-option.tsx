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
      className={`border px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
        selected
          ? "border-brand-black bg-brand-black text-white"
          : "border-brand-black/15 text-brand-black hover:border-brand-black/40"
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
      className={`border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
        selected
          ? "border-brand-black bg-brand-black/5"
          : "border-brand-black/15 hover:border-brand-black/40"
      }`}
    >
      <p
        className={`font-sans text-lg font-medium ${
          selected ? "text-brand-red" : "text-brand-black"
        }`}
      >
        {title}
      </p>
      <p className="mt-1 text-sm text-brand-grey">{description}</p>
    </button>
  );
}

export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-2">
      <p className="text-center font-sans font-medium text-xs uppercase tracking-[0.12em] text-brand-grey">
        Step {step} of {total}
      </p>
      <div className="mt-4 flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 transition-colors duration-300 ${
              i < step ? "bg-brand-red" : "bg-brand-black/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
