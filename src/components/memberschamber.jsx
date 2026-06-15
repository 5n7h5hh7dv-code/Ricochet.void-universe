import { useState } from "react";

const memberRanks = [
  {
    rank: "Unawakened Signal",
    stage: "Visitor",
    meaning:
      "The member has not begun the Foundation Path yet. The universe is visible, but the path has not truly started.",
  },
  {
    rank: "Path Initiate",
    stage: "Foundation Started",
    meaning:
      "The member has entered the Foundation and begun interacting with the archive system.",
  },
  {
    rank: "Signal Builder",
    stage: "Foundation Progress",
    meaning:
      "The member is building awareness through archives, signals, reflection, and accountability.",
  },
  {
    rank: "Foundation Architect",
    stage: "Foundation Complete",
    meaning:
      "The member has completed the Foundation Path and is eligible for future reflection review.",
  },
  {
    rank: "Entry Signal",
    stage: "Entry Eligible",
    meaning:
      "The member has completed Foundation and Reflection requirements and may qualify for Entry Access.",
  },
];

const memberSystems = [
  {
    title: "Member Identity",
    status: "Frontend Ready / Backend Needed",
    description:
      "Members will carry a profile identity, Void Name, account status, signal rank, and progression history across the universe.",
    launchUse:
      "The interface can display identity now. Real identity storage requires authentication and database records later.",
  },
  {
    title: "Signal Rank",
    status: "Frontend Ready",
    description:
      "Signal Rank represents member progression through Foundation, Reflection, Entry Access, and future universe chambers.",
    launchUse:
      "Ranks can display now as frontend states. Real rank persistence requires cloud progress later.",
  },
  {
    title: "Saved Progress",
    status: "Backend Required",
    description:
      "Progress should eventually save archive completion, reflection status, access eligibility, waitlists, subscriptions, and orders.",
    launchUse:
      "This chamber prepares the dashboard structure. Real saving belongs in backend storage.",
  },
  {
    title: "Waitlist Identity",
    status: "Future Database",
    description:
      "Members will be able to join lists for artifacts, coins, Future Gear, family releases, books, and limited drops.",
    launchUse:
      "The system should show readiness now, but real waitlists require account-linked records.",
  },
  {
    title: "Order & Access History",
    status: "Future Commerce",
    description:
      "Future members will track purchases, subscriptions, rentals, pre-orders, collector drops, receipts, and access history.",
    launchUse:
      "No payment data should live here. This is a display and planning layer only until backend commerce exists.",
  },
  {
    title: "Security Status",
    status: "Future Protection",
    description:
      "Future accounts should include login protection, session tracking, device trust, recovery, and multi-factor authentication.",
    launchUse:
      "Security requirements are shown now. Enforcement must happen through backend authentication later.",
  },
];

const dashboardPanels = [
  {
    id: "overview",
    title: "Overview",
    summary:
      "Shows the member's current identity, rank, account state, and universe standing.",
  },
  {
    id: "progress",
    title: "Progress",
    summary:
      "Shows Foundation progress, signal milestones, reflection state, and Entry Access eligibility.",
  },
  {
    id: "access",
    title: "Access",
    summary:
      "Shows access tier status, locked chambers, earned access, and future subscription states.",
  },
  {
    id: "collection",
    title: "Collection",
    summary:
      "Shows future waitlists, artifacts, family rentals, pre-orders, and collector activity.",
  },
  {
    id: "security",
    title: "Security",
    summary:
      "Shows account protection requirements, backend security needs, and future device/session safeguards.",
  },
];

const memberMilestones = [
  "Create member identity",
  "Choose Void Name",
  "Begin Foundation Path",
  "Recognize first signal",
  "Advance through hidden archive order",
  "Complete Foundation Path",
  "Submit Reflection",
  "Earn Entry Access eligibility",
  "Unlock member dashboard expansion",
  "Join future waitlists or access tiers",
];

const backendRequirements = [
  "Account authentication",
  "Password reset and recovery",
  "Secure sessions",
  "Device trust controls",
  "Multi-factor authentication",
  "Database member records",
  "Cloud-saved progress",
  "Server-side archive verification",
  "Protected reflection storage",
  "Payment and subscription verification",
  "Waitlist records",
  "Order history records",
];

