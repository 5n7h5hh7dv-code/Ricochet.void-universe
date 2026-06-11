const foundationSignals = [
  "Reflection Signal",
  "Silence Signal",
  "Void Signal",
  "Ascension Signal",
  "Truth Signal",
  "Accountability Signal",
  "Architect Signal",
  "Foundation Completion Signal",
];

export default function FoundationChamber() {
  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Foundation Chamber</div>

        <h2>FOUNDATION PATH</h2>

        <p>
          This chamber holds the first progression system of the Ricochet Void
          Universe. Members must move through the Foundation Archives in the
          correct hidden order before reaching the Reflection Chamber.
        </p>

        <div className="statusGreen">Foundation System Active</div>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Hidden Order Protection</div>

        <p>
          Archive numbers are not shown publicly. Users must discover the order
          through signal clues, archive meaning, and progression awareness.
        </p>

        <p>
          The correct order remains protected so users cannot simply open every
          file and skip the intended experience.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Signal Progression</div>

        {foundationSignals.map((signal) => (
          <p key={signal}>☐ {signal}</p>
        ))}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Archive Protection</div>

        <p>
          Final Volume 4 Foundation PDFs should contain no visible archive
          numbers, no exposed order, and no public creator blueprint content.
        </p>
      </div>
    </section>
  );
}
