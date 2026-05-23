import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   R³S Realty — Hero Slideshow (real photos)
   5 cinematic photo slides with text overlay.
   Auto-advance 4500ms · crossfade 900ms.
   Mobile-first layout.
   ───────────────────────────────────────────── */

const GOLD = "#D4AF37";

interface Slide {
  src: string;
  alt: string;
  focal: string;
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  sub: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/saroj-gate.png",
    alt: "Saroj Residency entrance gate Etmadpur Agra",
    focal: "center 35%",
    eyebrow: "SAROJ RESIDENCY · ETMADPUR",
    h1Line1: "Where roots meet",
    h1Line2: "rising horizons.",
    sub: "Premium residential plots on NH-19. Direct from developer. Starting ₹8.99L.",
  },
  {
    src: "/images/hero-banner.png",
    alt: "NH-19 corridor Agra Kolkata aerial view",
    focal: "center",
    eyebrow: "NH-19 AGRA–KOLKATA CORRIDOR",
    h1Line1: "On India's",
    h1Line2: "golden highway.",
    sub: "35km of strategic land. 4 investment belts. One developer you can trust.",
  },
  {
    src: "/images/plots-aerial.png",
    alt: "Aerial view of plot layout Saroj Residency Etmadpur Agra",
    focal: "center",
    eyebrow: "SAROJ RESIDENCY · 100 SQ.YD ONWARDS",
    h1Line1: "100 sq.yd of",
    h1Line2: "your future.",
    sub: "Verified titles. Clear documentation. Walk the land before you decide.",
  },
  {
    src: "/images/sr-supermarket-real.jpg",
    alt: "S.R. Super Market at Barhan Chauraha — R³S Realty HQ",
    focal: "center 45%",
    eyebrow: "RAJU SHARMA · FOUNDER",
    h1Line1: "Built on trust.",
    h1Line2: "Rooted in Etmadpur.",
    sub: "Every plot personally walked by Raju ji. No middlemen. No pressure. Just honesty.",
  },
  {
    src: "/images/planned-dev.png",
    alt: "Planned development layout R³S Realty Etmadpur Agra",
    focal: "center 35%",
    eyebrow: "KAKUA–BAAD BELT · FEATURED INVESTMENT",
    h1Line1: "The Etmadpur",
    h1Line2: "advantage. Now.",
    sub: "28% annual appreciation. Adjacent to UP Govt's Atalpuram township. Limited plots.",
  },
];

export default function HeroSlides() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance — faster cadence
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
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
      setSlide((s) => (s + (dx < 0 ? 1 : SLIDES.length - 1)) % SLIDES.length);
    }
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 1200);
  };

  const s = SLIDES[slide];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden hero-section"
      style={{ background: "#0a0d0a" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="R³S Realty hero highlights"
    >
      {/* Crossfade image layers */}
      <div className="absolute inset-0">
        {SLIDES.map((sl, i) => (
          <div
            key={`sl-${i}`}
            className="absolute inset-0"
            style={{
              opacity: i === slide ? 1 : 0,
              transition: "opacity 900ms ease-in-out",
              pointerEvents: i === slide ? "auto" : "none",
            }}
            aria-hidden={i !== slide}
          >
            <img
              src={sl.src}
              alt={sl.alt}
              loading={i <= 1 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: sl.focal }}
            />
          </div>
        ))}

        {/* Cinematic gradient for text safety — stronger on left, fades right */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(105deg, rgba(8,12,8,0.92) 0%, rgba(8,12,8,0.78) 38%, rgba(8,12,8,0.35) 70%, rgba(8,12,8,0.55) 100%)",
          }}
        />
        {/* Mobile-only: stronger bottom gradient so text floats above image */}
        <div
          className="absolute inset-x-0 bottom-0 md:hidden"
          aria-hidden
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(8,12,8,0.95) 0%, rgba(8,12,8,0.75) 55%, rgba(8,12,8,0) 100%)",
          }}
        />
        {/* Bottom fade into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 md:h-64"
          aria-hidden
          style={{
            background: "linear-gradient(to bottom, transparent, rgb(var(--bg-rgb)) 95%)",
          }}
        />
      </div>

      {/* Foreground text — bottom 40% on mobile, centred left on desktop */}
      <div className="relative z-10 hero-content">
        <div className="container-page w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="h-px w-8 md:w-10" style={{ background: "rgba(212,175,55,0.7)" }} />
              <span
                style={{
                  color: GOLD,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.22em",
                  fontWeight: 600,
                }}
                className="text-[9px] md:text-[11px]"
              >
                {s.eyebrow}
              </span>
            </div>

            <h1
              key={`h1-${slide}`}
              style={{
                color: "#ffffff",
                lineHeight: 1.08,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                margin: 0,
              }}
              className="text-[34px] sm:text-[42px] md:text-[54px] lg:text-[64px]"
            >
              {s.h1Line1}
              <br />
              <span style={{ fontStyle: "italic", color: GOLD }}>{s.h1Line2}</span>
            </h1>

            <p
              key={`sub-${slide}`}
              className="mt-4 md:mt-6 text-[14px] md:text-[17px]"
              style={{
                color: "rgba(255,255,255,0.82)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.55,
                maxWidth: 480,
              }}
            >
              {s.sub}
            </p>

            <div className="mt-7 md:mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-7 md:py-4 font-semibold text-[11px] md:text-[12px] uppercase transition-all"
                title="Schedule a free site visit at Saroj Residency"
                style={{
                  background: "linear-gradient(180deg, #1e6b30, #163d20)",
                  color: "#f7efdc",
                  letterSpacing: "0.2em",
                  borderRadius: 2,
                  boxShadow: "0 8px 24px rgba(30,107,48,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                Schedule Site Visit <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-7 md:py-4 font-medium text-[11px] md:text-[12px] uppercase transition-all"
                title="View R³S Realty projects"
                style={{
                  color: "#f7efdc",
                  border: "1px solid rgba(247,239,220,0.4)",
                  letterSpacing: "0.2em",
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

      {/* Dot indicators — bottom centred */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center gap-2.5 z-20"
        style={{ bottom: 18 }}
        aria-label="Slide indicators"
      >
        {SLIDES.map((_, i) => {
          const active = i === slide;
          return (
            <button
              key={`dot-${i}`}
              onClick={() => setSlide(i)}
              aria-label={`Show slide ${i + 1}`}
              style={{
                width: active ? 9 : 6,
                height: active ? 9 : 6,
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

      <style>{`
        .hero-section {
          min-height: 100vh;
          min-height: 100svh;
        }
        .hero-content {
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: flex-end;
          padding-top: 6rem;
          padding-bottom: 4.5rem;
        }
        @media (min-width: 768px) {
          .hero-content {
            align-items: center;
            padding-top: 9rem;
            padding-bottom: 9rem;
          }
        }
      `}</style>
    </section>
  );
}
