import ImageSlot from "@/components/ImageSlot";

export default function PointOfView() {
  return (
    <section
      aria-labelledby="pov-heading"
      className="bg-bone px-6 py-32 sm:px-10 sm:py-40 lg:px-14 lg:py-48"
    >
      <div className="mx-auto grid max-w-[1440px] gap-y-20 lg:grid-cols-12 lg:gap-x-10">
        <h2
          id="pov-heading"
          className="display text-[clamp(2.8rem,6.4vw,7rem)] lg:col-span-8"
        >
          Most brands are told to choose. Grow, or stay desirable.
        </h2>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <ImageSlot
            slot="point"
            className="mb-10 aspect-square w-3/5 lg:ml-auto"
            sizes="(min-width: 1024px) 20vw, 60vw"
          />
        </div>

        <p className="max-w-md text-ink-soft lg:col-span-4 lg:col-start-5">
          Performance agencies buy traffic and discount the brand to pay for it.
          Brand agencies protect the look and avoid the numbers. We do both,
          from one senior seat.
        </p>
      </div>
    </section>
  );
}
