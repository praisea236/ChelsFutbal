import { useState, useEffect, useCallback } from "react";

// ─── Chelsea Player Data ───────────────────────────────────────────────────
// Format: { name, nationality, manager }
const PLAYER_DATA = [
  // ── CURRENT / RECENT SQUAD (Maresca era) ──
  { name: "PALMER",        nationality: "English",      manager: "Pochettino / Maresca" },
  { name: "JACKSON",       nationality: "Senegalese",   manager: "Pochettino / Maresca" },
  { name: "CAICEDO",       nationality: "Ecuadorian",   manager: "Pochettino / Maresca" },
  { name: "FERNANDEZ",     nationality: "Argentinian",  manager: "Pochettino / Maresca" },
  { name: "COLWILL",       nationality: "English",      manager: "Pochettino / Maresca" },
  { name: "JAMES",         nationality: "English",      manager: "Lampard / Tuchel / Potter / Maresca" },
  { name: "GUSTO",         nationality: "French",       manager: "Pochettino / Maresca" },
  { name: "NKUNKU",        nationality: "French",       manager: "Pochettino / Maresca" },
  { name: "MADUEKE",       nationality: "English",      manager: "Pochettino / Maresca" },
  { name: "NETO",          nationality: "Portuguese",   manager: "Maresca" },
  { name: "CUCURELLA",     nationality: "Spanish",      manager: "Potter / Pochettino / Maresca" },
  { name: "BADIASHILE",    nationality: "French",       manager: "Potter / Pochettino / Maresca" },
  { name: "FOFANA",        nationality: "French",       manager: "Potter / Pochettino / Maresca" },
  { name: "LAVIA",         nationality: "Belgian",      manager: "Maresca" },
  { name: "MUDRYK",        nationality: "Ukrainian",    manager: "Potter / Pochettino / Maresca" },
  { name: "SANCHEZ",       nationality: "Chilean",      manager: "Tuchel / Potter / Pochettino / Maresca" },
  { name: "JORGENSEN",     nationality: "Danish",       manager: "Maresca" },
  { name: "TOSIN",         nationality: "English",      manager: "Maresca" },
  { name: "DELAP",         nationality: "English",      manager: "Maresca" },
  { name: "GEORGE",        nationality: "English",      manager: "Maresca" },
  { name: "GUIU",          nationality: "Spanish",      manager: "Maresca" },
  { name: "ANSELMINO",     nationality: "Argentinian",  manager: "Maresca" },
  { name: "SANTOS",        nationality: "Brazilian",    manager: "Maresca" },
  { name: "ESSUGO",        nationality: "Portuguese",   manager: "Maresca" },
  { name: "SARR",          nationality: "French",       manager: "Maresca" },
  { name: "ACHEAMPONG",    nationality: "Danish",       manager: "Maresca" },
  { name: "PENDERS",       nationality: "Belgian",      manager: "Maresca" },

  // ── POCHETTINO ERA ──
  { name: "GALLAGHER",     nationality: "English",      manager: "Tuchel / Potter / Pochettino" },
  { name: "STERLING",      nationality: "English",      manager: "Tuchel / Potter / Pochettino" },
  { name: "DISASI",        nationality: "French",       manager: "Pochettino / Maresca" },
  { name: "BROJA",         nationality: "Albanian",     manager: "Tuchel / Potter / Pochettino" },
  { name: "CHILWELL",      nationality: "English",      manager: "Lampard / Tuchel / Potter / Pochettino" },
  { name: "MAATSEN",       nationality: "Dutch",        manager: "Pochettino" },
  { name: "UGOCHUKWU",     nationality: "French",       manager: "Pochettino" },
  { name: "PETROVIC",      nationality: "Serbian",      manager: "Pochettino / Maresca" },
  { name: "FELIX",         nationality: "Portuguese",   manager: "Pochettino" },

  // ── TUCHEL / POTTER ERA ──
  { name: "MOUNT",         nationality: "English",      manager: "Lampard / Tuchel" },
  { name: "HAVERTZ",       nationality: "German",       manager: "Tuchel / Potter" },
  { name: "WERNER",        nationality: "German",       manager: "Lampard / Tuchel" },
  { name: "PULISIC",       nationality: "American",     manager: "Lampard / Tuchel / Potter" },
  { name: "LUKAKU",        nationality: "Belgian",      manager: "Di Matteo / Benitez / Tuchel" },
  { name: "KOVACIC",       nationality: "Croatian",     manager: "Sarri / Lampard / Tuchel / Potter" },
  { name: "JORGINHO",      nationality: "Italian",      manager: "Sarri / Lampard / Tuchel / Potter" },
  { name: "RUDIGER",       nationality: "German",       manager: "Conte / Sarri / Lampard / Tuchel" },
  { name: "CHRISTENSEN",   nationality: "Danish",       manager: "Conte / Sarri / Lampard / Tuchel" },
  { name: "ALONSO",        nationality: "Spanish",      manager: "Conte / Sarri / Lampard / Tuchel" },
  { name: "SILVA",         nationality: "Brazilian",    manager: "Lampard / Tuchel / Potter" },
  { name: "CHALOBAH",      nationality: "English",      manager: "Tuchel / Potter / Pochettino / Maresca" },
  { name: "ZIYECH",        nationality: "Moroccan",     manager: "Lampard / Tuchel / Potter" },

  // ── LAMPARD ERA ──
  { name: "ABRAHAM",       nationality: "English",      manager: "Lampard" },
  { name: "GIROUD",        nationality: "French",       manager: "Conte / Sarri / Lampard / Tuchel" },
  { name: "BARKLEY",       nationality: "English",      manager: "Conte / Sarri / Lampard" },
  { name: "ZOUMA",         nationality: "French",       manager: "Mourinho / Conte / Sarri / Lampard" },

  // ── SARRI / CONTE ERA ──
  { name: "HAZARD",        nationality: "Belgian",      manager: "Di Matteo / Benitez / Mourinho / Sarri" },
  { name: "KANTE",         nationality: "French",       manager: "Conte / Sarri / Lampard / Tuchel" },
  { name: "WILLIAN",       nationality: "Brazilian",    manager: "Mourinho / Conte / Sarri / Lampard" },
  { name: "PEDRO",         nationality: "Spanish",      manager: "Conte / Sarri / Lampard" },
  { name: "MORATA",        nationality: "Spanish",      manager: "Conte" },
  { name: "CAHILL",        nationality: "English",      manager: "Villas-Boas / Di Matteo / Benitez / Mourinho / Conte" },
  { name: "IVANOVIC",      nationality: "Serbian",      manager: "Grant / Scolari / Hiddink / Ancelotti / Mourinho / Conte" },
  { name: "AZPILICUETA",   nationality: "Spanish",      manager: "Di Matteo / Benitez / Mourinho / Conte / Sarri / Lampard / Tuchel" },
  { name: "FABREGAS",      nationality: "Spanish",      manager: "Mourinho / Hiddink / Conte" },
  { name: "MATIC",         nationality: "Serbian",      manager: "Mourinho / Hiddink / Benitez / Conte" },
  { name: "PEDRO",         nationality: "Spanish",      manager: "Conte / Sarri" },
  { name: "BAKAYOKO",      nationality: "French",       manager: "Conte" },
  { name: "EMERSON",       nationality: "Italian",      manager: "Conte / Sarri / Lampard" },
  { name: "MOSES",         nationality: "Nigerian",     manager: "Mourinho / Conte" },
  { name: "DRINKWATER",    nationality: "English",      manager: "Conte" },

  // ── MOURINHO ERA ──
  { name: "DROGBA",        nationality: "Ivorian",      manager: "Mourinho / Ancelotti / Di Matteo" },
  { name: "LAMPARD",       nationality: "English",      manager: "Ranieri / Mourinho / Ancelotti" },
  { name: "TERRY",         nationality: "English",      manager: "Ranieri / Mourinho / Ancelotti / Hiddink" },
  { name: "COLE",          nationality: "English",      manager: "Mourinho / Ancelotti / Di Matteo" },
  { name: "CECH",          nationality: "Czech",        manager: "Mourinho / Ancelotti / Di Matteo / Benitez" },
  { name: "ROBBEN",        nationality: "Dutch",        manager: "Mourinho" },
  { name: "CARVALHO",      nationality: "Portuguese",   manager: "Mourinho" },
  { name: "MAKELELE",      nationality: "French",       manager: "Ranieri / Mourinho" },
  { name: "GALLAS",        nationality: "French",       manager: "Ranieri / Mourinho" },
  { name: "FERREIRA",      nationality: "Portuguese",   manager: "Mourinho / Grant / Scolari / Hiddink / Ancelotti" },
  { name: "BRIDGE",        nationality: "English",      manager: "Ranieri / Mourinho" },
  { name: "GEREMI",        nationality: "Cameroonian",  manager: "Ranieri / Mourinho" },
  { name: "KEZMAN",        nationality: "Serbian",      manager: "Mourinho" },
  { name: "DUFF",          nationality: "Irish",        manager: "Ranieri / Mourinho" },
  { name: "TIAGO",         nationality: "Portuguese",   manager: "Mourinho" },
  { name: "HUTH",          nationality: "German",       manager: "Mourinho" },

  // ── ANCELOTTI ERA ──
  { name: "ANELKA",        nationality: "French",       manager: "Scolari / Hiddink / Ancelotti" },
  { name: "MALOUDA",       nationality: "French",       manager: "Mourinho / Grant / Ancelotti / Di Matteo" },
  { name: "ESSIEN",        nationality: "Ghanaian",     manager: "Mourinho / Grant / Scolari / Hiddink / Ancelotti" },
  { name: "BALLACK",       nationality: "German",       manager: "Mourinho / Grant / Scolari / Hiddink" },
  { name: "KALOU",         nationality: "Ivorian",      manager: "Mourinho / Grant / Scolari / Hiddink / Ancelotti / Villas-Boas / Di Matteo" },
  { name: "BOSINGWA",      nationality: "Portuguese",   manager: "Hiddink / Ancelotti / Villas-Boas / Di Matteo" },
  { name: "BENAYOUN",      nationality: "Israeli",      manager: "Ancelotti" },
  { name: "RAMIRES",       nationality: "Brazilian",    manager: "Ancelotti / Villas-Boas / Di Matteo / Benitez / Mourinho" },

  // ── BENITEZ / DI MATTEO ERA ──
  { name: "TORRES",        nationality: "Spanish",      manager: "Ancelotti / Villas-Boas / Di Matteo / Benitez / Mourinho" },
  { name: "OSCAR",         nationality: "Brazilian",    manager: "Di Matteo / Benitez / Mourinho / Conte" },
  { name: "MIKEL",         nationality: "Nigerian",     manager: "Mourinho / Grant / Scolari / Hiddink / Ancelotti / Di Matteo / Conte" },
  { name: "MATA",          nationality: "Spanish",      manager: "Villas-Boas / Di Matteo / Benitez / Mourinho" },
  { name: "HAZARD",        nationality: "Belgian",      manager: "Di Matteo / Benitez / Mourinho / Sarri" },
  { name: "STURRIDGE",     nationality: "English",      manager: "Ancelotti / Villas-Boas / Di Matteo" },
  { name: "SALAH",         nationality: "Egyptian",     manager: "Mourinho / Di Matteo" },
  { name: "BERTRAND",      nationality: "English",      manager: "Villas-Boas / Di Matteo" },
  { name: "AZPILICUETA",   nationality: "Spanish",      manager: "Di Matteo / Benitez / Mourinho / Conte / Sarri / Lampard / Tuchel" },
  { name: "LUIZ",          nationality: "Brazilian",    manager: "Villas-Boas / Di Matteo / Benitez / Mourinho / Conte" },

  // ── GRANT / SCOLARI / HIDDINK ERA ──
  { name: "DECO",          nationality: "Portuguese",   manager: "Scolari / Hiddink" },
  { name: "BELLETTI",      nationality: "Brazilian",    manager: "Mourinho / Grant / Scolari / Hiddink" },
  { name: "ALEX",          nationality: "Brazilian",    manager: "Scolari / Hiddink / Ancelotti / Villas-Boas" },

  // ── RANIERI ERA ──
  { name: "HASSELBAINK",   nationality: "Dutch",        manager: "Vialli / Ranieri" },
  { name: "GRONKJAER",     nationality: "Danish",       manager: "Ranieri" },
  { name: "MUTU",          nationality: "Romanian",     manager: "Ranieri" },
  { name: "VERON",         nationality: "Argentinian",  manager: "Ranieri" },
  { name: "GUDJOHNSEN",    nationality: "Icelandic",    manager: "Vialli / Ranieri / Mourinho" },
  { name: "CUDICINI",      nationality: "Italian",      manager: "Vialli / Ranieri / Mourinho" },
  { name: "DESAILLY",      nationality: "French",       manager: "Vialli / Ranieri" },
  { name: "LEBOEUF",       nationality: "French",       manager: "Gullit / Vialli / Ranieri" },

  // ── GULLIT / VIALLI ERA ──
  { name: "ZOLA",          nationality: "Italian",      manager: "Gullit / Vialli / Ranieri" },
  { name: "VIALLI",        nationality: "Italian",      manager: "Gullit / Hoddle" },
  { name: "POYET",         nationality: "Uruguayan",    manager: "Gullit / Vialli" },
  { name: "BABAYARO",      nationality: "Nigerian",     manager: "Vialli / Ranieri" },
  { name: "FORDE",         nationality: "English",      manager: "Vialli / Ranieri" },
  { name: "LEBOEUF",       nationality: "French",       manager: "Gullit / Vialli / Ranieri" },
  { name: "WISE",          nationality: "English",      manager: "Porterfield / Hoddle / Gullit / Vialli" },
  { name: "HUGHES",        nationality: "Welsh",        manager: "Porterfield / Hoddle" },
  { name: "PEACOCK",       nationality: "English",      manager: "Porterfield / Hoddle / Gullit" },
  { name: "SINCLAIR",      nationality: "English",      manager: "Gullit / Vialli" },
  { name: "NEWTON",        nationality: "English",      manager: "Porterfield / Hoddle / Gullit / Vialli" },
  { name: "MYERS",         nationality: "English",      manager: "Porterfield / Hoddle / Gullit" },
  { name: "KHARINE",       nationality: "Russian",      manager: "Porterfield / Hoddle / Gullit / Vialli" },
  { name: "PETRESCU",      nationality: "Romanian",     manager: "Hoddle / Gullit / Vialli" },
  { name: "DUBERRY",       nationality: "English",      manager: "Hoddle / Gullit / Vialli / Ranieri" },
  { name: "STANIC",        nationality: "Croatian",     manager: "Vialli / Ranieri" },
  { name: "AMBROSETTI",    nationality: "Italian",      manager: "Vialli" },
  { name: "MELCHIOT",      nationality: "Dutch",        manager: "Vialli / Ranieri" },
  { name: "DALLA BONA",    nationality: "Italian",      manager: "Vialli / Ranieri" },
];

