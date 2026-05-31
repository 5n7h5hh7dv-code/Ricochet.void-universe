import { useEffect, useState } from "react";

const signals = [
  { answer: "MIRROR", title: "Reflection Signal", difficulty: "Clear Hint", hint: "Every signal begins with a reflection.", message: "Reflection recognized. The first path has opened.", nextHint: "Where noise falls, silence begins to speak." },
  { answer: "SILENCE", title: "Silence Signal", difficulty: "Light Hidden Clue", hint: "Noise must fall before signal becomes visible.", message: "Noise reduced. A deeper signal is now active.", nextHint: "The void does not answer until you stop filling it." },
  { answer: "VOID", title: "Void Signal", difficulty: "Connect Ideas", hint: "The empty space is not empty if you are paying attention.", message: "Pattern detected. The void is responding.", nextHint: "The only direction after the void is upward." },
  { answer: "ASCENSION", title: "Ascension Signal", difficulty: "Notice Pattern", hint: "Progress is not escape. Progress is elevation.", message: "Path integrity increasing.", nextHint: "The next gate does not open without honesty." },
  { answer: "TRUTH", title: "Truth Signal", difficulty: "Compare Archives", hint: "The mirror never lies. It only waits.", message: "Truth standard confirmed.", nextHint: "Truth without ownership becomes another excuse." },
  { answer: "ACCOUNTABILITY", title: "Accountability Signal", difficulty: "Self-Reflection", hint: "Responsibility is the moment blame loses power.", message: "Responsibility recognized.", nextHint: "Only a builder can cross into the Architect path." },
  { answer: "ARCHITECT", title: "Architect Signal", difficulty: "Full Path Awareness", hint: "The Architect does not only observe the universe. The Architect builds.", message: "Creator path detected.", nextHint: "The final signal is the law that has been speaking the entire time." },
  { answer: "SIGNAL GROWS WHERE NOISE FALLS", title: "Foundation Completion Signal", difficulty: "Complete Chain", hint: "The final signal is the central law.", message: "Foundation complete. Reflection Chamber unlocked.", nextHint: "The path has found you. Reflection is now required." },
];

const archivePdfs = [
  { title: "Silence Architecture", note: "PDF link pending", status: "Distorted", file: "/archives/silence-architecture.pdf" },
  { title: "The Human Glitch", note: "PDF link pending", status: "Unverified", file: "/archives/the-human-glitch.pdf" },
  { title: "Neural Wealth Mapping", note: "PDF link pending", status: "Unknown", file: "/archives/neural-wealth-mapping.pdf" },
  { title: "The Mirror Code", note: "Every signal begins with a reflection", status: "Signal Detected", file: "/archives/the-mirror-code.pdf" },
  { title: "Project Ascension", note: "PDF link pending", status: "Dormant", file: "/archives/project-ascension.pdf" },
  { title: "Void Protocol 7", note: "PDF link pending", status: "Fragment Found", file: "/archives/void-protocol-7.pdf" },
  { title: "The Dopamine Collapse Manual", note: "PDF link pending", status: "Partial Signal", file: "/archives/dopamine-collapse-manual.pdf" },
  { title: "Psychological Warfare Against Yourself", note: "PDF link pending", status: "Unknown", file: "/archives/psychological-warfare-against-yourself.pdf" },
];

const artifacts = [
  { name: "Founder’s Coin", limit: 1000, minted: 0, status: "Unreleased", code: "RVU-FC" },
  { name: "Void Artifact Alpha", limit: 500, minted: 0, status: "Restricted", code: "RVU-VA" },
  { name: "Architect Relic", limit: 100, minted: 0, status: "Creator Vault", code: "RVU-AR" },
  { name: "Signal Coin", limit: 2500, minted: 0, status: "Research Phase", code: "RVU-SC" },
  { name: "Archive Ring", limit: 777, minted: 0, status: "Design Protected", code: "RVU-RG" },
  { name: "Family Collection Token", limit: 1500, minted: 0, status: "Future Phase", code: "RVU-FAM" },
];

