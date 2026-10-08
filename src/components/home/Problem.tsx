import Label from "@/components/Label";
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
      className="on-dark bg-brand-black px-6 py-20 text-white sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <Label onDark>The problem</Label>
        <h2
          id="problem-heading"
          className="mt-6 max-w-[26ch] text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.08] font-light tracking-[-0.04em]"
        >
          Fashion and beauty brands usually end up choosing between two kinds of
          agency. Neither was built for them.
        </h2>

        <div className="mt-14 grid border-t border-white/15 md:mt-20 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              className="border-b border-white/15 py-8 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0"
            >
              <h3
                className={`flex items-center gap-3 text-lg font-bold ${
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
