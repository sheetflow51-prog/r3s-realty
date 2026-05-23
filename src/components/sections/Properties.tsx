import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import { buildWhatsAppLink } from "../../lib/constants";

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  id: string;
  tag: string;
  name: string;
  location: string;
  details: string[];
  images: ProjectImage[];
  whatsappMessage: string;
}

const PROJECTS: Project[] = [
  {
    id: "saroj",
    tag: "Plotting · Active",
    name: "Saroj Residency",
    location: "Near Sawai Dham Ashram · Etmadpur, Agra",
    details: ["Area: 100 sq.yd", "Starting: ₹8.99L", "Status: Selling"],
    images: [
      {
        src: "/images/prime-location2.png",
        alt: "Prime location residential plots near NH-19 Agra",
      },
      {
        src: "/images/approved-colony.png",
        alt: "R³S Realty approved colony layout Etmadpur Agra",
      },
      {
        src: "/images/plots-aerial.png",
        alt: "Aerial view of plot layout Saroj Residency Etmadpur",
      },
      {
        src: "/images/planned-dev.png",
        alt: "Planned development layout R3S Realty Etmadpur Agra",
      },
    ],
    whatsappMessage:
      "Hi Raju ji, I'm interested in Saroj Residency (₹8.99L, 100 sq.yd). Please share more details.",
  },
  {
    id: "sr-supermarket",
    tag: "Commercial · Available",
    name: "S.R. Super Market",
    location: "Highway Shops · Barhan Chauraha, Etmadpur",
    details: ["Type: Commercial", "Frontage: Highway", "Status: Few Left"],
    images: [
      {
        src: "/images/sr-supermarket-real.jpg",
        alt: "S.R. Super Market Barhan Chauraha Etmadpur Agra office R3S Realty",
      },
    ],
    whatsappMessage:
      "Hi Raju ji, I'm interested in the S.R. Super Market commercial shops at Barhan Chauraha. Please share more details.",
  },
];

function ProjectRow({
  project,
  reversed,
  index,
}: {
  project: Project;
  reversed: boolean;
  index: number;
}) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <div className="zoom-img relative overflow-hidden aspect-[4/3]">
          <img
            src={project.images[activeImg].src}
            alt={project.images[activeImg].alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.4), transparent 50%)",
            }}
          />
        </div>
        {project.images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {project.images.map((img, i) => (
              <button
                key={img.src + i}
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}: ${img.alt}`}
                title={img.alt}
                className={`aspect-[4/3] overflow-hidden border transition-all ${
                  i === activeImg
                    ? "border-gold opacity-100"
                    : "border-border opacity-60 hover:opacity-100 hover:border-border-strong"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={225}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`max-w-md ${reversed ? "lg:ml-auto" : ""}`}>
        <div className="flex items-center gap-3 mb-5">
          <span className="section-number !mb-0">
            0{index + 1} / Project
          </span>
        </div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-gold mb-3">
          {project.tag}
        </div>
        <h3 className="font-display text-3xl md:text-5xl text-text leading-tight">
          {project.name}
        </h3>
        <div className="mt-4 text-[11px] uppercase tracking-[0.25em] text-text-muted">
          &#9702; {project.location}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[12px] uppercase tracking-[0.18em] text-text-muted">
          {project.details.map((d, i) => (
            <span key={d} className="flex items-center gap-3">
              {i > 0 && <span className="opacity-30">·</span>}
              {d}
            </span>
          ))}
        </div>
        <a
          href={buildWhatsAppLink(project.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Enquire about ${project.name} on WhatsApp`}
          className="mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-text border-b border-gold/40 hover:border-gold hover:text-gold pb-1 transition-colors"
        >
          Enquire on WhatsApp
          <ArrowUpRight className="w-4 h-4 text-gold" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Properties() {
  return (
    <section
      id="projects"
      className="section bg-bg-2 border-y border-border"
    >
      <div className="container-page">
        <SectionHeading
          number="02"
          label="Projects"
          title="Saroj Residency — Plots for Sale in Etmadpur Agra"
          emWord="Etmadpur Agra"
          subtitle="Two flagship projects in active sale. Every plot personally walked by Raju ji."
        />

        <div className="space-y-24 md:space-y-32 mt-16">
          {PROJECTS.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              reversed={i % 2 === 1}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
