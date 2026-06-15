import { useState } from "react";

const backendLayers = [
  {
    title: "Authentication Core",
    status: "Future Backend Build",
    priority: "Critical",
    description:
      "Handles member signup, login, password reset, secure sessions, device trust, and multi-factor authentication.",
    launchRequirement:
      "Required before real member accounts, creator admin controls, paid access, or private records go live.",
  },
  {
    title: "Cloud Progress Engine",
    status: "Future Backend Build",
    priority: "Critical",
    description:
      "Stores Foundation progress, signal verification, reflection status, member rank, and Entry Access eligibility.",
    launchRequirement:
      "Required before members can continue across devices or keep permanent progression records.",
  },
  {
    title: "Protected Archive Delivery",
    status: "Future Security Build",
    priority: "Critical",
    description:
      "Moves archive PDFs and protected files away from public direct links and into permission-based delivery.",
    launchRequirement:
      "Required before final archive files, hidden paths, or paid member content are released.",
  },
  {
    title: "Reflection Records",
    status: "Future Database Build",
    priority: "High",
    description:
      "Stores member reflections, privacy settings, review status, and Entry Access eligibility notes.",
    launchRequirement:
      "Required before reflection becomes part of real progression and account history.",
  },
  {
    title: "Waitlist Database",
    status: "Future Database Build",
    priority: "High",
    description:
      "Stores artifact interest, collector records, family release interest, Future Gear interest, and priority status.",
    launchRequirement:
      "Required before public waitlists or collector registration open.",
  },
  {
    title: "Commerce Infrastructure",
    status: "Future Commerce Build",
    priority: "Critical",
    description:
      "Handles subscriptions, pre-orders, rentals, receipts, refund records, payment webhooks, and order history.",
    launchRequirement:
      "Required before money is collected through the platform.",
  },
  {
    title: "Creator Administration",
    status: "Creator Only Future Build",
    priority: "Critical",
    description:
      "Lets the creator review members, approve access, control releases, monitor readiness, and protect private systems.",
    launchRequirement:
      "Required before creator-side management moves beyond static frontend previews.",
  },
  {
    title: "Security Monitoring",
    status: "Future Protection Build",
    priority: "High",
    description:
      "Tracks suspicious activity, rate limits abuse, protects routes, and creates audit trails for important actions.",
    launchRequirement:
      "Required before the site becomes a public member platform with real accounts or paid systems.",
  },
];

const backendRules = [
  "The frontend displays the universe; the backend protects the universe.",
  "Never store passwords in React files.",
  "Never store API keys in React files.",
  "Never store payment secret keys in React files.",
  "Never store final archive answers in frontend files.",
  "Never expose protected PDF paths without backend permission checks.",
  "Never trust frontend state as proof of real access.",
  "Use server-side validation for Foundation completion.",
  "Use database rules to separate public, member, and creator-only records.",
  "Use private storage for protected PDFs, blueprints, and unreleased content.",
];

const platformFlow = [
  {
    step: "1. Public Frontend",
    meaning:
      "The cinematic universe, public shell, chamber interface, archive names, tier descriptions, and protected public teaser live here.",
  },
  {
    step: "2. Authentication Layer",
    meaning:
      "Members and creator users sign in through protected accounts instead of local browser preview state.",
  },
  {
    step: "3. Database Layer",
    meaning:
      "Member identity, progress, reflections, waitlists, order history, and access status are saved securely.",
  },
  {
    step: "4. Permission Layer",
    meaning:
      "The backend checks who can see which archive, chamber, file, tier, order, reflection, or vault system.",
  },
  {
    step: "5. Private File Storage",
    meaning:
      "Protected PDFs, creator files, manuscripts, and unreleased assets are stored outside public frontend folders.",
  },
  {
    step: "6. Payment Verification",
    meaning:
      "Subscriptions and purchases activate only after payment webhooks confirm account status server-side.",
  },
  {
    step: "7. Creator Admin Layer",
    meaning:
      "Oak can approve releases, review readiness, moderate access, and control protected systems through creator-only tools.",
  },
];

const futureStackOptions = [
  {
    layer: "Frontend",
    option: "Vercel + React",
    purpose:
      "Displays the Ricochet Void Universe interface, cinematic shell, chambers, and public experience.",
  },
  {
    layer: "Authentication",
    option: "Clerk, Auth0, Supabase Auth, or Firebase Auth",
    purpose:
      "Handles account creation, login, session security, recovery, and identity protection.",
  },
  {
    layer: "Database",
    option: "Supabase, Firebase, Neon/Postgres, or MongoDB Atlas",
    purpose:
      "Stores members, progress, reflections, waitlists, orders, and access records.",
  },
  {
    layer: "Private Storage",
    option: "Supabase Storage, Firebase Storage, S3, or R2",
    purpose:
      "Stores protected PDFs, manuscripts, artwork, creator files, and private deliverables.",
  },
  {
    layer: "Payments",
    option: "Stripe or PayPal",
    purpose:
      "Handles subscriptions, product checkout, pre-orders, receipts, refunds, and payment status.",
  },
  {
    layer: "Server Logic",
    option: "Vercel Functions, Supabase Edge Functions, or API routes",
    purpose:
      "Runs private verification, permission checks, webhooks, moderation logic, and secure backend actions.",
  },
];

const launchBlockers = [
  "Real accounts not connected yet",
  "Cloud progress not connected yet",
  "Protected PDF delivery not connected yet",
  "Payment webhooks not connected yet",
  "Creator admin system not connected yet",
  "Reflection review not connected yet",
  "Waitlist database not connected yet",
  "Server-side archive verification not connected yet",
];

