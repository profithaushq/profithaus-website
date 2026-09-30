"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function AccentSwoosh({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(path, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: path,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.inOut",
          }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      viewBox="0 0 160 24"
      className={`h-4 w-24 text-accent ${className}`}
      aria-hidden
      fill="none"
    >
      <path
        ref={pathRef}
        d="M2 18C24 4 40 4 58 14C76 24 92 6 112 8C128 9.6 138 18 158 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
