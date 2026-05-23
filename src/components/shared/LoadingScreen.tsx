import { motion } from "framer-motion";
import LotusLogo from "../icons/LotusLogo";

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
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <LotusLogo height={100} darkMode showText animatePetals />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}
        style={{
          color: "#a89977",
          fontWeight: 500,
          fontSize: "10px",
          letterSpacing: "0.35em",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
        className="mt-6 uppercase"
      >
        Realty &nbsp;·&nbsp; Plotting &nbsp;·&nbsp; Land Banking
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.3, delay: 0.5, ease: "easeInOut" }}
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
