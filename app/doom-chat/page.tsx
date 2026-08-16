"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function DoomChatPage() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typingText, setTypingText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/doom-chat")
      .then((res) => res.json())
      .then((data) => setHistory(data.history ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, typingText]);

  async function send() {
    const message = input.trim();
    if (!message || sending) return;

    setError(null);
    setInput("");
    setSending(true);
    setHistory((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await fetch("/api/doom-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Doom refuses to answer.");
        setSending(false);
        return;
      }

      await typeOut(data.reply);
      setHistory((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setTypingText(null);
    } catch {
      setError("The connection to Latveria failed.");
    } finally {
      setSending(false);
    }
  }

  function typeOut(text: string): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      setTypingText("");
      const id = setInterval(() => {
        i++;
        setTypingText(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          resolve();
        }
      }, 18);
    });
  }

  return (
    <div className="page doom-chat-page">
      <div className="page-head">
        <p className="eyebrow">Throne Room Transmission</p>
        <h1 className="display">Doom&rsquo;s Interrogation</h1>
        <p>You have been summoned. Speak, and Doom will decide if you are worth answering.</p>
      </div>

      <div className="terminal plate">
        <div className="terminal-bar mono">
          <span>LATVERIA://interrogation</span>
          <span className="terminal-dot" />
        </div>

        <div className="terminal-body" ref={scrollRef}>
          {history.length === 0 && !typingText && (
            <p className="terminal-line assistant">
              <span className="speaker">DOOM:</span> You stand before Doom. Ask your question — if it
              is worthy of an answer, you shall have one.
            </p>
          )}
          {history.map((m, i) => (
            <p key={i} className={`terminal-line ${m.role}`}>
              <span className="speaker">{m.role === "user" ? "YOU:" : "DOOM:"}</span> {m.content}
            </p>
          ))}
          {typingText !== null && (
            <p className="terminal-line assistant">
              <span className="speaker">DOOM:</span> {typingText}
              <span className="cursor">▍</span>
            </p>
          )}
          {sending && typingText === null && (
            <p className="terminal-line assistant dim">
              <span className="speaker">DOOM:</span> <span className="cursor">▍</span>
            </p>
          )}
        </div>

        {error && <p className="terminal-error mono">{error}</p>}

        <div className="terminal-input-row">
          <span className="prompt-caret mono">&gt;</span>
          <input
            className="terminal-input mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Speak to Doom..."
            disabled={sending}
          />
          <button className="btn btn-copper" onClick={send} disabled={sending || !input.trim()}>
            Send
          </button>
        </div>
      </div>

      <style>{`
        .terminal {
          padding: 0;
          overflow: hidden;
          background: linear-gradient(180deg, var(--green-deep), var(--black) 60%);
          border-color: var(--green-mid);
        }
        .terminal-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          background: var(--gunmetal-deep);
          border-bottom: 1px solid var(--gunmetal-light);
          font-size: 0.7rem;
          color: var(--text-dim);
        }
        .terminal-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green-bright);
          box-shadow: 0 0 8px var(--green-bright);
        }
        .terminal-body {
          height: 46vh;
          min-height: 280px;
          overflow-y: auto;
          padding: 1.25rem 1.25rem 0.5rem;
        }
        .terminal-line {
          font-family: var(--font-mono);
          font-size: 0.88rem;
          line-height: 1.6;
          margin: 0 0 1rem;
        }
        .terminal-line.assistant {
          color: var(--green-glow);
        }
        .terminal-line.user {
          color: var(--text-primary);
        }
        .terminal-line.dim {
          opacity: 0.6;
        }
        .speaker {
          font-weight: 700;
          margin-right: 0.4rem;
          letter-spacing: 0.05em;
        }
        .cursor {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .terminal-error {
          color: var(--red-bright);
          font-size: 0.75rem;
          padding: 0 1.25rem 0.5rem;
        }
        .terminal-input-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.25rem;
          border-top: 1px solid var(--gunmetal-light);
          background: var(--gunmetal-deep);
        }
        .prompt-caret {
          color: var(--green-bright);
        }
        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
