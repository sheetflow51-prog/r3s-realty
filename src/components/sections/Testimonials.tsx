import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";

interface Testimonial {
  name: string;
  village: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ramesh Kumar",
    village: "Aharan",
    quote:
      "Raju ji personally showed me five plots in one afternoon. Honest pricing, no pressure, and we were sipping chai by sundown talking about my daughter's plans.",
  },
  {
    name: "Sunita Devi",
    village: "Khandauli",
    quote:
      "A corner plot near the township area. Thirty percent appreciation already — but more than that, the documents were so clean my brother-in-law (an advocate) had nothing to correct.",
  },
  {
    name: "Manoj Sharma",
    village: "Etmadpur",
    quote:
      "Six thousand two hundred rupees a month. That's what my EMI started at. The bank tie-up Raju ji arranged saved me three rounds of paperwork.",
  },
  {
    name: "Priya Singh",
    village: "Tundla",
    quote:
      "Site visit arranged the same day I called. We were picked up from the bus stand. Small things — but they tell you who is serious.",
  },
  {
    name: "Rakesh Verma",
    village: "Barhan",
    quote:
      "Registry done in two weeks. Mutation done in three. The R3S office stayed on the phone with the tehsildar's clerk every step.",
  },
  {
    name: "Anita Gupta",
    village: "Raipur",
    quote:
      "We invested early, when 'Greater Agra' was still a Twitter rumour. Today the same plot has trebled. R3S saw it before anyone else did.",
  },
];

function avatarUrl(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=1a5f2a&color=c9a227&size=96&font-size=0.4`;
}

export default function Testimonials() {
  return (
    <section className="section bg-bg-2 border-y border-border">
      <div className="container-page">
        <SectionHeading
          number="06"
          label="Testimonials"
          title="The families who said yes."
          emWord="yes"
        />

        <div className="columns-1 md:columns-2 gap-8 [&>*]:break-inside-avoid">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="mb-8 bg-bg border border-border-strong p-8 md:p-10"
            >
              <span className="font-display text-5xl text-gold leading-none">
                "
              </span>
              <blockquote className="mt-2 font-display italic text-xl md:text-2xl text-text leading-snug">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <img
                  src={avatarUrl(t.name)}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="text-text font-light">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-text-muted mt-0.5">
                    {t.village}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