// Deduplicate by name
const seen = new Set();
const PLAYER_LIST_DATA = PLAYER_DATA.filter(p => {
  if (seen.has(p.name)) return false;
  seen.add(p.name);
  return true;
});

const PLAYER_NAMES = PLAYER_LIST_DATA.map(p => p.name);

const MAX_GUESSES = 6;
const STORAGE_KEY = "chelsea_wordle_v3_leaderboard";
const GAME_KEY = "chelsea_wordle_v3_game";

function getDailyPlayer() {
  const start = new Date("2024-01-01");
  const diff = Math.floor((new Date() - start) / (1000 * 60 * 60 * 24));
  return PLAYER_LIST_DATA[diff % PLAYER_LIST_DATA.length];
}

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function getLetterStates(guess, answer) {
  const result = Array(guess.length).fill("absent");
  const answerArr = answer.split("");
  const used = Array(answer.length).fill(false);
  guess.split("").forEach((l, i) => {
    if (l === answerArr[i]) { result[i] = "correct"; used[i] = true; }
  });
  guess.split("").forEach((l, i) => {
    if (result[i] === "correct") return;
    const j = answerArr.findIndex((a, idx) => a === l && !used[idx]);
    if (j !== -1) { result[i] = "present"; used[j] = true; }
  });
  return result;
}

