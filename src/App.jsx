import { useState } from "react";

const signals = [
  {
    answer: "MIRROR",
    title: "Reflection Signal",
    difficulty: "Clear Hint",
    hint: "Every signal begins with a reflection.",
    message: "Reflection recognized. The first path has opened.",
    nextHint: "Where noise falls, silence begins to speak.",
  },
  {
    answer: "SILENCE",
    title: "Silence Signal",
    difficulty: "Light Hidden Clue",
    hint: "Noise must fall before signal becomes visible.",
    message: "Noise reduced. A deeper signal is now active.",
    nextHint: "The void does not answer until you stop filling it.",
  },
  {
    answer: "VOID",
    title: "Void Signal",
    difficulty: "Connect Ideas",
    hint: "The empty space is not empty if you are paying attention.",
    message: "Pattern detected. The void is responding.",
    nextHint: "The only direction after the void is upward.",
  },
  {
    answer: "ASCENSION",
    title: "Ascension Signal",
    difficulty: "Notice Pattern",
    hint: "Progress is not escape. Progress is elevation.",
    message: "Path integrity increasing.",
    nextHint: "The next gate does not open without honesty.",
  },
  {
    answer: "TRUTH",
    title: "Truth Signal",
    difficulty: "Compare Archives",
    hint: "The mirror never lies. It only waits.",
    message: "Truth standard confirmed.",
    nextHint: "Truth without ownership becomes another excuse.",
  },
  {
    answer: "ACCOUNTABILITY",
    title: "Accountability Signal",
    difficulty: "Self-Reflection",
    hint: "Responsibility is the moment blame loses power.",
    message: "Responsibility recognized.",
    nextHint: "Only a builder can cross into the Architect path.",
  },
  {
    answer: "ARCHITECT",
    title: "Architect Signal",
    difficulty: "Full Path Awareness",
    hint: "The Architect does not only observe the universe. The Architect builds.",
    message: "Creator path detected.",
    nextHint: "The final signal is the law that has been speaking the entire time.",
  },
  {
    answer: "SIGNAL GROWS WHERE NOISE FALLS",
    title: "Foundation Completion Signal",
    difficulty: "Complete Chain",
    hint: "The final signal is the central law.",
    message: "Foundation complete. Reflection Chamber unlocked.",
    nextHint: "The path has found you. Reflection is now required.",
  },
];

