  import { useState, useEffect, useCallback } from "react";

const ALL_QUOTES = {
  motivation: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "All our dreams can come true if we have the courage to pursue them.", author: "Walt Disney" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  ],
  wisdom: [
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "An unexamined life is not worth living.", author: "Socrates" },
    { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", author: "Eleanor Roosevelt" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "Well done is better than well said.", author: "Benjamin Franklin" },
    { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  ],
  love: [
    { text: "Spread love everywhere you go.", author: "Mother Teresa" },
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
    { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
    { text: "Being deeply loved by someone gives you strength.", author: "Lao Tzu" },
    { text: "Life is the flower for which love is the honey.", author: "Victor Hugo" },
  ],
  success: [
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "Try not to become a person of success, but rather try to become a person of value.", author: "Albert Einstein" },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  ],
};

const FACTS = [
  { text: "Honey never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs still edible.", emoji: "🍯" },
  { text: "A group of flamingos is called a flamboyance.", emoji: "🦩" },
  { text: "Octopuses have three hearts and blue blood.", emoji: "🐙" },
  { text: "The shortest war lasted only 38 minutes — between Britain and Zanzibar in 1896.", emoji: "⚔️" },
  { text: "Bananas are technically berries, but strawberries are not.", emoji: "🍌" },
  { text: "A day on Venus is longer than a year on Venus.", emoji: "🌌" },
  { text: "There are more stars in the universe than grains of sand on all Earth's beaches.", emoji: "✨" },
  { text: "Crows can recognize human faces and hold grudges.", emoji: "🐦" },
  { text: "The inventor of the Pringles can is buried in one.", emoji: "🥔" },
  { text: "A bolt of lightning is five times hotter than the surface of the Sun.", emoji: "⚡" },
  { text: "A snail can sleep for 3 years.", emoji: "🐌" },
  { text: "Butterflies taste with their feet.", emoji: "🦋" },
  { text: "Apples are more effective at waking you up than coffee.", emoji: "🍎" },
  { text: "The human heart beats about 100,000 times per day.", emoji: "❤️" },
];

const CATEGORIES = [
  { id: "motivation", label: "🔥 Motivation", color: "#f5a623" },
  { id: "wisdom", label: "🧠 Wisdom", color: "#00d4aa" },
  { id: "love", label: "❤️ Love", color: "#e94560" },
  { id: "success", label: "💎 Success", color: "#a78bfa" },
];

const ads = [
  { label: "SPONSORED", text: "Boost your productivity with FocusFlow Pro", accent: "#e94560" },
  { label: "AD", text: "Try MindfulMe — 7 days free meditation", accent: "#00d4aa" },
  { label: "SPONSORED", text: "Learn anything in 10 mins/day with Shortform", accent: "#f5a623" },
  { label: "AD", text: "Unlock your potential with CoachAI — Free trial", accent: "#a78bfa" },
];

