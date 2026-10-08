import type { ReactNode } from "react";

/** Small red bold section label in sentence case. */
export default function Label({
  children,
  onDark = false,
  dot = false,
}: {
  children: ReactNode;
  onDark?: boolean;
  dot?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-bold ${
        onDark ? "text-brand-red-on-dark" : "text-brand-red"
      }`}
    >
      {dot && <span aria-hidden className="pulse-dot" />}
      {children}
    </p>
  );
}
