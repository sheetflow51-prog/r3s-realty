import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   R³S Realty — Hero Slideshow
   5 cinematic SVG + CSS slides, no photos.
   Auto-advance 6000ms · crossfade 1200ms.
   ───────────────────────────────────────────── */

const GOLD = "#D4AF37";

interface SlideText {
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  sub: string;
}

const SLIDE_TEXT: SlideText[] = [
  {
    eyebrow: "SAROJ RESIDENCY · ETMADPUR",
    h1Line1: "Where roots meet",
    h1Line2: "rising horizons.",
    sub: "Premium residential plots on NH-19. Direct from developer. Starting ₹8.99L.",
  },
  {
    eyebrow: "NH-19 AGRA–KOLKATA CORRIDOR",
    h1Line1: "On India's",
    h1Line2: "golden highway.",
    sub: "35km of strategic land. 4 investment belts. One developer you can trust.",
  },
  {
    eyebrow: "SAROJ RESIDENCY · 100 SQ.YD ONWARDS",
    h1Line1: "100 sq.yd of",
    h1Line2: "your future.",
    sub: "Verified titles. Clear documentation. Walk the land before you decide.",
  },
  {
    eyebrow: "RAJU SHARMA · FOUNDER",
    h1Line1: "Built on trust.",
    h1Line2: "Rooted in Etmadpur.",
    sub: "Every plot personally walked by Raju ji. No middlemen. No pressure. Just honesty.",
  },
  {
    eyebrow: "KAKUA–BAAD BELT · FEATURED INVESTMENT",
    h1Line1: "The Etmadpur",
    h1Line2: "advantage. Now.",
    sub: "28% annual appreciation. Adjacent to UP Govt's flagship Atalpuram township. Limited plots.",
  },
];

/* ── Slide 1: The Land — deep forest dawn ── */
function Slide1() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 30% 70%, #2D5A27 0%, #1A3A1A 45%, #0A1F0A 100%)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" aria-hidden>
        <defs>
          <pattern id="s1-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="rgba(212,175,55,0.08)" />
          </pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#s1-dots)" />
        {/* Horizon line at y=65% */}
        <line x1="0" y1="585" x2="1600" y2="585" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
        {/* Sunrise arc */}
        <path
          d="M 1100,585 a 60,60 0 0,1 120,0"
          fill="none"
          stroke={GOLD}
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Trees on right */}
        {[
          { x: 1152, h: 120 },
          { x: 1280, h: 90 },
          { x: 1408, h: 150 },
        ].map((t, i) => (
          <g key={`t1-${i}`}>
            <rect
              x={t.x - 8}
              y={585 - t.h * 0.35}
              width="16"
              height={t.h * 0.35}
              fill="#1A3A1A"
              stroke="#2D5A27"
              strokeWidth="0.8"
            />
            <polygon
              points={`${t.x - 28},${585 - t.h * 0.35} ${t.x + 28},${585 - t.h * 0.35} ${t.x},${585 - t.h}`}
              fill="#1A3A1A"
              stroke="#2D5A27"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Slide 2: The Highway — gold road, night drive ── */
function Slide2() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(160deg, #0A1505 0%, #1A2E0A 35%, #2D4A1A 65%, #1A2E0A 100%)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" aria-hidden>
        {/* NH-19 watermark */}
        <text
          x="1200"
          y="500"
          fontFamily="'DM Sans', sans-serif"
          fontSize="280"
          fontWeight="700"
          fill="rgba(212,175,55,0.04)"
          textAnchor="middle"
        >
          NH-19
        </text>
        {/* Perspective road */}
        <polygon
          points="600,900 1000,900 1100,540 950,540"
          fill="none"
          stroke="rgba(212,175,55,0.15)"
          strokeWidth="2"
        />
        {/* Distance markers */}
        {[
          { x: 320, label: "12KM" },
          { x: 560, label: "18KM" },
          { x: 800, label: "22KM" },
          { x: 1120, label: "35KM" },
          { x: 1360, label: "TUNDLA" },
        ].map((m) => (
          <g key={`d-${m.label}`}>
            <line x1={m.x} y1={620} x2={m.x} y2={640} stroke={GOLD} strokeWidth="1" opacity="0.5" />
            <text
              x={m.x}
              y={660}
              fontFamily="'DM Sans', sans-serif"
              fontSize="14"
              fill={GOLD}
              opacity="0.7"
              textAnchor="middle"
              letterSpacing="0.15em"
            >
              {m.label}
            </text>
          </g>
        ))}
        {/* Road centre dashes — perspective, animated */}
        <g className="hero-road-dashes">
          {Array.from({ length: 8 }).map((_, i) => {
            // dashes shrink and shift left as they recede
            const t = i / 8;
            const w = 24 - t * 18;
            const h = 36 - t * 26;
            const y = 900 - i * 50;
            const x = 800 - (w / 2);
            return (
              <rect
                key={`dash-${i}`}
                x={x}
                y={y}
                width={w}
                height={h}
                fill={GOLD}
                opacity="0.5"
              />
            );
          })}
        </g>
      </svg>
      <style>{`
        @keyframes heroRoadFlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        .hero-road-dashes { animation: heroRoadFlow 1.6s linear infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .hero-road-dashes { animation: none; } }
      `}</style>
    </div>
  );
}

/* ── Slide 3: The Plots — warm amber earth ── */
function Slide3() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 55% 45%, #4A2E0A 0%, #2D1A05 50%, #150D02 100%)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" aria-hidden>
        {/* Scattered soil shapes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const cx = (i * 137 + 80) % 1600;
          const cy = (i * 83 + 60) % 900;
          const r = 4 + (i % 4) * 2;
          return (
            <circle
              key={`soil-${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(139,69,19,0.15)"
            />
          );
        })}
        {/* Plot grid: 6 cols × 4 rows on right half */}
        <g transform="translate(820,260)">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => {
              const x = c * 110;
              const y = r * 90;
              const isHighlight = r === 1 && c === 2;
              return (
                <g key={`p-${r}-${c}`}>
                  <rect
                    x={x}
                    y={y}
                    width={100}
                    height={80}
                    fill="none"
                    stroke={isHighlight ? GOLD : "rgba(212,175,55,0.2)"}
                    strokeWidth={isHighlight ? 2 : 0.8}
                    opacity={isHighlight ? 0.95 : 1}
                  />
                  {isHighlight && (
                    <>
                      {[
                        [x, y],
                        [x + 100, y],
                        [x, y + 80],
                        [x + 100, y + 80],
                      ].map(([cx, cy], i) => (
                        <circle key={`g-${i}`} cx={cx} cy={cy} r="3" fill={GOLD} />
                      ))}
                      <text
                        x={x + 50}
                        y={y + 46}
                        fontFamily="'DM Sans', sans-serif"
                        fontSize="14"
                        fill={GOLD}
                        textAnchor="middle"
                        letterSpacing="0.15em"
                      >
                        100 SQ.YD
                      </text>
                    </>
                  )}
                </g>
              );
            })
          )}
        </g>
      </svg>
    </div>
  );
}