// ─── Splash ───────────────────────────────────────────────────────────────────
function Splash({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => onDone(), 2600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "radial-gradient(ellipse at center, #200a3e 0%, #0a0a0f 70%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: phase === 3 ? 0 : 1, transition: "opacity 0.7s ease",
    }}>
      <style>{`
        @keyframes ring { 0%,100%{transform:scale(1);opacity:0.3} 50%{transform:scale(1.08);opacity:0.6} }
        @keyframes glow { 0%,100%{filter:drop-shadow(0 0 20px rgba(245,200,66,0.6))} 50%{filter:drop-shadow(0 0 50px rgba(245,200,66,1))} }
      `}</style>
      {[180, 280, 380].map((s, i) => (
        <div key={i} style={{
          position: "absolute", width: s, height: s,
          border: `1px solid rgba(245,200,66,${0.2 - i * 0.05})`,
          borderRadius: "50%", animation: `ring ${1.5 + i * 0.4}s ease-in-out infinite`,
          opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.5s ease",
        }} />
      ))}
      <div style={{
        fontSize: 72,
        transform: phase >= 1 ? "scale(1) rotate(0deg)" : "scale(0) rotate(-180deg)",
        transition: "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
        marginBottom: 24,
        animation: phase >= 1 ? "glow 2s ease-in-out infinite" : "none",
      }}>✦</div>
      <div style={{
        fontSize: 38, fontWeight: 800, fontFamily: "Georgia, serif",
        color: "#f5c842", letterSpacing: "0.12em",
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease",
        textShadow: "0 0 60px rgba(245,200,66,0.6)",
      }}>Daily Spark</div>
      <div style={{
        fontSize: 11, color: "#888", letterSpacing: "0.35em",
        textTransform: "uppercase", marginTop: 10,
        opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
        fontFamily: "Georgia, serif",
      }}>Ignite Your Day</div>
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function Auth({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const inp = {
    width: "100%", padding: "14px 16px", borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)", color: "#f0ede6",
    fontSize: 15, fontFamily: "Georgia, serif", outline: "none",
    boxSizing: "border-box", marginBottom: 12,
  };

  const submit = () => {
    if (!email || !pass) { setErr("Fill in all fields"); return; }
    if (mode === "signup" && !name) { setErr("Enter your name"); return; }
    const users = JSON.parse(localStorage.getItem("ds_users") || "{}");
    if (mode === "signup") {
      if (users[email]) { setErr("Email already exists"); return; }
      users[email] = { name, pass, saved: [], streak: 0, lastVisit: null, categories: ["motivation"] };
      localStorage.setItem("ds_users", JSON.stringify(users));
      onAuth({ email, ...users[email] });
    } else {
      if (!users[email] || users[email].pass !== pass) { setErr("Wrong email or password"); return; }
      onAuth({ email, ...users[email] });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #200a3e 0%, #0a0a0f 60%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "0 24px", fontFamily: "Georgia, serif",
    }}>
      <div style={{ fontSize: 48, marginBottom: 8, filter: "drop-shadow(0 0 30px rgba(245,200,66,0.7))" }}>✦</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "#f5c842", marginBottom: 4 }}>Daily Spark</div>
      <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 40 }}>Your daily inspiration</div>

      <div style={{ width: "100%", maxWidth: 400, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 28, padding: "32px 28px", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ display: "flex", marginBottom: 28, background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 4 }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{
              flex: 1, padding: "10px", border: "none", borderRadius: 10,
              background: mode === m ? "#f5c842" : "transparent",
              color: mode === m ? "#0a0a0f" : "#666",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.2s",
            }}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>
        {mode === "signup" && <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={inp} />}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inp} type="email" />
        <input placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} style={inp} type="password" />
        {err && <div style={{ color: "#e94560", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{err}</div>}
        <button onClick={submit} style={{
          width: "100%", padding: "15px",
          background: "linear-gradient(135deg, #f5c842, #f5a623)",
          border: "none", borderRadius: 14, color: "#0a0a0f",
          fontSize: 16, fontWeight: 700, cursor: "pointer",
          fontFamily: "inherit", boxShadow: "0 8px 28px rgba(245,200,66,0.4)",
        }}>
          {mode === "login" ? "Sign In →" : "Create Account →"}
        </button>
        <button onClick={() => onAuth({ email: "guest", name: "Guest", saved: [], streak: 0, lastVisit: null, categories: ["motivation", "wisdom"] })} style={{
          width: "100%", padding: "12px", background: "transparent",
          border: "none", color: "#444", fontSize: 13,
          cursor: "pointer", fontFamily: "inherit", marginTop: 8,
        }}>Continue as Guest</button>
      </div>
    </div>
  );
}

