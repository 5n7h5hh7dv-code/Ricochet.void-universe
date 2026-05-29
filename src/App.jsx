import { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");
  const [accessStatus, setAccessStatus] = useState("idle");

  const correctSignal = "SIGNAL GROWS WHERE NOISE FALLS";

  function verifySignal() {
    if (code.trim().toUpperCase() === correctSignal) {
      setAccessStatus("granted");
    } else {
      setAccessStatus("denied");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        overflow: "hidden",
        position: "relative",
        background:
          "radial-gradient(circle at 10% 15%, rgba(125,0,255,1) 0%, transparent 28%)," +
          "radial-gradient(circle at 90% 20%, rgba(0,212,255,0.95) 0%, transparent 28%)," +
          "radial-gradient(circle at 50% 85%, rgba(255,0,136,0.9) 0%, transparent 34%)," +
          "linear-gradient(180deg, #020208 0%, #070018 45%, #020208 100%)",
        backgroundSize: "140% 140%",
        animation: "voidShift 12s ease-in-out infinite alternate",
      }}
    >
      <style>
        {`
          .heroPanel {
            position: relative;
            z-index: 10;
            max-width: 1180px;
            animation: heroReveal 1.8s ease forwards;
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
            background:
              repeating-linear-gradient(
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
            width: 620px;
            height: 620px;
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.08);
            box-shadow:
              0 0 85px rgba(125,0,255,0.34),
              inset 0 0 110px rgba(0,212,255,0.18);
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

          .voidSymbol::before {
            inset: 86px;
          }

          .voidSymbol::after {
            inset: 178px;
            border-color: rgba(255,0,136,0.22);
            box-shadow: 0 0 38px rgba(255,0,136,0.28);
          }

          .voidCore {
            position: fixed;
            width: 140px;
            height: 140px;
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
            width: 760px;
            height: 760px;
            border-radius: 50%;
            border: 1px dashed rgba(255,255,255,0.12);
            z-index: 5;
            opacity: 0.5;
            pointer-events: none;
            animation: orbitRotate 50s linear infinite;
          }

          .orbitRing::before,
          .orbitRing::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(0,212,255,0.9);
            box-shadow: 0 0 20px rgba(0,212,255,0.9);
          }

          .orbitRing::before {
            top: 50%;
            left: -5px;
          }

          .orbitRing::after {
            right: -5px;
            top: 50%;
            background: rgba(255,0,136,0.9);
            box-shadow: 0 0 20px rgba(255,0,136,0.9);
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
            max-width: 800px;
            margin: 22px auto 0;
            font-size: 20px;
            color: rgba(255,255,255,0.86);
          }

          .terminal,
          .accessChamber,
          .gateResult,
          .archiveGrid,
          .platformStrip {
            margin: 24px auto 0;
            max-width: 860px;
            border: 1px solid rgba(0,212,255,0.28);
            border-radius: 18px;
            background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25));
            box-shadow:
              0 0 25px rgba(0,212,255,0.18),
              inset 0 0 25px rgba(125,0,255,0.12);
            backdrop-filter: blur(10px);
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

          .dot:nth-child(2) {
            background: rgba(255,0,136,0.8);
          }

          .dot:nth-child(3) {
            background: rgba(125,0,255,0.8);
          }

          .terminalBody {
            padding: 16px;
            font-size: 13px;
            line-height: 1.7;
            letter-spacing: 1px;
            color: rgba(255,255,255,0.76);
          }

          .terminalBody strong {
            color: rgba(0,212,255,0.95);
          }

          .terminalBody em {
            color: rgba(255,0,136,0.9);
            font-style: normal;
          }

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

          .accessInput::placeholder {
            color: rgba(255,255,255,0.45);
          }

          .accessButton {
            border: none;
            border-radius: 12px;
            padding: 14px 18px;
            color: white;
            background: linear-gradient(90deg, rgba(125,0,255,0.8), rgba(0,212,255,0.75));
            box-shadow: 0 0 20px rgba(0,212,255,0.35);
            cursor: pointer;
            transition: 0.3s ease;
          }

          .accessButton:hover {
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

          .entryUnlocked {
            margin-top: 16px;
            padding: 18px;
            border-radius: 18px;
            background: rgba(0,255,190,0.08);
            border: 1px solid rgba(0,255,190,0.35);
            box-shadow: 0 0 35px rgba(0,255,190,0.2);
          }

          .archiveGrid {
            padding: 16px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .archiveCard {
            padding: 14px;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.16);
            background: rgba(255,255,255,0.06);
            text-align: left;
            transition: 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .archiveCard::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent);
            transform: translateX(-120%);
            transition: 0.5s ease;
          }

          .archiveCard:hover::after {
            transform: translateX(120%);
          }

          .archiveCard:hover {
            transform: translateY(-4px);
            box-shadow: 0 0 24px rgba(0,212,255,0.25);
          }

          .archiveCard strong {
            display: block;
            color: white;
            margin-bottom: 6px;
            position: relative;
            z-index: 1;
          }

          .archiveCard span {
            display: block;
            color: rgba(255,255,255,0.58);
            font-size: 12px;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
          }

          .platformStrip {
            padding: 14px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
          }

          .platformCell {
            padding: 10px;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,0.14);
            background: rgba(255,255,255,0.055);
            font-size: 11px;
            letter-spacing: 1.5px;
            color: rgba(255,255,255,0.7);
            text-transform: uppercase;
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

          @keyframes voidShift {
            from { background-position: 0% 0%; }
            to { background-position: 100% 100%; }
          }

          @keyframes starDrift {
            from { background-position: 0 0, 0 0, 0 0; }
            to { background-position: 300px 500px, -250px 400px, 200px -300px; }
          }

          @keyframes signalFloat {
            from { background-position: 0 0, 0 0, 0 0; }
            to { background-position: 220px -300px, -260px 240px, 340px -180px; }
          }

          @keyframes scanMove {
            from { background-position: 0 0; }
            to { background-position: 0 120px; }
          }

          @keyframes symbolRotate {
            from { rotate: 0deg; transform: scale(1); }
            to { rotate: 360deg; transform: scale(1.04); }
          }

          @keyframes corePulse {
            from { transform: scale(0.9); opacity: 0.35; }
            to { transform: scale(1.25); opacity: 0.75; }
          }

          @keyframes orbitRotate {
            from { rotate: 0deg; }
            to { rotate: -360deg; }
          }

          @keyframes heroReveal {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.96);
              filter: blur(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @media (max-width: 900px) {
            .menu,
            .archiveGrid,
            .platformStrip {
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

      <section className="heroPanel">
        <div className="signalTag">Foundation Gateway Active</div>

        <h1>Ricochet Void Universe</h1>

        <p className="subtitle">
          Signal grows where noise falls. Complete the archives, submit the
          correct signal, and unlock Entry Access.
        </p>

        <div className="terminal">
          <div className="terminalTop">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

          <div className="terminalBody">
            <div><strong>STATUS:</strong> Foundation Gate Online</div>
            <div><strong>ENTRY ACCESS:</strong> $0 after archive completion</div>
            <div><strong>REQUIRED SIGNAL:</strong> Hidden inside the Foundation path</div>
            <div><strong>PATH:</strong> Decode → Submit → Verify → Unlock</div>
          </div>
        </div>

        <div className="accessChamber">
          <input
            className="accessInput"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ENTER ARCHIVE COMPLETION SIGNAL"
          />

          <button className="accessButton" onClick={verifySignal}>
            Verify Signal
          </button>
        </div>

        {accessStatus === "granted" && (
          <div className="gateResult granted">
            Signal verified. Entry Access granted.
            <div className="entryUnlocked">
              Universe Gate Open — Entry Chamber Activated.
            </div>
          </div>
        )}

        {accessStatus === "denied" && (
          <div className="gateResult denied">
            Signal rejected. Archive path incomplete.
          </div>
        )}

        {accessStatus === "idle" && (
          <div className="gateResult">
            Awaiting archive completion signal.
          </div>
        )}

        <div className="archiveGrid">
          <div className="archiveCard">
            <strong>Mirror Code</strong>
            <span>Foundation archive awaiting completion</span>
          </div>

          <div className="archiveCard">
            <strong>Silence Architecture</strong>
            <span>Signal hidden beneath noise</span>
          </div>

          <div className="archiveCard">
            <strong>Void Progression</strong>
            <span>Access path locked</span>
          </div>
        </div>

        <div className="platformStrip">
          <div className="platformCell">Entry Access</div>
          <div className="platformCell">Signal Access</div>
          <div className="platformCell">Sub-Creator</div>
          <div className="platformCell">Architect Circle</div>
          <div className="platformCell">Future Gear</div>
        </div>

        <div className="menu">
          <a href="#foundation" className="button">
            Begin Foundation
            <span>Start Path</span>
          </a>

          <a href="#archives" className="button">
            Foundation Archives
            <span>Decode</span>
          </a>

          <a href="#portal" className="button">
            Access Portal
            <span>Verify</span>
          </a>

          <a href="#futuregear" className="button">
            Future Gear
            <span>Coming Soon</span>
          </a>
        </div>

        <div className="hiddenSignal">silence is not empty</div>
      </section>
    </main>
  );
}
