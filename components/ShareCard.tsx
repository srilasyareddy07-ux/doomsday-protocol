export default function ShareCard({
  watched,
  total,
  percent,
  readiness,
}: {
  watched: number;
  total: number;
  percent: number;
  readiness: string;
}) {
  return (
    <div className="share-card plate plate-green">
      <p className="eyebrow">Doomsday Protocol &middot; Status Report</p>
      <p className="share-percent display glow-text">{percent}%</p>
      <p className="share-readiness display">{readiness}</p>
      <p className="share-count mono">{watched} / {total} watched</p>
      <p className="share-brand mono">doomsdayprotocol.app</p>

      <style>{`
        .share-card {
          padding: 2rem;
          text-align: center;
          max-width: 380px;
          margin: 1.5rem auto 0;
        }
        .share-percent {
          font-size: 3.2rem;
          margin: 0.75rem 0 0.1rem;
        }
        .share-readiness {
          font-size: 1.3rem;
          margin: 0 0 1rem;
          color: var(--copper-bright);
        }
        .share-count {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin: 0 0 1.25rem;
        }
        .share-brand {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-dim);
          text-transform: uppercase;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
