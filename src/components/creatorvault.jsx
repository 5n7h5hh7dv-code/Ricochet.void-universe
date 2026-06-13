import { useState } from "react";

const vaultSystems = [
  {
    title: "Creator Blueprint Vault",
    status: "Protected",
    description:
      "Stores future creator-only planning documents, roadmap decisions, private architecture notes, and unpublished universe systems.",
  },
  {
    title: "Archive Master Records",
    status: "Protected",
    description:
      "Contains creator-side archive ordering, progression structure, answer validation strategy, and release planning.",
  },
  {
    title: "Release Control Center",
    status: "Protected",
    description:
      "Used for approving releases, launches, updates, products, family collections, and future universe expansions.",
  },
  {
    title: "Security Review Vault",
    status: "Protected",
    description:
      "Tracks future security audits, deployment readiness, access reviews, and infrastructure protection plans.",
  },
  {
    title: "Future Universe Expansion",
    status: "Protected",
    description:
      "Stores concepts, future volumes, expansion plans, and unreleased universe pathways.",
  },
];

const vaultRules = [
  "Creator-only materials remain separated from member content.",
  "Frontend files should never contain vault secrets.",
  "Vault access should require backend authentication.",
  "Private creator records should remain outside public repositories.",
  "Creator credentials should never be stored in React files.",
  "Protected blueprints should remain inaccessible to public users.",
  "Release authority remains with the creator.",
  "Vault content should remain independent from paid membership tiers.",
];

const protectedCategories = [
  "Creator blueprints",
  "Future volume planning",
  "Archive answer chains",
  "Private roadmap notes",
  "Security planning",
  "Product manufacturing details",
  "Family manuscript drafts",
  "Unreleased artwork",
  "Future business planning",
];

export default function CreatorVault() {
  const [showProtectedCategories, setShowProtectedCategories] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(vaultSystems[0]);

  return (
    <section>
      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Creator Vault</div>

        <h2>CREATOR AUTHORITY VAULT</h2>

        <p>
          The Creator Vault exists to separate creator-only systems from public
          systems. It is the final protected layer above public visitors,
          Foundation participants, members, and subscription tiers.
        </p>

        <p>
          This chamber defines what belongs exclusively to creator control and
          what should never be exposed through public frontend systems.
        </p>

        <div className="statusGreen">Vault Blueprint Active</div>
      </div>

      <div className="placeholderGrid">
        {vaultSystems.map((system) => (
          <button
            className="placeholderCard"
            key={system.title}
            onClick={() => setSelectedSystem(system)}
          >
            <strong>{system.title}</strong>
            <span>{system.status}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Vault System</div>

        <h2>{selectedSystem.title}</h2>

        <p>{selectedSystem.description}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Vault Protection Rules</div>

        {vaultRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Protected Categories</div>

        <button
          className="actionButton"
          onClick={() =>
            setShowProtectedCategories(!showProtectedCategories)
          }
        >
          {showProtectedCategories
            ? "Hide Categories"
            : "Show Categories"}
        </button>

        {showProtectedCategories && (
          <div>
            {protectedCategories.map((category) => (
              <p key={category}>⬜ {category}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">
          Frontend Security Warning
        </div>

        <p>
          This chamber represents creator authority. It does not provide real
          protection by itself.
        </p>

        <p>
          Real vault protection requires backend authentication, private
          databases, secure storage, access control, audit logs, permission
          systems, and creator-only infrastructure.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Authority Standard</div>

        <p>
          Creator authority is not based on subscription level, purchase
          history, or progression rank. Creator authority exists separately from
          member access and remains the final approval layer of the universe.
        </p>

        <p>
          No paid tier should automatically gain access to creator vault
          systems.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Vault Standard</div>

        <p>
          Volume 4 requires strong separation between public experience,
          progression systems, business systems, and creator-only architecture.
          The vault exists to preserve that separation while allowing the public
          universe to continue expanding.
        </p>
      </div>
    </section>
  );
}
