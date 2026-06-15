
import { useState } from "react";

const foundationArchives = [
  {
    publicName: "The Coded Mirror",
    signalName: "Reflection Signal",
    status: "Opening Path",
    difficulty: "Clear Hint",
    phase: "Identity Confrontation",
    publicPurpose:
      "Begins the member's confrontation with identity, self-image, routine, and the person they see in the mirror.",
    userFocus:
      "Notice who you say you are compared to who your daily actions prove you are becoming.",
    protectedNote:
      "Archive order, answer logic, and creator blueprint content remain hidden.",
  },
  {
    publicName: "Void Protocol 7",
    signalName: "Silence Signal",
    status: "Locked Until Aligned",
    difficulty: "Hidden Clue",
    phase: "Noise Reduction",
    publicPurpose:
      "Introduces silence, focus, discipline, and the removal of internal noise.",
    userFocus:
      "Reduce distraction long enough to hear the signal underneath your habits.",
    protectedNote:
      "The public interface does not reveal whether this archive is next.",
  },
  {
    publicName: "Neural Wealth Mapping",
    signalName: "Void Signal",
    status: "Locked Until Aligned",
    difficulty: "Pattern Recognition",
    phase: "Future Construction",
    publicPurpose:
      "Connects thought patterns, money behavior, work effort, planning, and future construction.",
    userFocus:
      "Study how your thoughts, spending, time, and discipline are building or weakening your future.",
    protectedNote:
      "The answer chain is withheld from public display.",
  },
  {
    publicName: "The Dopamine Collapse Manual",
    signalName: "Ascension Signal",
    status: "Locked Until Aligned",
    difficulty: "Self-Control",
    phase: "Distraction Collapse",
    publicPurpose:
      "Targets distraction, overstimulation, bad habits, and broken focus loops.",
    userFocus:
      "Recognize where easy stimulation is stealing long-term power from your life.",
    protectedNote:
      "Hidden progression remains creator protected.",
  },
  {
    publicName: "Project Ascension",
    signalName: "Truth Signal",
    status: "Locked Until Aligned",
    difficulty: "Growth Standard",
    phase: "Elevation",
    publicPurpose:
      "Moves the user from intention into structured personal elevation.",
    userFocus:
      "Decide what must rise, what must be rebuilt, and what can no longer stay the same.",
    protectedNote:
      "Public-facing content does not expose the completion key.",
  },
  {
    publicName: "The Human Glitch",
    signalName: "Accountability Signal",
    status: "Locked Until Aligned",
    difficulty: "Self-Awareness",
    phase: "Pattern Exposure",
    publicPurpose:
      "Reveals repeated personal errors, excuses, loops, and identity glitches.",
    userFocus:
      "Find the repeated pattern that keeps interrupting your progress.",
    protectedNote:
      "Completion verification is reserved for future backend logic.",
  },
  {
    publicName: "Psychological Warfare Against Yourself",
    signalName: "Architect Signal",
    status: "Locked Until Aligned",
    difficulty: "Inner Conflict",
    phase: "Inner Battle",
    publicPurpose:
      "Frames the battle between who a person is, who they pretend to be, and who they are building.",
    userFocus:
      "Identify the internal war between comfort, excuse, discipline, and creation.",
    protectedNote:
      "Signal answer and ordering are not published in the interface.",
  },
  {
    publicName: "The Internal Empire Blueprint",
    signalName: "Foundation Completion Signal",
    status: "Final Gate",
    difficulty: "Complete Chain",
    phase: "Empire Structure",
    publicPurpose:
      "Turns self-discipline, truth, accountability, and vision into a personal empire framework.",
    userFocus:
      "Convert lessons into structure: identity, routine, responsibility, direction, and action.",
    protectedNote:
      "Final completion phrase remains protected until backend verification is ready.",
  },
];

const foundationLaws = [
  "Signal grows where noise falls.",
  "Truth must come before transformation.",
  "A hidden path has no value if the order is handed away.",
  "The user must earn entry through attention, not guessing.",
  "Archive numbers should not appear publicly.",
  "Creator blueprint logic should not be exposed publicly.",
  "Progression must remain meaningful before it becomes profitable.",
  "Entry should be earned through completion, reflection, and alignment.",
];

const volumeFourStandards = [
  {
    title: "No Visible Archive Numbering",
    detail:
      "The public should see archive names, not numbered order. The true order belongs to progression logic and future backend verification.",
  },
  {
    title: "Creator/Public Separation",
    detail:
      "Public archive descriptions guide the member. Creator blueprints, final answer logic, hidden chains, and moderation standards remain protected.",
  },
  {
    title: "Truth Before Access",
    detail:
      "The Foundation should make the member slow down, notice patterns, and reflect honestly before Entry Access becomes available.",
  },
  {
    title: "Silence Architecture",
    detail:
      "The system should not explain everything immediately. It should leave enough quiet space for attention, discovery, and earned understanding.",
  },
  {
    title: "Backend Verification Later",
    detail:
      "Frontend can show the experience, but final signal checks, account progress, PDF access, and Entry Access eligibility must move to backend logic later.",
  },
];

const futureBackendHooks = [
  "Account-linked Foundation progress",
  "Cloud-saved archive completion",
  "Server-side signal verification",
  "Protected PDF delivery",
  "Reflection submission database",
  "Entry Access eligibility review",
  "Creator moderation layer",
  "Future AI-assisted completion review",
  "Anti-sharing progression logic",
  "Device/session progress continuity",
];

