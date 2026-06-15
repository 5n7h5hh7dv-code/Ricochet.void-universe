import { useState } from "react";

const vaultSections = [
  {
    title: "Creator Blueprint Vault",
    status: "Creator Only",
    priority: "Critical",
    purpose:
      "Protects private universe plans, archive logic, hidden progression systems, release strategy, and creator-only notes.",
  },
  {
    title: "Archive Master System",
    status: "Protected",
    priority: "Critical",
    purpose:
      "Stores the future creator-side structure for archive order, hidden answer logic, signal rules, and Volume 4 standards.",
  },
  {
    title: "Release Control Vault",
    status: "Protected",
    priority: "High",
    purpose:
      "Tracks what is ready, what is hidden, what is coming soon, and what requires creator approval before launch.",
  },
  {
    title: "Security Review Vault",
    status: "Protected",
    priority: "Critical",
    purpose:
      "Tracks future security needs, backend requirements, account protection, payment safety, and private file delivery.",
  },
  {
    title: "Future Gear Vault",
    status: "Private Concept Storage",
    priority: "High",
    purpose:
      "Protects product concepts, apparel ideas, artifact designs, watches, coins, jewelry, shoes, and future merchandise planning.",
  },
  {
    title: "Family Manuscript Vault",
    status: "Protected",
    priority: "High",
    purpose:
      "Protects children’s stories, family collection ideas, manuscripts, illustrations, publishing notes, and future family releases.",
  },
];

const vaultRules = [
  "Creator-only systems must remain separate from public member systems.",
  "No private keys, passwords, or payment secrets belong in frontend code.",
  "No final hidden archive answers belong in frontend code.",
  "No private PDF paths belong in frontend code.",
  "No creator blueprints should be exposed in public chambers.",
  "Paid member tiers should never automatically access the Creator Vault.",
  "Vault release decisions require Oak’s approval.",
  "Real vault protection requires backend authentication and private storage.",
];

const futureVaultHooks = [
  "Creator authentication",
  "Creator-only dashboard",
  "Private database records",
  "Protected file storage",
  "Release approval workflow",
  "Archive master controls",
  "Security audit logs",
  "Vault access history",
  "Private product planning",
  "Family manuscript management",
  "Future Gear development records",
];

const vaultAccessLayers = [
  {
    layer: "Public",
    access:
      "No access to creator vault systems, private blueprints, archive answers, or unreleased materials.",
  },
  {
    layer: "Member",
    access:
      "May see approved public-facing content, earned progression, and member systems, but not creator-only logic.",
  },
  {
    layer: "Paid Member",
    access:
      "May access paid member content after verification, but still does not access creator vault systems.",
  },
  {
    layer: "Creator",
    access:
      "Controls release decisions, private plans, roadmap direction, protected records, and creator-only systems.",
  },
];

export default function CreatorVault() {
  const [selectedSection, setSelectedSection] = useState(vaultSections[0]);
  const [selectedLayer, setSelectedLayer] = useState(vaultAccessLayers[0]);
  const [showRules, setShowRules] = useState(false);
  const [showHooks, setShowHooks] = useState(false);

  return (
    <section>
      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Volume 4 Creator Vault</div>

        <h2>CREATOR VAULT SYSTEM</h2>

        <p>
          The Creator Vault is the protected command layer of the Ricochet Void
          Universe. It separates creator-only architecture from public systems,
          member systems, access tiers, commerce, family content, and future
          backend infrastructure.
        </p>

        <p>
          This chamber is a frontend blueprint only. Real vault protection must
          later be enforced through authentication, private storage, database
          permissions, audit logs, and creator-only backend controls.
        </p>

        <div className="statusGreen">Volume 4 Vault Blueprint Active</div>
      </div>

      <div className="placeholderGrid">
        {vaultSections.map((section) => (
          <button
            key={section.title}
            className="placeholderCard"
            onClick={() => setSelectedSection(section)}
          >
            <strong>{section.title}</strong>
            <span>{section.status}</span>
            <span>Priority: {section.priority}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Vault Section</div>

        <h2>{selectedSection.title}</h2>

        <p>
          <strong>Status:</strong> {selectedSection.status}
        </p>

        <p>
          <strong>Priority:</strong> {selectedSection.priority}
        </p>

        <p>{selectedSection.purpose}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Vault Access Layers</div>

        <p>
          The vault must remain separate from public visibility and paid member
          access. Higher subscription levels do not equal creator authority.
        </p>
      </div>

      <div className="placeholderGrid">
        {vaultAccessLayers.map((layer) => (
          <button
            key={layer.layer}
            className="placeholderCard"
            onClick={() => setSelectedLayer(layer)}
          >
            <strong>{layer.layer}</strong>
            <span>View access rule</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Access Layer</div>

        <h2>{selectedLayer.layer}</h2>

        <p>{selectedLayer.access}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Vault Rules</div>

        <button className="actionButton" onClick={() => setShowRules(!showRules)}>
          {showRules ? "Hide Vault Rules" : "Show Vault Rules"}
        </button>

        {showRules &&
          vaultRules.map((rule) => <p key={rule}>• {rule}</p>)}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Vault Hooks</div>

        <button className="actionButton" onClick={() => setShowHooks(!showHooks)}>
          {showHooks ? "Hide Future Hooks" : "Show Future Hooks"}
        </button>

        {showHooks &&
          futureVaultHooks.map((hook) => <p key={hook}>⬜ {hook}</p>)}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Frontend Security Limit</div>

        <p>
          This chamber can describe the Creator Vault, but it cannot secure
          private creator materials by itself. Do not place real vault content,
          final answers, credentials, private PDFs, blueprints, or unreleased
          files inside frontend code.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Authority Standard</div>

        <p>
          Oak remains the final creative authority over the Ricochet Void
          Universe. The Creator Vault protects that authority by keeping private
          plans, protected systems, unreleased content, and future controls
          separate from public and member-facing layers.
        </p>
      </div>
    </section>
  );
}
