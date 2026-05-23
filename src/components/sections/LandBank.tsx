import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

/* ─────────────────────────────────────────────
   R³S Realty — NH-19 Growth Corridor
   Investor-grade SVG map with correct geography:
   Agra (0km) → Kakua–Baad (12km, slightly above hwy)
     → Etmadpur (16km, slightly below hwy)
     → Khandauli (18km, on hwy) → Barhan (22km, on hwy, HQ)
     → Tundla Jct (35km, on hwy).
   Warm parchment / amber + gold palette in both modes.
   ───────────────────────────────────────────── */

interface CorridorNode {
  id: string;
  name: string;
  km: number;
  cx: number;     // viewBox coords (0..1200, 0..520)
  cy: number;
  r: number;
  onHighway: boolean;
  highwayCx?: number; // where the connector should meet the highway
  highwayCy?: number;
  variant: "anchor" | "featured" | "hq" | "node";
  badge?: string;
  title: string;
  sub: string;
  desc: string;
  stats?: string;
  href: string;
  labelAbove: boolean;
}

const NODES: CorridorNode[] = [
  {
    id: "agra",
    name: "AGRA",
    km: 0,
    cx: 80,  cy: 280, r: 8,
    onHighway: true,
    variant: "anchor",
    title: "Agra",
    sub: "The Gateway City",
    desc: "Historic anchor of the corridor. All R³S belts within 12–35km drive.",
    href: "https://www.google.com/maps/search/Agra/@27.18,78.0,11z",
    labelAbove: false,
  },
  {
    id: "kakua",
    name: "KAKUA–BAAD",
    km: 12,
    cx: 380, cy: 185, r: 14,
    onHighway: false,
    highwayCx: 380, highwayCy: 210,
    variant: "featured",
    badge: "★ FEATURED INVESTMENT",
    title: "Kakua–Baad Belt",
    sub: "Adjacent to ADA Atalpuram Township",
    desc: "UP Government's ₹500Cr+ Atalpuram township planned adjacent. Maximum appreciation expected.",
    stats: "Early investor advantage · Gwalior Road",
    href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra",
    labelAbove: true,
  },
  {
    id: "etmadpur",
    name: "ETMADPUR",
    km: 16,
    cx: 640, cy: 310, r: 10,
    onHighway: false,
    highwayCx: 620, highwayCy: 230,
    variant: "hq",
    badge: "R³S ACTIVE",
    title: "Etmadpur — R³S HQ",
    sub: "Saroj Residency · S.R. Super Market",
    desc: "Our home base. Saroj Residency plots from ₹8.99L. Office at S.R. Super Market, Barhan Chauraha.",
    stats: "100 sq.yd onwards · Selling fast",
    href: "https://www.google.com/maps/search/Saroj+Residency+Etmadpur+Agra",
    labelAbove: false,
  },
  {
    id: "khandauli",
    name: "KHANDAULI",
    km: 18,
    cx: 720, cy: 240, r: 10,
    onHighway: true,
    variant: "node",
    title: "Khandauli Belt",
    sub: "NH-19 Junction · Rapid Growth Zone",
    desc: "Maximum frontage on NH-19. Agricultural plots with commercial potential. Railway connectivity nearby.",
    href: "https://www.google.com/maps/search/Khandauli+Agra",
    labelAbove: true,
  },
  {
    id: "barhan",
    name: "BARHAN",
    km: 22,
    cx: 840, cy: 245, r: 12,
    onHighway: true,
    variant: "hq",
    badge: "★ DIRECT NH-19 FRONTAGE",
    title: "Barhan Chauraha",
    sub: "Busiest Junction · Highway Commercial",
    desc: "R³S office at S.R. Super Market here. Highest daily footfall on the corridor. Ideal for commercial investment.",
    href: "https://www.google.com/maps/search/Barhan+Chauraha+Etmadpur+Agra",
    labelAbove: true,
  },
  {
    id: "tundla",
    name: "TUNDLA JUNCTION",
    km: 35,
    cx: 1150, cy: 240, r: 10,
    onHighway: true,
    variant: "node",
    title: "Tundla Junction Belt",
    sub: "Railway + Highway Confluence",
    desc: "Major railway junction on Delhi–Howrah main line. NH-19 highway access. Industrial and warehousing growth.",
    href: "https://www.google.com/maps/search/Tundla+Junction+Firozabad",
    labelAbove: true,
  },
];