/* ── Slide 4: The Trust — deep green personal ── */
function Slide4() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, #051005 0%, #0A1F0A 40%, #1A3A1A 75%, #0D2010 100%)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" aria-hidden>
        {/* Lotus watermark — 7 petals, centred, ~600px */}
        <g transform="translate(800,450) scale(3)">
          {[
            { cx: 0, cy: 5, rot: 0 },
            { cx: -18, cy: 10, rot: -18 },
            { cx: 18, cy: 10, rot: 18 },
            { cx: -35, cy: 18, rot: -35 },
            { cx: 35, cy: 18, rot: 35 },
            { cx: -50, cy: 28, rot: -52 },
            { cx: 50, cy: 28, rot: 52 },
          ].map((p, i) => (
            <ellipse
              key={`l-${i}`}
              cx={p.cx}
              cy={p.cy}
              rx="9"
              ry="32"
              fill="none"
              stroke="rgba(212,175,55,0.06)"
              strokeWidth="1"
              transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
            />
          ))}
        </g>
      </svg>

      {/* Trust badges — flex column on right 30% */}
      <div className="absolute hidden md:flex flex-col gap-4" style={{ right: "8%", top: "30%" }}>
        {[
          { icon: "check", label: "Clear Legal Titles" },
          { icon: "hand", label: "No Agents, No Commission" },
          { icon: "pin", label: "Personal Site Walkthrough" },
        ].map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.18)",
              borderRadius: 2,
              minWidth: 250,
            }}
          >
            <span style={{ color: GOLD }}>
              {b.icon === "check" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
              {b.icon === "hand" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 13s3-2 7 1 5-1 7-2 6 2 6 2" />
                  <path d="M5 16h14" />
                </svg>
              )}
              {b.icon === "pin" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 22s-7-7.58-7-13a7 7 0 0 1 14 0c0 5.42-7 13-7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              )}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.92)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 5: The Opportunity — premium gold ── */
