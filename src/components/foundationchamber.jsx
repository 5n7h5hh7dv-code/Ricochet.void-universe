import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const archives = [
  {
    name: "The Coded Mirror",
    slug: "the-coded-mirror",
    phase: "Identity Confrontation",
    status: "Open",
    difficulty: "Difficulty 2/10",
    signal: "REFLECT",
    pdfPath: "/archives/the-coded-mirror.pdf",
    purpose:
      "The first Foundation archive. The member compares self-image against repeated action and learns that identity is proven through behavior.",
    next: "Void Protocol 7",
  },
  {
    name: "Void Protocol 7",
    slug: "void-protocol-7",
    phase: "Noise Reduction",
    status: "Locked until The Coded Mirror is completed",
    difficulty: "Difficulty 3/10",
    purpose:
      "Silence, attention, and removing the noise that hides the signal.",
  },
  {
    name: "Neural Wealth Mapping",
    slug: "neural-wealth-mapping",
    phase: "Future Construction",
    status: "Locked",
    difficulty: "Difficulty 4/10",
    purpose:
      "Thought patterns, money behavior, time, planning, and future construction.",
  },
  {
    name: "The Dopamine Collapse Manual",
    slug: "dopamine-collapse-manual",
    phase: "Distraction Collapse",
    status: "Locked",
    difficulty: "Difficulty 5/10",
    purpose:
      "Distraction, overstimulation, comfort loops, and attention control.",
  },
  {
    name: "Project Ascension",
    slug: "project-ascension",
    phase: "Elevation",
    status: "Locked",
    difficulty: "Difficulty 6/10",
    purpose:
      "Growth standards, structure, rebuilding, and rising with intention.",
  },
  {
    name: "The Human Glitch",
    slug: "human-glitch",
    phase: "Pattern Exposure",
    status: "Locked",
    difficulty: "Difficulty 7/10",
    purpose:
      "Repeated errors, personal loops, excuses, and the pattern that keeps returning.",
  },
  {
    name: "Psychological Warfare Against Yourself",
    slug: "psychological-warfare-against-yourself",
    phase: "Inner Battle",
    status: "Locked",
    difficulty: "Difficulty 8/10",
    purpose:
      "The inner conflict between discipline, comfort, excuse, command, and creation.",
  },
  {
    name: "The Internal Empire Blueprint",
    slug: "internal-empire-blueprint",
    phase: "Empire Structure",
    status: "Final Foundation Gate",
    difficulty: "Difficulty 10/10",
    purpose:
      "The final Foundation structure before Reflection Chamber and Entry Access eligibility.",
  },
];

function normalizeSignal(value) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9 ]/g, "").replace(/\s+/g, " ");
}

