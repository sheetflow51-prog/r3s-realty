import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";

const FEATURES = [
  {
    title: "Clear Legal Titles",
    body: "Every plot is title-searched and RERA-aligned. We hand over a complete documentation file with the registry — including mutation guidance.",
  },
  {
    title: "Strategic Locations",
    body: "Our land bank sits along the upcoming Greater Agra Township corridor — Raipur, Rahankalan and the Etmadpur highway belt.",
  },
  {
    title: "Personal Attention",
    body: "You won't be passed between agents. Raju ji walks every site himself, takes calls personally, and stays on after the registry.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="relative section bg-bg overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80)",
          backgroundAttachment: "fixed",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg" aria-hidden />

      <div className="container-page relative z-10">
        <SectionHeading
          number="01"
          label="About"
          title="Built on trust. Rooted in Etmadpur."
          emWord="trust"
        />

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-xl"
          >
            <p className="body-text text-base md:text-lg">
              R³S Realty began at a roadside chai stall in Barhan Chauraha — a
              decade ago, with a single notebook of land records and the
              patience to verify each entry by foot. Today, the office still
              sits above S.R. Super Market, and Raju Sharma still personally
              shows every plot.
            </p>
            <p className="body-text text-base md:text-lg">
              What grew from a one-man practice is now a quiet authority on the
              Etmadpur block — 500+ families housed, three active land belts,
              and one principle that has not moved:{" "}
              <span className="text-text">show the buyer the soil</span> before
              you show them the price.
            </p>
            <p className="body-text text-base md:text-lg italic font-serif">
              "We are not building a brand. We are stewarding land for the next
              generation of Etmadpur."
            </p>
            <div className="pt-4 flex items-center gap-4 text-text-muted">
              <div className="h-px w-10 bg-gold/50" />
              <span className="text-[11px] uppercase tracking-[0.25em]">
                Raju Sharma, Founder
              </span>
            </div>
          </motion.div>

          <div className="lg:pt-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`py-8 ${
                  i !== 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="flex items-baseline gap-6">
                  <span className="section-number text-text-dim">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-text">
                      {f.title}
                    </h3>
                    <p className="body-text mt-3 text-sm md:text-base">
                      {f.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
