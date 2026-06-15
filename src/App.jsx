import { useEffect, useState } from "react";

import FoundationChamber from "./components/foundationchamber";
import MemberChamber from "./components/memberschamber";
import BackendChamber from "./components/backendchamber";
import AccessChamber from "./components/accesschamber";
import CreatorControlChamber from "./components/creatorcontrolchamber";
import ArtifactRegistry from "./components/artifactregistry";
import CommerceChamber from "./components/commercechamber";
import FamilyCollection from "./components/familycollection";
import CreatorVault from "./components/creatorvault";
import ReflectionChamber from "./components/reflectionchamber";

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
    if (activeChamber === "foundation") return <FoundationChamber />;
    if (activeChamber === "member") return <MemberChamber />;
    if (activeChamber === "backend") return <BackendChamber />;
    if (activeChamber === "access") return <AccessChamber />;
    if (activeChamber === "control") return <CreatorControlChamber />;
    if (activeChamber === "artifacts") return <ArtifactRegistry />;
    if (activeChamber === "commerce") return <CommerceChamber />;
    if (activeChamber === "family") return <FamilyCollection />;
    if (activeChamber === "vault") return <CreatorVault />;
    if (activeChamber === "reflection") return <ReflectionChamber />;

    return (
      <section className="card greenPanel">
        <div className="cardTitle">Roadmap Chamber</div>
        <h2>ROADMAP CHAMBER</h2>
        <p>
          This chamber will become the protected build-order map for the
          Ricochet Void Universe.
        </p>
        <div className="statusGreen">Roadmap Placeholder Active</div>
      </section>
    );
  }

  const defaultProgression = {
    foundationStarted: true,
    foundationComplete: false,
    reflectionComplete: false,
    entryEligible: false,
    entryAccessUnlocked: false,
    memberDashboardUnlocked: true,
  };

  const [progression, setProgression] = useState(defaultProgression);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rvuProgressionEngine");
      if (stored) {
        setProgression({ ...defaultProgression, ...JSON.parse(stored) });
      }
    } catch {
      setProgression(defaultProgression);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("rvuProgressionEngine", JSON.stringify(progression));
    } catch {
      // Local storage may be unavailable in some browsers. The interface still works.
    }
  }, [progression]);

  function updateProgression(key, value) {
    setProgression((current) => {
      const next = { ...current, [key]: value };

      if (key === "foundationComplete" && !value) {
        next.reflectionComplete = false;
        next.entryEligible = false;
        next.entryAccessUnlocked = false;
      }

      if (key === "reflectionComplete" && !value) {
        next.entryEligible = false;
        next.entryAccessUnlocked = false;
      }

      if (next.foundationComplete && next.reflectionComplete) {
        next.entryEligible = true;
      }

      if (!next.entryEligible) {
        next.entryAccessUnlocked = false;
      }

      return next;
    });
  }

  function resetProgression() {
    setProgression(defaultProgression);
  }

  const defaultMemberDashboard = {
    voidName: "",
    signalName: "",
    memberIntent: "",
    profileSaved: false,
    lastMilestone: "Foundation network entered",
    activityLog: [
      "Checkpoint 4 activated",
      "Progression Engine connected",
      "Member Dashboard Network initialized",
    ],
  };

  const [memberDashboard, setMemberDashboard] = useState(defaultMemberDashboard);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rvuMemberDashboard");
      if (stored) {
        setMemberDashboard({
          ...defaultMemberDashboard,
          ...JSON.parse(stored),
        });
      }
    } catch {
      setMemberDashboard(defaultMemberDashboard);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "rvuMemberDashboard",
        JSON.stringify(memberDashboard)
      );
    } catch {
      // The dashboard still works if local storage is unavailable.
    }
  }, [memberDashboard]);

  function updateMemberDashboard(key, value) {
    setMemberDashboard((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function saveMemberProfile() {
    setMemberDashboard((current) => ({
      ...current,
      profileSaved: true,
      lastMilestone: "Member identity saved locally",
      activityLog: [
        "Member identity saved locally",
        ...current.activityLog.slice(0, 5),
      ],
    }));
  }

  function resetMemberDashboard() {
    setMemberDashboard(defaultMemberDashboard);
  }

  function getSignalRank() {
    if (progression.entryAccessUnlocked) return "Entry Signal";
    if (progression.entryEligible) return "Foundation Architect";
    if (progression.reflectionComplete) return "Reflection Carrier";
    if (progression.foundationComplete) return "Signal Builder";
    if (progression.foundationStarted) return "Path Initiate";
    return "Unawakened Signal";
  }

  function getAccessStatus() {
    if (progression.entryAccessUnlocked) return "Entry Access Unlocked";
    if (progression.entryEligible) return "Entry Eligible";
    if (progression.reflectionComplete) return "Reflection Complete";
    if (progression.foundationComplete) return "Foundation Complete";
    return "Foundation In Progress";
  }

  function MemberDashboardNetwork() {
    const rank = getSignalRank();
    const accessStatus = getAccessStatus();

    return (
      <section className="card greenPanel">
        <div className="cardTitle">Volume 4 Member Dashboard Network</div>

        <h2>MEMBER DASHBOARD</h2>

        <p>
          This dashboard connects member identity, saved local profile data,
          signal rank, progression status, entry eligibility, and future account
          hooks into one visible member system.
        </p>

        <p>
          Current mode: local browser dashboard. Future mode: authenticated
          member account connected to cloud progress, protected files,
          subscriptions, waitlists, orders, and creator-approved records.
        </p>

        <div className="placeholderGrid">
          <div className="placeholderCard">
            <strong>Signal Rank</strong>
            <span>{rank}</span>
            <span>Calculated from current progression state.</span>
          </div>

          <div className="placeholderCard">
            <strong>Access Status</strong>
            <span>{accessStatus}</span>
            <span>Updates as Foundation, Reflection, and Entry status change.</span>
          </div>

          <div className="placeholderCard">
            <strong>Profile Status</strong>
            <span>{memberDashboard.profileSaved ? "Saved Locally" : "Not Saved"}</span>
            <span>Future version connects to real authentication.</span>
          </div>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Member Identity</div>

          <input
            value={memberDashboard.voidName}
            onChange={(event) =>
              updateMemberDashboard("voidName", event.target.value)
            }
            placeholder="VOID NAME"
          />

          <input
            value={memberDashboard.signalName}
            onChange={(event) =>
              updateMemberDashboard("signalName", event.target.value)
            }
            placeholder="SIGNAL NAME OR PUBLIC MEMBER TITLE"
          />

          <textarea
            className="reflectionText"
            value={memberDashboard.memberIntent}
            onChange={(event) =>
              updateMemberDashboard("memberIntent", event.target.value)
            }
            placeholder="What is this member trying to build inside the Ricochet Void Universe?"
          />

          <button className="actionButton" onClick={saveMemberProfile}>
            Save Local Member Profile
          </button>

          <button className="actionButton" onClick={resetMemberDashboard}>
            Reset Member Dashboard
          </button>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Member Snapshot</div>

          <p>
            <strong>Void Name:</strong>{" "}
            {memberDashboard.voidName.trim() || "Not chosen yet"}
          </p>

          <p>
            <strong>Signal Name:</strong>{" "}
            {memberDashboard.signalName.trim() || "Not chosen yet"}
          </p>

          <p>
            <strong>Current Rank:</strong> {rank}
          </p>

          <p>
            <strong>Current Access:</strong> {accessStatus}
          </p>

          <p>
            <strong>Last Milestone:</strong> {memberDashboard.lastMilestone}
          </p>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Progression Timeline</div>

          <p>{progression.foundationStarted ? "✓" : "☐"} Foundation Started</p>
          <p>{progression.foundationComplete ? "✓" : "☐"} Foundation Complete</p>
          <p>{progression.reflectionComplete ? "✓" : "☐"} Reflection Complete</p>
          <p>{progression.entryEligible ? "✓" : "☐"} Entry Eligible</p>
          <p>{progression.entryAccessUnlocked ? "✓" : "☐"} Entry Access Unlocked</p>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Activity Feed</div>

          {memberDashboard.activityLog.map((activity) => (
            <p key={activity}>• {activity}</p>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Dashboard Security Notice</div>

          <p>
            This dashboard does not create a real account yet. Do not store
            passwords, payment details, private records, final answers, or
            protected PDF paths here. Real dashboard data must later move into
            authenticated backend records.
          </p>
        </div>
      </section>
    );
  }

  function getProgressPercent() {
    const steps = [
      progression.foundationStarted,
      progression.foundationComplete,
      progression.reflectionComplete,
      progression.entryEligible,
      progression.entryAccessUnlocked,
    ];

    const completed = steps.filter(Boolean).length;
    return Math.round((completed / steps.length) * 100);
  }

  function ProgressionEngine() {
    const percent = getProgressPercent();

    return (
      <section className="card greenPanel">
        <div className="cardTitle">Volume 4 Progression Engine</div>

        <h2>PROGRESSION ENGINE</h2>

        <p>
          This system connects the major Ricochet Void Universe milestones:
          Foundation completion, Reflection completion, Entry eligibility,
          Entry Access, and member dashboard readiness.
        </p>

        <p>
          Current mode: local browser save. Future mode: account-linked cloud
          progress, backend verification, and protected access rules.
        </p>

        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${percent}%` }}></div>
        </div>

        <p>
          <strong>Progress:</strong> {percent}%
        </p>

        <div className="placeholderGrid">
          <button
            className="placeholderCard"
            onClick={() =>
              updateProgression("foundationComplete", !progression.foundationComplete)
            }
          >
            <strong>Foundation</strong>
            <span>{progression.foundationComplete ? "Complete" : "Incomplete"}</span>
            <span>Click to toggle Foundation completion.</span>
          </button>

          <button
            className="placeholderCard"
            onClick={() =>
              updateProgression("reflectionComplete", !progression.reflectionComplete)
            }
          >
            <strong>Reflection</strong>
            <span>{progression.reflectionComplete ? "Complete" : "Incomplete"}</span>
            <span>Requires Foundation completion for real launch logic later.</span>
          </button>

          <button
            className="placeholderCard"
            onClick={() =>
              progression.entryEligible &&
              updateProgression("entryAccessUnlocked", !progression.entryAccessUnlocked)
            }
          >
            <strong>Entry Access</strong>
            <span>{progression.entryEligible ? "Eligible" : "Locked"}</span>
            <span>{progression.entryAccessUnlocked ? "Unlocked" : "Not Unlocked"}</span>
          </button>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Progression Security Notice</div>

          <p>
            This local save system is for launch structure and prototype flow.
            Real members should not receive final protected access from browser
            storage alone. Final access must later be verified by backend
            accounts, database records, protected storage, and server-side rules.
          </p>
        </div>

        <button className="actionButton" onClick={resetProgression}>
          Reset Local Progress
        </button>
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


        .placeholderGrid {
          max-width: 1050px;
          margin: 24px auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .placeholderCard {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.06);
          padding: 14px;
          text-align: left;
          min-height: 120px;
        }

        .placeholderCard strong {
          display: block;
          color: white;
          margin-bottom: 8px;
        }

        .placeholderCard span {
          display: block;
          color: rgba(255,255,255,.68);
          font-size: 12px;
          line-height: 1.5;
          margin-bottom: 6px;
        }

        textarea,
        .reflectionText {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          border-radius: 12px;
          border: none;
          margin: 10px 0;
          color: white;
          background: rgba(255,255,255,.1);
          outline: none;
          letter-spacing: 1px;
          min-height: 130px;
          resize: vertical;
          line-height: 1.5;
        }


        .progressTrack {
          width: 100%;
          height: 16px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(0,255,190,.25);
          margin: 18px 0;
        }

        .progressFill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(125,0,255,.9), rgba(0,212,255,.9), rgba(0,255,190,.9));
          box-shadow: 0 0 18px rgba(0,255,190,.35);
          transition: width .35s ease;
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
              Checkpoint 5 is active. The chamber network, progression engine, and
              Volume 4 Member Dashboard Network are now connected.
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

            <ProgressionEngine />

            <MemberDashboardNetwork />

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
