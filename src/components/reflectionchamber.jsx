import { useState } from "react";

const reflectionStandards = [
  "Reflection should come after Foundation completion.",
  "The user should explain what they discovered, not just enter an answer.",
  "Reflections may stay private, anonymous, or account-connected in the future.",
  "Reflection should not expose hidden archive answers publicly.",
  "Reflection should support growth, truth, and accountability.",
  "Future reflection records should be stored securely in the backend.",
];

const reflectionQuestions = [
  "What did you realize about yourself during the Foundation Path?",
  "What pattern did you notice that you had been avoiding?",
  "What truth became harder to ignore?",
  "What part of your life needs more discipline?",
  "What kind of person are you trying to become?",
  "What does Signal grows where noise falls mean to you now?",
];

const futureReflectionHooks = [
  "Account-linked reflection records",
  "Anonymous reflection option",
  "Creator review option",
  "Entry Access eligibility review",
  "AI-assisted reflection quality review",
  "Private journal mode",
  "Public testimony mode",
  "Member growth timeline",
];

export default function ReflectionChamber() {
  const [voidName, setVoidName] = useState("");
  const [reflection, setReflection] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(reflectionQuestions[0]);
  const [submitted, setSubmitted] = useState(false);
  const [showFutureHooks, setShowFutureHooks] = useState(false);

  function handleSubmit() {
    if (!reflection.trim()) return;
    setSubmitted(true);
  }

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Reflection Chamber</div>

        <h2>FOUNDATION REFLECTION GATEWAY</h2>

        <p>
          The Reflection Chamber is reached after the Foundation Path. It is not
          only a form. It is the moment where the user proves they did more than
          click through the archives.
        </p>

        <p>
          The Reflection Chamber connects Foundation completion to future Entry
          Access eligibility.
        </p>

        <div className="statusGreen">Reflection Gateway Active</div>
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Reflection Standard</div>

        <p>
          A real reflection should show attention, honesty, accountability, and
          personal meaning. It should not simply repeat hidden answers or attempt
          to bypass the Foundation Path.
        </p>
      </div>

      <div className="placeholderGrid">
        {reflectionQuestions.map((question) => (
          <button
            className="placeholderCard"
            key={question}
            onClick={() => setSelectedQuestion(question)}
          >
            <strong>Reflection Prompt</strong>
            <span>{question}</span>
          </button>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Reflection Prompt</div>

        <h2>{selectedQuestion}</h2>

        <p>
          Use this prompt to help form your Foundation reflection. Future
          versions may rotate prompts, score effort, or support private journals.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Void Name</div>

        <p>
          A Void Name can let members remain private while still carrying an
          identity through the universe.
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
      </div>

      {submitted && (
        <div className="card greenPanel">
          <div className="cardTitle">Reflection Received</div>

          <p>
            Reflection received from{" "}
            <strong>{voidName.trim() || "Unknown Signal"}</strong>.
          </p>

          <p>
            Current state: local preview only. Future state: securely stored,
            reviewed, and connected to Entry Access eligibility.
          </p>

          <div className="statusGreen">Preview Submission Complete</div>
        </div>
      )}

      <div className="card greenPanel">
        <div className="cardTitle">Reflection Standards</div>

        {reflectionStandards.map((standard) => (
          <p key={standard}>• {standard}</p>
        ))}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Future Reflection Hooks</div>

        <button
          className="actionButton"
          onClick={() => setShowFutureHooks(!showFutureHooks)}
        >
          {showFutureHooks ? "Hide Future Hooks" : "Show Future Hooks"}
        </button>

        {showFutureHooks && (
          <div>
            {futureReflectionHooks.map((hook) => (
              <p key={hook}>⬜ {hook}</p>
            ))}
          </div>
        )}
      </div>

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Privacy Warning</div>

        <p>
          Reflection content may become sensitive. Future versions should allow
          members to choose whether reflections remain private, anonymous,
          creator-reviewed, or public.
        </p>

        <p>
          Reflection records should be stored in a secure backend, not directly
          inside frontend files.
        </p>
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Entry Access Connection</div>

        <p>
          Future progression should follow this path:
        </p>

        <p>
          Foundation completion → signal verification → reflection submission →
          review → Entry Access eligibility.
        </p>
      </div>
    </section>
  );
}
