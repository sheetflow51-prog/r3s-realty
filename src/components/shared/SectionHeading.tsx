import { motion } from "framer-motion";

interface SectionHeadingProps {
  number?: string;
  label?: string;
  title: string;
  emWord?: string;
  subtitle?: string;
  align?: "left" | "center";
}

function renderTitle(title: string, emWord?: string) {
  if (!emWord) return title;
  const parts = title.split(emWord);
  return (
    <>
      {parts[0]}
      <em className="italic font-light text-gold/90">{emWord}</em>
      {parts.slice(1).join(emWord)}
    </>
  );
}

export default function SectionHeading({
  number,
  label,
  title,
  emWord,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      } mb-16 md:mb-20`}
    >
      {(number || label) && (
        <div className="flex items-center gap-3 mb-6">
          {number && <span className="section-number">{number}</span>}
          {label && (
            <span className="section-number text-text-muted">/ {label}</span>
          )}
        </div>
      )}
      <h2 className="display-h2">{renderTitle(title, emWord)}</h2>
      {subtitle && (
        <p className="body-text mt-5 text-base md:text-lg max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
