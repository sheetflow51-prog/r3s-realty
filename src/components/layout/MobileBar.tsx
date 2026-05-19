import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { buildPhoneLink, buildWhatsAppLink } from "../../lib/constants";

export default function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      setShow(window.scrollY > heroHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-bg/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center justify-between gap-3"
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-text-muted leading-tight">
            Interested in a plot?
          </div>
          <div className="flex items-center gap-2">
            <a
              href={buildPhoneLink()}
              title="Call R³S Realty"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-[0.18em] border border-border-strong text-text hover:border-gold hover:text-gold transition-colors"
              style={{ borderRadius: 2 }}
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp R³S Realty"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white transition-colors"
              style={{ background: "var(--green)", borderRadius: 2 }}
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
