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
 * the logo passes behind the legs. The line sits centred underneath.
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
      className="relative bg-porcelain text-oxblood"
      style={
        {
          // The picture fills what is left of the screen once the line underneath has its room
          "--stage-h": "clamp(24rem, 31vw, 36rem)",
        } as React.CSSProperties
      }
    >
      {/* The picture: floor, then the wordmark, then the subject on top */}
      <div className="relative h-[17rem] overflow-hidden bg-[#a8acb0] sm:h-[22rem] lg:h-[var(--stage-h)]">
        <Image
          src="/images/hero/studio.jpg"
          alt="Wide-leg grey trousers and a pointed black shoe on a grey studio floor"
          fill
          priority
          quality={92}
          sizes="(min-width: 1024px) 170vw, 100vw"
          className="object-cover object-[50%_20%]"
        />

        <div className="pointer-events-none absolute top-[40%] left-[50.7%] -translate-x-[51.3%] -translate-y-1/2 lg:top-[41%]">
          <div>
            <Logo
              divide={false}
              className="whitespace-nowrap"
              style={{ fontSize: "min(25.5vw, calc(var(--stage-h) * 0.78))" }}
            />
          </div>
        </div>

        <Image
          src="/images/hero/studio-subject.webp"
          alt=""
          aria-hidden
          fill
          priority
          quality={92}
          sizes="(min-width: 1024px) 170vw, 100vw"
          className="pointer-events-none object-cover object-[50%_20%]"
        />

        {/* A fine film grain over the whole picture, wordmark included */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='.33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* The line, centred underneath */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-12 text-center sm:px-10 lg:py-14">
        <p className="ph-h-item font-sans text-[11px] font-medium tracking-[0.2em] text-burgundy uppercase">
          E-commerce strategic partner
        </p>
        <h1 className="ph-h-item font-serif text-[clamp(2rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.03em]">
          <span className="block text-balance">
            Making brands harder to ignore and
          </span>
          <em className="block text-burgundy">easier to buy from.</em>
        </h1>
        <p className="ph-h-item max-w-4xl text-base leading-relaxed text-ink sm:text-lg">
          Your e-commerce director, without the ridiculous salary. Senior
          support for small and medium brands.
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
