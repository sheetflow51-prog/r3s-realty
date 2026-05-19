import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

/* ─────────────────────────────────────────────
   NH-19 Growth Corridor — highway milestone viz
   ───────────────────────────────────────────── */

interface Milestone {
  id: string;
  name: string;
  km: number;
  leftPct: number; // % from left for placement above road
  subline: string;
  details: string;
  href: string;
  variant: "featured" | "primary" | "hq" | "muted";
  badge?: string;
  ribbon?: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "kakua",
    name: "Kakua-Baad",
    km: 12,
    leftPct: 20,
    subline: "100–200 sq.yd | From ₹12L",
    details:
      "Adjoining ADA's Atalpuram Township on the Agra–Gwalior road. High appreciation pocket.",
    href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra/@27.1300,77.9700,12z",
    variant: "featured",
    ribbon: "FEATURED",
  },
  {
    id: "khandauli",
    name: "Khandauli",
    km: 18,
    leftPct: 40,
    subline: "Railway Junction Area",
    details:
      "Agricultural and residential parcels along Etmadpur–Khandauli with steady road-frontage appreciation.",
    href: "https://www.google.com/maps/search/Khandauli+Agra/@27.2700,78.2200,12z",
    variant: "primary",
  },
  {
    id: "barhan",
    name: "Barhan",
    km: 22,
    leftPct: 58,
    subline: "HQ at S.R. Super Market",
    details:
      "Highway-adjacent commercial land at Barhan Chauraha — and the home of R³S Realty's office.",
    href: "https://www.google.com/maps/search/Barhan+Etmadpur+road/@27.2400,78.2500,12z",
    variant: "hq",
    badge: "R³S HQ",
  },
  {
    id: "tundla",
    name: "Tundla",
    km: 35,
    leftPct: 75,
    subline: "Railway Station Proximity",
    details:
      "Premium plots within easy reach of Tundla Junction — strong growth on the NH-19 corridor.",
    href: "https://www.google.com/maps/search/Tundla+Etmadpur+Agra/@27.2200,78.2700,11z",
    variant: "muted",
  },
];

const KM_MARKERS: { km: number; leftPct: number }[] = [
  { km: 0, leftPct: 2 },
  { km: 12, leftPct: 20 },
  { km: 18, leftPct: 40 },
  { km: 25, leftPct: 62 },
  { km: 35, leftPct: 78 },
];

const AMENITY_ICONS: { emoji: string; label: string; leftPct: number }[] = [
  { emoji: "🏫", label: "Schools near Etmadpur", leftPct: 28 },
  { emoji: "🏥", label: "Hospital — Khandauli", leftPct: 46 },
  { emoji: "🛤️", label: "Tundla Railway Junction", leftPct: 80 },
];

function boardColor(variant: Milestone["variant"]) {
  switch (variant) {
    case "featured":
      return {
        bg: "linear-gradient(135deg, #e0c068, #a07820)",
        text: "#0a1a0a",
        border: "1px solid rgba(200,168,75,0.9)",
      };
    case "primary":
      return {
        bg: "linear-gradient(135deg, #1e6b30, #2d8a42)",
        text: "#f0ebe2",
        border: "1px solid rgba(45,138,66,0.7)",
      };
    case "hq":
      return {
        bg: "linear-gradient(135deg, #163d20, #2d8a42)",
        text: "#f0ebe2",
        border: "1px solid rgba(45,138,66,0.7)",
      };
    case "muted":
    default:
      return {
        bg: "linear-gradient(135deg, #2c3a2e, #3a5b3a)",
        text: "#f0ebe2",
        border: "1px solid rgba(58,91,58,0.7)",
      };
  }
}

function CarSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 20" className={className} aria-hidden>
      <g fill="#c8a84b">
        <path d="M2 14 L8 14 L11 8 L34 8 L40 14 L46 14 L46 17 L2 17 Z" />
        <rect x="13" y="9" width="8" height="4" fill="#0a1a0a" />
        <rect x="23" y="9" width="8" height="4" fill="#0a1a0a" />
      </g>
      <circle cx="11" cy="17" r="2.5" fill="#0a1a0a" />
      <circle cx="37" cy="17" r="2.5" fill="#0a1a0a" />
    </svg>
  );
}

