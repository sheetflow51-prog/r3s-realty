import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import GeometricBg from "../shared/GeometricBg";

const SLIDES: { src: string; alt: string }[] = [
  {
    src: "/images/hero-banner.png",
    alt: "Aerial view of Saroj Residency plots Etmadpur Agra",
  },
  {
    src: "/images/prime-location2.png",
    alt: "Prime location residential plots near NH-19 Agra",
  },
  {
    src: "/images/approved-colony.png",
    alt: "RERA approved colony layout R3S Realty Agra",
  },
];

const TICKER_ITEMS = [
  "Plotting",
  "Commercial",
  "Land Banking",
  "Clear Title",
  "Bank Approved",
  "Etmadpur",
  "Barhan",
  "Tundla",
  "Khandauli",
  "Kakua",
  "Easy EMI Available",
];

const FLOATING_CARDS = [
  {
    eyebrow: "Active · Selling",
    name: "Saroj Residency",
    sub: "Near Sawai Dham · Etmadpur",
    price: "₹8.99 L",
    delay: "0s",
  },
  {
    eyebrow: "Commercial",
    name: "S.R. Super Market",
    sub: "Barhan Chauraha Shops",
    price: "Highway facing",
    delay: "0.6s",
  },
  {
    eyebrow: "Land Bank",
    name: "3 Belts",
    sub: "Etmadpur+ Corridor",
    price: "Strategic",
    delay: "1.2s",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg"
    >
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <img
              src={SLIDES[slide].src}
              alt={SLIDES[slide].alt}
              className="w-full h-full object-cover kenburns"
              width={1920}
              height={1080}
              loading={slide === 0 ? "eager" : "lazy"}
              fetchPriority={slide === 0 ? "high" : "auto"}
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-image-overlay)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgb(var(--hero-overlay-from) / 0.4), rgb(var(--hero-overlay-from) / 0.2), rgb(var(--hero-overlay-from) / 0.95))",
          }}
          aria-hidden
        />
        <GeometricBg variant="hero" />
      </div>

      <div className="absolute inset-0 noise z-0" aria-hidden />

      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="container-page pt-32 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-12 bg-gold/60" />
            <span className="section-number !mb-0">
              Realty &middot; Plotting &middot; Commercial
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="display-h1 max-w-4xl"
          >
            Premium Residential Plots in{" "}
            <em className="font-light italic text-gold">Etmadpur,</em>{" "}
            Agra
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 font-display italic text-text-muted text-lg md:text-xl"
          >
            Where roots meet rising horizons.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="body-text mt-8 text-lg md:text-xl max-w-xl"
          >
            Premium plotting at Saroj Residency. Commercial shops at Barhan
            Chauraha. Strategic land holdings adjoining UP Government&apos;s
            flagship Atalpuram township. All under one trusted name &mdash; Raju
            Sharma.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-text-muted"
          >
            <span>Plots From</span>
            <span className="text-gold">100 sq.yd</span>
            <span className="opacity-30">·</span>
            <span>Starting</span>
            <span className="text-gold">₹8,99,999</span>
            <span className="opacity-30">·</span>
            <span>Holdings</span>
            <span className="text-gold">3 Belts</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#booking"
              className="btn-green btn-3d"
              title="Schedule a free site visit at Saroj Residency"
            >
              Schedule Site Visit <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="btn-outline"
              title="View R³S Realty projects"
            >
              View Projects
            </a>
          </motion.div>

          <div className="hidden lg:flex absolute right-12 bottom-32 flex-col gap-3 w-72">
            {FLOATING_CARDS.map((c) => (
              <div
                key={c.name}
                className="float-anim relative backdrop-blur-md border border-border-strong p-4"
                style={{
                  background: "rgba(10,10,10,0.7)",
                  animationDelay: c.delay,
                }}
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold/90">
                  {c.eyebrow}
                </div>
                <div className="mt-1 font-display text-xl text-text">
                  {c.name}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  {c.sub}
                </div>
                <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
                  <span className="font-display text-lg text-gold">
                    {c.price}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 border-y border-border bg-bg-2/70 backdrop-blur-sm py-4 overflow-hidden">
        <div className="flex ticker-track whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {TICKER_ITEMS.map((item, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center text-text-muted text-[12px] uppercase tracking-[0.3em] font-light"
                >
                  <span className="px-8">{item}</span>
                  <span className="text-gold">&bull;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
