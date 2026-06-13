import { useState } from "react";

const commerceSystems = [
  {
    title: "Pre-Orders",
    status: "Future Phase",
    purpose:
      "Allows members to reserve future items before production begins, only after terms and delivery expectations are clear.",
    protection:
      "No pre-order should activate until refund policy, delivery timeline, and fulfillment plan are ready.",
  },
  {
    title: "Collector Drops",
    status: "Future Phase",
    purpose:
      "Limited releases connected to artifact registry records, member eligibility, and drop timing.",
    protection:
      "Drop access should be controlled through member accounts and backend permissions.",
  },
  {
    title: "Subscriptions",
    status: "Future Phase",
    purpose:
      "Supports Signal Access, Sub-Creator Access, Architect Circle, and Universe Architect tiers.",
    protection:
      "Subscription status must be confirmed by backend payment webhooks, not frontend buttons.",
  },
  {
    title: "Family Rentals",
    status: "Future Phase",
    purpose:
      "Temporary access for parents to read children’s books and family collection materials.",
    protection:
      "Rental access should expire automatically and protect manuscripts from easy redistribution.",
  },
  {
    title: "Order History",
    status: "Future Backend",
    purpose:
      "Stores receipts, order records, delivery status, rentals, subscriptions, and collector purchases.",
    protection:
      "Order records must be stored privately in a secure database tied to member identity.",
  },
  {
    title: "Receipts & Refunds",
    status: "Future Legal Layer",
    purpose:
      "Provides proof of payment, refund windows, cancellation rules, and customer protection.",
    protection:
      "No money should be collected until refund terms and delivery expectations are written clearly.",
  },
];

const commerceRules = [
  "No live payment processing inside frontend code.",
  "No secret payment keys in React files.",
  "No subscriptions without backend verification.",
  "No pre-orders without refund and delivery terms.",
  "No product promises before production planning.",
  "No collector ownership without secure records.",
  "No family rentals without protected delivery.",
  "No creator-only material included in public purchases.",
];

const futurePaymentHooks = [
  "Payment processor connection",
  "Subscription webhook verification",
  "Receipt generation",
  "Refund handling",
  "Order database",
  "Shipping status",
  "Digital rental expiration",
  "Collector drop eligibility",
  "Fraud and abuse monitoring",
  "Creator release approval",
];

export default function CommerceChamber() {
  const [selectedSystem, setSelectedSystem] = useState(commerceSystems[0]);
  const [showHooks, setShowHooks] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Commerce Chamber</div>

        <h2>COMMERCE BLUEPRINT</h2>

        <p>
          The Commerce Chamber prepares the future business side of the Ricochet
          Void Universe: subscriptions, pre-orders, collector drops, family
          rentals, receipts, refunds, and order history.
        </p>

        <p>
          Current state: no payment system is active. This chamber is a protected
          blueprint only.
        </p>

        <div className="statusGreen">Commerce Blueprint Active</div>
      </div>

      <div className="placeholderGrid">
        {commerceSystems.map((system) => (
          <button
            className="placeholderCard"
            key={system.title}
            onClick={() => setSelectedSystem(system)}
          >
            <strong>{system.title}</strong>
            <span>{system.status}</span>
            <span>{system.purpose}</span>
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
        <div className="cardTitle restrictedTitle">Commerce Protection</div>

        <p>{selectedSystem.protection}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Commerce Safety Rules</div>

        {commerceRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Payment Hooks</div>

        <button
          className="actionButton"
          onClick={() => setShowHooks(!showHooks)}
        >
          {showHooks ? "Hide Payment Hooks" : "Show Payment Hooks"}
        </button>

        {showHooks && (
          <div>
            {futurePaymentHooks.map((hook) => (
              <p key={hook}>⬜ {hook}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Payment Security Hold</div>

        <p>
          PayPal, Stripe, subscriptions, product checkout, and rental checkout
          should not be connected until backend authentication, secure
          environment variables, database records, payment webhooks, and creator
          approval are ready.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Commerce Standard</div>

        <p>
          Commerce should serve the universe without weakening it. Nothing should
          be sold before it can be delivered, protected, tracked, and explained
          clearly to the member.
        </p>
      </div>
    </section>
  );
}
