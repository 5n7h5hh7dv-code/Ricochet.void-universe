import { useState } from "react";

const commerceSystems = [
  {
    title: "Future Gear",
    status: "Planned",
    purpose: "Clothing, accessories, fitness gear, and future universe merchandise.",
  },
  {
    title: "Artifact Commerce",
    status: "Protected",
    purpose: "Limited artifact releases connected to the Artifact Registry.",
  },
  {
    title: "Digital Archives",
    status: "Future Release",
    purpose: "Protected archive delivery tied to member permissions.",
  },
  {
    title: "Subscriptions",
    status: "Future Integration",
    purpose: "Signal Access, Sub-Creator, Architect Circle, and Universe Architect tiers.",
  },
  {
    title: "Family Collection",
    status: "Future Publishing",
    purpose: "Books, family content, and creator-approved releases.",
  },
];

const commerceRules = [
  "No payment keys inside frontend code.",
  "No subscriptions without backend verification.",
  "No artifact sales without fulfillment planning.",
  "No paid access without account authentication.",
  "Refund and cancellation policies must exist before launch.",
  "Creator approval required before public release.",
];

const futureHooks = [
  "PayPal integration",
  "Stripe integration",
  "Subscription verification",
  "Order history",
  "Collector records",
  "Shipping status",
  "Refund management",
  "Inventory tracking",
  "Creator approval workflow",
];

export default function CommerceChamber() {
  const [selectedSystem, setSelectedSystem] = useState(commerceSystems[0]);
  const [showRules, setShowRules] = useState(false);
  const [showHooks, setShowHooks] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Commerce Chamber</div>

        <h2>COMMERCE ARCHITECTURE</h2>

        <p>
          The Commerce Chamber prepares the future business infrastructure of
          the Ricochet Void Universe while keeping creator control, member trust,
          and fulfillment standards protected.
        </p>

        <div className="statusGreen">Volume 4 Commerce Active</div>
      </div>

      <div className="placeholderGrid">
        {commerceSystems.map((system) => (
          <button
            key={system.title}
            className="placeholderCard"
            onClick={() => setSelectedSystem(system)}
          >
            <strong>{system.title}</strong>
            <span>{system.status}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Commerce System</div>

        <h2>{selectedSystem.title}</h2>

        <p>
          <strong>Status:</strong> {selectedSystem.status}
        </p>

        <p>{selectedSystem.purpose}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Commerce Rules</div>

        <button className="actionButton" onClick={() => setShowRules(!showRules)}>
          {showRules ? "Hide Rules" : "Show Rules"}
        </button>

        {showRules &&
          commerceRules.map((rule) => <p key={rule}>• {rule}</p>)}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Commerce Hooks</div>

        <button className="actionButton" onClick={() => setShowHooks(!showHooks)}>
          {showHooks ? "Hide Hooks" : "Show Hooks"}
        </button>

        {showHooks &&
          futureHooks.map((hook) => <p key={hook}>⬜ {hook}</p>)}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Commerce Standard</div>

        <p>
          Commerce should support the universe, not replace it. Progression,
          creator authority, quality fulfillment, and member trust come first.
        </p>
      </div>
    </section>
  );
}
