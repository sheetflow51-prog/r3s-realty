import { motion } from "framer-motion";
import BrandMark from "./BrandMark";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.4, ease: [0.6, 0, 0.4, 1] }}
      style={{ backgroundColor: "#0a0d0a" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <BrandMark size={96} tone="dark" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-8 text-center"
        style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          color: "#e0c068",
          fontWeight: 500,
          fontSize: "32px",
          letterSpacing: "0.005em",
        }}
      >
        R³S Realty <span style={{ opacity: 0.55, fontWeight: 300 }}>Developers</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        style={{
          color: "#a89977",
          fontWeight: 500,
          fontSize: "10px",
          letterSpacing: "0.35em",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
        className="mt-3 uppercase"
      >
        Realty &nbsp;·&nbsp; Plotting &nbsp;·&nbsp; Land Banking
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.3, delay: 0.4, ease: "easeInOut" }}
        className="mt-8"
        style={{
          width: 120,
          height: 1,
          background: "linear-gradient(to right, transparent, #c8a84b, transparent)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}