const familyCollection = [
  { title: "Children’s Story Vault", status: "Manuscripts Protected", note: "Full story text withheld until release." },
  { title: "Parent Read-Along Rentals", status: "Future Platform", note: "Designed for parents to rent and read with children." },
  { title: "Illustration Phase", status: "Needs Artwork", note: "Illustrations remain private until final approval." },
  { title: "Audio Story Chamber", status: "Future Phase", note: "Possible narrated versions for family listening." },
  { title: "Educational Adventures", status: "Protected Concept", note: "Knowledge paths adapted for younger audiences." },
  { title: "Family Access Path", status: "Coming Later", note: "A separate child-safe branch of the universe." },
];

function getCountdown(targetDate) {
  const distance = new Date(targetDate).getTime() - new Date().getTime();
  if (distance <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };

  return {
    days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
    hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
  };
}

export default function App() {
  const [activeChamber, setActiveChamber] = useState("foundation");
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [currentSignal, setCurrentSignal] = useState(0);
  const [signalInput, setSignalInput] = useState("");
  const [signalStatus, setSignalStatus] = useState("idle");
  const [lastMessage, setLastMessage] = useState("Awaiting first archive signal.");
  const [pathHint, setPathHint] = useState(signals[0].hint);
  const [vaultInput, setVaultInput] = useState("");
  const [vaultStatus, setVaultStatus] = useState("idle");
  const [voidName, setVoidName] = useState("");
  const [reflection, setReflection] = useState("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [collectorName, setCollectorName] = useState("");
  const [collectorEmail, setCollectorEmail] = useState("");
  const [selectedArtifact, setSelectedArtifact] = useState("Founder’s Coin");
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown("2026-12-31T23:59:59"));

  const completed = currentSignal;
  const foundationComplete = completed >= signals.length;

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown("2026-12-31T23:59:59")), 1000);
    return () => clearInterval(timer);
  }, []);

  function verifyCurrentSignal() {
    if (foundationComplete) return;
    const expected = signals[currentSignal].answer;

    if (signalInput.trim().toUpperCase() === expected) {
      setSignalStatus("granted");
      setLastMessage(signals[currentSignal].message);
      setPathHint(signals[currentSignal].nextHint);
      setSignalInput("");

      setTimeout(() => {
        const next = currentSignal + 1;
        setCurrentSignal(next);

        if (next >= signals.length) {
          setActiveChamber("reflection");
          setLastMessage("Foundation complete. Reflection Chamber unlocked.");
        } else {
          setSignalStatus("idle");
          setPathHint(signals[next].hint);
        }
      }, 900);
    } else {
      setSignalStatus("denied");
      setLastMessage("Signal rejected. Return to the archive and look closer.");
    }
  }

  function verifyVaultAccess() {
    setVaultStatus(vaultInput.trim().toUpperCase() === "CREATOR-VAULT" ? "granted" : "denied");
  }

  return (
    <main className="pageShell">
      <style>{`
        .pageShell {
          min-height: 100vh;
          width: 100%;
          margin: 0;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(circle at 10% 15%, rgba(125,0,255,1) 0%, transparent 28%),
            radial-gradient(circle at 90% 20%, rgba(0,212,255,0.95) 0%, transparent 28%),
            radial-gradient(circle at 50% 85%, rgba(255,0,136,0.9) 0%, transparent 34%),
            linear-gradient(180deg, #020208 0%, #070018 45%, #020208 100%);
          background-size: 140% 140%;
          animation: voidShift 12s ease-in-out infinite alternate;
          font-family: Arial, sans-serif;
        }

        .stars {
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(white 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,0.9) 1px, transparent 1px),
            radial-gradient(rgba(255,0,136,0.8) 1px, transparent 1px);
          background-size: 90px 90px, 140px 140px, 220px 220px;
          animation: starDrift 30s linear infinite;
          opacity: 0.55;
        }

        .signalParticles {
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,0.95) 2px, transparent 2px),
            radial-gradient(rgba(255,0,136,0.75) 1.5px, transparent 1.5px);
          background-size: 180px 180px, 260px 260px, 340px 340px;
          animation: signalFloat 18s linear infinite;
          opacity: 0.5;
          z-index: 4;
          pointer-events: none;
        }

        .scanLines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.035) 0px,
            rgba(255,255,255,0.035) 1px,
            transparent 1px,
            transparent 6px
          );
          opacity: 0.35;
          z-index: 6;
          pointer-events: none;
          animation: scanMove 8s linear infinite;
        }

        .voidSymbol {
          position: fixed;
          width: 660px;
          height: 660px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.08);
          box-shadow: 0 0 90px rgba(125,0,255,0.34), inset 0 0 120px rgba(0,212,255,0.18);
          z-index: 5;
          opacity: 0.56;
          animation: symbolRotate 30s linear infinite;
          pointer-events: none;
        }

        .voidCore {
          position: fixed;
          width: 145px;
          height: 145px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.95), rgba(0,212,255,0.45), rgba(125,0,255,0.15), transparent 70%);
          box-shadow: 0 0 35px rgba(255,255,255,0.35), 0 0 85px rgba(0,212,255,0.48), 0 0 140px rgba(255,0,136,0.28);
          z-index: 5;
          opacity: 0.66;
          animation: corePulse 4s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .orbitRing {
          position: fixed;
          width: 820px;
          height: 820px;
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,0.12);
          z-index: 5;
          opacity: 0.5;
          pointer-events: none;
          animation: orbitRotate 50s linear infinite;
        }

        .dataStream {
          position: fixed;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          white-space: nowrap;
          z-index: 7;
          pointer-events: none;
          text-shadow: 0 0 12px rgba(0,212,255,0.55);
        }

        .streamOne { top: 11%; left: -30%; animation: streamRight 24s linear infinite; }
        .streamTwo { bottom: 12%; right: -35%; animation: streamLeft 28s linear infinite; }
        .streamThree { top: 58%; left: -40%; opacity: 0.35; animation: streamRight 36s linear infinite; }

        .panel {
          position: relative;
          z-index: 10;
          max-width: 1260px;
          animation: heroReveal 1.4s ease forwards;
        }

        .signalTag {
          display: inline-block;
          margin-bottom: 14px;
          padding: 7px 16px;
          border: 1px solid rgba(0,212,255,0.35);
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          box-shadow: 0 0 18px rgba(0,212,255,0.2);
        }

        h1 {
          margin: 0;
          font-size: clamp(48px, 8vw, 96px);
          letter-spacing: 3px;
          line-height: 0.95;
          text-shadow: 0 0 12px rgba(125,0,255,0.9), 0 0 28px rgba(0,212,255,0.7), 0 0 50px rgba(255,0,136,0.5);
        }

        .subtitle {
          max-width: 900px;
          margin: 22px auto 0;
          font-size: 20px;
          color: rgba(255,255,255,0.86);
          line-height: 1.5;
        }

        .chamberNav {
          margin: 28px auto 0;
          max-width: 1100px;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          position: sticky;
          top: 12px;
          z-index: 20;
        }

        .navButton {
          color: white;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 14px;
          padding: 12px 10px;
          background: rgba(0,0,0,0.38);
          box-shadow: 0 0 14px rgba(0,212,255,0.15);
          cursor: pointer;
          transition: 0.25s ease;
          letter-spacing: 1px;
          font-size: 12px;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .navButton:hover,
        .navButton.active {
          transform: translateY(-3px);
          border-color: rgba(0,255,190,0.5);
          background: rgba(0,255,190,0.09);
          box-shadow: 0 0 22px rgba(0,255,190,0.22);
        }

        .card {
          margin: 24px auto 0;
          max-width: 1000px;
          border: 1px solid rgba(0,212,255,0.28);
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25));
          box-shadow: 0 0 25px rgba(0,212,255,0.18), inset 0 0 25px rgba(125,0,255,0.12);
          backdrop-filter: blur(10px);
        }

        .sectionPad {
          padding: 18px;
          text-align: left;
        }

        .greenPanel {
          border-color: rgba(0,255,190,0.28);
          box-shadow: 0 0 28px rgba(0,255,190,0.14), inset 0 0 25px rgba(0,255,190,0.07);
        }

        .redPanel {
          border-color: rgba(255,0,136,0.32);
          box-shadow: 0 0 28px rgba(255,0,136,0.14), inset 0 0 25px rgba(255,0,136,0.07);
        }

        .cardTitle {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0,255,190,0.95);
          margin-bottom: 10px;
        }

        .restrictedTitle { color: rgba(255,0,136,0.95); }

        .sectionPad p {
          margin: 0 0 14px;
          color: rgba(255,255,255,0.78);
          line-height: 1.65;
          font-size: 14px;
        }

        .hintText {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(0,255,190,0.95);
          text-shadow: 0 0 18px rgba(0,255,190,0.22);
        }

        .progressCard { padding: 18px; }

        .progressTop {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .progressBar,
        .counterBar {
          height: 10px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.12);
          margin-top: 14px;
        }

        .progressFill,
        .counterFill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #7d00ff, #00d4ff, #00ffbe);
          box-shadow: 0 0 18px rgba(0,255,190,0.45);
          transition: width 0.6s ease;
        }

        .accessChamber {
          display: flex;
          gap: 10px;
          padding: 10px;
        }

        .accessInput,
        .reflectionInput,
        .reflectionText,
        .selectInput {
          border: none;
          outline: none;
          border-radius: 12px;
          padding: 14px;
          color: white;
          background: rgba(255,255,255,0.08);
          letter-spacing: 2px;
        }

        .accessInput { flex: 1; }

        .reflectionInput,
        .reflectionText,
        .selectInput {
          width: 100%;
          box-sizing: border-box;
          margin-top: 10px;
        }

        .reflectionText {
          min-height: 130px;
          resize: vertical;
          line-height: 1.5;
        }

        .actionButton {
          border: none;
          border-radius: 12px;
          padding: 14px 18px;
          color: white;
          background: linear-gradient(90deg, rgba(125,0,255,0.8), rgba(0,212,255,0.75));
          box-shadow: 0 0 20px rgba(0,212,255,0.35);
          cursor: pointer;
          transition: 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .actionButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(0,212,255,0.55), 0 0 38px rgba(125,0,255,0.35);
        }

        .secondaryButton {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          background: rgba(255,255,255,0.08);
          cursor: pointer;
          margin-left: 10px;
        }

        .gateResult {
          padding: 16px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .granted {
          color: rgba(0,255,190,0.95);
          border-color: rgba(0,255,190,0.45);
          box-shadow: 0 0 30px rgba(0,255,190,0.25);
        }

        .denied {
          color: rgba(255,80,140,0.95);
          border-color: rgba(255,0,136,0.45);
          box-shadow: 0 0 30px rgba(255,0,136,0.25);
        }

        .grid4,
        .grid3 {
          padding: 16px;
          display: grid;
          gap: 12px;
        }

        .grid4 { grid-template-columns: repeat(4, 1fr); }
        .grid3 { grid-template-columns: repeat(3, 1fr); }

        .universeCard {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.06);
          transition: 0.3s ease;
          padding: 14px;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .universeCard:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px rgba(0,212,255,0.35), 0 0 35px rgba(255,0,136,0.18);
        }

        .universeCard strong {
          display: block;
          color: white;
          margin-bottom: 6px;
        }

        .universeCard span {
          display: block;
          color: rgba(255,255,255,0.62);
          font-size: 12px;
          letter-spacing: 1px;
          line-height: 1.5;
        }

        .verified {
          border-color: rgba(0,255,190,0.35);
          background: rgba(0,255,190,0.07);
          box-shadow: 0 0 20px rgba(0,255,190,0.15);
        }

        .current {
          border-color: rgba(0,212,255,0.42);
          box-shadow: 0 0 22px rgba(0,212,255,0.25);
        }

        .locked { opacity: 0.48; }

        .redCard {
          border-color: rgba(255,0,136,0.22);
          background:
            radial-gradient(circle at 50% 0%, rgba(255,0,136,0.12), transparent 45%),
            rgba(255,255,255,0.055);
        }

        .greenCard {
          border-color: rgba(0,255,190,0.22);
          background:
            radial-gradient(circle at 50% 0%, rgba(0,255,190,0.12), transparent 45%),
            rgba(255,255,255,0.055);
        }

        .status {
          display: inline-block;
          margin-top: 10px;
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(0,212,255,0.12);
          color: rgba(0,212,255,0.86);
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .statusRed {
          background: rgba(255,0,136,0.12);
          color: rgba(255,120,180,0.95);
        }

        .statusGreen {
          background: rgba(0,255,190,0.12);
          color: rgba(0,255,190,0.92);
        }

        .countNumber {
          font-size: 34px;
          color: rgba(0,255,190,0.95);
          text-shadow: 0 0 18px rgba(0,255,190,0.28);
          margin-bottom: 4px;
        }

        .footerNotice {
          position: relative;
          z-index: 10;
          max-width: 980px;
          margin: 28px auto 0;
          padding: 16px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(0,0,0,0.32);
          color: rgba(255,255,255,0.62);
          font-size: 11px;
          line-height: 1.6;
          letter-spacing: 1px;
        }

        .hiddenSignal {
          margin-top: 24px;
          font-size: 11px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
        }

        @keyframes voidShift { from { background-position: 0% 0%; } to { background-position: 100% 100%; } }
        @keyframes starDrift { from { background-position: 0 0, 0 0, 0 0; } to { background-position: 300px 500px, -250px 400px, 200px -300px; } }
        @keyframes signalFloat { from { background-position: 0 0, 0 0, 0 0; } to { background-position: 220px -300px, -260px 240px, 340px -180px; } }
        @keyframes scanMove { from { background-position: 0 0; } to { background-position: 0 120px; } }
        @keyframes symbolRotate { from { rotate: 0deg; transform: scale(1); } to { rotate: 360deg; transform: scale(1.04); } }
        @keyframes corePulse { from { transform: scale(0.9); opacity: 0.35; } to { transform: scale(1.25); opacity: 0.75; } }
        @keyframes orbitRotate { from { rotate: 0deg; } to { rotate: -360deg; } }
        @keyframes streamRight { from { transform: translateX(0); } to { transform: translateX(160vw); } }
        @keyframes streamLeft { from { transform: translateX(0); } to { transform: translateX(-160vw); } }
        @keyframes heroReveal { from { opacity: 0; transform: translateY(30px) scale(0.96); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }

        @media (max-width: 900px) {
          .chamberNav,
          .grid4,
          .grid3 {
            grid-template-columns: 1fr;
          }

          .accessChamber { flex-direction: column; }

          h1 { font-size: 48px; }
        }
      `}</style>

      <div className="stars"></div>
      <div className="signalParticles"></div>
      <div className="scanLines"></div>
      <div className="orbitRing"></div>
      <div className="voidSymbol"></div>
      <div className="voidCore"></div>

      <div className="dataStream streamOne">archive access panel active • public order remains false •</div>
      <div className="dataStream streamTwo">foundation • artifacts • commerce • family • vault • reflection •</div>
      <div className="dataStream streamThree">the pdf is the archive • the chamber verifies the path •</div>

      <section className="panel">
        <div className="signalTag">Archive Access Panel Active</div>

        <h1>Ricochet Void Universe</h1>

        <p className="subtitle">
          The Foundation PDFs remain the real path. The site now opens an Archive
          Access Panel for each archive without exposing the true order.
        </p>

        <div className="chamberNav">
          {["foundation", "artifacts", "commerce", "family", "vault", "reflection"].map((chamber) => (
            <button
              key={chamber}
              className={`navButton ${activeChamber === chamber ? "active" : ""}`}
              onClick={() => setActiveChamber(chamber)}
            >
              {chamber}
            </button>
          ))}
        </div>

        {activeChamber === "foundation" && (
          <>
            <div className="card sectionPad greenPanel">
              <div className="cardTitle">The Truth Standard</div>
              <p>
                The goal is not only to find hidden answers. The goal is to become
                truthful enough with yourself to understand what the answers reveal.
              </p>
            </div>

            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Current Path Hint</div>
              <div className="hintText">{pathHint}</div>
            </div>

            <div className="card progressCard">
              <div className="progressTop">
                <div>Foundation Progress</div>
                <div>{completed} / {signals.length} Signals Verified</div>
              </div>

              <div className="progressBar">
                <div className="progressFill" style={{ width: `${(completed / signals.length) * 100}%` }}></div>
              </div>
            </div>

            <div className="card grid4">
              {signals.map((signal, index) => {
                const verified = index < currentSignal;
                const current = index === currentSignal && !foundationComplete;
                const locked = index > currentSignal;

                return (
                  <div key={signal.title} className={`universeCard ${verified ? "verified" : ""} ${current ? "current" : ""} ${locked ? "locked" : ""}`}>
                    <strong>{signal.title}</strong>
                    <span>Difficulty: {signal.difficulty}</span>
                    <span>Status: {verified ? "Verified" : current ? "Awaiting Signal" : "Locked"}</span>
                  </div>
                );
              })}
            </div>

            {!foundationComplete && (
              <div className="card accessChamber">
                <input className="accessInput" value={signalInput} onChange={(e) => setSignalInput(e.target.value)} placeholder="ENTER CURRENT ARCHIVE SIGNAL" />
                <button className="actionButton" onClick={verifyCurrentSignal}>Verify Current Signal</button>
              </div>
            )}

            <div className={`card gateResult ${signalStatus === "granted" ? "granted" : signalStatus === "denied" ? "denied" : ""}`}>
              {foundationComplete ? "Foundation complete. Reflection Chamber unlocked." : lastMessage}
            </div>

            {foundationComplete && (
              <button className="actionButton" onClick={() => setActiveChamber("reflection")}>Enter Reflection Chamber</button>
            )}

            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Foundation Archive Access</div>
              <p>
                The PDFs remain the true Foundation path. The order displayed here is
                not the correct path. Each archive opens a protected access panel.
              </p>
            </div>

            <div className="card grid4">
              {archivePdfs.map((archive) => (
                <div className="universeCard" key={archive.title}>
                  <strong>{archive.title}</strong>
                  <span>{archive.note}</span>
                  <button className="actionButton" style={{ marginTop: "12px" }} onClick={() => setSelectedArchive(archive)}>
                    Open Archive Panel
                  </button>
                  <div className="status">{archive.status}</div>
                </div>
              ))}
            </div>

            {selectedArchive && (
              <div className="card sectionPad greenPanel">
                <div className="cardTitle">Archive Access Panel</div>
                <p><strong>{selectedArchive.title}</strong></p>
                <p>
                  This archive is part of the Foundation path. The public display order
                  is not the true progression order. The user must follow the hidden
                  signals inside the PDFs.
                </p>
                <p>
                  Future PDF path:
                  <br />
                  <span style={{ color: "rgba(0,255,190,0.95)" }}>{selectedArchive.file}</span>
                </p>
                <p>
                  Status: {selectedArchive.status}
                </p>
                <a className="actionButton" href={selectedArchive.file} target="_blank" rel="noreferrer">
                  Open PDF File
                </a>
                <button className="secondaryButton" onClick={() => setSelectedArchive(null)}>
                  Close Panel
                </button>
              </div>
            )}
          </>
        )}

        {activeChamber === "artifacts" && (
          <>
            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Artifact Registry</div>
              <p>
                The Artifact Registry records future limited editions without revealing
                protected designs. Mint limits can be public. Blueprints, renders, and
                manufacturing details stay private.
              </p>
            </div>

            <div className="card grid3">
              {artifacts.map((artifact) => (
                <div className="universeCard greenCard" key={artifact.code}>
                  <strong>{artifact.name}</strong>
                  <span>Registry Code: {artifact.code}</span>
                  <span>Minted: {artifact.minted} / {artifact.limit}</span>
                  <span>Remaining: {artifact.limit - artifact.minted}</span>
                  <div className="counterBar">
                    <div className="counterFill" style={{ width: `${(artifact.minted / artifact.limit) * 100}%` }}></div>
                  </div>
                  <div className="status statusGreen">{artifact.status}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeChamber === "commerce" && (
          <>
            <div className="card sectionPad redPanel">
              <div className="cardTitle restrictedTitle">Protected Commerce Layer</div>
              <p>
                Pre-order and crowdfunding systems are planned, but no payments are
                collected on this public version. Payment collection should only be
                activated after refund terms, delivery timelines, taxes, shipping,
                factory requirements, and legal review are ready.
              </p>
            </div>

            <div className="card grid3">
              <div className="universeCard greenCard"><div className="countNumber">{countdown.days}</div><strong>Days</strong><span>Until protected release window</span></div>
              <div className="universeCard greenCard"><div className="countNumber">{countdown.hours}</div><strong>Hours</strong><span>Countdown display active</span></div>
              <div className="universeCard greenCard"><div className="countNumber">{countdown.minutes}:{countdown.seconds}</div><strong>Minutes : Seconds</strong><span>Release timing placeholder</span></div>
            </div>

            <div className="card grid3">
              <div className="universeCard redCard"><strong>Pre-Order Chamber</strong><span>Coming soon. No customer funds collected yet.</span><div className="status statusRed">Inactive</div></div>
              <div className="universeCard redCard"><strong>Crowdfund Chamber</strong><span>Campaign structure pending. Manufacturing order not placed.</span><div className="status statusRed">Planning</div></div>
              <div className="universeCard redCard"><strong>Universe Currency</strong><span>Research phase only. No token, sale, or crypto offering active.</span><div className="status statusRed">Research</div></div>
            </div>

            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Collector Interest Chamber</div>
              <p>
                This form records interest only inside this temporary interface. It is
                not connected to payment processing, email storage, or live ordering yet.
              </p>

              <input className="reflectionInput" value={collectorName} onChange={(e) => setCollectorName(e.target.value)} placeholder="COLLECTOR NAME OR VOID NAME" />
              <input className="reflectionInput" value={collectorEmail} onChange={(e) => setCollectorEmail(e.target.value)} placeholder="EMAIL FOR FUTURE NOTIFICATION" />

              <select className="selectInput" value={selectedArtifact} onChange={(e) => setSelectedArtifact(e.target.value)}>
                {artifacts.map((artifact) => (
                  <option key={artifact.code} value={artifact.name}>{artifact.name}</option>
                ))}
              </select>

              <button className="actionButton" onClick={() => setInterestSubmitted(true)}>Register Interest</button>
            </div>

            {interestSubmitted && (
              <div className="card gateResult granted">
                Interest recorded for {collectorName.trim() || "Unknown Collector"} — {selectedArtifact}. No payment has been collected.
              </div>
            )}
          </>
        )}

        {activeChamber === "family" && (
          <>
            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Family Collection Protected Preview</div>
              <p>
                The Family Collection is a future branch of the Ricochet Void Universe
                created for parents, children, and younger learners. Full manuscripts,
                unfinished story text, illustration directions, character designs, and
                unreleased book concepts are not publicly displayed.
              </p>
            </div>

            <div className="card grid3">
              {familyCollection.map((item) => (
                <div className="universeCard greenCard" key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.note}</span>
                  <div className="status statusGreen">{item.status}</div>
                </div>
              ))}
            </div>

            <div className="card sectionPad redPanel">
              <div className="cardTitle restrictedTitle">Public Manuscript Warning</div>
              <p>
                Children’s book manuscripts, unpublished storylines, characters,
                illustration prompts, cover concepts, and rental-platform details remain
                restricted until the creator decides they are ready for release.
              </p>
            </div>
          </>
        )}

        {activeChamber === "vault" && (
          <>
            <div className="card sectionPad redPanel">
              <div className="cardTitle restrictedTitle">Creator Vault Gateway</div>
              <p>
                Restricted creator materials are not published publicly. Trusted eyes
                only. NDA review required before private design disclosure.
              </p>

              <div className="accessChamber">
                <input className="accessInput" value={vaultInput} onChange={(e) => setVaultInput(e.target.value)} placeholder="CREATOR VAULT ACCESS CODE" />
                <button className="actionButton" onClick={verifyVaultAccess}>Verify Vault Access</button>
              </div>
            </div>

            {vaultStatus === "granted" && (
              <div className="card gateResult granted">
                Creator Vault access recognized. Private materials remain withheld from public deployment until NDA-controlled review.
              </div>
            )}

            {vaultStatus === "denied" && (
              <div className="card gateResult denied">
                Vault access denied. Restricted creator materials remain sealed.
              </div>
            )}

            <div className="card grid3">
              <div className="universeCard redCard"><strong>Future Gear Transmission</strong><span>Design files remain restricted until official release.</span><div className="status statusRed">Restricted</div></div>
              <div className="universeCard redCard"><strong>Prototype Electronics</strong><span>Private creator vault access only. NDA required.</span><div className="status statusRed">Hidden</div></div>
              <div className="universeCard redCard"><strong>Accessory Concepts</strong><span>No public render, blueprint, or specification available.</span><div className="status statusRed">Protected</div></div>
            </div>
          </>
        )}

        {activeChamber === "reflection" && (
          <>
            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Foundation Reflection Chamber</div>
              <p>
                You may remain anonymous, or create your own Ricochet Void Universe
                name so your realization cannot be claimed by someone else.
              </p>
            </div>

            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Optional Ricochet Void Name</div>
              <p>
                Use your real name, remain anonymous, or create a Void Name tied to
                your completed Foundation path.
              </p>

              <input className="reflectionInput" value={voidName} onChange={(e) => setVoidName(e.target.value)} placeholder="VOID NAME, OR LEAVE BLANK FOR UNKNOWN SIGNAL" />
            </div>

            <div className="card sectionPad greenPanel">
              <div className="cardTitle">Foundation Realization Submission</div>
              <p>
                What did you come to realize about yourself after completing the
                Foundation Archives?
              </p>

              <textarea className="reflectionText" value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="WRITE YOUR REALIZATION HERE..." />

              <button className="actionButton" onClick={() => setReflectionSubmitted(true)}>Submit Reflection</button>
            </div>

            {reflectionSubmitted && (
              <div className="card gateResult granted">
                Reflection received from {voidName.trim() || "Unknown Signal"}.
                Your realization has been recorded inside the Foundation Chamber.
              </div>
            )}

            <div className="card grid3">
              <div className="universeCard greenCard"><strong>Anonymous Allowed</strong><span>Users can protect their identity while still submitting truth.</span></div>
              <div className="universeCard greenCard"><strong>Void Name Optional</strong><span>A user may claim their journey without revealing their real name.</span></div>
              <div className="universeCard greenCard"><strong>Credit Protected</strong><span>Their chosen name becomes attached to their realization.</span></div>
            </div>
          </>
        )}

        <div className="card sectionPad greenPanel">
          <div className="cardTitle">Intellectual Property Notice</div>
          <p>
            Ricochet Void Universe™, its names, archives, writings, progression
            systems, family stories, children’s books, visual language, creator
            materials, chamber concepts, artwork, design concepts, and related
            universe elements are protected creator materials.
          </p>
          <p>© Oakley Cheuvront. All Rights Reserved.</p>
        </div>

        <div className="footerNotice">
          Ricochet Void Universe™ — All writings, archives, systems, designs,
          artwork, visual identity, progression structures, creator concepts,
          product concepts, artifact registry concepts, children’s stories,
          manuscripts, family collection materials, and related intellectual
          property are owned by Oakley Cheuvront unless otherwise stated.
          Unauthorized reproduction, redistribution, public disclosure, commercial
          use, imitation, reverse engineering, or derivative use is prohibited.
          This public website does not disclose unreleased manuscripts, prototype
          designs, technical specifications, manufacturing information, or private
          creator vault materials.
        </div>

        <div className="hiddenSignal">the archive opens when attention becomes proof</div>
      </section>
    </main>
  );
}
