"use client";

import { useEffect, useState } from "react";
import { CHARACTERS } from "@/lib/data/characters";

type Pick = "dies" | "survives";
type PickMap = Record<string, Pick>;
type VoteMap = Record<string, { dies: number; survives: number }>;

export default function DeathPoolPage() {
  const [picks, setPicks] = useState<PickMap>({});
  const [votes, setVotes] = useState<VoteMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/deathpool")
      .then((res) => res.json())
      .then((data) => {
        setPicks(data.picks ?? {});
        setVotes(data.votes ?? {});
        setSubmitted(Object.keys(data.picks ?? {}).length > 0);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  function select(characterId: string, pick: Pick) {
    setPicks((prev) => ({ ...prev, [characterId]: pick }));
  }

  async function submit() {
    setSaving(true);
    try {
      const res = await fetch("/api/deathpool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ picks }),
      });
      const data = await res.json();
      if (data.votes) setVotes(data.votes);
      setSubmitted(true);
    } finally {
      setSaving(false);
    }
  }

  const pickedCount = Object.keys(picks).length;

  return (
    <div className="page">
      <div className="page-head">
        <p className="eyebrow">Doom Knows Who Falls</p>
        <h1 className="display">Death Pool</h1>
        <p>
          Lock in who survives December&nbsp;18 and who doesn&rsquo;t. Predictions stay
          editable until the lights go down in theaters.
        </p>
      </div>

      <div className="deathpool-status plate">
        <span className="mono">
          {loaded ? pickedCount : "…"} / {CHARACTERS.length} predictions locked
        </span>
        <button className="btn btn-copper" onClick={submit} disabled={saving || pickedCount === 0}>
          {saving ? "Locking In…" : submitted ? "Update Predictions" : "Submit Predictions"}
        </button>
      </div>

      {submitted && (
        <p className="accuracy-note mono">
          Your accuracy score unlocks after Avengers: Doomsday releases (Dec&nbsp;18, 2026).
        </p>
      )}

      <div className="character-grid">
        {CHARACTERS.map((c) => {
          const pick = picks[c.id];
          const v = votes[c.id];
          const total = (v?.dies ?? 0) + (v?.survives ?? 0);
          const diesPct = total > 0 ? Math.round(((v?.dies ?? 0) / total) * 100) : null;
          const survivesPct = total > 0 ? Math.round(((v?.survives ?? 0) / total) * 100) : null;

          return (
            <div key={c.id} className="char-card plate">
              <div className="char-icon">{c.initials}</div>
              <p className="char-name">{c.name}</p>
              <p className="char-universe mono">{c.universe}</p>

              <div className="char-buttons">
                <button
                  className={`btn btn-block ${pick === "survives" ? "" : "btn-ghost"}`}
                  onClick={() => select(c.id, "survives")}
                >
                  Survives
                </button>
                <button
                  className={`btn btn-danger btn-block ${pick === "dies" ? "" : "btn-ghost"}`}
                  onClick={() => select(c.id, "dies")}
                >
                  Dies
                </button>
              </div>

              {submitted && diesPct !== null && (
                <p className="char-crowd mono">
                  {diesPct}% think they die &middot; {survivesPct}% think they survive
                </p>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .deathpool-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.5rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        .accuracy-note {
          color: var(--copper-bright);
          font-size: 0.8rem;
          margin: 0 0 2rem;
        }
        .character-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 1rem;
        }
        .char-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .char-icon {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--green-glow);
          background: linear-gradient(155deg, var(--green-mid), var(--green-deep));
          border: 1px solid var(--copper);
          clip-path: polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px);
          margin-bottom: 0.75rem;
        }
        .char-name {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.15rem;
        }
        .char-universe {
          font-size: 0.68rem;
          color: var(--text-dim);
          margin: 0 0 1rem;
        }
        .char-buttons {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }
        .char-buttons .btn {
          font-size: 0.7rem;
          padding: 0.55rem 0.5rem;
        }
        .char-crowd {
          font-size: 0.65rem;
          color: var(--text-muted);
          margin: 0.85rem 0 0;
        }
      `}</style>
    </div>
  );
}
