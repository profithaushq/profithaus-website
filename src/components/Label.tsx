import type { ReactNode } from "react";

/** Tiny tracked uppercase section label. Quiet, in ink. */
export default function Label({ children }: { children: ReactNode }) {
  return <p className="caps text-brand-black">{children}</p>;
}
