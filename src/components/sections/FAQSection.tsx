import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

interface FAQ {
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    q: "Are the plots RERA approved?",
    a: "Yes, RERA registration is applied for Saroj Residency. All plots have clear titles and approved colony layout. Documentation can be reviewed at our office in S.R. Super Market, Barhan Chauraha.",
  },
  {
    q: "What is the starting price of plots in Etmadpur Agra?",
    a: "Plots at Saroj Residency, Etmadpur start from ₹8.99 Lakh for 100 sq.yd. Larger sizes and corner plots are available — contact R³S Realty at +91-7983071302 for current availability and pricing.",
  },
  {
    q: "Where is Saroj Residency located?",
    a: "Saroj Residency is located near Sawai Dham Ashram, Etmadpur, Agra — on the NH-19 Agra-Kolkata corridor. The site is easily accessible from Agra city, Khandauli, Tundla and Barhan.",
  },
  {
    q: "How far is the project from Agra city?",
    a: "Saroj Residency is approximately 18-20 km from Agra city center on NH-19 highway toward Kolkata. The drive takes around 25-30 minutes by car, with public transport also available through Etmadpur.",
  },
  {
    q: "What amenities are nearby?",
    a: "The project is near schools, hospitals, railway stations at Khandauli and Tundla, and has planned internal roads with electricity and water. The Etmadpur block has thriving daily-needs markets and the iconic S.R. Super Market is just minutes away.",
  },
];

interface RowProps {
  faq: FAQ;
  index: number;
  open: boolean;
  onToggle: () => void;
}

function FAQRow({ faq, index, open, onToggle }: RowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-border"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-trigger-${index}`}
        className="w-full flex items-start justify-between gap-6 text-left py-7 group focus:outline-none"
      >
        <h3
          className="font-display text-xl md:text-2xl leading-snug transition-colors"
          style={{
            color: open ? "var(--gold)" : "var(--text)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          <span
            className="mr-3 text-[11px] uppercase tracking-[0.25em] align-middle"
            style={{ color: "var(--gold)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {faq.q}
        </h3>
        <span
          className="shrink-0 mt-1 w-9 h-9 flex items-center justify-center border border-border-strong group-hover:border-gold transition-colors"
          style={{ borderRadius: 2 }}
          aria-hidden
        >
          {open ? (
            <Minus className="w-4 h-4 text-gold" />
          ) : (
            <Plus className="w-4 h-4 text-text" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-7 pr-12 text-base md:text-lg font-light leading-relaxed"
              style={{
                color: "var(--text-muted)",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section relative overflow-hidden"
      style={{ background: "var(--bg)" }}
      aria-labelledby="faq-heading"
    >
      <div className="container-page relative">
        <div id="faq-heading">
          <SectionHeading
            number="06.5"
            label="FAQ"
            title="Frequently asked questions about plots in Etmadpur, Agra"
            emWord="Etmadpur, Agra"
            subtitle="The answers we give on every site visit — compiled here so you can read them before chai."
          />
        </div>

        <div
          className="max-w-3xl mt-2 border-t border-border"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <meta itemProp="name" content={faq.q} />
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <meta itemProp="text" content={faq.a} />
                <FAQRow
                  faq={faq}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-12 text-sm font-light max-w-2xl"
          style={{ color: "var(--text-muted)" }}
        >
          Still have a question?{" "}
          <a
            href="tel:+917983071302"
            title="Call Raju Sharma at R³S Realty"
            className="text-gold hover:underline"
          >
            Call Raju ji at +91-7983071302
          </a>{" "}
          — he answers personally.
        </p>
      </div>
    </section>
  );
}