const NH19_PATH =
  "M 80,280 C 200,260 280,230 380,210 C 450,195 500,200 560,220 L 720,240 L 840,245 C 950,250 1050,245 1150,240";

/* ── Animated counter for the stat row ── */
function Counter({
  to,
  suffix = "",
  duration = 1500,
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
  const cells = [
    { value: 12, suffix: " KM", label: "From Agra Centre" },
    { value: 28, suffix: "%",   label: "Annual Appreciation" },
    { value: 4,  suffix: "",    label: "Strategic Belts" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
      {cells.map((c) => (
        <div
          key={c.label}
          className="px-4 py-5 md:px-6 md:py-7 text-center md:text-left"
          style={{
            border: "1px solid rgba(200,134,10,0.18)",
            background: "rgba(200,134,10,0.04)",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "#C8860A",
              fontWeight: 500,
              fontSize: "clamp(32px, 5vw, 48px)",
              lineHeight: 1,
            }}
          >
            <Counter to={c.value} suffix={c.suffix} />
          </div>
          <div
            className="mt-3 uppercase font-semibold"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "var(--text-muted, #6b6055)",
            }}
          >
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Hand-coded SVG icons for the investment row ── */
function GovIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="14,3 22,9 6,9" />
      <line x1="6" y1="9" x2="6" y2="22" />
      <line x1="22" y1="9" x2="22" y2="22" />
      <line x1="14" y1="9" x2="14" y2="22" />
      <line x1="3" y1="22" x2="25" y2="22" />
      <line x1="14" y1="3" x2="14" y2="0.5" />
      <path d="M14 1 L18 2 L14 3" />
    </svg>
  );
}
function HighwayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" y1="9" x2="24" y2="9" />
      <line x1="4" y1="19" x2="24" y2="19" />
      <line x1="9" y1="14" x2="11" y2="14" />
      <line x1="13" y1="14" x2="15" y2="14" />
      <line x1="17" y1="14" x2="19" y2="14" />
      <line x1="2" y1="11" x2="4" y2="9" />
      <line x1="26" y1="11" x2="24" y2="9" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="4,24 4,4" />
      <polyline points="4,24 24,24" />
      <polyline points="6,20 11,15 16,17 22,8" />
      <circle cx="22" cy="8" r="1.5" fill="currentColor" />
      <polyline points="19,5 22,8 19,11" />
    </svg>
  );
}
function RailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="8" y1="3" x2="8" y2="25" />
      <line x1="20" y1="3" x2="20" y2="25" />
      <line x1="6" y1="8" x2="22" y2="8" />
      <line x1="6" y1="15" x2="22" y2="15" />
      <line x1="6" y1="22" x2="22" y2="22" />
      <polygon points="14,11 17,14 14,17 11,14" />
    </svg>
  );
}

