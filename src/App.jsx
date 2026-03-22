import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const chilies = [
  { 
    name: "Ancho", 
    aka: "Dried Poblano", 
    color: "#4a1a00",
    image: "https://m.media-amazon.com/images/I/81MS-MCAGOL._AC_UF894,1000_QL80_.jpg",
    knownRatings: {
      flavorDepth: 5,
      earthiness: 4,
      fruitiness: 4,
      smokiness: 2,
      sweetness: 4,
      heatLevel: 1,
      colorRating: 3,
    },
    scoville: [1000, 2000],
    flavorNotes: ["Dark chocolate", "Dried plum", "Coffee", "Earthy sweetness"],
    bodyDesc: "The most widely used dried chili in Mexican cuisine. Thick, wrinkled, and almost black. Provides rich body and deep sweetness to moles and adobos.",
    bestFor: ["Mole negro", "Enchilada sauce", "Adobo"],
    rehydrateMethod: {
      water: "180°F (82°C)",
      onHeat: "5 min simmer, then 15–20 min off heat",
      offHeat: "25–30 min steep in hot water"
    },
    rehydrateTip: "Toast lightly first — just until fragrant. Hot water, not boiling. The flesh should be pliable but not mushy.",
    aromaStages: {
      dry: "Subtle dried fruit, faint cocoa",
      soaking: "Prune and coffee emerge",
      rehydrated: "Full chocolate, tobacco, raisin"
    },
    profileCode: "F8-S2-A7"
  },
  { 
    name: "Pasilla", 
    aka: "Chile Negro", 
    color: "#1e0a00",
    image: "https://i.etsystatic.com/27726359/r/il/b30c98/3839715925/il_fullxfull.3839715925_hx53.jpg",
    knownRatings: {
      flavorDepth: 4,
      earthiness: 5,
      fruitiness: 4,
      smokiness: 1,
      sweetness: 2,
      heatLevel: 2,
      colorRating: 6,
    },
    scoville: [1000, 2500],
    flavorNotes: ["Dried berry", "Herbs", "Earthy", "Mild chocolate"],
    bodyDesc: "Long, narrow, and very dark. 'Pasilla' means 'little raisin' — its raisin-like aroma is unmistakable. Essential for authentic mole negro.",
    bestFor: ["Mole negro", "Pasilla sauce", "Black bean dishes"],
    rehydrateMethod: {
      water: "175°F (79°C)",
      onHeat: "3 min simmer, then 12–15 min off heat",
      offHeat: "20–25 min steep in hot water"
    },
    rehydrateTip: "Very thin flesh — be careful not to over-toast. A quick 30-second toast is enough. Stems are tough, remove before blending.",
    aromaStages: {
      dry: "Dusty raisin, dried herbs",
      soaking: "Wine-like, earthy notes rise",
      rehydrated: "Raisin, cocoa, herbal finish"
    },
    profileCode: "F7-S3-A7"
  },
  { 
    name: "Guajillo", 
    aka: "Dried Mirasol", 
    color: "#8b1a00",
    image: "https://m.media-amazon.com/images/I/71hJ9jM5y6L._AC_UF894,1000_QL80_.jpg",
    knownRatings: {
      flavorDepth: 3,
      earthiness: 2,
      fruitiness: 5,
      smokiness: 1,
      sweetness: 3,
      heatLevel: 3,
      colorRating: 1,
    },
    scoville: [2500, 5000],
    flavorNotes: ["Tangy berry", "Tea", "Tomato", "Mild heat"],
    bodyDesc: "Smooth, brick-red skin that gives sauces a gorgeous color. The workhorse of Mexican cooking — bright, tangy, and incredibly versatile.",
    bestFor: ["Birria", "Chile colorado", "Red salsa", "Marinades"],
    rehydrateMethod: {
      water: "180°F (82°C)",
      onHeat: "3 min simmer, then 10–12 min off heat",
      offHeat: "15–20 min steep in hot water"
    },
    rehydrateTip: "Thin skin soaks fast. Toast briefly over dry heat until it changes color. Strain after blending — skin can be papery.",
    aromaStages: {
      dry: "Subtle berry, slightly tannic",
      soaking: "Cranberry and tea emerge",
      rehydrated: "Bright berry, green tea finish"
    },
    profileCode: "F6-S4-A6"
  },
  { 
    name: "Chile de Árbol", 
    aka: "Bird's Beak Chile", 
    color: "#c41200",
    image: "https://i5.walmartimages.com/asr/39b27efc-a0ba-4652-aa3f-f3b3c3c1d04e.a58e19e946d6fc4cde2ee0ae7de85d2d.jpeg",
    knownRatings: {
      flavorDepth: 2,
      earthiness: 2,
      fruitiness: 2,
      smokiness: 2,
      sweetness: 1,
      heatLevel: 9,
      colorRating: 1,
    },
    scoville: [15000, 30000],
    flavorNotes: ["Bright heat", "Grassy", "Nutty", "Clean burn"],
    bodyDesc: "Small, thin, and intensely hot. Adds sharp, penetrating heat to salsas and oils. The heat is clean and direct — no slow build.",
    bestFor: ["Salsa roja", "Chile oil", "Taqueria-style hot sauce"],
    rehydrateMethod: {
      water: "180°F (82°C)",
      onHeat: "2 min simmer, then 5–8 min off heat",
      offHeat: "10–15 min steep in hot water"
    },
    rehydrateTip: "These are small — they rehydrate quickly. Can also be used dry-toasted and ground. Seeds carry most of the heat.",
    aromaStages: {
      dry: "Grassy, slightly nutty",
      soaking: "Hay-like, toasted notes",
      rehydrated: "Toasted nuts, clean grassiness"
    },
    profileCode: "F4-S7-A5"
  },
  { 
    name: "Chipotle", 
    aka: "Smoked Dried Jalapeño", 
    color: "#6b2c00",
    image: "https://i5.walmartimages.com/asr/e6c2cded-2cb0-4c4a-8ef9-5a2e58b726ee.e40daaa7f32e1fc0d2a96deb0f81dc3a.jpeg",
    knownRatings: {
      flavorDepth: 4,
      earthiness: 3,
      fruitiness: 2,
      smokiness: 5,
      sweetness: 2,
      heatLevel: 5,
      colorRating: 4,
    },
    scoville: [5000, 10000],
    flavorNotes: ["Heavy smoke", "Bacon", "Heat", "Dried fruit"],
    bodyDesc: "The only major Mexican dried chili that's smoked rather than sun-dried. Wrinkled, leathery, and unmistakably smoky. Transforms any dish.",
    bestFor: ["Adobo", "Smoked salsas", "Tinga", "BBQ-style braises"],
    rehydrateMethod: {
      water: "185°F (85°C)",
      onHeat: "5 min simmer, then 15–20 min off heat",
      offHeat: "25–30 min steep in hot water"
    },
    rehydrateTip: "Save every drop of soaking liquid — it's liquid smoke gold. Works in both rehydrated and canned-in-adobo forms.",
    aromaStages: {
      dry: "Intense mesquite smoke",
      soaking: "Bacon, leather emerge",
      rehydrated: "Full smoke, prune, campfire"
    },
    profileCode: "F7-S5-A9"
  },
  { 
    name: "Cascabel", 
    aka: "Rattle Chile", 
    color: "#5c1500",
    image: "https://i5.walmartimages.com/asr/6eb2cbd1-d116-4c20-8a75-6cbc5e9f65ee_1.bea58d37ebe59e62f74a0f4fbae25e2d.jpeg",
    knownRatings: {
      flavorDepth: 3,
      earthiness: 4,
      fruitiness: 2,
      smokiness: 2,
      sweetness: 2,
      heatLevel: 2,
      colorRating: 2,
    },
    scoville: [1500, 2500],
    flavorNotes: ["Nutty", "Woodsy", "Tobacco", "Mild heat"],
    bodyDesc: "Round, small, and named for the rattling sound of seeds inside. Mild and nutty — a supporting player that adds depth without dominating.",
    bestFor: ["Table salsas", "Soups", "Slow-cooked meats"],
    rehydrateMethod: {
      water: "180°F (82°C)",
      onHeat: "4 min simmer, then 10–12 min off heat",
      offHeat: "15–20 min steep in hot water"
    },
    rehydrateTip: "Toast until fragrant and oils begin to shimmer. The skin is thick — blend well or strain for smoother sauces.",
    aromaStages: {
      dry: "Faint woodsy, toasted seeds",
      soaking: "Nutty oils release",
      rehydrated: "Woodsy, tobacco, warm nuts"
    },
    profileCode: "F6-S4-A6"
  },
  { 
    name: "Morita", 
    aka: "Smoked Chipotle (young)", 
    color: "#7a1a00",
    image: "https://m.media-amazon.com/images/I/81btuQ3JDEL._AC_UF894,1000_QL80_.jpg",
    knownRatings: {
      flavorDepth: 4,
      earthiness: 2,
      fruitiness: 4,
      smokiness: 4,
      sweetness: 3,
      heatLevel: 5,
      colorRating: 2,
    },
    scoville: [5000, 10000],
    flavorNotes: ["Fruity smoke", "Berry", "Bright heat", "Cherry"],
    bodyDesc: "A younger, smaller smoked jalapeño than chipotle. Less leathery, more fruity. The smoke is present but doesn't overwhelm the brightness.",
    bestFor: ["Salsas", "Mole rojo", "Marinated meats"],
    rehydrateMethod: {
      water: "180°F (82°C)",
      onHeat: "3 min simmer, then 10–15 min off heat",
      offHeat: "15–25 min steep in hot water"
    },
    rehydrateTip: "Slightly thinner skin than chipotle. Responds well to a quick pan toast before soaking. Fruity notes shine in lighter sauces.",
    aromaStages: {
      dry: "Light smoke, berry hints",
      soaking: "Cherry and smoke intertwine",
      rehydrated: "Fruity smoke, cherry, warmth"
    },
    profileCode: "F6-S6-A7"
  },
];

