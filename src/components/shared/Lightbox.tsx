import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-white/20 text-white/80 hover:text-gold hover:border-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center border border-white/20 text-white/80 hover:text-gold hover:border-gold transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center border border-white/20 text-white/80 hover:text-gold hover:border-gold transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[index]}
            alt={`R3S Realty plot image ${index + 1} of ${images.length}`}
            loading="eager"
            decoding="async"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-[11px] uppercase tracking-[0.25em]">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
