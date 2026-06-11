const memberSystems = [
  {
    title: "Member Identity",
    status: "Preview",
    description:
      "Future members will have a profile, Void Name, account identity, and saved universe progress.",
  },
  {
    title: "Signal Rank",
    status: "Future Progression",
    description:
      "Ranks will grow as members complete archives, submit reflections, join paths, and unlock deeper chambers.",
  },
  {
    title: "Saved Progress",
    status: "Backend Needed",
    description:
      "Progress is currently planned for cloud saving once real authentication and database storage are connected.",
  },
  {
    title: "Waitlists",
    status: "Future Database",
    description:
      "Members will be able to join waitlists for artifacts, coins, family releases, and future gear.",
  },
  {
    title: "Orders",
    status: "Future Commerce",
    description:
      "Future order history will track pre-orders, subscriptions, rentals, collector drops, and receipts.",
  },
  {
    title: "Security Status",
    status: "Future Account Protection",
    description:
      "Future accounts should include secure login, recovery, device trust, and multi-factor authentication.",
  },
];

export default function MemberChamber() {
  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Member Chamber</div>

        <h2>MEMBER ACCOUNT SYSTEM</h2>

        <p>
          This chamber prepares the future member experience for the Ricochet
          Void Universe. Members will eventually have account identity, saved
          progress, signal rank, waitlists, orders, subscription status, and
          security controls.
        </p>

        <div className="statusGreen">Member Blueprint Active</div>
      </div>

      <div className="placeholderGrid">
        {memberSystems.map((system) => (
          <div className="placeholderCard" key={system.title}>
            <strong>{system.title}</strong>
            <span>{system.status}</span>
            <span>{system.description}</span>
          </div>
        ))}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Backend Required</div>

        <p>
          This chamber is still a frontend blueprint. Real member accounts
          require backend authentication, database rules, protected storage,
          secure sessions, and server-side validation.
        </p>
      </div>
    </section>
  );
}
