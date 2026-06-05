import { useState } from "react";

export default function ReflectionChamber() {
  const [voidName, setVoidName] = useState("");
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!reflection.trim()) return;
    setSubmitted(true);
  }

  return (
    <section>
      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Reflection Chamber</div>

        <p>
          The Reflection Chamber is reached after completing the
          Foundation path. Here, members record what they discovered
          about themselves during their journey.
        </p>

        <div className="statusGreen">
          Reflection System Active
        </div>
      </div>

      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Void Name (Optional)</div>

        <input
          className="accessInput"
          value={voidName}
          onChange={(e) => setVoidName(e.target.value)}
          placeholder="ENTER VOID NAME"
        />
      </div>

      <div className="card sectionPad greenPanel">
        <div className="cardTitle">Your Realization</div>

        <textarea
          className="reflectionText"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What did you learn about yourself?"
        />

        <br />
        <br />

        <button
          className="actionButton"
          onClick={handleSubmit}
        >
          Submit Reflection
        </button>
      </div>

      {submitted && (
        <div className="card gateResult granted">
          Reflection received from{" "}
          {voidName.trim() || "Unknown Signal"}.
        </div>
      )}

      <div className="card sectionPad redPanel">
        <div className="cardTitle restrictedTitle">
          Reflection Privacy
        </div>

        <p>
          Future versions may allow members to choose whether
          reflections remain private, shared anonymously, or
          connected to their account profile.
        </p>
      </div>
    </section>
  );
}
