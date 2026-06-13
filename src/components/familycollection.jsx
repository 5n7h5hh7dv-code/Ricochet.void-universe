import { useState } from "react";

const familyProjects = [
  {
    title: "Children's Story Library",
    phase: "Concept Phase",
    purpose:
      "A future collection of children's books designed to encourage imagination, learning, kindness, responsibility, and family participation.",
    protection:
      "Stories, manuscripts, illustrations, and final publishing files remain protected until release readiness.",
  },
  {
    title: "Parent Read-Along Series",
    phase: "Planning",
    purpose:
      "Guided reading experiences where parents and children explore stories together.",
    protection:
      "Access should eventually support rentals, subscriptions, or approved purchases through protected delivery.",
  },
  {
    title: "Family Adventure Collection",
    phase: "Future Development",
    purpose:
      "Interactive stories and experiences designed for family participation.",
    protection:
      "Future content should remain separated from creator-only materials and private universe systems.",
  },
  {
    title: "Learning Collection",
    phase: "Research",
    purpose:
      "Educational books and experiences tied to curiosity, creativity, critical thinking, and personal growth.",
    protection:
      "Educational content should be reviewed carefully before publication.",
  },
  {
    title: "Family Membership Layer",
    phase: "Future System",
    purpose:
      "Allows families to manage rentals, reading progress, and family collection access.",
    protection:
      "Requires secure accounts and protected family records.",
  },
];

const familyStandards = [
  "Family content should remain separate from creator-only systems.",
  "Children's content should prioritize safety and clarity.",
  "Educational material should encourage learning, not dependency.",
  "Family rentals should respect creators and readers equally.",
  "Parents should remain in control of family access.",
  "Private family data should never be stored in frontend code.",
  "Family collections should remain free from unnecessary complexity.",
];

const futureFamilySystems = [
  "Family dashboards",
  "Reading progress tracking",
  "Rental expiration controls",
  "Protected digital delivery",
  "Family account management",
  "Parent approval controls",
  "Illustration library",
  "Family waitlists",
  "Reading achievement system",
];

export default function FamilyCollection() {
  const [selectedProject, setSelectedProject] = useState(familyProjects[0]);
  const [showSystems, setShowSystems] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Family Collection Chamber</div>

        <h2>FAMILY COLLECTION SYSTEM</h2>

        <p>
          The Family Collection Chamber prepares the family-focused side of the
          Ricochet Void Universe. It serves as the future home for children's
          books, parent reading experiences, educational collections, and family
          participation systems.
        </p>

        <div className="statusGreen">Family Collection Blueprint Active</div>
      </div>

      <div className="placeholderGrid">
        {familyProjects.map((project) => (
          <button
            className="placeholderCard"
            key={project.title}
            onClick={() => setSelectedProject(project)}
          >
            <strong>{project.title}</strong>
            <span>{project.phase}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Family Project</div>

        <h2>{selectedProject.title}</h2>

        <p>
          <strong>Phase:</strong> {selectedProject.phase}
        </p>

        <p>{selectedProject.purpose}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Content Protection</div>

        <p>{selectedProject.protection}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Family Standards</div>

        {familyStandards.map((standard) => (
          <p key={standard}>• {standard}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Family Systems</div>

        <button
          className="actionButton"
          onClick={() => setShowSystems(!showSystems)}
        >
          {showSystems ? "Hide Systems" : "Show Systems"}
        </button>

        {showSystems && (
          <div>
            {futureFamilySystems.map((system) => (
              <p key={system}>⬜ {system}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Family Security Standard</div>

        <p>
          Family accounts, rental records, reading progress, and personal
          information should never be stored directly inside frontend code.
          Future family systems should use protected authentication, database
          permissions, and secure delivery methods.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator Family Standard</div>

        <p>
          Family content should remain positive, educational, imaginative, and
          valuable. The goal is to create material that parents feel comfortable
          sharing and children genuinely enjoy exploring.
        </p>
      </div>
    </section>
  );
}
