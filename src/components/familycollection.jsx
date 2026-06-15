import { useState } from "react";

const familyProjects = [
  {
    title: "Children's Story Collection",
    status: "Future Publishing",
    audience: "Children & Families",
    purpose:
      "A collection of creator-approved stories designed to encourage imagination, learning, family bonding, and positive values.",
  },
  {
    title: "Family Reading Nights",
    status: "Planned",
    audience: "Parents & Children",
    purpose:
      "Guided reading experiences connected to future Family Collection releases.",
  },
  {
    title: "Interactive Family Adventures",
    status: "Concept Phase",
    audience: "All Ages",
    purpose:
      "Shared activities designed to encourage participation between children, parents, and guardians.",
  },
  {
    title: "Educational Collection",
    status: "Research",
    audience: "Young Learners",
    purpose:
      "Future books and materials focused on learning, curiosity, creativity, and personal development.",
  },
  {
    title: "Family Library Access",
    status: "Future System",
    audience: "Members",
    purpose:
      "Protected access system for family-friendly content, reading collections, and approved educational materials.",
  },
];

const familyPrinciples = [
  "Family content should be positive and constructive.",
  "Parents remain responsible for family decisions.",
  "Content should encourage imagination and learning.",
  "Safety and age-appropriateness come before expansion.",
  "Creator approval is required before public release.",
  "Publishing quality matters more than speed.",
];

const futureSystems = [
  "Book publishing workflow",
  "Illustration management",
  "Family library access",
  "Reading progress tracking",
  "Parent account controls",
  "Rental and lending system",
  "Release notifications",
  "Family waitlists",
  "Print-on-demand integration",
];

export default function FamilyCollection() {
  const [selectedProject, setSelectedProject] = useState(familyProjects[0]);
  const [showPrinciples, setShowPrinciples] = useState(false);
  const [showSystems, setShowSystems] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Family Collection</div>

        <h2>FAMILY CONTENT SYSTEM</h2>

        <p>
          The Family Collection is the family-friendly branch of the Ricochet
          Void Universe. It prepares books, stories, reading experiences,
          educational content, and future family-focused releases.
        </p>

        <div className="statusGreen">Volume 4 Family Collection Active</div>
      </div>

      <div className="placeholderGrid">
        {familyProjects.map((project) => (
          <button
            key={project.title}
            className="placeholderCard"
            onClick={() => setSelectedProject(project)}
          >
            <strong>{project.title}</strong>
            <span>{project.status}</span>
            <span>{project.audience}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Family Project</div>

        <h2>{selectedProject.title}</h2>

        <p>
          <strong>Status:</strong> {selectedProject.status}
        </p>

        <p>
          <strong>Audience:</strong> {selectedProject.audience}
        </p>

        <p>{selectedProject.purpose}</p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Family Principles</div>

        <button
          className="actionButton"
          onClick={() => setShowPrinciples(!showPrinciples)}
        >
          {showPrinciples ? "Hide Principles" : "Show Principles"}
        </button>

        {showPrinciples &&
          familyPrinciples.map((principle) => (
            <p key={principle}>• {principle}</p>
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

        {showSystems &&
          futureSystems.map((system) => (
            <p key={system}>⬜ {system}</p>
          ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Family Standard</div>

        <p>
          The Family Collection should provide meaningful experiences that
          parents can confidently share with their children while preserving
          quality, imagination, education, and creator oversight.
        </p>
      </div>
    </section>
  );
}
