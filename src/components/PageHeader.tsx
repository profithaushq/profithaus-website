"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import LivingBackground from "@/components/LivingBackground";

/**
 * Inner-page hero: the living background, an oversized title whose letters
 * rise into place, and a gentle parallax as you scroll away.
 */
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Layout effect so SplitText is reverted before React removes the nodes.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const body = bodyRef.current;
    if (!section || !titleEl || !body) return;
    const items = section.querySelectorAll(".ph-page-item");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(titleEl, { visibility: "visible" });
      gsap.set(items, { opacity: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let cancelled = false;
      let split: SplitText | undefined;
      const ctx = gsap.context(() => {});

      gsap.set(items, { opacity: 0, y: 28 });

      document.fonts.ready.then(() => {
        if (cancelled) return;
        ctx.add(() => {
          split = SplitText.create(titleEl, {
            type: "words,chars",
            mask: "chars",
          });
          // Hide only what is below the line; never clip sideways or above.
          split.masks.forEach((m) => {
            const el = m as HTMLElement;
            el.style.overflow = "visible";
            el.style.clipPath = "inset(-0.3em -0.6em -0.02em -0.6em)";
          });
          gsap.set(titleEl, { visibility: "visible" });
          gsap.set(split.chars, { yPercent: 115 });

          gsap.to(split.chars, {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.03,
            ease: "power4.out",
            delay: 0.4,
            onComplete: () =>
              split?.masks.forEach((m) => {
                (m as HTMLElement).style.clipPath = "none";
              }),
          });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.9,
          });

          gsap.to(body, {
            y: -90,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      return () => {
        cancelled = true;
        ctx.revert();
        split?.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[64svh] items-end overflow-hidden bg-brand-black text-white"
    >
      <LivingBackground className="absolute inset-0" />

      <div
        ref={bodyRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-14 sm:px-10 sm:pb-20"
      >
        <p className="ph-page-item font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
          {eyebrow}
        </p>
        <h1
          ref={titleRef}
          className="ph-page-title mt-6 max-w-[15ch] font-[family-name:var(--font-manrope)] text-[clamp(2.75rem,9.5vw,9.5rem)] leading-[0.95] font-extrabold tracking-[-0.05em]"
        >
          {title}
        </h1>
        {subcopy && (
          <p className="ph-page-item mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {subcopy}
          </p>
        )}
        {children && <div className="ph-page-item mt-8">{children}</div>}
      </div>
    </section>
  );
}
