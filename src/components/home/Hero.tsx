"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/Logo";

/**
 * The homepage opening: a studio photograph with the wordmark set huge
 * between the floor and the subject. The photo is two matching layers, the
 * full picture at the back and a cut-out of the trousers and shoe on top, so
 * the logo passes behind the legs. The wordmark rises in once.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(".ph-h-word", {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: "lux",
        delay: 0.1,
      });
      gsap.to(".ph-h-item", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "lux",
        delay: 0.7,
      });
    }, section);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      data-ph-hero
      className="relative bg-porcelain text-oxblood lg:h-[min(calc(100svh-5.2rem),46rem)] lg:min-h-[36rem]"
    >
      {/* The picture: floor, then the wordmark, then the subject on top */}
      <div className="relative h-[17.5rem] overflow-hidden bg-[#a8acb0] sm:h-[28rem] lg:absolute lg:inset-0 lg:h-auto">
        <Image
          src="/images/hero/studio.jpg"
          alt="Wide-leg grey trousers and a pointed black shoe on a grey studio floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="pointer-events-none absolute top-[34%] left-[50.7%] -translate-x-[51.3%] -translate-y-1/2">
          <div className="ph-h-word">
            <Logo
              className="whitespace-nowrap"
              style={{ fontSize: "min(27vw, 50svh)" }}
            />
          </div>
        </div>

        <Image
          src="/images/hero/studio-subject.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
      </div>

      {/* The line */}
      <div className="relative z-10 flex flex-col gap-4 px-6 py-8 sm:px-10 sm:py-10 lg:absolute lg:bottom-12 lg:left-12 lg:w-[min(30rem,32%)] lg:p-0">
        <p className="ph-h-item font-sans text-[11px] font-medium tracking-[0.2em] text-burgundy uppercase">
          E-commerce strategic partner
        </p>
        <h1 className="ph-h-item font-serif text-[clamp(1.9rem,2.9vw,2.9rem)] leading-[0.98] tracking-[-0.03em]">
          <span className="block text-balance">
            Making brands harder to ignore and
          </span>
          <em className="block text-burgundy">easier to buy from.</em>
        </h1>
        <p className="ph-h-item max-w-md text-[15px] leading-relaxed text-ink">
          Your e-commerce director, without the ridiculous salary. Senior advice
          for small and medium brands.
        </p>
        <p className="ph-h-item">
          <Link
            href="/apply"
            className="group inline-flex items-center gap-3 border-b border-oxblood pb-2 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-300 hover:text-burgundy"
          >
            Apply to work with us
            <span
              aria-hidden
              className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
}
