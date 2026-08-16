"use client";

import { useEffect, useMemo, useState } from "react";
import { CHECKLIST_SECTIONS, CHECKLIST_ITEMS } from "@/lib/data/checklist-items";
import ProgressMeter from "@/components/ProgressMeter";
import ShareCard from "@/components/ShareCard";

function readinessFor(percent: number): string {
  if (percent >= 100) return "Doom-Ready";
  if (percent >= 75) return "Battle-Ready";
  if (percent >= 50) return "Operative";
  if (percent >= 25) return "Initiate";
  if (percent > 0) return "Recruit";
  return "Not Ready";
}

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    fetch("/api/checklist")
      .then((res) => res.json())
      .then((data) => {
        setChecked(new Set(data.checked ?? []));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const total = CHECKLIST_ITEMS.length;
  const watched = checked.size;
  const percent = total > 0 ? Math.round((watched / total) * 100) : 0;
  const readiness = useMemo(() => readinessFor(percent), [percent]);

  function persist(next: Set<string>) {
    fetch("/api/checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: Array.from(next) }),
    }).catch(() => {});
  }

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persist(next);
      return next;
    });
  }

  function markSection(sectionItemIds: string[], allWatched: boolean) {
    setChecked((prev) => {
      const next = new Set(prev);
      sectionItemIds.forEach((id) => {
        if (allWatched) next.delete(id);
        else next.add(id);
      });
      persist(next);
      return next;
    });
  }

  return (
    <div className="page">
      <div className="page-head">
        <p className="eyebrow">Preparation Log</p>
        <h1 className="display">The Ultimate Doomsday Checklist</h1>
        <p>
          Every film and series standing between you and December&nbsp;18. Doom
          expects you arrive prepared. He does not repeat himself.
        </p>
      </div>

      <section className="status-panel plate">
        <div className="status-row">
          <span className="status-count mono">
            {loaded ? watched : "…"} / {total} watched
          </span>
          <span className="status-percent display glow-text">{percent}%</span>
        </div>
        <ProgressMeter percent={percent} />
        <div className="status-row status-row-bottom">
          <span className="status-readiness display">{readiness}</span>
          <button className="btn btn-copper" onClick={() => setShowShare((v) => !v)}>
            {showShare ? "Hide" : "Generate"} Status Report
          </button>
        </div>
      </section>

      {showShare && (
        <ShareCard watched={watched} total={total} percent={percent} readiness={readiness} />
      )}

      <hr className="hairline" />

      {CHECKLIST_SECTIONS.map((section) => {
        const sectionIds = section.items.map((i) => i.id);
        const sectionWatched = sectionIds.filter((id) => checked.has(id)).length;
        const allWatched = sectionWatched === sectionIds.length;

        return (
          <section key={section.id} className="section-block">
            <div className="section-head">
              <h2 className="display">{section.label}</h2>
              <div className="section-head-right">
                <span className="mono section-count">
                  {sectionWatched}/{sectionIds.length}
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => markSection(sectionIds, allWatched)}
                >
                  {allWatched ? "Clear all" : "Mark all watched"}
                </button>
              </div>
            </div>

            <ul className="checklist">
              {section.items.map((item) => {
                const isChecked = checked.has(item.id);
                return (
                  <li key={item.id} className={`checklist-row ${isChecked ? "checklist-row-done" : ""}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item.id)}
                      />
                      <span className="checklist-box" aria-hidden="true" />
                      <span className="checklist-title">{item.title}</span>
                      {item.type === "side-quest" && (
                        <span className="checklist-tag mono">optional</span>
                      )}
                      {item.type === "series" && (
                        <span className="checklist-tag checklist-tag-series mono">series</span>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <style>{`
        .status-panel {
          padding: 1.5rem;
        }
        .status-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .status-count {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .status-percent {
          font-size: 1.8rem;
        }
        .status-row-bottom {
          margin-top: 1rem;
          margin-bottom: 0;
          align-items: center;
        }
        .status-readiness {
          font-size: 1.1rem;
          color: var(--copper-bright);
        }
        .section-block {
          margin: 2.5rem 0;
        }
        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          border-bottom: 1px solid var(--gunmetal-light);
          padding-bottom: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .section-head h2 {
          font-size: 1.15rem;
          margin: 0;
        }
        .section-head-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .section-count {
          color: var(--text-dim);
          font-size: 0.8rem;
        }
        .btn-sm {
          padding: 0.4rem 0.8rem;
          font-size: 0.7rem;
        }
        .checklist {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.4rem;
        }
        .checklist-row label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .checklist-row label:hover {
          border-color: var(--gunmetal-light);
          background: rgba(255, 255, 255, 0.02);
        }
        .checklist-row input {
          position: absolute;
          opacity: 0;
          width: 1px;
          height: 1px;
        }
        .checklist-box {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          border: 1px solid var(--gunmetal-light);
          background: var(--gunmetal-deep);
          position: relative;
        }
        .checklist-row-done .checklist-box {
          background: var(--green-mid);
          border-color: var(--green-bright);
        }
        .checklist-row-done .checklist-box::after {
          content: "";
          position: absolute;
          left: 4px;
          top: 1px;
          width: 5px;
          height: 10px;
          border-right: 2px solid var(--green-glow);
          border-bottom: 2px solid var(--green-glow);
          transform: rotate(40deg);
        }
        .checklist-title {
          flex: 1;
          font-size: 0.95rem;
        }
        .checklist-row-done .checklist-title {
          text-decoration: line-through;
          color: var(--text-dim);
        }
        .checklist-tag {
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dim);
          border: 1px solid var(--gunmetal-light);
          padding: 0.15rem 0.4rem;
        }
        .checklist-tag-series {
          color: var(--copper-bright);
          border-color: var(--bronze);
        }
      `}</style>
    </div>
  );
}
