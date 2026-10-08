import Label from "@/components/Label";

const STEPS = [
  {
    title: "Apply",
    body: "Tell us about the brand. A few minutes, no deck required.",
  },
  {
    title: "Strategy session",
    body: "A working session on the brand, the numbers and the channels. You leave knowing what's holding growth back.",
  },
  {
    title: "Growth plan",
    body: "One plan across brand, content, channels and the website, with priorities, owners and a calendar.",
  },
  {
    title: "Ongoing partnership",
    body: "We stay on as your senior growth lead, running the rhythm with your team and agencies.",
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-heading"
      className="border-t border-hairline px-6 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <Label>How it works</Label>
        <h2 id="how-heading" className="sr-only">
          How it works
        </h2>

        <ol className="relative mt-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* A hairline running through the numbers on wide screens */}
          <span
            aria-hidden
            className="absolute top-[22px] right-0 left-0 hidden h-px bg-hairline lg:block"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-base font-bold text-white ring-[10px] ring-white"
              >
                {i + 1}
              </span>
              <h3 className="display mt-8 text-[2rem] leading-none !font-normal">
                {step.title}
              </h3>
              <p className="mt-4 leading-relaxed text-brand-grey">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
