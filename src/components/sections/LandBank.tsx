import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  Building2,
  TrendingUp,
  TrainFront,
  Route,
} from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

/* ─────────────────────────────────────────────
   NH-19 Growth Corridor — investor-brochure map
   Geographically anchored, R³S HQ at Barhan,
   labeled advantage callouts, surrounding villages.
   ───────────────────────────────────────────── */

interface Node {
  id: string;
  name: string;
  km: number; // km from Agra along NH-19
  x: number; // 0–100 % across SVG (longitude-weighted)
  y: number; // 0–100 % (latitude-weighted, inverted)
  tag: "featured" | "hq" | "node" | "secondary";
  oneLiner: string;
  advantage: string; // short callout shown next to pin
  href: string;
}

// Positions reflect actual relative geography:
// Agra (anchor, west) → Kakua-Baad (south-west of Agra, near Atalpuram)
// → Khandauli (NE of Etmadpur on NH-19) → Etmadpur (mid-corridor)
// → Barhan (R³S HQ, on NH-19 east of Etmadpur)
// → Tundla Junction (far east, rail)
const NODES: Node[] = [
  {
    id: "agra",
    name: "Agra",
    km: 0,
    x: 8, y: 56,
    tag: "node",
    oneLiner: "Anchor city · NH-19 origin · Taj Mahal hub",
    advantage: "1.5M+ population · airport · tourism economy",
    href: "https://www.google.com/maps/search/Agra/@27.18,78.0,11z",
  },
  {
    id: "kakua",
    name: "Kakua–Baad",
    km: 12,
    x: 24, y: 32,
    tag: "featured",
    oneLiner: "Adjoining ADA's Atalpuram Township · 100–200 sq.yd · from ₹12L",
    advantage: "₹500Cr+ ADA Atalpuram Township adjacent",
    href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra/@27.1300,77.9700,12z",
  },
  {
    id: "khandauli",
    name: "Khandauli",
    km: 18,
    x: 44, y: 48,
    tag: "node",
    oneLiner: "Railway junction belt · agri + residential",
    advantage: "Rail + road · rapid transition zone",
    href: "https://www.google.com/maps/search/Khandauli+Agra/@27.2700,78.2200,12z",
  },
  {
    id: "barhan",
    name: "Barhan",
    km: 22,
    x: 60, y: 56,
    tag: "hq",
    oneLiner: "R³S Realty Developers · S.R. Super Market HQ",
    advantage: "Busiest chauraha · HQ · highway commercial",
    href: "https://www.google.com/maps/search/Barhan+Etmadpur+road/@27.2400,78.2500,12z",
  },
  {
    id: "etmadpur",
    name: "Etmadpur",
    km: 16,
    x: 52, y: 64,
    tag: "secondary",
    oneLiner: "Saroj Residency · Sawai Dham Ashram",
    advantage: "Active project · bus stand · town core",
    href: "https://www.google.com/maps/search/Sawai+Dham+Ashram+Etmadpur+Agra/@27.2308,78.2614,13z",
  },
  {
    id: "tundla",
    name: "Tundla Junction",
    km: 35,
    x: 86, y: 46,
    tag: "node",
    oneLiner: "Major rail junction · NH-19 corridor terminus",
    advantage: "Delhi–Howrah main line · 7 platforms · industrial",
    href: "https://www.google.com/maps/search/Tundla+Etmadpur+Agra/@27.2200,78.2700,11z",
  },
];

// Surrounding village dots — purely decorative aerial-view feel
// (positions inside the corridor envelope, no labels to keep clean)
const VILLAGE_DOTS: { x: number; y: number; r: number; o: number }[] = [
  { x: 14, y: 44, r: 0.5, o: 0.45 },
  { x: 18, y: 68, r: 0.4, o: 0.35 },
  { x: 29, y: 52, r: 0.55, o: 0.5 },
  { x: 33, y: 22, r: 0.4, o: 0.4 },
  { x: 37, y: 70, r: 0.45, o: 0.4 },
  { x: 48, y: 28, r: 0.4, o: 0.4 },
  { x: 55, y: 74, r: 0.5, o: 0.45 },
  { x: 64, y: 72, r: 0.4, o: 0.35 },
  { x: 68, y: 36, r: 0.45, o: 0.4 },
  { x: 72, y: 60, r: 0.4, o: 0.35 },
  { x: 78, y: 70, r: 0.45, o: 0.4 },
  { x: 80, y: 30, r: 0.45, o: 0.4 },
  { x: 90, y: 60, r: 0.4, o: 0.35 },
  { x: 92, y: 32, r: 0.4, o: 0.35 },
];