const ATTRIBUTES = [
  { key: "flavorDepth", label: "Depth", icon: "◉" },
  { key: "earthiness", label: "Earth", icon: "◈" },
  { key: "fruitiness", label: "Fruit", icon: "◇" },
  { key: "smokiness", label: "Smoke", icon: "◎" },
  { key: "sweetness", label: "Sweet", icon: "◆" },
];

const COLOR_OPTIONS = [
  { value: 1, label: "Brick Red", color: "#8b1a00", desc: "Light, bright red" },
  { value: 2, label: "Deep Red", color: "#6b1a00", desc: "Rich, dark red" },
  { value: 3, label: "Burgundy", color: "#4a1a00", desc: "Wine-like, purple-red" },
  { value: 4, label: "Brown", color: "#3d1a00", desc: "Earthy brown tones" },
  { value: 5, label: "Dark Brown", color: "#2d1200", desc: "Deep chocolate brown" },
  { value: 6, label: "Near Black", color: "#1e0a00", desc: "Almost black" },
];

function HeatMeter({ level, interactive = false, onChange }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          onClick={() => interactive && onChange && onChange(i + 1)}
          style={{
            width: i < level ? "10px" : "6px",
            height: i < level ? "16px" : "10px",
            borderRadius: "2px",
            background: i < level
              ? `hsl(${10 + i * 3}, ${70 + i * 3}%, ${50 - i * 2}%)`
              : "rgba(255,255,255,0.1)",
            transition: "all 0.3s ease",
            marginTop: i < level ? "0" : "3px",
            cursor: interactive ? "pointer" : "default",
          }}
        />
      ))}
    </div>
  );
}

