const ITEMS = [
  "Plots from ₹8,99,999",
  "100 sq.yd",
  "3 Land Belts",
  "Etmadpur, Agra",
];

export default function StatsBanner() {
  return (
    <section className="bg-bg-2 border-y border-border py-7">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          {ITEMS.map((item, i) => (
            <div key={item} className="flex items-center gap-8">
              <span className="font-display text-base md:text-lg text-text">
                {item}
              </span>
              {i < ITEMS.length - 1 && (
                <span className="text-gold text-xl" aria-hidden>
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
