export function TireLogo({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>
      {/* tire outer */}
      <circle cx="50" cy="50" r="48" fill="url(#tireGrad)" stroke="#1a1a1a" strokeWidth="1" />
      {/* tread marks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <rect
            key={i}
            x="48"
            y="2"
            width="4"
            height="8"
            fill="#3a3a3a"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      {/* rim */}
      <circle cx="50" cy="50" r="30" fill="#1a1a1a" stroke="#e63946" strokeWidth="1.5" />
      {/* spokes */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 360) / 5;
        return (
          <rect
            key={i}
            x="48.5"
            y="22"
            width="3"
            height="28"
            fill="#e63946"
            transform={`rotate(${angle} 50 50)`}
            rx="1"
          />
        );
      })}
      {/* center hub */}
      <circle cx="50" cy="50" r="6" fill="#e63946" />
      <circle cx="50" cy="50" r="2" fill="#0a0a0a" />
    </svg>
  );
}