function buildKeyboardState(guesses, answer) {
  const state = {};
  guesses.forEach(({ word, states }) => {
    word.split("").forEach((l, i) => {
      const prev = state[l];
      const curr = states[i];
      if (prev === "correct") return;
      if (curr === "correct" || prev !== "correct") state[l] = curr;
    });
  });
  return state;
}

const TILE_COLORS = {
  correct: { bg: "#034694", border: "#034694", text: "#fff" },
  present: { bg: "#FFC61E", border: "#FFC61E", text: "#1a1a2e" },
  absent:  { bg: "#3a3a4a", border: "#3a3a4a", text: "#fff" },
  empty:   { bg: "transparent", border: "#2a2a4a", text: "#fff" },
  active:  { bg: "transparent", border: "#6666aa", text: "#fff" },
};

function Tile({ letter, state, shake }) {
  const colors = TILE_COLORS[state] || TILE_COLORS.empty;
  return (
    <div style={{
      width: 46, height: 46, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 18, fontWeight: 800,
      fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: 1,
      border: `2.5px solid ${colors.border}`, background: colors.bg, color: colors.text,
      borderRadius: 6, transition: "background 0.3s, border 0.3s",
      animation: shake ? "shake 0.4s ease" : "none",
      boxShadow: state === "correct" ? "0 0 10px #034694aa" : "none",
      flexShrink: 0,
    }}>{letter}</div>
  );
}