const securityRules = [
  "Do not store passwords inside this file.",
  "Do not store member records inside this file.",
  "Do not store payment information inside this file.",
  "Do not store final hidden answers inside this file.",
  "Do not store private PDF paths inside this file.",
  "Do not treat frontend state as real account security.",
  "Use backend authentication before public member accounts launch.",
  "Use database permissions before storing member progress.",
];

const profilePrivacyRules = [
  "Void Name can allow public identity without exposing personal identity.",
  "Email should be used for account login only after authentication exists.",
  "Reflection privacy should be controlled by the member later.",
  "Creator review should not expose private member details publicly.",
  "Public profiles should never reveal sensitive account data.",
];

export default function MemberChamber() {
  const [voidName, setVoidName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [previewActive, setPreviewActive] = useState(false);
  const [activePanel, setActivePanel] = useState("overview");
  const [selectedSystem, setSelectedSystem] = useState(memberSystems[0]);
  const [selectedRank, setSelectedRank] = useState(memberRanks[0]);
  const [showBackendRequirements, setShowBackendRequirements] = useState(false);
  const [showSecurityRules, setShowSecurityRules] = useState(false);

  function createPreviewProfile() {
    if (!memberEmail.trim() && !voidName.trim()) return;
    setPreviewActive(true);
  }

  function resetPreviewProfile() {
    setPreviewActive(false);
    setVoidName("");
    setMemberEmail("");
    setSelectedRank(memberRanks[0]);
    setActivePanel("overview");
  }

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Member Chamber</div>

        <h2>MEMBER ACCOUNT SYSTEM</h2>

        <p>
          The Member Chamber is the identity and progress center of the Ricochet
          Void Universe. It prepares the future member dashboard for Void Names,
          Signal Rank, Foundation progress, Entry Access eligibility, waitlists,
          orders, subscriptions, and security status.
        </p>

        <p>
          This is a production-ready frontend chamber for the current site. Real
          account storage, login, cloud progress, payment verification, and
          protected records must connect through backend systems later.
        </p>

        <div className="statusGreen">Volume 4 Member Chamber Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Member Security Standard</div>

        <p>
          The frontend can display a member dashboard, but it cannot be trusted
          as the final account authority. Real member identity must be protected
          by authentication, database permissions, secure sessions, and
          server-side validation.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Preview Member Identity</div>

        <p>
          This preview lets the creator see how a future member identity may
          appear without creating a real account yet.
        </p>

        <input
          value={voidName}
          onChange={(event) => setVoidName(event.target.value)}
          placeholder="VOID NAME"
        />

        <input
          value={memberEmail}
          onChange={(event) => setMemberEmail(event.target.value)}
          placeholder="EMAIL ADDRESS OR FUTURE LOGIN ID"
        />

        <button className="actionButton" onClick={createPreviewProfile}>
          Create Preview Profile
        </button>

        {previewActive && (
          <button className="actionButton" onClick={resetPreviewProfile}>
            Reset Preview Profile
          </button>
        )}

        {previewActive && (
          <p>
            Preview profile active for{" "}
            <strong>{voidName.trim() || "Unknown Signal"}</strong>.
          </p>
        )}
      </div>

      <div className="placeholderGrid">
        {memberRanks.map((rank) => (
          <button
            className="placeholderCard"
            key={rank.rank}
            onClick={() => setSelectedRank(rank)}
          >
            <strong>{rank.rank}</strong>
            <span>{rank.stage}</span>
            <span>View rank meaning</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Signal Rank</div>

        <h2>{selectedRank.rank}</h2>

        <p>
          <strong>Stage:</strong> {selectedRank.stage}
        </p>

        <p>{selectedRank.meaning}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Dashboard Panels</div>

        <p>
          These panels define the long-term member dashboard structure. They can
          display now and later connect to real account data.
        </p>
      </div>

      <div className="placeholderGrid">
        {dashboardPanels.map((panel) => (
          <button
            className="placeholderCard"
            key={panel.id}
            onClick={() => setActivePanel(panel.id)}
          >
            <strong>{panel.title}</strong>
            <span>{panel.summary}</span>
            <span>{activePanel === panel.id ? "Currently selected" : "Open panel"}</span>
          </button>
        ))}
      </div>

      {activePanel === "overview" && (
        <div className="card greenPanel">
          <div className="cardTitle">Overview Panel</div>

          <p>
            <strong>Void Name:</strong> {voidName.trim() || "Not chosen yet"}
          </p>

          <p>
            <strong>Email / Login ID:</strong>{" "}
            {memberEmail.trim() || "Not entered yet"}
          </p>

          <p>
            <strong>Profile Status:</strong>{" "}
            {previewActive ? "Preview Active" : "Not Created"}
          </p>

          <p>
            <strong>Signal Rank:</strong> {selectedRank.rank}
          </p>

          <p>
            <strong>Account Type:</strong> Frontend Preview
          </p>
        </div>
      )}

      {activePanel === "progress" && (
        <div className="card greenPanel">
          <div className="cardTitle">Progress Panel</div>

          {memberMilestones.map((milestone) => (
            <p key={milestone}>☐ {milestone}</p>
          ))}

          <p>
            Future progress should connect to cloud records after authentication
            and backend storage are ready.
          </p>
        </div>
      )}

      {activePanel === "access" && (
        <div className="card greenPanel">
          <div className="cardTitle">Access Panel</div>

          <p>
            <strong>Entry Access:</strong> Earned after Foundation completion,
            signal verification, and Reflection review.
          </p>

          <p>
            <strong>Signal Access:</strong> Future subscription tier.
          </p>

          <p>
            <strong>Sub-Creator Access:</strong> Future guided creation tier.
          </p>

          <p>
            <strong>Architect Circle:</strong> Future advanced member tier.
          </p>

          <p>
            <strong>Universe Architect:</strong> Highest future public tier.
          </p>
        </div>
      )}

      {activePanel === "collection" && (
        <div className="card greenPanel">
          <div className="cardTitle">Collection Panel</div>

          <p>
            Future members will use this panel to track artifact waitlists,
            collector drops, family rentals, Future Gear, pre-orders, receipts,
            and order history.
          </p>

          <p>
            Current state: display blueprint only. No payment, order, waitlist,
            rental, or subscription is active from this file.
          </p>
        </div>
      )}

      {activePanel === "security" && (
        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Security Panel</div>

          <p>
            Real member accounts require backend security before public launch.
          </p>

          {backendRequirements.map((requirement) => (
            <p key={requirement}>⬜ {requirement}</p>
          ))}
        </div>
      )}

      <div className="placeholderGrid">
        {memberSystems.map((system) => (
          <button
            className="placeholderCard"
            key={system.title}
            onClick={() => setSelectedSystem(system)}
          >
            <strong>{system.title}</strong>
            <span>{system.status}</span>
            <span>{system.description}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Member System</div>

        <h2>{selectedSystem.title}</h2>

        <p>
          <strong>Status:</strong> {selectedSystem.status}
        </p>

        <p>{selectedSystem.description}</p>

        <p>
          <strong>Launch Use:</strong> {selectedSystem.launchUse}
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Profile Privacy Rules</div>

        {profilePrivacyRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Backend Requirements</div>

        <button
          className="actionButton"
          onClick={() => setShowBackendRequirements(!showBackendRequirements)}
        >
          {showBackendRequirements
            ? "Hide Backend Requirements"
            : "Show Backend Requirements"}
        </button>

        {showBackendRequirements && (
          <div>
            {backendRequirements.map((requirement) => (
              <p key={requirement}>⬜ {requirement}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Frontend Security Rules</div>

        <button
          className="actionButton"
          onClick={() => setShowSecurityRules(!showSecurityRules)}
        >
          {showSecurityRules ? "Hide Security Rules" : "Show Security Rules"}
        </button>

        {showSecurityRules && (
          <div>
            {securityRules.map((rule) => (
              <p key={rule}>⚠ {rule}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Member Standard</div>

        <p>
          The Member Chamber should feel like a real part of the universe, not a
          temporary placeholder. It defines how identity, progress, access,
          collection activity, and security will eventually become one connected
          member experience.
        </p>

        <p>
          Current production role: permanent frontend dashboard structure.
          Future role: live account dashboard connected to backend services.
        </p>
      </div>
    </section>
  );
}