function Signboard({
  milestone,
}: {
  milestone: Milestone;
}) {
  const c = boardColor(milestone.variant);
  const [hover, setHover] = useState(false);
  return (
    <a
      href={milestone.href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${milestone.name} on Google Maps`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="absolute -translate-x-1/2 flex flex-col items-center group focus:outline-none"
      style={{
        left: `${milestone.leftPct}%`,
        top: 24,
        zIndex: 4,
      }}
    >
      {/* Board */}
      <div
        className="relative px-4 py-3 shadow-lg transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          background: c.bg,
          color: c.text,
          border: c.border,
          minWidth: 156,
          borderRadius: 4,
        }}
      >
        {milestone.ribbon && (
          <div
            className="absolute -top-3 -right-3 text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-1"
            style={{
              background: "#c92a2a",
              color: "#fff",
              borderRadius: 2,
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            {milestone.ribbon}
          </div>
        )}
        {milestone.badge && (
          <div
            className="absolute -top-2 -left-2 text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-1"
            style={{
              background: "#c8a84b",
              color: "#0a1a0a",
              borderRadius: 2,
            }}
          >
            {milestone.badge}
          </div>
        )}
        <div
          className="font-display text-base leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {milestone.name} | {milestone.km} km from Agra
        </div>
        <div
          className="mt-1 text-[10px] uppercase tracking-[0.15em] font-light"
          style={{ opacity: 0.85 }}
        >
          {milestone.subline}
        </div>
      </div>

      {/* Pole */}
      <div
        style={{
          width: 4,
          height: 70,
          background:
            "linear-gradient(to bottom, #6a6a6a, #3a3a3a)",
          marginTop: -2,
        }}
        aria-hidden
      />

      {/* Hover details card */}
      {hover && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute pointer-events-none"
          style={{
            top: -110,
            left: "50%",
            transform: "translateX(-50%)",
            width: 240,
            background: "rgba(10,20,10,0.95)",
            border: "1px solid rgba(200,168,75,0.5)",
            borderRadius: 4,
            padding: "10px 14px",
            color: "#e8e0d0",
            boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
            zIndex: 10,
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.22em] text-gold mb-1">
            View on Google Maps →
          </div>
          <div className="text-[12px] leading-snug font-light">
            {milestone.details}
          </div>
        </motion.div>
      )}
    </a>
  );
}

function NH19Corridor() {
  return (
    <div
      className="relative w-full overflow-hidden corridor-shell"
      style={{
        height: 520,
        borderRadius: 4,
      }}
    >
      {/* Sky / background */}
      <div className="absolute inset-0 corridor-bg" aria-hidden />

      {/* Title overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div
          className="font-display text-base md:text-lg"
          style={{
            color: "var(--gold)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          NH-19 Growth Corridor
        </div>
        <div
          className="text-[10px] uppercase tracking-[0.25em]"
          style={{ color: "var(--text-muted)" }}
        >
          Hover a signboard for details
        </div>
      </div>

      {/* Milestones (signboards above road) */}
      {MILESTONES.map((m) => (
        <Signboard key={m.id} milestone={m} />
      ))}

      {/* Amenity icons just above road */}
      {AMENITY_ICONS.map((a) => (
        <div
          key={a.label}
          className="absolute -translate-x-1/2"
          title={a.label}
          aria-label={a.label}
          style={{
            left: `${a.leftPct}%`,
            top: "calc(50% - 56px)",
            fontSize: 22,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
            zIndex: 3,
          }}
        >
          {a.emoji}
        </div>
      ))}

      {/* Road strip — center horizontal */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "calc(50% - 4px)",
          height: 8,
          background: "linear-gradient(to bottom, #d4a542, #b88f30)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.35), 0 -2px 6px rgba(0,0,0,0.2)",
          zIndex: 2,
        }}
        aria-hidden
      >
        {/* Dashed white center line */}
        <div
          className="absolute road-dashes"
          style={{
            left: 0,
            right: 0,
            top: "calc(50% - 1px)",
            height: 2,
          }}
        />
      </div>

      {/* NH-19 label at left edge */}
      <div
        className="absolute"
        style={{
          left: 12,
          top: "calc(50% + 14px)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--gold)",
          background: "rgba(0,0,0,0.45)",
          padding: "4px 8px",
          borderRadius: 2,
          zIndex: 3,
        }}
      >
        NH-19 Agra — Kolkata
      </div>

      {/* km markers below road */}
      {KM_MARKERS.map((m) => (
        <div
          key={m.km}
          className="absolute -translate-x-1/2"
          style={{
            left: `${m.leftPct}%`,
            top: "calc(50% + 22px)",
            zIndex: 3,
          }}
          aria-hidden
        >
          <div
            style={{
              width: 1,
              height: 10,
              background: "var(--gold)",
              margin: "0 auto",
              opacity: 0.6,
            }}
          />
          <div
            className="text-[10px] mt-1 uppercase tracking-[0.18em]"
            style={{ color: "var(--text-muted)" }}
          >
            {m.km} km
          </div>
        </div>
      ))}

      {/* Moving car */}
      <div
        className="absolute corridor-car"
        style={{
          top: "calc(50% - 20px)",
          left: 0,
          width: 48,
          height: 20,
          zIndex: 4,
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <CarSVG className="w-full h-full" />
      </div>

      {/* Inline styles via component */}
      <style>{`
        .corridor-shell {
          --corridor-bg: #f0ebe2;
        }
        html.dark .corridor-shell {
          --corridor-bg: #0d1a0d;
        }
        .corridor-bg {
          background:
            radial-gradient(ellipse at 50% 0%, rgba(200,168,75,0.10), transparent 60%),
            radial-gradient(ellipse at 50% 100%, rgba(45,138,66,0.10), transparent 60%),
            var(--corridor-bg);
        }
        .road-dashes {
          background-image: repeating-linear-gradient(
            to right,
            #ffffff 0,
            #ffffff 18px,
            transparent 18px,
            transparent 34px
          );
          animation: corridor-dash 1.2s linear infinite;
        }
        @keyframes corridor-dash {
          from { background-position-x: 0; }
          to { background-position-x: -34px; }
        }
        .corridor-car {
          animation: corridor-drive 8s linear infinite;
        }
        @keyframes corridor-drive {
          0% { transform: translateX(-60px); }
          100% { transform: translateX(calc(100vw + 60px)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .road-dashes, .corridor-car { animation: none; }
        }
      `}</style>
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
      "Strategic land holdings near the Kakua–Baad belt — adjoining UP Government's flagship Atalpuram Township by ADA on Gwalior Road. High appreciation expected.",
    href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra/@27.1300,77.9700,12z",
    featured: true,
  },
  {
    tag: "Belt 01",
    title: "Etmadpur–Khandauli Road",
    text:
      "Strategic agricultural and residential plots along the Etmadpur–Khandauli corridor. Excellent road frontage and rapid appreciation.",
    href: "https://www.google.com/maps/search/Khandauli+Agra/@27.2700,78.2200,12z",
    featured: false,
  },
  {
    tag: "Belt 02",
    title: "Etmadpur–Barhan Road",
    text:
      "Highway-adjacent land parcels with direct connectivity to Barhan Chauraha. Ideal for commercial development. R³S HQ at S.R. Super Market is here.",
    href: "https://www.google.com/maps/search/Barhan+Etmadpur+road/@27.2400,78.2500,12z",
    featured: false,
  },
  {
    tag: "Belt 03",
    title: "Tundla–Etmadpur–Agra Belt",
    text:
      "Premium plots along the high-growth Tundla–Etmadpur–Agra corridor. Connected to NH-19 with strong appreciation history.",
    href: "https://www.google.com/maps/search/Tundla+Etmadpur+Agra/@27.2200,78.2700,11z",
    featured: false,
  },
];

const LOCATIONS: { tag: string; title: string; sub: string; href: string }[] = [
  {
    tag: "R³S Active",
    title: "Saroj Residency",
    sub: "Near Sawai Dham Ashram, Etmadpur",
    href: "https://www.google.com/maps/search/Sawai+Dham+Ashram+Etmadpur+Agra/@27.2308,78.2614,13z",
  },
  {
    tag: "R³S Active",
    title: "S.R. Super Market",
    sub: "Highway shops, Barhan Chauraha",
    href: "https://www.google.com/maps/search/Barhan+Chauraha+Etmadpur+Agra/@27.2400,78.2400,13z",
  },
  {
    tag: "Land Bank",
    title: "Etmadpur–Khandauli Road",
    sub: "Agricultural & residential parcels",
    href: "https://www.google.com/maps/search/Khandauli+Agra/@27.2700,78.2200,12z",
  },
  {
    tag: "Land Bank",
    title: "Etmadpur–Barhan Road",
    sub: "Highway-adjacent commercial parcels",
    href: "https://www.google.com/maps/search/Barhan+Etmadpur+road/@27.2400,78.2500,12z",
  },
  {
    tag: "Land Bank",
    title: "Tundla–Etmadpur–Agra Belt",
    sub: "NH-19 corridor land parcels",
    href: "https://www.google.com/maps/search/Tundla+Etmadpur+Agra/@27.2200,78.2700,11z",
  },
  {
    tag: "Featured · Govt Adjacent",
    title: "Kakua–Baad Belt",
    sub: "Adjoining ADA's Atalpuram Township",
    href: "https://www.google.com/maps/search/Kakua+Bhandai+Atalpuram+Agra/@27.1300,77.9700,12z",
  },
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
            subtitle="Beyond our active projects, R³S Realty holds prime land across four strategic pockets around Agra — including the high-potential Kakua–Baad belt adjoining UP Government's flagship Atalpuram township. Direct sale, investor partnerships, and custom development — all available."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <NH19Corridor />
        </motion.div>

        {/* Belt cards — 2x2 dark glass */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
          className="mt-12 grid md:grid-cols-2 gap-5"
        >
          {BELTS.map((belt) => (
            <motion.a
              key={belt.title}
              href={belt.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${belt.title} on Google Maps`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className={`belt-card block ${belt.featured ? "featured" : ""}`}
            >
              {belt.featured && (
                <div
                  className="absolute top-3 right-4 text-[10px] uppercase tracking-[0.22em] px-2 py-1"
                  style={{
                    color: "#0a1a0a",
                    background: "var(--gold)",
                  }}
                >
                  ★ Featured
                </div>
              )}
              <div
                className="text-[10px] uppercase tracking-[0.25em] mb-3"
                style={{ color: "#c8a84b" }}
              >
                {belt.tag}
              </div>
              <h3
                className="font-display text-2xl md:text-3xl"
                style={{
                  color: "rgb(232,224,208)",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {belt.title}
              </h3>
              <p
                className="mt-3 text-base font-light leading-relaxed"
                style={{ color: "rgb(160,150,135)" }}
              >
                {belt.text}
              </p>
              <div
                className="mt-4 text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "#c8a84b" }}
              >
                View on Google Maps →
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Location links */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
            hidden: {},
          }}
          className="mt-16 divide-y divide-border border-y border-border"
        >
          {LOCATIONS.map((loc) => (
            <motion.li
              key={loc.title}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
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
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                    {loc.tag}
                  </div>
                  <div className="font-display text-xl text-text mt-1">
                    {loc.title}
                  </div>
                  <div className="text-sm text-text-muted">{loc.sub}</div>
                </div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-text-muted group-hover:text-gold transition-colors">
                  Open Map →
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Google Maps iframe (ground truth) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden border border-border-strong"
          style={{ filter: "grayscale(0.3)" }}
        >
          <iframe
            title="R3S corridor map — Etmadpur, Agra"
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
