export default function Marquee({ items }: { items: string[] }) {
  const repeated = Array.from({ length: 8 }).flatMap(() => items);

  return (
    <div className="overflow-hidden">
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
  );
}
