"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MobileServices from "@/components/home/MobileServices";

const SERVICES = [
  {
    lines: ["ECOMMERCE", "TRADING"],
    title: "Ecommerce Trading",
    description:
      "A data-led approach to improving how your website performs: product focus, pricing and merchandising, customer journey and overall trading strategy.",
    bg: "#ffffff",
    copy: "text-brand-black",
    originChar: 9,
  },
  {
    lines: ["WEBSITE", "BUILD &", "MANAGEMENT"],
    title: "Website Build & Management",
    description:
      "Full-service website builds and ongoing management to keep your site trading efficiently, performing smoothly, and looking every bit as premium as your brand.",
    bg: "#141414",
    copy: "text-white",
    originChar: 9,
  },
  {
    lines: ["DIGITAL", "BUSINESS", "MANAGEMENT"],
    title: "Digital Business Management",
    description:
      "Full oversight of the commercial engine behind your site: margins, P&Ls, cost of goods and contribution by SKU, so growth decisions are made against real profitability.",
    bg: "#a42324",
    copy: "text-white",
    originChar: 10,
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

    // Pivot letter of each word, in SVG user units.
    const centres = texts.map(() => ({ x: 0, y: 0 }));

    // Sizes each word to the stage, and pins its position in absolute SVG
    // units (the zoom animates the viewBox, so percentages would drift).
    function layout() {
      texts.forEach((text, i) => {
        const svg = text.ownerSVGElement;
        if (!svg) return;
        const w = svg.clientWidth;
        const h = svg.clientHeight;
        if (!w || !h) return;
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        text.setAttribute("x", String(w / 2));
        text.setAttribute("y", String(h * 0.38));
        text
          .querySelectorAll("tspan")
          .forEach((t) => t.setAttribute("x", String(w / 2)));

        text.style.fontSize = "200px";
        const box = text.getBBox();
        if (box.width > 0 && box.height > 0) {
          const byWidth = (w * 0.78) / box.width;
          const byHeight = (h * 0.54) / box.height;
          text.style.fontSize = `${200 * Math.min(byWidth, byHeight)}px`;
        }

        const ext = text.getExtentOfChar(SERVICES[i].originChar);
        centres[i] = { x: ext.x + ext.width / 2, y: ext.y + ext.height / 2 };
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
          layout();

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
              const svg = texts[i].ownerSVGElement;
              const zoom = { f: 0 };

              // Zooming the viewBox (not scaling the text) keeps the mask
              // crisp and cheap: the browser never rasterises a giant glyph.
              const render = () => {
                if (!svg) return;
                const w = svg.clientWidth;
                const h = svg.clientHeight;
                const c = centres[i];
                const scale = 1 + 33 * zoom.f;
                const vw = w / scale;
                const vh = h / scale;
                const cx = w / 2 + (c.x - w / 2) * zoom.f;
                const cy = h / 2 + (c.y - h / 2) * zoom.f;
                svg.setAttribute(
                  "viewBox",
                  `${cx - vw / 2} ${cy - vh / 2} ${vw} ${vh}`,
                );
              };

              if (i > 0) {
                tl.to(texts[i], { opacity: 1, duration: 0.2, ease: "none" }, i - 0.22);
              }
              tl.to(copy, { opacity: 0, y: -24, duration: 0.18, ease: "none" }, i + 0.22)
                .to(
                  zoom,
                  { f: 1, duration: 0.7, ease: "power2.in", onUpdate: render },
                  i + 0.28,
                )
                .to(layer, { opacity: 0, duration: 0.1, ease: "none" }, i + 0.9);
            });
          }, stageEl);
        }

        const handleResize = () => layout();

        document.fonts.ready.then(setup);
        window.addEventListener("resize", handleResize);

        return () => {
          cancelled = true;
          window.removeEventListener("resize", handleResize);
          ctx?.revert();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <>
      <div className="ph-services-list">
        <MobileServices />
      </div>

      <section
        className="ph-services-zoom bg-brand-black"
        aria-label="What we do"
      >
        <div ref={stageRef} className="relative h-svh w-full overflow-hidden">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
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
                      {service.lines.map((line, li) => (
                        <tspan
                          key={line}
                          x="50%"
                          dy={
                            li === 0
                              ? `${-(service.lines.length - 1) * 0.45}em`
                              : "0.9em"
                          }
                        >
                          {line}
                        </tspan>
                      ))}
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
                className={`ph-zoom-copy absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 px-6 pb-[13vh] sm:px-10 ${service.copy}`}
              >
                <div className="max-w-2xl">
                  <p className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
                    {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-manrope)] text-lg font-medium sm:text-xl lg:text-2xl">
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
