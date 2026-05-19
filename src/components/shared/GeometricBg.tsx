interface Props {
  variant: "hero" | "cubes" | "grid" | "shapes" | "buildings";
}

function FloatingShape({
  style,
  shape,
  className = "",
}: {
  style: React.CSSProperties;
  shape: "triangle" | "hexagon" | "diamond";
  className?: string;
}) {
  const polys: Record<typeof shape, string> = {
    triangle: "50,5 95,90 5,90",
    hexagon: "25,5 75,5 95,50 75,95 25,95 5,50",
    diamond: "50,5 95,50 50,95 5,50",
  };
  return (
    <svg
      viewBox="0 0 100 100"
      className={`absolute ${className}`}
      style={{ opacity: 0.08, ...style }}
      aria-hidden
    >
      <polygon
        points={polys[shape]}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
      />
    </svg>
  );
}

function IsoCube({ style }: { style: React.CSSProperties }) {
  return (
    <div className="iso-cube float-up" style={style} aria-hidden>
      <div className="face-top" />
      <div className="face-left" />
      <div className="face-right" />
    </div>
  );
}

function PerspectiveGrid() {
  return (
    <div
      aria-hidden
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{
        height: 280,
        perspective: "600px",
        opacity: 0.06,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "rotateX(60deg)",
          transformOrigin: "center bottom",
          backgroundImage:
            "linear-gradient(to right, var(--gold) 1px, transparent 1px), linear-gradient(to bottom, var(--gold) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

function BuildingSilhouette() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
      style={{ height: 80, opacity: 0.15 }}
    >
      <g fill="var(--text)">
        {/* Buildings — varied heights */}
        <rect x="0" y="40" width="60" height="40" />
        <rect x="65" y="20" width="50" height="60" />
        <rect x="120" y="50" width="40" height="30" />
        <rect x="165" y="30" width="70" height="50" />
        <rect x="240" y="10" width="60" height="70" />
        <rect x="305" y="35" width="50" height="45" />
        <rect x="360" y="25" width="80" height="55" />
        <rect x="445" y="45" width="50" height="35" />
        <rect x="500" y="15" width="60" height="65" />
        <rect x="565" y="40" width="40" height="40" />
        <rect x="610" y="25" width="70" height="55" />
        <rect x="685" y="35" width="50" height="45" />
        <rect x="740" y="5" width="60" height="75" />
        <rect x="805" y="40" width="55" height="40" />
        <rect x="865" y="20" width="50" height="60" />
        <rect x="920" y="35" width="60" height="45" />
        <rect x="985" y="25" width="50" height="55" />
        <rect x="1040" y="50" width="40" height="30" />
        <rect x="1085" y="15" width="70" height="65" />
        <rect x="1160" y="35" width="50" height="45" />
        <rect x="1215" y="25" width="60" height="55" />
        <rect x="1280" y="40" width="50" height="40" />
        <rect x="1335" y="20" width="60" height="60" />
        <rect x="1400" y="45" width="40" height="35" />
      </g>
      {/* Window dots */}
      <g fill="var(--gold)" opacity="0.6">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 20 + i * 47;
          const y = 50 + ((i * 7) % 18);
          return <rect key={i} x={x} y={y} width="2" height="2" />;
        })}
      </g>
    </svg>
  );
}

export default function GeometricBg({ variant }: Props) {
  if (variant === "hero") {
    return (
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <PerspectiveGrid />
        <FloatingShape
          shape="hexagon"
          style={{ width: 120, height: 120, top: "20%", left: "5%" }}
          className="spin-slow"
        />
        <FloatingShape
          shape="triangle"
          style={{ width: 80, height: 80, top: "12%", right: "10%" }}
          className="spin-med"
        />
        <FloatingShape
          shape="diamond"
          style={{ width: 60, height: 60, top: "60%", right: "20%" }}
          className="spin-rev"
        />
        <IsoCube style={{ top: "30%", right: "8%" }} />
        <BuildingSilhouette />
      </div>
    );
  }

  if (variant === "cubes") {
    return (
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <IsoCube style={{ top: "10%", right: "5%" }} />
        <IsoCube
          style={{ top: "60%", left: "8%", width: 60, height: 60 }}
        />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <PerspectiveGrid />
      </div>
    );
  }

  if (variant === "shapes") {
    return (
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <FloatingShape
          shape="hexagon"
          style={{ width: 100, height: 100, top: "10%", left: "8%" }}
          className="spin-slow"
        />
        <FloatingShape
          shape="hexagon"
          style={{ width: 70, height: 70, bottom: "15%", right: "12%" }}
          className="spin-rev"
        />
        <FloatingShape
          shape="triangle"
          style={{ width: 50, height: 50, top: "55%", left: "20%" }}
          className="spin-med"
        />
      </div>
    );
  }

  if (variant === "buildings") {
    return (
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <BuildingSilhouette />
      </div>
    );
  }

  return null;
}
