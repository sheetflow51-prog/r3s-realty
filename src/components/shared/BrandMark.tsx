/* ─────────────────────────────────────────────
   R³S Realty Developers — Brand Mark
   Custom-built vector logo (no raster, scales perfectly)
   Composition:
     - Geometric "R³" monogram inside a beveled
       architectural shield (suggesting plot/land + structure)
     - Subtle 6-petal lotus echo behind the mark
     - Gold + Green palette resolved through CSS vars
   ───────────────────────────────────────────── */

interface BrandMarkProps {
  size?: number;
  variant?: "mark" | "lockup-h" | "lockup-stack";
  tone?: "auto" | "dark" | "light";
  className?: string;
  title?: string;
}

export default function BrandMark({
  size = 48,
  variant = "mark",
  tone = "auto",
  className = "",
  title = "R³S Realty Developers",
}: BrandMarkProps) {
  // Allow callers to use --gold / --text / --green via CSS vars, but
  // also expose explicit dark/light overrides so the mark looks
  // intentional on every backdrop.
  const palette = (() => {
    if (tone === "dark") {
      return { gold: "#e0c068", goldDeep: "#a07820", text: "#f3ecdc", muted: "#a89977" };
    }
    if (tone === "light") {
      return { gold: "#a07820", goldDeep: "#6b4f13", text: "#1a1510", muted: "#6b6050" };
    }
    return { gold: "var(--gold)", goldDeep: "var(--gold)", text: "var(--text)", muted: "var(--text-muted)" };
  })();

  // ─── Just the mark (square, 64×64 viewBox) ───
  const mark = (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      style={{ display: "block" }}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="r3s-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.gold} stopOpacity="0.95" />
          <stop offset="100%" stopColor={palette.goldDeep} stopOpacity="1" />
        </linearGradient>
        <linearGradient id="r3s-shield-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.gold} />
          <stop offset="100%" stopColor={palette.goldDeep} />
        </linearGradient>
      </defs>

      {/* Outer architectural shield — beveled hex with rounded shoulders.
          Suggests a property boundary / parcel + structural stability. */}
      <path
        d="M32 3 L57 12 L57 38 C57 50 45 58 32 61 C19 58 7 50 7 38 L7 12 Z"
        fill="none"
        stroke="url(#r3s-shield-line)"
        strokeWidth="1.6"
      />
      {/* Inner shield — thin double frame for luxury weight */}
      <path
        d="M32 7 L53 14.5 L53 37 C53 47 43 54 32 57 C21 54 11 47 11 37 L11 14.5 Z"
        fill="none"
        stroke="url(#r3s-shield-line)"
        strokeWidth="0.6"
        opacity="0.55"
      />

      {/* Lotus echo (very faint, 6 petals) — heritage cue */}
      <g opacity="0.18" transform="translate(32 33)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-9"
            rx="3.2"
            ry="10"
            fill="none"
            stroke={palette.gold}
            strokeWidth="0.7"
            transform={`rotate(${a})`}
          />
        ))}
      </g>

      {/* "R" — geometric, modernist serif silhouette */}
      <g fill="url(#r3s-shield)">
        {/* Stem */}
        <rect x="22.5" y="20" width="3.6" height="24" />
        {/* Bowl */}
        <path d="M26.1 20 L34.5 20 C39 20 41.6 22.6 41.6 26.3 C41.6 29.6 39.4 31.9 36 32.5 L41.8 44 L37.4 44 L32.4 33 L26.1 33 Z M26.1 23.4 L26.1 29.6 L34.2 29.6 C36.2 29.6 37.9 28.4 37.9 26.5 C37.9 24.6 36.2 23.4 34.2 23.4 Z" />
      </g>

      {/* Superscript ³ — small numeric, very tight kerning */}
      <text
        x="44.2"
        y="24"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="9"
        fontWeight="600"
        fill={palette.gold}
        letterSpacing="-0.02em"
      >
        3
      </text>

      {/* Baseline rule — tiny ground line under monogram */}
      <line x1="22.5" y1="47" x2="42" y2="47" stroke={palette.gold} strokeWidth="0.6" opacity="0.4" />
    </svg>
  );

  if (variant === "mark") return mark;

  // ─── Horizontal lockup (mark + wordmark on one line) ───
  if (variant === "lockup-h") {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        {mark}
        <span style={{ lineHeight: 1 }}>
          <span
            style={{
              display: "block",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: size * 0.5,
              fontWeight: 500,
              letterSpacing: "0.005em",
              color: palette.text,
            }}
          >
            R³S Realty
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: size * 0.18,
              fontWeight: 600,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: palette.gold,
              marginTop: 2,
            }}
          >
            Developers
          </span>
        </span>
      </span>
    );
  }

  // ─── Stacked lockup (mark on top, name below) ───
  return (
    <span className={`inline-flex flex-col items-center gap-2 ${className}`}>
      {mark}
      <span style={{ textAlign: "center", lineHeight: 1.1 }}>
        <span
          style={{
            display: "block",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: size * 0.4,
            fontWeight: 500,
            color: palette.text,
          }}
        >
          R³S Realty
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: size * 0.16,
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: palette.gold,
            marginTop: 4,
          }}
        >
          Developers
        </span>
      </span>
    </span>
  );
}
