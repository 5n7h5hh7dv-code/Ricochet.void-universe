const artifacts = [
  {
    name: "Founder’s Coin",
    limit: 1000,
    status: "Unreleased",
    code: "RVU-FC",
  },
  {
    name: "Signal Coin",
    limit: 2500,
    status: "Research Phase",
    code: "RVU-SC",
  },
  {
    name: "Architect Relic",
    limit: 100,
    status: "Creator Vault",
    code: "RVU-AR",
  },
  {
    name: "Archive Ring",
    limit: 777,
    status: "Design Protected",
    code: "RVU-RG",
  },
  {
    name: "Void Artifact Alpha",
    limit: 500,
    status: "Restricted",
    code: "RVU-VA",
  },
];

export default function ArtifactRegistry() {
  return (
    <section>
      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Artifact Registry</div>

        <p>
          The registry records future artifacts, limited editions,
          collector items, and universe relics without exposing
          protected manufacturing details or creator blueprints.
        </p>

        <div className="statusGreen">
          Registry Active
        </div>
      </div>

      <div className="placeholderGrid">
        {artifacts.map((artifact) => (
          <div className="placeholderCard" key={artifact.code}>
            <strong>{artifact.name}</strong>

            <span>
              Registry Code: {artifact.code}
            </span>

            <span>
              Limit: {artifact.limit}
            </span>

            <span>
              Status: {artifact.status}
            </span>
          </div>
        ))}
      </div>

      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Blueprint Protection
        </div>

        <p>
          Designs, renders, dimensions, manufacturing files,
          supplier information, and creator blueprints remain
          protected until officially released.
        </p>
      </div>
    </section>
  );
}
