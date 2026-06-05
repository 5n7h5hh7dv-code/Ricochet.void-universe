const vaultSystems = [
  {
    title: "Future Gear Designs",
    status: "Protected",
    description:
      "Private product concepts, prototypes, and unreleased designs.",
  },
  {
    title: "Creator Blueprints",
    status: "Restricted",
    description:
      "Internal planning documents and universe architecture materials.",
  },
  {
    title: "Artifact Specifications",
    status: "Hidden",
    description:
      "Manufacturing concepts, dimensions, materials, and production plans.",
  },
  {
    title: "Volume 4 Development",
    status: "In Progress",
    description:
      "The next generation of Foundation Archives and progression systems.",
  },
  {
    title: "Private Universe Roadmaps",
    status: "Creator Only",
    description:
      "Long-term plans and protected development pathways.",
  },
];

export default function CreatorVault() {
  return (
    <section>
      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Creator Vault
        </div>

        <p>
          The Creator Vault contains protected creator materials,
          blueprints, private designs, and future universe development
          systems that are not visible to the public.
        </p>

        <div className="statusGreen">
          Vault Protection Active
        </div>
      </div>

      <div className="placeholderGrid">
        {vaultSystems.map((item) => (
          <div className="placeholderCard" key={item.title}>
            <strong>{item.title}</strong>

            <span>{item.status}</span>

            <span>{item.description}</span>
          </div>
        ))}
      </div>

      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Access Restriction
        </div>

        <p>
          No passwords, private keys, payment credentials,
          manufacturing details, or sensitive creator information
          should ever be stored directly in frontend code.
        </p>
      </div>
    </section>
  );
}
