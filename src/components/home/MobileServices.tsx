"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import PH from "@/components/PH";
import { ELEMENTS_ALTERNATING } from "@/data/elements";

const SERVICES = ELEMENTS_ALTERNATING.map((el) => ({
  ...el,
  // Oxblood tile = profit side, white tile = haus side
  bg: el.side === "profit" ? "#5e1424" : "#ffffff",
  fg: el.side === "profit" ? "#ffffff" : "#5e1424",
  divide: el.side === "profit" ? "#e8a9b4" : "#5e1424",
}));

/**
 * Phone and tablet version of the services: full-screen colour slides that
 * stack over one another as you scroll (CSS sticky, no scroll hijacking).
 * The title's letters rise with the scroll and the covered slide recedes.
 */
export default function MobileServices() {
  const rootRef = useRef<HTMLElement>(null);

  // Layout effect so SplitText is reverted before React removes the nodes.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rootEl = root;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const slides = Array.from(
          rootEl.querySelectorAll<HTMLElement>(".ph-mslide"),
        );

        slides.forEach((slide, i) => {
          const title = slide.querySelector<HTMLElement>(".ph-mtitle");
          const copy = slide.querySelector<HTMLElement>(".ph-mcopy");
          const meta = slide.querySelector<HTMLElement>(".ph-mmeta");
          const veil = slide.querySelector<HTMLElement>(".ph-mveil");

          if (title) {
            const split = SplitText.create(title, {
              type: "chars",
              mask: "chars",
            });
            // Hide only what is below the line; never clip sideways or above.
            split.masks.forEach((m) => {
              const el = m as HTMLElement;
              el.style.overflow = "visible";
              el.style.clipPath = "inset(-0.3em -0.6em -0.3em -0.6em)";
            });
            gsap.fromTo(
              split.chars,
              { yPercent: 135 },
              {
                yPercent: 0,
                ease: "none",
                stagger: 0.025,
                scrollTrigger: {
                  trigger: slide,
                  start: i === 0 ? "top 85%" : "top 70%",
                  end: i === 0 ? "top 35%" : "top 15%",
                  scrub: true,
                },
              },
            );
          }

          gsap.fromTo(
            [meta, copy],
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: i === 0 ? "top 60%" : "top 35%",
                end: i === 0 ? "top 20%" : "top 0%",
                scrub: true,
              },
            },
          );

          // The next slide slides over this one, which shrinks and dims.
          const next = slides[i + 1];
          if (next && veil) {
            gsap.to(slide, {
              scale: 0.92,
              transformOrigin: "50% 0%",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
            gsap.to(veil, {
              opacity: 0.55,
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          }
        });
      }, rootEl);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label="The elements" className="ph-mservices">
      {SERVICES.map((service) => (
        <article
          key={service.title}
          className="ph-mslide relative flex h-svh flex-col justify-between overflow-hidden px-6 pt-24 pb-[14svh]"
          style={{ backgroundColor: service.bg, color: service.fg }}
        >
          {/* The divide: vertical, edge to edge, one per slide */}
          <span
            aria-hidden
            className="absolute inset-y-0 right-5 w-[2px]"
            style={{ backgroundColor: service.divide }}
          />

          <p className="ph-mmeta font-mono text-xs tracking-[0.12em] uppercase opacity-80">
            Element {service.n} · {service.side}
          </p>

          <h3
            className="ph-mtitle ph-nokern font-serif text-[44vw] leading-[0.85] tracking-[-0.04em] whitespace-nowrap sm:text-[30vw]"
            aria-label={service.title}
          >
            <span aria-hidden>{service.symbol}</span>
          </h3>

          <div className="ph-mcopy">
            <p className="font-serif text-[2.4rem] leading-none tracking-[-0.02em]">
              {service.title}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed">
              {service.description}
            </p>
            <Link
              href="/apply"
              className="mt-6 inline-block font-mono text-xs tracking-[0.1em] uppercase underline decoration-current underline-offset-[7px]"
            >
              Test your <PH />
            </Link>
          </div>

          <div
            aria-hidden
            className="ph-mveil pointer-events-none absolute inset-0 z-20 bg-oxblood opacity-0"
          />
        </article>
      ))}
    </section>
  );
}
