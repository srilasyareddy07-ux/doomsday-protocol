export default function SpaceBackground() {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    left: seededRandom(i * 3.1) * 100,
    top: seededRandom(i * 7.7) * 100,
    size: 1 + seededRandom(i * 1.3) * 2,
    delay: seededRandom(i * 5.5) * 4,
  }));

  return (
    <div className="space-bg" aria-hidden="true">
      <div className="nebula" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <div className="asteroid asteroid-1" />
      <div className="asteroid asteroid-2" />
      <div className="asteroid asteroid-3" />

      <svg className="rocket rocket-1" viewBox="0 0 40 40" width="26" height="26">
        <path d="M20 2 L27 22 L20 18 L13 22 Z" fill="var(--copper-bright)" opacity="0.5" />
      </svg>
      <svg className="rocket rocket-2" viewBox="0 0 40 40" width="18" height="18">
        <path d="M20 2 L27 22 L20 18 L13 22 Z" fill="var(--green-glow)" opacity="0.4" />
      </svg>

      <style>{`
        .space-bg {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: -1;
          background: radial-gradient(ellipse at 50% 20%, #0d1614 0%, var(--black) 65%);
        }
        .nebula {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 20% 30%, rgba(63, 174, 106, 0.08), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(138, 90, 46, 0.08), transparent 45%);
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: var(--text-primary);
          opacity: 0.5;
          animation: twinkle 3.5s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.85; }
        }
        .asteroid {
          position: absolute;
          background: var(--gunmetal-light);
          border-radius: 40% 60% 55% 45%;
          opacity: 0.4;
        }
        .asteroid-1 { width: 14px; height: 10px; top: 15%; left: -5%; animation: drift 60s linear infinite; }
        .asteroid-2 { width: 8px; height: 8px; top: 55%; left: -5%; animation: drift 90s linear infinite; animation-delay: -20s; }
        .asteroid-3 { width: 20px; height: 14px; top: 80%; left: -5%; animation: drift 120s linear infinite; animation-delay: -50s; }
        @keyframes drift {
          from { transform: translateX(0) translateY(0); }
          to { transform: translateX(115vw) translateY(-40px); }
        }
        .rocket {
          position: absolute;
        }
        .rocket-1 { top: 20%; left: -5%; animation: rocket-path 45s linear infinite; }
        .rocket-2 { top: 70%; left: -5%; animation: rocket-path 65s linear infinite; animation-delay: -15s; }
        @keyframes rocket-path {
          from { transform: translate(0, 0) rotate(20deg); }
          to { transform: translate(120vw, -60px) rotate(20deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .star, .asteroid, .rocket { animation: none; }
        }
      `}</style>
    </div>
  );
}

// Deterministic pseudo-random so star positions don't shift between server/client render.
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
