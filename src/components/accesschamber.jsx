import { useState } from "react";

const accessTiers = [
  {
    name: "Entry Access",
    price: "$0",
    status: "Earned Access",
    role: "First true member entry",
    purpose:
      "Entry Access is earned through Foundation completion, signal verification, reflection submission, and future eligibility review.",
    requirements: [
      "Complete Foundation Path",
      "Verify required signals",
      "Submit Foundation Reflection",
      "Hold an active member identity",
      "Pass future backend eligibility review",
    ],
    protection:
      "Entry Access should not be sold directly or granted only by clicking a frontend button.",
  },
  {
    name: "Signal Access",
    price: "$9.99 / month",
    status: "Future Subscription",
    role: "Core continuing access",
    purpose:
      "Signal Access expands the member experience with ongoing chamber updates, member-only releases, and future progression systems.",
    requirements: [
      "Entry Access eligibility",
      "Active member account",
      "Subscription status confirmed by backend",
      "Content permissions verified",
    ],
    protection:
      "Subscription access should be confirmed through backend payment webhooks, not frontend state.",
  },
  {
    name: "Sub-Creator Access",
    price: "$24.99 / month",
    status: "Future Subscription",
    role: "Guided creation layer",
    purpose:
      "Sub-Creator Access is for members who want guided creation tools, submission pathways, and deeper participation in the universe.",
    requirements: [
      "Signal Access foundation",
      "Member profile active",
      "Submission rules accepted",
      "Creator moderation available",
    ],
    protection:
      "Member submissions should be reviewed before becoming part of public universe systems.",
  },
  {
    name: "Architect Circle",
    price: "$49.99 / month",
    status: "Future Subscription",
    role: "Advanced private access",
    purpose:
      "Architect Circle prepares deeper rooms, limited previews, private discussions, advanced drops, and high-level progression.",
    requirements: [
      "Sub-Creator standing",
      "Security agreement accepted",
      "No major rule violations",
      "Protected content permissions active",
    ],
    protection:
      "Advanced access should not expose creator-only vault systems or internal blueprints.",
  },
  {
    name: "Universe Architect",
    price: "$99.99 / month",
    status: "Highest Future Public Tier",
    role: "Deepest public member tier",
    purpose:
      "Universe Architect is the highest public tier before creator-only authority, designed for the deepest member experience.",
    requirements: [
      "Architect Circle standing",
      "Advanced access approval",
      "Creator rules accepted",
      "Vault separation respected",
    ],
    protection:
      "The highest public tier must still remain separate from creator authority and private vault systems.",
  },
];

const accessLaws = [
  "Entry Access is earned, not bought.",
  "Foundation completion should matter before monetization.",
  "Reflection should prove attention, honesty, and personal meaning.",
  "Protected content should require server-side permission checks.",
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
      "Launch shield, public teaser, protected entry message, core universe concept, and basic access structure.",
    cannotSee:
      "Hidden order, final answers, member records, creator vault, private PDFs, payment systems, or backend logic.",
  },
  {
    layer: "Foundation Participant",
    canSee:
      "Archive names, public guidance, progression hints, signal themes, and Foundation orientation.",
    cannotSee:
      "Archive numbers, answer chain, internal verification rules, creator blueprint notes, or private access paths.",
  },
  {
    layer: "Entry Member",
    canSee:
      "Member dashboard, earned entry status, reflection connection, and future basic chamber systems.",
    cannotSee:
      "Paid-tier content, creator vault, private files, unreleased designs, or protected backend records.",
  },
  {
    layer: "Paid Member",
    canSee:
      "Subscription-based chambers, member-only updates, future releases, eligible drops, and access-based features.",
    cannotSee:
      "Creator decisions, private keys, internal blueprints, hidden moderation criteria, or vault systems.",
  },
  {
    layer: "Creator",
    canSee:
      "Launch controls, readiness systems, protected roadmaps, release planning, vault references, and creator-only tools.",
    cannotSee:
      "Sensitive credentials should still not be visible in frontend code; they belong in secure backend environments.",
  },
];

const progressionGates = [
  {
    gate: "Foundation Gate",
    requirement:
      "The member must begin and complete the Foundation Path before deeper access becomes meaningful.",
  },
  {
    gate: "Signal Gate",
    requirement:
      "The member must recognize and verify required signals through future server-side logic.",
  },
  {
    gate: "Reflection Gate",
    requirement:
      "The member must submit a meaningful reflection showing attention, honesty, and personal discovery.",
  },
  {
    gate: "Eligibility Gate",
    requirement:
      "The system or creator must confirm the member is eligible for Entry Access.",
  },
  {
    gate: "Subscription Gate",
    requirement:
      "Paid tiers require account identity, payment confirmation, active subscription status, and permission checks.",
  },
  {
    gate: "Creator Gate",
    requirement:
      "Creator-only releases, vault systems, and major universe changes remain under Oak's approval.",
  },
];

