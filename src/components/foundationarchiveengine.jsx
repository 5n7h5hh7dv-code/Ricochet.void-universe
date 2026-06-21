import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const ARCHIVE = {
  slug: "the-coded-mirror",
  name: "The Coded Mirror",
  pdfPath: "/archives/the-coded-mirror.pdf",
  nextArchive: "Void Protocol 7",
  signalDifficulty: "Opening Signal",
};

const acceptedSignals = [
  "reflect",
  "reflection",
  "self reflection",
  "self-reflection",
  "look within",
  "look inward",
  "mirror",
  "the mirror",
  "reflection begins",
];

function normalizeSignal(value) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll("-", " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function isAcceptedSignal(value) {
  const normalized = normalizeSignal(value);
  return acceptedSignals.map(normalizeSignal).includes(normalized);
}

export default function FoundationArchiveEngine() {
  const [session, setSession] = useState(null);
  const [notes, setNotes] = useState("");
  const [signalInput, setSignalInput] = useState("");
  const [message, setMessage] = useState("Archive engine ready.");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (mounted) setSession(data.session);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => setSession(currentSession)
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      loadArchiveState(session.user.id);
    } else {
      setNotes("");
      setCompleted(false);
    }
  }, [session]);

  async function loadArchiveState(userId) {
    setLoading(true);
    setMessage("Loading archive state...");

    const [{ data: noteData }, { data: progressData }] = await Promise.all([
      supabase
        .from("archive_notes")
        .select("*")
        .eq("user_id", userId)
        .eq("archive_slug", ARCHIVE.slug)
        .maybeSingle(),
      supabase
        .from("member_progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(),
    ]);

    setNotes(noteData?.notes || "");
    setCompleted(Boolean(progressData?.foundation_complete));
    setMessage("Archive state loaded.");
    setLoading(false);
  }

  async function saveNotes() {
    if (!session?.user?.id) {
      setMessage("Log in before saving Signal Journal notes.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("archive_notes").upsert(
      {
        user_id: session.user.id,
        archive_slug: ARCHIVE.slug,
        archive_name: ARCHIVE.name,
        notes,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,archive_slug" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signal Journal notes saved.");
    }

    setLoading(false);
  }

  async function submitSignal() {
    if (!session?.user?.id) {
      setMessage("Log in before submitting an archive signal.");
      return;
    }

    if (!isAcceptedSignal(signalInput)) {
      setMessage("Signal not accepted. Review the archive, your notes, and what keeps appearing.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("member_progress").upsert(
      {
        user_id: session.user.id,
        foundation_started: true,
        foundation_complete: true,
        reflection_complete: false,
        entry_eligible: false,
        entry_access_unlocked: false,
        signal_rank: "Signal Builder",
        last_milestone: `${ARCHIVE.name} completed. ${ARCHIVE.nextArchive} is the next path.`,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setCompleted(true);
      setSignalInput("");
      setMessage(`${ARCHIVE.name} completed. Next path prepared: ${ARCHIVE.nextArchive}.`);
    }

    setLoading(false);
  }

  return (
    <section className="card greenPanel" id="foundation-archive-engine">
      <div className="cardTitle">Checkpoint 39 Foundation Archive Engine</div>

      <h2>{ARCHIVE.name}</h2>

      <p>
        This is the first working Foundation Archive loop: open the archive,
        keep a Signal Journal, submit the discovered signal, and save completion
        to the member account.
      </p>

      {!session ? (
        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Login Required</div>
          <p>Create or log into a member account before saving notes or submitting signals.</p>
        </div>
      ) : (
        <>
          <div className="placeholderGrid">
            <a className="placeholderCard" href={ARCHIVE.pdfPath} target="_blank" rel="noreferrer">
              <strong>Open Archive</strong>
              <span>{ARCHIVE.name}</span>
              <span>{ARCHIVE.signalDifficulty}</span>
            </a>

            <div className="placeholderCard">
              <strong>Archive Status</strong>
              <span>{completed ? "Complete" : "In Progress"}</span>
              <span>{completed ? `${ARCHIVE.nextArchive} prepared` : "Signal required"}</span>
            </div>

            <div className="placeholderCard">
              <strong>Signal Rule</strong>
              <span>Meaning-based answers allowed</span>
              <span>Case and extra spaces do not matter</span>
            </div>
          </div>

          <div className="card greenPanel">
            <div className="cardTitle">Signal Journal</div>
            <p>
              Use this space to track clues, symbols, repeated words, theories,
              and reflections while reading the archive.
            </p>

            <textarea
              className="reflectionText"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Write your notes, patterns, symbols, and theories here..."
            />

            <button className="actionButton" onClick={saveNotes} disabled={loading}>
              {loading ? "Saving..." : "Save Signal Journal"}
            </button>
          </div>

          <div className="card greenPanel">
            <div className="cardTitle">Submit Archive Signal</div>
            <p>
              The first archive accepts a small family of answers that point to
              the same discovery. Later archives will require more precise
              multi-word signals.
            </p>

            <input
              value={signalInput}
              onChange={(event) => setSignalInput(event.target.value)}
              placeholder="ENTER THE SIGNAL"
            />

            <button className="actionButton" onClick={submitSignal} disabled={loading}>
              {loading ? "Checking..." : "Submit Signal"}
            </button>
          </div>
        </>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Checkpoint 39 Protection Rule</div>
        <p>
          Early archives may allow meaning-based answers. Later archives should
          become harder, requiring exact multi-word signals and eventually a
          full chain phrase. Final hidden answer logic should eventually move to
          server-side verification.
        </p>
      </div>

      <p>{message}</p>
    </section>
  );
}
