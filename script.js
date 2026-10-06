* {
  box-sizing: border-box;
}

:root {
  --bg-1: #0f172a;
  --bg-2: #111827;
  --panel: rgba(15, 23, 42, 0.84);
  --panel-light: #1f2937;
  --primary: #7c3aed;
  --primary-2: #a78bfa;
  --accent: #22c55e;
  --danger: #ef4444;
  --warning: #f59e0b;
  --text: #e5e7eb;
  --muted: #cbd5e1;
  --shadow: rgba(15, 23, 42, 0.38);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top, rgba(124, 58, 237, 0.35), transparent 25%),
    linear-gradient(135deg, var(--bg-1), var(--bg-2));
  color: var(--text);
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
}

.page-shell {
  width: min(1300px, 100%);
  min-height: 700px;
  background: rgba(15, 23, 42, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 26px;
  backdrop-filter: blur(8px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.28);
  overflow: hidden;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  background: rgba(17, 24, 39, 0.65);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-badge {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.35);
}

.eyebrow {
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--muted);
}

h1 {
  margin: 0.2rem 0 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
}

.score-panel {
  min-width: 120px;
  text-align: center;
  padding: 0.8rem 1.1rem;
  border-radius: 14px;
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(167, 139, 250, 0.3);
}

.score-panel span {
  display: block;
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .1em;
}

.score-panel strong {
  display: block;
  font-size: 2rem;
  color: #f5f3ff;
}

.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(260px, 0.75fr);
  gap: 1.4rem;
  padding: 1.8rem;
}

.board {
  display: grid;
  grid-template-columns: minmax(200px, 0.8fr) minmax(0, 1.2fr);
  gap: 1.2rem;
  background: rgba(17, 24, 39, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 1.2rem;
}

.gallows-wrap {
  display: grid;
  place-items: center;
  min-height: 280px;
  background: linear-gradient(180deg, rgba(31, 41, 55, 0.9), rgba(15, 23, 42, 0.9));
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.gallows {
  width: min(100%, 240px);
  height: auto;

  .gallows-structure line {
    stroke: #d1d5db;
    stroke-width: 8;
    stroke-linecap: round;
  }
}

.hangman-parts .part {
  stroke: var(--warning);
  stroke-width: 7;
  stroke-linecap: round;
  fill: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.hangman-parts.visible .part {
  opacity: 1;
}

.game-panel {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.clue-box,
.card {
  background: rgba(31, 41, 55, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  padding: 1rem 1.1rem;
}

.label {
  display: inline-block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--muted);
}

#clueText {
  margin: 0.75rem 0 0;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 700;
  color: #f8fafc;
}

.word-box {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 1.1rem;
}

.word-display {
  margin: 0;
  letter-spacing: 0.5rem;
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 800;
  color: #f8fafc;
  text-transform: uppercase;
  word-break: break-word;
}

.input-row {
  display: flex;
  gap: 0.8rem;
}

input {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.9);
  color: var(--text);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: rgba(124, 58, 237, 0.8);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

button {
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: white;
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.28);
}

.secondary-btn {
  background: rgba(148, 163, 184, 0.12);
  color: var(--text);
  border: 1px solid rgba(148, 163, 184, 0.22);
}

.feedback-area {
  position: relative;
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 0.8rem;
}

#statusMessage {
  margin: 0;
  font-size: 1.05rem;
  color: var(--muted);
  text-align: center;
}

.message-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.72);
  border-radius: 16px;
  backdrop-filter: blur(2px);
}

.message-overlay.hidden {
  display: none;
}

.overlay-card {
  text-align: center;
  padding: 1rem;
}

.overlay-card img {
  width: min(180px, 70%);
  height: auto;
  display: block;
  margin: 0 auto 0.6rem;
  filter: drop-shadow(0 12px 25px rgba(0, 0, 0, 0.25));
}

.overlay-card h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2vw, 2.4rem);
}

.side-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card h2 {
  margin: 0 0 0.9rem;
  font-size: 1.1rem;
}

.file-picker {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.8rem 0.9rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px dashed rgba(148, 163, 184, 0.35);
  border-radius: 12px;
  color: var(--muted);
  margin-bottom: 0.8rem;
}

.file-picker input {
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  color: var(--muted);
}

.full-width {
  width: 100%;
}

.rules-card ul {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--muted);
  line-height: 1.8;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 920px) {
  .game-layout {
    grid-template-columns: 1fr;
  }

  .board {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  body {
    padding: 12px;
  }

  .topbar {
    padding: 1rem;
  }

  .score-panel {
    min-width: 90px;
  }

  .input-row {
    flex-direction: column;
  }
}
