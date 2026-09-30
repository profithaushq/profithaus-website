import Button from "@/components/Button";
import HeroBand from "@/components/HeroBand";
import CinematicHero from "@/components/CinematicHero";
import Scene from "@/components/Scene";
import KineticStatement from "@/components/KineticStatement";
import AccentSwoosh from "@/components/AccentSwoosh";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";

const HERO_FRAMES = [
  {
    src: "/hero/frame-01.jpg",
    alt: "Warm, sculptural light and shadow study in profithaus brand tones",
  },
  {
    src: "/hero/frame-02.webp",
    alt: "Flowing warm-toned light forms in profithaus brand tones",
  },
];

const EYEBROW =
  "font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-accent";

type Stat = {
  value: number | null;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 50, prefix: "£", suffix: "m+", label: "Revenue managed" },
  { value: null, display: "Mid Luxury", label: "& high end luxury brands" },
  { value: 8, suffix: "+ Yrs", label: "In-house expertise" },
  { value: null, display: "Corporate", label: "Giant background" },
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
      "From trading to website performance to the numbers behind it, we know the full picture, so if something's not converting or the margins don't add up, we've probably already spotted it.",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Ecommerce Trading",
    description:
      "A data-led approach to improving how your website performs: product focus, pricing and merchandising, customer journey and overall trading strategy.",
  },
  {
    number: "02",
    title: "Website Build & Management",
    description:
      "Full-service website builds and ongoing management to keep your site trading efficiently, performing smoothly, and looking every bit as premium as your brand.",
  },
  {
    number: "03",
    title: "Digital Business Management",
    description:
      "Full oversight of the commercial engine behind your site: margins, P&Ls, cost of goods and contribution by SKU, so growth decisions are made against real profitability, not just top-line revenue.",
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
      "Focused execution support on a specific initiative: a full site rebuild, a trading strategy overhaul, or a deep-dive margin and P&L audit, scoped and delivered as a defined piece of work.",
  },
  {
    title: "Retainers",
    description:
      "Embedded, hands-on support working as a true extension of your team, driving ongoing commercial growth through consistent execution, optimisation, and proactive input across trading, your website and the numbers behind the business.",
  },
];

export default function Home() {
  return (
    <>
      <CinematicHero images={HERO_FRAMES}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Manchester, UK · Barcelona, ES
          </p>
          <p className="mt-4 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Ecommerce partner for luxury brands
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-3xl font-light tracking-tight leading-[1.1] sm:text-6xl">
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
      </CinematicHero>

      <Scene background="dark" parallaxLabel="RESULTS">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-16 px-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="scene-item text-center">
              <p className="font-[family-name:var(--font-heading)] text-4xl font-light sm:text-6xl">
                {stat.value !== null ? (
                  <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </p>
              <p className="mt-3 font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-wide text-white/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Scene>

      <section className="border-y border-ink/10 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-center font-[family-name:var(--font-mono-accent)] text-xs font-medium uppercase tracking-wide text-ink-soft">
            Previously operated
          </p>
          <Marquee
            items={["LookFantastic", "Coggles", "Known Nutrition", "DMR Jewellery"]}
          />
        </div>
      </section>

      <KineticStatement
        eyebrow="Our approach"
        segments={[
          { text: "Built from years in-house," },
          { text: "led inside D2C giants,", accent: true },
          { text: "with a commercial and creative mindset," },
          { text: "and one 360 view of the business.", accent: true },
        ]}
      />

      <Scene background="light">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className={EYEBROW}>The Profit Haus Method™</p>
            <AccentSwoosh className="mt-3" />
            <p className="mt-4 max-w-2xl text-ink-soft">
              Running a luxury ecommerce brand is hard enough without
              disconnected strategies and a site that looks the part but
              doesn&apos;t pay you back. We&apos;re selective by design, because
              the best results come when we&apos;re genuinely invested.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 sm:grid-cols-2">
            {METHOD_PILLARS.map((pillar) => (
              <div key={pillar.number} className="scene-item group flex gap-5">
                <span className="font-[family-name:var(--font-mono-accent)] text-2xl font-medium text-accent/50 transition-colors group-hover:text-accent">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-medium text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <Scene background="dark" parallaxLabel="TRADE">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className={EYEBROW}>What we do</p>
            <p className="mt-3 max-w-xl font-[family-name:var(--font-heading)] text-2xl font-light sm:text-4xl">
              Built for brands that want to look premium and sell more.
            </p>
          </Reveal>

          <div className="mt-16 flex flex-col divide-y divide-white/10">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="scene-item grid gap-4 py-10 sm:grid-cols-[auto_1fr] sm:gap-10"
              >
                <span className="font-[family-name:var(--font-mono-accent)] text-sm font-medium text-white/40">
                  {service.number}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-light sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-white/70">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <Scene background="light">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className={EYEBROW}>How we do it</p>
            <p className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-light sm:text-4xl">
              Flexible engagement, senior-led every time.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="scene-item h-full rounded-2xl bg-maroon p-8 text-white transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="font-[family-name:var(--font-heading)] text-base font-medium">
                  {model.title}
                </h3>
                <p className="mt-3 text-sm text-white/80">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      <HeroBand>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-light sm:text-3xl">
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
