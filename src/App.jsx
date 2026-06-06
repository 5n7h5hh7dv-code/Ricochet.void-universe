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
  const [creatorPreview, setCreatorPreview] = useState(false);
  const [creatorPreviewInput, setCreatorPreviewInput] = useState("");
  const [creatorPreviewMessage, setCreatorPreviewMessage] = useState("Creator preview locked.");
  const [activeChamber, setActiveChamber] = useState("foundation");

  useEffect(() => {
    setCreatorPreview(localStorage.getItem("rvuCreatorPreview") === "unlocked");
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
        <h2>{activeChamber.toUpperCase()} CHAMBER</h2>
        <p>
          This chamber is connected and ready for its next full upgrade.
        </p>
        <p>
          The Ricochet Void Universe is now stabilized so we can rebuild each
          chamber safely one file at a time.
        </p>
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
          background:
            radial-gradient(circle at top left, rgba(125,0,255,.9), transparent 30%),
            radial-gradient(circle at top right, rgba(0,212,255,.8), transparent 30%),
            radial-gradient(circle at bottom, rgba(255,0,136,.7), transparent 35%),
            #020208;
        }

        h1 {
          font-size: clamp(42px, 7vw, 90px);
          margin: 0;
          text-shadow: 0 0 25px rgba(0,212,255,.8);
        }

        .subtitle {
          max-width: 850px;
          margin: 20px auto;
          color: rgba(255,255,255,.78);
          line-height: 1.6;
        }

        .card {
          max-width: 1000px;
          margin: 24px auto;
          padding: 20px;
          border-radius: 18px;
          background: rgba(0,0,0,.45);
          border: 1px solid rgba(255,255,255,.18);
          box-shadow: 0 0 25px rgba(0,212,255,.18);
          text-align: left;
        }

        .greenPanel {
          border-color: rgba(0,255,190,.3);
        }

        .redPanel {
          border-color: rgba(255,0,136,.35);
        }

        .nav {
          max-width: 1200px;
          margin: 28px auto;
          display: grid;
          grid-template-columns: repeat(11, 1fr);
          gap: 8px;
        }

        button {
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 12px;
          padding: 12px;
          color: white;
          background: rgba(255,255,255,.08);
          cursor: pointer;
          text-transform: uppercase;
          font-size: 11px;
        }

        button.active {
          border-color: rgba(0,255,190,.6);
          background: rgba(0,255,190,.15);
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
        }

        .actionButton {
          background: linear-gradient(90deg, rgba(125,0,255,.8), rgba(0,212,255,.75));
        }

        .footer {
          max-width: 1000px;
          margin: 30px auto 0;
          color: rgba(255,255,255,.55);
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .nav {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {!creatorPreview ? (
        <>
          <h1>Ricochet Void Universe</h1>
          <p className="subtitle">
            Public launch is shielded. Creator preview is required while the
            universe is still being built and protected.
          </p>

          <section className="card greenPanel">
            <h2>Creator Preview Gate</h2>
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
          <h1>Ricochet Void Universe</h1>
          <p className="subtitle">
            Creator Preview Mode Active. The universe is stabilized and ready
            for chamber-by-chamber upgrades.
          </p>

          <section className="card redPanel">
            <h2>Creator Preview Control</h2>
            <p>
              This keeps the live public version protected while we build.
            </p>
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
            <h2>Intellectual Property Notice</h2>
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
    </main>
  );
}
