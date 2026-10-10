"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Brand Book 01, "How we behave"
const PILLARS: {
  number: string;
  title: string;
  description: string;
  bg: string;
  fg: string;
  /** The divide: pink on dark grounds, oxblood on light ones */
  line: string;
  /** Where the divide sits across the card, 0 to 100 */
  at: number;
}[] = [
  {
    number: "01",
    title: "Balance over extremes",
    description:
      "Brands go wrong at the ends of the scale. We work in the middle.",
    bg: "#5e1424",
    fg: "#ffffff",
    line: "#e8a9b4",
    at: 50,
  },
  {
    number: "02",
    title: "Operators, not observers",
    description:
      "The team has run the P&L. It shows in what we recommend.",
    bg: "#ffffff",
    fg: "#5e1424",
    line: "#5e1424",
    at: 36,
  },
  {
    number: "03",
    title: "Taste with a target",
    description: "Every creative decision has a commercial job to do.",
    bg: "#861a2d",
    fg: "#ffffff",
    line: "#e8a9b4",
    at: 64,
  },
  {
    number: "04",
    title: "Say it plainly",
    description:
      "If it's true, say it. No sixty-slide decks for the sake of it.",
    bg: "#faf7f4",
    fg: "#5e1424",
    line: "#5e1424",
    at: 50,
  },
];

/**
 * One divide per card, drawn top to bottom, plus the pH scale as a row of
 * ticks along the foot of the card with 7 marked out.
 */
function PillarGraphic({ pillar }: { pillar: (typeof PILLARS)[number] }) {
  const x = (pillar.at / 100) * 1600;
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <path
        className="ph-pillar-line"
        d={`M${x} 0V900`}
        stroke={pillar.line}
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      {Array.from({ length: 15 }, (_, i) => (
        <path
          key={i}
          className="ph-pillar-line"
          d={`M${100 + i * 100} 900V${i === 7 ? 846 : 874}`}
          stroke={pillar.fg}
          strokeOpacity={i === 7 ? 0.9 : 0.35}
          strokeWidth={i === 7 ? 3 : 2}
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
      ))}
    </svg>
  );
}

