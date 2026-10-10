import ImageSlot from "@/components/ImageSlot";
import Label from "@/components/Label";

const STEPS = [
  { n: "01", title: "Apply", body: "A few questions about the brand." },
  {
    n: "02",
    title: "Conversation",
    body: "A working session on where growth is stuck.",
  },
  {
    n: "03",
    title: "Plan",
    body: "One plan across brand, content, channels and the website.",
  },
];

export default function HowItBegins() {
  return (
    <section
      aria-labelledby="begins-heading"
      className="px-6 py-32 sm:px-10 sm:py-40 lg:px-14 lg:py-48"
    >
      <div className="mx-auto max-w-[1440px]">
        <Label>How it begins</Label>
        <h2 id="begins-heading" className="sr-only">
          How it begins
        </h2>

        <ImageSlot
          slot="spread"
          className="mt-12 aspect-[16/7] w-full sm:mt-16 lg:w-[78%]"
          sizes="(min-width: 1024px) 70vw, 100vw"
        />

        <ol className="mt-20 grid gap-y-12 md:mt-28 md:grid-cols-3 md:gap-x-10">
          {STEPS.map((step) => (
            <li key={step.title} className="border-t border-hairline pt-6">
              <span
                aria-hidden
                className="display block text-2xl text-ink-soft"
              >
                {step.n}
              </span>
              <h3 className="caps mt-6 text-brand-black">{step.title}</h3>
              <p className="mt-4 max-w-[30ch] text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-16 max-w-md text-ink-soft">
          We work with a small number of founder-led fashion and beauty brands
          at a time.
        </p>
      </div>
    </section>
  );
}
