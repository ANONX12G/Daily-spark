import { useState, useEffect, useCallback, useRef } from "react";

const ALL_QUOTES = {
  motivation: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "All our dreams can come true if we have the courage to pursue them.", author: "Walt Disney" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Opportunities don't happen, you create them.", author: "Chris Grosser" },
    { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  ],
  wisdom: [
    { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "An unexamined life is not worth living.", author: "Socrates" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
    { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", author: "Eleanor Roosevelt" },
    { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Well done is better than well said.", author: "Benjamin Franklin" },
    { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
  ],
  love: [
    { text: "Spread love everywhere you go.", author: "Mother Teresa" },
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
    { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
    { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
    { text: "Being deeply loved by someone gives you strength.", author: "Lao Tzu" },
    { text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss" },
    { text: "Love is not about how many days, months, or years you have been together. It is about how much you love each other every day.", author: "Anonymous" },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi" },
    { text: "Life is the flower for which love is the honey.", author: "Victor Hugo" },
    { text: "The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart.", author: "Helen Keller" },
  ],
  success: [
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
    { text: "Try not to become a person of success, but rather try to become a person of value.", author: "Albert Einstein" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
    { text: "The ones who are crazy enough to think they can change the world, are the ones that do.", author: "Steve Jobs" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "If you really want to do something, you'll find a way.", author: "Jim Rohn" },
  ],
};

const FACTS = [
  { text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.", emoji: "🍯" },
  { text: "A group of flamingos is called a flamboyance.", emoji: "🦩" },
  { text: "Octopuses have three hearts and blue blood.", emoji: "🐙" },
  { text: "The shortest war in history lasted only 38 minutes between Britain and Zanzibar in 1896.", emoji: "⚔️" },
  { text: "Bananas are technically berries, but strawberries are not.", emoji: "🍌" },
  { text: "A day on Venus is longer than a year on Venus.", emoji: "🌌" },
  { text: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.", emoji: "🏛️" },
  { text: "The human nose can detect over 1 trillion different smells.", emoji: "👃" },
  { text: "There are more stars in the universe than grains of sand on all of Earth's beaches.", emoji: "✨" },
  { text: "Crows can recognize human faces and hold grudges.", emoji: "🐦" },
  { text: "The inventor of the Pringles can is buried in one.", emoji: "🥔" },
  { text: "A bolt of lightning is five times hotter than the surface of the Sun.", emoji: "⚡" },
  { text: "A snail can sleep for 3 years.", emoji: "🐌" },
  { text: "Elephants are the only animals that cannot jump.", emoji: "🐘" },
  { text: "Butterflies taste with their feet.", emoji: "🦋" },
  { text: "Hot water freezes faster than cold water. This is known as the Mpemba effect.", emoji: "❄️" },
  { text: "The average person laughs 13 times a day.", emoji: "😂" },
  { text: "Apples are more effective at waking you up than coffee.", emoji: "🍎" },
  { text: "A group of owls is called a parliament.", emoji: "🦉" },
  { text: "The human heart beats about 100,000 times per day.", emoji: "❤️" },
];

const CATEGORIES = [
  { id: "motivation", label: "🔥 Motivation", color: "#f5a623" },
  { id: "wisdom", label: "🧠 Wisdom", color: "#00d4aa" },
  { id: "love", label: "❤️ Love", color: "#e94560" },
  { id: "success", label: "💎 Success", color: "#a78bfa" },
];

const ads = [
  { label: "SPONSORED", text: "Boost your productivity with FocusFlow Pro", bg: "#1a1a2e", accent: "#e94560" },
  { label: "AD", text: "Try MindfulMe — 7 days free meditation", bg: "#0f3460", accent: "#e94560" },
  { label: "SPONSORED", text: "Learn anything in 10 mins/day with Shortform", bg: "#16213e", accent: "#f5a623" },
  { label: "AD", text: "Unlock your potential with CoachAI — Free trial", bg: "#1a1a2e", accent: "#00d4aa" },
];

// ─── Splash Screen ───────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => onDone(), 2800);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0f 70%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transition: "opacity 0.6s ease",
      opacity: phase === 3 ? 0 : 1,
    }}>
      {/* Particle rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: "absolute",
          width: i * 140, height: i * 140,
          border: `1px solid rgba(245,200,66,${0.15 / i})`,
          borderRadius: "50%",
          animation: `pulse ${1 + i * 0.5}s ease-in-out infinite`,
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 0.5s ease",
        }} />
      ))}

      <div style={{
        fontSize: 64,
        transform: phase >= 1 ? "scale(1) rotate(0deg)" : "scale(0) rotate(-180deg)",
        transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        marginBottom: 20,
        filter: "drop-shadow(0 0 30px rgba(245,200,66,0.8))",
      }}>✦</div>

      <div style={{
        fontSize: 36,
        fontWeight: 800,
        fontFamily: "Georgia, serif",
        color: "#f5c842",
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
        letterSpacing: "0.1em",
        textShadow: "0 0 40px rgba(245,200,66,0.5)",
      }}>Daily Spark</div>

      <div style={{
        fontSize: 13,
        color: "#888",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        opacity: phase >= 2 ? 1 : 0,
        transition: "opacity 0.6s ease 0.2s",
        marginTop: 8,
      }}>Ignite Your Day</div>

      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.05)} }`}</style>
    </div>
  );
}

// ─── Auth Screen ──────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)", color: "#f0ede6",
    fontSize: 15, fontFamily: "Georgia, serif", outline: "none",
    boxSizing: "border-box", marginBottom: 12,
  };

  const handleSubmit = () => {
    if (!email || !password) { setError("Please fill in all fields"); return; }
    if (mode === "signup" && !name) { setError("Please enter your name"); return; }
    const users = JSON.parse(localStorage.getItem("ds_users") || "{}");
    if (mode === "signup") {
      if (users[email]) { setError("Email already exists"); return; }
      users[email] = { name, password, saved: [], streak: 0, lastVisit: null, categories: ["motivation"] };
      localStorage.setItem("ds_users", JSON.stringify(users));
      onAuth({ email, ...users[email] });
    } else {
      if (!users[email] || users[email].password !== password) { setError("Invalid email or password"); return; }
      onAuth({ email, ...users[email] });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1a0a2e 0%, #0a0a0f 60%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "0 24px", fontFamily: "Georgia, serif",
    }}>
      <div style={{ fontSize: 40, marginBottom: 8, filter: "drop-shadow(0 0 20px rgba(245,200,66,0.6))" }}>✦</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#f5c842", marginBottom: 4, letterSpacing: "0.05em" }}>Daily Spark</div>
      <div style={{ fontSize: 12, color: "#666", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40 }}>Your daily dose of inspiration</div>

      <div style={{
        width: "100%", maxWidth: 400,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24, padding: "32px 28px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{ display: "flex", marginBottom: 28, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 4 }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
              flex: 1, padding: "10px", border: "none", borderRadius: 10,
              background: mode === m ? "#f5c842" : "transparent",
              color: mode === m ? "#0a0a0f" : "#888",
              fontWeight: mode === m ? 700 : 400, fontSize: 13,
              cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.2s",
            }}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {mode === "signup" && (
          <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        )}
        <input placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} type="email" />
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} type="password" />

        {error && <div style={{ color: "#e94560", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</div>}

        <button onClick={handleSubmit} style={{
          width: "100%", padding: "15px",
          background: "linear-gradient(135deg, #f5c842 0%, #f5a623 100%)",
          border: "none", borderRadius: 14,
          color: "#0a0a0f", fontSize: 16, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 8px 24px rgba(245,200,66,0.3)",
          transition: "transform 0.1s",
        }}>
          {mode === "login" ? "Sign In →" : "Create Account →"}
        </button>

        <button onClick={() => onAuth({ email: "guest", name: "Guest", saved: [], streak: 0, lastVisit: null, categories: ["motivation"] })} style={{
          width: "100%", padding: "12px", background: "transparent",
          border: "none", color: "#555", fontSize: 13,
          cursor: "pointer", fontFamily: "inherit", marginTop: 12,
        }}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

// ─── Category Picker ──────────────────────────────────────────────────────────
function CategoryPicker({ selected, onSave }) {
  const [picks, setPicks] = useState(selected);
  const toggle = (id) => setPicks(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1a0a2e 0%, #0a0a0f 60%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "0 24px", fontFamily: "Georgia, serif",
    }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>🎯</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#f5c842", marginBottom: 8 }}>Pick Your Vibe</div>
      <div style={{ fontSize: 14, color: "#888", marginBottom: 32, textAlign: "center" }}>Choose the types of content you love</div>

      <div style={{ width: "100%", maxWidth: 400, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => toggle(cat.id)} style={{
            padding: "20px 16px", borderRadius: 16,
            border: picks.includes(cat.id) ? `2px solid ${cat.color}` : "2px solid rgba(255,255,255,0.08)",
            background: picks.includes(cat.id) ? `${cat.color}22` : "rgba(255,255,255,0.04)",
            color: picks.includes(cat.id) ? cat.color : "#888",
            fontSize: 15, fontWeight: picks.includes(cat.id) ? 700 : 400,
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s",
          }}>
            {cat.label}
          </button>
        ))}
      </div>

      <button onClick={() => onSave(picks.length ? picks : ["motivation"])} style={{
        width: "100%", maxWidth: 400, padding: "15px",
        background: "linear-gradient(135deg, #f5c842 0%, #f5a623 100%)",
        border: "none", borderRadius: 14,
        color: "#0a0a0f", fontSize: 16, fontWeight: 700,
        cursor: "pointer", fontFamily: "inherit",
        boxShadow: "0 8px 24px rgba(245,200,66,0.3)",
      }}>
        Let's Go! ✦
      </button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [tab, setTab] = useState("Quote");
  const [page, setPage] = useState("home");
  const [catIndex, setCatIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [adIndex, setAdIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showStreak, setShowStreak] = useState(false);

  const userCategories = user?.categories || ["motivation"];
  const allSelectedQuotes = userCategories.flatMap(c => ALL_QUOTES[c] || []);
  const current = tab === "Quote" ? allSelectedQuotes[quoteIndex % allSelectedQuotes.length] : FACTS[factIndex % FACTS.length];
  const ad = ads[adIndex % ads.length];
  const streak = user?.streak || 0;

  const updateUser = (updates) => {
    if (!user || user.email === "guest") return;
    const users = JSON.parse(localStorage.getItem("ds_users") || "{}");
    users[user.email] = { ...users[user.email], ...updates };
    localStorage.setItem("ds_users", JSON.stringify(users));
    setUser(prev => ({ ...prev, ...updates }));
  };

  const handleAuth = (u) => {
    const today = new Date().toDateString();
    let newStreak = u.streak || 0;
    if (u.lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      newStreak = u.lastVisit === yesterday ? newStreak + 1 : 1;
      if (u.email !== "guest") {
        const users = JSON.parse(localStorage.getItem("ds_users") || "{}");
        if (users[u.email]) {
          users[u.email].streak = newStreak;
          users[u.email].lastVisit = today;
          localStorage.setItem("ds_users", JSON.stringify(users));
        }
      }
    }
    setUser({ ...u, streak: newStreak, lastVisit: today });
    setShowStreak(newStreak > 1);
    setTimeout(() => setShowStreak(false), 3000);
  };

  const next = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      if (tab === "Quote") setQuoteIndex(i => (i + 1) % allSelectedQuotes.length);
      else setFactIndex(i => (i + 1) % FACTS.length);
      setLiked(false);
      setAdIndex(a => (a + 1) % ads.length);
      setAnimating(false);
    }, 300);
  }, [tab, allSelectedQuotes.length]);

  const handleSave = () => {
    if (!current) return;
    const item = { ...current, type: tab };
    const saved = user?.saved || [];
    const alreadySaved = saved.some(s => s.text === item.text);
    if (!alreadySaved) {
      const newSaved = [item, ...saved];
      updateUser({ saved: newSaved });
      setUser(prev => ({ ...prev, saved: newSaved }));
    }
    setLiked(true);
  };

  if (splash) return <SplashScreen onDone={() => setSplash(false)} />;
  if (!user) return <AuthScreen onAuth={handleAuth} />;
  if (showCategoryPicker) return <CategoryPicker selected={user.categories || ["motivation"]} onSave={(cats) => { updateUser({ categories: cats }); setUser(p => ({...p, categories: cats})); setShowCategoryPicker(false); }} />;

  const bg = "radial-gradient(ellipse at top left, #1a0a2e 0%, #0a0a0f 50%, #0d1b2a 100%)";

  if (page === "about") return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "Georgia, serif", color: "#f0ede6", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px 40px" }}>
      <div style={{ width: "100%", maxWidth: 480, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f5c842" }}>✦ Daily Spark</div>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "#f5c842", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>← Back</button>
      </div>
      <div style={{ width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px 24px" }}>
        <h2 style={{ color: "#f5c842", marginBottom: 16 }}>About Daily Spark</h2>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 15 }}>Daily Spark is a free app that delivers motivational quotes and fun facts to inspire and educate you every day.</p>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 15, marginTop: 12 }}>Our mission is simple — to give you a spark of motivation and curiosity every time you visit.</p>
        <h3 style={{ color: "#f5c842", marginTop: 24, marginBottom: 8 }}>Contact Us</h3>
        <p style={{ color: "#ccc", fontSize: 15 }}>Email: ignitedailyspark@gmail.com</p>
      </div>
    </div>
  );

  if (page === "privacy") return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "Georgia, serif", color: "#f0ede6", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px 40px" }}>
      <div style={{ width: "100%", maxWidth: 480, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f5c842" }}>✦ Daily Spark</div>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "#f5c842", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>← Back</button>
      </div>
      <div style={{ width: "100%", maxWidth: 480, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px 24px" }}>
        <h2 style={{ color: "#f5c842", marginBottom: 8 }}>Privacy Policy</h2>
        <p style={{ color: "#888", fontSize: 12, marginBottom: 16 }}>Last updated: June 2025</p>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>Daily Spark is committed to protecting your privacy. This app does not collect personal information beyond what you provide during signup, which is stored locally on your device.</p>
        <h3 style={{ color: "#f5c842", marginTop: 20, marginBottom: 8, fontSize: 15 }}>Advertising</h3>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>We use Google AdSense to display advertisements. Google may use cookies to serve relevant ads. You may opt out via Google's Ads Settings.</p>
        <h3 style={{ color: "#f5c842", marginTop: 20, marginBottom: 8, fontSize: 15 }}>Contact</h3>
        <p style={{ lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>ignitedailyspark@gmail.com</p>
      </div>
    </div>
  );

  if (page === "saved") return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "Georgia, serif", color: "#f0ede6", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px 40px" }}>
      <div style={{ width: "100%", maxWidth: 480, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f5c842" }}>✦ Saved</div>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "#f5c842", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>← Back</button>
      </div>
      <div style={{ width: "100%", maxWidth: 480 }}>
        {(user?.saved || []).length === 0 ? (
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "40px", textAlign: "center", color: "#666" }}>Nothing saved yet. Hit Save on a quote or fact!</div>
        ) : (user?.saved || []).map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "18px 20px", marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "#f5c842", marginBottom: 6 }}>{item.type === "Quote" ? "💬 QUOTE" : "🔬 FUN FACT"}</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, fontStyle: item.type === "Quote" ? "italic" : "normal" }}>{item.text}</p>
            {item.author && <div style={{ marginTop: 8, fontSize: 12, color: "#f5c842" }}>— {item.author}</div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "Georgia, serif", color: "#f0ede6", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px 40px", position: "relative" }}>

      {/* Streak toast */}
      {showStreak && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #f5c842, #f5a623)",
          color: "#0a0a0f", padding: "12px 24px", borderRadius: 100,
          fontWeight: 700, fontSize: 14, zIndex: 1000,
          boxShadow: "0 8px 32px rgba(245,200,66,0.4)",
          animation: "slideDown 0.4s ease",
        }}>
          🔥 {streak} day streak! Keep it up!
        </div>
      )}

      {/* Header */}
      <div style={{ width: "100%", maxWidth: 480, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0 16px" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#f5c842", letterSpacing: "0.04em" }}>✦ Daily Spark</div>
          <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Hey {user.name || "there"} 👋
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setShowCategoryPicker(true)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 12px", color: "#aaa", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
            🎯 Vibe
          </button>
          <div style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 20, padding: "6px 12px", color: "#f5a623", fontSize: 11, fontWeight: 700 }}>
            🔥 {streak}
          </div>
          <button onClick={() => setPage("saved")} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 12px", color: "#aaa", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
            ★ {(user?.saved || []).length}
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ width: "100%", maxWidth: 480, display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {CATEGORIES.filter(c => userCategories.includes(c.id)).map(cat => (
          <button key={cat.id} onClick={() => { setCatIndex(CATEGORIES.indexOf(cat)); setQuoteIndex(0); }} style={{
            padding: "6px 14px", borderRadius: 20, border: "none", whiteSpace: "nowrap",
            background: `${cat.color}22`, color: cat.color, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
          }}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 30, padding: 4, gap: 2, marginBottom: 24, width: "100%", maxWidth: 280 }}>
        {["Quote", "Fact"].map(t => (
          <button key={t} onClick={() => { setTab(t); setLiked(false); }} style={{
            flex: 1, padding: "9px 0", borderRadius: 26, border: "none",
            background: tab === t ? "#f5c842" : "transparent",
            color: tab === t ? "#0a0a0f" : "#aaa",
            fontWeight: tab === t ? 700 : 400, fontSize: 13,
            cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
          }}>
            {t === "Quote" ? "💬 Quotes" : "🔬 Fun Facts"}
          </button>
        ))}
      </div>

      {/* Main card */}
      <div style={{ width: "100%", maxWidth: 480, opacity: animating ? 0 : 1, transform: animating ? "translateY(16px) scale(0.97)" : "translateY(0) scale(1)", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        <div style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 28, padding: "44px 32px 36px",
          minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

          {tab === "Quote" && current ? (
            <>
              <div style={{ fontSize: 56, color: "rgba(245,200,66,0.25)", lineHeight: 1, marginBottom: 8, fontFamily: "serif" }}>"</div>
              <p style={{ fontSize: 20, lineHeight: 1.7, color: "#f0ede6", margin: "0 0 28px", fontStyle: "italic", position: "relative", zIndex: 1 }}>{current.text}</p>
              <div style={{ fontSize: 13, color: "#f5c842", letterSpacing: "0.08em" }}>— {current.author}</div>
            </>
          ) : tab === "Fact" && current ? (
            <>
              <div style={{ fontSize: 56, marginBottom: 20 }}>{current.emoji}</div>
              <p style={{ fontSize: 19, lineHeight: 1.7, color: "#f0ede6", margin: 0, position: "relative", zIndex: 1 }}>{current.text}</p>
            </>
          ) : null}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={handleSave} style={{
            flex: 1, padding: "15px", borderRadius: 18,
            border: liked ? "none" : "1.5px solid rgba(255,255,255,0.12)",
            background: liked ? "rgba(245,200,66,0.15)" : "rgba(255,255,255,0.04)",
            color: liked ? "#f5c842" : "#888", fontSize: 18, cursor: "pointer",
            transition: "all 0.2s",
          }}>
            {liked ? "★" : "☆"}
          </button>
          <button onClick={next} style={{
            flex: 3, padding: "15px", borderRadius: 18, border: "none",
            background: "linear-gradient(135deg, #f5c842 0%, #f5a623 100%)",
            color: "#0a0a0f", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 8px 24px rgba(245,200,66,0.35)",
            letterSpacing: "0.04em",
          }}>
            Next {tab === "Quote" ? "Quote" : "Fact"} →
          </button>
        </div>
      </div>

      {/* Ad banner */}
      <div style={{ width: "100%", maxWidth: 480, marginTop: 28, background: ad.bg, border: `1px solid ${ad.accent}33`, borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
        <div>
          <div style={{ fontSize: 9, color: ad.accent, marginBottom: 4, letterSpacing: "0.15em" }}>{ad.label}</div>
          <div style={{ fontSize: 13, color: "#ddd" }}>{ad.text}</div>
        </div>
        <div style={{ background: ad.accent, color: "#fff", fontSize: 10, padding: "6px 12px", borderRadius: 8, whiteSpace: "nowrap", marginLeft: 12 }}>Learn More</div>
      </div>

      {/* Footer */}
      <div style={{ width: "100%", maxWidth: 480, marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#333" }}>© 2025 Daily Spark</div>
        <div style={{ display: "flex", gap: 16 }}>
          {["about", "privacy"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", color: "#444", fontSize: 10, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>{p === "about" ? "About" : "Privacy"}</button>
          ))}
          <button onClick={() => { setUser(null); }} style={{ background: "none", border: "none", color: "#444", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>Sign Out</button>
        </div>
      </div>

      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      `}</style>
    </div>
  );
}