function PillarFace({
  pillar,
  compact = false,
}: {
  pillar: (typeof PILLARS)[number];
  compact?: boolean;
}) {
  return (
    <>
      <PillarGraphic pillar={pillar} />
      <span
        aria-hidden
        className={`pointer-events-none absolute font-serif leading-none tracking-[-0.04em] opacity-[0.09] select-none ${
          compact
            ? "-right-[6vw] -bottom-[10vw] text-[58vw]"
            : "-right-[2vw] -bottom-[6vw] text-[42vw]"
        }`}
      >
        {pillar.number}
      </span>
      <div
        className={`relative z-10 flex h-full flex-col justify-between ${
          compact
            ? "px-5 py-6"
            : "px-6 pt-10 pb-[13vh] sm:px-10 sm:pt-14 lg:pb-[33vh]"
        }`}
      >
        <div className="flex items-center justify-between font-mono text-xs tracking-[0.12em] uppercase opacity-80">
          <span>How we behave</span>
          <span>
            {pillar.number} / {String(PILLARS.length).padStart(2, "0")}
          </span>
        </div>
        <div className="ph-pillar-text">
          <h3
            className={`max-w-[14ch] font-serif leading-[0.95] tracking-[-0.025em] ${
              compact ? "text-[2.6rem]" : "text-[clamp(2.8rem,7.6vw,8rem)]"
            }`}
          >
            {pillar.title}
          </h3>
          <p
            className={`max-w-xl ${
              compact
                ? "mt-4 text-base leading-snug"
                : "mt-6 text-lg leading-relaxed sm:text-xl lg:text-2xl"
            }`}
          >
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
              .to(
                veils[i - 1],
                { opacity: 0.55, duration: 1, ease: "none" },
                i - 1,
              )
              .to(
                inners[i - 1],
                { scale: 0.92, duration: 1, ease: "none" },
                i - 1,
              )
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
      mm.add("(max-width: 1023px)", () => {
        const track = list.querySelector<HTMLElement>(".ph-pillars-track");
        const cards = Array.from(
          list.querySelectorAll<HTMLElement>(".ph-pillar-block"),
        );
        const dots = Array.from(
          list.querySelectorAll<HTMLElement>(".ph-pillar-dot"),
        );
        if (!track) return;
        const trackEl = track;

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        const lineSets = cards.map((card) =>
          Array.from(card.querySelectorAll<SVGElement>(".ph-pillar-line")),
        );
        const drawn = new Set<number>();
        if (!reduceMotion) {
          lineSets.forEach((lines) => gsap.set(lines, { drawSVG: "0%" }));
        }

        function draw(i: number) {
          if (drawn.has(i) || reduceMotion) return;
          drawn.add(i);
          gsap.to(lineSets[i], {
            drawSVG: "100%",
            duration: 1.2,
            stagger: 0.05,
            ease: "power2.out",
          });
        }

        let active = -1;
        let raf = 0;

        function update() {
          raf = 0;
          const mid = trackEl.scrollLeft + trackEl.clientWidth / 2;
          let best = 0;
          let bestDist = Infinity;

          cards.forEach((card, i) => {
            const centre = card.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(centre - mid);
            const t = Math.min(dist / card.offsetWidth, 1);
            if (dist < bestDist) {
              bestDist = dist;
              best = i;
            }
            if (reduceMotion) return;
            // Neighbours sit back: smaller, dimmer, copy trailing a little.
            gsap.set(card, { scale: 1 - 0.08 * t });
            gsap.set(card.querySelector(".ph-pillar-veil"), {
              opacity: 0.55 * t,
            });
            gsap.set(card.querySelector(".ph-pillar-text"), {
              x: (centre < mid ? 1 : -1) * 28 * t,
            });
          });

          if (best !== active) {
            active = best;
            dots.forEach((d, i) => {
              d.style.width = i === best ? "2rem" : "0.5rem";
              d.style.opacity = i === best ? "1" : "0.35";
            });
            draw(best);
          }
        }

        function onScroll() {
          if (!raf) raf = requestAnimationFrame(update);
        }

        trackEl.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();

        return () => {
          if (raf) cancelAnimationFrame(raf);
          trackEl.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          gsap.set(lineSets.flat(), {
            clearProps:
              "transform,scale,x,opacity,strokeDasharray,strokeDashoffset",
          });
          cards.forEach((card) => {
            gsap.set(
              [
                card,
                card.querySelector(".ph-pillar-veil"),
                card.querySelector(".ph-pillar-text"),
              ],
              {
                clearProps:
                  "transform,scale,x,opacity,strokeDasharray,strokeDashoffset",
              },
            );
          });
        };
      });
    }

    return () => mm.revert();
  }, []);

  return (
    <>
      <section
        ref={listRef}
        className="ph-pillars-list bg-line-strong py-16 text-oxblood"
        aria-label="How we behave"
      >
        <div className="flex items-end justify-between px-6">
          <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-80">
            How we behave
          </p>
          <p className="font-mono text-xs tracking-[0.12em] uppercase opacity-60">
            Swipe
          </p>
        </div>

        <div
          className="ph-pillars-track mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[10vw] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ overscrollBehaviorX: "contain" }}
        >
          {PILLARS.map((pillar) => (
            <article
              key={pillar.number}
              className="ph-pillar-block relative h-[70svh] min-h-[28rem] w-[80vw] max-w-[26rem] shrink-0 snap-center overflow-hidden"
              style={{ backgroundColor: pillar.bg, color: pillar.fg }}
            >
              <PillarFace pillar={pillar} compact />
              <div
                aria-hidden
                className="ph-pillar-veil pointer-events-none absolute inset-0 z-20 bg-oxblood opacity-0"
              />
            </article>
          ))}
        </div>

        <div
          className="mt-6 flex items-center justify-center gap-2"
          aria-hidden
        >
          {PILLARS.map((pillar, i) => (
            <span
              key={pillar.number}
              className="ph-pillar-dot block h-0.5 bg-oxblood transition-[width,opacity] duration-300"
              style={{
                width: i === 0 ? "2rem" : "0.5rem",
                opacity: i === 0 ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </section>

      <section
        className="ph-pillars-stack bg-brand-black"
        aria-label="How we behave"
      >
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
                <div className="ph-card-veil absolute inset-0 z-20 bg-oxblood opacity-0" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
