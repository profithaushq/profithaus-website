"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AmbientLines from "@/components/AmbientLines";

export default function PageHeader({
  eyebrow,
  title,
  subcopy,
  children,
}: {
  eyebrow: string;
  title: string;
  subcopy?: string;
  children?: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = section.querySelectorAll(".header-item");

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 24 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-brand-black/10 bg-white py-24 text-brand-black sm:py-32"
    >
      <AmbientLines />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="header-item font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          {eyebrow}
        </p>
        <h1 className="header-item mt-6 font-[family-name:var(--font-manrope)] text-4xl font-extrabold tracking-tight sm:text-6xl">
          {title}
        </h1>
        {subcopy && (
          <p className="header-item mx-auto mt-6 max-w-xl text-brand-grey">
            {subcopy}
          </p>
        )}
        {children && <div className="header-item mt-8">{children}</div>}
      </div>
    </section>
  );
}
