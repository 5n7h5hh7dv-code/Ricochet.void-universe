import { useState } from "react";

const reflectionPrompts = [
  {
    title: "Identity Realization",
    prompt:
      "What did the Foundation Path reveal about who you are becoming compared to who you say you are?",
  },
  {
    title: "Noise Recognition",
    prompt:
      "What noise, habit, distraction, or repeated pattern has been weakening your signal?",
  },
  {
    title: "Accountability Check",
    prompt:
      "What responsibility can you no longer avoid after moving through the Foundation?",
  },
  {
    title: "Signal Meaning",
    prompt:
      "What does Signal grows where noise falls mean to you now?",
  },
  {
    title: "Future Construction",
    prompt:
      "What part of your life needs to be rebuilt with discipline, truth, and structure?",
  },
  {
    title: "Entry Readiness",
    prompt:
      "Why do you believe you are ready to move beyond the Foundation and approach Entry Access?",
  },
];

const reflectionStandards = [
  "Reflection should come after Foundation completion.",
  "Reflection should show personal meaning, not copied answers.",
  "Reflection should not reveal hidden archive answers publicly.",
  "Reflection should support truth, accountability, and growth.",
  "Future reflection records should be stored securely in the backend.",
  "Members should eventually choose private, anonymous, or public sharing.",
  "Entry Access eligibility should depend on meaningful completion, not only clicking buttons.",
];

const privacyModes = [
  {
    mode: "Private Reflection",
    meaning:
      "Visible only to the member and future secure account systems unless creator review is enabled.",
  },
  {
    mode: "Anonymous Signal",
    meaning:
      "Can be shared without exposing personal identity, using a Void Name or hidden member identity.",
  },
  {
    mode: "Creator Review",
    meaning:
      "Submitted for future review to support Entry Access eligibility and progression validation.",
  },
  {
    mode: "Public Testimony",
    meaning:
      "A future optional mode where a member may choose to share part of their journey publicly.",
  },
];

const futureReflectionHooks = [
  "Account-linked reflection records",
  "Anonymous reflection mode",
  "Creator review queue",
  "Entry Access eligibility review",
  "AI-assisted reflection quality review",
  "Private journal mode",
  "Public testimony option",
  "Member growth timeline",
  "Reflection privacy controls",
  "Secure backend storage",
];

const entryPath = [
  "Foundation Path completed",
  "Required signals verified",
  "Reflection submitted",
  "Reflection reviewed",
  "Entry Access eligibility confirmed",
  "Member dashboard updated",
];

export default function ReflectionChamber() {
  const [voidName, setVoidName] = useState("");
  const [reflection, setReflection] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(reflectionPrompts[0]);
  const [selectedPrivacy, setSelectedPrivacy] = useState(privacyModes[0]);
  const [submitted, setSubmitted] = useState(false);
  const [showStandards, setShowStandards] = useState(false);
  const [showHooks, setShowHooks] = useState(false);

  function handleSubmit() {
    if (!reflection.trim()) return;
    setSubmitted(true);
  }

  function clearReflection() {
    setSubmitted(false);
    setReflection("");
    setVoidName("");
    setSelectedPrompt(reflectionPrompts[0]);
    setSelectedPrivacy(privacyModes[0]);
  }

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Reflection Chamber</div>

        <h2>FOUNDATION REFLECTION GATEWAY</h2>

        <p>
          The Reflection Chamber is reached after the Foundation Path. It is the
          place where a member proves they did more than open files. They must
          show realization, truth, accountability, and personal meaning.
        </p>

        <p>
          This chamber connects Foundation completion to future Entry Access
          eligibility. Current state: frontend reflection preview. Future state:
          secure account-linked reflection records and review systems.
        </p>

        <div className="statusGreen">Volume 4 Reflection Gateway Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Reflection Standard</div>

        <p>
          A real reflection should not simply repeat hidden answers. It should
          show what changed in the member's awareness, what they noticed, and
          what they are now responsible for building.
        </p>
      </div>

      <div className="placeholderGrid">
        {reflectionPrompts.map((item) => (
          <button
            key={item.title}
            className="placeholderCard"
            onClick={() => setSelectedPrompt(item)}
          >
            <strong>{item.title}</strong>
            <span>{item.prompt}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Reflection Prompt</div>

        <h2>{selectedPrompt.title}</h2>

        <p>{selectedPrompt.prompt}</p>
      </div>

      <div className="placeholderGrid">
        {privacyModes.map((privacy) => (
          <button
            key={privacy.mode}
            className="placeholderCard"
            onClick={() => setSelectedPrivacy(privacy)}
          >
            <strong>{privacy.mode}</strong>
            <span>View privacy meaning</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Privacy Mode</div>

        <h2>{selectedPrivacy.mode}</h2>

        <p>{selectedPrivacy.meaning}</p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Void Name</div>

        <p>
          A Void Name can allow a member to carry identity through the universe
          without exposing their personal identity publicly.
        </p>

        <input
          value={voidName}
          onChange={(event) => setVoidName(event.target.value)}
          placeholder="VOID NAME OR LEAVE BLANK"
        />
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Foundation Realization</div>

        <textarea
          className="reflectionText"
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          placeholder="Write the realization earned from the Foundation Path..."
        />

        <br />
        <br />

        <button className="actionButton" onClick={handleSubmit}>
          Submit Reflection Preview
        </button>

        {submitted && (
          <button className="actionButton" onClick={clearReflection}>
            Clear Preview Reflection
          </button>
        )}
      </div>

      {submitted && (
        <div className="card greenPanel">
          <div className="cardTitle">Reflection Received</div>

          <p>
            Reflection received from{" "}
            <strong>{voidName.trim() || "Unknown Signal"}</strong>.
          </p>

          <p>
            <strong>Privacy Mode:</strong> {selectedPrivacy.mode}
          </p>

          <p>
            Current state: local frontend preview only. Future state: securely
            stored, reviewed, and connected to Entry Access eligibility.
          </p>

          <div className="statusGreen">Preview Submission Complete</div>
        </div>
      )}

      <div className="card greenPanel">
        <div className="cardTitle">Reflection Standards</div>

        <button
          className="actionButton"
          onClick={() => setShowStandards(!showStandards)}
        >
          {showStandards ? "Hide Standards" : "Show Standards"}
        </button>

        {showStandards &&
          reflectionStandards.map((standard) => (
            <p key={standard}>• {standard}</p>
          ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Entry Access Path</div>

        {entryPath.map((step) => (
          <p key={step}>☐ {step}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Reflection Hooks</div>

        <button
          className="actionButton"
          onClick={() => setShowHooks(!showHooks)}
        >
          {showHooks ? "Hide Future Hooks" : "Show Future Hooks"}
        </button>

        {showHooks &&
          futureReflectionHooks.map((hook) => (
            <p key={hook}>⬜ {hook}</p>
          ))}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Reflection Privacy Warning</div>

        <p>
          Reflection content may become personal. Future versions should allow
          members to choose whether reflections remain private, anonymous,
          creator-reviewed, or public.
        </p>

        <p>
          Reflection records should be stored in a secure backend, not directly
          inside frontend files.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Volume 4 Reflection Standard</div>

        <p>
          The Reflection Chamber should feel like the threshold between reading
          and becoming. The member does not move forward because they clicked
          through content. They move forward because they noticed something real.
        </p>
      </div>
    </section>
  );
}
