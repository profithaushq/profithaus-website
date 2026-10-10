import Link from "next/link";
import type { ReactNode } from "react";

/** Square-cornered ink outline that fills with ink on hover. */
export const outlineButtonClass =
  "caps inline-block border border-brand-black bg-transparent px-8 py-4 text-center text-brand-black transition-colors duration-500 ease-out hover:bg-brand-black hover:text-white";

export default function Button({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={outlineButtonClass}>
      {children}
    </Link>
  );
}

/** Underlined uppercase text link, red only on hover. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
    </Link>
  );
}
