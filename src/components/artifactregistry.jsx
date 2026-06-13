import { useState } from "react";

const artifactCategories = [
  {
    name: "Founder’s Coin",
    code: "RVU-FC",
    limit: 1000,
    status: "Unreleased",
    purpose:
      "A future limited artifact representing the earliest supporters and first recognized members of the Ricochet Void Universe.",
    protection:
      "Designs, minting details, materials, suppliers, and production files remain private.",
  },
  {
    name: "Signal Coin",
    code: "RVU-SC",
    limit: 2500,
    status: "Research Phase",
    purpose:
      "A future collectible tied to signal progression, member participation, and universe expansion.",
    protection:
      "No currency, token, or investment claim should be made without legal and technical review.",
  },
  {
    name: "Architect Relic",
    code: "RVU-AR",
    limit: 100,
    status: "Creator Vault",
    purpose:
      "A rare future artifact connected to the deepest creator-approved universe access layers.",
    protection:
      "Private concept only. No public render, factory file, or fulfillment promise should be exposed yet.",
  },
  {
    name: "Archive Ring",
    code: "RVU-RG",
    limit: 777,
    status: "Design Protected",
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
    purpose:
      "A first experimental relic class for the universe’s deeper artifact and collector systems.",
    protection:
      "Prototype structure stays hidden until creator approval, production planning, and release terms exist.",
  },
  {
    name: "Family Collection Token",
    code: "RVU-FAM",
    limit: 1500,
    status: "Future Phase",
    purpose:
      "A possible future collectible connected to family reading experiences, children’s books, and parent access.",
    protection:
      "Family content remains protected until manuscripts, illustrations, and release rights are ready.",
  },
];

const registryRules = [
  "Mint limits may be displayed publicly after creator approval.",
  "Design files should remain private until official release.",
  "Manufacturing details should never be stored in frontend code.",
  "Collector ownership should eventually be verified by backend records.",
  "Waitlists should connect to real accounts before public release.",
  "No item should be sold before terms, refund policy, and delivery expectations exist.",
  "Future currency or token concepts must remain research only until legal review.",
  "Creator approval is required before any artifact moves from concept to release.",
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
];

export default function ArtifactRegistry() {
  const [selectedArtifact, setSelectedArtifact] = useState(artifactCategories[0]);
  const [showFutureHooks, setShowFutureHooks] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Artifact Registry</div>

        <h2>RICOCHET VOID ARTIFACT SYSTEM</h2>

        <p>
          The Artifact Registry prepares the future collector layer of the
          Ricochet Void Universe. It defines limited items, artifact classes,
          collector concepts, release protection, and future backend records.
        </p>

        <p>
          Current state: concept and registry blueprint only. No artifact is
          currently for sale through this frontend.
        </p>

        <div className="statusGreen">Registry Blueprint Active</div>
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
          <strong>Mint Limit:</strong> {selectedArtifact.limit}
        </p>

        <p>
          <strong>Status:</strong> {selectedArtifact.status}
        </p>

        <p>{selectedArtifact.purpose}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Artifact Protection</div>

        <p>{selectedArtifact.protection}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Registry Rules</div>

        {registryRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Registry Hooks</div>

        <button
          className="actionButton"
          onClick={() => setShowFutureHooks(!showFutureHooks)}
        >
          {showFutureHooks ? "Hide Future Hooks" : "Show Future Hooks"}
        </button>

        {showFutureHooks && (
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

        <p>
          Product concepts can be shown later, but factory files, supplier
          information, material specifications, and private design blueprints
          should remain protected.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Release Standard</div>

        <p>
          No artifact becomes public, purchasable, or manufacturable without
          creator approval. The registry protects future value by slowing the
          process down until the release is real, secure, and deliverable.
        </p>
      </div>
    </section>
  );
}
