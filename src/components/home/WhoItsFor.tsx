import Label from "@/components/Label";

const FIT = [
  "You're a founder-led fashion or beauty brand with a product people already love.",
  "You're selling, but growth has stalled or started getting expensive.",
  "You've got agencies or freelancers, but nobody senior joining it all up.",
  "You'd rather grow properly than discount your way to a busy month.",
];

const NOT_FIT = [
  "You want the cheapest ad agency going.",
  "You need someone to post three times a day.",
  "You're not ready to change anything.",
];

export default function WhoItsFor() {
  return (
    <section
      aria-labelledby="fit-heading"
      className="px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <Label>Who it&apos;s for</Label>
        <h2
          id="fit-heading"
          className="mt-6 max-w-[26ch] text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.08] font-light tracking-[-0.04em]"
        >
          We work with a small number of brands at a time. This is who
          we&apos;re best for.
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12 lg:pr-20">
            <h3 className="text-lg font-bold">A good fit if</h3>
            <ul className="mt-6 space-y-5">
              {FIT.map((item) => (
                <li key={item} className="flex gap-4 text-lg leading-snug">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 6.4 5 8.8l4.5-5.2" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-hairline pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-20">
            <h3 className="text-lg font-bold text-brand-grey">
              Probably not if
            </h3>
            <ul className="mt-6 space-y-5">
              {NOT_FIT.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-lg leading-snug text-brand-grey"
                >
                  <span
                    aria-hidden
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-grey"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
