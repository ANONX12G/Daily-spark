import { useState, useCallback } from "react";

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Spread love everywhere you go.", author: "Mother Teresa" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
];

const facts = [
  { text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.", emoji: "🍯" },
  { text: "A group of flamingos is called a flamboyance.", emoji: "🦩" },
  { text: "Octopuses have three hearts and blue blood.", emoji: "🐙" },
  { text: "The shortest war in history lasted only 38 minutes.", emoji: "⚔️" },
  { text: "Bananas are technically berries, but strawberries are not.", emoji: "🍌" },
  { text: "A day on Venus is longer than a year on Venus.", emoji: "🌌" },
  { text: "Cleopatra lived closer in time to the Moon landing than to the Great Pyramid.", emoji: "🏛️" },
  { text: "The human nose can detect over 1 trillion different smells.", emoji: "👃" },
  { text: "There are more stars in the universe than grains of sand on all beaches.", emoji: "✨" },
  { text: "Crows can recognize human faces and hold grudges.", emoji: "🐦" },
  { text: "The inventor of the Pringles can is buried in one.", emoji: "🥔" },
  { text: "A bolt of lightning is five times hotter than the surface of the Sun.", emoji: "⚡" },
];

const ads = [
  { label: "SPONSORED", text: "Boost your productivity with FocusFlow Pro", bg: "#1a1a2e", accent: "#e94560" },
  { label: "AD", text: "Try MindfulMe — 7 days free meditation", bg: "#0f3460", accent: "#e94560" },
  { label: "SPONSORED", text: "Learn anything in 10 mins/day with Shortform", bg: "#16213e", accent: "#f5a623" },
  { label: "AD", text: "Unlock your potential with CoachAI — Free trial", bg: "#1a1a2e", accent: "#00d4aa" },
];

export default function App() {
  const [tab, setTab] = useState("Quote");
  const [index, setIndex] = useState(0);
  const [adIndex, setAdIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [animating, setAnimating] = useState(false);

  const currentData = tab === "Quote" ? quotes : facts;
  const current = currentData[index % currentData.length];
  const ad = ads[adIndex % ads.length];

  const next = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % currentData.length);
      setLiked(false);
      setAdIndex((a) => (a + 1) % ads.length);
      setAnimating(false);
    }, 300);
  }, [currentData.length]);

  const switchTab = (t) => {
    if (t === tab) return;
    setAnimating(true);
    setTimeout(() => {
      setTab(t);
      setIndex(0);
      setLiked(false);
      setAnimating(false);
    }, 200);
  };

  const handleSave = () => {
    const item = { ...current, type: tab };
    const alreadySaved = saved.some((s) => s.text === item.text);
    if (!alreadySaved) setSaved((prev) => [item, ...prev]);
    setLiked(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a0f 0%, #12121e 60%, #0d1b2a 100%)", fontFamily: "Georgia, serif", color: "#f0ede6", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px 40px" }}>
      <div style={{ width: "100%", maxWidth: 480, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0 20px" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#f5c842" }}>Daily Spark</div>
          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", marginTop: 2 }}>Ignite your day</div>
        </div>
        <button onClick={() => setShowSaved(!showSaved)} style={{ background: showSaved ? "#f5c842" : "transparent", border: "1.5px solid #f5c842", color: showSaved ? "#0a0a0f" : "#f5c842", borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          Saved {saved.length > 0 && `(${saved.length})`}
        </button>
      </div>
      <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 30, padding: 4, gap: 2, marginBottom: 28, width: "100%", maxWidth: 280 }}>
        {["Quote", "Fact"].map((t) => (
          <button key={t} onClick={() => switchTab(t)} style={{ flex: 1, padding: "9px 0", borderRadius: 26, border: "none", background: tab === t ? "#f5c842" : "transparent", color: tab === t ? "#0a0a0f" : "#aaa", fontWeight: tab === t ? 700 : 400, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            {t === "Quote" ? "Quotes" : "Fun Facts"}
          </button>
        ))}
      </div>
      {!showSaved && (
        <div style={{ width: "100%", maxWidth: 480, opacity: animating ? 0 : 1, transition: "all 0.3s ease" }}>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "40px 32px 32px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {tab === "Quote" ? (
              <>
                <div style={{ fontSize: 48, color: "rgba(245,200,66,0.3)", lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ fontSize: 20, lineHeight: 1.65, color: "#f0ede6", margin: "0 0 24px", fontStyle: "italic" }}>{current.text}</p>
                <div style={{ fontSize: 13, color: "#f5c842" }}>— {current.author}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 52, marginBottom: 16 }}>{current.emoji}</div>
                <p style={{ fontSize: 19, lineHeight: 1.65, color: "#f0ede6", margin: 0 }}>{current.text}</p>
              </>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button onClick={handleSave} style={{ flex: 1, padding: "14px", borderRadius: 16, border: "1.5px solid rgba(255,255,255,0.15)", background: liked ? "rgba(245,200,66,0.15)" : "transparent", color: liked ? "#f5c842" : "#aaa", fontSize: 18, cursor: "pointer" }}>
              {liked ? "Saved!" : "Save"}
            </button>
            <button onClick={next} style={{ flex: 2, padding: "14px", borderRadius: 16, border: "none", background: "linear-gradient(135deg, #f5c842 0%, #f5a623 100%)", color: "#0a0a0f", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Next {tab === "Quote" ? "Quote" : "Fact"}
            </button>
          </div>
        </div>
      )}
      {showSaved && (
        <div style={{ width: "100%", maxWidth: 480 }}>
          <h3 style={{ color: "#f5c842", fontSize: 16, marginBottom: 16 }}>Your Saved Collection</h3>
          {saved.length === 0 ? (
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "32px", textAlign: "center", color: "#666", fontSize: 14 }}>Nothing saved yet. Hit Save on a quote or fact!</div>
          ) : saved.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "18px 20px", marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#f5c842", marginBottom: 6 }}>{item.type === "Quote" ? "QUOTE" : "FUN FACT"}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{item.text}</p>
              {item.author && <div style={{ marginTop: 8, fontSize: 12, color: "#f5c842" }}>— {item.author}</div>}
            </div>
          ))}
        </div>
      )}
      <div style={{ width: "100%", maxWidth: 480, marginTop: 28, background: ad.bg, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
        <div>
          <div style={{ fontSize: 9, color: ad.accent, marginBottom: 4 }}>{ad.label}</div>
          <div style={{ fontSize: 13, color: "#ddd" }}>{ad.text}</div>
        </div>
        <div style={{ background: ad.accent, color: "#fff", fontSize: 10, padding: "5px 10px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 12 }}>Learn More</div>
      </div>
      <div style={{ marginTop: 10, fontSize: 10, color: "#444", textAlign: "center" }}>Ads help keep Daily Spark free</div>
    </div>
  );
}