function InvestmentIcons() {
  const items = [
    { Icon: GovIcon,     label: "Atalpuram Township", sub: "₹500Cr+ Govt Project" },
    { Icon: HighwayIcon, label: "NH-19 Expansion",    sub: "6-lane in progress" },
    { Icon: ChartIcon,   label: "28% Annual Growth",  sub: "5-year verified data" },
    { Icon: RailIcon,    label: "Tundla Junction",    sub: "Delhi–Howrah main line" },
  ];
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {items.map(({ Icon, label, sub }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 text-center transition-colors"
          style={{
            border: "1px solid rgba(200,134,10,0.12)",
            background: "transparent",
            padding: 20,
            borderRadius: 2,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.background = "rgba(200,134,10,0.05)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.background = "transparent")
          }
        >
          <span style={{ color: "var(--corridor-icon, #C8860A)" }}>
            <Icon />
          </span>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text)",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              color: "var(--text-muted)",
            }}
          >
            {sub}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Corridor SVG map ── */
function CorridorMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full corridor-shell"
      style={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(212,175,55,0.15)",
      }}
    >
      {/* Background base + vignette */}
      <div className="absolute inset-0 corridor-base" aria-hidden />
      <div className="absolute inset-0 corridor-vignette" aria-hidden />

      <div className="relative" style={{ width: "100%" }}>
        <svg
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMid meet"
          className="block w-full"
          style={{ height: "auto", maxHeight: 520 }}
          aria-label="NH-19 Growth Corridor map"
        >
          <defs>
            <pattern id="map-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" fill="none" className="map-grid-line" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="map-vign" cx="50%" cy="50%" r="65%">
              <stop offset="60%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
            </radialGradient>
          </defs>

          {/* Grid layer */}
          <rect width="1200" height="520" fill="url(#map-grid)" />

          {/* Secondary routes: Rail (top) + Yamuna Expressway (bottom) */}
          <line
            x1="80" y1="150" x2="1150" y2="150"
            stroke="#6B5040" strokeWidth="1"
            strokeDasharray="12,4,3,4" opacity="0.35"
          />
          <text x="100" y="142" fontFamily="'DM Sans', sans-serif" fontSize="9"
                fill="var(--corridor-muted)" letterSpacing="0.2em" opacity="0.8">
            DELHI – HOWRAH RAIL
          </text>

          <line
            x1="80" y1="380" x2="1150" y2="380"
            stroke="#8B6055" strokeWidth="1"
            strokeDasharray="8,6" opacity="0.4"
          />
          <text x="100" y="395" fontFamily="'DM Sans', sans-serif" fontSize="9"
                fill="var(--corridor-muted)" letterSpacing="0.2em" opacity="0.8">
            YAMUNA EXPRESSWAY
          </text>

          {/* NH-19 highway: border → fill → centre dashes */}
          <path d={NH19_PATH} stroke="#8B6914" strokeWidth="14" opacity="0.4" fill="none" strokeLinecap="round" />
          <path d={NH19_PATH} className="corridor-highway" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path
            d={NH19_PATH}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            strokeDasharray="20,15"
            fill="none"
            className="corridor-road-dashes"
          />

          {/* Connector lines for off-highway nodes */}
          {NODES.filter((n) => !n.onHighway).map((n) => (
            <line
              key={`conn-${n.id}`}
              x1={n.highwayCx}
              y1={n.highwayCy}
              x2={n.cx}
              y2={n.cy}
              stroke="#C8860A"
              strokeWidth="1.5"
              strokeDasharray="4,3"
              opacity="0.8"
            />
          ))}

          {/* Always-on advantage badges (pills) */}
          {/* Kakua–Baad badge */}
          <g transform="translate(290,150)">
            <rect width="220" height="22" rx="11"
                  fill="rgba(200,134,10,0.15)" stroke="#C8860A" strokeWidth="0.8" />
            <text x="110" y="14" textAnchor="middle"
                  fontFamily="'DM Sans', sans-serif" fontSize="8"
                  fill="#C8860A" letterSpacing="0.15em" fontWeight="600">
              ★ ADA ATALPURAM ADJACENT
            </text>
          </g>
          {/* Barhan badge */}
          <g transform="translate(740,210)">
            <rect width="200" height="22" rx="11"
                  fill="rgba(200,134,10,0.15)" stroke="#C8860A" strokeWidth="0.8" />
            <text x="100" y="14" textAnchor="middle"
                  fontFamily="'DM Sans', sans-serif" fontSize="8"
                  fill="#C8860A" letterSpacing="0.15em" fontWeight="600">
              ★ DIRECT NH-19 · HQ
            </text>
          </g>

          {/* Header */}
          <text x="40" y="50"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="20" fontWeight="600"
                fill="var(--corridor-title)">
            NH-19 Growth Corridor
          </text>
          <text x="40" y="68"
                fontFamily="'DM Sans', sans-serif"
                fontSize="9" letterSpacing="0.2em"
                fill="var(--corridor-muted)">
            AGRA → TUNDLA → KANPUR
          </text>

          {/* Legend (top-right) */}
          <g transform="translate(950,40)">
            <circle cx="6" cy="6" r="5" fill="#C8860A" />
            <text x="18" y="10"
                  fontFamily="'DM Sans', sans-serif" fontSize="9"
                  letterSpacing="0.12em" fill="var(--corridor-muted)">
              R³S HQ
            </text>
            <circle cx="80" cy="6" r="5" fill="#C8860A" />
            <text x="92" y="10"
                  fontFamily="'DM Sans', sans-serif" fontSize="9"
                  letterSpacing="0.12em" fill="var(--corridor-muted)">
              FEATURED
            </text>
          </g>

          {/* Compass — top-right, below legend */}
          <g transform="translate(1130,70)" opacity="0.85">
            <ellipse cx="0" cy="0" rx="14" ry="18" fill="none" stroke="#C8860A" strokeWidth="0.8" />
            <polygon points="0,-13 4,0 0,13 -4,0" fill="#C8860A" />
            <text x="0" y="-20" textAnchor="middle"
                  fontFamily="'DM Sans', sans-serif" fontSize="8"
                  fill="#C8860A" fontWeight="600">N</text>
          </g>

          {/* Scale bar (bottom-left) */}
          <g transform="translate(40,470)" opacity="0.85">
            <line x1="0" y1="0" x2="180" y2="0" stroke="#C8860A" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#C8860A" strokeWidth="2" />
            <line x1="90" y1="-3" x2="90" y2="3" stroke="#C8860A" strokeWidth="2" />
            <line x1="180" y1="-3" x2="180" y2="3" stroke="#C8860A" strokeWidth="2" />
            <text x="0" y="-8" fontFamily="'DM Sans', sans-serif" fontSize="9"
                  fill="var(--corridor-muted)">0</text>
            <text x="90" y="-8" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9"
                  fill="var(--corridor-muted)">20</text>
            <text x="180" y="-8" textAnchor="end" fontFamily="'DM Sans', sans-serif" fontSize="9"
                  fill="var(--corridor-muted)">40 km</text>
          </g>

          {/* Nodes */}
          {NODES.map((n) => {
            const isActive = n.variant === "featured" || n.variant === "hq";
            const color = n.variant === "anchor"
              ? "#FFFFFF"
              : n.variant === "featured"
              ? "#C8860A"
              : n.variant === "hq"
              ? "var(--corridor-hq-color, #C8860A)"
              : "var(--corridor-node-color, #8B4513)";
            return (
              <g
                key={n.id}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (rect) {
                    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }
                  setHovered(n.id);
                }}
                onMouseMove={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (rect) {
                    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }
                }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => window.open(n.href, "_blank", "noopener")}
              >
                {/* Outer glow ring for featured/hq — pulse via CSS */}
                {isActive && (
                  <circle
                    cx={n.cx}
                    cy={n.cy}
                    r={n.r + 8}
                    fill="none"
                    stroke={color === "var(--corridor-hq-color, #C8860A)" ? "#C8860A" : color}
                    strokeWidth="1.5"
                    opacity="0.3"
                    className="corridor-node-pulse"
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                  />
                )}
                {/* Node body */}
                {n.variant === "anchor" ? (
                  <circle cx={n.cx} cy={n.cy} r={n.r} fill="none" stroke="#FFFFFF" strokeWidth="2" />
                ) : (
                  <circle cx={n.cx} cy={n.cy} r={n.r} fill={color} stroke="#2D1A05" strokeWidth="1.5" />
                )}
                {/* Label */}
                <text
                  x={n.cx}
                  y={n.labelAbove ? n.cy - n.r - 12 : n.cy + n.r + 18}
                  textAnchor="middle"
                  fontFamily="'DM Sans', sans-serif"
                  fontSize="10"
                  fill="var(--corridor-label)"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  {n.name} {n.km} KM
                </text>
                {/* HQ extra tag for Barhan */}
                {n.id === "barhan" && (
                  <text
                    x={n.cx}
                    y={n.cy - n.r - 26}
                    textAnchor="middle"
                    fontFamily="'DM Sans', sans-serif"
                    fontSize="9"
                    fill="#C8860A"
                    letterSpacing="0.18em"
                    fontWeight="700"
                  >
                    ★ R³S HQ
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Footer bar */}
        <div
          className="corridor-footer flex items-center justify-between px-4 py-2"
          style={{
            borderTop: "1px solid rgba(200,134,10,0.1)",
            background: "rgba(200,134,10,0.05)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 8,
            letterSpacing: "0.18em",
            opacity: 0.7,
            color: "var(--corridor-muted)",
          }}
        >
          <span className="uppercase">SOURCE: R³S REALTY · LAND-BANK SURVEY 2026</span>
          <span className="uppercase hidden md:inline">HOVER A NODE FOR DETAILS</span>
        </div>

        {/* Tooltip — positioned at cursor inside container */}
        {hovered && pos && (() => {
          const n = NODES.find((x) => x.id === hovered);
          if (!n) return null;
          return (
            <div
              className="corridor-tooltip"
              style={{
                position: "absolute",
                left: Math.min(pos.x + 14, (containerRef.current?.clientWidth || 800) - 280),
                top: Math.max(pos.y - 110, 8),
                width: 260,
                background: "var(--corridor-tt-bg)",
                border: "1px solid #C8860A",
                borderRadius: 3,
                padding: "12px 16px",
                boxShadow: "0 4px 20px rgba(200,134,10,0.25)",
                color: "var(--corridor-tt-text)",
                pointerEvents: "none",
                zIndex: 30,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {n.badge && (
                <div style={{ color: "#C8860A", fontSize: 9, letterSpacing: "0.22em", fontWeight: 700, marginBottom: 4 }}>
                  {n.badge}
                </div>
              )}
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 500, lineHeight: 1.1 }}>
                {n.title}
              </div>
              <div style={{ fontSize: 11, marginTop: 4, color: "var(--corridor-tt-sub)" }}>
                {n.sub}
              </div>
              <div style={{ fontSize: 11, marginTop: 8, lineHeight: 1.45 }}>
                {n.desc}
              </div>
              {n.stats && (
                <div style={{ fontSize: 10, marginTop: 8, color: "#C8860A", letterSpacing: "0.14em", fontWeight: 600 }}>
                  {n.stats}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      <style>{`
        .corridor-shell { height: 520px; }
        @media (max-width: 768px) { .corridor-shell { height: 380px; } }

        .corridor-base { background: #F5F0E8; }
        html.dark .corridor-base { background: #0A140A; }

        .corridor-vignette {
          background: radial-gradient(circle at center, rgba(245,240,232,0) 60%, rgba(200,180,150,0.3) 100%);
          pointer-events: none;
        }
        html.dark .corridor-vignette {
          background: radial-gradient(circle at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%);
        }

        .map-grid-line { stroke: rgba(139,90,43,0.08); }
        html.dark .map-grid-line { stroke: rgba(212,175,55,0.06); }

        .corridor-highway { stroke: #C8860A; }
        html.dark .corridor-highway { stroke: #D4AF37; }

        :root {
          --corridor-title: #2D1A05;
          --corridor-label: #2D1A05;
          --corridor-muted: #6B6055;
          --corridor-icon: #C8860A;
          --corridor-tt-bg: rgba(245,240,232,0.97);
          --corridor-tt-text: #2D1A05;
          --corridor-tt-sub: #6B6055;
          --corridor-hq-color: #C8860A;
          --corridor-node-color: #8B4513;
        }
        html.dark {
          --corridor-title: #D4AF37;
          --corridor-label: #E8D5A0;
          --corridor-muted: #a89977;
          --corridor-icon: #D4AF37;
          --corridor-tt-bg: rgba(15,25,15,0.97);
          --corridor-tt-text: #E8D5A0;
          --corridor-tt-sub: #a89977;
          --corridor-hq-color: #D4AF37;
          --corridor-node-color: #D4AF37;
        }

        @keyframes roadFlow {
          to { stroke-dashoffset: -140px; }
        }
        .corridor-road-dashes {
          animation: roadFlow 3s linear infinite;
        }

        @keyframes corridorNodePulse {
          0%   { transform: scale(1);    opacity: 0.5; }
          50%  { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(1);    opacity: 0.5; }
        }
        .corridor-node-pulse {
          animation: corridorNodePulse 2.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .corridor-road-dashes, .corridor-node-pulse { animation: none; }
        }
      `}</style>
    </div>
  );
}

const BELTS: {
  id: string;
  tag: string;
  title: string;
  text: string;
  href: string;
  featured: boolean;
}[] = [
  {
    id: "kakua",
    tag: "Featured",
    title: "Kakua–Baad Belt",
    text: "Adjacent to UP Government's ₹500Cr+ Atalpuram Township (ADA). Maximum appreciation expected — early investor advantage on the Gwalior Road side of NH-19.",
    href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra",
    featured: true,
  },
  {
    id: "etmadpur",
    tag: "R³S Active",
    title: "Etmadpur — Saroj Residency",
    text: "Our active project — 100 sq.yd plots from ₹8.99L. Office at S.R. Super Market, Barhan Chauraha. Personally walked by Raju ji.",
    href: "https://www.google.com/maps/search/Saroj+Residency+Etmadpur+Agra",
    featured: false,
  },
  {
    id: "khandauli",
    tag: "Belt 02",
    title: "Khandauli — NH-19 Junction",
    text: "Maximum frontage on NH-19. Agricultural plots with commercial potential. Railway connectivity nearby. Rapid transition zone.",
    href: "https://www.google.com/maps/search/Khandauli+Agra",
    featured: false,
  },
  {
    id: "barhan",
    tag: "HQ · Belt 03",
    title: "Barhan Chauraha — Direct NH-19",
    text: "Highway-frontage commercial land at Barhan Chauraha. Busiest junction on the corridor. Home to R³S HQ at S.R. Super Market.",
    href: "https://www.google.com/maps/search/Barhan+Chauraha+Etmadpur+Agra",
    featured: false,
  },
];

const LOCATIONS: { tag: string; title: string; sub: string; href: string }[] = [
  { tag: "R³S Active", title: "Saroj Residency", sub: "Near Sawai Dham Ashram, Etmadpur", href: "https://www.google.com/maps/search/Sawai+Dham+Ashram+Etmadpur+Agra" },
  { tag: "R³S Active", title: "S.R. Super Market", sub: "Highway shops, Barhan Chauraha", href: "https://www.google.com/maps/search/Barhan+Chauraha+Etmadpur+Agra" },
  { tag: "Land Bank",  title: "Etmadpur–Khandauli Road", sub: "Agricultural & residential parcels", href: "https://www.google.com/maps/search/Khandauli+Agra" },
  { tag: "Land Bank",  title: "Etmadpur–Barhan Road",    sub: "Highway-adjacent commercial parcels", href: "https://www.google.com/maps/search/Barhan+Etmadpur+road" },
  { tag: "Land Bank",  title: "Tundla–Etmadpur–Agra Belt", sub: "NH-19 corridor land parcels", href: "https://www.google.com/maps/search/Tundla+Junction+Firozabad" },
  { tag: "Featured · Govt Adjacent", title: "Kakua–Baad Belt", sub: "Adjoining ADA's Atalpuram Township", href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra" },
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

        {/* Animated stat row */}
        <CorridorStats />

        {/* Corridor map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <CorridorMap />
        </motion.div>

        {/* Investment icons row */}
        <InvestmentIcons />

        {/* Belt cards (2×2) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="mt-12 grid md:grid-cols-2 gap-5"
        >
          {BELTS.map((belt) => (
            <motion.a
              key={belt.id}
              href={belt.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${belt.title} on Google Maps`}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              className={`r3s-belt-card relative block ${belt.featured ? "is-featured" : ""}`}
            >
              {belt.featured && (
                <div
                  className="absolute top-3 right-4 uppercase font-bold px-2 py-1"
                  style={{ fontSize: 10, background: "#C8860A", color: "#fff", letterSpacing: "0.22em", borderRadius: 2 }}
                >
                  ★ Featured
                </div>
              )}
              <div
                className="uppercase font-semibold mb-3"
                style={{ color: "#C8860A", fontSize: 10, letterSpacing: "0.32em" }}
              >
                {belt.tag}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(22px, 2.4vw, 28px)",
                  fontWeight: 500,
                  color: "var(--text)",
                  lineHeight: 1.2,
                }}
              >
                {belt.title}
              </h3>
              <p
                style={{
                  marginTop: 12,
                  fontSize: 15,
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  lineHeight: 1.65,
                }}
              >
                {belt.text}
              </p>
              <div
                className="mt-4 uppercase font-semibold inline-flex items-center gap-1"
                style={{ color: "#C8860A", fontSize: 10, letterSpacing: "0.32em" }}
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

        {/* Google Maps iframe */}
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

      <style>{`
        .r3s-belt-card {
          background: rgba(245,240,232,0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(200,134,10,0.15);
          border-left: 4px solid #C8860A;
          border-radius: 2px;
          padding: 24px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        html.dark .r3s-belt-card {
          background: rgba(15,25,15,0.85);
        }
        .r3s-belt-card:hover {
          transform: translateX(5px);
          box-shadow: 4px 0 20px rgba(200,134,10,0.15);
        }
        .r3s-belt-card.is-featured {
          background: linear-gradient(135deg, rgba(200,134,10,0.08), rgba(245,240,232,0.9));
          border: 1px solid rgba(200,134,10,0.4);
          border-left: 4px solid #C8860A;
        }
        html.dark .r3s-belt-card.is-featured {
          background: rgba(30,20,5,0.9);
          border: 1px solid rgba(200,134,10,0.4);
          border-left: 4px solid #C8860A;
        }
      `}</style>
    </section>
  );
}
