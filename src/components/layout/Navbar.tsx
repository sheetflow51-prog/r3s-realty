import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  COMPANY,
  NAV_LINKS,
  buildPhoneLink,
} from "../../lib/constants";
import { useTheme } from "../../hooks/useTheme";
import LotusLogo from "../icons/LotusLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* Top info bar */}
      <div
        className="hidden md:block text-[11px] text-text-muted"
        style={{ background: "var(--bg-2)" }}
      >
        <div className="container-page py-1.5 flex items-center justify-center gap-2 tracking-wide">
          <a
            href={buildPhoneLink()}
            title="Call R³S Realty"
            className="hover:text-gold transition-colors"
          >
            {COMPANY.phoneDisplay}
          </a>
          <span className="opacity-50">·</span>
          <span>S.R. Super Market, Near Barhan Chauraha</span>
          <span className="opacity-50">·</span>
          <span>Etmadpur, Agra</span>
        </div>
      </div>

      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-md border-b border-border py-2"
            : "bg-transparent py-3"
        }`}
      >
        <div className="container-page flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2"
            aria-label="R³S Realty Developers — Home"
            title="R³S Realty Developers — Home"
          >
            <LotusLogo height={44} darkMode={isDark} showText={true} />
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                title={`Go to ${link.label}`}
                className="text-[12px] uppercase tracking-[0.22em] font-light text-text/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle isDark={isDark} onToggle={toggle} />
            <a
              href="#booking"
              className="btn-green"
              title="Book a free site visit at Saroj Residency"
            >
              Book Site Visit
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={toggle} compact />
            <button
              className="p-2 text-text"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-bg border-t border-border px-6 py-8 flex flex-col gap-5"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  title={`Go to ${link.label}`}
                  className="text-[13px] uppercase tracking-[0.2em] text-text/90 hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                title="Book a free site visit at Saroj Residency"
                className="btn-green mt-4 self-start"
              >
                Book Site Visit
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
  compact = false,
}: {
  isDark: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`${
        compact ? "w-9 h-9" : "w-10 h-10"
      } flex items-center justify-center rounded-full border border-border-strong hover:border-gold transition-colors`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            <Sun size={16} className="text-gold" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            <Moon size={16} className="text-text" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
