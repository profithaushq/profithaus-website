"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Graphic = "grid" | "chart" | "arcs" | "rays";

const PILLARS: {
  number: string;
  title: string;
  description: string;
  bg: string;
  fg: string;
  graphic: Graphic;
}[] = [
  {
    number: "01",
    title: "In-Haus DNA",
    description:
      "Built from years in-house, we know how strong internal teams actually think and operate, because we've been there, done it, and made it work.",
    bg: "#141414",
    fg: "#ffffff",
    graphic: "grid",
  },
  {
    number: "02",
    title: "Senior Leadership",
    description:
      "We've been in leadership inside D2C giants, making the big calls, rolling up our sleeves and leading execution that actually moves the business forward.",
    bg: "#a42324",
    fg: "#ffffff",
    graphic: "chart",
  },
  {
    number: "03",
    title: "Commercial & Creative Mindset",
    description:
      "We're all about performance, profitability, and industry reputation, not vanity metrics that look cute in reports but don't pay the bills.",
    bg: "#ffffff",
    fg: "#141414",
    graphic: "arcs",
  },
  {
    number: "04",
    title: "360 Strategy",
    description:
      "From trading to website performance to the numbers behind it, we know the full picture, so if something's not converting or the margins don't add up, we've probably already spotted it.",
    bg: "#6e6a66",
    fg: "#ffffff",
    graphic: "rays",
  },
];

function PillarGraphic({ kind }: { kind: Graphic }) {
  const common = {
    className: "ph-pillar-line",
    stroke: "currentColor",
    strokeWidth: 1.5,
    fill: "none",
  };

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      aria-hidden
    >
      {kind === "grid" && (
        <>
          {[200, 400, 600, 800, 1000, 1200, 1400].map((x) => (
            <path key={`v${x}`} d={`M${x} 0V900`} {...common} />
          ))}
          {[150, 300, 450, 600, 750].map((y) => (
            <path key={`h${y}`} d={`M0 ${y}H1600`} {...common} />
          ))}
        </>
      )}
      {kind === "chart" && (
        <>
          <path d="M0 840H1600" {...common} />
          <path
            d="M0 760L220 700L380 720L620 560L800 600L1040 380L1220 420L1600 120"
            {...common}
            strokeWidth={2.5}
          />
          <path
            d="M0 820L260 780L420 790L660 660L840 690L1080 500L1260 540L1600 300"
            {...common}
          />
        </>
      )}
      {kind === "arcs" && (
        <>
          {[180, 360, 540, 720, 900].map((r) => (
            <circle key={r} cx="1300" cy="900" r={r} {...common} />
          ))}
        </>
      )}
      {kind === "rays" && (
        <>
          {[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600].map((x) => (
            <path key={x} d={`M800 1000L${x} -100`} {...common} />
          ))}
        </>
      )}
    </svg>
  );
}

function PillarFace({ pillar }: { pillar: (typeof PILLARS)[number] }) {
  return (
    <>
      <PillarGraphic kind={pillar.graphic} />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[2vw] -bottom-[6vw] font-[family-name:var(--font-manrope)] text-[42vw] leading-none font-extrabold tracking-tighter opacity-[0.08] select-none"
      >
        {pillar.number}
      </span>
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-10 pb-[13vh] sm:px-10 sm:pt-14">
        <div className="flex items-center justify-between font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
          <span>How we&apos;re different</span>
          <span>
            {pillar.number} / {String(PILLARS.length).padStart(2, "0")}
          </span>
        </div>
        <div>
          <h3 className="max-w-[16ch] font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.95] font-extrabold tracking-tight">
            {pillar.title}
          </h3>
          <p className="mt-6 max-w-2xl text-lg font-medium opacity-90 sm:text-xl lg:text-2xl">
            {pillar.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default function DealtPillars() {
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Layout effect so cleanup reverts pin-spacers before React removes the nodes.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const cards = Array.from(
          stage.querySelectorAll<HTMLElement>(".ph-card"),
        );
        const veils = Array.from(
          stage.querySelectorAll<HTMLElement>(".ph-card-veil"),
        );
        const inners = Array.from(
          stage.querySelectorAll<HTMLElement>(".ph-card-inner"),
        );

        const lineSets = cards.map((card) =>
          Array.from(card.querySelectorAll<SVGElement>(".ph-pillar-line")),
        );

        gsap.set(cards.slice(1), { yPercent: 100 });
        lineSets.forEach((lines) => gsap.set(lines, { drawSVG: "0%" }));

        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: stage,
            start: "top 70%",
            once: true,
            onEnter: () =>
              gsap.to(lineSets[0], {
                drawSVG: "100%",
                duration: 1.4,
                stagger: 0.06,
                ease: "power2.out",
              }),
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.9 * (cards.length - 1)}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              refreshPriority: 2,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, i) => {
            if (i === 0) return;
            tl.to(card, { yPercent: 0, duration: 1, ease: "none" }, i - 1)
              .to(veils[i - 1], { opacity: 0.55, duration: 1, ease: "none" }, i - 1)
              .to(inners[i - 1], { scale: 0.92, duration: 1, ease: "none" }, i - 1)
              .to(
                lineSets[i],
                { drawSVG: "100%", duration: 0.7, stagger: 0.04, ease: "none" },
                i - 1 + 0.3,
              );
          });
        }, stage);

        return () => ctx.revert();
      },
    );

    const list = listRef.current;
    if (list) {
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const blocks = Array.from(
          list.querySelectorAll<HTMLElement>(".ph-pillar-block"),
        );
        const ctx = gsap.context(() => {
          blocks.forEach((block) => {
            gsap.from(block, {
              y: 48,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: block, start: "top 85%", once: true },
            });
          });
        }, list);
        return () => ctx.revert();
      });
    }

    return () => mm.revert();
  }, []);

  return (
    <>
      <div ref={listRef} className="ph-pillars-list">
        {PILLARS.map((pillar) => (
          <article
            key={pillar.number}
            className="ph-pillar-block relative min-h-[85svh] overflow-hidden"
            style={{ backgroundColor: pillar.bg, color: pillar.fg }}
          >
            <PillarFace pillar={pillar} />
          </article>
        ))}
      </div>

      <section className="ph-pillars-stack bg-brand-black" aria-label="How we're different">
        <div ref={stageRef} className="relative h-svh w-full overflow-hidden">
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.number}
              className="ph-card absolute inset-0"
              style={{ zIndex: i + 1 }}
            >
              <div
                className="ph-card-inner absolute inset-0 overflow-hidden"
                style={{ backgroundColor: pillar.bg, color: pillar.fg }}
              >
                <PillarFace pillar={pillar} />
                <div className="ph-card-veil absolute inset-0 z-20 bg-black opacity-0" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
