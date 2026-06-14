import { useEffect, useState } from "react";

const CREATOR_PREVIEW_CODE = "CREATOR-PREVIEW";

const chambers = [
  "foundation",
  "member",
  "backend",
  "access",
  "roadmap",
  "control",
  "artifacts",
  "commerce",
  "family",
  "vault",
  "reflection",
];

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [creatorPreview, setCreatorPreview] = useState(false);
  const [creatorPreviewInput, setCreatorPreviewInput] = useState("");
  const [creatorPreviewMessage, setCreatorPreviewMessage] = useState("Creator preview locked.");
  const [activeChamber, setActiveChamber] = useState("foundation");

  useEffect(() => {
    setCreatorPreview(localStorage.getItem("rvuCreatorPreview") === "unlocked");
    const timer = setTimeout(() => setIntroComplete(true), 5200);
    return () => clearTimeout(timer);
  }, []);

  function unlockCreatorPreview() {
    if (creatorPreviewInput.trim().toUpperCase() === CREATOR_PREVIEW_CODE) {
      setCreatorPreview(true);
      localStorage.setItem("rvuCreatorPreview", "unlocked");
      setCreatorPreviewMessage("Creator preview unlocked.");
      setCreatorPreviewInput("");
    } else {
      setCreatorPreviewMessage("Preview code rejected.");
    }
  }

  function lockCreatorPreview() {
    setCreatorPreview(false);
    localStorage.removeItem("rvuCreatorPreview");
    setCreatorPreviewMessage("Creator preview locked.");
  }

  function ChamberContent() {
    return (
      <section className="card greenPanel">
        <div className="cardTitle">{activeChamber} chamber</div>
        <h2>{activeChamber.toUpperCase()} CHAMBER</h2>
        <p>This chamber is stabilized and ready for its next full upgrade.</p>
        <p>
          The cinematic universe shell has been restored. Next we rebuild each
          chamber safely, one complete file at a time.
        </p>
        <div className="statusGreen">Chamber Stable</div>
      </section>
    );
  }

  return (
    <main className="pageShell">
      <style>{`
        .pageShell {
          min-height: 100vh;
          padding: 40px;
          color: white;
          text-align: center;
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 15%, rgba(125,0,255,1) 0%, transparent 28%),
            radial-gradient(circle at 90% 20%, rgba(0,212,255,.95) 0%, transparent 28%),
            radial-gradient(circle at 50% 85%, rgba(255,0,136,.9) 0%, transparent 34%),
            linear-gradient(180deg, #020208 0%, #070018 45%, #020208 100%);
          background-size: 140% 140%;
          animation: voidShift 12s ease-in-out infinite alternate;
        }

        .stars {
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(white 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,.9) 1px, transparent 1px),
            radial-gradient(rgba(255,0,136,.8) 1px, transparent 1px);
          background-size: 90px 90px, 140px 140px, 220px 220px;
          animation: starDrift 30s linear infinite;
          opacity: .55;
          pointer-events: none;
        }

        .signalParticles {
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(rgba(255,255,255,.85) 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,.95) 2px, transparent 2px),
            radial-gradient(rgba(255,0,136,.75) 1.5px, transparent 1.5px);
          background-size: 180px 180px, 260px 260px, 340px 340px;
          animation: signalFloat 18s linear infinite;
          opacity: .5;
          z-index: 4;
          pointer-events: none;
        }

        .scanLines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.035) 0px,
            rgba(255,255,255,.035) 1px,
            transparent 1px,
            transparent 6px
          );
          opacity: .35;
          z-index: 6;
          pointer-events: none;
          animation: scanMove 8s linear infinite;
        }

        .orbitRing {
          position: fixed;
          left: 50%;
          top: 50%;
          width: 820px;
          height: 820px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,.12);
          z-index: 5;
          opacity: .5;
          pointer-events: none;
          animation: orbitRotate 50s linear infinite;
        }

        .voidSymbol {
          position: fixed;
          left: 50%;
          top: 50%;
          width: 660px;
          height: 660px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,.08);
          box-shadow: 0 0 90px rgba(125,0,255,.34), inset 0 0 120px rgba(0,212,255,.18);
          z-index: 5;
          opacity: .56;
          pointer-events: none;
          animation: symbolRotate 30s linear infinite;
        }

        .voidCore {
          position: fixed;
          left: calc(50% - 72px);
          top: calc(50% - 72px);
          width: 145px;
          height: 145px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.95), rgba(0,212,255,.45), rgba(125,0,255,.15), transparent 70%);
          box-shadow: 0 0 35px rgba(255,255,255,.35), 0 0 85px rgba(0,212,255,.48), 0 0 140px rgba(255,0,136,.28);
          z-index: 5;
          opacity: .66;
          pointer-events: none;
          animation: corePulse 4s ease-in-out infinite alternate;
        }

        .crashIntro {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #090018 0%, #020208 60%, #000 100%);
          overflow: hidden;
          animation: introFade 5.2s ease forwards;
        }

        .crashStarfield {
          position: absolute;
          inset: -20%;
          background-image:
            radial-gradient(white 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,.9) 1px, transparent 1px),
            radial-gradient(rgba(255,0,136,.8) 1px, transparent 1px);
          background-size: 70px 70px, 110px 110px, 170px 170px;
          animation: collapseStars 5s cubic-bezier(.2,.9,.2,1) forwards;
          opacity: .9;
        }

        .crashRing {
          position: absolute;
          width: 75vmin;
          height: 75vmin;
          border-radius: 50%;
          border: 1px solid rgba(0,255,190,.3);
          box-shadow: 0 0 60px rgba(0,212,255,.35), inset 0 0 80px rgba(125,0,255,.3);
          animation: ringCollapse 5s ease forwards;
        }

        .crashRingTwo {
          width: 95vmin;
          height: 95vmin;
          border-color: rgba(255,0,136,.25);
          animation-delay: .2s;
        }

        .crashCore {
          position: absolute;
          width: 26vmin;
          height: 26vmin;
          border-radius: 50%;
          background:
            radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(0,212,255,.75) 12%, rgba(125,0,255,.3) 30%, rgba(0,0,0,1) 58%);
          box-shadow:
            0 0 80px rgba(0,212,255,.65),
            0 0 140px rgba(255,0,136,.45),
            0 0 220px rgba(125,0,255,.5);
          animation: voidBirth 5s ease forwards;
        }

        .crashFlash {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 120px 80px rgba(255,255,255,.3);
          opacity: 0;
          animation: ricochetFlash 5s ease forwards;
        }

        .crashTitle {
          position: relative;
          z-index: 4;
          margin-top: 42vmin;
          font-size: clamp(28px, 5vw, 74px);
          letter-spacing: 5px;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(0,212,255,.9), 0 0 45px rgba(255,0,136,.5);
          opacity: 0;
          animation: titleMaterialize 5s ease forwards;
        }

        .introSkip {
          position: absolute;
          right: 24px;
          bottom: 24px;
          z-index: 5;
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(0,0,0,.4);
          color: rgba(255,255,255,.8);
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 11px;
        }

        .contentShell {
          position: relative;
          z-index: 10;
          animation: heroReveal 1.4s ease forwards;
        }

        h1 {
          font-size: clamp(48px, 8vw, 96px);
          margin: 0;
          letter-spacing: 3px;
          line-height: .95;
          text-shadow: 0 0 12px rgba(125,0,255,.9), 0 0 28px rgba(0,212,255,.7), 0 0 50px rgba(255,0,136,.5);
        }

        .signalTag {
          display: inline-block;
          margin-bottom: 14px;
          padding: 7px 16px;
          border: 1px solid rgba(0,212,255,.35);
          border-radius: 999px;
          background: rgba(255,255,255,.07);
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          box-shadow: 0 0 18px rgba(0,212,255,.2);
        }

        .subtitle {
          max-width: 900px;
          margin: 22px auto 0;
          color: rgba(255,255,255,.86);
          line-height: 1.6;
          font-size: 18px;
        }

        .card {
          max-width: 1000px;
          margin: 24px auto;
          padding: 20px;
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.25));
          border: 1px solid rgba(255,255,255,.18);
          box-shadow: 0 0 25px rgba(0,212,255,.18), inset 0 0 25px rgba(125,0,255,.12);
          text-align: left;
          backdrop-filter: blur(10px);
        }

        .greenPanel {
          border-color: rgba(0,255,190,.3);
        }

        .redPanel {
          border-color: rgba(255,0,136,.35);
        }

        .cardTitle {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0,255,190,.95);
          margin-bottom: 10px;
        }

        .restrictedTitle {
          color: rgba(255,0,136,.95);
        }

        .card p {
          color: rgba(255,255,255,.78);
          line-height: 1.65;
        }

        .nav {
          max-width: 1280px;
          margin: 28px auto;
          display: grid;
          grid-template-columns: repeat(11, 1fr);
          gap: 8px;
          position: sticky;
          top: 12px;
          z-index: 20;
        }

        button {
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 12px;
          padding: 12px;
          color: white;
          background: rgba(0,0,0,.38);
          cursor: pointer;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 1px;
          backdrop-filter: blur(10px);
        }

        button:hover,
        button.active {
          transform: translateY(-2px);
          border-color: rgba(0,255,190,.6);
          background: rgba(0,255,190,.15);
          box-shadow: 0 0 22px rgba(0,255,190,.22);
        }

        input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          border-radius: 12px;
          border: none;
          margin: 10px 0;
          color: white;
          background: rgba(255,255,255,.1);
          outline: none;
          letter-spacing: 2px;
        }

        .actionButton {
          background: linear-gradient(90deg, rgba(125,0,255,.8), rgba(0,212,255,.75));
          box-shadow: 0 0 20px rgba(0,212,255,.35);
        }

        .statusGreen {
          display: inline-block;
          margin-top: 10px;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: rgba(0,255,190,.12);
          color: rgba(0,255,190,.92);
        }

        .footer {
          max-width: 1000px;
          margin: 30px auto 0;
          color: rgba(255,255,255,.55);
          font-size: 12px;
          line-height: 1.6;
        }

        @keyframes introFade {
          0%, 85% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }

        @keyframes collapseStars {
          0% { transform: scale(1.4) rotate(0deg); filter: blur(0); }
          45% { transform: scale(.85) rotate(80deg); filter: blur(1px); }
          70% { transform: scale(.28) rotate(170deg); filter: blur(3px); }
          100% { transform: scale(1.4) rotate(260deg); filter: blur(0); }
        }

        @keyframes ringCollapse {
          0% { transform: scale(2.2) rotate(0deg); opacity: 0; }
          25% { opacity: .8; }
          60% { transform: scale(.35) rotate(220deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }

        @keyframes voidBirth {
          0% { transform: scale(0); opacity: 0; }
          35% { transform: scale(.5); opacity: .75; }
          65% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(.15); opacity: 0; }
        }

        @keyframes ricochetFlash {
          0%, 55% { opacity: 0; transform: scale(.2); }
          67% { opacity: 1; transform: scale(22); }
          100% { opacity: 0; transform: scale(.2); }
        }

        @keyframes titleMaterialize {
          0%, 48% { opacity: 0; transform: translateY(20px) scale(.95); filter: blur(8px); }
          70% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          92% { opacity: 1; }
          100% { opacity: 0; }
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
          from { rotate: 0deg; }
          to { rotate: 360deg; }
        }

        @keyframes corePulse {
          from { transform: scale(.9); opacity: .35; }
          to { transform: scale(1.25); opacity: .75; }
        }

        @keyframes orbitRotate {
          from { rotate: 0deg; }
          to { rotate: -360deg; }
        }

        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(30px) scale(.96); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @media (max-width: 900px) {
          .nav {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 48px;
          }
        }
      `}</style>

      {!introComplete && (
        <div className="crashIntro">
          <div className="crashStarfield"></div>
          <div className="crashRing crashRingTwo"></div>
          <div className="crashRing"></div>
          <div className="crashCore"></div>
          <div className="crashFlash"></div>
          <div className="crashTitle">Ricochet Void Universe</div>
          <button className="introSkip" onClick={() => setIntroComplete(true)}>
            Skip Formation
          </button>
        </div>
      )}

      <div className="stars"></div>
      <div className="signalParticles"></div>
      <div className="scanLines"></div>
      <div className="orbitRing"></div>
      <div className="voidSymbol"></div>
      <div className="voidCore"></div>

      <section className="contentShell">
        {!creatorPreview ? (
          <>
            <div className="signalTag">Ricochet Void Universe</div>
            <h1>Universe Forming</h1>

            <p className="subtitle">
              Public launch is shielded. Creator preview is required while the
              universe is still being built and protected.
            </p>

            <section className="card greenPanel">
              <div className="cardTitle">Creator Preview Gate</div>
              <p>Enter the preview code to unlock the development universe.</p>

              <input
                value={creatorPreviewInput}
                onChange={(e) => setCreatorPreviewInput(e.target.value)}
                placeholder="CREATOR PREVIEW CODE"
              />

              <button className="actionButton" onClick={unlockCreatorPreview}>
                Unlock Preview
              </button>

              <p>{creatorPreviewMessage}</p>
            </section>
          </>
        ) : (
          <>
            <div className="signalTag">Creator Preview Mode Active</div>
            <h1>Ricochet Void Universe</h1>

            <p className="subtitle">
              The cinematic shell is restored. The universe is stabilized and
              ready for chamber-by-chamber upgrades.
            </p>

            <section className="card redPanel">
              <div className="cardTitle restrictedTitle">Creator Preview Control</div>
              <p>This keeps the live public version protected while we build.</p>
              <button onClick={lockCreatorPreview}>Lock Creator Preview</button>
            </section>

            <div className="nav">
              {chambers.map((chamber) => (
                <button
                  key={chamber}
                  className={activeChamber === chamber ? "active" : ""}
                  onClick={() => setActiveChamber(chamber)}
                >
                  {chamber}
                </button>
              ))}
            </div>

            <ChamberContent />

            <section className="card greenPanel">
              <div className="cardTitle">Intellectual Property Notice</div>
              <p>
                Ricochet Void Universe™, its names, archives, writings,
                progression systems, chamber concepts, artwork, designs, and
                related universe elements are protected creator materials.
              </p>
              <p>© Oakley Cheuvront. All Rights Reserved.</p>
            </section>

            <div className="footer">
              Unauthorized reproduction, redistribution, public disclosure,
              commercial use, imitation, reverse engineering, or derivative use is
              prohibited.
            </div>
          </>
        )}
      </section>
    </main>
  );
}