// ─── Category Picker ──────────────────────────────────────────────────────────
function CategoryPicker({ selected, onSave }) {
  const [picks, setPicks] = useState(selected);
  const toggle = id => setPicks(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #200a3e 0%, #0a0a0f 60%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "0 24px", fontFamily: "Georgia, serif",
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#f5c842", marginBottom: 8 }}>Pick Your Vibe</div>
      <div style={{ fontSize: 14, color: "#666", marginBottom: 36, textAlign: "center" }}>Choose what inspires you</div>
      <div style={{ width: "100%", maxWidth: 400, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => toggle(cat.id)} style={{
            padding: "22px 16px", borderRadius: 18,
            border: picks.includes(cat.id) ? `2px solid ${cat.color}` : "2px solid rgba(255,255,255,0.08)",
            background: picks.includes(cat.id) ? `${cat.color}20` : "rgba(255,255,255,0.03)",
            color: picks.includes(cat.id) ? cat.color : "#666",
            fontSize: 15, fontWeight: picks.includes(cat.id) ? 700 : 400,
            cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
          }}>{cat.label}</button>
        ))}
      </div>
      <button onClick={() => onSave(picks.length ? picks : ["motivation"])} style={{
        width: "100%", maxWidth: 400, padding: "16px",
        background: "linear-gradient(135deg, #f5c842, #f5a623)",
        border: "none", borderRadius: 14, color: "#0a0a0f",
        fontSize: 16, fontWeight: 700, cursor: "pointer",
        fontFamily: "inherit", boxShadow: "0 8px 28px rgba(245,200,66,0.4)",
      }}>Let's Go! ✦</button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [catPicker, setCatPicker] = useState(false);
  const [tab, setTab] = useState("Quote");
  const [page, setPage] = useState("home");
  const [qIdx, setQIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const [adIdx, setAdIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [flip, setFlip] = useState(false);
  const [streakToast, setStreakToast] = useState(false);

  const cats = user?.categories || ["motivation"];
  const quotes = cats.flatMap(c => ALL_QUOTES[c] || []);
  const current = tab === "Quote" ? quotes[qIdx % quotes.length] : FACTS[fIdx % FACTS.length];
  const ad = ads[adIdx % ads.length];

  const updateUser = updates => {
    if (!user || user.email === "guest") { setUser(p => ({ ...p, ...updates })); return; }
    const users = JSON.parse(localStorage.getItem("ds_users") || "{}");
    users[user.email] = { ...users[user.email], ...updates };
    localStorage.setItem("ds_users", JSON.stringify(users));
    setUser(p => ({ ...p, ...updates }));
  };

  const handleAuth = u => {
    const today = new Date().toDateString();
    let streak = u.streak || 0;
    if (u.lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      streak = u.lastVisit === yesterday ? streak + 1 : 1;
      if (u.email !== "guest") {
        const users = JSON.parse(localStorage.getItem("ds_users") || "{}");
        if (users[u.email]) { users[u.email].streak = streak; users[u.email].lastVisit = today; localStorage.setItem("ds_users", JSON.stringify(users)); }
      }
    }
    setUser({ ...u, streak, lastVisit: today });
    if (streak > 1) { setStreakToast(true); setTimeout(() => setStreakToast(false), 3500); }
  };

  const next = useCallback(() => {
    setFlip(true);
    setTimeout(() => {
      if (tab === "Quote") setQIdx(i => (i + 1) % quotes.length);
      else setFIdx(i => (i + 1) % FACTS.length);
      setLiked(false);
      setAdIdx(a => (a + 1) % ads.length);
      setFlip(false);
    }, 350);
  }, [tab, quotes.length]);

  const handleSave = () => {
    if (!current) return;
    const item = { ...current, type: tab };
    const saved = user?.saved || [];
    if (!saved.some(s => s.text === item.text)) updateUser({ saved: [item, ...saved] });
    setLiked(true);
  };

  const bg = "radial-gradient(ellipse at top left, #1a0a2e 0%, #0a0a0f 55%, #0d1b2a 100%)";

  if (splash) return <Splash onDone={() => setSplash(false)} />;
  if (!user) return <Auth onAuth={handleAuth} />;
  if (catPicker) return <CategoryPicker selected={cats} onSave={c => { updateUser({ categories: c }); setCatPicker(false); }} />;

  const pageStyle = { minHeight: "100vh", background: bg, fontFamily: "Georgia, serif", color: "#f0ede6", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px 40px" };
  const hdr = { width: "100%", maxWidth: 480, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0 20px" };
  const backBtn = { background: "none", border: "none", color: "#f5c842", cursor: "pointer", fontSize: 14, fontFamily: "inherit" };

  if (page === "saved") return (
    <div style={pageStyle}>
      <div style={hdr}><div style={{ fontSize: 20, fontWeight: 700, color: "#f5c842" }}>✦ Saved</div><button onClick={() => setPage("home")} style={backBtn}>← Back</button></div>
      <div style={{ width: "100%", maxWidth: 480 }}>
        {!(user?.saved?.length) ? (
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: "40px", textAlign: "center", color: "#555" }}>Nothing saved yet!</div>
        ) : user.saved.map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "20px", marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "#f5c842", marginBottom: 6 }}>{item.type === "Quote" ? "💬 QUOTE" : "🔬 FUN FACT"}</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontStyle: item.type === "Quote" ? "italic" : "normal" }}>{item.text}</p>
            {item.author && <div style={{ marginTop: 8, fontSize: 12, color: "#f5c842" }}>— {item.author}</div>}
          </div>
        ))}
      </div>
    </div>
  );

  if (page === "about") return (
    <div style={pageStyle}>
      <div style={hdr}><div style={{ fontSize: 20, fontWeight: 700, color: "#f5c842" }}>✦ About</div><button onClick={() => setPage("home")} style={backBtn}>← Back</button></div>
      <div style={{ width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px 24px" }}>
        <h2 style={{ color: "#f5c842", marginBottom: 16 }}>About Daily Spark</h2>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 15 }}>Daily Spark is a free app that delivers motivational quotes and fun facts to inspire and educate you every day.</p>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 15, marginTop: 12 }}>Our mission is to give you a spark of motivation and curiosity every single day.</p>
        <h3 style={{ color: "#f5c842", marginTop: 24, marginBottom: 8 }}>Contact</h3>
        <p style={{ color: "#ccc", fontSize: 15 }}>ignitedailyspark@gmail.com</p>
      </div>
    </div>
  );

  if (page === "privacy") return (
    <div style={pageStyle}>
      <div style={hdr}><div style={{ fontSize: 20, fontWeight: 700, color: "#f5c842" }}>✦ Privacy</div><button onClick={() => setPage("home")} style={backBtn}>← Back</button></div>
      <div style={{ width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px 24px" }}>
        <h2 style={{ color: "#f5c842", marginBottom: 8 }}>Privacy Policy</h2>
        <p style={{ color: "#888", fontSize: 12, marginBottom: 16 }}>Last updated: June 2025</p>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>Daily Spark does not collect personal information beyond what you provide during signup, stored locally on your device.</p>
        <h3 style={{ color: "#f5c842", marginTop: 20, marginBottom: 8, fontSize: 15 }}>Advertising</h3>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>We use Google AdSense to display ads. Google may use cookies to serve relevant ads.</p>
        <h3 style={{ color: "#f5c842", marginTop: 20, marginBottom: 8, fontSize: 15 }}>Contact</h3>
        <p style={{ color: "#ccc", fontSize: 14 }}>ignitedailyspark@gmail.com</p>
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <style>{`
        @keyframes slideDown { from{opacity:0;transform:translateX(-50%) translateY(-24px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        @keyframes cardFlipOut { 0%{transform:rotateY(0) scale(1);opacity:1} 100%{transform:rotateY(90deg) scale(0.9);opacity:0} }
        @keyframes cardFlipIn { 0%{transform:rotateY(-90deg) scale(0.9);opacity:0} 100%{transform:rotateY(0) scale(1);opacity:1} }
        @keyframes shimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}</style>

      {/* Streak Toast */}
      {streakToast && (
        <div style={{
          position: "fixed", top: 20, left: "50%",
          background: "linear-gradient(135deg, #f5c842, #f5a623)",
          color: "#0a0a0f", padding: "13px 28px", borderRadius: 100,
          fontWeight: 700, fontSize: 14, zIndex: 1000,
          boxShadow: "0 8px 32px rgba(245,200,66,0.5)",
          animation: "slideDown 0.4s ease", fontFamily: "Georgia, serif",
          whiteSpace: "nowrap",
        }}>
          🔥 {user.streak} day streak! Keep it up!
        </div>
      )}

      {/* Header */}
      <div style={{ width: "100%", maxWidth: 480, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0 12px" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#f5c842", letterSpacing: "0.05em", textShadow: "0 0 30px rgba(245,200,66,0.3)" }}>✦ Daily Spark</div>
          <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase" }}>Hey {user.name} 👋</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setCatPicker(true)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "7px 13px", color: "#aaa", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>🎯</button>
          <div style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 20, padding: "7px 13px", color: "#f5a623", fontSize: 11, fontWeight: 700 }}>🔥 {user.streak}</div>
          <button onClick={() => setPage("saved")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "7px 13px", color: "#aaa", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>★ {user?.saved?.length || 0}</button>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ width: "100%", maxWidth: 480, display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
        {CATEGORIES.filter(c => cats.includes(c.id)).map(cat => (
          <div key={cat.id} style={{ padding: "5px 14px", borderRadius: 20, background: `${cat.color}18`, color: cat.color, fontSize: 11, whiteSpace: "nowrap", border: `1px solid ${cat.color}33` }}>
            {cat.label}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 30, padding: 4, gap: 2, marginBottom: 24, width: "100%", maxWidth: 300 }}>
        {["Quote", "Fact"].map(t => (
          <button key={t} onClick={() => { setTab(t); setLiked(false); }} style={{
            flex: 1, padding: "10px 0", borderRadius: 26, border: "none",
            background: tab === t ? "#f5c842" : "transparent",
            color: tab === t ? "#0a0a0f" : "#666",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: "inherit", transition: "all 0.25s",
          }}>
            {t === "Quote" ? "💬 Quotes" : "🔬 Facts"}
          </button>
        ))}
      </div>

      {/* Card with flip animation */}
      <div style={{
        width: "100%", maxWidth: 480,
        animation: flip ? "cardFlipOut 0.35s ease forwards" : "cardFlipIn 0.35s ease forwards",
        perspective: "1000px",
      }}>
        <div style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 28, padding: "44px 32px 36px",
          minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Glow effects */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, background: "radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 180, height: 180, background: "radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

          {tab === "Quote" && current ? (
            <>
              <div style={{ fontSize: 60, color: "rgba(245,200,66,0.2)", lineHeight: 1, marginBottom: 8 }}>"</div>
              <p style={{ fontSize: 20, lineHeight: 1.75, color: "#f0ede6", margin: "0 0 28px", fontStyle: "italic", position: "relative", zIndex: 1 }}>{current.text}</p>
              <div style={{ fontSize: 13, color: "#f5c842", letterSpacing: "0.1em" }}>— {current.author}</div>
            </>
          ) : tab === "Fact" && current ? (
            <>
              <div style={{ fontSize: 60, marginBottom: 20 }}>{current.emoji}</div>
              <p style={{ fontSize: 19, lineHeight: 1.75, color: "#f0ede6", margin: 0, position: "relative", zIndex: 1 }}>{current.text}</p>
            </>
          ) : null}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={handleSave} style={{
            flex: 1, padding: "15px", borderRadius: 18,
            border: liked ? "none" : "1.5px solid rgba(255,255,255,0.1)",
            background: liked ? "rgba(245,200,66,0.15)" : "rgba(255,255,255,0.04)",
            color: liked ? "#f5c842" : "#666", fontSize: 22,
            cursor: "pointer", transition: "all 0.2s",
          }}>
            {liked ? "★" : "☆"}
          </button>
          <button onClick={next} style={{
            flex: 3, padding: "15px", borderRadius: 18, border: "none",
            background: "linear-gradient(135deg, #f5c842 0%, #f5a623 100%)",
            color: "#0a0a0f", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 8px 28px rgba(245,200,66,0.4)",
            letterSpacing: "0.05em", transition: "transform 0.1s",
          }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Next {tab === "Quote" ? "Quote" : "Fact"} →
          </button>
        </div>
      </div>

      {/* Ad banner */}
      <div style={{ width: "100%", maxWidth: 480, marginTop: 28, background: "rgba(255,255,255,0.03)", border: `1px solid ${ad.accent}30`, borderRadius: 18, padding: "15px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
        <div>
          <div style={{ fontSize: 9, color: ad.accent, marginBottom: 4, letterSpacing: "0.2em" }}>{ad.label}</div>
          <div style={{ fontSize: 13, color: "#ccc" }}>{ad.text}</div>
        </div>
        <div style={{ background: ad.accent, color: "#fff", fontSize: 10, padding: "7px 14px", borderRadius: 10, whiteSpace: "nowrap", marginLeft: 16, fontWeight: 700 }}>Learn More</div>
      </div>

      {/* Footer */}
      <div style={{ width: "100%", maxWidth: 480, marginTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#333" }}>© 2025 Daily Spark</div>
        <div style={{ display: "flex", gap: 16 }}>
          {[["about", "About"], ["privacy", "Privacy"]].map(([p, l]) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", color: "#444", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
          ))}
          <button onClick={() => setUser(null)} style={{ background: "none", border: "none", color: "#444", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}
