interface LotusLogoProps {
  size?: number;
  className?: string;
}

export default function LotusLogo({ size = 36, className = "" }: LotusLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="11"
          rx="4.2"
          ry="9"
          fill="none"
          stroke="#c9a227"
          strokeWidth="1.1"
          transform={`rotate(${deg} 20 20)`}
          opacity={deg % 120 === 0 ? 1 : 0.7}
        />
      ))}
      <circle cx="20" cy="20" r="3.2" fill="#1a5f2a" />
      <circle cx="20" cy="20" r="1.2" fill="#c9a227" />
    </svg>
  );
}
