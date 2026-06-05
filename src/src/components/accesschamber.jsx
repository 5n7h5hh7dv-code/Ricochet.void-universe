const accessTiers = [
  {
    name: "Entry Access",
    price: "$0",
    status: "Earned",
    description:
      "Unlocked after the Foundation path is completed and reviewed. This is the first true entry point into the Ricochet Void Universe.",
  },
  {
    name: "Signal Access",
    price: "$9.99 / month",
    status: "Future Tier",
    description:
      "Core member access for continued universe updates, chamber expansion, new signal paths, and future member-only releases.",
  },
  {
    name: "Sub-Creator Access",
    price: "$24.99 / month",
    status: "Future Tier",
    description:
      "For members who want to help shape parts of the universe through guided creation tools, prompts, submissions, and deeper access paths.",
  },
  {
    name: "Architect Circle",
    price: "$49.99 / month",
    status: "Future Tier",
    description:
      "Advanced access for deeper creator rooms, private drops, early artifact visibility, protected discussions, and higher-level universe participation.",
  },
  {
    name: "Universe Architect",
    price: "$99.99 / month",
    status: "Highest Future Tier",
    description:
      "The highest public access tier before creator-only systems. Reserved for the deepest future member experience.",
  },
];

const accessRules = [
  "No paid access activates until real member accounts are connected.",
  "No subscription activates until payment terms, refund rules, and delivery rules are finished.",
  "Entry Access remains earned through completion, not bought.",
  "Protected archives should eventually be delivered through server-side permission checks.",
  "Creator-only systems remain separate from public member tiers.",
];

export default function AccessChamber() {
  return (
    <section>
      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Access Chamber</div>

        <p>
          This chamber prepares the future access structure for the Ricochet Void
          Universe. Payments are not active yet. The access system stays locked
          until real authentication, protected content delivery, payment security,
          refund terms, and creator approval are complete.
        </p>

        <div className="statusGreen">Access Blueprint Active</div>
      </div>

      <div className="placeholderGrid">
        {accessTiers.map((tier) => (
          <div className="placeholderCard" key={tier.name}>
            <strong>{tier.name}</strong>
            <span>{tier.price}</span>
            <span>{tier.status}</span>
            <span>{tier.description}</span>
          </div>
        ))}
      </div>

      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">Payment Security Hold</div>

        <p>
          No real payment processor should be connected inside this frontend
          component. PayPal, Stripe, subscriptions, product checkout, and
          pre-orders should be connected later through secure backend services
          and protected environment variables.
        </p>
      </div>

      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Access Rules</div>

        {accessRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>
    </section>
  );
}
