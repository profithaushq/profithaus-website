"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AmbientLines from "@/components/AmbientLines";

const PILLARS = [
  {
    number: "01",
    title: "In-Haus DNA",
    description:
      "Built from years in-house, we know how strong internal teams actually think and operate, because we've been there, done it, and made it work.",
  },
  {
    number: "02",
    title: "Senior Leadership",
    description:
      "We've been in leadership inside D2C giants, making the big calls, rolling up our sleeves and leading execution that actually moves the business forward.",
  },
  {
    number: "03",
    title: "Commercial & Creative Mindset",
    description:
      "We're all about performance, profitability, and industry reputation, not vanity metrics that look cute in reports but don't pay the bills.",
  },
  {
    number: "04",
    title: "360 Strategy",
    description:
      "From trading to website performance to the numbers behind it, we know the full picture, so if something's not converting or the margins don't add up, we've probably already spotted it.",
  },
];

export default function StackedPillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = section.querySelectorAll(".pillar-item");

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 32 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
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
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 text-brand-black">
      <AmbientLines />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          How we&apos;re different
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="pillar-item flex gap-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold text-brand-red/40">
                {pillar.number}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-manrope)] text-lg font-extrabold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-brand-grey">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
