import ImageSlot from "@/components/ImageSlot";
import Label from "@/components/Label";

const ITEMS = [
  {
    title: "Brand",
    body: "Why someone pays full price for you, and making sure every channel protects it.",
  },
  {
    title: "Content",
    body: "Campaigns, social and creators planned around launches and drops, not posted to fill a grid.",
  },
  {
    title: "Channels",
    body: "Email, paid, organic and marketplaces off the same plan, with the specialists you already pay pointed in one direction.",
  },
  {
    title: "Website",
    body: "Merchandising, product pages and the trading calendar, so the traffic you pay for converts.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="scroll-mt-20 px-6 py-32 sm:px-10 sm:py-40 lg:px-14 lg:py-48"
    >
      <div className="mx-auto grid max-w-[1440px] gap-y-20 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Label>Approach</Label>
          <h2
            id="approach-heading"
            className="display mt-8 text-[clamp(2.8rem,5.6vw,6rem)]"
          >
            One plan, not four invoices.
          </h2>
          <ImageSlot
            slot="approach"
            className="mt-16 aspect-[3/4] w-full max-w-md lg:mt-24"
            sizes="(min-width: 1024px) 32vw, 90vw"
          />
        </div>

        {/* Staggered, like a lookbook spread: the second column sits lower */}
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:pt-56">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`border-t border-hairline pt-6 ${
                i % 2 === 1 ? "sm:mt-24" : ""
              }`}
            >
              <h3 className="caps text-brand-black">{item.title}</h3>
              <p className="mt-5 max-w-[32ch] text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
