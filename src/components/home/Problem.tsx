import Label from "@/components/Label";
import LivingBackground from "@/components/LivingBackground";
import { BRAND_NAME } from "@/config/site";

const COLUMNS = [
  {
    title: "Performance agencies",
    body: "Very good at buying traffic. Also very good at discounting a brand into the ground to hit a ROAS target, then wondering why nobody pays full price anymore.",
  },
  {
    title: "Brand agencies",
    body: "Make everything look beautiful. Go slightly quiet when someone mentions conversion rate.",
  },
  {
    title: BRAND_NAME,
    us: true,
    body: "One senior brain doing both. We protect what makes the brand desirable, and make sure it actually sells.",
  },
];

export default function Problem() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="on-dark grain relative overflow-hidden bg-brand-black px-6 py-24 text-white sm:px-10 sm:py-36"
    >
      <LivingBackground className="absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1280px]">
        <Label onDark>The problem</Label>
        <h2
          id="problem-heading"
          className="display mt-8 max-w-[22ch] text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.04]"
        >
          Fashion and beauty brands usually end up choosing between{" "}
          <em>two kinds</em> of agency. Neither was built for them.
        </h2>

        <div className="mt-16 grid border-t border-white/15 md:mt-24 md:grid-cols-3">
          {COLUMNS.map((col, i) => (
            <div
              key={col.title}
              className="border-b border-white/15 py-9 last:border-b-0 md:border-b-0 md:border-l md:px-9 md:py-12 md:first:border-l-0 md:first:pl-0"
            >
              <p
                aria-hidden
                className="display text-2xl text-white/35 tabular-nums"
              >
                0{i + 1}
              </p>
              <h3
                className={`mt-5 flex items-center gap-3 text-lg font-bold ${
                  col.us ? "text-white" : "text-white/90"
                }`}
              >
                {col.us && (
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full bg-brand-red-on-dark"
                  />
                )}
                {col.title}
              </h3>
              <p
                className={`mt-4 leading-relaxed ${
                  col.us ? "text-white" : "text-white/65"
                }`}
              >
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
