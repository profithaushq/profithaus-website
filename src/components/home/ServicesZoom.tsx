"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitServiceRows from "@/components/home/SplitServiceRows";

const SERVICES = [
  {
    kicker: "Ecommerce",
    word: "TRADING",
    title: "Ecommerce Trading",
    description:
      "A data-led approach to improving how your website performs: product focus, pricing and merchandising, customer journey and overall trading strategy.",
    bg: "#ffffff",
    copy: "text-brand-black",
    originChar: 0,
  },
  {
    kicker: "Website",
    word: "BUILDS",
    title: "Website Build & Management",
    description:
      "Full-service website builds and ongoing management to keep your site trading efficiently, performing smoothly, and looking every bit as premium as your brand.",
    bg: "#141414",
    copy: "text-white",
    originChar: 2,
  },
  {
    kicker: "Business",
    word: "MANAGEMENT",
    title: "Digital Business Management",
    description:
      "Full oversight of the commercial engine behind your site: margins, P&Ls, cost of goods and contribution by SKU, so growth decisions are made against real profitability.",
    bg: "#a42324",
    copy: "text-white",
    originChar: 2,
  },
];

export default function ServicesZoom() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Layout effect so cleanup reverts pin-spacers before React removes the nodes.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageEl = stage;

    const layers = Array.from(
      stage.querySelectorAll<HTMLElement>(".ph-zoom-layer"),
    );
    const texts = Array.from(
      stage.querySelectorAll<SVGTextElement>(".ph-zoom-text"),
    );

    function fit() {
      texts.forEach((text) => {
        const svg = text.ownerSVGElement;
        if (!svg) return;
        text.style.fontSize = "200px";
        const width = text.getBBox().width;
        if (width > 0) {
          text.style.fontSize = `${200 * ((svg.clientWidth * 0.92) / width)}px`;
        }
      });
    }

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        let cancelled = false;
        let ctx: gsap.Context | undefined;

        function setup() {
          if (cancelled) return;
          fit();

          texts.forEach((text, i) => {
            const box = text.getBBox();
            const ext = text.getExtentOfChar(SERVICES[i].originChar);
            const fx = ((ext.x + ext.width / 2 - box.x) / box.width) * 100;
            const fy = ((ext.y + ext.height / 2 - box.y) / box.height) * 100;
            gsap.set(text, { transformOrigin: `${fx}% ${fy}%` });
          });

          ctx = gsap.context(() => {
            gsap.set(texts.slice(1), { opacity: 0 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: stageEl,
                start: "top top",
                end: () => `+=${window.innerHeight * 0.9 * layers.length}`,
                pin: true,
                scrub: true,
                anticipatePin: 1,
                refreshPriority: 4,
                invalidateOnRefresh: true,
              },
            });

            layers.forEach((layer, i) => {
              const copy = layer.querySelector(".ph-zoom-copy");
              if (i > 0) {
                tl.to(texts[i], { opacity: 1, duration: 0.2, ease: "none" }, i - 0.22);
              }
              tl.to(copy, { opacity: 0, y: -24, duration: 0.18, ease: "none" }, i + 0.22)
                .to(
                  texts[i],
                  { scale: 34, duration: 0.7, ease: "power2.in" },
                  i + 0.28,
                )
                .to(layer, { opacity: 0, duration: 0.1, ease: "none" }, i + 0.9);
            });
          }, stageEl);
        }

        document.fonts.ready.then(setup);
        window.addEventListener("resize", fit);

        return () => {
          cancelled = true;
          window.removeEventListener("resize", fit);
          ctx?.revert();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <>
      <div className="ph-services-list">
        <SplitServiceRows />
      </div>

      <section
        className="ph-services-zoom bg-brand-black"
        aria-label="What we do"
      >
        <div ref={stageRef} className="relative h-svh w-full overflow-hidden">
          {SERVICES.map((service, i) => (
            <div
              key={service.word}
              className="ph-zoom-layer absolute inset-0"
              style={{ zIndex: SERVICES.length - i }}
            >
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <mask id={`ph-zoom-mask-${i}`}>
                    <rect width="100%" height="100%" fill="white" />
                    <text
                      className="ph-zoom-text"
                      x="50%"
                      y="46%"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="black"
                      style={{
                        fontFamily: "var(--font-manrope)",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        fontSize: "20vw",
                        transformBox: "fill-box",
                      }}
                    >
                      {service.word}
                    </text>
                  </mask>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={service.bg}
                  mask={`url(#ph-zoom-mask-${i})`}
                />
              </svg>

              <h2 className="sr-only">{service.title}</h2>

              <div
                className={`ph-zoom-copy absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 px-6 pb-10 sm:px-10 sm:pb-14 ${service.copy}`}
              >
                <div className="max-w-xl">
                  <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
                    {service.kicker}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-manrope)] text-base font-medium sm:text-lg">
                    {service.description}
                  </p>
                </div>
                <Link
                  href="/apply"
                  className="font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide underline decoration-current decoration-2 underline-offset-8"
                >
                  Book a call
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