const backendHooks = [
  "Account authentication",
  "Subscription status checks",
  "Foundation completion verification",
  "Reflection submission review",
  "Protected PDF delivery",
  "Content permission rules",
  "Payment processor webhooks",
  "Refund and cancellation handling",
  "Creator approval system",
  "Member violation tracking",
  "Private content storage",
  "Access audit logs",
];

const paymentSafetyRules = [
  "No live payment keys inside React files.",
  "No PayPal secret keys inside frontend code.",
  "No Stripe secret keys inside frontend code.",
  "No subscription activation without backend confirmation.",
  "No paid unlock without account authentication.",
  "No pre-orders without terms, refund rules, delivery rules, and creator approval.",
  "No creator-only material included in paid public tiers.",
  "No payment promises before fulfillment planning exists.",
];

const launchReadyChecks = [
  "Access tier text reviewed",
  "Entry Access rules approved",
  "Paid tier rules approved",
  "Refund and cancellation terms drafted",
  "Backend authentication chosen",
  "Payment processor chosen",
  "Protected PDF delivery planned",
  "Creator approval system planned",
  "Member support process planned",
];

export default function AccessChamber() {
  const [selectedTier, setSelectedTier] = useState(accessTiers[0]);
  const [selectedLayer, setSelectedLayer] = useState(visibilityMatrix[0]);
  const [selectedGate, setSelectedGate] = useState(progressionGates[0]);
  const [showBackendHooks, setShowBackendHooks] = useState(false);
  const [showPaymentRules, setShowPaymentRules] = useState(false);
  const [showLaunchChecks, setShowLaunchChecks] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Access Chamber</div>

        <h2>ACCESS ARCHITECTURE</h2>

        <p>
          The Access Chamber defines who can enter, what they can see, what must
          be earned, what may become subscription-based later, and what must
          always remain protected.
        </p>

        <p>
          This chamber connects Foundation, Reflection, Member Identity, Backend
          Verification, Creator Authority, and future paid access into one
          long-term structure.
        </p>

        <div className="statusGreen">Volume 4 Access System Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Primary Access Rule</div>

        <p>
          Entry Access should remain earned through the Foundation Path. Paid
          tiers can expand the universe later, but they should never replace the
          purpose of progression, attention, reflection, and earned entry.
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

        <p>{selectedTier.purpose}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Tier Requirements</div>

        {selectedTier.requirements.map((requirement) => (
          <p key={requirement}>☐ {requirement}</p>
        ))}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Tier Protection</div>

        <p>{selectedTier.protection}</p>
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
          allowed to access after real backend permissions exist.
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

      <div className="card greenPanel">
        <div className="cardTitle">Progression Gates</div>

        <p>
          These gates define the correct access flow before deeper systems open.
        </p>
      </div>

      <div className="placeholderGrid">
        {progressionGates.map((gate) => (
          <button
            className="placeholderCard"
            key={gate.gate}
            onClick={() => setSelectedGate(gate)}
          >
            <strong>{gate.gate}</strong>
            <span>View requirement</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Progression Gate</div>

        <h2>{selectedGate.gate}</h2>

        <p>{selectedGate.requirement}</p>
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
          Real access control must happen through backend authentication,
          server-side permission checks, private storage, and verified account
          records.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Backend Hooks</div>

        <button
          className="actionButton"
          onClick={() => setShowBackendHooks(!showBackendHooks)}
        >
          {showBackendHooks ? "Hide Backend Hooks" : "Show Backend Hooks"}
        </button>

        {showBackendHooks && (
          <div>
            {backendHooks.map((hook) => (
              <p key={hook}>⬜ {hook}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Payment Security Rules</div>

        <button
          className="actionButton"
          onClick={() => setShowPaymentRules(!showPaymentRules)}
        >
          {showPaymentRules ? "Hide Payment Rules" : "Show Payment Rules"}
        </button>

        {showPaymentRules && (
          <div>
            {paymentSafetyRules.map((rule) => (
              <p key={rule}>⚠ {rule}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Launch Readiness Checks</div>

        <button
          className="actionButton"
          onClick={() => setShowLaunchChecks(!showLaunchChecks)}
        >
          {showLaunchChecks ? "Hide Launch Checks" : "Show Launch Checks"}
        </button>

        {showLaunchChecks && (
          <div>
            {launchReadyChecks.map((check) => (
              <p key={check}>☐ {check}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Authority Standard</div>

        <p>
          No access tier should override creator authority. Oak remains the
          final approval point for launch readiness, creator vault exposure,
          protected content release, Future Gear visibility, family collection
          release, and major universe changes.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Access Standard</div>

        <p>
          Volume 4 requires access to feel earned, protected, and meaningful.
          The correct path is: Foundation → Reflection → Entry Eligibility →
          Member Identity → Future Paid Expansion.
        </p>
      </div>
    </section>
  );
}
