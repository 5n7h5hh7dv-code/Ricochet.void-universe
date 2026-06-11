const backendLayers = [
  {
    title: "Authentication Core",
    status: "Future Build",
    description:
      "Handles account creation, login, password reset, secure sessions, device trust, and multi-factor authentication.",
  },
  {
    title: "Cloud Progress Engine",
    status: "Future Build",
    description:
      "Stores archive progress, signal verification, reflection submissions, member rank, and Entry Access eligibility.",
  },
  {
    title: "Protected Archive Delivery",
    status: "Future Security",
    description:
      "Moves PDF access away from public links and into permission-based protected delivery.",
  },
  {
    title: "Waitlist Database",
    status: "Future Database",
    description:
      "Stores artifact interest, collector records, Void Names, priority status, and drop eligibility.",
  },
  {
    title: "Commerce Infrastructure",
    status: "Future Commerce",
    description:
      "Handles subscriptions, pre-orders, family rentals, receipts, collector drops, and order history.",
  },
  {
    title: "Creator Administration",
    status: "Creator Only",
    description:
      "Lets the creator review members, release content, monitor progress, approve access, and protect private systems.",
  },
];

const securityRules = [
  "Never store passwords in frontend code.",
  "Never store API keys in frontend code.",
  "Never store payment credentials in frontend code.",
  "Never expose final archive answers in frontend code.",
  "Never expose protected PDF paths without permission checks.",
  "Use server-side validation for progression.",
  "Use environment variables for private keys.",
  "Use backend rate limiting before public launch.",
  "Use database rules to separate public, member, and creator-only records.",
];

const platformFlow = [
  "Browser preview",
  "Secure backend",
  "Authentication",
  "Database",
  "Private storage",
  "Permission checks",
  "Member dashboard",
  "Protected delivery",
];

export default function BackendChamber() {
  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Backend Architecture Chamber</div>

        <h2>BACKEND BLUEPRINT</h2>

        <p>
          This chamber defines the future infrastructure behind the Ricochet
          Void Universe. It is not connected yet. It exists to keep the build
          order clear before real accounts, protected PDFs, subscriptions,
          waitlists, and orders go live.
        </p>

        <div className="statusGreen">Backend Blueprint Active</div>
      </div>

      <div className="placeholderGrid">
        {backendLayers.map((layer) => (
          <div className="placeholderCard" key={layer.title}>
            <strong>{layer.title}</strong>
            <span>{layer.status}</span>
            <span>{layer.description}</span>
          </div>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Platform Flow</div>

        {platformFlow.map((step, index) => (
          <p key={step}>
            {index + 1}. {step}
          </p>
        ))}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Backend Security Rules</div>

        {securityRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Recommended Future Stack</div>

        <p>
          Possible future setup: Vercel frontend, secure backend functions,
          authentication provider, protected database, private file storage,
          payment processor, and server-side permission rules.
        </p>

        <p>
          The frontend should display the universe. The backend should protect
          the universe.
        </p>
      </div>
    </section>
  );
}
