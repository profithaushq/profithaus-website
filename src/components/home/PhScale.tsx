"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import PH from "@/components/PH";

const STEPS = Array.from({ length: 15 }, (_, i) => i);

type Phase = "profit" | "haus" | "testing" | "neutral";

const COPY: Record<Phase, { tag: string; line: string }> = {
  profit: {
    tag: "Too profit",
    line: "Discount every Friday. Wonder why nobody pays full price.",
  },
  haus: {
    tag: "Too haus",
    line: "Beautiful site. Checkout nobody can find.",
  },
  testing: {
    tag: "Testing",
    line: "We test where the brand sits, then move it.",
  },
  neutral: {
    tag: "Neutral",
    line: "Wanted, and easy to buy from.",
  },
};

// How strongly a bar lights as the reading passes it (a soft bump, not a spike)
const bump = (d: number) => Math.exp(-(d * d) / (2 * 1.15 * 1.15));

/**
 * The brand idea as an instrument. As you scroll, the reading swings from
 * 2.0 (too profit) across to 12.0 (too haus) and settles at 7.0, and the
 * divide travels with it: the point in the logo is where balance sits.
 */
export default function PhScale() {
  const sectionRef = useRef<HTMLElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const intRef = useRef<HTMLSpanElement>(null);
  const decRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("neutral");
  const phaseRef = useRef<Phase>("neutral");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scale = scaleRef.current;
    const line = lineRef.current;
    const intEl = intRef.current;
    const decEl = decRef.current;
    if (!section || !scale || !line || !intEl || !decEl) return;

    const bars = Array.from(
      scale.querySelectorAll<HTMLElement>(".ph-bar"),
    );
    const fills = bars.map((b) => b.querySelector<HTMLElement>(".ph-bar-fill")!);
    const lights = bars.map((b) => b.querySelector<HTMLElement>(".ph-bar-on")!);
    const nums = bars.map((b) => b.querySelector<HTMLElement>(".ph-bar-num")!);

    let cx = 0;
    let cw = 0;
    const measure = () => {
      const s = scale.getBoundingClientRect();
      const r = section.getBoundingClientRect();
      cx = s.left - r.left;
      cw = s.width;
    };

    const render = (v: number) => {
      const whole = Math.floor(v + 1e-6);
      intEl.textContent = String(whole);
      decEl.textContent = "." + String(Math.round((v - whole) * 10) % 10);
      bars.forEach((_, i) => {
        const k = bump(i - v);
        fills[i].style.height = `${28 + 52 * k}px`;
        lights[i].style.opacity = String(Math.min(1, k * 1.15));
        nums[i].style.opacity = String(0.45 + 0.55 * k);
      });
      // The divide rides the reading, edge to edge down the section
      const x = cx + ((v + 0.5) / 15) * cw;
      line.style.transform = `translate3d(${x}px,0,0)`;
    };

    const setPhaseIf = (p: Phase) => {
      if (phaseRef.current !== p) {
        phaseRef.current = p;
        setPhase(p);
      }
    };

    measure();
    render(7);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { v: 2 };
      render(2);
      setPhaseIf("profit");

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onRefresh: measure,
          },
          onUpdate: () => {
            render(state.v);
            const p = tl.progress();
            if (p > 0.985) setPhaseIf("neutral");
            else if (state.v < 4.6 && p < 0.3) setPhaseIf("profit");
            else if (state.v > 9.4) setPhaseIf("haus");
            else setPhaseIf("testing");
          },
        });
        tl.to(state, { v: 2, duration: 0.12, ease: "none" })
          .to(state, { v: 12, duration: 0.5, ease: "power1.inOut" })
          .to(state, { v: 7, duration: 0.38, ease: "power2.out" });
      }, section);

      return () => {
        ctx.revert();
        render(7);
        setPhaseIf("neutral");
      };
    });

    const onResize = () => {
      measure();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mm.revert();
    };
  }, []);

  const copy = COPY[phase];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ph-idea-heading"
      className="relative overflow-hidden bg-porcelain py-28 text-oxblood sm:py-36"
    >
      {/* The divide: vertical, edge to edge, one per layout */}
      <span
        ref={lineRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-oxblood will-change-transform"
        style={{ transform: "translate3d(50%,0,0)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex items-baseline justify-between font-mono text-xs tracking-[0.12em] text-burgundy uppercase">
          <span>The idea</span>
          <span>
            <PH /> 0 to 14
          </span>
        </div>

        <h2
          id="ph-idea-heading"
          className="mt-8 max-w-4xl font-serif text-[clamp(2rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.02em]"
        >
          <PH /> measures balance. Too much profit and a brand goes cold. Too
          much haus and <em>nothing sells.</em> We test where a brand sits and
          bring it back to 7.
        </h2>

        <div className="mt-16 grid items-end gap-10 lg:mt-24 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div aria-live="polite" className="min-w-0">
            <p
              className="font-serif leading-[0.82] tracking-[-0.04em]"
              style={{ fontSize: "clamp(7rem, 20vw, 17rem)" }}
              aria-label="Current reading"
            >
              <span ref={intRef}>7</span>
              <em ref={decRef}>.0</em>
            </p>
            <p className="mt-6 font-mono text-xs tracking-[0.12em] uppercase">
              {copy.tag}
            </p>
            <p className="mt-2 max-w-xs text-base leading-snug text-ink-soft">
              {copy.line}
            </p>
          </div>

          <div className="min-w-0">
            <div
              ref={scaleRef}
              className="grid items-end gap-[3px]"
              style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
              role="img"
              aria-label="A pH scale from 0, all profit, to 14, all haus, with 7 as neutral."
            >
              {STEPS.map((n) => (
                <div
                  key={n}
                  className="ph-bar flex flex-col items-center gap-1.5"
                >
                  <div className="relative flex w-full flex-col justify-end">
                    <div
                      className="ph-bar-fill relative w-full bg-line-strong"
                      style={{ height: 28 }}
                    >
                      <span className="ph-bar-on absolute inset-0 bg-oxblood opacity-0" />
                    </div>
                  </div>
                  <span className="ph-bar-num font-mono text-[10px] tabular-nums sm:text-[11px]">
                    {n}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between font-mono text-[10px] tracking-[0.08em] uppercase sm:text-[11px]">
              <span>0 · All profit</span>
              <span className="hidden sm:inline">7 · profithaus</span>
              <span>14 · All haus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
