"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MobileServices from "@/components/home/MobileServices";
import PH from "@/components/PH";
import { ELEMENTS_ALTERNATING } from "@/data/elements";

const SERVICES = ELEMENTS_ALTERNATING.map((el) => ({
  ...el,
  // Oxblood tile = profit side, white tile = haus side
  bg: el.side === "profit" ? "#5e1424" : "#ffffff",
  copy: el.side === "profit" ? "text-white" : "text-oxblood",
  line: el.side === "profit" ? "bg-pink" : "bg-oxblood",
  // The zoom dives into the stem of the first letter
  pivot: 0.16,
}));

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
        text.setAttribute("y", String(h * 0.4));

        text.style.fontSize = "200px";
        const box = text.getBBox();
        if (box.width > 0 && box.height > 0) {
          const byWidth = (w * 0.62) / box.width;
          const byHeight = (h * 0.56) / box.height;
          text.style.fontSize = `${200 * Math.min(byWidth, byHeight)}px`;
        }

        const ext = text.getExtentOfChar(0);
        centres[i] = {
          x: ext.x + ext.width * SERVICES[i].pivot,
          y: ext.y + ext.height / 2,
        };
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
                end: () => `+=${window.innerHeight * 0.8 * layers.length}`,
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
        className="ph-services-zoom bg-porcelain"
        aria-label="The elements"
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
                        fontFamily: "var(--font-serif)",
                        fontWeight: 400,
                        letterSpacing: "-0.04em",
                        fontSize: "20vw",
                        transformBox: "fill-box",
                      }}
                    >
                      {service.symbol}
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

              {/* The divide: vertical, edge to edge, one per layer */}
              <span
                aria-hidden
                className={`absolute inset-y-0 right-7 w-[3px] ${service.line}`}
              />

              <div
                className={`ph-zoom-copy absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 px-6 pb-[12vh] sm:px-10 ${service.copy}`}
              >
                <div className="max-w-2xl">
                  <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-80">
                    Element {service.n} · {service.side}
                  </p>
                  <p className="mt-3 font-serif text-[clamp(2.4rem,4.4vw,4.2rem)] leading-none tracking-[-0.02em]">
                    {service.title}
                  </p>
                  <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
                    {service.description}
                  </p>
                </div>
                <Link
                  href="/apply"
                  className="mr-10 font-mono text-xs tracking-[0.1em] uppercase underline decoration-current underline-offset-[7px]"
                >
                  Test your <PH />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
