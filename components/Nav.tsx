"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Checklist" },
  { href: "/multiverse", label: "Multiverse" },
  { href: "/deathpool", label: "Death Pool" },
  { href: "/doom-chat", label: "Doom's Interrogation" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <Link href="/" className="nav-brand">
        <span className="nav-brand-mark">D</span>
        <span className="nav-brand-text">
          DOOMSDAY<span className="glow-text">PROTOCOL</span>
        </span>
      </Link>
      <nav className="nav-links">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${active ? "nav-link-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 0.9rem 1.5rem;
          background: rgba(7, 9, 10, 0.92);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid var(--gunmetal-light);
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }
        .nav-brand-mark {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          background: linear-gradient(155deg, var(--green-mid), var(--green-deep));
          border: 1px solid var(--copper);
          clip-path: polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px);
          font-family: var(--font-display);
          font-weight: 800;
          color: var(--copper-bright);
        }
        .nav-brand-text {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: 0.06em;
          font-size: 0.95rem;
        }
        .nav-links {
          display: flex;
          gap: 0.25rem;
          flex-wrap: wrap;
        }
        .nav-link {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0.5rem 0.75rem;
          border: 1px solid transparent;
        }
        .nav-link:hover {
          color: var(--copper-bright);
        }
        .nav-link-active {
          color: var(--green-glow);
          border-bottom: 2px solid var(--green-bright);
        }
        @media (max-width: 640px) {
          .nav {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </header>
  );
}
