"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroPinned({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const wordmark = wordmarkRef.current;
    const bg = bgRef.current;
    if (!section || !wordmark || !bg) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(wordmark, {
            scale: 1.15 - self.progress * 0.15,
            y: -self.progress * 80,
          });
          gsap.set(bg, { yPercent: self.progress * 15 });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;

    const intro = introRef.current;
    if (!intro) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const letters = intro.querySelectorAll(".hero-letter");

    if (reduceMotion) {
      gsap.set(letters, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      letters,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, stagger: 0.03, ease: "power4.out" },
    );
  }, [ready]);

  const wordmark = "PROFITHAUS";

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center overflow-hidden bg-brand-black text-white"
    >
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/hero/frame-02.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </div>

      <div ref={introRef} className="relative z-10 w-full px-6">
        <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          <span className="hero-letter inline-block">
            Ex-operators. Not an agency.
          </span>
        </p>

        <h1
          ref={wordmarkRef}
          className="text-display mt-4 overflow-hidden font-[family-name:var(--font-manrope)] font-extrabold whitespace-nowrap"
          style={{ transformOrigin: "left center" }}
        >
          {wordmark.split("").map((letter, i) => (
            <span key={i} className="hero-letter inline-block overflow-hidden">
              {letter}
            </span>
          ))}
        </h1>

        <div className="hero-letter mt-6 flex flex-wrap items-center gap-6">
          <p className="max-w-md text-white/70">
            The ecommerce partner for luxury brands who want to look premium
            and sell more, run by people who&apos;ve done the job in-house.
          </p>
          <Link
            href="/apply"
            className="font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide underline decoration-brand-red decoration-2 underline-offset-4"
          >
            Book a call
          </Link>
        </div>
      </div>
    </section>
  );
}
