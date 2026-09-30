"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || reduceMotion) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.body.classList.add("ph-cursor-active");
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 1 });
    const moveX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3" });

    function handleMove(e: MouseEvent) {
      moveX(e.clientX);
      moveY(e.clientY);
    }

    function handleOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) setLabel(target.getAttribute("data-cursor"));
    }

    function handleOut(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) setLabel(null);
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.body.classList.remove("ph-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={`pointer-events-none fixed top-0 left-0 z-[90] flex items-center justify-center rounded-full bg-brand-black text-[10px] font-medium uppercase tracking-wide text-white opacity-0 transition-[width,height] duration-300 ${
        label ? "h-16 w-16" : "h-3 w-3"
      }`}
    >
      {label}
    </div>
  );
}
