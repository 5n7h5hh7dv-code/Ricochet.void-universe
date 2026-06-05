import { useEffect, useState } from "react";
import FoundationChamber from "./components/FoundationChamber";
import MemberChamber from "./components/MemberChamber";
import BackendChamber from "./components/BackendChamber";
import AccessChamber from "./components/AccessChamber";
import CreatorControlChamber from "./components/CreatorControlChamber";
import ArtifactRegistry from "./components/ArtifactRegistry";
import CommerceChamber from "./components/CommerceChamber";
import FamilyCollection from "./components/FamilyCollection";
import CreatorVault from "./components/CreatorVault";
import ReflectionChamber from "./components/ReflectionChamber";
const CREATOR_PREVIEW_CODE = "CREATOR-PREVIEW";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [creatorPreview, setCreatorPreview] = useState(false);
  const [creatorPreviewInput, setCreatorPreviewInput] = useState("");
  const [creatorPreviewMessage, setCreatorPreviewMessage] = useState("Creator preview locked.");
  const [activeChamber, setActiveChamber] = useState("foundation");

  useEffect(() => {
    setCreatorPreview(localStorage.getItem("rvuCreatorPreview") === "unlocked");
    const introTimer = setTimeout(() => setIntroComplete(true), 5200);
    return () => clearTimeout(introTimer);
  }, []);

  function unlockCreatorPreview() {
    if (creatorPreviewInput.trim().toUpperCase() === CREATOR_PREVIEW_CODE) {
      setCreatorPreview(true);
      localStorage.setItem("rvuCreatorPreview", "unlocked");
      setCreatorPreviewMessage("Creator preview unlocked on this device.");
      setCreatorPreviewInput("");
    } else {
      setCreatorPreview(false);
      setCreatorPreviewMessage("Preview code rejected.");
    }
  }

  function lockCreatorPreview() {
    setCreatorPreview(false);
    localStorage.removeItem("rvuCreatorPreview");
    setCreatorPreviewMessage("Creator preview locked.");
  }

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
          pointer-events: none;
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
            radial-gradient(rgba(0,212,255,0.9) 1px, transparent 1px),
            radial-gradient(rgba(255,0,136,0.8) 1px, transparent 1px);
          background-size: 70px 70px, 110px 110px, 170px 170px;
          animation: collapseStars 5s cubic-bezier(.2,.9,.2,1) forwards;
          opacity: 0.9;
        }

        .crashRing {
          position: absolute;
          width: 75vmin;
          height: 75vmin;
          border-radius: 50%;
          border: 1px solid rgba(0,255,190,0.3);
          box-shadow: 0 0 60px rgba(0,212,255,0.35), inset 0 0 80px rgba(125,0,255,0.3);
          animation: ringCollapse 5s ease forwards;
        }

        .crashRingTwo {
          width: 95vmin;
          height: 95vmin;
          border-color: rgba(255,0,136,0.25);
          animation-delay: 0.2s;
        }

        .crashCore {
          position: absolute;
          width: 26vmin;
          height: 26vmin;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(0,212,255,0.75) 12%, rgba(125,0,255,0.3) 30%, rgba(0,0,0,1) 58%);
          box-shadow: 0 0 80px rgba(0,212,255,0.65), 0 0 140px rgba(255,0,136,0.45), 0 0 220px rgba(125,0,255,0.5);
          animation: voidBirth 5s ease forwards;
        }

        .crashFlash {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 120px 80px rgba(255,255,255,0.3);
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
          text-shadow: 0 0 20px rgba(0,212,255,0.9), 0 0 45px rgba(255,0,136,0.5);
          opacity: 0;
          animation: titleMaterialize 5s ease forwards;
        }

        .introSkip {
          position: absolute;
          right: 24px;
          bottom: 24px;
          z-index: 5;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(0,0,0,0.4);
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 11px;
        }

        .panel,
        .launchShell {
          position: relative;
          z-index: 10;
          animation: heroReveal 1.4s ease forwards;
        }

        .panel {
          max-width: 1260px;
        }

        .launchShell {
          max-width: 980px;
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

        .subtitle,
        .launchStatement {
          max-width: 900px;
          margin: 22px auto 0;
          font-size: 20px;
          color: rgba(255,255,255,0.86);
          line-height: 1.5;
        }

        .launchStatement {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255,255,255,0.75);
          max-width: 760px;
        }

        .chamberNav {
          margin: 28px auto 0;
          max-width: 1280px;
          display: grid;
          grid-template-columns: repeat(11, 1fr);
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
          font-size: 11px;
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

        .restrictedTitle {
          color: rgba(255,0,136,0.95);
        }

        .sectionPad p {
          margin: 0 0 14px;
          color: rgba(255,255,255,0.78);
          line-height: 1.65;
          font-size: 14px;
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

        .actionButton,
        .dangerButton {
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }

        .actionButton {
          border: none;
          padding: 14px 18px;
          background: linear-gradient(90deg, rgba(125,0,255,0.8), rgba(0,212,255,0.75));
          box-shadow: 0 0 20px rgba(0,212,255,0.35);
        }

        .dangerButton {
          border: 1px solid rgba(255,0,136,0.45);
          background: rgba(255,0,136,0.12);
          margin-top: 12px;
        }

        .gateResult {
          padding: 16px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .denied {
          color: rgba(255,80,140,0.95);
          border-color: rgba(255,0,136,0.45);
          box-shadow: 0 0 30px rgba(255,0,136,0.25);
        }

        .statusGreen {
          display: inline-block;
          margin-top: 10px;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: rgba(0,255,190,0.12);
          color: rgba(0,255,190,0.92);
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

        .placeholderGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 16px;
        }

        .placeholderCard {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.06);
          padding: 14px;
          text-align: left;
        }

        .placeholderCard strong {
          display: block;
          color: white;
          margin-bottom: 6px;
        }

        .placeholderCard span {
          display: block;
          color: rgba(255,255,255,0.62);
          font-size: 12px;
          letter-spacing: 1px;
          line-height: 1.5;
        }

        .hiddenSignal {
          margin-top: 24px;
          font-size: 11px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
        }

        @keyframes introFade {
          0%, 85% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }

        @keyframes collapseStars {
          0% { transform: scale(1.4) rotate(0deg); filter: blur(0); }
          45% { transform: scale(0.85) rotate(80deg); filter: blur(1px); }
          70% { transform: scale(0.28) rotate(170deg); filter: blur(3px); }
          100% { transform: scale(1.4) rotate(260deg); filter: blur(0); }
        }

        @keyframes ringCollapse {
          0% { transform: scale(2.2) rotate(0deg); opacity: 0; }
          25% { opacity: 0.8; }
          60% { transform: scale(0.35) rotate(220deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }

        @keyframes voidBirth {
          0% { transform: scale(0); opacity: 0; }
          35% { transform: scale(0.5); opacity: 0.75; }
          65% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.15); opacity: 0; }
        }

        @keyframes ricochetFlash {
          0%, 55% { opacity: 0; transform: scale(0.2); }
          67% { opacity: 1; transform: scale(22); }
          100% { opacity: 0; transform: scale(0.2); }
        }

        @keyframes titleMaterialize {
          0%, 48% { opacity: 0; transform: translateY(20px) scale(0.95); filter: blur(8px); }
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
          from { opacity: 0; transform: translateY(30px) scale(0.96); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @media (max-width: 900px) {
          .chamberNav,
          .placeholderGrid {
            grid-template-columns: 1fr;
          }

          .accessChamber {
            flex-direction: column;
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
          <button className="introSkip" onClick={() => setIntroComplete(true)}>Skip Formation</button>
        </div>
      )}

      <div className="stars"></div>
      <div className="signalParticles"></div>
      <div className="scanLines"></div>
      <div className="orbitRing"></div>
      <div className="voidSymbol"></div>
      <div className="voidCore"></div>

      {!creatorPreview ? (
        <section className="launchShell">
          <div className="signalTag">Ricochet Void Universe</div>
          <h1>Universe Forming</h1>

          <p className="launchStatement">
            Access is not open yet. The Ricochet Void Universe is still being built,
            protected, tested, and refined before public entry is granted.
          </p>

          <div className="card sectionPad greenPanel">
            <div className="cardTitle">Public Launch Shield</div>

            <p>
              This public shell protects unfinished systems, private creator material,
              hidden archive signals, unreleased designs, member infrastructure,
              future products, and protected progression logic until the universe is
              ready for release.
            </p>

            <div className="accessChamber">
              <input
                className="accessInput"
                value={creatorPreviewInput}
                onChange={(event) => setCreatorPreviewInput(event.target.value)}
                placeholder="CREATOR PREVIEW CODE"
              />

              <button className="actionButton" onClick={unlockCreatorPreview}>
                Unlock Preview
              </button>
            </div>
          </div>

          <div className={`card gateResult ${creatorPreviewMessage.includes("rejected") ? "denied" : ""}`}>
            {creatorPreviewMessage}
          </div>

          <div className="footerNotice">
            Ricochet Void Universe™ is a protected creator project. Unreleased archives,
            product concepts, hidden signals, creator materials, member systems, and
            future commerce systems are not publicly available during development.
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="signalTag">Creator Preview Mode Active</div>

          <h1>Ricochet Void Universe</h1>

          <p className="subtitle">
            Creator preview is unlocked on this device. Public launch remains shielded
            until the universe is complete and ready for release.
          </p>

          <div className="card sectionPad redPanel">
            <div className="cardTitle restrictedTitle">Creator Preview Control</div>

            <p>
              This preview gate is a front-end development shield only. For true private
              deployment security later, use Vercel deployment protection, real
              authentication, backend permissions, and private file storage.
            </p>

            <button className="dangerButton" onClick={lockCreatorPreview}>
              Lock Creator Preview
            </button>
          </div>

          <div className="chamberNav">
            {chambers.map((chamber) => (
              <button
                key={chamber}
                className={`navButton ${activeChamber === chamber ? "active" : ""}`}
                onClick={() => setActiveChamber(chamber)}
              >
                {chamber}
              </button>
            ))}
          </div>

          {activeChamber === "foundation" && <FoundationChamber />}

          {activeChamber === "member" && <MemberChamber />}

          {activeChamber === "backend" && <BackendChamber />}

          {activeChamber === "access" && (
            <section className="card sectionPad greenPanel">
              <div className="cardTitle">Access Chamber</div>
              <p>
                This chamber will contain Entry Access, Signal Access,
                Sub-Creator Access, Architect Circle, and Universe Architect tiers.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
          )}

          {activeChamber === "roadmap" && (
            <section className="card sectionPad greenPanel">
              <div className="cardTitle">Protected Roadmap Chamber</div>
              <p>
                This chamber will show safe build direction without revealing private
                answers, designs, order, or creator-only systems.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
          )}

          {activeChamber === "control" && (
            <section className="card sectionPad greenPanel">
              <div className="cardTitle">Creator Control Chamber</div>
              <p>
                This chamber will contain launch readiness, security readiness,
                content readiness, backend readiness, and final creator approval.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
          )}

          {activeChamber === "artifacts" && (
            <section className="card sectionPad greenPanel">
              <div className="cardTitle">Artifact Registry</div>
              <p>
                This chamber will track future limited artifacts, coins, serialized
                counters, drop status, and protected collector systems.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
          )}

          {activeChamber === "commerce" && (
            <section className="card sectionPad greenPanel">
              <div className="cardTitle">Commerce Chamber</div>
              <p>
                This chamber will prepare pre-orders, crowdfunding, subscriptions,
                receipts, rentals, and future protected payment systems.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
          )}

          {activeChamber === "family" && (
            <section className="card sectionPad greenPanel">
              <div className="cardTitle">Family Collection Chamber</div>
              <p>
                This chamber will protect children’s books, illustrations,
                parent read-along rentals, and younger learning paths.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
          )}

          {activeChamber === "vault" && (
            <section className="card sectionPad redPanel">
              <div className="cardTitle restrictedTitle">Creator Vault Chamber</div>
              <p>
                This chamber will hold the future creator-only vault controls.
                Private materials remain withheld from public deployment.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
          )}

          {activeChamber === "reflection" && (
            <section className="card sectionPad greenPanel">
              <div className="cardTitle">Reflection Chamber</div>
              <p>
                This chamber will contain anonymous reflection submission,
                Void Name identity, and Foundation realization records.
              </p>
              <div className="statusGreen">Component Pending</div>
            </section>
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
          </div>

          <div className="hiddenSignal">
            component architecture started — the universe is becoming scalable.
          </div>
        </section>
      )}
    </main>
  );
}
