import {
  La_Belle_Aurore,
  Nothing_You_Could_Do,
  Reenie_Beanie,
} from "next/font/google";

const flowing = La_Belle_Aurore({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const upright = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const quick = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Each of the three signs in their own hand: different pen pressure, tilt and size. */
const SIGNS = [
  {
    name: "Heidi",
    font: flowing.style.fontFamily,
    className: "text-[clamp(2.4rem,3.8vw,3.3rem)] -rotate-3 translate-y-1",
    ink: "#1b2238",
    delay: "0.5s",
  },
  {
    name: "Saxon",
    font: upright.style.fontFamily,
    className: "text-[clamp(1.9rem,3vw,2.5rem)] -rotate-1 -translate-y-1",
    ink: "#26304a",
    delay: "1.5s",
  },
  {
    name: "Tim",
    font: quick.style.fontFamily,
    className:
      "text-[clamp(2.7rem,4.2vw,3.7rem)] -rotate-[5deg] translate-y-0.5",
    ink: "#171c2e",
    delay: "2.5s",
  },
];

/**
 * The founders' sign-off. Written on left to right, one after another, when
 * it comes into view. Must sit inside a Reveal, which adds .is-visible.
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
            baseFrequency="0.035"
            numOctaves="1"
            seed="5"
            result="warp"
          />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.6" />
        </filter>
      </svg>

      {SIGNS.map((sign, i) => (
        <span key={sign.name} className="contents">
          {i === SIGNS.length - 1 && (
            <span className="pb-3 font-serif text-xl text-ink-soft italic">
              and
            </span>
          )}
          <span
            className={`ph-write inline-block leading-[1.25] ${sign.className}`}
            style={{
              fontFamily: sign.font,
              color: sign.ink,
              filter: "url(#ph-ink)",
              WebkitTextStroke: "0.4px currentColor",
              ["--write-delay" as string]: sign.delay,
            }}
          >
            {sign.name}
            {i === 0 && <span aria-hidden>,</span>}
          </span>
        </span>
      ))}
    </div>
  );
}