const protectedBuildNotes = [
  "Do not store final hidden answers in this file.",
  "Do not store private PDF paths in this file.",
  "Do not store creator-only blueprints in this file.",
  "Do not store passwords, keys, tokens, or payment secrets in this file.",
  "Do not depend on frontend code for real security.",
  "Use this chamber to display the path, not to protect the vault.",
];

const reflectionGateRules = [
  "The member should complete the Foundation before reaching true reflection.",
  "Reflection should ask for realization, not just an answer.",
  "Reflection should support accountability, honesty, and self-awareness.",
  "Future reflection records should be stored securely, not inside frontend files.",
  "Entry Access should become eligible only after completion and reflection review.",
];

export default function FoundationChamber() {
  const [selectedArchive, setSelectedArchive] = useState(foundationArchives[0]);
  const [selectedStandard, setSelectedStandard] = useState(volumeFourStandards[0]);
  const [showBackendHooks, setShowBackendHooks] = useState(false);
  const [showProtectedNotes, setShowProtectedNotes] = useState(false);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Foundation Chamber</div>

        <h2>FOUNDATION PATH</h2>

        <p>
          The Foundation Chamber is the opening progression system of the
          Ricochet Void Universe. It guides members through the first archives
          without revealing the protected order, final answers, or creator-only
          blueprint logic.
        </p>

        <p>
          Volume 4 strengthens the Foundation by separating public experience
          from creator architecture, keeping archive numbers hidden, protecting
          the signal chain, and preparing the path for future backend
          verification.
        </p>

        <div className="statusGreen">Volume 4 Foundation Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Protected Order Standard</div>

        <p>
          Archive numbers must not appear publicly. The user may see names,
          themes, and surface-level guidance, but the true order must be earned
          through meaning, attention, hidden signals, and future verification.
        </p>

        <p>
          The Foundation is not meant to be skipped. It is meant to teach the
          member how to pay attention before the deeper universe opens.
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
            <span>{archive.phase}</span>
            <span>{archive.signalName}</span>
            <span>{archive.difficulty}</span>
            <span>{archive.status}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Archive</div>

        <h2>{selectedArchive.publicName}</h2>

        <p>
          <strong>Phase:</strong> {selectedArchive.phase}
        </p>

        <p>
          <strong>Signal Layer:</strong> {selectedArchive.signalName}
        </p>

        <p>
          <strong>Difficulty:</strong> {selectedArchive.difficulty}
        </p>

        <p>
          <strong>Status:</strong> {selectedArchive.status}
        </p>

        <p>{selectedArchive.publicPurpose}</p>

        <p>
          <strong>User Focus:</strong> {selectedArchive.userFocus}
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
        <div className="cardTitle">Volume 4 Standards</div>

        <p>
          Select a standard below to see how the Foundation should be protected
          and expanded.
        </p>
      </div>

      <div className="placeholderGrid">
        {volumeFourStandards.map((standard) => (
          <button
            className="placeholderCard"
            key={standard.title}
            onClick={() => setSelectedStandard(standard)}
          >
            <strong>{standard.title}</strong>
            <span>View standard</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Volume 4 Standard</div>

        <h2>{selectedStandard.title}</h2>

        <p>{selectedStandard.detail}</p>
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
          accountability, self-honesty, lived experience, and personal
          responsibility.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Silence Architecture</div>

        <p>
          Silence Architecture is the visual and philosophical structure of the
          Foundation Chamber. It means the universe does not explain everything
          immediately. It creates space for the member to slow down, pay
          attention, and recognize the signal beneath the noise.
        </p>

        <p>
          The member is not dragged through the path. They are invited to notice,
          reflect, decode, and earn the next opening.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Reflection Gateway Rules</div>

        {reflectionGateRules.map((rule) => (
          <p key={rule}>• {rule}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Backend Hooks</div>

        <p>
          These systems should be connected later when the universe is ready for
          real accounts, protected archive access, and cloud progress.
        </p>

        <button
          className="actionButton"
          onClick={() => setShowBackendHooks(!showBackendHooks)}
        >
          {showBackendHooks ? "Hide Backend Hooks" : "Show Backend Hooks"}
        </button>

        {showBackendHooks && (
          <div>
            {futureBackendHooks.map((hook) => (
              <p key={hook}>⬜ {hook}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Creator Blueprint Separation</div>

        <p>
          Public archive descriptions should never reveal internal creator
          blueprints, hidden answer chains, archive numbering, monetization
          strategy, backend logic, moderation criteria, or private access
          systems.
        </p>

        <button
          className="actionButton"
          onClick={() => setShowProtectedNotes(!showProtectedNotes)}
        >
          {showProtectedNotes ? "Hide Protected Build Notes" : "Show Protected Build Notes"}
        </button>

        {showProtectedNotes && (
          <div>
            {protectedBuildNotes.map((note) => (
              <p key={note}>⚠ {note}</p>
            ))}
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

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Frontend Security Limit</div>

        <p>
          This chamber can display the Foundation experience, but it cannot
          secure the final path by itself. Real protection must happen through
          backend authentication, server-side signal verification, protected PDF
          delivery, private storage, and database permissions.
        </p>
      </div>
    </section>
  );
}
