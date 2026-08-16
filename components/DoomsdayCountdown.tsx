"use client";

import { useEffect, useState } from "react";

// Avengers: Doomsday — official US theatrical release: Friday, December 18, 2026.
// Verified against Marvel/Disney and Metacritic listings, incl. official
// tagline "12.18.26 IS DOOMSDAY". No single nationwide showtime exists (it
// varies by theater), so the countdown targets 12:00 AM local time on
// release day — the first possible moment Doomsday is "in theaters."
const RELEASE_ISO = "2026-12-18T00:00:00";

function getRemaining() {
  const target = new Date(RELEASE_ISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { diff, days, hours, minutes, seconds };
}

export default function DoomsdayCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const arrived = remaining && remaining.diff <= 0;

  return (
    <footer className="doomsday-footer">
      <div className="doomsday-inner">
        <p className="eyebrow">The date is fixed. The outcome is not.</p>

        <h2 className="display doomsday-title">
          {arrived ? (
            <>DOOMSDAY <span className="glow-text">HAS ARRIVED</span></>
          ) : (
            <>AVENGERS: <span className="glow-text">DOOMSDAY</span></>
          )}
        </h2>

        <p className="doomsday-date mono">
          Friday, December&nbsp;18,&nbsp;2026 &middot; 12:00&nbsp;AM &middot; In theaters nationwide
        </p>

        <p className="doomsday-tagline">&ldquo;12.18.26 is Doomsday.&rdquo;</p>

        {!arrived && (
          <div className="countdown" aria-live="polite">
            <CountdownUnit value={remaining?.days} label="Days" />
            <span className="countdown-sep">:</span>
            <CountdownUnit value={remaining?.hours} label="Hrs" />
            <span className="countdown-sep">:</span>
            <CountdownUnit value={remaining?.minutes} label="Min" />
            <span className="countdown-sep">:</span>
            <CountdownUnit value={remaining?.seconds} label="Sec" />
          </div>
        )}

        <p className="doomsday-sub">
          Every hero. Every Earth. One collision course. Doom does not ask twice.
        </p>
      </div>

      <style>{`
        .doomsday-footer {
          margin-top: 4rem;
          padding: 3.5rem 1.5rem 3rem;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(63, 174, 106, 0.16), transparent 60%),
            linear-gradient(180deg, var(--gunmetal-deep), var(--black) 80%);
          border-top: 1px solid var(--copper);
          text-align: center;
        }
        .doomsday-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .doomsday-title {
          font-size: clamp(1.8rem, 5vw, 3rem);
          margin: 0.5rem 0 0.75rem;
        }
        .doomsday-date {
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin: 0 0 0.4rem;
        }
        .doomsday-tagline {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.1rem;
          color: var(--copper-bright);
          margin: 0 0 2rem;
        }
        .countdown {
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .countdown-sep {
          font-family: var(--font-mono);
          font-size: 1.6rem;
          color: var(--gunmetal-light);
          transform: translateY(-6px);
        }
        .doomsday-sub {
          color: var(--text-dim);
          font-size: 0.85rem;
          max-width: 44ch;
          margin: 0 auto;
        }
      `}</style>
    </footer>
  );
}

function CountdownUnit({ value, label }: { value?: number; label: string }) {
  return (
    <div className="unit plate plate-sm">
      <span className="unit-value mono glow-text">
        {value !== undefined ? String(value).padStart(2, "0") : "--"}
      </span>
      <span className="unit-label eyebrow">{label}</span>
      <style>{`
        .unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.6rem 0.9rem;
          min-width: 64px;
        }
        .unit-value {
          font-size: clamp(1.4rem, 4vw, 2.1rem);
          font-weight: 700;
        }
        .unit-label {
          font-size: 0.6rem;
          margin-top: 0.15rem;
        }
      `}</style>
    </div>
  );
}