function Slide5({ active }: { active: boolean }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 60%, #2D1F00 0%, #1A1200 50%, #0D0900 100%)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" aria-hidden>
        {/* Large 28% callout */}
        <text
          x="1040"
          y="500"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="320"
          fontWeight="500"
          fill="rgba(212,175,55,0.08)"
          textAnchor="middle"
        >
          28%
        </text>

        {/* Atalpuram pill — top-right */}
        <g transform="translate(1200,80)">
          <rect
            x="0" y="0" width="340" height="34"
            rx="17"
            fill="rgba(212,175,55,0.15)"
            stroke={GOLD}
            strokeWidth="0.5"
          />
          <text
            x="170"
            y="22"
            fontFamily="'DM Sans', sans-serif"
            fontSize="12"
            fontWeight="600"
            fill={GOLD}
            textAnchor="middle"
            letterSpacing="0.18em"
          >
            ADA ATALPURAM ₹500CR+ ADJACENT
          </text>
        </g>

        {/* Lotus blooming on right */}
        <g transform="translate(1180,450) scale(2)" className={active ? "hero-lotus-bloom" : ""}>
          {[
            { cx: 0, cy: 5, rot: 0, i: 3 },
            { cx: -18, cy: 10, rot: -18, i: 2 },
            { cx: 18, cy: 10, rot: 18, i: 4 },
            { cx: -35, cy: 18, rot: -35, i: 1 },
            { cx: 35, cy: 18, rot: 35, i: 5 },
            { cx: -50, cy: 28, rot: -52, i: 0 },
            { cx: 50, cy: 28, rot: 52, i: 6 },
          ].map((p) => (
            <ellipse
              key={`l5-${p.i}`}
              cx={p.cx}
              cy={p.cy}
              rx="9"
              ry="32"
              fill="none"
              stroke={GOLD}
              strokeWidth="1"
              opacity="0.18"
              transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
              style={{
                transformOrigin: `${p.cx}px ${p.cy + 25}px`,
                animation: active ? `lotusBloomS5 1s ease-out ${p.i * 0.2}s both` : undefined,
                opacity: active ? 0 : 0.18,
              }}
            />
          ))}
        </g>
      </svg>
      <style>{`
        @keyframes lotusBloomS5 {
          0%   { opacity: 0; transform: scale(0); }
          100% { opacity: 0.15; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-lotus-bloom ellipse { animation: none !important; opacity: 0.15 !important; }
        }
      `}</style>
    </div>
  );
}

const SLIDES_COUNT = 5;

export default function HeroSlides() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [enableLazy, setEnableLazy] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setEnableLazy(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES_COUNT), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      setSlide((s) => (s + (dx < 0 ? 1 : SLIDES_COUNT - 1)) % SLIDES_COUNT);
    }
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 1500);
  };

  const text = SLIDE_TEXT[slide];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", background: "#0a0d0a" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="R³S Realty hero highlights"
    >
      {/* Slide layers — crossfade */}
      <div className="absolute inset-0">
        {Array.from({ length: SLIDES_COUNT }).map((_, i) => {
          // Preload first 2 immediately; lazy-render others after 2s
          if (i > 1 && !enableLazy && slide !== i) return null;
          const isActive = i === slide;
          return (
            <div
              key={`slide-${i}`}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 1200ms ease-in-out",
                pointerEvents: isActive ? "auto" : "none",
              }}
              aria-hidden={!isActive}
            >
              {(() => { if (i === 0) return <Slide1 />; if (i === 1) return <Slide2 />; if (i === 2) return <Slide3 />; if (i === 3) return <Slide4 />; return <Slide5 active={isActive} />; })()}
            </div>
          );
        })}

        {/* Cinematic gradient — always-on darkening over left 60% for text safety */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(105deg, rgba(8,12,8,0.92) 0%, rgba(8,12,8,0.78) 38%, rgba(8,12,8,0.35) 70%, rgba(8,12,8,0.55) 100%)",
          }}
        />
        {/* Bottom fade into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-64"
          aria-hidden
          style={{
            background: "linear-gradient(to bottom, transparent, rgb(var(--bg-rgb)) 95%)",
          }}
        />
      </div>

      {/* Foreground text + CTAs */}
      <div className="relative z-10 min-h-screen flex items-end md:items-center">
        <div className="container-page py-28 md:py-40 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ background: "rgba(212,175,55,0.7)" }} />
              <span
                style={{
                  color: GOLD,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  fontWeight: 600,
                }}
              >
                {text.eyebrow}
              </span>
            </div>

            <h1
              key={`h1-${slide}`}
              className="hero-slide-h1"
              style={{
                color: "#ffffff",
                lineHeight: 1.1,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(38px, 5.4vw, 64px)",
                margin: 0,
              }}
            >
              {text.h1Line1}
              <br />
              <span style={{ fontStyle: "italic", color: GOLD }}>{text.h1Line2}</span>
            </h1>

            <p
              key={`sub-${slide}`}
              className="mt-6"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              {text.sub}
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold text-[12px] uppercase transition-all"
                title="Schedule a free site visit at Saroj Residency"
                style={{
                  background: "linear-gradient(180deg, #1e6b30, #163d20)",
                  color: "#f7efdc",
                  letterSpacing: "0.22em",
                  borderRadius: 2,
                  boxShadow: "0 8px 24px rgba(30,107,48,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                Schedule Site Visit <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 font-medium text-[12px] uppercase transition-all"
                title="View R³S Realty projects"
                style={{
                  color: "#f7efdc",
                  border: "1px solid rgba(247,239,220,0.4)",
                  letterSpacing: "0.22em",
                  borderRadius: 2,
                  background: "rgba(247,239,220,0.04)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center gap-3 z-20"
        style={{ bottom: 24 }}
        aria-label="Slide indicators"
      >
        {Array.from({ length: SLIDES_COUNT }).map((_, i) => {
          const active = i === slide;
          return (
            <button
              key={`dot-${i}`}
              onClick={() => setSlide(i)}
              aria-label={`Show slide ${i + 1}`}
              style={{
                width: active ? 8 : 6,
                height: active ? 8 : 6,
                borderRadius: "50%",
                background: active ? GOLD : "transparent",
                border: `1px solid ${GOLD}`,
                cursor: "pointer",
                padding: 0,
                transition: "all 0.25s ease",
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
