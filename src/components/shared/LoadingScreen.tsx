import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.4, ease: [0.6, 0, 0.4, 1] }}
      style={{ backgroundColor: "#0d0d0d" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
    >
      <motion.img
        src="/images/logo-full.png"
        alt="R³S Realty and Developers LLP full logo"
        width={512}
        height={384}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="h-24 md:h-32 w-auto"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="mt-8 text-center"
        style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          color: "#c8a84b",
          fontWeight: 400,
          fontSize: "28px",
          letterSpacing: "0.02em",
        }}
      >
        R³S Realty &amp; Developers
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}
        style={{
          color: "#7a7060",
          fontWeight: 300,
          fontSize: "11px",
          letterSpacing: "0.3em",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
        className="mt-3 uppercase"
      >
        Realty &nbsp;&middot;&nbsp; Developers
      </motion.div>
    </motion.div>
  );
}
