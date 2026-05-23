import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

/* ─────────────────────────────────────────────
   Cinematic hero — 5 slide carousel
   ───────────────────────────────────────────── */

const SLIDES: { src: string; alt: string; focal: string }[] = [
  {
    src: "/images/hero-banner.png",
    alt: "Aerial view of Saroj Residency plots Etmadpur Agra",
    focal: "center",
  },
  {
    src: "/images/plots-aerial.png",
    alt: "Aerial view of plot layout Saroj Residency Etmadpur",
    focal: "center",
  },
  {
    src: "/images/prime-location2.png",
    alt: "Prime location residential plots near NH-19 Agra",
    focal: "center 40%",
  },
  {
    src: "/images/planned-dev.png",
    alt: "Planned development layout R3S Realty Etmadpur Agra",
    focal: "center 35%",
  },
  {
    src: "/images/saroj-gate.png",
    alt: "Saroj Residency entrance gate Etmadpur Agra",
    focal: "center 30%",
  },
];

const TICKER_ITEMS = [
  "Verified Documentation",
  "Clear Title",
  "Bank Approved",
  "NH-19 Corridor",
  "Etmadpur",
  "Barhan",
  "Tundla",
  "Khandauli",
  "Kakua–Baad",
  "Planned Development",
  "Easy EMI",
];

const TRUST_BADGES: { icon: typeof MapPin; label: string; sub: string }[] = [
  { icon: MapPin, label: "NH-19 Corridor", sub: "Agra–Kolkata growth belt" },
  { icon: ShieldCheck, label: "Verified Documentation", sub: "Clear titles · approved colony" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0d0a" }}
    >
      {/* ── Cinematic backdrop ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <img
              src={SLIDES[slide].src}
              alt={SLIDES[slide].alt}
              width={1920}
              height={1080}
              loading={slide === 0 ? "eager" : "lazy"}
              fetchPriority={slide === 0 ? "high" : "auto"}
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: SLIDES[slide].focal }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic three-stop gradient ensures text safety on EVERY slide */}
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
            background:
              "linear-gradient(to bottom, transparent, rgb(var(--bg-rgb)) 95%)",
          }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(0,0,0,0.35) 90%)",
          }}
        />
      </div>

      {/* ── Foreground content (text safe zone: left 60% on desktop) ── */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="container-page pt-32 pb-32 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Headline column */}
            <div className="lg:col-span-7 xl:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="h-px w-10" style={{ background: "rgba(224,192,104,0.7)" }} />
                <span
                  className="text-[10px] uppercase font-semibold"
                  style={{
                    letterSpacing: "0.32em",
                    color: "#e0c068",
                  }}
                >
                  Realty &middot; Plotting &middot; Land Banking
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="display-h1 max-w-3xl"
                style={{ color: "#f7efdc" }}
              >
                Premium Residential Plots in{" "}
                <span style={{ color: "#e0c068", fontStyle: "italic", fontWeight: 400 }}>
                  Etmadpur,
                </span>{" "}
                Agra
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-5 italic"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                  color: "rgba(247,239,220,0.72)",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                Where roots meet rising horizons.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-7 max-w-xl"
                style={{
                  color: "rgba(247,239,220,0.78)",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                  lineHeight: 1.7,
                }}
              >
                Saroj Residency &mdash; Verified Documentation residential plots from
                ₹8.99L, on the NH-19 Agra–Kolkata corridor. Three strategic
                land belts. One trusted name &mdash;{" "}
                <span style={{ color: "#f7efdc" }}>Raju Sharma</span>.
              </motion.p>

              {/* Stat strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mt-10 grid grid-cols-3 gap-4 max-w-xl"
              >
                {[
                  { k: "From", v: "₹8.99 L" },
                  { k: "Size", v: "100 sq.yd" },
                  { k: "Belts", v: "4 Strategic" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="border-l pl-3"
                    style={{ borderColor: "rgba(224,192,104,0.35)" }}
                  >
                    <div
                      className="text-[9px] uppercase font-semibold mb-1"
                      style={{ letterSpacing: "0.28em", color: "rgba(247,239,220,0.55)" }}
                    >
                      {s.k}
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "clamp(1.05rem, 1.7vw, 1.5rem)",
                        color: "#e0c068",
                        fontWeight: 500,
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-10 flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold text-[12px] uppercase transition-all"
                  title="Schedule a free site visit at Saroj Residency"
                  style={{
                    background: "linear-gradient(180deg, #1e6b30, #163d20)",
                    color: "#f7efdc",
                    letterSpacing: "0.22em",
                    borderRadius: 2,
                    boxShadow:
                      "0 8px 24px rgba(30,107,48,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
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
              </motion.div>
            </div>

            {/* Trust badge column — hidden under lg to keep mobile clean */}
            <div className="hidden lg:col-span-5 lg:flex flex-col gap-4 pl-6">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="flex flex-col gap-3"
              >
                {TRUST_BADGES.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-4 p-5"
                    style={{
                      background: "rgba(8,12,8,0.7)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      border: "1px solid rgba(224,192,104,0.22)",
                      borderRadius: 2,
                    }}
                  >
                    <span
                      className="shrink-0 w-10 h-10 flex items-center justify-center"
                      style={{
                        background: "rgba(224,192,104,0.12)",
                        color: "#e0c068",
                        borderRadius: 2,
                      }}
                    >
                      <b.icon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <div
                        className="font-display"
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          color: "#f7efdc",
                          lineHeight: 1.1,
                        }}
                      >
                        {b.label}
                      </div>
                      <div
                        className="text-[11px] mt-1"
                        style={{ color: "rgba(247,239,220,0.6)" }}
                      >
                        {b.sub}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Slide indicator */}
                <div className="mt-6 flex items-center gap-2">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      aria-label={`Show slide ${i + 1}`}
                      className="transition-all"
                      style={{
                        width: i === slide ? 28 : 16,
                        height: 2,
                        background:
                          i === slide ? "#e0c068" : "rgba(247,239,220,0.25)",
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  <span
                    className="ml-3 text-[10px] uppercase font-semibold"
                    style={{
                      color: "rgba(247,239,220,0.55)",
                      letterSpacing: "0.32em",
                    }}
                  >
                    {String(slide + 1).padStart(2, "0")} /{" "}
                    {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ticker */}
      <div
        className="relative z-10 border-y py-3 overflow-hidden"
        style={{
          borderColor: "rgba(247,239,220,0.08)",
          background: "rgba(8,12,8,0.75)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="flex ticker-track whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {TICKER_ITEMS.map((item, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center text-[11px] uppercase font-medium"
                  style={{
                    color: "rgba(247,239,220,0.7)",
                    letterSpacing: "0.32em",
                  }}
                >
                  <span className="px-8">{item}</span>
                  <span style={{ color: "#e0c068" }}>&bull;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
