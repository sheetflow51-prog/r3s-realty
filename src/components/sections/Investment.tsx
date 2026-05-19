import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import GeometricBg from "../shared/GeometricBg";

function formatINR(n: number): string {
  if (!isFinite(n)) return "₹0";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function formatLakhs(n: number): string {
  return `₹${(n / 100000).toFixed(2)} L`;
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

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: SliderRowProps) {
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

const GROWTH_RATES = [10, 15, 20, 28];

function AppreciationTab() {
  const [principal, setPrincipal] = useState(899000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(15);

  const { fv, profit, roi, series } = useMemo(() => {
    const r = rate / 100;
    const fvVal = principal * Math.pow(1 + r, years);
    const profitVal = fvVal - principal;
    const roiVal = (profitVal / principal) * 100;
    const data = Array.from({ length: years + 1 }, (_, y) => ({
      year: y,
      value: Math.round((principal * Math.pow(1 + r, y)) / 100000),
    }));
    return { fv: fvVal, profit: profitVal, roi: roiVal, series: data };
  }, [principal, years, rate]);

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-start">
      <div>
        <h3 className="font-display text-2xl md:text-3xl text-text">
          How much will your <em className="italic font-light text-gold">plot</em> be worth?
        </h3>

        <SliderRow
          label="Investment Amount"
          value={principal}
          min={500000}
          max={20000000}
          step={100000}
          display={formatLakhs(principal)}
          onChange={setPrincipal}
        />
        <SliderRow
          label="Holding Period"
          value={years}
          min={1}
          max={20}
          step={1}
          display={`${years} years`}
          onChange={setYears}
        />

        <div className="py-6 border-t border-border">
          <label className="eyebrow">Growth Rate · per annum</label>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {GROWTH_RATES.map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`py-3 text-[12px] uppercase tracking-[0.18em] transition-all border ${
                  rate === r
                    ? "bg-gold text-bg border-gold"
                    : "border-border-strong text-text hover:border-gold"
                }`}
                style={{ borderRadius: 2 }}
              >
                {r}%
              </button>
            ))}
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-text-muted text-right pr-1">
            28% &mdash; Etmadpur Avg
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          <div>
            <div className="eyebrow">Future Value</div>
            <div className="font-display text-2xl md:text-3xl text-gold mt-2">
              {formatINR(fv)}
            </div>
          </div>
          <div>
            <div className="eyebrow">Total Profit</div>
            <div
              className="font-display text-2xl md:text-3xl mt-2"
              style={{ color: "rgb(var(--green-light-rgb))" }}
            >
              {formatINR(profit)}
            </div>
          </div>
          <div>
            <div className="eyebrow">ROI</div>
            <div className="font-display text-2xl md:text-3xl text-text mt-2">
              {roi.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-2 border border-border-strong p-6 md:p-10">
        <div className="eyebrow">Growth Curve · {rate}% p.a.</div>
        <div className="h-72 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid stroke="rgba(232,224,208,0.05)" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="rgb(var(--text-muted-rgb))"
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "rgba(232,224,208,0.1)" }}
                tickLine={false}
                label={{
                  value: "Years",
                  position: "insideBottom",
                  offset: -4,
                  fill: "rgb(var(--text-muted-rgb))",
                  fontSize: 10,
                }}
              />
              <YAxis
                stroke="rgb(var(--text-muted-rgb))"
                tick={{ fontSize: 11 }}
                axisLine={{ stroke: "rgba(232,224,208,0.1)" }}
                tickLine={false}
                label={{
                  value: "₹ Lakhs",
                  angle: -90,
                  position: "insideLeft",
                  fill: "rgb(var(--text-muted-rgb))",
                  fontSize: 10,
                }}
              />
              <Tooltip
                formatter={(value) => [`₹${Number(value).toFixed(2)} L`, "Value"]}
                labelFormatter={(l) => `Year ${l}`}
                contentStyle={{
                  background: "rgb(var(--bg-rgb))",
                  border: "1px solid var(--border-hover)",
                  borderRadius: 2,
                  color: "rgb(var(--text-rgb))",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="rgb(var(--gold-rgb))"
                strokeWidth={2}
                dot={{ fill: "rgb(var(--gold-rgb))", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function EMITab() {
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
    { name: "Principal", value: principal, color: "rgb(var(--text-rgb))" },
    {
      name: "Interest",
      value: Math.max(0, totalInterest),
      color: "rgb(var(--gold-rgb))",
    },
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-center">
      <div>
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
      </div>

      <div className="relative bg-bg-2 border border-border-strong p-10 md:p-14 text-center">
        <div className="eyebrow">Monthly EMI</div>
        <div className="font-display text-5xl md:text-6xl text-gold mt-4">
          ₹{Math.round(emi).toLocaleString("en-IN")}
        </div>
        <div className="mt-2 text-text-muted text-sm">
          {years} years &middot; {rate.toFixed(1)}% p.a.
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
                  background: "rgb(var(--bg-rgb))",
                  border: "1px solid var(--border-hover)",
                  borderRadius: 2,
                  color: "rgb(var(--text-rgb))",
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
      </div>
    </div>
  );
}

export default function Investment() {
  const [tab, setTab] = useState<"appreciation" | "emi">("appreciation");

  return (
    <section
      id="investment"
      className="section bg-bg-2 border-y border-border relative overflow-hidden"
    >
      <GeometricBg variant="shapes" />
      <div className="container-page relative">
        <SectionHeading
          number="05"
          label="Investment"
          title="Plot Price Appreciation & EMI Calculator — Agra Region"
          emWord="EMI Calculator"
          subtitle="See your returns. Model price appreciation across 5–20 years, or get monthly EMI numbers — based on real Etmadpur growth rates."
        />

        {/* Tab switcher */}
        <div className="flex items-center gap-px bg-border border border-border-strong w-fit mb-12">
          <button
            onClick={() => setTab("appreciation")}
            className={`px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors ${
              tab === "appreciation"
                ? "bg-gold text-bg"
                : "bg-bg text-text-muted hover:text-text"
            }`}
          >
            Plot Appreciation
          </button>
          <button
            onClick={() => setTab("emi")}
            className={`px-6 py-3 text-[12px] uppercase tracking-[0.18em] transition-colors ${
              tab === "emi"
                ? "bg-gold text-bg"
                : "bg-bg text-text-muted hover:text-text"
            }`}
          >
            EMI Calculator
          </button>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {tab === "appreciation" ? <AppreciationTab /> : <EMITab />}
        </motion.div>

        <div className="mt-16 pt-10 border-t border-border flex flex-wrap items-center justify-between gap-6">
          <p className="body-text text-base md:text-lg max-w-xl">
            Start your investment from{" "}
            <span className="text-gold">₹8.99L</span> at Saroj Residency.
          </p>
          <a href="#booking" className="btn-gold btn-3d">
            Book a Site Visit <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
