import { useState } from "react";

const launchChecks = [
  {
    area: "Foundation System",
    status: "In Progress",
    items: [
      "Volume 4 Foundation Chamber upgraded",
      "Archive order hidden",
      "Archive numbers removed from public display",
      "Signal progression defined",
      "Reflection gateway planned",
    ],
  },
  {
    area: "Member System",
    status: "In Progress",
    items: [
      "Member Chamber upgraded",
      "Void Name preview added",
      "Signal rank structure defined",
      "Future profile logic planned",
      "Backend authentication still required",
    ],
  },
  {
    area: "Backend System",
    status: "Blueprint Only",
    items: [
      "Backend Chamber upgraded",
      "Authentication layer planned",
      "Cloud progress planned",
      "Protected PDF delivery planned",
      "Server-side validation required",
    ],
  },
  {
    area: "Access System",
    status: "Blueprint Active",
    items: [
      "Access Chamber upgraded",
      "Entry Access rules defined",
      "Subscription structure defined",
      "Visibility matrix added",
      "Payment security rules added",
    ],
  },
  {
    area: "Security Layer",
    status: "Strengthening",
    items: [
      "_headers added",
      "_redirects added",
      "robots.txt protection added",
      "No secrets stored in frontend files",
      "Backend protection still required",
    ],
  },
  {
    area: "Content Layer",
    status: "Protected",
    items: [
      "Creator-only blueprints withheld",
      "Final hidden answers withheld",
      "Private PDF paths withheld",
      "Family manuscripts protected",
      "Future Gear designs protected",
    ],
  },
];

const creatorAuthorities = [
  "Final approval before launch",
  "Approval of design changes",
  "Approval of public archive releases",
  "Approval of creator vault exposure",
  "Approval of future paid tiers",
  "Approval of product and artifact release",
  "Approval of family collection release",
  "Approval of backend go-live",
  "Approval of public domain launch",
];

const releaseGates = [
  {
    gate: "Development Gate",
    meaning:
      "The universe is still being built. Public access stays shielded while systems are incomplete.",
  },
  {
    gate: "Content Gate",
    meaning:
      "Archives, children’s books, creator blueprints, and product concepts are reviewed before release.",
  },
  {
    gate: "Security Gate",
    meaning:
      "No live accounts, payments, vaults, or protected PDFs go public without backend security.",
  },
  {
    gate: "Access Gate",
    meaning:
      "Entry and paid access systems must follow the rules defined in the Access Chamber.",
  },
  {
    gate: "Creator Approval Gate",
    meaning:
      "Nothing major launches unless Oak approves it.",
  },
];

const riskWarnings = [
  "Do not launch paid subscriptions before backend verification.",
  "Do not publish final archive answers in frontend code.",
  "Do not expose private PDF file paths.",
  "Do not store creator passwords in React files.",
  "Do not store payment secrets in the repository.",
  "Do not release family manuscripts before illustration and rights review.",
  "Do not expose product manufacturing details publicly.",
  "Do not connect pre-orders before refund and delivery terms are written.",
];

export default function CreatorControlChamber() {
  const [selectedGate, setSelectedGate] = useState(releaseGates[0]);
  const [showRisks, setShowRisks] = useState(false);

  const totalItems = launchChecks.reduce(
    (total, group) => total + group.items.length,
    0
  );

  return (
    <section>
      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Creator Control Chamber</div>

        <h2>CREATOR AUTHORITY SYSTEM</h2>

        <p>
          The Creator Control Chamber protects the Ricochet Void Universe from
          being launched too early, changed without approval, monetized without
          structure, or exposed before the correct security layers exist.
        </p>

        <p>
          Nothing in this chamber launches the site automatically. It exists as
          the creator-facing command center for readiness, protection, and final
          approval.
        </p>

        <div className="statusGreen">Creator Authority Active</div>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Launch Readiness Overview</div>

        <p>
          Current tracked readiness areas: {launchChecks.length}
        </p>

        <p>
          Current tracked checklist items: {totalItems}
        </p>

        <p>
          Overall state: <strong>Development Protected</strong>
        </p>
      </div>

      <div className="placeholderGrid">
        {launchChecks.map((group) => (
          <div className="placeholderCard" key={group.area}>
            <strong>{group.area}</strong>
            <span>{group.status}</span>
            {group.items.map((item) => (
              <span key={item}>☐ {item}</span>
            ))}
          </div>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Authority Rules</div>

        {creatorAuthorities.map((authority) => (
          <p key={authority}>• {authority}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Release Gates</div>

        <p>
          These gates define what must be respected before major parts of the
          universe become public.
        </p>
      </div>

      <div className="placeholderGrid">
        {releaseGates.map((gate) => (
          <button
            className="placeholderCard"
            key={gate.gate}
            onClick={() => setSelectedGate(gate)}
          >
            <strong>{gate.gate}</strong>
            <span>View gate meaning</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Release Gate</div>

        <h2>{selectedGate.gate}</h2>

        <p>{selectedGate.meaning}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Risk Warnings</div>

        <p>
          The following warnings protect the universe from common creator-project
          mistakes.
        </p>

        <button
          className="actionButton"
          onClick={() => setShowRisks(!showRisks)}
        >
          {showRisks ? "Hide Risk Warnings" : "Show Risk Warnings"}
        </button>

        {showRisks && (
          <div>
            {riskWarnings.map((warning) => (
              <p key={warning}>⚠ {warning}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Frontend Security Limit</div>

        <p>
          This chamber can display readiness, warnings, release gates, and
          creator standards. It cannot enforce real security by itself.
        </p>

        <p>
          Future enforcement requires backend authentication, private database
          rules, protected file storage, creator-only admin controls, payment
          verification, and server-side permissions.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Oak Approval Standard</div>

        <p>
          Oak remains the final creative authority for the Ricochet Void
          Universe. Any major change to the startup experience, website
          structure, core presentation, access rules, protected content, or
          release timing must be approved before implementation.
        </p>

        <p>
          This standard protects the universe from drifting away from its
          original creator vision.
        </p>
      </div>
    </section>
  );
}
