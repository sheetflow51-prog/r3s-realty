import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Lightbox from "../shared/Lightbox";

interface GalleryImage {
  src: string;
  alt: string;
}

const IMG_LIST: GalleryImage[] = [
  {
    src: "/images/approved-colony.png",
    alt: "R³S Realty approved colony layout Etmadpur Agra",
  },
  {
    src: "/images/clear-titles2.png",
    alt: "Clear title plots R3S Realty Agra",
  },
  {
    src: "/images/hero-banner.png",
    alt: "Aerial view of Saroj Residency plots Etmadpur Agra",
  },
  {
    src: "/images/planned-dev.png",
    alt: "Planned development layout R3S Realty Etmadpur Agra",
  },
  {
    src: "/images/planned-dev2.png",
    alt: "Planned infrastructure development R3S Realty Agra",
  },
  {
    src: "/images/planned-roads.png",
    alt: "Planned internal roads Saroj Residency Etmadpur",
  },
  {
    src: "/images/plots-aerial.png",
    alt: "Aerial view of plot layout Saroj Residency Etmadpur",
  },
  {
    src: "/images/prime-location.png",
    alt: "Prime location residential plots near NH-19 Agra",
  },
  {
    src: "/images/prime-location2.png",
    alt: "Prime location residential plots near NH-19 Agra",
  },
  {
    src: "/images/saroj-gate.png",
    alt: "Saroj Residency entrance gate Etmadpur Agra",
  },
  {
    src: "/images/sr-supermarket-real.jpg",
    alt: "S.R. Super Market Barhan Chauraha Etmadpur Agra office R3S Realty",
  },
];

const SRC_LIST: string[] = IMG_LIST.map((i) => i.src);

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="section bg-bg">
      <div className="container-page">
        <SectionHeading
          number="02.5"
          label="Gallery"
          title="See the land."
          emWord="land."
          subtitle="Every plot we sell is personally walked by Raju ji. These are real."
        />

        <div className="masonry">
          {IMG_LIST.map((img, i) => (
            <motion.button
              key={img.src + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              onClick={() => setActive(i)}
              className="block overflow-hidden border border-transparent hover:border-gold transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:border-gold"
              style={{ borderRadius: 0, borderWidth: "2px" }}
              aria-label={`Open: ${img.alt}`}
              title={img.alt}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={SRC_LIST}
        index={active}
        onClose={() => setActive(null)}
        onPrev={() =>
          setActive((i) => (i === null ? null : (i - 1 + SRC_LIST.length) % SRC_LIST.length))
        }
        onNext={() =>
          setActive((i) => (i === null ? null : (i + 1) % SRC_LIST.length))
        }
      />
    </section>
  );
}