const backendPhases = [
  {
    phase: "Phase 1 — Frontend Foundation",
    status: "Current",
    goal:
      "Build permanent chamber interfaces, protected public shell, security headers, and creator-approved structure.",
  },
  {
    phase: "Phase 2 — Authentication",
    status: "Future",
    goal:
      "Add real member accounts, creator login, protected sessions, and account recovery.",
  },
  {
    phase: "Phase 3 — Progress Database",
    status: "Future",
    goal:
      "Save Foundation progress, signal status, reflections, ranks, and Entry Access eligibility.",
  },
  {
    phase: "Phase 4 — Protected Files",
    status: "Future",
    goal:
      "Move PDFs, private content, and paid materials into permission-based storage.",
  },
  {
    phase: "Phase 5 — Commerce",
    status: "Future",
    goal:
      "Connect subscriptions, orders, pre-orders, rentals, receipts, and refund logic.",
  },
  {
    phase: "Phase 6 — Creator Admin",
    status: "Future",
    goal:
      "Create creator-only controls for release approval, member review, vault protection, and system readiness.",
  },
];

export default function BackendChamber() {
  const [selectedLayer, setSelectedLayer] = useState(backendLayers[0]);
  const [selectedFlow, setSelectedFlow] = useState(platformFlow[0]);
  const [selectedStack, setSelectedStack] = useState(futureStackOptions[0]);
  const [showRules, setShowRules] = useState(false);
  const [showBlockers, setShowBlockers] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Backend Chamber</div>

        <h2>BACKEND ARCHITECTURE BLUEPRINT</h2>

        <p>
          The Backend Chamber defines the infrastructure the Ricochet Void
          Universe will need before real accounts, protected PDFs, saved
          progress, subscriptions, waitlists, orders, and creator admin controls
          go live.
        </p>

        <p>
          This chamber is a production-ready frontend blueprint. It does not
          connect real backend services yet, but it establishes the correct
          system structure so the site can grow without exposing private content.
        </p>

        <div className="statusGreen">Volume 4 Backend Blueprint Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Backend Truth</div>

        <p>
          React can display the universe, but React alone cannot protect the
          universe. Real protection requires server-side authentication,
          database permissions, private storage, payment verification, and
          creator-only administrative controls.
        </p>
      </div>

      <div className="placeholderGrid">
        {backendLayers.map((layer) => (
          <button
            className="placeholderCard"
            key={layer.title}
            onClick={() => setSelectedLayer(layer)}
          >
            <strong>{layer.title}</strong>
            <span>{layer.status}</span>
            <span>Priority: {layer.priority}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Backend Layer</div>

        <h2>{selectedLayer.title}</h2>

        <p>
          <strong>Status:</strong> {selectedLayer.status}
        </p>

        <p>
          <strong>Priority:</strong> {selectedLayer.priority}
        </p>

        <p>{selectedLayer.description}</p>

        <p>
          <strong>Launch Requirement:</strong> {selectedLayer.launchRequirement}
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Platform Flow</div>

        <p>
          This is the long-term flow for how the frontend, backend, storage,
          permissions, payments, and creator systems should work together.
        </p>
      </div>

      <div className="placeholderGrid">
        {platformFlow.map((flow) => (
          <button
            className="placeholderCard"
            key={flow.step}
            onClick={() => setSelectedFlow(flow)}
          >
            <strong>{flow.step}</strong>
            <span>View system role</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Platform Step</div>

        <h2>{selectedFlow.step}</h2>

        <p>{selectedFlow.meaning}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Stack Options</div>

        <p>
          These are possible technology layers. The exact services can be chosen
          later based on cost, ease of use, security, and launch needs.
        </p>
      </div>

      <div className="placeholderGrid">
        {futureStackOptions.map((stack) => (
          <button
            className="placeholderCard"
            key={stack.layer}
            onClick={() => setSelectedStack(stack)}
          >
            <strong>{stack.layer}</strong>
            <span>{stack.option}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Stack Layer</div>

        <h2>{selectedStack.layer}</h2>

        <p>
          <strong>Possible Option:</strong> {selectedStack.option}
        </p>

        <p>{selectedStack.purpose}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Backend Security Rules</div>

        <button
          className="actionButton"
          onClick={() => setShowRules(!showRules)}
        >
          {showRules ? "Hide Security Rules" : "Show Security Rules"}
        </button>

        {showRules && (
          <div>
            {backendRules.map((rule) => (
              <p key={rule}>• {rule}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Backend Build Phases</div>

        {backendPhases.map((phase) => (
          <div key={phase.phase}>
            <p>
              <strong>{phase.phase}</strong>
            </p>
            <p>
              <strong>Status:</strong> {phase.status}
            </p>
            <p>{phase.goal}</p>
          </div>
        ))}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Launch Blockers</div>

        <p>
          These systems do not block the frontend prototype from being built,
          but they do block real public accounts, payments, protected files, and
          member records from going live safely.
        </p>

        <button
          className="actionButton"
          onClick={() => setShowBlockers(!showBlockers)}
        >
          {showBlockers ? "Hide Launch Blockers" : "Show Launch Blockers"}
        </button>

        {showBlockers && (
          <div>
            {launchBlockers.map((blocker) => (
              <p key={blocker}>⬜ {blocker}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Backend Standard</div>

        <p>
          The backend should protect Oak's creator authority, member trust,
          private files, future payments, progression logic, and creator-only
          vault systems.
        </p>

        <p>
          The correct long-term standard is simple: public systems inspire,
          member systems track, backend systems verify, and creator systems
          control release.
        </p>
      </div>
    </section>
  );
}