function nodeColor(tag: Node["tag"]) {
  switch (tag) {
    case "featured":
      return { ring: "#e0c068", dot: "#e0c068", text: "#0a0d0a" };
    case "hq":
      return { ring: "#2d8a42", dot: "#2d8a42", text: "#f7efdc" };
    case "secondary":
      return { ring: "rgba(224,192,104,0.65)", dot: "rgba(224,192,104,0.85)", text: "#0a0d0a" };
    case "node":
    default:
      return { ring: "rgba(247,239,220,0.55)", dot: "rgba(247,239,220,0.85)", text: "#0a0d0a" };
  }
}

/* NH-19 spine — S-curve approximating the real Agra→Tundla highway shape */
const NH19_PATH = "M 4 60 C 18 30, 32 40, 45 50 C 58 60, 72 50, 86 48 L 96 46";

/* ─── Animated Counter ─── */
function Counter({
  to,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function CorridorStats() {
  return (
    <div
      className="grid grid-cols-3 gap-3 md:gap-6 mb-8"
      aria-label="NH-19 corridor key stats"
    >
      {[
        { value: 12, suffix: " km", label: "From Agra centre to Kakua–Baad" },
        { value: 28, suffix: "%", label: "Avg. annual appreciation, 5-yr" },
        { value: 4, suffix: "", label: "Strategic land belts under R³S" },
      ].map((s) => (
        <div
          key={s.label}
          className="px-4 py-5 md:px-6 md:py-7 border border-border bg-bg-card/40 text-center md:text-left"
        >
          <div
            className="font-display text-3xl md:text-5xl leading-none"
            style={{
              color: "#e0c068",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
            }}
          >
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <div
            className="mt-2 text-[10px] md:text-[11px] uppercase font-semibold text-text-muted"
            style={{ letterSpacing: "0.24em", lineHeight: 1.4 }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CorridorMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative w-full overflow-hidden corridor-shell"
      style={{
        height: 560,
        borderRadius: 2,
        border: "1px solid rgba(224,192,104,0.18)",
      }}
    >
      {/* Background tint */}
      <div className="absolute inset-0 corridor-bg" aria-hidden />

      {/* SVG: grid, glow, NH-19 spine, villages */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern id="grid-fine" width="2" height="2" patternUnits="userSpaceOnUse">
            <path d="M 2 0 L 0 0 0 2" fill="none" stroke="rgba(247,239,220,0.05)" strokeWidth="0.1" />
          </pattern>
          <pattern id="grid-bold" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(247,239,220,0.09)" strokeWidth="0.15" />
          </pattern>
          <radialGradient id="corridor-glow" cx="60%" cy="56%" r="42%">
            <stop offset="0%" stopColor="rgba(45,138,66,0.18)" />
            <stop offset="100%" stopColor="rgba(45,138,66,0)" />
          </radialGradient>
          <linearGradient id="nh19" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a07820" />
            <stop offset="50%" stopColor="#e0c068" />
            <stop offset="100%" stopColor="#a07820" />
          </linearGradient>
        </defs>

        <rect width="100" height="100" fill="url(#grid-fine)" />
        <rect width="100" height="100" fill="url(#grid-bold)" />
        <rect width="100" height="100" fill="url(#corridor-glow)" />

        {/* Yamuna Expressway hint — secondary parallel route */}
        <path
          d="M 0 80 C 30 75, 60 70, 100 65"
          stroke="rgba(247,239,220,0.18)"
          strokeWidth="0.4"
          strokeDasharray="1.2 1"
          fill="none"
        />
        <text
          x="55" y="78"
          fontSize="1.6"
          fill="rgba(247,239,220,0.32)"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.16em"
        >
          YAMUNA EXPRESSWAY
        </text>

        {/* Tundla rail line hint — comes in from the east */}
        <path
          d="M 100 38 C 88 40, 80 42, 70 44"
          stroke="rgba(247,239,220,0.22)"
          strokeWidth="0.3"
          strokeDasharray="0.5 0.6"
          fill="none"
        />
        <text
          x="78" y="36"
          fontSize="1.4"
          fill="rgba(247,239,220,0.32)"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.16em"
        >
          DELHI – HOWRAH RAIL
        </text>

        {/* NH-19 main spine: glow → road → dashed centerline */}
        <path
          d={NH19_PATH}
          stroke="rgba(224,192,104,0.25)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={NH19_PATH}
          stroke="url(#nh19)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={NH19_PATH}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="0.18"
          strokeDasharray="1 1.4"
          fill="none"
          className="corridor-dashes"
        />
        <text
          x="40" y="44"
          fontSize="1.6"
          fill="#e0c068"
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.2em"
          fontWeight={600}
        >
          NH-19
        </text>

        {/* Village dots — aerial feel */}
        {VILLAGE_DOTS.map((d, i) => (
          <circle
            key={`v-${i}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="rgba(247,239,220,0.4)"
            opacity={d.o}
          />
        ))}

        {/* Connector lines from non-HQ nodes to HQ */}
        {NODES.filter((n) => n.tag !== "hq").map((n) => {
          const hq = NODES.find((x) => x.tag === "hq")!;
          return (
            <line
              key={`l-${n.id}`}
              x1={n.x}
              y1={n.y}
              x2={hq.x}
              y2={hq.y}
              stroke="rgba(224,192,104,0.18)"
              strokeWidth="0.18"
              strokeDasharray="0.6 0.8"
            />
          );
        })}

        {/* Compass rose */}
        <g transform="translate(92,12)" opacity="0.55">
          <circle r="3.2" fill="none" stroke="rgba(224,192,104,0.5)" strokeWidth="0.18" />
          <path d="M 0 -2.6 L 0.6 0 L 0 2.6 L -0.6 0 Z" fill="#e0c068" />
          <text
            x="0" y="-3.6"
            textAnchor="middle"
            fontSize="1.8"
            fill="#e0c068"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="600"
          >
            N
          </text>
        </g>

        {/* Scale bar */}
        <g transform="translate(4,92)" opacity="0.7">
          <rect x="0" y="0" width="20" height="0.9" fill="rgba(247,239,220,0.6)" />
          <rect x="0" y="0" width="10" height="0.9" fill="#e0c068" />
          <text x="0" y="-1" fontSize="1.8" fill="rgba(247,239,220,0.7)" fontFamily="'DM Sans', sans-serif" letterSpacing="0.05em">
            0
          </text>
          <text x="20" y="-1" fontSize="1.8" fill="rgba(247,239,220,0.7)" fontFamily="'DM Sans', sans-serif" letterSpacing="0.05em" textAnchor="end">
            40 km
          </text>
        </g>
      </svg>

      {/* Title strip */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-baseline gap-3">
          <span
            className="font-display"
            style={{ fontSize: 18, color: "#e0c068", fontWeight: 600, letterSpacing: "0.01em" }}
          >
            NH-19 Growth Corridor
          </span>
          <span
            className="text-[10px] uppercase font-semibold hidden md:inline"
            style={{ color: "rgba(247,239,220,0.5)", letterSpacing: "0.32em" }}
          >
            Agra → Tundla → Kanpur
          </span>
        </div>
        <span
          className="text-[10px] uppercase font-semibold hidden sm:inline-flex items-center gap-2"
          style={{ color: "rgba(247,239,220,0.45)", letterSpacing: "0.32em" }}
        >
          <span style={{ width: 8, height: 8, background: "#2d8a42", borderRadius: "50%" }} />
          R³S HQ
          <span className="mx-2" />
          <span style={{ width: 8, height: 8, background: "#e0c068", borderRadius: "50%" }} />
          Featured
        </span>
      </div>

      {/* Node markers + advantage callouts */}
      {NODES.map((n) => {
        const c = nodeColor(n.tag);
        const isHover = hovered === n.id;
        const showAdvantage = n.tag === "hq" || n.tag === "featured";
        return (
          <a
            key={n.id}
            href={n.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${n.name} — open Google Maps`}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(n.id)}
            onBlur={() => setHovered(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
            style={{ left: `${n.x}%`, top: `${n.y}%`, zIndex: isHover ? 5 : 2 }}
          >
            {/* Marker */}
            <span
              className="block relative"
              style={{
                width: n.tag === "hq" ? 18 : n.tag === "featured" ? 16 : 12,
                height: n.tag === "hq" ? 18 : n.tag === "featured" ? 16 : 12,
              }}
            >
              {(n.tag === "hq" || n.tag === "featured") && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: c.ring,
                    opacity: 0.5,
                    animation: "corridorPulse 2.4s ease-out infinite",
                  }}
                />
              )}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: c.dot,
                  border: `1.5px solid #0a0d0a`,
                  boxShadow: `0 0 0 1.5px ${c.ring}, 0 4px 10px rgba(0,0,0,0.5)`,
                }}
              />
            </span>

            {/* Label chip below pin */}
            <span
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase"
              style={{
                top: "calc(100% + 8px)",
                color: "rgba(247,239,220,0.9)",
                letterSpacing: "0.18em",
                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
              }}
            >
              {n.name}
              <span style={{ marginLeft: 6, color: "#e0c068", letterSpacing: "0.1em" }}>
                {n.km} km
              </span>
            </span>

            {/* Always-on advantage badge for HQ + Featured */}
            {showAdvantage && !isHover && (
              <span
                className="absolute hidden md:block whitespace-nowrap text-[9px] font-semibold uppercase pointer-events-none"
                style={{
                  left: "calc(100% + 10px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: n.tag === "hq" ? "#7fd99a" : "#e0c068",
                  letterSpacing: "0.22em",
                  textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                  padding: "3px 7px",
                  border: `1px solid ${n.tag === "hq" ? "rgba(45,138,66,0.5)" : "rgba(224,192,104,0.5)"}`,
                  background: "rgba(10,13,10,0.7)",
                  borderRadius: 2,
                }}
              >
                ★ {n.advantage}
              </span>
            )}

            {/* Hover detail card */}
            {isHover && (
              <motion.span
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
                className="absolute"
                style={{
                  left: "50%",
                  bottom: "calc(100% + 14px)",
                  transform: "translateX(-50%)",
                  width: 250,
                  background: "rgba(10,13,10,0.97)",
                  border: "1px solid rgba(224,192,104,0.4)",
                  padding: "12px 14px",
                  color: "#f7efdc",
                  boxShadow: "0 16px 32px rgba(0,0,0,0.55)",
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              >
                <span
                  className="block text-[9px] uppercase font-bold mb-1"
                  style={{ color: "#e0c068", letterSpacing: "0.32em" }}
                >
                  {n.tag === "hq" ? "★ R³S HQ" : n.tag === "featured" ? "★ Featured Belt" : "Growth Node"}
                </span>
                <span className="font-display block leading-tight" style={{ fontSize: 17, fontWeight: 500 }}>
                  {n.name}
                </span>
                <span
                  className="block text-[11px] font-light mt-1.5 leading-snug"
                  style={{ color: "rgba(247,239,220,0.75)" }}
                >
                  {n.oneLiner}
                </span>
                <span
                  className="mt-2 block text-[10px] font-semibold uppercase"
                  style={{ color: "#7fd99a", letterSpacing: "0.2em" }}
                >
                  ★ {n.advantage}
                </span>
                <span
                  className="mt-2 inline-flex items-center gap-1 text-[9px] uppercase font-semibold"
                  style={{ color: "#e0c068", letterSpacing: "0.28em" }}
                >
                  View on map <ArrowUpRight className="w-3 h-3" />
                </span>
              </motion.span>
            )}
          </a>
        );
      })}

      {/* Bottom meta strip */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-3 flex flex-wrap items-center justify-between gap-2"
        style={{ background: "linear-gradient(to top, rgba(8,12,8,0.85), transparent)" }}
      >
        <span className="text-[10px] uppercase font-semibold" style={{ color: "rgba(247,239,220,0.55)", letterSpacing: "0.32em" }}>
          Source: R³S Realty Developers · land-bank survey 2026
        </span>
        <span className="text-[10px] uppercase font-semibold hidden md:inline" style={{ color: "rgba(247,239,220,0.4)", letterSpacing: "0.32em" }}>
          Hover a node for details
        </span>
      </div>

      <style>{`
        .corridor-shell { --corridor-bg: #0e1812; }
        html.light .corridor-shell { --corridor-bg: #1a2218; }
        .corridor-bg {
          background:
            radial-gradient(ellipse at 35% 30%, rgba(224,192,104,0.07), transparent 55%),
            radial-gradient(ellipse at 70% 75%, rgba(45,138,66,0.08), transparent 55%),
            var(--corridor-bg);
        }
        @keyframes corridorPulse {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes corridorDash { to { stroke-dashoffset: -20; } }
        .corridor-dashes { animation: corridorDash 4s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .corridor-dashes { animation: none; }
        }
      `}</style>
    </div>
  );
}

/* ─── Investment psychology icon row ─── */
function InvestmentPsychology() {
  const items = [
    {
      icon: Building2,
      title: "Government Investment",
      text: "ADA's Atalpuram Township — ₹500Cr+ public investment adjoining Kakua–Baad belt.",
    },
    {
      icon: Route,
      title: "Infrastructure Boom",
      text: "NH-19 six-lane expansion programme + Yamuna Expressway parallel route.",
    },
    {
      icon: TrendingUp,
      title: "Appreciation History",
      text: "Etmadpur land has averaged ~28% annual appreciation over the last 5 years.",
    },
    {
      icon: TrainFront,
      title: "Multi-Modal Connectivity",
      text: "Tundla Junction + NH-19 + Yamuna Expressway in a single 40 km corridor.",
    },
  ];
  return (
    <div
      className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
      aria-label="Investment thesis"
    >
      {items.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="p-5 border border-border bg-bg-card/40 flex flex-col items-start"
        >
          <span
            className="w-10 h-10 mb-4 flex items-center justify-center"
            style={{
              border: "1px solid rgba(224,192,104,0.45)",
              color: "#e0c068",
              borderRadius: 2,
            }}
          >
            <Icon className="w-5 h-5" />
          </span>
          <div
            className="text-[10px] uppercase font-semibold mb-2"
            style={{ color: "#e0c068", letterSpacing: "0.28em" }}
          >
            {title}
          </div>
          <div className="text-sm font-light text-text-muted leading-snug">
            {text}
          </div>
        </div>
      ))}
    </div>
  );
}

const BELTS: {
  tag: string;
  title: string;
  text: string;
  href: string;
  featured: boolean;
}[] = [
  {
    tag: "Featured",
    title: "Kakua–Baad Belt",
    text:
      "Strategic land adjacent to UP Govt's Atalpuram Township (ADA) on the Agra–Gwalior corridor. Earliest appreciation, deepest discount.",
    href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra/@27.1300,77.9700,12z",
    featured: true,
  },
  {
    tag: "Belt 01",
    title: "Etmadpur–Khandauli Road",
    text:
      "Agricultural and residential parcels along the Khandauli junction belt — strong road frontage, rapid appreciation history.",
    href: "https://www.google.com/maps/search/Khandauli+Agra/@27.2700,78.2200,12z",
    featured: false,
  },
  {
    tag: "Belt 02",
    title: "Etmadpur–Barhan Road",
    text:
      "Highway-adjacent commercial land at Barhan Chauraha. Home to R³S Realty Developers' HQ at S.R. Super Market.",
    href: "https://www.google.com/maps/search/Barhan+Etmadpur+road/@27.2400,78.2500,12z",
    featured: false,
  },
  {
    tag: "Belt 03",
    title: "Tundla–Etmadpur–Agra Belt",
    text:
      "Premium plots along the high-growth Tundla corridor with direct NH-19 access and rail proximity.",
    href: "https://www.google.com/maps/search/Tundla+Etmadpur+Agra/@27.2200,78.2700,11z",
    featured: false,
  },
];

const LOCATIONS: { tag: string; title: string; sub: string; href: string }[] = [
  { tag: "R³S Active", title: "Saroj Residency", sub: "Near Sawai Dham Ashram, Etmadpur", href: "https://www.google.com/maps/search/Sawai+Dham+Ashram+Etmadpur+Agra/@27.2308,78.2614,13z" },
  { tag: "R³S Active", title: "S.R. Super Market", sub: "Highway shops, Barhan Chauraha", href: "https://www.google.com/maps/search/Barhan+Chauraha+Etmadpur+Agra/@27.2400,78.2400,13z" },
  { tag: "Land Bank", title: "Etmadpur–Khandauli Road", sub: "Agricultural & residential parcels", href: "https://www.google.com/maps/search/Khandauli+Agra/@27.2700,78.2200,12z" },
  { tag: "Land Bank", title: "Etmadpur–Barhan Road", sub: "Highway-adjacent commercial parcels", href: "https://www.google.com/maps/search/Barhan+Etmadpur+road/@27.2400,78.2500,12z" },
  { tag: "Land Bank", title: "Tundla–Etmadpur–Agra Belt", sub: "NH-19 corridor land parcels", href: "https://www.google.com/maps/search/Tundla+Etmadpur+Agra/@27.2200,78.2700,11z" },
  { tag: "Featured · Govt Adjacent", title: "Kakua–Baad Belt", sub: "Adjoining ADA's Atalpuram Township", href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra/@27.1300,77.9700,12z" },
];

export default function LandBank() {
  return (
    <section
      id="land-bank"
      className="section bg-bg-2 border-y border-border"
      aria-labelledby="landbank-heading"
    >
      <div className="container-page">
        <div className="flex items-center gap-4 mb-4">
          <span className="section-number !mb-0">03 / Land Bank</span>
          <span className="relative w-3 h-3">
            <span className="absolute inset-0 bg-gold rounded-full" />
            <span className="absolute inset-0 bg-gold rounded-full ping-ring" />
          </span>
        </div>
        <div id="landbank-heading">
          <SectionHeading
            title="NH-19 Growth Corridor | Land Investment Near Agra"
            emWord="NH-19"
            subtitle="Beyond our active projects, R³S Realty Developers holds prime land across four strategic pockets around Agra — including the high-potential Kakua–Baad belt adjoining UP Government's flagship Atalpuram township."
          />
        </div>

        {/* NEW: animated counter row */}
        <CorridorStats />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <CorridorMap />
        </motion.div>

        {/* NEW: investment psychology row */}
        <InvestmentPsychology />

        {/* Belt cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="mt-12 grid md:grid-cols-2 gap-5"
        >
          {BELTS.map((belt) => (
            <motion.a
              key={belt.title}
              href={belt.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${belt.title} on Google Maps`}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              className={`belt-card block ${belt.featured ? "featured" : ""}`}
            >
              {belt.featured && (
                <div
                  className="absolute top-3 right-4 text-[10px] uppercase font-bold px-2 py-1"
                  style={{ color: "#0a1a0a", background: "var(--gold)", letterSpacing: "0.22em", borderRadius: 2 }}
                >
                  ★ Featured
                </div>
              )}
              <div
                className="text-[10px] uppercase font-semibold mb-3"
                style={{ color: "#e0c068", letterSpacing: "0.32em" }}
              >
                {belt.tag}
              </div>
              <h3
                className="font-display text-2xl md:text-3xl"
                style={{ color: "rgb(243,236,220)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
              >
                {belt.title}
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed" style={{ color: "rgb(168,153,119)" }}>
                {belt.text}
              </p>
              <div
                className="mt-4 text-[10px] uppercase font-semibold inline-flex items-center gap-1"
                style={{ color: "#e0c068", letterSpacing: "0.32em" }}
              >
                View on Google Maps <ArrowUpRight className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Location list */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
          className="mt-16 divide-y divide-border border-y border-border"
        >
          {LOCATIONS.map((loc) => (
            <motion.li
              key={loc.title}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4 }}
            >
              <a
                href={loc.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${loc.title} — ${loc.sub}`}
                className="group flex items-center gap-5 py-5 hover:bg-bg-card/40 transition-colors px-2"
              >
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-semibold text-gold" style={{ letterSpacing: "0.32em" }}>
                    {loc.tag}
                  </div>
                  <div className="font-display text-xl text-text mt-1" style={{ fontWeight: 500 }}>
                    {loc.title}
                  </div>
                  <div className="text-sm text-text-muted">{loc.sub}</div>
                </div>
                <span
                  className="text-[11px] uppercase font-semibold text-text-muted group-hover:text-gold transition-colors"
                  style={{ letterSpacing: "0.28em" }}
                >
                  Open Map →
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Google Maps iframe — ground truth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden border border-border-strong"
          style={{ filter: "grayscale(0.3)" }}
        >
          <iframe
            title="R³S Realty Developers corridor map — Etmadpur, Agra"
            src="https://maps.google.com/maps?q=Etmadpur,+Agra,+Uttar+Pradesh,+India&hl=en&z=11&output=embed"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
