"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EARTHS, type Earth } from "@/lib/data/earths";
import Globe from "@/components/multiverse/Globe";
import SpaceBackground from "@/components/multiverse/SpaceBackground";

export default function MultiversePage() {
  const [expanded, setExpanded] = useState<Earth | null>(null);

  return (
    <div className="page">
      <SpaceBackground />
      <div className="page-head">
        <p className="eyebrow">Six Earths. One Collision Course.</p>
        <h1 className="display">Multiverse Explorer</h1>
        <p>
          Drag a world to spin it. Click to step inside. Every pin marks a hero
          Doom has already accounted for.
        </p>
      </div>

      <div className="earth-grid">
        {EARTHS.map((earth) => (
          <button
            key={earth.id}
            className="earth-cell plate"
            onClick={() => setExpanded(earth)}
            aria-label={`Open ${earth.name}`}
          >
            <div className="earth-canvas-wrap">
              <Canvas camera={{ position: [0, 0, 2.6], fov: 40 }} dpr={[1, 1.5]}>
                <Globe earth={earth} />
              </Canvas>
            </div>
            <p className="earth-name display">{earth.name}</p>
            <p className="earth-label mono">{earth.label}</p>
          </button>
        ))}
      </div>

      {expanded && (
        <div className="earth-modal" role="dialog" aria-modal="true">
          <div className="earth-modal-inner plate">
            <button className="earth-modal-close btn btn-ghost" onClick={() => setExpanded(null)}>
              Close
            </button>
            <div className="earth-modal-canvas">
              <Canvas camera={{ position: [0, 0, 2.6], fov: 42 }} dpr={[1, 2]}>
                <Globe earth={expanded} interactive />
              </Canvas>
            </div>
            <div className="earth-modal-info">
              <p className="eyebrow">{expanded.label}</p>
              <h2 className="display">{expanded.name}</h2>
              <p className="earth-desc">{expanded.description}</p>
              <p className="mono earth-pin">Signature location: {expanded.signaturePin}</p>
              <p className="mono earth-hint">Hover a glowing marker to identify a hero.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .earth-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 860px) {
          .earth-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .earth-grid { grid-template-columns: 1fr; }
        }
        .earth-cell {
          padding: 1rem;
          cursor: pointer;
          background: linear-gradient(155deg, var(--gunmetal) 0%, var(--gunmetal-deep) 100%);
          border: 1px solid var(--gunmetal-light);
        }
        .earth-cell:hover {
          border-color: var(--copper);
        }
        .earth-canvas-wrap {
          height: 180px;
          touch-action: none;
        }
        .earth-name {
          font-size: 1rem;
          margin: 0.5rem 0 0.1rem;
        }
        .earth-label {
          font-size: 0.65rem;
          color: var(--text-dim);
          margin: 0;
        }
        .earth-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(5, 7, 8, 0.88);
          display: grid;
          place-items: center;
          padding: 1.5rem;
        }
        .earth-modal-inner {
          width: min(880px, 100%);
          padding: 1.5rem;
          position: relative;
        }
        .earth-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 2;
        }
        .earth-modal-canvas {
          height: 400px;
          touch-action: none;
        }
        .earth-modal-info {
          margin-top: 1rem;
        }
        .earth-desc {
          color: var(--text-muted);
          max-width: 60ch;
        }
        .earth-pin {
          color: var(--copper-bright);
          font-size: 0.8rem;
        }
        .earth-hint {
          color: var(--text-dim);
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
}
