import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  solid: "bg-maroon text-white hover:bg-maroon-dark",
  "solid-white": "bg-white text-maroon hover:bg-white/90",
  outline: "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5",
  "outline-white": "border border-white/60 text-white hover:border-white hover:bg-white/10",
};

export default function Button({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${VARIANTS[variant]}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
