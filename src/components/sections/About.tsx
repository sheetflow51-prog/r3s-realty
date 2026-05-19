import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import GeometricBg from "../shared/GeometricBg";

const ITEMS = [
  {
    title: "Clear Legal Titles",
    text:
      "Every plot and shop comes with verified documentation, RERA approval where applicable, and bank financing options ready.",
  },
  {
    title: "Strategic Locations",
    text:
      "From Etmadpur core to Khandauli, Barhan, Tundla, and the Kakua–Baad belt adjoining ADA's Atalpuram township.",
  },
  {
    title: "Personal Attention",
    text:
      "Direct relationship with Raju Sharma — no agents, no middlemen, no inflated commissions.",
  },
];

const TRUST_CARDS = [
  {
    image: "/images/approved-colony.png",
    label: "Approved Colony",
    alt: "RERA approved colony layout R3S Realty Agra",
  },
  {
    image: "/images/clear-titles2.png",
    label: "Clear Titles",
    alt: "Clear title RERA approved plots R3S Realty Agra",
  },
  {
    image: "/images/planned-dev2.png",
    label: "Planned Development",
    alt: "Planned infrastructure development R3S Realty Agra",
  },
];

function LotusWatermark() {
  return (
    <svg
      aria-hidden
      viewBox="-50 -50 100 100"
      className="absolute -right-32 -bottom-24 spin-slow pointer-events-none"
      style={{ width: 600, height: 600, opacity: 0.04 }}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`} style={{ transformOrigin: "0 0" }}>
          <ellipse cx="0" cy="-22" rx="8" ry="22" fill="currentColor" />
        </g>
      ))}
      <circle cx="0" cy="0" r="6" fill="currentColor" />
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="section bg-bg relative overflow-hidden">
      <div className="text-gold">
        <LotusWatermark />
      </div>
      <GeometricBg variant="cubes" />

      <div className="container-page relative">
        <SectionHeading
          number="01"
          label="About"
          title="RERA Approved Colony | Clear Titles | Planned Development"
          emWord="Clear Titles"
          subtitle="Built on trust. Rooted in Etmadpur. Every project from R³S Realty carries verified documentation, approved layouts, and personally walked plots."
        />

        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6 body-text text-base md:text-lg max-w-2xl"
          >
            <p>
              R³S Realty and Developers was founded by{" "}
              <span className="text-text">Raju Sharma</span> — a name that
              Etmadpur has known for years. What began as a quiet conviction —
              that families here deserve world-class plotting at honest prices —
              has grown into a real estate house spanning residential plotting,
              commercial shops, and a strategic land bank across the Agra
              outskirts.
            </p>
            <p>
              Our office at S.R. Super Market, near Barhan Chauraha in
              Etmadpur, is more than an address. It&apos;s where every plot we
              sell is personally walked by Raju ji himself. Where legal clarity
              isn&apos;t a checkbox but a promise. Where a buyer becomes a
              neighbour, not a number.
            </p>
            <p>
              The lotus in our mark is no accident. It rises from depth, blooms
              in clarity, and asks nothing of the soil but a chance.{" "}
              <span className="italic text-gold">So do our projects.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="divide-y divide-border"
          >
            {ITEMS.map((it) => (
              <div key={it.title} className="py-6 first:pt-0 last:pb-0">
                <h3 className="font-display text-2xl md:text-3xl text-text">
                  {it.title}
                </h3>
                <p className="body-text mt-3 text-base">{it.text}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust image cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
            hidden: {},
          }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TRUST_CARDS.map((card) => (
            <motion.div
              key={card.label}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              style={{ borderRadius: 0 }}
            >
              <img
                src={card.image}
                alt={card.alt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.85), rgba(10,10,10,0.1) 50%, transparent)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">
                  R³S
                </div>
                <div className="font-display text-2xl text-white">
                  {card.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
