"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import AmbientLines from "@/components/AmbientLines";

export default function IntroBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = section.querySelectorAll(".intro-item");

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
        <p className="intro-item font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Ex-operators. Not an agency.
        </p>

        <div className="intro-item mx-auto mt-6 w-fit">
          <Image
            src="/logo.png"
            alt="profithaus."
            width={2000}
            height={500}
            priority
            className="h-10 w-auto sm:h-14"
          />
          <p className="mt-2 font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey sm:text-sm">
            Ecommerce partner for the luxury sector
          </p>
        </div>

        <h1 className="intro-item mx-auto mt-8 max-w-xl font-normal text-brand-grey">
          The ecommerce partner for luxury brands who want to look premium
          and sell more, run by people who&apos;ve done the job in-house.
        </h1>

        <Link
          href="/apply"
          className="intro-item mt-8 inline-block font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-brand-black underline decoration-brand-red decoration-2 underline-offset-4"
        >
          Book a call
        </Link>
      </div>
    </section>
  );
}