export default function App() {
  const [view, setView] = useState("home");
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

  const completed = currentSignal;
  const foundationComplete = completed >= signals.length;

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
          setView("reflection");
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
    if (vaultInput.trim().toUpperCase() === "CREATOR-VAULT") {
      setVaultStatus("granted");
    } else {
      setVaultStatus("denied");
    }
  }

  function submitReflection() {
    setReflectionSubmitted(true);
  }

  return (
    <main className="pageShell">
      <style>
        {`
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
            box-shadow:
              0 0 90px rgba(125,0,255,0.34),
              inset 0 0 120px rgba(0,212,255,0.18);
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
            background:
              radial-gradient(circle, rgba(255,255,255,0.95), rgba(0,212,255,0.45), rgba(125,0,255,0.15), transparent 70%);
            box-shadow:
              0 0 35px rgba(255,255,255,0.35),
              0 0 85px rgba(0,212,255,0.48),
              0 0 140px rgba(255,0,136,0.28);
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
            text-shadow:
              0 0 12px rgba(125,0,255,0.9),
              0 0 28px rgba(0,212,255,0.7),
              0 0 50px rgba(255,0,136,0.5);
          }

          .subtitle {
            max-width: 880px;
            margin: 22px auto 0;
            font-size: 20px;
            color: rgba(255,255,255,0.86);
            line-height: 1.5;
          }

          .card {
            margin: 24px auto 0;
            max-width: 980px;
            border: 1px solid rgba(0,212,255,0.28);
            border-radius: 18px;
            background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25));
            box-shadow:
              0 0 25px rgba(0,212,255,0.18),
              inset 0 0 25px rgba(125,0,255,0.12);
            backdrop-filter: blur(10px);
          }

          .truthStandard,
          .hintChamber,
          .reflectionBox,
          .ipNotice,
          .restrictedNotice,
          .vaultPanel {
            padding: 18px;
            text-align: left;
          }

          .truthStandard,
          .hintChamber,
          .reflectionBox,
          .ipNotice {
            border-color: rgba(0,255,190,0.28);
            box-shadow:
              0 0 28px rgba(0,255,190,0.14),
              inset 0 0 25px rgba(0,255,190,0.07);
          }

          .restrictedNotice,
          .vaultPanel {
            border-color: rgba(255,0,136,0.32);
            box-shadow:
              0 0 28px rgba(255,0,136,0.14),
              inset 0 0 25px rgba(255,0,136,0.07);
          }

          .cardTitle {
            font-size: 13px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(0,255,190,0.95);
            margin-bottom: 10px;
          }

          .restrictedTitle {
            color: rgba(255,0,136,0.95);
          }

          .truthStandard p,
          .hintChamber p,
          .reflectionBox p,
          .ipNotice p,
          .restrictedNotice p,
          .vaultPanel p {
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

          .progressCard {
            padding: 18px;
          }

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

          .progressBar {
            height: 10px;
            border-radius: 999px;
            overflow: hidden;
            background: rgba(255,255,255,0.12);
            margin-top: 14px;
          }

          .progressFill {
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
          .reflectionText {
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
          .reflectionText {
            width: 100%;
            box-sizing: border-box;
            margin-top: 10px;
          }

          .reflectionText {
            min-height: 130px;
            resize: vertical;
            line-height: 1.5;
          }

          .accessInput::placeholder,
          .reflectionInput::placeholder,
          .reflectionText::placeholder {
            color: rgba(255,255,255,0.45);
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
          }

          .actionButton:hover {
            transform: translateY(-2px);
            box-shadow:
              0 0 24px rgba(0,212,255,0.55),
              0 0 38px rgba(125,0,255,0.35);
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

          .archiveGridFull,
          .signalGrid,
          .reflectionGrid,
          .restrictedGrid {
            padding: 16px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }

          .reflectionGrid,
          .restrictedGrid {
            grid-template-columns: repeat(3, 1fr);
          }

          .archiveCardFull,
          .signalCard,
          .reflectionCard,
          .restrictedCard {
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.16);
            background: rgba(255,255,255,0.06);
            transition: 0.3s ease;
            padding: 14px;
            text-align: left;
            position: relative;
            overflow: hidden;
          }

          .signalCard.verified {
            border-color: rgba(0,255,190,0.35);
            background: rgba(0,255,190,0.07);
            box-shadow: 0 0 20px rgba(0,255,190,0.15);
          }

          .signalCard.current {
            border-color: rgba(0,212,255,0.42);
            box-shadow: 0 0 22px rgba(0,212,255,0.25);
          }

          .signalCard.locked {
            opacity: 0.48;
          }

          .restrictedCard {
            border-color: rgba(255,0,136,0.22);
            background:
              radial-gradient(circle at 50% 0%, rgba(255,0,136,0.12), transparent 45%),
              rgba(255,255,255,0.055);
          }

          .archiveCardFull:hover,
          .signalCard:hover,
          .reflectionCard:hover,
          .restrictedCard:hover {
            transform: translateY(-5px);
            box-shadow:
              0 0 20px rgba(0,212,255,0.35),
              0 0 35px rgba(255,0,136,0.18);
          }

          .archiveCardFull strong,
          .signalCard strong,
          .reflectionCard strong,
          .restrictedCard strong {
            display: block;
            color: white;
            margin-bottom: 6px;
          }

          .archiveCardFull span,
          .signalCard span,
          .reflectionCard span,
          .restrictedCard span {
            display: block;
            color: rgba(255,255,255,0.62);
            font-size: 12px;
            letter-spacing: 1px;
            line-height: 1.5;
          }

          .archiveStatus,
          .restrictedStatus {
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

          .restrictedStatus {
            background: rgba(255,0,136,0.12);
            color: rgba(255,120,180,0.95);
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
            .archiveGridFull,
            .signalGrid,
            .reflectionGrid,
            .restrictedGrid {
              grid-template-columns: 1fr;
            }

            .accessChamber {
              flex-direction: column;
            }

            h1 {
              font-size: 48px;
            }
          }
        `}
      </style>

      <div className="stars"></div>
      <div className="signalParticles"></div>
      <div className="scanLines"></div>
      <div className="orbitRing"></div>
      <div className="voidSymbol"></div>
      <div className="voidCore"></div>

      <div className="dataStream streamOne">protected creator materials • public disclosure restricted •</div>
      <div className="dataStream streamTwo">designs withheld until release • nda access required •</div>
      <div className="dataStream streamThree">access may be purchased • trust must be earned •</div>

      {view === "home" && (
        <section className="panel">
          <div className="signalTag">Creator Protection Layer Active</div>

          <h1>Ricochet Void Universe</h1>

          <p className="subtitle">
            The Foundation path is verified one signal at a time. Creator designs,
            prototypes, electronics, accessories, and future product concepts remain
            restricted until official release.
          </p>

          <div className="card ipNotice">
            <div className="cardTitle">Intellectual Property Notice</div>
            <p>
              Ricochet Void Universe™, its names, archives, writings, progression
              systems, visual language, creator materials, chamber concepts, artwork,
              design concepts, and related universe elements are protected creator
              materials. Unauthorized copying, redistribution, commercial use,
              public disclosure, reverse engineering, imitation, or derivative use is
              prohibited without written permission.
            </p>
            <p>
              © Oakley Cheuvront. All Rights Reserved.
            </p>
          </div>

          <div className="card restrictedNotice">
            <div className="cardTitle restrictedTitle">Public Disclosure Warning</div>
            <p>
              Future Gear, electronic concepts, accessory designs, prototypes,
              technical notes, blueprints, manufacturing ideas, and unreleased product
              details are intentionally not displayed on this public site. Public
              disclosure can weaken future protection strategies and should be avoided
              until the creator decides what is ready for release.
            </p>
            <p>
              Restricted materials should only be shared with trusted viewers,
              collaborators, manufacturers, or advisors after NDA review and approval.
            </p>
          </div>

          <div className="card truthStandard">
            <div className="cardTitle">The Truth Standard</div>
            <p>
              The goal is not only to find hidden answers. The goal is to become
              truthful enough with yourself to understand what the answers reveal.
            </p>
          </div>

          <div className="card hintChamber">
            <div className="cardTitle">Current Path Hint</div>
            <div className="hintText">{pathHint}</div>
          </div>

          <div className="card progressCard">
            <div className="progressTop">
              <div>Foundation Progress</div>
              <div>{completed} / {signals.length} Signals Verified</div>
            </div>

            <div className="progressBar">
              <div
                className="progressFill"
                style={{ width: `${(completed / signals.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card signalGrid">
            {signals.map((signal, index) => {
              const verified = index < currentSignal;
              const current = index === currentSignal && !foundationComplete;
              const locked = index > currentSignal;

              return (
                <div
                  key={signal.title}
                  className={`signalCard ${verified ? "verified" : ""} ${current ? "current" : ""} ${locked ? "locked" : ""}`}
                >
                  <strong>{signal.title}</strong>
                  <span>Difficulty: {signal.difficulty}</span>
                  <span>
                    Status: {verified ? "Verified" : current ? "Awaiting Signal" : "Locked"}
                  </span>
                </div>
              );
            })}
          </div>

          {!foundationComplete && (
            <div className="card accessChamber">
              <input
                className="accessInput"
                value={signalInput}
                onChange={(e) => setSignalInput(e.target.value)}
                placeholder="ENTER CURRENT ARCHIVE SIGNAL"
              />

              <button className="actionButton" onClick={verifyCurrentSignal}>
                Verify Current Signal
              </button>
            </div>
          )}

          <div
            className={`card gateResult ${
              signalStatus === "granted" ? "granted" : signalStatus === "denied" ? "denied" : ""
            }`}
          >
            {foundationComplete
              ? "Foundation complete. Reflection Chamber unlocked."
              : lastMessage}
          </div>

          {foundationComplete && (
            <button className="actionButton" onClick={() => setView("reflection")}>
              Enter Reflection Chamber
            </button>
          )}

          <div className="card archiveGridFull">
            <div className="archiveCardFull">
              <strong>Silence Architecture</strong>
              <span>Displayed order is not the path</span>
              <div className="archiveStatus">Distorted</div>
            </div>

            <div className="archiveCardFull">
              <strong>The Human Glitch</strong>
              <span>Displayed order is not the path</span>
              <div className="archiveStatus">Unverified</div>
            </div>

            <div className="archiveCardFull">
              <strong>Neural Wealth Mapping</strong>
              <span>Displayed order is not the path</span>
              <div className="archiveStatus">Unknown</div>
            </div>

            <div className="archiveCardFull">
              <strong>The Mirror Code</strong>
              <span>Every signal begins with a reflection</span>
              <div className="archiveStatus">Signal Detected</div>
            </div>

            <div className="archiveCardFull">
              <strong>Project Ascension</strong>
              <span>Displayed order is not the path</span>
              <div className="archiveStatus">Dormant</div>
            </div>

            <div className="archiveCardFull">
              <strong>Void Protocol 7</strong>
              <span>Displayed order is not the path</span>
              <div className="archiveStatus">Fragment Found</div>
            </div>

            <div className="archiveCardFull">
              <strong>The Dopamine Collapse Manual</strong>
              <span>Displayed order is not the path</span>
              <div className="archiveStatus">Partial Signal</div>
            </div>

            <div className="archiveCardFull">
              <strong>Psychological Warfare Against Yourself</strong>
              <span>Displayed order is not the path</span>
              <div className="archiveStatus">Unknown</div>
            </div>
          </div>

          <div className="card restrictedNotice">
            <div className="cardTitle restrictedTitle">Future Gear Public Preview</div>
            <p>
              The public Future Gear chamber will not display unreleased product
              renders, electronics, dimensions, parts, mechanisms, accessory designs,
              blueprints, schematics, or manufacturing details.
            </p>
          </div>

          <div className="card restrictedGrid">
            <div className="restrictedCard">
              <strong>Future Gear Transmission</strong>
              <span>Design files remain restricted until official release.</span>
              <div className="restrictedStatus">Restricted</div>
            </div>

            <div className="restrictedCard">
              <strong>Prototype Electronics</strong>
              <span>Private creator vault access only. NDA required.</span>
              <div className="restrictedStatus">Hidden</div>
            </div>

            <div className="restrictedCard">
              <strong>Accessory Concepts</strong>
              <span>No public render, blueprint, or specification available.</span>
              <div className="restrictedStatus">Protected</div>
            </div>
          </div>

          <div className="card vaultPanel">
            <div className="cardTitle restrictedTitle">Creator Vault Gateway</div>
            <p>
              Restricted creator materials are not published publicly. Trusted eyes
              only. NDA review required before private design disclosure.
            </p>

            <div className="accessChamber">
              <input
                className="accessInput"
                value={vaultInput}
                onChange={(e) => setVaultInput(e.target.value)}
                placeholder="CREATOR VAULT ACCESS CODE"
              />

              <button className="actionButton" onClick={verifyVaultAccess}>
                Verify Vault Access
              </button>
            </div>
          </div>

          {vaultStatus === "granted" && (
            <div className="card gateResult granted">
              Creator Vault access recognized. Private materials remain withheld
              from public deployment until NDA-controlled review.
            </div>
          )}

          {vaultStatus === "denied" && (
            <div className="card gateResult denied">
              Vault access denied. Restricted creator materials remain sealed.
            </div>
          )}

          <div className="footerNotice">
            Ricochet Void Universe™ — All writings, archives, systems, designs,
            artwork, visual identity, progression structures, creator concepts,
            product concepts, and related intellectual property are owned by Oakley
            Cheuvront unless otherwise stated. Unauthorized reproduction,
            redistribution, public disclosure, commercial use, imitation, reverse
            engineering, or derivative use is prohibited. This website does not
            disclose unreleased prototype designs, technical specifications, or
            manufacturing information.
          </div>

          <div className="hiddenSignal">a creator does not reveal the blueprint before the structure is ready</div>
        </section>
      )}

      {view === "reflection" && (
        <section className="panel">
          <div className="signalTag">Foundation Reflection Chamber</div>

          <h1>Reflection Chamber</h1>

          <p className="subtitle">
            You may remain anonymous, or create your own Ricochet Void Universe
            name so your realization cannot be claimed by someone else.
          </p>

          <div className="card reflectionBox">
            <div className="cardTitle">Optional Ricochet Void Name</div>
            <p>
              Use your real name, remain anonymous, or create a Void Name tied to
              your completed Foundation path.
            </p>

            <input
              className="reflectionInput"
              value={voidName}
              onChange={(e) => setVoidName(e.target.value)}
              placeholder="VOID NAME, OR LEAVE BLANK FOR UNKNOWN SIGNAL"
            />
          </div>

          <div className="card reflectionBox">
            <div className="cardTitle">Foundation Realization Submission</div>
            <p>
              What did you come to realize about yourself after completing the
              Foundation Archives?
            </p>

            <textarea
              className="reflectionText"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="WRITE YOUR REALIZATION HERE..."
            />

            <button className="actionButton" onClick={submitReflection}>
              Submit Reflection
            </button>
          </div>

          {reflectionSubmitted && (
            <div className="card gateResult granted">
              Reflection received from {voidName.trim() || "Unknown Signal"}.
              Your realization has been recorded inside the Foundation Chamber.
            </div>
          )}

          <div className="card reflectionGrid">
            <div className="reflectionCard">
              <strong>Anonymous Allowed</strong>
              <span>Users can protect their identity while still submitting truth.</span>
            </div>

            <div className="reflectionCard">
              <strong>Void Name Optional</strong>
              <span>A user may claim their journey without revealing their real name.</span>
            </div>

            <div className="reflectionCard">
              <strong>Credit Protected</strong>
              <span>Their chosen name becomes attached to their realization.</span>
            </div>
          </div>

          <button className="actionButton" onClick={() => setView("home")}>
            Return To Foundation Chamber
          </button>

          <div className="footerNotice">
            Ricochet Void Universe™ — Reflections may be submitted anonymously or
            under a chosen Void Name. Submissions should be truthful, voluntary, and
            respectful. Creator systems and protected materials remain restricted.
          </div>

          <div className="hiddenSignal">
            a signal proves the path was found. a reflection proves the path was felt.
          </div>
        </section>
      )}
    </main>
  );
}
