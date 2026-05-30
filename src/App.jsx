import { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");
  const [chain, setChain] = useState("");
  const [accessStatus, setAccessStatus] = useState("idle");
  const [chainStatus, setChainStatus] = useState("idle");
  const [view, setView] = useState("home");

  const correctSignal = "SIGNAL GROWS WHERE NOISE FALLS";
  const correctChain = "MIRROR-SILENCE-VOID-ASCENSION";

  function verifySignal() {
    if (code.trim().toUpperCase() === correctSignal) {
      setAccessStatus("granted");
      setTimeout(() => setView("entry"), 1200);
    } else {
      setAccessStatus("denied");
    }
  }

  function verifyChain() {
    if (chain.trim().toUpperCase() === correctChain) {
      setChainStatus("granted");
      setAccessStatus("granted");
      setTimeout(() => setView("entry"), 1400);
    } else {
      setChainStatus("denied");
    }
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

          .voidSymbol::before,
          .voidSymbol::after {
            content: "";
            position: absolute;
            border-radius: 50%;
            border: 1px solid rgba(0,212,255,0.18);
          }

          .voidSymbol::before { inset: 90px; }

          .voidSymbol::after {
            inset: 185px;
            border-color: rgba(255,0,136,0.22);
            box-shadow: 0 0 38px rgba(255,0,136,0.28);
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

          .signalShard {
            position: fixed;
            width: 120px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(0,212,255,0.85), transparent);
            z-index: 7;
            opacity: 0.45;
            pointer-events: none;
            animation: shardFlash 5s ease-in-out infinite;
          }

          .shardOne { top: 24%; left: 16%; transform: rotate(-18deg); }
          .shardTwo { top: 70%; right: 18%; transform: rotate(21deg); animation-delay: 1.4s; }
          .shardThree { top: 42%; right: 8%; transform: rotate(-8deg); animation-delay: 2.6s; }

          .panel, .archiveScreen, .entryScreen {
            position: relative;
            z-index: 10;
            max-width: 1260px;
            animation: heroReveal 1.4s ease forwards;
          }

          .entryScreen, .archiveScreen {
            padding: 28px;
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

          .entryTitle {
            margin: 0;
            font-size: clamp(42px, 7vw, 82px);
            letter-spacing: 3px;
            text-shadow:
              0 0 18px rgba(0,255,190,0.75),
              0 0 35px rgba(0,212,255,0.5),
              0 0 65px rgba(125,0,255,0.45);
          }

          .subtitle, .entrySubtitle {
            max-width: 860px;
            margin: 22px auto 0;
            font-size: 20px;
            color: rgba(255,255,255,0.86);
            line-height: 1.5;
          }

          .entrySubtitle {
            font-size: 18px;
          }

          .card {
            margin: 24px auto 0;
            max-width: 960px;
            border: 1px solid rgba(0,212,255,0.28);
            border-radius: 18px;
            background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25));
            box-shadow:
              0 0 25px rgba(0,212,255,0.18),
              inset 0 0 25px rgba(125,0,255,0.12);
            backdrop-filter: blur(10px);
          }

          .truthStandard, .creatorOath, .archiveReading, .pathNotice {
            padding: 18px;
            text-align: left;
          }

          .truthStandard {
            border-color: rgba(0,255,190,0.28);
            box-shadow:
              0 0 28px rgba(0,255,190,0.14),
              inset 0 0 25px rgba(0,255,190,0.07);
          }

          .cardTitle {
            font-size: 13px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(0,255,190,0.95);
            margin-bottom: 10px;
          }

          .truthStandard p,
          .archiveReading p,
          .pathNotice p {
            margin: 0 0 14px;
            color: rgba(255,255,255,0.78);
            line-height: 1.65;
            font-size: 14px;
          }

          .oathLine {
            color: rgba(255,255,255,0.76);
            font-size: 14px;
            line-height: 1.7;
            border-left: 2px solid rgba(0,212,255,0.55);
            padding-left: 12px;
            margin: 8px 0;
          }

          .terminal {
            text-align: left;
            overflow: hidden;
          }

          .terminalTop {
            display: flex;
            gap: 7px;
            padding: 12px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(0,212,255,0.8);
            box-shadow: 0 0 10px rgba(0,212,255,0.8);
          }

          .dot:nth-child(2) { background: rgba(255,0,136,0.8); }
          .dot:nth-child(3) { background: rgba(125,0,255,0.8); }

          .terminalBody {
            padding: 16px;
            font-size: 13px;
            line-height: 1.7;
            letter-spacing: 1px;
            color: rgba(255,255,255,0.76);
          }

          .terminalBody strong { color: rgba(0,212,255,0.95); }
          .terminalBody em { color: rgba(255,0,136,0.9); font-style: normal; }

          .accessChamber {
            display: flex;
            gap: 10px;
            padding: 10px;
          }

          .accessInput {
            flex: 1;
            border: none;
            outline: none;
            border-radius: 12px;
            padding: 14px;
            color: white;
            background: rgba(255,255,255,0.08);
            letter-spacing: 2px;
          }

          .accessInput::placeholder { color: rgba(255,255,255,0.45); }

          .actionButton,
          .backButton {
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

          .actionButton:hover,
          .backButton:hover {
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

          .grid3 {
            padding: 16px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .grid4 {
            padding: 14px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }

          .grid5 {
            padding: 14px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
          }

          .grid6 {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;
          }

          .archiveGridFull {
            padding: 16px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }

          .miniCard,
          .platformCell,
          .gearItem,
          .entryCard,
          .archiveCardFull {
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.16);
            background: rgba(255,255,255,0.06);
            transition: 0.3s ease;
          }

          .miniCard, .archiveCardFull {
            padding: 14px;
            text-align: left;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .miniCard:hover,
          .archiveCardFull:hover,
          .gearItem:hover {
            transform: translateY(-5px);
            box-shadow:
              0 0 20px rgba(0,212,255,0.35),
              0 0 35px rgba(255,0,136,0.18);
          }

          .archiveCardFull::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent);
            transform: translateX(-130%);
            transition: 0.5s ease;
          }

          .archiveCardFull:hover::after {
            transform: translateX(130%);
          }

          .miniCard strong,
          .archiveCardFull strong,
          .entryCard strong {
            display: block;
            color: white;
            margin-bottom: 6px;
            position: relative;
            z-index: 1;
          }

          .miniCard span,
          .archiveCardFull span,
          .entryCard span {
            display: block;
            color: rgba(255,255,255,0.62);
            font-size: 12px;
            letter-spacing: 1px;
            line-height: 1.5;
            position: relative;
            z-index: 1;
          }

          .archiveStatus {
            display: inline-block;
            margin-top: 10px;
            padding: 4px 8px;
            border-radius: 999px;
            background: rgba(0,212,255,0.12);
            color: rgba(0,212,255,0.86);
            font-size: 10px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
          }

          .platformCell {
            padding: 10px;
            font-size: 11px;
            letter-spacing: 1.5px;
            color: rgba(255,255,255,0.7);
            text-transform: uppercase;
          }

          .futureGearPreview { padding: 16px; }
          .futureGearTitle {
            margin-bottom: 12px;
            font-size: 13px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(0,212,255,0.9);
          }

          .gearItem {
            min-height: 78px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            font-size: 11px;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.75);
            background:
              radial-gradient(circle at 50% 20%, rgba(0,212,255,0.22), transparent 40%),
              rgba(255,255,255,0.055);
          }

          .menu {
            display: grid;
            grid-template-columns: repeat(4, minmax(130px, 1fr));
            gap: 14px;
            margin-top: 30px;
          }

          .button {
            color: white;
            text-decoration: none;
            border: 1px solid rgba(255,255,255,0.35);
            padding: 16px 18px;
            border-radius: 18px;
            background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06));
            box-shadow: 0 0 18px rgba(0,212,255,0.25);
            transition: 0.3s ease;
            backdrop-filter: blur(8px);
            cursor: pointer;
          }

          .button span {
            display: block;
            margin-top: 6px;
            font-size: 11px;
            color: rgba(255,255,255,0.6);
            letter-spacing: 1.5px;
          }

          .button:hover {
            transform: translateY(-6px) scale(1.04);
            background: rgba(255,255,255,0.18);
            box-shadow:
              0 0 20px rgba(0,212,255,0.6),
              0 0 40px rgba(125,0,255,0.45);
          }

          .hiddenSignal {
            margin-top: 24px;
            font-size: 11px;
            letter-spacing: 4px;
            color: rgba(255,255,255,0.22);
            text-transform: uppercase;
          }

          .reflectionPrompt {
            padding: 14px;
            border-radius: 16px;
            background: rgba(0,255,190,0.065);
            border: 1px solid rgba(0,255,190,0.22);
            margin-top: 12px;
            color: rgba(255,255,255,0.78);
            font-size: 14px;
            line-height: 1.6;
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
          @keyframes shardFlash { 0% { opacity: 0; transform: translateX(-20px) scaleX(0.4); } 50% { opacity: 0.8; transform: translateX(20px) scaleX(1); } 100% { opacity: 0; transform: translateX(45px) scaleX(0.4); } }
          @keyframes heroReveal { from { opacity: 0; transform: translateY(30px) scale(0.96); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
          @keyframes gateOpen { from { opacity: 0; transform: scale(0.92); filter: blur(12px); } to { opacity: 1; transform: scale(1); filter: blur(0); } }

          @media (max-width: 900px) {
            .menu, .grid3, .grid4, .grid5, .grid6, .archiveGridFull {
              grid-template-columns: 1fr;
            }

            .accessChamber {
              flex-direction: column;
            }

            h1, .entryTitle {
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

      <div className="dataStream streamOne">archives are not numbered • order is discovered •</div>
      <div className="dataStream streamTwo">follow the hints • assemble the chain • unlock the gate •</div>
      <div className="dataStream streamThree">truth begins where excuses end • mirror standard online •</div>

      <div className="signalShard shardOne"></div>
      <div className="signalShard shardTwo"></div>
      <div className="signalShard shardThree"></div>

      {view === "home" && (
        <section className="panel">
          <div className="signalTag">Foundation Gateway Active</div>

          <h1>Ricochet Void Universe</h1>

          <p className="subtitle">
            The Foundation Archives are the real path. The website is the chamber
            that verifies the signal, the order, and the completion of the journey.
          </p>

          <div className="card truthStandard">
            <div className="cardTitle">The Truth Standard</div>
            <p>
              The Ricochet Void Universe is built on radical truthfulness:
              truth to others, but especially truth to yourself.
            </p>
          </div>

          <div className="card pathNotice">
            <div className="cardTitle">Foundation Path Rule</div>
            <p>
              The archives are not publicly numbered. Each archive contains hints
              that point toward the next. Those who pay attention discover the path.
              Those who rush meet the locked gate.
            </p>
          </div>

          <div className="card terminal">
            <div className="terminalTop">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>

            <div className="terminalBody">
              <div><strong>STATUS:</strong> Foundation Archive Chamber Online</div>
              <div><strong>ENTRY ACCESS:</strong> $0 after foundation completion</div>
              <div><strong>ARCHIVE ORDER:</strong> Hidden through hints</div>
              <div><strong>PATH:</strong> Read PDFs → Find Hints → Assemble Chain → Verify</div>
            </div>
          </div>

          <div className="card archiveGridFull">
            <div className="archiveCardFull" onClick={() => setView("truthArchive")}>
              <strong>First Signal: Truth</strong>
              <span>Prototype archive chamber connected to the truth standard</span>
              <div className="archiveStatus">Open</div>
            </div>

            <div className="archiveCardFull">
              <strong>The Mirror Code</strong>
              <span>PDF archive link placeholder</span>
              <div className="archiveStatus">PDF Pending</div>
            </div>

            <div className="archiveCardFull">
              <strong>Silence Architecture</strong>
              <span>PDF archive link placeholder</span>
              <div className="archiveStatus">PDF Pending</div>
            </div>

            <div className="archiveCardFull">
              <strong>Void Protocol 7</strong>
              <span>PDF archive link placeholder</span>
              <div className="archiveStatus">PDF Pending</div>
            </div>

            <div className="archiveCardFull">
              <strong>Neural Wealth Mapping</strong>
              <span>PDF archive link placeholder</span>
              <div className="archiveStatus">PDF Pending</div>
            </div>

            <div className="archiveCardFull">
              <strong>The Dopamine Collapse Manual</strong>
              <span>PDF archive link placeholder</span>
              <div className="archiveStatus">PDF Pending</div>
            </div>

            <div className="archiveCardFull">
              <strong>Project Ascension</strong>
              <span>PDF archive link placeholder</span>
              <div className="archiveStatus">PDF Pending</div>
            </div>

            <div className="archiveCardFull">
              <strong>The Human Glitch</strong>
              <span>PDF archive link placeholder</span>
              <div className="archiveStatus">PDF Pending</div>
            </div>
          </div>

          <div className="card accessChamber">
            <input
              className="accessInput"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              placeholder="ENTER FOUNDATION SIGNAL CHAIN"
            />

            <button className="actionButton" onClick={verifyChain}>
              Verify Chain
            </button>
          </div>

          {chainStatus === "granted" && (
            <div className="card gateResult granted">
              Foundation chain verified. Opening Entry Chamber...
            </div>
          )}

          {chainStatus === "denied" && (
            <div className="card gateResult denied">
              Chain rejected. The archive order is incomplete.
            </div>
          )}

          {chainStatus === "idle" && (
            <div className="card gateResult">
              Awaiting completed foundation signal chain.
            </div>
          )}

          <div className="card accessChamber">
            <input
              className="accessInput"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ENTER SINGLE ARCHIVE COMPLETION SIGNAL"
            />

            <button className="actionButton" onClick={verifySignal}>
              Verify Signal
            </button>
          </div>

          <div className="card grid5">
            <div className="platformCell">Entry Access</div>
            <div className="platformCell">Signal Access</div>
            <div className="platformCell">Sub-Creator</div>
            <div className="platformCell">Architect Circle</div>
            <div className="platformCell">Future Gear</div>
          </div>

          <div className="card futureGearPreview">
            <div className="futureGearTitle">Future Gear Chamber Preview</div>
            <div className="grid6">
              <div className="gearItem">Void Runner Shoes</div>
              <div className="gearItem">Signal Coins</div>
              <div className="gearItem">Void Watches</div>
              <div className="gearItem">Archive Rings</div>
              <div className="gearItem">Architect Hoodies</div>
              <div className="gearItem">Void Chronometers</div>
            </div>
          </div>

          <div className="menu">
            <button className="button" onClick={() => setView("truthArchive")}>
              Begin Foundation
              <span>Start Path</span>
            </button>

            <button className="button">
              Foundation Archives
              <span>PDF Path</span>
            </button>

            <button className="button">
              Access Portal
              <span>Verify Chain</span>
            </button>

            <button className="button">
              Future Gear
              <span>Coming Soon</span>
            </button>
          </div>

          <div className="hiddenSignal">the order is hidden because attention is the first proof</div>
        </section>
      )}

      {view === "truthArchive" && (
        <section className="archiveScreen card">
          <div className="signalTag">Foundation Archive Open</div>

          <h1 className="entryTitle">First Signal: Truth</h1>

          <p className="entrySubtitle">
            The first archive does not replace the larger PDFs. It sets the
            standard they all must follow.
          </p>

          <div className="archiveReading">
            <div className="cardTitle">Archive Reading</div>

            <p>
              Truth is not always loud. Sometimes truth is the quiet thing you
              already know but keep avoiding. The first signal begins when the
              excuses lose their volume.
            </p>

            <p>
              The Foundation Archives are not meant to be consumed out of order.
              The correct path is discovered through hints, reflections, and
              hidden signals inside the archives themselves.
            </p>

            <p>
              The website does not reveal the order. The website verifies the
              signal chain once the user has earned it.
            </p>

            <div className="reflectionPrompt">
              Reflection I: What truth about yourself have you been avoiding
              because admitting it would require you to change?
            </div>

            <div className="reflectionPrompt">
              Reflection II: What clue would only become obvious after you slowed
              down enough to pay attention?
            </div>

            <div className="reflectionPrompt">
              Reflection III: What action would prove that you heard the signal?
            </div>
          </div>

          <div className="card grid3">
            <div className="miniCard">
              <strong>Signal Law</strong>
              <span>Truth begins where excuses end.</span>
            </div>

            <div className="miniCard">
              <strong>Path Rule</strong>
              <span>The order is discovered, not displayed.</span>
            </div>

            <div className="miniCard">
              <strong>Archive Status</strong>
              <span>Foundation reading active.</span>
            </div>
          </div>

          <button className="backButton" onClick={() => setView("home")}>
            Return To Foundation Gate
          </button>

          <div className="hiddenSignal">signal grows where noise falls</div>
        </section>
      )}

      {view === "entry" && (
        <section className="entryScreen card">
          <div className="signalTag">Entry Access Granted</div>

          <h1 className="entryTitle">Entry Chamber Open</h1>

          <p className="entrySubtitle">
            The Foundation Signal has been verified. You have crossed the first gate
            of the Ricochet Void Universe.
          </p>

          <div className="card grid4">
            <div className="platformCell">Entry Chamber</div>
            <div className="platformCell">Signal Dashboard</div>
            <div className="platformCell">Creator Path</div>
            <div className="platformCell">Future Gear</div>
          </div>

          <div className="card grid3">
            <div className="entryCard">
              <strong>Entry Chamber</strong>
              <span>This is the first unlocked area. Guided paths and foundation rewards will appear here.</span>
            </div>

            <div className="entryCard">
              <strong>Truth Reflection</strong>
              <span>Be truthful with yourself before trying to prove anything to the world.</span>
            </div>

            <div className="entryCard">
              <strong>Creator Path</strong>
              <span>Future route for Sub-Creators, user chambers, marketplace progression, and expansion.</span>
            </div>
          </div>

          <button className="backButton" onClick={() => setView("home")}>
            Return To Foundation Gate
          </button>

          <div className="hiddenSignal">entry is only the first honest step</div>
        </section>
      )}
    </main>
  );
}
