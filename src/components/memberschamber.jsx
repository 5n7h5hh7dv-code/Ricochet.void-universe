import { useState } from "react";

const foundationArchives = [
  {
    publicName: "The Coded Mirror",
    signalName: "Reflection Signal",
    status: "Active Path",
    difficulty: "Clear Hint",
    publicPurpose:
      "Begins the member's confrontation with identity, self-image, routine, and the person they see in the mirror.",
    protectedNote:
      "Archive order, answer logic, and creator blueprint content remain hidden.",
  },
  {
    publicName: "Void Protocol 7",
    signalName: "Silence Signal",
    status: "Locked Until Aligned",
    difficulty: "Hidden Clue",
    publicPurpose:
      "Introduces silence, focus, discipline, and the removal of internal noise.",
    protectedNote:
      "The public interface does not reveal whether this archive is next.",
  },
  {
    publicName: "Neural Wealth Mapping",
    signalName: "Void Signal",
    status: "Locked Until Aligned",
    difficulty: "Pattern Recognition",
    publicPurpose:
      "Connects thought patterns, money behavior, work effort, planning, and future construction.",
    protectedNote:
      "The answer chain is withheld from public display.",
  },
  {
    publicName: "The Dopamine Collapse Manual",
    signalName: "Ascension Signal",
    status: "Locked Until Aligned",
    difficulty: "Self-Control",
    publicPurpose:
      "Targets distraction, overstimulation, bad habits, and broken focus loops.",
    protectedNote:
      "Hidden progression remains creator protected.",
  },
  {
    publicName: "Project Ascension",
    signalName: "Truth Signal",
    status: "Locked Until Aligned",
    difficulty: "Growth Standard",
    publicPurpose:
      "Moves the user from intention into structured personal elevation.",
    protectedNote:
      "Public-facing content does not expose the completion key.",
  },
  {
    publicName: "The Human Glitch",
    signalName: "Accountability Signal",
    status: "Locked Until Aligned",
    difficulty: "Self-Awareness",
    publicPurpose:
      "Reveals repeated personal errors, excuses, loops, and identity glitches.",
    protectedNote:
      "Completion verification is reserved for future backend logic.",
  },
  {
    publicName: "Psychological Warfare Against Yourself",
    signalName: "Architect Signal",
    status: "Locked Until Aligned",
    difficulty: "Inner Conflict",
    publicPurpose:
      "Frames the battle between who a person is, who they pretend to be, and who they are building.",
    protectedNote:
      "Signal answer and ordering are not published in the interface.",
  },
  {
    publicName: "The Internal Empire Blueprint",
    signalName: "Foundation Completion Signal",
    status: "Final Gate",
    difficulty: "Complete Chain",
    publicPurpose:
      "Turns self-discipline, truth, accountability, and vision into a personal empire framework.",
    protectedNote:
      "Final completion phrase remains protected until backend verification is ready.",
  },
];

const foundationLaws = [
  "Signal grows where noise falls.",
  "Truth must come before transformation.",
  "A hidden path has no value if the order is handed away.",
  "The user must earn entry through attention, not guessing.",
  "No archive number should be shown publicly.",
  "No creator blueprint should be exposed publicly.",
  "Progression must remain meaningful before it becomes profitable.",
];

const futureHooks = [
  "Real account progress tracking",
  "Cloud-saved archive completion",
  "Server-side signal verification",
  "Protected PDF delivery",
  "Reflection submission database",
  "Entry Access eligibility review",
  "Creator moderation layer",
  "Future AI-assisted completion review",
];

export default function FoundationChamber() {
  const [selectedArchive, setSelectedArchive] = useState(foundationArchives[0]);
  const [showCreatorView, setShowCreatorView] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Foundation Chamber</div>

        <h2>FOUNDATION PATH</h2>

        <p>
          The Foundation Chamber is the first true progression system of the
          Ricochet Void Universe. It exists to guide members through the opening
          archives without revealing the protected order, hidden answers, or
          creator-only blueprint logic.
        </p>

        <p>
          Volume 4 standards require stronger separation between what the public
          can see, what members can earn, and what the creator alone controls.
        </p>

        <div className="statusGreen">Volume 4 Foundation Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Protected Order Standard</div>

        <p>
          Archive numbers must never appear publicly. The public may see archive
          names, but the order must be discovered through meaning, attention,
          hidden signals, and progression clues.
        </p>

        <p>
          This chamber should eventually connect to server-side verification so
          users cannot skip ahead by inspecting frontend code.
        </p>
      </div>

      <div className="placeholderGrid">
        {foundationArchives.map((archive) => (
          <button
            className="placeholderCard"
            key={archive.publicName}
            onClick={() => setSelectedArchive(archive)}
          >
            <strong>{archive.publicName}</strong>
            <span>{archive.signalName}</span>
            <span>{archive.difficulty}</span>
            <span>{archive.status}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Archive</div>

        <h2>{selectedArchive.publicName}</h2>

        <p>{selectedArchive.publicPurpose}</p>

        <p>
          <strong>Signal Layer:</strong> {selectedArchive.signalName}
        </p>

        <p>
          <strong>Difficulty:</strong> {selectedArchive.difficulty}
        </p>

        <p>
          <strong>Status:</strong> {selectedArchive.status}
        </p>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Protected Archive Note</div>

        <p>{selectedArchive.protectedNote}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Foundation Laws</div>

        {foundationLaws.map((law) => (
          <p key={law}>• {law}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Creator's Oath</div>

        <p>
          I will not claim certainty where I have doubt. I will not teach what I
          have not lived. I will not promise what I cannot deliver. I will speak
          truthfully about my experiences and allow others to discover their own.
        </p>

        <p>
          The Foundation Path should be built on radical truthfulness,
          accountability, self-honesty, and personal responsibility.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Silence Architecture</div>

        <p>
          Silence Architecture is the visual and philosophical structure of the
          Foundation Chamber. It means the universe does not explain everything
          immediately. It creates space for the user to pay attention.
        </p>

        <p>
          The user is not dragged through the path. They are invited to notice,
          reflect, decode, and earn the next opening.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Backend Hooks</div>

        {futureHooks.map((hook) => (
          <p key={hook}>⬜ {hook}</p>
        ))}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Creator Blueprint Separation</div>

        <p>
          Public archive descriptions should never reveal internal creator
          blueprints, hidden answer chains, archive numbering, monetization
          strategy, backend logic, or moderation criteria.
        </p>

        <button
          className="actionButton"
          onClick={() => setShowCreatorView(!showCreatorView)}
        >
          {showCreatorView ? "Hide Creator Reminder" : "Show Creator Reminder"}
        </button>

        {showCreatorView && (
          <div>
            <p>
              Creator reminder: future versions should move all real archive
              order validation, signal checking, PDF access, user progress, and
              entry eligibility to a secure backend.
            </p>

            <p>
              App and component files may display the experience, but they
              should not contain final answers, private keys, passwords, or
              protected creator blueprints.
            </p>
          </div>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Entry Access Requirement</div>

        <p>
          Entry Access should remain earned after Foundation completion. It
          should not be sold directly, skipped, or granted without the user
          moving through the intended path.
        </p>

        <p>
          Future system: completed archives → verified signals → reflection
          chamber → creator or automated review → Entry Access eligibility.
        </p>
      </div>
    </section>
  );
}
