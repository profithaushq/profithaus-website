import Label from "@/components/Label";
import SilkLines from "@/components/SilkLines";

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
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-36"
    >
      <SilkLines className="-scale-x-100 text-brand-black/[0.08]" count={14} />
      <div className="relative mx-auto max-w-[1280px]">
        <Label>Who it&apos;s for</Label>
        <h2
          id="fit-heading"
          className="display mt-8 max-w-[22ch] text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.04]"
        >
          We work with a small number of brands at a time. This is who
          we&apos;re <em>best</em> for.
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12 lg:pr-20">
            <h3 className="text-lg font-bold">A good fit if</h3>
            <ul className="mt-6 divide-y divide-hairline border-t border-hairline">
              {FIT.map((item) => (
                <li key={item} className="flex gap-4 py-5 text-lg leading-snug">
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

          <div className="md:border-l md:border-hairline md:pl-12 lg:pl-20">
            <h3 className="text-lg font-bold text-brand-grey">
              Probably not if
            </h3>
            <ul className="mt-6 divide-y divide-hairline border-t border-hairline">
              {NOT_FIT.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 py-5 text-lg leading-snug text-brand-grey"
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
