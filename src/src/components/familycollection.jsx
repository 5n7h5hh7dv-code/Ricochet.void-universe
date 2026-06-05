const familyProjects = [
  {
    title: "Children's Story Vault",
    status: "Protected",
    description:
      "A future collection of stories designed for younger readers and families.",
  },
  {
    title: "Parent Read-Along Rentals",
    status: "Future Phase",
    description:
      "Temporary access to family-friendly stories and educational adventures.",
  },
  {
    title: "Illustration Collection",
    status: "Artwork Needed",
    description:
      "Original illustrations connected to the Family Collection universe.",
  },
  {
    title: "Audio Story Chamber",
    status: "Future Phase",
    description:
      "Narrated stories and guided listening experiences.",
  },
  {
    title: "Educational Adventures",
    status: "Protected Concept",
    description:
      "Learning-focused stories designed to encourage growth and curiosity.",
  },
];

export default function FamilyCollection() {
  return (
    <section>
      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Family Collection</div>

        <p>
          The Family Collection is a future branch of the Ricochet Void
          Universe designed for parents, children, and younger learners.
        </p>

        <div className="statusGreen">
          Family Collection Active
        </div>
      </div>

      <div className="placeholderGrid">
        {familyProjects.map((project) => (
          <div className="placeholderCard" key={project.title}>
            <strong>{project.title}</strong>

            <span>{project.status}</span>

            <span>{project.description}</span>
          </div>
        ))}
      </div>

      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Manuscript Protection
        </div>

        <p>
          Story manuscripts, character concepts, illustrations,
          covers, and unreleased family content remain protected
          until approved for release.
        </p>
      </div>
    </section>
  );
}
