"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

export default function HeroBand({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current?.style.setProperty("--glow-x", `${x}%`);
    ref.current?.style.setProperty("--glow-y", `${y}%`);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden bg-maroon text-white ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 0%), rgba(193,57,43,0.4), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </section>
  );
}
