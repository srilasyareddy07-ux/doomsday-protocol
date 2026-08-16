export default function ProgressMeter({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="meter">
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${clamped}%` }} />
      </div>
      <style>{`
        .meter {
          width: 100%;
        }
        .meter-track {
          position: relative;
          height: 22px;
          background: var(--gunmetal-deep);
          border: 1px solid var(--gunmetal-light);
          overflow: hidden;
          clip-path: polygon(8px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 8px);
        }
        .meter-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--green-deep), var(--green-bright) 70%, var(--green-glow));
          box-shadow: 0 0 14px rgba(82, 224, 140, 0.5);
          transition: width 0.4s ease;
          position: relative;
        }
        .meter-fill::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, 0.18) 35%,
            transparent 50%
          );
          background-size: 220% 100%;
          animation: sheen 3.2s linear infinite;
        }
        @keyframes sheen {
          from { background-position: 120% 0; }
          to { background-position: -20% 0; }
        }
      `}</style>
    </div>
  );
}
