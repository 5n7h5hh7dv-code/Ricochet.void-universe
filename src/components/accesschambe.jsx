import { useState } from "react";

const accessTiers = [
  {
    name: "Entry Access",
    price: "$0",
    status: "Earned Access",
    role: "First true member entry",
    description:
      "Unlocked after the Foundation Path is completed, the Reflection Chamber is reached, and future verification confirms eligibility.",
    requirements: [
      "Complete Foundation Path",
      "Verify required signals",
      "Submit reflection",
      "Pass future account verification",
      "Respect universe rules",
    ],
  },
  {
    name: "Signal Access",
    price: "$9.99 / month",
    status: "Future Subscription",
    role: "Core continuing access",
    description:
      "Future paid tier for members who want continued chamber updates, member-only releases, and expanded progression paths.",
    requirements: [
      "Entry Access eligibility",
      "Active member account",
      "Subscription connected",
      "Content permissions verified",
    ],
  },
  {
    name: "Sub-Creator Access",
    price: "$24.99 / month",
    status: "Future Subscription",
    role: "Guided creation layer",
    description:
      "Future tier for members who want guided creation tools, submission pathways, community systems, and deeper universe participation.",
    requirements: [
      "Signal Access foundation",
      "Member profile active",
      "Submission rules accepted",
      "Creator moderation available",
    ],
  },
  {
    name: "Architect Circle",
    price: "$49.99 / month",
    status: "Future Subscription",
    role: "Advanced private access",
    description:
      "Future tier for deeper creator rooms, private drops, limited previews, higher-level discussion chambers, and advanced progression.",
    requirements: [
      "Sub-Creator standing",
      "Security agreement accepted",
      "No rule violations",
      "Protected content permissions active",
    ],
  },
  {
    name: "Universe Architect",
    price: "$99.99 / month",
    status: "Highest Future Public Tier",
    role: "Deepest public member tier",
    description:
      "Highest public tier before creator-only systems. Designed for the deepest future member experience without exposing creator vault materials.",
    requirements: [
      "Architect Circle standing",
      "Advanced access approval",
      "Creator rules accepted",
      "Vault separation respected",
    ],
  },
];

const accessLaws = [
  "Entry Access is earned, not bought.",
  "Foundation completion should matter before monetization.",
  "Protected content should require permission checks.",
  "Paid access should never reveal creator-only systems.",
  "Subscription access should never bypass progression rules.",
  "Creator authority remains final before launch.",
  "Private files should never be exposed through public frontend paths.",
  "Final hidden answers should never live in frontend code.",
];

const visibilityMatrix = [
  {
    layer: "Public Visitor",
    canSee:
      "Launch shield, public teaser, basic universe concept, and protected entry message.",
    cannotSee:
      "Hidden order, final answers, member chambers, creator vault, private PDFs, payment systems.",
  },
  {
    layer: "Foundation Participant",
    canSee:
      "Archive names, selected public instructions, progression hints, and signal path guidance.",
    cannotSee:
      "Archive numbers, answer chain, backend verification logic, creator blueprint notes.",
  },
  {
    layer: "Entry Member",
    canSee:
      "Member dashboard, reflection access, basic chamber access, future earned entry systems.",
    cannotSee:
      "Paid-tier content, creator vault, private development files, unreleased designs.",
  },
  {
    layer: "Paid Member",
    canSee:
      "Subscription-based chambers, future releases, member-only updates, eligible drops.",
    cannotSee:
      "Creator-only decisions, private keys, internal blueprints, hidden moderation criteria.",
  },
  {
    layer: "Creator",
    canSee:
      "Launch controls, review systems, creator vault references, release readiness, protected roadmaps.",
    cannotSee:
      "Nothing by default, but sensitive credentials should still stay outside frontend code.",
  },
];

const backendHooks = [
  "Account authentication",
  "Subscription status check",
  "Foundation completion verification",
  "Reflection submission review",
  "Protected PDF delivery",
  "Content permission rules",
  "Payment processor webhooks",
  "Refund and cancellation handling",
  "Creator approval system",
  "Member violation tracking",
];

