import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import GeometricBg from "../shared/GeometricBg";

interface Stat {
  value: number | null;
  suffix: string;
  literal?: string;
  label: string;
  text: string;
}

const STATS: Stat[] = [
  {
    value: 12,
    suffix: "km",
    label: "From Agra Centre",
    text: "Direct connectivity via NH-19, well-maintained roads year-round.",
  },
  {
    value: 28,
    suffix: "%",
    label: "Avg. Annual Growth",
    text: "Etmadpur land value has appreciated steadily over the last 5 years.",
  },
  {
    value: 4,
    suffix: "",
    label: "Strategic Belts",
    text: "Kakua–Baad, Khandauli, Barhan, and Tundla — all under one developer's hand.",
  },
  {
    value: null,
    suffix: "",
    literal: "∞",
    label: "Local Trust",
    text: "Decades of relationships built right here in Etmadpur.",
  },
];

function CountUp({ to, suffix, duration = 2000 }: { to: number; suffix: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function WhyHere() {
  return (
    <section className="section bg-bg relative overflow-hidden">
      <GeometricBg variant="grid" />
      <div className="container-page relative">
        <SectionHeading
          number="04"
          label="Why Here"
          title="Why Invest in Plots Near Agra NH-19 Corridor"
          emWord="NH-19"
          subtitle="The Etmadpur advantage — direct NH-19 connectivity, steady appreciation, and four strategic land belts under one trusted developer."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-bg p-8 md:p-10"
            >
              <div className="font-display text-5xl md:text-6xl text-gold leading-none">
                {s.literal ? (
                  s.literal
                ) : (
                  <CountUp to={s.value ?? 0} suffix={s.suffix} />
                )}
              </div>
              <div className="mt-5 text-[10px] uppercase tracking-[0.25em] text-text-muted">
                {s.label}
              </div>
              <p className="body-text mt-3 text-sm max-w-xs">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
