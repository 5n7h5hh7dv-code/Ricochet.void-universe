const creatorChecks = [
  "Foundation progression tested",
  "Archive order hidden",
  "Archive numbers removed",
  "Volume 4 archives completed",
  "Member accounts connected",
  "Cloud progress connected",
  "Protected PDF delivery connected",
  "Waitlist database connected",
  "Payment security reviewed",
  "Creator Vault secured",
  "Firewall active",
  "Final creator approval granted",
];

export default function CreatorControlChamber() {
  return (
    <section>
      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Creator Control Chamber
        </div>

        <p>
          This chamber exists for launch readiness and creator approval.
          Nothing launches automatically. Final authority remains with Oak.
        </p>

        <div className="statusGreen">Creator Authority Active</div>
      </div>

      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Launch Checklist</div>

        {creatorChecks.map((item) => (
          <p key={item}>☐ {item}</p>
        ))}
      </div>

      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Launch Protection
        </div>

        <p>
          The public universe should remain protected until authentication,
          subscriptions, protected archives, security reviews, and final
          creator approval are complete.
        </p>
      </div>
    </section>
  );
}