const paymentSafetyRules = [
  "No live payment keys inside React files.",
  "No PayPal secret keys inside frontend code.",
  "No Stripe secret keys inside frontend code.",
  "No subscription activation without backend confirmation.",
  "No paid unlock without account authentication.",
  "No pre-orders without terms, refunds, delivery rules, and creator approval.",
  "No creator-only material included in paid public tiers.",
];

export default function AccessChamber() {
  const [selectedTier, setSelectedTier] = useState(accessTiers[0]);
  const [selectedLayer, setSelectedLayer] = useState(visibilityMatrix[0]);
  const [showBackendNotes, setShowBackendNotes] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Access Chamber</div>

        <h2>ACCESS ARCHITECTURE</h2>

        <p>
          The Access Chamber defines who can enter, what they can see, what must
          be earned, what can become subscription-based later, and what must
          always remain protected.
        </p>

        <p>
          This chamber connects the Foundation Path, Member Chamber, Backend
          Chamber, Reflection Chamber, subscriptions, and future protected
          content delivery.
        </p>

        <div className="statusGreen">Access System Blueprint Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Primary Access Rule</div>

        <p>
          Entry Access should remain earned through Foundation completion. Paid
          tiers may expand the universe later, but they should never replace the
          purpose of the Foundation Path.
        </p>

        <p>
          The user should not be able to buy their way past the first lesson of
          the universe: attention, truth, and progression.
        </p>
      </div>

      <div className="placeholderGrid">
        {accessTiers.map((tier) => (
          <button
            className="placeholderCard"
            key={tier.name}
            onClick={() => setSelectedTier(tier)}
          >
            <strong>{tier.name}</strong>
            <span>{tier.price}</span>
            <span>{tier.status}</span>
            <span>{tier.role}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Access Tier</div>

        <h2>{selectedTier.name}</h2>

        <p>
          <strong>Price:</strong> {selectedTier.price}
        </p>

        <p>
          <strong>Status:</strong> {selectedTier.status}
        </p>

        <p>
          <strong>Role:</strong> {selectedTier.role}
        </p>

        <p>{selectedTier.description}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Tier Requirements</div>

        {selectedTier.requirements.map((requirement) => (
          <p key={requirement}>☐ {requirement}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Access Laws</div>

        {accessLaws.map((law) => (
          <p key={law}>• {law}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Visibility Matrix</div>

        <p>
          This matrix defines what each type of user should and should not be
          allowed to access once real backend permissions exist.
        </p>
      </div>

      <div className="placeholderGrid">
        {visibilityMatrix.map((layer) => (
          <button
            className="placeholderCard"
            key={layer.layer}
            onClick={() => setSelectedLayer(layer)}
          >
            <strong>{layer.layer}</strong>
            <span>View permission layer</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Permission Layer</div>

        <h2>{selectedLayer.layer}</h2>

        <p>
          <strong>Can See:</strong> {selectedLayer.canSee}
        </p>

        <p>
          <strong>Cannot See:</strong> {selectedLayer.cannotSee}
        </p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Protected Content Warning</div>

        <p>
          Frontend code can display access tiers, buttons, labels, and preview
          states. It should not be trusted to protect final answers, private
          PDFs, creator vault content, member records, subscriptions, or payment
          status.
        </p>

        <p>
          Real access control must happen on the backend.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Backend Hooks</div>

        <button
          className="actionButton"
          onClick={() => setShowBackendNotes(!showBackendNotes)}
        >
          {showBackendNotes ? "Hide Backend Notes" : "Show Backend Notes"}
        </button>

        {showBackendNotes && (
          <div>
            {backendHooks.map((hook) => (
              <p key={hook}>⬜ {hook}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Payment Security Rules</div>

        {paymentSafetyRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Authority Standard</div>

        <p>
          No access tier should override creator authority. Oak remains the final
          approval point for launch readiness, creator vault exposure, protected
          content release, future gear visibility, family collection release,
          and major universe changes.
        </p>

        <p>
          The Access Chamber should protect the universe from being opened too
          early, monetized too loosely, or exposed before the proper systems are
          ready.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Access Standard</div>

        <p>
          Volume 4 standards require access to feel earned, protected, and
          meaningful. The system should invite users into a living universe
          while still protecting the creator's private architecture.
        </p>

        <p>
          The correct path is: Foundation → Reflection → Entry Eligibility →
          Member Identity → Future Paid Expansion.
        </p>
      </div>
    </section>
  );
}