function Row({ word, answer, submitted, isActive, shake }) {
  const padded = word.padEnd(answer.length, " ");
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 4, justifyContent: "center" }}>
      {padded.split("").map((l, i) => (
        <Tile
          key={i}
          letter={l.trim()}
          state={submitted ? getLetterStates(word, answer)[i] : (i < word.length ? "active" : "empty")}
          shake={isActive && shake}
        />
      ))}
    </div>
  );
}

function Keyboard({ onKey, keyState }) {
  const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["ENTER","Z","X","C","V","B","N","M","⌫"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 4 }}>
          {row.map(k => {
            const st = keyState[k];
            const colors = st ? TILE_COLORS[st] : { bg: "#2a2a3e", border: "#2a2a3e", text: "#fff" };
            const isWide = k === "ENTER" || k === "⌫";
            return (
              <button key={k} onClick={() => onKey(k)} style={{
                width: isWide ? 54 : 32, height: 40,
                background: colors.bg, color: colors.text,
                border: `1.5px solid ${colors.border}`, borderRadius: 5,
                fontSize: isWide ? 9 : 12, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0.5,
                transition: "background 0.2s", flexShrink: 0,
              }}>{k}</button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ClueBox({ label, icon, content, used, penalty, onUse, disabled }) {
  return (
    <div style={{
      background: used ? "#0d1f0d" : "#12122a",
      border: `1.5px solid ${used ? "#2a6a2a" : "#2a2a4a"}`,
      borderRadius: 10, padding: "10px 14px", flex: 1,
      transition: "all 0.3s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#666688", fontSize: 10, letterSpacing: 1 }}>{icon} {label}</span>
        {!used && (
          <button onClick={onUse} disabled={disabled} style={{
            background: disabled ? "#1a1a2a" : "#1e1e40",
            border: "1px solid #034694", color: disabled ? "#444" : "#FFC61E",
            borderRadius: 6, padding: "3px 8px", fontSize: 10,
            fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
            fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 0.5,
          }}>-{penalty}pt</button>
        )}
      </div>
      {used && (
        <div style={{ color: "#7fff7f", fontWeight: 700, fontSize: 12, marginTop: 6, fontFamily: "sans-serif" }}>
          {content}
        </div>
      )}
      {!used && (
        <div style={{ color: "#333355", fontSize: 11, marginTop: 4, fontStyle: "italic" }}>
          Hidden
        </div>
      )}
    </div>
  );
}

function Leaderboard({ scores, onClose }) {
  const sorted = [...scores].sort((a, b) => b.points - a.points);
  const medals = ["🥇","🥈","🥉"];
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 20,
    }}>
      <div style={{
        background: "#12122a", borderRadius: 16, padding: 28,
        width: "100%", maxWidth: 420, border: "1.5px solid #034694",
        boxShadow: "0 0 40px #034694aa", maxHeight: "80vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#FFC61E", fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, margin: 0, letterSpacing: 1 }}>
            🏆 LEADERBOARD
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>
        {sorted.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", fontFamily: "sans-serif" }}>No scores yet. Be the first!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sorted.map((s, i) => (
              <div key={s.name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: i < 3 ? "#1a1a3a" : "#0e0e22",
                borderRadius: 10, padding: "10px 16px",
                border: i === 0 ? "1px solid #FFC61E55" : "1px solid #ffffff0a",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{medals[i] || `#${i+1}`}</span>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontFamily: "sans-serif", fontSize: 14 }}>{s.name}</div>
                    <div style={{ color: "#444466", fontSize: 10 }}>{s.gamesPlayed} games played</div>
                  </div>
                </div>
                <div style={{ color: "#FFC61E", fontWeight: 800, fontSize: 20, fontFamily: "'Bebas Neue', sans-serif" }}>
                  {s.points} <span style={{ fontSize: 12, color: "#666688" }}>PTS</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RegisterModal({ onRegister }) {
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    const trimmed = name.trim().toUpperCase();
    if (trimmed.length < 2) { setErr("At least 2 characters"); return; }
    if (trimmed.length > 20) { setErr("Max 20 characters"); return; }
    onRegister(trimmed);
  };
  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0a0a1a",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20,
    }}>
      <div style={{
        background: "#12122a", borderRadius: 20, padding: "36px 28px",
        width: "100%", maxWidth: 360, border: "1.5px solid #034694",
        boxShadow: "0 0 60px #034694aa", textAlign: "center",
      }}>
        <div style={{ fontSize: 56, marginBottom: 10 }}>⚽</div>
        <h1 style={{ color: "#FFC61E", fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, margin: "0 0 4px", letterSpacing: 3 }}>
          CHELSEA WORDLE
        </h1>
        <p style={{ color: "#034694", fontSize: 12, marginBottom: 4, letterSpacing: 2, fontFamily: "sans-serif" }}>
          BLUE IS THE COLOUR
        </p>
        <p style={{ color: "#444466", fontSize: 13, marginBottom: 28, fontFamily: "sans-serif" }}>
          Guess the Chelsea player. New puzzle every day.
        </p>
        <input
          type="text" placeholder="Your name or username"
          value={name} onChange={e => { setName(e.target.value); setErr(""); }}
          onKeyDown={e => e.key === "Enter" && submit()} maxLength={20}
          style={{
            width: "100%", padding: "13px 14px", borderRadius: 10,
            background: "#0a0a1a", border: "1.5px solid #1e1e4a",
            color: "#fff", fontSize: 15, outline: "none",
            boxSizing: "border-box", marginBottom: 8, fontFamily: "sans-serif",
            textAlign: "center",
          }}
          autoFocus
        />
        {err && <p style={{ color: "#ff6b6b", fontSize: 12, margin: "0 0 8px", fontFamily: "sans-serif" }}>{err}</p>}
        <button onClick={submit} style={{
          width: "100%", padding: 14, borderRadius: 10,
          background: "#034694", color: "#fff", border: "none",
          fontSize: 18, fontWeight: 800, cursor: "pointer",
          fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginTop: 4,
          boxShadow: "0 4px 20px #034694aa",
        }}>LET'S PLAY →</button>
        <p style={{ color: "#222244", fontSize: 11, marginTop: 16, fontFamily: "sans-serif" }}>
          {PLAYER_LIST_DATA.length} Chelsea players · Daily puzzle
        </p>
      </div>
    </div>
  );
}

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", top: 76, left: "50%", transform: "translateX(-50%)",
      background: "#fff", color: "#12122a", padding: "10px 20px",
      borderRadius: 8, fontWeight: 700, fontSize: 14, zIndex: 300,
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)", fontFamily: "sans-serif",
      whiteSpace: "nowrap", maxWidth: "90vw", textAlign: "center",
    }}>{msg}</div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function ChelseaWordle() {
  const dailyData = getDailyPlayer();
  const ANSWER = dailyData.name;
  const today = getTodayStr();

  const [player, setPlayer] = useState(null);
  const [current, setCurrent] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const [scores, setScores] = useState([]);
  const [pointsEarned, setPointsEarned] = useState(null);
  const [savedToday, setSavedToday] = useState(false);
  const [clue1Used, setClue1Used] = useState(false);
  const [clue2Used, setClue2Used] = useState(false);
  const [cluePenalty, setCluePenalty] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setScores(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!player) return;
    try {
      const raw = localStorage.getItem(GAME_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.date === today && saved.player === player) {
          setGuesses(saved.guesses || []);
          setGameOver(saved.gameOver || false);
          setWon(saved.won || false);
          setSavedToday(saved.scored || false);
          setPointsEarned(saved.points ?? null);
          setClue1Used(saved.clue1Used || false);
          setClue2Used(saved.clue2Used || false);
          setCluePenalty(saved.cluePenalty || 0);
        }
      }
    } catch {}
  }, [player]);

  const saveGame = useCallback((g, go, w, scored, pts, c1, c2, cp) => {
    try {
      localStorage.setItem(GAME_KEY, JSON.stringify({
        date: today, player, guesses: g, gameOver: go, won: w,
        scored, points: pts, clue1Used: c1, clue2Used: c2, cluePenalty: cp,
      }));
    } catch {}
  }, [player, today]);

  const saveScores = (updated) => {
    setScores(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  };

  const showToast = (msg, duration = 2200) => {
    setToast(msg);
    setTimeout(() => setToast(""), duration);
  };

  const submitScore = useCallback((tries, didWin, currentGuesses, penalty) => {
    if (savedToday) return;
    const base = didWin ? Math.max(7 - tries, 1) : 0;
    const pts = Math.max(base - penalty, 0);
    setPointsEarned(pts);
    const updated = [...scores];
    const idx = updated.findIndex(s => s.name === player);
    if (idx >= 0) { updated[idx].points += pts; updated[idx].gamesPlayed += 1; }
    else updated.push({ name: player, points: pts, gamesPlayed: 1 });
    saveScores(updated);
    setSavedToday(true);
    saveGame(currentGuesses, true, didWin, true, pts, clue1Used, clue2Used, penalty);
  }, [scores, player, savedToday, saveGame, clue1Used, clue2Used]);

  const useClue1 = () => {
    if (clue1Used || gameOver) return;
    const np = cluePenalty + 1;
    setClue1Used(true); setCluePenalty(np);
    saveGame(guesses, gameOver, won, savedToday, pointsEarned, true, clue2Used, np);
    showToast("🌍 Nationality revealed! -1pt deducted");
  };

  const useClue2 = () => {
    if (clue2Used || gameOver) return;
    const np = cluePenalty + 1;
    setClue2Used(true); setCluePenalty(np);
    saveGame(guesses, gameOver, won, savedToday, pointsEarned, clue1Used, true, np);
    showToast("👔 Manager revealed! -1pt deducted");
  };

  const handleKey = useCallback((key) => {
    if (gameOver) return;
    if (key === "⌫" || key === "Backspace") { setCurrent(c => c.slice(0, -1)); return; }
    if (key === "ENTER" || key === "Enter") {
      if (current.length !== ANSWER.length) {
        setShake(true); setTimeout(() => setShake(false), 400);
        showToast(`Must be ${ANSWER.length} letters`); return;
      }
      if (!PLAYER_NAMES.includes(current.toUpperCase())) {
        setShake(true); setTimeout(() => setShake(false), 400);
        showToast("Not in Chelsea player list"); return;
      }
      const states = getLetterStates(current, ANSWER);
      const newGuess = { word: current, states };
      const newGuesses = [...guesses, newGuess];
      setGuesses(newGuesses);
      setCurrent("");
      const didWin = current === ANSWER;
      const isLast = newGuesses.length === MAX_GUESSES;
      if (didWin) {
        setWon(true); setGameOver(true);
        setTimeout(() => showToast("⚽ BLUE IS THE COLOUR! 🔵", 3000), 300);
        submitScore(newGuesses.length, true, newGuesses, cluePenalty);
      } else if (isLast) {
        setGameOver(true);
        setTimeout(() => showToast(`The answer was ${ANSWER}`, 4000), 300);
        submitScore(newGuesses.length, false, newGuesses, cluePenalty);
      } else {
        saveGame(newGuesses, false, false, savedToday, pointsEarned, clue1Used, clue2Used, cluePenalty);
      }
      return;
    }
    if (/^[A-Za-z]$/.test(key) && current.length < ANSWER.length) {
      setCurrent(c => c + key.toUpperCase());
    }
  }, [current, guesses, gameOver, ANSWER, submitScore, saveGame, savedToday, pointsEarned, clue1Used, clue2Used, cluePenalty]);

  useEffect(() => {
    const handler = (e) => handleKey(e.key);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const keyState = buildKeyboardState(guesses, ANSWER);
  const sorted = [...scores].sort((a, b) => b.points - a.points);
  const rank = sorted.findIndex(s => s.name === player) + 1;
  const myScore = scores.find(s => s.name === player);
  const puzzleNum = Math.floor((new Date() - new Date("2024-01-01")) / 86400000) % PLAYER_LIST_DATA.length + 1;
  const triesLeft = MAX_GUESSES - guesses.length;

  if (!player) return <RegisterModal onRegister={setPlayer} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a1a; }
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)}
          40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
        }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 10px #FFC61E44} 50%{box-shadow:0 0 20px #FFC61Eaa} }
        button:hover{opacity:0.85} input:focus{border-color:#FFC61E!important}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#034694;border-radius:2px}
      `}</style>

      <Toast msg={toast} />
      {showBoard && <Leaderboard scores={scores} onClose={() => setShowBoard(false)} />}

      <div style={{
        minHeight: "100vh", background: "#0a0a1a",
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingBottom: 40, animation: "fadeIn 0.4s ease",
      }}>
        {/* Header */}
        <div style={{
          width: "100%", maxWidth: 500, borderBottom: "1px solid #1a1a3a",
          padding: "12px 16px", display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 12,
        }}>
          <div>
            <h1 style={{ color: "#FFC61E", fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, lineHeight: 1 }}>
              ⚽ CHELSEA WORDLE
            </h1>
            <p style={{ color: "#222244", fontSize: 10, marginTop: 2, fontFamily: "sans-serif" }}>
              Puzzle #{puzzleNum} · {today}
            </p>
          </div>
          <button onClick={() => setShowBoard(true)} style={{
            background: "#12122a", border: "1px solid #034694",
            color: "#FFC61E", padding: "7px 12px", borderRadius: 8,
            cursor: "pointer", fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 1,
          }}>🏆 RANKS</button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: 0, marginBottom: 14,
          background: "#12122a", borderRadius: 10,
          border: "1px solid #1a1a3a", overflow: "hidden",
        }}>
          {[
            { label: "PLAYER", value: player, color: "#fff" },
            { label: "POINTS", value: myScore?.points ?? 0, color: "#FFC61E" },
            { label: "RANK", value: rank ? `#${rank}` : "–", color: "#4488ff" },
            { label: "TRIES LEFT", value: gameOver ? "–" : triesLeft, color: triesLeft <= 2 && !gameOver ? "#ff6b6b" : "#aaa" },
          ].map((item, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "8px 14px",
              borderRight: i < 3 ? "1px solid #1a1a3a" : "none",
            }}>
              <div style={{ color: "#333355", fontSize: 9, letterSpacing: 1, fontFamily: "sans-serif" }}>{item.label}</div>
              <div style={{ color: item.color, fontWeight: 700, fontSize: 13, fontFamily: item.label === "PLAYER" ? "sans-serif" : "'Bebas Neue', sans-serif" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Letter count hint */}
        <p style={{ color: "#2a2a4a", fontSize: 11, marginBottom: 12, fontFamily: "sans-serif", letterSpacing: 0.5 }}>
          {ANSWER.length} letters · Guess the Chelsea player
        </p>

        {/* Grid */}
        <div style={{ marginBottom: 14, width: "100%", maxWidth: 400, padding: "0 8px" }}>
          {Array.from({ length: MAX_GUESSES }).map((_, i) => {
            const submitted = i < guesses.length;
            const isActive = i === guesses.length && !gameOver;
            return (
              <Row
                key={i}
                word={submitted ? guesses[i].word : isActive ? current : ""}
                answer={ANSWER}
                submitted={submitted}
                isActive={isActive}
                shake={isActive && shake}
              />
            );
          })}
        </div>

        {/* Clues */}
        {!gameOver && (
          <div style={{ width: "100%", maxWidth: 380, marginBottom: 14, padding: "0 8px" }}>
            <div style={{ color: "#222244", fontSize: 10, letterSpacing: 1.5, textAlign: "center", marginBottom: 6, fontFamily: "sans-serif" }}>
              💡 USE A CLUE (costs 1pt)
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <ClueBox label="NATIONALITY" icon="🌍" content={dailyData.nationality}
                used={clue1Used} penalty={1} onUse={useClue1} disabled={gameOver} />
              <ClueBox label="MANAGER" icon="👔" content={dailyData.manager}
                used={clue2Used} penalty={1} onUse={useClue2} disabled={gameOver} />
            </div>
            {cluePenalty > 0 && (
              <p style={{ color: "#aa6600", fontSize: 11, textAlign: "center", marginTop: 6, fontFamily: "sans-serif" }}>
                ⚠️ -{cluePenalty}pt clue penalty active
              </p>
            )}
          </div>
        )}

        {/* Clues shown after game over */}
        {gameOver && (clue1Used || clue2Used) && (
          <div style={{ width: "100%", maxWidth: 380, marginBottom: 12, padding: "0 8px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {clue1Used && (
                <div style={{ flex: 1, background: "#0d1f0d", border: "1px solid #2a5a2a", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: "#666688", fontSize: 10, fontFamily: "sans-serif" }}>🌍 NATIONALITY</div>
                  <div style={{ color: "#7fff7f", fontWeight: 700, fontSize: 13, marginTop: 4, fontFamily: "sans-serif" }}>{dailyData.nationality}</div>
                </div>
              )}
              {clue2Used && (
                <div style={{ flex: 1, background: "#0d1f0d", border: "1px solid #2a5a2a", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ color: "#666688", fontSize: 10, fontFamily: "sans-serif" }}>👔 MANAGER</div>
                  <div style={{ color: "#7fff7f", fontWeight: 700, fontSize: 11, marginTop: 4, fontFamily: "sans-serif" }}>{dailyData.manager}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Result */}
        {gameOver && (
          <div style={{
            background: won ? "#050f20" : "#150505",
            border: `1.5px solid ${won ? "#034694" : "#661111"}`,
            borderRadius: 14, padding: "16px 20px", textAlign: "center",
            marginBottom: 18, width: "100%", maxWidth: 380,
            animation: "fadeIn 0.5s ease", padding: "18px 24px",
          }}>
            {won ? (
              <>
                <div style={{ fontSize: 32, marginBottom: 6 }}>🎉</div>
                <div style={{ color: "#FFC61E", fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 1 }}>
                  BLUE IS THE COLOUR!
                </div>
                <div style={{ color: "#888", fontSize: 13, marginTop: 6, fontFamily: "sans-serif" }}>
                  Solved in <strong style={{ color: "#fff" }}>{guesses.length}</strong> {guesses.length === 1 ? "try" : "tries"}
                  {cluePenalty > 0 && <span style={{ color: "#aa6600" }}> · -{cluePenalty}pt clue penalty</span>}
                </div>
                <div style={{
                  color: "#FFC61E", fontSize: 28, fontWeight: 800, marginTop: 8,
                  fontFamily: "'Bebas Neue', sans-serif",
                  animation: "glow 2s ease infinite",
                }}>
                  +{pointsEarned} PTS
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 28, marginBottom: 6 }}>😔</div>
                <div style={{ color: "#ff6b6b", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1 }}>
                  BETTER LUCK TOMORROW
                </div>
                <div style={{ color: "#666", fontSize: 13, marginTop: 6, fontFamily: "sans-serif" }}>
                  The answer was <strong style={{ color: "#fff" }}>{ANSWER}</strong>
                </div>
              </>
            )}
            <button
              onClick={() => setShowBoard(true)}
              style={{
                marginTop: 14, background: "#034694", border: "none", color: "#fff",
                borderRadius: 8, padding: "8px 20px", cursor: "pointer",
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 1,
              }}
            >
              VIEW LEADERBOARD
            </button>
            <div style={{ color: "#1a1a3a", fontSize: 11, marginTop: 10, fontFamily: "sans-serif" }}>
              New puzzle at midnight your local time
            </div>
          </div>
        )}

        {/* Keyboard */}
        {!gameOver && <Keyboard onKey={handleKey} keyState={keyState} />}
      </div>
    </>
  );
}
