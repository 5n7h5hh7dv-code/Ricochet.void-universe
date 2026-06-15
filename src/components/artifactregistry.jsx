import { useState } from "react";

const artifactCategories = [
  {
    name: "Founder’s Coin",
    code: "RVU-FC",
    limit: 1000,
    status: "Unreleased",
    priority: "High",
    purpose:
      "A future limited artifact representing the earliest supporters and first recognized members of the Ricochet Void Universe.",
    protection:
      "Designs, minting details, materials, suppliers, and production files remain private until creator approval.",
  },
  {
    name: "Signal Coin",
    code: "RVU-SC",
    limit: 2500,
    status: "Research Phase",
    priority: "Medium",
    purpose:
      "A future collectible tied to signal progression, member participation, and universe expansion.",
    protection:
      "No currency, investment, or token claim should be made without legal and technical review.",
  },
  {
    name: "Architect Relic",
    code: "RVU-AR",
    limit: 100,
    status: "Creator Vault",
    priority: "Critical",
    purpose:
      "A rare future artifact connected to creator-approved access layers and deep universe participation.",
    protection:
      "Private concept only. No public render, factory file, or fulfillment promise should be exposed yet.",
  },
  {
    name: "Archive Ring",
    code: "RVU-RG",
    limit: 777,
    status: "Design Protected",
    priority: "High",
    purpose:
      "A future wearable artifact connected to the Foundation Archives and earned progression.",
    protection:
      "Dimensions, design language, material options, and manufacturing files remain creator protected.",
  },
  {
    name: "Void Artifact Alpha",
    code: "RVU-VA",
    limit: 500,
    status: "Restricted",
    priority: "High",
    purpose:
      "An experimental relic class for the deeper artifact and collector systems of the universe.",
    protection:
      "Prototype structure stays hidden until release terms, production planning, and creator approval exist.",
  },
  {
    name: "Family Collection Token",
    code: "RVU-FAM",
    limit: 1500,
    status: "Future Phase",
    priority: "Medium",
    purpose:
      "A possible collectible connected to family reading experiences, children’s books, and parent access.",
    protection:
      "Family content remains protected until manuscripts, illustrations, publishing rights, and release plans are ready.",
  },
];

const registryRules = [
  "Artifact limits may be displayed publicly only after creator approval.",
  "Design files remain private until official release.",
  "Manufacturing details should never be stored in frontend code.",
  "Collector ownership should eventually be verified by backend records.",
  "Waitlists should connect to real member accounts before public release.",
  "No item should be sold before terms, refund policy, production status, and delivery expectations exist.",
  "Future currency or token concepts must remain research only until legal review.",
  "Creator approval is required before any artifact moves from concept to release.",
];

const releaseStages = [
  {
    stage: "Concept",
    meaning:
      "The artifact exists as a protected idea inside the Ricochet Void Universe.",
  },
  {
    stage: "Design Protected",
    meaning:
      "Visual direction, materials, dimensions, and meaning are being shaped privately.",
  },
  {
    stage: "Prototype",
    meaning:
      "A future physical or digital test version may be created before public release.",
  },
  {
    stage: "Waitlist",
    meaning:
      "Members may register interest after account systems and backend records exist.",
  },
  {
    stage: "Drop Ready",
    meaning:
      "Release terms, fulfillment planning, pricing, limits, and creator approval are complete.",
  },
  {
    stage: "Released",
    meaning:
      "The artifact becomes available through protected commerce and collector records.",
  },
];

const futureRegistryHooks = [
  "Collector account records",
  "Serialized artifact numbering",
  "Drop eligibility tracking",
  "Waitlist priority system",
  "Order history connection",
  "Proof-of-purchase records",
  "Limited release countdowns",
  "Creator release approval",
  "Shipping and fulfillment status",
  "Refund and replacement records",
];

export default function ArtifactRegistry() {
  const [selectedArtifact, setSelectedArtifact] = useState(artifactCategories[0]);
  const [selectedStage, setSelectedStage] = useState(releaseStages[0]);
  const [showRules, setShowRules] = useState(false);
  const [showHooks, setShowHooks] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Artifact Registry</div>

        <h2>RICOCHET VOID ARTIFACT SYSTEM</h2>

        <p>
          The Artifact Registry prepares the future collector layer of the
          Ricochet Void Universe. It organizes limited items, relic classes,
          release stages, collector rules, and backend records before anything
          becomes available to the public.
        </p>

        <p>
          Current state: production-ready frontend registry blueprint. No
          artifact is currently for sale through this component.
        </p>

        <div className="statusGreen">Volume 4 Registry Active</div>
      </div>

      <div className="placeholderGrid">
        {artifactCategories.map((artifact) => (
          <button
            className="placeholderCard"
            key={artifact.code}
            onClick={() => setSelectedArtifact(artifact)}
          >
            <strong>{artifact.name}</strong>
            <span>Registry Code: {artifact.code}</span>
            <span>Limit: {artifact.limit}</span>
            <span>Status: {artifact.status}</span>
            <span>Priority: {artifact.priority}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Artifact</div>

        <h2>{selectedArtifact.name}</h2>

        <p>
          <strong>Registry Code:</strong> {selectedArtifact.code}
        </p>

        <p>
          <strong>Limit:</strong> {selectedArtifact.limit}
        </p>

        <p>
          <strong>Status:</strong> {selectedArtifact.status}
        </p>

        <p>
          <strong>Priority:</strong> {selectedArtifact.priority}
        </p>

        <p>{selectedArtifact.purpose}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Artifact Protection</div>

        <p>{selectedArtifact.protection}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Release Stage System</div>

        <p>
          These stages define how an artifact should move from protected concept
          to approved release.
        </p>
      </div>

      <div className="placeholderGrid">
        {releaseStages.map((stage) => (
          <button
            className="placeholderCard"
            key={stage.stage}
            onClick={() => setSelectedStage(stage)}
          >
            <strong>{stage.stage}</strong>
            <span>View meaning</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Release Stage</div>

        <h2>{selectedStage.stage}</h2>

        <p>{selectedStage.meaning}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Registry Rules</div>

        <button className="actionButton" onClick={() => setShowRules(!showRules)}>
          {showRules ? "Hide Registry Rules" : "Show Registry Rules"}
        </button>

        {showRules && (
          <div>
            {registryRules.map((rule) => (
              <p key={rule}>• {rule}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Registry Hooks</div>

        <button className="actionButton" onClick={() => setShowHooks(!showHooks)}>
          {showHooks ? "Hide Future Hooks" : "Show Future Hooks"}
        </button>

        {showHooks && (
          <div>
            {futureRegistryHooks.map((hook) => (
              <p key={hook}>⬜ {hook}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Commerce Safety Notice</div>

        <p>
          This registry should not collect money, take pre-orders, promise
          shipping, or imply ownership until real commerce infrastructure,
          refund terms, fulfillment planning, and backend collector records are
          created.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Release Standard</div>

        <p>
          No artifact becomes public, purchasable, manufacturable, or collectible
          without creator approval. The registry protects future value by
          slowing the process down until the release is real, secure, and
          deliverable.
        </p>
      </div>
    </section>
  );
}
