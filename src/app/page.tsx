import Button from "@/components/Button";
import HeroBand from "@/components/HeroBand";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";

const EYEBROW =
  "font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-accent";

const SERVICES = [
  {
    title: "Ecommerce Trading",
    description:
      "A data-led approach to improving how your website performs: product focus, pricing and merchandising, customer journey and overall trading strategy.",
  },
  {
    title: "Website Build & Management",
    description:
      "Full-service website builds and ongoing management to keep your site trading efficiently, performing smoothly, and looking every bit as premium as your brand.",
  },
  {
    title: "Digital Business Management",
    description:
      "Full oversight of the commercial engine behind your site: margins, P&Ls, cost of goods and contribution by SKU, so growth decisions are made against real profitability, not just top-line revenue.",
  },
];

const METHOD_PILLARS = [
  {
    number: "01",
    title: "In-Haus DNA",
    description:
      "Built from years in-house, we know how strong internal teams actually think and operate, because we've been there, done it, and made it work.",
  },
  {
    number: "02",
    title: "Senior Leadership",
    description:
      "We've been in leadership inside D2C giants, making the big calls, rolling up our sleeves and leading execution that actually moves the business forward.",
  },
  {
    number: "03",
    title: "Commercial & Creative Mindset",
    description:
      "We're all about performance, profitability, and industry reputation, not vanity metrics that look cute in reports but don't pay the bills.",
  },
  {
    number: "04",
    title: "360 Strategy",
    description:
      "From trading to marketing to creative, we know the full funnel inside out, so if something's not converting, we've probably already spotted it.",
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Consulting",
    description:
      "Regular strategic support and direction when you need senior-level input: expert guidance on strategy, priorities, decision-making and growth opportunities without full end-to-end execution.",
  },
  {
    title: "One Time Project",
    description:
      "Focused execution support on specific initiatives: product launch strategies, BTS and shoot-day content creation, and other defined marketing or brand activations.",
  },
  {
    title: "Retainers",
    description:
      "Embedded, hands-on support working as a true extension of your team, driving ongoing commercial growth through consistent execution, optimisation, and proactive input across your key channels.",
  },
];

export default function Home() {
  return (
    <>
      <HeroBand>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
          <p className="font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Manchester, UK · Barcelona, ES
          </p>
          <p className="mt-4 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Ecommerce partner for luxury brands
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-normal uppercase tracking-tight leading-tight sm:text-4xl">
            Making brands harder to ignore and easier to buy from
          </h1>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/apply" variant="solid-white">
              Book a call
            </Button>
            <Button href="/about-us" variant="outline-white">
              About us
            </Button>
          </div>
        </div>
      </HeroBand>

      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-16 sm:grid-cols-4">
          <Reveal className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-medium sm:text-3xl">
              <CountUp to={50} prefix="£" suffix="m+" />
            </p>
            <p className="mt-2 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-wide text-ink-soft">
              Revenue managed
            </p>
          </Reveal>
          <Reveal delay={100} className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-medium text-accent sm:text-3xl">
              Mid Luxury
            </p>
            <p className="mt-2 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-wide text-ink-soft">
              & high end luxury brands
            </p>
          </Reveal>
          <Reveal delay={200} className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-medium sm:text-3xl">
              <CountUp to={8} suffix="+ Yrs" />
            </p>
            <p className="mt-2 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-wide text-ink-soft">
              In-house expertise
            </p>
          </Reveal>
          <Reveal delay={300} className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-medium sm:text-3xl">
              Corporate
            </p>
            <p className="mt-2 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-wide text-ink-soft">
              Giant background
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-center font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-wide text-ink-soft">
            Previously operated
          </p>
          <Marquee
            items={["LookFantastic", "Coggles", "Known Nutrition", "DMR Jewellery"]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className={EYEBROW}>Our approach</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-medium sm:text-2xl">
            The Profit Haus Method™
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Running a luxury ecommerce brand is hard enough without
            disconnected strategies and a site that looks the part but
            doesn&apos;t pay you back. We&apos;re selective by design, because
            the best results come when we&apos;re genuinely invested.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {METHOD_PILLARS.map((pillar, i) => (
            <Reveal key={pillar.number} delay={i * 100} className="group flex gap-5">
              <span className="font-[family-name:var(--font-mono-accent)] text-2xl font-medium text-accent/50 transition-colors group-hover:text-accent">
                {pillar.number}
              </span>
              <div>
                <h3 className="font-medium text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className={EYEBROW}>What we do</p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-heading)] text-xl font-medium sm:text-2xl">
              Built for brands that want to look premium and sell more.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal
                key={service.title}
                delay={(i % 3) * 100}
                className="group rounded-2xl border border-transparent p-5 -m-5 transition-colors hover:border-ink/10 hover:bg-cream"
              >
                <h3 className="font-medium text-ink">{service.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {service.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className={EYEBROW}>How we do it</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-medium sm:text-2xl">
            Flexible engagement, senior-led every time.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model, i) => (
            <Reveal key={model.title} delay={i * 100}>
              <div className="h-full rounded-2xl bg-maroon p-8 text-white transition-transform duration-300 hover:-translate-y-1">
                <h3 className="font-[family-name:var(--font-heading)] text-base font-medium">
                  {model.title}
                </h3>
                <p className="mt-3 text-sm text-white/80">
                  {model.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <HeroBand>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-medium sm:text-2xl">
            Got a question or want to get in touch?
          </h2>
          <p className="max-w-xl text-white/80">
            Fill out our form and we&apos;ll get back to you as soon as
            possible.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Button href="/faq" variant="solid-white">
              Contact us
            </Button>
            <Button href="/apply" variant="outline-white">
              Apply to work with us
            </Button>
          </div>
        </div>
      </HeroBand>
    </>
  );
}