function AttributeSlider({ value, label, icon, onChange }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,220,160,0.6)" }}>
          {icon} {label.toUpperCase()}
        </span>
        <span style={{ fontSize: "11px", color: "#ffd080", fontFamily: "'Courier New', monospace", fontWeight: "600" }}>
          {value}/5
        </span>
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {[1, 2, 3, 4, 5].map(v => (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              flex: 1,
              height: "24px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              background: v <= value 
                ? "linear-gradient(90deg, rgba(255,140,60,0.6), rgba(255,200,80,0.9))"
                : "rgba(255,255,255,0.08)",
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AttributeBar({ value, label, icon }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,220,160,0.5)" }}>
          {icon} {label.toUpperCase()}
        </span>
        <span style={{ fontSize: "10px", color: "rgba(255,220,160,0.4)", fontFamily: "'Courier New', monospace" }}>
          {value.toFixed(1)}/5
        </span>
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${(value / 5) * 100}%`,
            background: "linear-gradient(90deg, rgba(255,140,60,0.6), rgba(255,200,80,0.9))",
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
}

function ProfileCodeDisplay({ code }) {
  const parts = code.split("-");
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {parts.map((part, i) => (
        <span key={i} style={{
          background: "rgba(255,208,128,0.15)",
          border: "1px solid rgba(255,208,128,0.3)",
          borderRadius: "4px",
          padding: "3px 6px",
          fontSize: "12px",
          fontFamily: "'Courier New', monospace",
          color: "#ffd080",
          fontWeight: "600",
        }}>
          {part}
        </span>
      ))}
    </div>
  );
}

function generateProfileCode(rating) {
  const fScore = Math.round((rating.flavorDepth + rating.earthiness + rating.fruitiness + rating.sweetness) / 4 * 2);
  const sScore = rating.heatLevel;
  const aScore = Math.round((rating.smokiness + rating.flavorDepth) / 2 * 2);
  return `F${fScore}-S${sScore}-A${aScore}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function JJsJuice() {
  const [selectedChili, setSelectedChili] = useState(chilies[0]);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [view, setView] = useState("rate"); // "rate" | "history" | "totals"
  const [reviewerName, setReviewerName] = useState("");
  const [notes, setNotes] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [ratings, setRatings] = useState({
    flavorDepth: 0,
    earthiness: 0,
    fruitiness: 0,
    smokiness: 0,
    sweetness: 0,
    heatLevel: 0,
    colorRating: 0,
  });
  const [allReviews, setAllReviews] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [contactMessage, setContactMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load reviews from Supabase on mount
  useEffect(() => {
    loadReviews();
  }, []);

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map database fields to frontend format
      const mappedData = (data || []).map(review => ({
        id: review.id,
        chili: review.chili,
        chiliColor: review.chili_color,
        reviewer: review.reviewer,
        date: review.created_at,
        ratings: review.ratings,
        profileCode: review.profile_code,
        notes: review.notes,
      }));
      
      setAllReviews(mappedData);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setSubmitMessage('Error loading reviews. Please refresh the page.');
      setTimeout(() => setSubmitMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setRatings({
      flavorDepth: 0,
      earthiness: 0,
      fruitiness: 0,
      smokiness: 0,
      sweetness: 0,
      heatLevel: 0,
      colorRating: 0,
    });
    setReviewerName("");
    setNotes("");
  };

  const handleSubmit = async () => {
    if (Object.values(ratings).some(v => v === 0)) {
      setSubmitMessage("Please rate all attributes before submitting.");
      setTimeout(() => setSubmitMessage(""), 3000);
      return;
    }
    
    try {
      const review = {
        chili: selectedChili.name,
        chili_color: selectedChili.color,
        reviewer: reviewerName || "Anonymous",
        ratings: ratings,
        profile_code: generateProfileCode(ratings),
        notes: notes,
      };
      
      const { data, error } = await supabase
        .from('reviews')
        .insert([review])
        .select();

      if (error) throw error;
      
      // Add the new review to the local state
      if (data && data.length > 0) {
        setAllReviews(prev => [data[0], ...prev]);
      }
      
      setSubmitMessage("Rating submitted successfully!");
      resetForm();
      setTimeout(() => setSubmitMessage(""), 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage("Error submitting review. Please try again.");
      setTimeout(() => setSubmitMessage(""), 3000);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.comment) {
      setContactMessage("Please fill in all fields.");
      setTimeout(() => setContactMessage(""), 3000);
      return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent("Contact from JJ's Juice");
    const body = encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.comment}`
    );
    const mailtoLink = `mailto:hello@austinmunichsocial.club?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form and close modal
    setContactForm({ name: "", email: "", comment: "" });
    setContactMessage("Opening your email client...");
    setTimeout(() => {
      setShowContactModal(false);
      setContactMessage("");
    }, 2000);
  };

  // Calculate cumulative ratings per chili
  const getCumulativeRatings = (chiliName) => {
    const chiliReviews = allReviews.filter(r => r.chili === chiliName);
    if (chiliReviews.length === 0) return null;
    
    const totals = {
      flavorDepth: 0,
      earthiness: 0,
      fruitiness: 0,
      smokiness: 0,
      sweetness: 0,
      heatLevel: 0,
      colorRating: 0,
      count: chiliReviews.length,
    };
    
    chiliReviews.forEach(review => {
      Object.keys(review.ratings).forEach(key => {
        totals[key] += review.ratings[key];
      });
    });
    
    return {
      flavorDepth: totals.flavorDepth / totals.count,
      earthiness: totals.earthiness / totals.count,
      fruitiness: totals.fruitiness / totals.count,
      smokiness: totals.smokiness / totals.count,
      sweetness: totals.sweetness / totals.count,
      heatLevel: totals.heatLevel / totals.count,
      colorRating: totals.colorRating / totals.count,
      count: totals.count,
    };
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0500",
      fontFamily: "'Georgia', serif",
      color: "#f5deb3",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,140,40,0.2)",
        padding: "clamp(16px, 4vw, 28px) clamp(16px, 4vw, 32px) clamp(12px, 3vw, 20px)",
        background: "linear-gradient(180deg, rgba(80,20,0,0.4) 0%, transparent 100%)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "0.25em", color: "rgba(255,180,60,0.5)", marginBottom: "8px" }}>
            ▸ REHYDRATED CHILE RATING SYSTEM
          </div>
          <h1 style={{
            margin: 0,
            fontSize: "clamp(24px, 7vw, 52px)",
            fontWeight: "400",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#ffd080",
            fontStyle: "italic",
          }}>
            JJ's Juice
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: "clamp(12px, 3vw, 14px)", color: "rgba(245,222,179,0.5)", fontStyle: "italic" }}>
            Rate, review, and discover rehydrated chile profiles
          </p>
          
          {/* View Toggle */}
          <div style={{ marginTop: "16px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              { id: "rate", label: "Rate a Chile", icon: "✦" },
              { id: "history", label: `History (${allReviews.length})`, icon: "◷" },
              { id: "totals", label: "Total Ratings", icon: "◎" },
              { id: "reference", label: "Reference Guide", icon: "◆" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                style={{
                  background: view === tab.id ? "rgba(255,140,40,0.2)" : "transparent",
                  border: `1px solid ${view === tab.id ? "rgba(255,140,40,0.4)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "6px",
                  padding: "clamp(6px, 2vw, 8px) clamp(10px, 3vw, 16px)",
                  fontSize: "clamp(10px, 2.5vw, 12px)",
                  color: view === tab.id ? "#ffd080" : "rgba(245,222,179,0.5)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.05em",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                  flex: "1 1 auto",
                  minWidth: "fit-content",
                  justifyContent: "center",
                }}
              >
                <span>{tab.icon}</span>
                {isMobile ? tab.label.split(' ')[0] : tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "rate" && (
        /* RATE VIEW */
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(12px, 3vw, 24px)", width: "100%", boxSizing: "border-box" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(200px, 280px) 1fr",
            gap: "clamp(12px, 3vw, 24px)"
          }}>
            {/* Chili List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "8px" }}>
                SELECT CHILI TO RATE
              </div>
              {chilies.map((chili, i) => {
                const isActive = selectedChili.name === chili.name;
                const isHovered = hoveredIdx === i;
                const reviewCount = allReviews.filter(r => r.chili === chili.name).length;
                return (
                  <button
                    key={chili.name}
                    onClick={() => { setSelectedChili(chili); resetForm(); }}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      background: isActive ? "rgba(255,140,40,0.12)" : isHovered ? "rgba(255,140,40,0.05)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(255,140,40,0.35)" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: "6px",
                      padding: "11px 14px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: chili.color,
                      border: `1px solid ${isActive ? "rgba(255,180,80,0.6)" : "rgba(255,255,255,0.15)"}`,
                      flexShrink: 0,
                      boxShadow: isActive ? `0 0 8px ${chili.color}` : "none",
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", color: isActive ? "#ffd080" : "rgba(245,222,179,0.8)" }}>
                        {chili.name}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(245,222,179,0.35)", marginTop: "2px" }}>
                        {chili.aka}
                      </div>
                    </div>
                    {reviewCount > 0 && (
                      <div style={{ 
                        fontSize: "10px", 
                        color: "rgba(255,180,60,0.5)",
                        background: "rgba(255,140,40,0.1)",
                        padding: "2px 6px",
                        borderRadius: "10px",
                      }}>
                        {reviewCount}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Rating Form */}
            <div>
              {/* Header */}
              <div style={{
                background: "linear-gradient(135deg, rgba(80,20,0,0.5) 0%, rgba(40,10,0,0.3) 100%)",
                border: "1px solid rgba(255,140,40,0.2)",
                borderRadius: "12px",
                padding: "24px 28px",
                marginBottom: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: selectedChili.color,
                    border: "2px solid rgba(255,180,80,0.4)",
                    boxShadow: `0 0 20px ${selectedChili.color}`,
                  }} />
                  <div>
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>
                      NOW RATING
                    </div>
                    <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "400", color: "#ffd080" }}>
                      {selectedChili.name}
                    </h2>
                    <p style={{ margin: "2px 0 0", color: "rgba(245,222,179,0.45)", fontStyle: "italic", fontSize: "13px" }}>
                      {selectedChili.aka}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviewer Name */}
              <div style={{
                background: "rgba(20,8,0,0.5)",
                border: "1px solid rgba(255,140,40,0.12)",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "16px",
              }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                  YOUR NAME (OPTIONAL)
                </div>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Anonymous"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,140,40,0.2)",
                    borderRadius: "6px",
                    padding: "12px 14px",
                    color: "#ffd080",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                {/* Flavor Attributes */}
                <div style={{
                  background: "rgba(20,8,0,0.5)",
                  border: "1px solid rgba(255,140,40,0.12)",
                  borderRadius: "10px",
                  padding: "20px",
                }}>
                  <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "16px" }}>
                    FLAVOR ATTRIBUTES
                  </div>
                  {ATTRIBUTES.map(attr => (
                    <AttributeSlider
                      key={attr.key}
                      value={ratings[attr.key]}
                      label={attr.label}
                      icon={attr.icon}
                      onChange={(v) => setRatings(prev => ({ ...prev, [attr.key]: v }))}
                    />
                  ))}
                </div>

                {/* Heat Level */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{
                    background: "rgba(20,8,0,0.5)",
                    border: "1px solid rgba(255,140,40,0.12)",
                    borderRadius: "10px",
                    padding: "20px",
                  }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                      HEAT LEVEL
                    </div>
                    <HeatMeter 
                      level={ratings.heatLevel} 
                      interactive={true}
                      onChange={(v) => setRatings(prev => ({ ...prev, heatLevel: v }))}
                    />
                    <div style={{ fontSize: "12px", color: "rgba(255,180,60,0.5)", marginTop: "8px", fontFamily: "'Courier New', monospace" }}>
                      {ratings.heatLevel}/10
                    </div>
                  </div>

                  {/* Color Rating */}
                  <div style={{
                    background: "rgba(20,8,0,0.5)",
                    border: "1px solid rgba(255,140,40,0.12)",
                    borderRadius: "10px",
                    padding: "20px",
                  }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                      COLOR
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "8px" }}>
                      {COLOR_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => setRatings(prev => ({ ...prev, colorRating: option.value }))}
                          style={{
                            background: ratings.colorRating === option.value 
                              ? "rgba(255,140,40,0.15)" 
                              : "rgba(255,255,255,0.03)",
                            border: `2px solid ${ratings.colorRating === option.value 
                              ? "rgba(255,140,40,0.5)" 
                              : "rgba(255,255,255,0.08)"}`,
                            borderRadius: "8px",
                            padding: "10px 8px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <div style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: option.color,
                            border: "2px solid rgba(255,255,255,0.2)",
                            boxShadow: ratings.colorRating === option.value 
                              ? `0 0 12px ${option.color}` 
                              : "none",
                          }} />
                          <span style={{ 
                            fontSize: "10px", 
                            color: ratings.colorRating === option.value 
                              ? "#ffd080" 
                              : "rgba(245,222,179,0.6)",
                            textAlign: "center",
                          }}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    {ratings.colorRating > 0 && (
                      <div style={{ 
                        marginTop: "10px", 
                        fontSize: "11px", 
                        color: "rgba(245,222,179,0.5)",
                        fontStyle: "italic",
                        textAlign: "center",
                      }}>
                        {COLOR_OPTIONS.find(o => o.value === ratings.colorRating)?.desc}
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div style={{
                    background: "rgba(20,8,0,0.5)",
                    border: "1px solid rgba(255,140,40,0.12)",
                    borderRadius: "10px",
                    padding: "20px",
                    flex: 1,
                  }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                      TASTING NOTES (OPTIONAL)
                    </div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe the flavors, aromas, and experience..."
                      style={{
                        width: "100%",
                        height: "80px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,140,40,0.2)",
                        borderRadius: "6px",
                        padding: "12px 14px",
                        color: "rgba(245,222,179,0.8)",
                        fontSize: "13px",
                        outline: "none",
                        resize: "none",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div style={{
                marginTop: "16px",
                background: "rgba(255,120,20,0.05)",
                border: "1px solid rgba(255,140,40,0.15)",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "6px" }}>
                    GENERATED PROFILE CODE
                  </div>
                  {Object.values(ratings).every(v => v > 0) ? (
                    <ProfileCodeDisplay code={generateProfileCode(ratings)} />
                  ) : (
                    <span style={{ fontSize: "12px", color: "rgba(245,222,179,0.4)", fontStyle: "italic" }}>
                      Complete all ratings to generate
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {submitMessage && (
                    <span style={{ 
                      fontSize: "12px", 
                      color: submitMessage.includes("success") ? "#7dce82" : "#ff8c6b",
                    }}>
                      {submitMessage}
                    </span>
                  )}
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: "linear-gradient(135deg, rgba(255,140,40,0.3) 0%, rgba(255,100,20,0.4) 100%)",
                      border: "1px solid rgba(255,140,40,0.5)",
                      borderRadius: "8px",
                      padding: "12px 28px",
                      color: "#ffd080",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "history" && (
        /* HISTORY VIEW */
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px", width: "100%", boxSizing: "border-box" }}>
          {allReviews.length === 0 ? (
            <div style={{
              background: "rgba(20,8,0,0.5)",
              border: "1px solid rgba(255,140,40,0.12)",
              borderRadius: "12px",
              padding: "60px 40px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }}>◷</div>
              <div style={{ fontSize: "18px", color: "rgba(255,210,130,0.6)", marginBottom: "8px" }}>
                No ratings yet
              </div>
              <div style={{ fontSize: "13px", color: "rgba(245,222,179,0.4)" }}>
                Be the first to rate a chile!
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "8px" }}>
                ALL SUBMITTED RATINGS ({allReviews.length})
              </div>
              {allReviews.map(review => (
                <div
                  key={review.id}
                  style={{
                    background: "rgba(20,8,0,0.5)",
                    border: "1px solid rgba(255,140,40,0.12)",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: review.chiliColor,
                        boxShadow: `0 0 8px ${review.chiliColor}`,
                      }} />
                      <div>
                        <div style={{ fontSize: "16px", color: "#ffd080", fontWeight: "500" }}>
                          {review.chili}
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(245,222,179,0.4)", marginTop: "2px" }}>
                          by {review.reviewer} • {formatDate(review.date)}
                        </div>
                      </div>
                    </div>
                    <ProfileCodeDisplay code={review.profileCode} />
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "12px", marginBottom: review.notes ? "16px" : "0" }}>
                    {ATTRIBUTES.map(attr => (
                      <div key={attr.key} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>
                          {attr.icon} {attr.label.toUpperCase()}
                        </div>
                        <div style={{ fontSize: "16px", color: "#ffd080", fontFamily: "'Courier New', monospace" }}>
                          {review.ratings[attr.key]}
                        </div>
                      </div>
                    ))}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>
                        🔥 HEAT
                      </div>
                      <div style={{ fontSize: "16px", color: "#ffd080", fontFamily: "'Courier New', monospace" }}>
                        {review.ratings.heatLevel}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>
                        🎨 COLOR
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                        <div style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: COLOR_OPTIONS.find(o => o.value === review.ratings.colorRating)?.color || "#666",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }} />
                      </div>
                    </div>
                  </div>
                  
                  {review.notes && (
                    <div style={{
                      background: "rgba(255,140,40,0.05)",
                      borderRadius: "6px",
                      padding: "12px",
                      fontSize: "13px",
                      color: "rgba(245,222,179,0.6)",
                      fontStyle: "italic",
                      lineHeight: "1.5",
                    }}>
                      "{review.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === "totals" && (
        /* TOTALS VIEW */
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px", width: "100%", boxSizing: "border-box" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "16px" }}>
            CUMULATIVE RATINGS BY CHILE
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {chilies.map(chili => {
              const cumulative = getCumulativeRatings(chili.name);
              
              return (
                <div
                  key={chili.name}
                  style={{
                    background: "rgba(20,8,0,0.5)",
                    border: "1px solid rgba(255,140,40,0.12)",
                    borderRadius: "10px",
                    padding: "20px",
                    opacity: cumulative ? 1 : 0.5,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: chili.color,
                      boxShadow: cumulative ? `0 0 10px ${chili.color}` : "none",
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "16px", color: "#ffd080" }}>
                        {chili.name}
                      </div>
                      <div style={{ fontSize: "10px", color: "rgba(245,222,179,0.35)" }}>
                        {chili.aka}
                      </div>
                    </div>
                    {cumulative && (
                      <div style={{
                        background: "rgba(255,140,40,0.15)",
                        borderRadius: "12px",
                        padding: "4px 10px",
                        fontSize: "11px",
                        color: "rgba(255,210,130,0.8)",
                      }}>
                        {cumulative.count} review{cumulative.count !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                  
                  {cumulative ? (
                    <>
                      <div style={{ marginBottom: "12px" }}>
                        {ATTRIBUTES.map(attr => (
                          <AttributeBar
                            key={attr.key}
                            value={cumulative[attr.key]}
                            label={attr.label}
                            icon={attr.icon}
                          />
                        ))}
                      </div>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(255,140,40,0.1)",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}>
                        <div>
                          <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>
                            AVG HEAT
                          </div>
                          <HeatMeter level={Math.round(cumulative.heatLevel)} />
                        </div>
                        <div>
                          <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>
                            AVG COLOR
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              background: COLOR_OPTIONS.find(o => o.value === Math.round(cumulative.colorRating))?.color || "#666",
                              border: "1px solid rgba(255,255,255,0.2)",
                              boxShadow: `0 0 8px ${COLOR_OPTIONS.find(o => o.value === Math.round(cumulative.colorRating))?.color || "#666"}`,
                            }} />
                            <span style={{ fontSize: "10px", color: "rgba(245,222,179,0.6)" }}>
                              {COLOR_OPTIONS.find(o => o.value === Math.round(cumulative.colorRating))?.label || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>
                            AVG PROFILE
                          </div>
                          <ProfileCodeDisplay code={`F${Math.round((cumulative.flavorDepth + cumulative.earthiness + cumulative.fruitiness + cumulative.sweetness) / 4 * 2)}-S${Math.round(cumulative.heatLevel)}-A${Math.round((cumulative.smokiness + cumulative.flavorDepth) / 2 * 2)}`} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ 
                      textAlign: "center", 
                      padding: "20px",
                      color: "rgba(245,222,179,0.3)",
                      fontSize: "12px",
                      fontStyle: "italic",
                    }}>
                      No ratings yet
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "reference" && (
        /* REFERENCE GUIDE VIEW */
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px", width: "100%", boxSizing: "border-box" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,180,60,0.4)", marginBottom: "16px" }}>
            KNOWN CHILE PROFILES — REFERENCE GUIDE
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {chilies.map(chili => (
              <div
                key={chili.name}
                style={{
                  background: "rgba(20,8,0,0.5)",
                  border: "1px solid rgba(255,140,40,0.12)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                {/* Header */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(80,20,0,0.5) 0%, rgba(40,10,0,0.3) 100%)",
                  padding: "20px 24px",
                  borderBottom: "1px solid rgba(255,140,40,0.1)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      {/* Chile Image */}
                      <div style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "2px solid rgba(255,140,40,0.3)",
                        boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 30px ${chili.color}40`,
                        flexShrink: 0,
                      }}>
                        <img 
                          src={chili.image} 
                          alt={chili.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = chili.color;
                          }}
                        />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "28px", fontWeight: "400", color: "#ffd080" }}>
                          {chili.name}
                        </h3>
                        <p style={{ margin: "4px 0 0", color: "rgba(245,222,179,0.45)", fontStyle: "italic", fontSize: "14px" }}>
                          {chili.aka}
                        </p>
                        <p style={{ margin: "12px 0 0", fontSize: "13px", lineHeight: "1.6", color: "rgba(245,222,179,0.6)", maxWidth: "400px" }}>
                          {chili.bodyDesc}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                      <ProfileCodeDisplay code={chili.profileCode} />
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.4)", marginBottom: "4px" }}>SCOVILLE</div>
                        <div style={{ fontSize: "14px", color: "rgba(245,222,179,0.7)", fontFamily: "'Courier New', monospace" }}>
                          {chili.scoville[0].toLocaleString()}–{chili.scoville[1].toLocaleString()} SHU
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Grid */}
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                    
                    {/* Attributes */}
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                        FLAVOR ATTRIBUTES
                      </div>
                      {ATTRIBUTES.map(attr => (
                        <div key={attr.key} style={{ marginBottom: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,220,160,0.5)" }}>
                              {attr.icon} {attr.label.toUpperCase()}
                            </span>
                            <span style={{ fontSize: "10px", color: "#ffd080", fontFamily: "'Courier New', monospace" }}>
                              {chili.knownRatings[attr.key]}/5
                            </span>
                          </div>
                          <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                            <div style={{
                              height: "100%",
                              width: `${(chili.knownRatings[attr.key] / 5) * 100}%`,
                              background: "linear-gradient(90deg, rgba(255,140,60,0.6), rgba(255,200,80,0.9))",
                              borderRadius: "2px",
                            }} />
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: "16px" }}>
                        <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "8px" }}>
                          HEAT LEVEL
                        </div>
                        <HeatMeter level={chili.knownRatings.heatLevel} />
                        <div style={{ fontSize: "11px", color: "rgba(255,180,60,0.5)", marginTop: "6px", fontFamily: "'Courier New', monospace" }}>
                          {chili.knownRatings.heatLevel}/10
                        </div>
                      </div>
                      
                      {/* Color Rating */}
                      <div style={{ marginTop: "16px" }}>
                        <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "8px" }}>
                          COLOR
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: COLOR_OPTIONS.find(o => o.value === chili.knownRatings.colorRating)?.color || chili.color,
                            border: "2px solid rgba(255,255,255,0.2)",
                            boxShadow: `0 0 10px ${COLOR_OPTIONS.find(o => o.value === chili.knownRatings.colorRating)?.color || chili.color}`,
                          }} />
                          <div>
                            <div style={{ fontSize: "12px", color: "#ffd080" }}>
                              {COLOR_OPTIONS.find(o => o.value === chili.knownRatings.colorRating)?.label}
                            </div>
                            <div style={{ fontSize: "10px", color: "rgba(245,222,179,0.5)" }}>
                              {COLOR_OPTIONS.find(o => o.value === chili.knownRatings.colorRating)?.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tasting Notes & Best For */}
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                        TASTING NOTES
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                        {chili.flavorNotes.map(note => (
                          <span key={note} style={{
                            background: "rgba(255,140,40,0.1)",
                            border: "1px solid rgba(255,140,40,0.2)",
                            borderRadius: "20px",
                            padding: "4px 10px",
                            fontSize: "11px",
                            color: "rgba(255,210,130,0.85)",
                            fontStyle: "italic",
                          }}>
                            {note}
                          </span>
                        ))}
                      </div>
                      
                      <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                        BEST FOR
                      </div>
                      {chili.bestFor.map(use => (
                        <div key={use} style={{
                          fontSize: "12px",
                          color: "rgba(245,222,179,0.7)",
                          paddingBottom: "6px",
                          marginBottom: "6px",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}>
                          <span style={{ color: "rgba(255,140,40,0.5)", fontSize: "10px" }}>▸</span>
                          {use}
                        </div>
                      ))}
                      
                      <div style={{ marginTop: "16px" }}>
                        <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                          AROMA STAGES
                        </div>
                        {[
                          { key: "dry", label: "Seco", desc: chili.aromaStages.dry },
                          { key: "soaking", label: "Remojo", desc: chili.aromaStages.soaking },
                          { key: "rehydrated", label: "Rehidratado", desc: chili.aromaStages.rehydrated },
                        ].map((stage, i) => (
                          <div key={stage.key} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                            <div style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: i === 2 ? "#ffd080" : "rgba(255,140,40,0.4)",
                              marginTop: "5px",
                              flexShrink: 0,
                            }} />
                            <div>
                              <span style={{ fontSize: "10px", color: i === 2 ? "#ffd080" : "rgba(255,180,60,0.5)" }}>
                                {stage.label}:
                              </span>
                              <span style={{ fontSize: "11px", color: "rgba(245,222,179,0.6)", marginLeft: "6px" }}>
                                {stage.desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Rehydration Guide */}
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,180,60,0.4)", marginBottom: "12px" }}>
                        REHYDRATION GUIDE
                      </div>
                      
                      <div style={{
                        background: "rgba(255,140,40,0.08)",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "12px",
                      }}>
                        <div style={{ fontSize: "9px", color: "rgba(255,180,60,0.5)", marginBottom: "4px" }}>
                          WATER TEMP
                        </div>
                        <div style={{ fontSize: "14px", color: "#ffd080", fontWeight: "500" }}>
                          {chili.rehydrateMethod.water}
                        </div>
                      </div>
                      
                      <div style={{
                        background: "rgba(255,80,20,0.1)",
                        border: "1px solid rgba(255,100,40,0.2)",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "12px",
                      }}>
                        <div style={{ 
                          fontSize: "9px", 
                          color: "rgba(255,140,60,0.7)", 
                          marginBottom: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <span style={{ color: "#ff6b35" }}>🔥</span> ON HEAT
                        </div>
                        <div style={{ fontSize: "12px", color: "rgba(255,200,130,0.9)", lineHeight: "1.4" }}>
                          {chili.rehydrateMethod.onHeat}
                        </div>
                      </div>
                      
                      <div style={{
                        background: "rgba(100,140,180,0.08)",
                        border: "1px solid rgba(120,160,200,0.15)",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "12px",
                      }}>
                        <div style={{ 
                          fontSize: "9px", 
                          color: "rgba(150,180,210,0.7)", 
                          marginBottom: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <span style={{ color: "#6a9fc7" }}>💧</span> OFF HEAT
                        </div>
                        <div style={{ fontSize: "12px", color: "rgba(180,210,240,0.8)", lineHeight: "1.4" }}>
                          {chili.rehydrateMethod.offHeat}
                        </div>
                      </div>
                      
                      <div style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "6px",
                        padding: "10px",
                        fontSize: "11px",
                        color: "rgba(245,222,179,0.5)",
                        fontStyle: "italic",
                        lineHeight: "1.5",
                      }}>
                        <span style={{ color: "rgba(255,180,60,0.6)" }}>Tip:</span> {chili.rehydrateTip}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer with Contact Us Link */}
      <div style={{
        marginTop: "auto",
        borderTop: "1px solid rgba(255,140,40,0.2)",
        padding: "32px 32px",
        background: "linear-gradient(0deg, rgba(80,20,0,0.4) 0%, transparent 100%)",
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}>
          <button
            onClick={() => setShowContactModal(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffd080",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              padding: "8px 16px",
              transition: "all 0.2s ease",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#ff8c40";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#ffd080";
            }}
          >
            ✉ Contact Us
          </button>
          <p style={{
            margin: "12px 0 0",
            fontSize: "12px",
            color: "rgba(245,222,179,0.4)",
            fontStyle: "italic",
          }}>
            © 2026 JJ's Juice - Rehydrated Chile Rating System
          </p>
        </div>
      </div>

      {/* Contact Modal Overlay */}
      {showContactModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowContactModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1a0a00 0%, #0d0500 100%)",
              border: "2px solid rgba(255,140,40,0.3)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 10px 50px rgba(255,140,40,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}>
              <h2 style={{
                margin: 0,
                fontSize: "28px",
                color: "#ffd080",
                fontWeight: "400",
              }}>
                Contact Us
              </h2>
              <button
                onClick={() => setShowContactModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "28px",
                  color: "rgba(255,180,60,0.6)",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleContactSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,180,60,0.6)",
                  marginBottom: "8px",
                }}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,140,40,0.2)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    color: "#ffd080",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,180,60,0.6)",
                  marginBottom: "8px",
                }}>
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,140,40,0.2)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    color: "#ffd080",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,180,60,0.6)",
                  marginBottom: "8px",
                }}>
                  MESSAGE
                </label>
                <textarea
                  value={contactForm.comment}
                  onChange={(e) => setContactForm(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Your message..."
                  rows="5"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,140,40,0.2)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    color: "#ffd080",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {contactMessage && (
                <div style={{
                  background: "rgba(255,140,40,0.15)",
                  border: "1px solid rgba(255,140,40,0.3)",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  fontSize: "13px",
                  color: "#ffd080",
                  textAlign: "center",
                }}>
                  {contactMessage}
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, rgba(255,140,40,0.9) 0%, rgba(255,100,20,0.9) 100%)",
                  border: "2px solid rgba(255,180,80,0.5)",
                  borderRadius: "8px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s ease",
                }}
              >
                Send Message
              </button>
            </form>

            <p style={{
              marginTop: "16px",
              fontSize: "12px",
              color: "rgba(245,222,179,0.4)",
              textAlign: "center",
              fontStyle: "italic",
            }}>
              We'll get back to you as soon as possible
            </p>
          </div>
        </div>
      )}
    </div>
  );
}