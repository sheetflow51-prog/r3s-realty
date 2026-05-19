import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

function formatINR(n: number): string {
  if (!isFinite(n)) return "₹0";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, display, onChange }: SliderRowProps) {
  return (
    <div className="py-6 border-t border-border first:border-0">
      <div className="flex items-baseline justify-between mb-4">
        <label className="eyebrow">{label}</label>
        <span className="font-display text-2xl text-gold">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-luxe"
      />
    </div>
  );
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(9.5);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    if (r === 0) {
      const m = principal / n;
      return { emi: m, totalInterest: 0, totalPayment: principal };
    }
    const pow = Math.pow(1 + r, n);
    const m = (principal * r * pow) / (pow - 1);
    const total = m * n;
    return { emi: m, totalInterest: total - principal, totalPayment: total };
  }, [principal, rate, years]);

  const chartData = [
    { name: "Principal", value: principal, color: "#f0ebe0" },
    { name: "Interest", value: Math.max(0, totalInterest), color: "#c9a227" },
  ];

  return (
    <section id="emi" className="section bg-bg-2 border-y border-border">
      <div className="container-page">
        <SectionHeading
          number="04"
          label="EMI"
          title="Plan your monthly payment, transparently."
          emWord="transparently"
          subtitle="Three sliders. Real numbers. No bank brochure jargon."
        />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SliderRow
              label="Loan Amount"
              value={principal}
              min={500000}
              max={10000000}
              step={50000}
              display={formatINR(principal)}
              onChange={setPrincipal}
            />
            <SliderRow
              label="Interest Rate · per annum"
              value={rate}
              min={7}
              max={15}
              step={0.1}
              display={`${rate.toFixed(1)}%`}
              onChange={setRate}
            />
            <SliderRow
              label="Tenure"
              value={years}
              min={5}
              max={30}
              step={1}
              display={`${years} years`}
              onChange={setYears}
            />

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <div className="eyebrow">Total Interest</div>
                <div className="font-display text-2xl text-text mt-2">
                  {formatINR(totalInterest)}
                </div>
              </div>
              <div>
                <div className="eyebrow">Total Payable</div>
                <div className="font-display text-2xl text-text mt-2">
                  {formatINR(totalPayment)}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative bg-bg border border-border-strong p-10 md:p-14 text-center">
              <div className="eyebrow">Monthly EMI</div>
              <div className="font-display font-bold text-6xl md:text-7xl text-gold mt-4">
                ₹{Math.round(emi).toLocaleString("en-IN")}
              </div>
              <div className="mt-2 text-text-muted text-sm">
                {years} years · {rate.toFixed(1)}% p.a.
              </div>

              <div className="h-56 mt-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatINR(Number(value))}
                      contentStyle={{
                        background: "#0a0f0a",
                        border: "1px solid rgba(240,235,224,0.15)",
                        borderRadius: 2,
                        color: "#f0ebe0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2 text-text-muted">
                  <span className="w-2 h-2 bg-text" /> Principal
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <span className="w-2 h-2 bg-gold" /> Interest
                </div>
              </div>

              <a href="#contact" className="btn-gold btn-3d mt-10">
                Get Pre-Approved <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
