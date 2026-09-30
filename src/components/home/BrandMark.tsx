"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function BrandMark() {
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mark = markRef.current;
    if (!mark) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set(mark, { opacity: 1, scale: 1, rotate: 0 });
      return;
    }

    gsap.set(mark, { opacity: 0, scale: 0.6, rotate: -30 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: mark,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(mark, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
          }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex justify-center bg-white py-14">
      <div ref={markRef} className="h-12 w-12 sm:h-16 sm:w-16">
        <Image
          src="/mark.png"
          alt=""
          width={128}
          height={128}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
