import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  COMPANY,
  SOCIAL,
  buildMailLink,
  buildPhoneLink,
  buildWhatsAppLink,
} from "../../lib/constants";
import LotusLogo from "../icons/LotusLogo";

const FOOTER_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Land Bank", href: "#land-bank" },
  { label: "Book Visit", href: "#booking" },
];

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className="pt-24 pb-10 border-t border-border"
      style={{ background: "#0a0a0a", color: "rgb(232,224,208)" }}
    >
      <div className="container-page">
        <div className="flex items-center gap-4 mb-12">
          <LotusLogo height={72} darkMode showText />
        </div>

        <h2
          className="font-display leading-[1.02] max-w-5xl"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color: "rgb(232,224,208)",
          }}
        >
          R³S Realty &amp; Developers LLP
        </h2>

        <p
          className="mt-6 text-base font-light max-w-2xl"
          style={{ color: "#7a7060" }}
        >
          Plotting · Commercial · Land Banking. Serving the Etmadpur–Tundla–Agra
          corridor since the beginning.
        </p>

        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 pt-12"
          style={{ borderTop: "1px solid rgba(232,224,208,0.07)" }}
        >
          <div>
            <div className="eyebrow mb-5">Office</div>
            <address
              className="font-light leading-relaxed text-[15px] not-italic"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="font-display text-base mb-2" style={{ color: "rgb(232,224,208)" }}>
                R³S Realty &amp; Developers LLP
              </div>
              <span itemProp="streetAddress">S.R. Super Market, Near Barhan Chauraha</span>
              <br />
              <span itemProp="addressLocality">Etmadpur</span>,{" "}
              <span itemProp="addressRegion">Agra</span>{" "}
              <span itemProp="postalCode">283202</span>
              <br />
              <span itemProp="addressCountry">Uttar Pradesh, India</span>
            </address>
          </div>

          <div>
            <div className="eyebrow mb-5">Reach Us</div>
            <ul className="space-y-3 font-light">
              <li>
                <a
                  href={buildPhoneLink()}
                  title="Call R³S Realty Raju Sharma"
                  className="hover:text-gold transition-colors"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.whatsapp}`}
                  title="WhatsApp number"
                  className="hover:text-gold transition-colors"
                >
                  {COMPANY.whatsappDisplay} (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat with R³S Realty on WhatsApp"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp now
                </a>
              </li>
              <li>
                <a
                  href={buildMailLink()}
                  title="Email R³S Realty"
                  className="hover:text-gold transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5">Explore</div>
            <ul className="space-y-3 font-light">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    title={`Jump to ${link.label}`}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.25em]"
          style={{
            borderTop: "1px solid rgba(232,224,208,0.07)",
            color: "#7a7060",
          }}
        >
          <div>© 2026 R³S Realty &amp; Developers LLP · Founded by Raju Sharma</div>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="R³S Realty on Facebook"
              className="w-9 h-9 border flex items-center justify-center hover:text-gold transition-colors"
              style={{ borderColor: "rgba(232,224,208,0.15)" }}
            >
              <FacebookIcon />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="R³S Realty on Instagram"
              className="w-9 h-9 border flex items-center justify-center hover:text-gold transition-colors"
              style={{ borderColor: "rgba(232,224,208,0.15)" }}
            >
              <InstagramIcon />
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp R³S Realty"
              className="w-9 h-9 border flex items-center justify-center hover:text-gold transition-colors"
              style={{ borderColor: "rgba(232,224,208,0.15)" }}
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-50 w-11 h-11 border border-gold/60 bg-bg/90 backdrop-blur text-gold hover:bg-gold hover:text-bg flex items-center justify-center transition-all"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}
