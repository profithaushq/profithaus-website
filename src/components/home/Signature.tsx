import { Caveat, Indie_Flower, Reenie_Beanie } from "next/font/google";

const biro = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const casual = Caveat({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});
const quick = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Each of the three signs in their own hand: different pen, tilt and size. */
const SIGNS = [
  {
    name: "Heidi",
    font: biro.style.fontFamily,
    className: "text-[clamp(1.7rem,2.7vw,2.3rem)] -rotate-2 translate-y-1",
    ink: "#1b2238",
    delay: "0.5s",
  },
  {
    name: "Saxon",
    font: casual.style.fontFamily,
    className: "text-[clamp(1.9rem,2.9vw,2.5rem)] -rotate-1 -translate-y-1",
    ink: "#26304a",
    delay: "1.5s",
  },
  {
    name: "Tim",
    font: quick.style.fontFamily,
    className:
      "text-[clamp(2.1rem,3.2vw,2.7rem)] -rotate-[3deg] translate-y-0.5",
    ink: "#171c2e",
    delay: "2.5s",
  },
];

/** A small seeded random, so server and browser agree on every letter. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** No two letters in a real hand are the same: nudge each one. */
function Letters({ text, seed }: { text: string; seed: number }) {
  const r = rng(seed);
  return (
    <>
      {text.split("").map((ch, i) => {
        const rot = (r() - 0.5) * 5;
        const y = (r() - 0.5) * 0.1;
        const scale = 0.93 + r() * 0.15;
        const press = 0.72 + r() * 0.28;
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block"
            style={{
              transform: `translateY(${y}em) rotate(${rot}deg) scale(${scale})`,
              opacity: press,
            }}
          >
            {ch}
          </span>
        );
      })}
    </>
  );
}

/**
 * The founders' sign-off, in plain everyday handwriting. Written on left to
 * right, one after another. Must sit inside a Reveal, which adds .is-visible.
 */
export default function Signature() {
  return (
    <div className="mt-10 flex flex-wrap items-end gap-x-5 gap-y-3">
      <span className="pb-3 font-sans text-[11px] font-medium tracking-[0.18em] text-burgundy uppercase">
        Signed
      </span>

      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id="ph-ink" x="-5%" y="-25%" width="110%" height="150%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.04"
            numOctaves="1"
            seed="5"
            result="warp"
          />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.8" />
        </filter>
      </svg>

      <div className="relative flex flex-wrap items-end gap-x-5 gap-y-3">
        {SIGNS.map((sign, i) => (
          <span key={sign.name} className="contents">
            {i === SIGNS.length - 1 && (
              <span className="pb-3 font-serif text-xl text-ink-soft italic">
                and
              </span>
            )}
            <span
              role="text"
              aria-label={sign.name + (i === 0 ? "," : "")}
              className={`ph-write inline-block leading-[1.25] ${sign.className}`}
              style={{
                fontFamily: sign.font,
                color: sign.ink,
                filter: "url(#ph-ink)",
                WebkitTextStroke: "0.35px currentColor",
                textShadow: "0 0 0.7px currentColor",
                ["--write-delay" as string]: sign.delay,
              }}
            >
              <Letters text={sign.name} seed={i * 97 + 13} />
              {i === 0 && (
                <span aria-hidden className="ml-2 inline-block">
                  ,
                </span>
              )}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
