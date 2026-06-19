import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const defaultProgress = {
  foundation_started: true,
  foundation_complete: false,
  reflection_complete: false,
  entry_eligible: false,
  entry_access_unlocked: false,
  signal_rank: "Path Initiate",
  last_milestone: "Checkpoint 33 member progress system initialized",
};

function calculateRank(progress) {
  if (progress.entry_access_unlocked) return "Entry Signal";
  if (progress.entry_eligible) return "Foundation Architect";
  if (progress.reflection_complete) return "Reflection Carrier";
  if (progress.foundation_complete) return "Signal Builder";
  if (progress.foundation_started) return "Path Initiate";
  return "Unawakened Signal";
}

function calculateAccess(progress) {
  if (progress.entry_access_unlocked) return "Entry Access Unlocked";
  if (progress.entry_eligible) return "Entry Eligible";
  if (progress.reflection_complete) return "Reflection Complete";
  if (progress.foundation_complete) return "Foundation Complete";
  return "Foundation In Progress";
}

export default function MemberProgressPanel() {
  const [session, setSession] = useState(null);
  const [progress, setProgress] = useState(defaultProgress);
  const [message, setMessage] = useState("Member progress system ready.");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (mounted) setSession(data.session);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      loadProgress(session.user.id);
    } else {
      setProgress(defaultProgress);
    }
  }, [session]);

  async function loadProgress(userId) {
    setLoading(true);
    setMessage("Loading saved progress...");

    const { data, error } = await supabase
      .from("member_progress")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      setMessage("Progress table not ready yet. Create the Supabase table for Checkpoint 33.");
      setLoading(false);
      return;
    }

    if (data) {
      setProgress({
        foundation_started: data.foundation_started ?? true,
        foundation_complete: data.foundation_complete ?? false,
        reflection_complete: data.reflection_complete ?? false,
        entry_eligible: data.entry_eligible ?? false,
        entry_access_unlocked: data.entry_access_unlocked ?? false,
        signal_rank: data.signal_rank || "Path Initiate",
        last_milestone: data.last_milestone || "Progress loaded from Supabase",
      });
      setMessage("Progress loaded from Supabase.");
    } else {
      setProgress(defaultProgress);
      setMessage("No saved progress yet. Save once to create your member progress record.");
    }

    setLoading(false);
  }

  async function saveProgress(nextProgress) {
    if (!session?.user?.id) {
      setMessage("Log in before saving progress to Supabase.");
      return;
    }

    setLoading(true);

    const rankedProgress = {
      ...nextProgress,
      signal_rank: calculateRank(nextProgress),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("member_progress").upsert(
      {
        user_id: session.user.id,
        foundation_started: rankedProgress.foundation_started,
        foundation_complete: rankedProgress.foundation_complete,
        reflection_complete: rankedProgress.reflection_complete,
        entry_eligible: rankedProgress.entry_eligible,
        entry_access_unlocked: rankedProgress.entry_access_unlocked,
        signal_rank: rankedProgress.signal_rank,
        last_milestone: rankedProgress.last_milestone,
        updated_at: rankedProgress.updated_at,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setProgress(rankedProgress);
      setMessage("Progress saved to Supabase.");
    }

    setLoading(false);
  }

  function toggleProgress(key) {
    const next = {
      ...progress,
      [key]: !progress[key],
      last_milestone: `${key.replaceAll("_", " ")} updated`,
    };

    if (key === "foundation_complete" && !next.foundation_complete) {
      next.reflection_complete = false;
      next.entry_eligible = false;
      next.entry_access_unlocked = false;
    }

    if (key === "reflection_complete" && !next.reflection_complete) {
      next.entry_eligible = false;
      next.entry_access_unlocked = false;
    }

    if (next.foundation_complete && next.reflection_complete) {
      next.entry_eligible = true;
    }

    if (!next.entry_eligible) {
      next.entry_access_unlocked = false;
    }

    next.signal_rank = calculateRank(next);
    setProgress(next);
    saveProgress(next);
  }

  async function resetCloudProgress() {
    const reset = {
      ...defaultProgress,
      last_milestone: "Cloud progress reset",
    };

    setProgress(reset);
    await saveProgress(reset);
  }

  const completed = [
    progress.foundation_started,
    progress.foundation_complete,
    progress.reflection_complete,
    progress.entry_eligible,
    progress.entry_access_unlocked,
  ].filter(Boolean).length;

  const percent = Math.round((completed / 5) * 100);

  return (
    <section className="card greenPanel" id="member-progress-panel">
      <div className="cardTitle">Checkpoint 33 Saved Progress System</div>

      <h2>CLOUD MEMBER PROGRESS</h2>

      <p>
        This system saves a logged-in member's Foundation path, Reflection path,
        Entry eligibility, Entry Access status, Signal Rank, and last milestone
        to Supabase.
      </p>

      {!session ? (
        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Login Required</div>
          <p>Log in through the Member Account Access panel before saving cloud progress.</p>
        </div>
      ) : (
        <>
          <div className="progressTrack">
            <div className="progressFill" style={{ width: `${percent}%` }}></div>
          </div>

          <p><strong>Cloud Progress:</strong> {percent}%</p>
          <p><strong>Signal Rank:</strong> {calculateRank(progress)}</p>
          <p><strong>Access Status:</strong> {calculateAccess(progress)}</p>
          <p><strong>Last Milestone:</strong> {progress.last_milestone}</p>

          <div className="placeholderGrid">
            <button className="placeholderCard" onClick={() => toggleProgress("foundation_complete")} disabled={loading}>
              <strong>Foundation</strong>
              <span>{progress.foundation_complete ? "Complete" : "Incomplete"}</span>
              <span>Saved to Supabase.</span>
            </button>

            <button className="placeholderCard" onClick={() => toggleProgress("reflection_complete")} disabled={loading || !progress.foundation_complete}>
              <strong>Reflection</strong>
              <span>{progress.reflection_complete ? "Complete" : "Incomplete"}</span>
              <span>Requires Foundation completion.</span>
            </button>

            <button className="placeholderCard" onClick={() => toggleProgress("entry_access_unlocked")} disabled={loading || !progress.entry_eligible}>
              <strong>Entry Access</strong>
              <span>{progress.entry_eligible ? "Eligible" : "Locked"}</span>
              <span>{progress.entry_access_unlocked ? "Unlocked" : "Not Unlocked"}</span>
            </button>
          </div>

          <button className="actionButton" onClick={() => saveProgress(progress)} disabled={loading}>
            {loading ? "Saving..." : "Save Cloud Progress"}
          </button>

          <button className="actionButton" onClick={resetCloudProgress} disabled={loading}>
            Reset Cloud Progress
          </button>
        </>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Checkpoint 33 Safety Rule</div>
        <p>
          This system saves progress only for logged-in members. Final archive
          answers, private PDF paths, payment secrets, and creator-only logic
          must stay out of frontend files.
        </p>
      </div>

      <p>{message}</p>
    </section>
  );
}
