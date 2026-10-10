import Reveal from "@/components/Reveal";

const GROUNDS = {
  white: "bg-white text-oxblood",
  porcelain: "bg-porcelain text-oxblood",
  oxblood: "bg-oxblood text-white",
} as const;

/**
 * One chapter of the About story: a numbered block on its own ground, with
 * the title set large in serif and the copy beside it.
 */
export default function StoryBand({
  number,
  title,
  paragraphs,
  ground = "white",
}: {
  number: string;
  title: string;
  paragraphs: string[];
  ground?: keyof typeof GROUNDS;
}) {
  const dark = ground === "oxblood";
  return (
    <section className={`px-6 py-32 sm:px-10 sm:py-44 ${GROUNDS[ground]}`}>
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <Reveal>
          <p
            className={`font-sans font-medium text-xs tracking-[0.12em] uppercase ${
              dark ? "text-powder" : "text-burgundy"
            }`}
          >
            {number}
          </p>
          <h2 className="mt-5 font-serif text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.95] tracking-[-0.03em]">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={140} className="space-y-6">
          {paragraphs.map((p) => (
            <p
              key={p}
              className={`max-w-xl text-base leading-relaxed sm:text-lg ${
                dark ? "text-white/90" : "text-ink"
              }`}
            >
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
