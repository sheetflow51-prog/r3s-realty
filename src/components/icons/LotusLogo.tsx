/* ─────────────────────────────────────────────
   R³S Realty Developers — LotusLogo
   Hand-coded 7-petal lotus rising from gold water.
   Used in navbar, footer, loading screen and favicon.
   ───────────────────────────────────────────── */

interface LotusLogoProps {
  height?: number;
  darkMode?: boolean;
  showText?: boolean;
  animatePetals?: boolean;
  className?: string;
  title?: string;
}

/** Petal positions: (cx, cy, rotation in degrees) */
const PETALS: { cx: number; cy: number; rot: number; key: string }[] = [
  { key: "outer-left",   cx: 50,  cy: 128, rot: -52 },
  { key: "middle-left",  cx: 65,  cy: 118, rot: -35 },
  { key: "inner-left",   cx: 82,  cy: 110, rot: -18 },
  { key: "center",       cx: 100, cy: 105, rot: 0   },
  { key: "inner-right",  cx: 118, cy: 110, rot: 18  },
  { key: "middle-right", cx: 135, cy: 118, rot: 35  },
  { key: "outer-right",  cx: 150, cy: 128, rot: 52  },
];

export default function LotusLogo({
  height = 80,
  darkMode = false,
  showText = true,
  animatePetals = false,
  className = "",
  title = "R³S Realty & Developers",
}: LotusLogoProps) {
  const goldColor = "#D4AF37";
  const mutedColor = darkMode ? "#7a7060" : "#6b6055";

  // Aspect ratio: 200 wide / 220 tall (full with text) or 200/180 without text
  const vbHeight = showText ? 220 : 180;
  const width = (200 / vbHeight) * height;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 200 ${vbHeight}`}
      width={width}
      height={height}
      role="img"
      aria-label={title}
      className={`lotus-logo ${className}`}
      style={{ display: "block", overflow: "visible" }}
    >
      <title>{title}</title>

      {/* WATER BASE — gold ellipse + 3 ripple lines */}
      <ellipse
        cx="100"
        cy="185"
        rx="55"
        ry="8"
        fill="none"
        stroke={goldColor}
        strokeWidth="1"
        opacity="0.4"
      />
      <line x1="85"  y1="173" x2="115" y2="173" stroke={goldColor} strokeWidth="0.8" opacity="0.3" />
      <line x1="75"  y1="179" x2="125" y2="179" stroke={goldColor} strokeWidth="0.8" opacity="0.3" />
      <line x1="85"  y1="191" x2="115" y2="191" stroke={goldColor} strokeWidth="0.8" opacity="0.3" />

      {/* STEM */}
      <line
        x1="100"
        y1="183"
        x2="100"
        y2="130"
        stroke={goldColor}
        strokeWidth="1.5"
      />

      {/* 7 PETALS — symmetric around centre x=100 */}
      <g className="lotus-petals">
        {PETALS.map((p, i) => (
          <ellipse
            key={p.key}
            className={`lotus-petal lotus-petal-${i}`}
            cx={p.cx}
            cy={p.cy}
            rx="9"
            ry="32"
            fill="none"
            stroke={goldColor}
            strokeWidth="1.2"
            transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
            style={
              animatePetals
                ? {
                    transformOrigin: `${p.cx}px ${p.cy + 25}px`,
                    animation: `lotusBloom 0.9s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.1}s both`,
                    opacity: 0,
                  }
                : undefined
            }
          />
        ))}
      </g>

      {/* CENTRE — gold dot + 8 stamens around at radius 10 */}
      <circle cx="100" cy="100" r="4" fill={goldColor} opacity="0.9" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const sx = 100 + Math.cos(angle) * 10;
        const sy = 100 + Math.sin(angle) * 10;
        return <circle key={`stamen-${i}`} cx={sx} cy={sy} r="1.5" fill={goldColor} opacity="0.85" />;
      })}

      {/* TEXT BELOW LOTUS */}
      {showText && (
        <>
          <text
            x="100"
            y="205"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="28"
            fontWeight={400}
            fill={goldColor}
          >
            R³S
          </text>
          <text
            x="100"
            y="218"
            textAnchor="middle"
            fontFamily="'DM Sans', system-ui, sans-serif"
            fontSize="9"
            fontWeight={300}
            fill={mutedColor}
            letterSpacing="0.2em"
          >
            REALTY &amp; DEVELOPERS
          </text>
        </>
      )}

      <style>{`
        @keyframes lotusBloom {
          0%   { opacity: 0; transform: translateY(8px) scale(0.6); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lotus-petal { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </svg>
  );
}
