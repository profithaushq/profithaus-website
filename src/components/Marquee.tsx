export default function Marquee({ items }: { items: string[] }) {
  const repeated = Array.from({ length: 8 }).flatMap(() => items);

  return (
    <>
      <div className="overflow-hidden sm:hidden">
        <div className="marquee-track flex w-max gap-16">
          {repeated.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="whitespace-nowrap text-sm font-medium text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-x-16 gap-y-3 sm:flex">
        {items.map((item) => (
          <span
            key={item}
            className="whitespace-nowrap text-sm font-medium text-ink-soft"
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
}
