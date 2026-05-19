import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import TownshipMap from "../shared/TownshipMap";

const TIMELINE = [
  {
    year: "2026",
    title: "Foundation",
    body: "Acquisition complete, master plan released, perimeter survey underway.",
  },
  {
    year: "2027",
    title: "Infrastructure",
    body: "Internal roads, water mains, drainage and the first sub-station energised.",
  },
  {
    year: "2028",
    title: "Towers",
    body: "First residential towers and the Gangapuram commercial spine break ground.",
  },
  {
    year: "2030",
    title: "Complete",
    body: "Ten river-themed sectors operational. Greater Agra opens for occupancy.",
  },
];

function formatINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  return `₹${(n / 100000).toFixed(2)} L`;
}

export default function TownshipHighlight() {
  const [amount, setAmount] = useState(1000000);
  const projected = useMemo(
    () => Math.round(amount * Math.pow(1.15, 4)),
    [amount]
  );

  return (
    <section
      id="township"
      className="relative section bg-bg overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80)",
          backgroundAttachment: "fixed",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg-2"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <SectionHeading
          number="03"
          label="Land Bank"
          title="Greater Agra Township — a generational opportunity."
          emWord="generational"
          subtitle="₹5,142 crore. 449.65 hectares. Ten river-themed sectors rising in Raipur and Rahankalan — the two villages where our land bank sits."
        />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          <div>
            <div className="relative h-[420px] md:h-[480px] border border-border-strong bg-bg-2 overflow-hidden">
              <TownshipMap />
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] text-text-muted">
                R³S Land Bank · Etmadpur Block
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                <span className="text-gold">Pin: R³S Office</span>
                <span className="text-text-muted">5 km radius</span>
              </div>
            </div>

            <div className="mt-12 relative">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border-strong" />
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-10 pb-8 last:pb-0"
                >
                  <span className="absolute left-0 top-2 w-4 h-4 rounded-full border border-gold bg-bg flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </span>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-2xl text-gold">
                      {t.year}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-text-muted">
                      {t.title}
                    </span>
                  </div>
                  <p className="body-text mt-2 text-sm md:text-base max-w-md">
                    {t.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-bg-2 border border-border-strong p-8 md:p-10 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="section-number">Investment Calculator</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-text leading-tight">
              Invest{" "}
              <span className="text-gold">{formatINR(amount)}</span> today, hold
              for four years at the township's projected{" "}
              <em className="italic font-light">15% CAGR</em>.
            </h3>

            <div className="mt-10 space-y-8">
              <div>
                <label className="block eyebrow mb-3">Investment Amount</label>
                <input
                  type="number"
                  min={100000}
                  step={50000}
                  value={amount}
                  onChange={(e) =>
                    setAmount(Math.max(100000, Number(e.target.value) || 0))
                  }
                  className="input-line font-display text-3xl text-gold"
                />
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  <span>Min ₹1 L</span>
                  <span>1 Cr</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="eyebrow">Today</div>
                  <div className="font-display text-2xl text-text mt-2">
                    {formatINR(amount)}
                  </div>
                </div>
                <div>
                  <div className="eyebrow">Projected · 2030</div>
                  <div className="font-display text-3xl text-gold mt-2">
                    {formatINR(projected)}
                  </div>
                </div>
              </div>
            </div>

            <a href="#contact" className="btn-gold btn-3d mt-10 w-full">
              Book Township Plot <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