export default function FoundationChamber() {
  const [session, setSession] = useState(null);
  const [selectedArchive, setSelectedArchive] = useState(archives[0]);
  const [completed, setCompleted] = useState({});
  const [journal, setJournal] = useState("");
  const [signalInput, setSignalInput] = useState("");
  const [message, setMessage] = useState("Foundation system ready.");
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
      loadProgress(session.user.id);
      loadJournal(session.user.id, selectedArchive.slug);
    } else {
      setCompleted({});
      setJournal("");
    }
  }, [session, selectedArchive.slug]);

  async function loadProgress(userId) {
    const { data } = await supabase
      .from("member_progress")
      .select("foundation_started, foundation_complete, last_milestone")
      .eq("user_id", userId)
      .maybeSingle();

    if (data?.foundation_complete) {
      setCompleted({ "the-coded-mirror": true });
    } else {
      setCompleted({});
    }
  }

  async function loadJournal(userId, archiveSlug) {
    const { data, error } = await supabase
      .from("archive_notes")
      .select("notes")
      .eq("user_id", userId)
      .eq("archive_slug", archiveSlug)
      .maybeSingle();

    if (!error && data?.notes) {
      setJournal(data.notes);
    } else {
      setJournal("");
    }
  }

  async function saveJournal() {
    if (!session?.user?.id) {
      setMessage("Log in before saving Signal Journal notes.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("archive_notes").upsert(
      {
        user_id: session.user.id,
        archive_slug: selectedArchive.slug,
        archive_name: selectedArchive.name,
        notes: journal,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,archive_slug" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signal Journal saved to Supabase.");
    }

    setLoading(false);
  }

  async function submitSignal() {
    if (!session?.user?.id) {
      setMessage("Log in before submitting a Foundation signal.");
      return;
    }

    if (selectedArchive.slug !== "the-coded-mirror") {
      setMessage("This archive is not open yet. Complete the current path first.");
      return;
    }

    const submitted = normalizeSignal(signalInput);
    const correct = normalizeSignal(selectedArchive.signal);

    if (submitted !== correct) {
      setMessage("Signal not accepted. Reopen the archive, review your notes, and look for what repeats.");
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
        last_milestone: "The Coded Mirror completed",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setCompleted({ ...completed, "the-coded-mirror": true });
      setSignalInput("");
      setMessage("Signal accepted. The Coded Mirror is complete. Void Protocol 7 is the next Foundation path.");
    }

    setLoading(false);
  }

  const codedMirrorComplete = Boolean(completed["the-coded-mirror"]);

  return (
    <section>
      <div className="card greenPanel">
        <div className="cardTitle">Foundation Path</div>
        <h2>FOUNDATION ARCHIVES</h2>
        <p>
          The Foundation is now a working path. Members open real archive files,
          take Signal Journal notes, submit discovered signals, and save progress
          to their RVU account.
        </p>
        <div className="statusGreen">The Coded Mirror Active</div>
      </div>

      {!session && (
        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Member Login Required</div>
          <p>
            Create or log into an RVU account through the Public Member Gateway
            before saving notes or submitting archive signals.
          </p>
        </div>
      )}

      <div className="placeholderGrid">
        {archives.map((archive) => {
          const isOpen = archive.slug === "the-coded-mirror";
          const isNext = archive.slug === "void-protocol-7" && codedMirrorComplete;

          return (
            <button
              className="placeholderCard"
              key={archive.slug}
              onClick={() => setSelectedArchive(archive)}
            >
              <strong>{archive.name}</strong>
              <span>{archive.phase}</span>
              <span>{archive.difficulty}</span>
              <span>{isOpen ? "Open Now" : isNext ? "Next Path Ready For Build" : archive.status}</span>
            </button>
          );
        })}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Selected Foundation Archive</div>
        <h2>{selectedArchive.name}</h2>
        <p><strong>Phase:</strong> {selectedArchive.phase}</p>
        <p><strong>Difficulty:</strong> {selectedArchive.difficulty}</p>
        <p>{selectedArchive.purpose}</p>

        {selectedArchive.slug === "the-coded-mirror" ? (
          <>
            <a className="actionButton" href={selectedArchive.pdfPath} target="_blank" rel="noreferrer">
              Open The Coded Mirror PDF
            </a>
            <a href={selectedArchive.pdfPath} download>
              Download The Coded Mirror
            </a>
          </>
        ) : (
          <p>
            This archive is mapped but not installed yet. It will become active
            after its full PDF, signal logic, and progression gate are built.
          </p>
        )}
      </div>

      <div className="card greenPanel">
        <div className="cardTitle">Signal Journal</div>
        <p>
          Use this space while reading. Record symbols, repeated words, possible
          signals, personal realizations, and questions. Your notes are tied to
          the selected archive.
        </p>
        <textarea
          className="reflectionText"
          value={journal}
          onChange={(event) => setJournal(event.target.value)}
          placeholder="Write your notes for this archive..."
        />
        <button className="actionButton" onClick={saveJournal} disabled={loading}>
          {loading ? "Saving..." : "Save Signal Journal"}
        </button>
      </div>

      {selectedArchive.slug === "the-coded-mirror" && (
        <div className="card greenPanel">
          <div className="cardTitle">Signal Submission</div>
          <p>
            When you believe you have discovered the signal inside The Coded
            Mirror, enter it here. The archive gives enough to find it, but it
            will not hand it away.
          </p>
          <input
            value={signalInput}
            onChange={(event) => setSignalInput(event.target.value)}
            placeholder="ENTER THE SIGNAL"
          />
          <button className="actionButton" onClick={submitSignal} disabled={loading}>
            {loading ? "Checking..." : "Submit Signal"}
          </button>
          {codedMirrorComplete && <div className="statusGreen">The Coded Mirror Complete</div>}
        </div>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Foundation Security Standard</div>
        <p>
          This path now works for The Coded Mirror. Future archives should be
          added one by one with real PDFs, real journal saving, and real signal
          gates. Final production security should eventually move signal
          verification to a server-side function.
        </p>
      </div>

      <p>{message}</p>
    </section>
  );
}
