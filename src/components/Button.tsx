import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  solid: "bg-brand-black text-white hover:bg-brand-red",
  white: "bg-white text-brand-black hover:bg-brand-red hover:text-white",
};

const BASE =
  "caps inline-block rounded-[2px] px-7 py-4 text-center transition-colors duration-300";

export function buttonClass(variant: keyof typeof VARIANTS = "solid") {
  return `${BASE} ${VARIANTS[variant]}`;
}

/** Near-square, black turning red on hover; small tracked capitals. */
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
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}
