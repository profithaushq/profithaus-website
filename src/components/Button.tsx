import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  solid: "bg-brand-black text-white hover:bg-black",
  "solid-white": "bg-white text-brand-black hover:bg-white/90",
  outline:
    "border border-brand-black/20 text-brand-black hover:border-brand-black/40 hover:bg-brand-black/5",
  "outline-white":
    "border border-white/60 text-white hover:border-white hover:bg-white/10",
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
      className={`group inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${VARIANTS[variant]}`}
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
