const commerceSystems = [
  {
    title: "Pre-Orders",
    status: "Future Phase",
    description:
      "Allows members to reserve future items before production begins.",
  },
  {
    title: "Collector Drops",
    status: "Future Phase",
    description:
      "Limited releases with quantity tracking and collector eligibility.",
  },
  {
    title: "Family Rentals",
    status: "Future Phase",
    description:
      "Digital rental access for family collection materials.",
  },
  {
    title: "Subscriptions",
    status: "Future Phase",
    description:
      "Secure recurring membership access connected to accounts.",
  },
  {
    title: "Order History",
    status: "Future Phase",
    description:
      "Track purchases, receipts, and delivery status.",
  },
];

export default function CommerceChamber() {
  return (
    <section>
      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Commerce Chamber</div>

        <p>
          This chamber prepares future commerce systems without
          collecting payments. All payment systems remain inactive
          until backend security and account infrastructure exist.
        </p>

        <div className="statusGreen">
          Commerce Blueprint Active
        </div>
      </div>

      <div className="placeholderGrid">
        {commerceSystems.map((system) => (
          <div className="placeholderCard" key={system.title}>
            <strong>{system.title}</strong>

            <span>{system.status}</span>

            <span>{system.description}</span>
          </div>
        ))}
      </div>

      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Payment Protection
        </div>

        <p>
          No live checkout, PayPal integration, Stripe integration,
          subscriptions, or payment collection should be activated
          until secure backend services are connected.
        </p>
      </div>
    </section>
  );
}
