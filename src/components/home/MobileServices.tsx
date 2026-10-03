"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

const SERVICES = [
  {
    lines: ["ECOMMERCE", "TRADING"],
    title: "Ecommerce Trading",
    description:
      "A data-led approach to improving how your website performs: product focus, pricing and merchandising, customer journey and overall trading strategy.",
    bg: "#ffffff",
    fg: "#141414",
  },
  {
    lines: ["WEBSITE", "BUILD &", "MANAGEMENT"],
    title: "Website Build & Management",
    description:
      "Full-service website builds and ongoing management to keep your site trading efficiently, performing smoothly, and looking every bit as premium as your brand.",
    bg: "#141414",
    fg: "#a42324",
    copy: "#ffffff",
  },
  {
    lines: ["DIGITAL", "BUSINESS", "MANAGEMENT"],
    title: "Digital Business Management",
    description:
      "Full oversight of the commercial engine behind your site: margins, P&Ls, cost of goods and contribution by SKU, so growth decisions are made against real profitability.",
    bg: "#a42324",
    fg: "#141414",
    copy: "#ffffff",
  },
];

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
    <section ref={rootRef} aria-label="What we do" className="ph-mservices">
      {SERVICES.map((service, i) => (
        <article
          key={service.title}
          className="ph-mslide relative flex h-svh flex-col justify-between overflow-hidden px-6 pt-24 pb-[17svh]"
          style={{
            backgroundColor: service.bg,
            color: service.copy ?? service.fg,
          }}
        >
          <p className="ph-mmeta font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
            {String(i + 1).padStart(2, "0")} /{" "}
            {String(SERVICES.length).padStart(2, "0")}
          </p>

          <h3
            className="ph-mtitle ph-nokern font-[family-name:var(--font-manrope)] text-[12.4vw] leading-[0.92] font-extrabold tracking-[-0.04em] whitespace-nowrap sm:text-[11vw]"
            style={{ color: service.fg }}
            aria-label={service.title}
          >
            {service.lines.map((line) => (
              <span key={line} className="block" aria-hidden>
                {line}
              </span>
            ))}
          </h3>

          <div className="ph-mcopy">
            <p className="max-w-md text-lg leading-snug font-medium">
              {service.description}
            </p>
            <Link
              href="/apply"
              className="mt-6 inline-block font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide underline decoration-current decoration-2 underline-offset-8"
            >
              Book a call
            </Link>
          </div>

          <div
            aria-hidden
            className="ph-mveil pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
          />
        </article>
      ))}
    </section>
  );
}
