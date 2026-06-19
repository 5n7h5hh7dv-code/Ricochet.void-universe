import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const defaultFoundationState = {
  foundation_started: true,
  foundation_complete: false,
  reflection_complete: false,
  entry_eligible: false,
  entry_access_unlocked: false,
  signal_rank: "Path Initiate",
  last_milestone: "Checkpoint 35 foundation save system ready",
};

function getRank(progress) {
  if (progress.entry_access_unlocked) return "Entry Signal";
  if (progress.entry_eligible) return "Foundation Architect";
  if (progress.reflection_complete) return "Reflection Carrier";
  if (progress.foundation_complete) return "Signal Builder";
  if (progress.foundation_started) return "Path Initiate";
  return "Unawakened Signal";
}

function getAccess(progress) {
  if (progress.entry_access_unlocked) return "Entry Access Unlocked";
  if (progress.entry_eligible) return "Entry Eligible";
  if (progress.reflection_complete) return "Reflection Complete";
  if (progress.foundation_complete) return "Foundation Complete";
  return "Foundation In Progress";
}

export default function FoundationSaveSystem() {
  const [session, setSession] = useState(null);
  const [progress, setProgress] = useState(defaultFoundationState);
  const [message, setMessage] = useState("Foundation save system ready.");
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
      loadFoundationProgress(session.user.id);
    } else {
      setProgress(defaultFoundationState);
    }
  }, [session]);

  async function loadFoundationProgress(userId) {
    setLoading(true);
    setMessage("Loading Foundation progress from Supabase...");

    const { data, error } = await supabase
      .from("member_progress")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      setMessage("Could not load Foundation progress. Make sure Checkpoint 33 SQL was run.");
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
        last_milestone: data.last_milestone || "Foundation progress loaded",
      });
      setMessage("Foundation progress loaded from Supabase.");
    } else {
      setProgress(defaultFoundationState);
      setMessage("No Foundation record yet. Click Save Foundation Start to create one.");
    }

    setLoading(false);
  }

  async function saveFoundationProgress(nextProgress) {
    if (!session?.user?.id) {
      setMessage("Log in before saving Foundation progress.");
      return;
    }

    setLoading(true);

    const ranked = {
      ...nextProgress,
      signal_rank: getRank(nextProgress),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("member_progress").upsert(
      {
        user_id: session.user.id,
        foundation_started: ranked.foundation_started,
        foundation_complete: ranked.foundation_complete,
        reflection_complete: ranked.reflection_complete,
        entry_eligible: ranked.entry_eligible,
        entry_access_unlocked: ranked.entry_access_unlocked,
        signal_rank: ranked.signal_rank,
        last_milestone: ranked.last_milestone,
        updated_at: ranked.updated_at,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setProgress(ranked);
      setMessage("Foundation progress saved to Supabase.");
    }

    setLoading(false);
  }

  function markFoundationStarted() {
    const next = {
      ...progress,
      foundation_started: true,
      last_milestone: "Foundation started and saved",
    };

    saveFoundationProgress(next);
  }

  function markFoundationComplete() {
    const next = {
      ...progress,
      foundation_started: true,
      foundation_complete: true,
      last_milestone: "Foundation completed and saved",
    };

    next.signal_rank = getRank(next);
    saveFoundationProgress(next);
  }

  function markReflectionComplete() {
    const next = {
      ...progress,
      foundation_started: true,
      foundation_complete: true,
      reflection_complete: true,
      entry_eligible: true,
      last_milestone: "Reflection completed. Entry eligibility reached.",
    };

    next.signal_rank = getRank(next);
    saveFoundationProgress(next);
  }

  function unlockEntryAccess() {
    if (!progress.entry_eligible) {
      setMessage("Complete Foundation and Reflection before unlocking Entry Access.");
      return;
    }

    const next = {
      ...progress,
      entry_access_unlocked: true,
      last_milestone: "Entry Access unlocked through saved progress",
    };

    next.signal_rank = getRank(next);
    saveFoundationProgress(next);
  }

  async function resetFoundationSave() {
    const reset = {
      ...defaultFoundationState,
      last_milestone: "Checkpoint 35 Foundation progress reset",
    };

    await saveFoundationProgress(reset);
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
    <section className="card greenPanel" id="foundation-save-system">
      <div className="cardTitle">Checkpoint 35 Foundation Save System</div>

      <h2>FOUNDATION PATH CLOUD SAVE</h2>

      <p>
        This system connects the Foundation journey to the logged-in member's
        Supabase progress record. Foundation start, completion, Reflection,
        Entry eligibility, and Entry Access can now be saved into the cloud.
      </p>

      {!session ? (
        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Login Required</div>
          <p>Log in through Member Account Access before saving Foundation progress.</p>
        </div>
      ) : (
        <>
          <div className="progressTrack">
            <div className="progressFill" style={{ width: `${percent}%` }}></div>
          </div>

          <p><strong>Foundation Cloud Progress:</strong> {percent}%</p>
          <p><strong>Signal Rank:</strong> {getRank(progress)}</p>
          <p><strong>Access Status:</strong> {getAccess(progress)}</p>
          <p><strong>Last Milestone:</strong> {progress.last_milestone}</p>

          <div className="placeholderGrid">
            <button className="placeholderCard" onClick={markFoundationStarted} disabled={loading}>
              <strong>Save Foundation Start</strong>
              <span>{progress.foundation_started ? "Started" : "Not Started"}</span>
              <span>Creates or updates the member progress record.</span>
            </button>

            <button className="placeholderCard" onClick={markFoundationComplete} disabled={loading}>
              <strong>Complete Foundation</strong>
              <span>{progress.foundation_complete ? "Complete" : "Incomplete"}</span>
              <span>Saves Foundation completion to Supabase.</span>
            </button>

            <button className="placeholderCard" onClick={markReflectionComplete} disabled={loading}>
              <strong>Complete Reflection</strong>
              <span>{progress.reflection_complete ? "Complete" : "Incomplete"}</span>
              <span>Marks Reflection complete and Entry eligible.</span>
            </button>

            <button className="placeholderCard" onClick={unlockEntryAccess} disabled={loading || !progress.entry_eligible}>
              <strong>Unlock Entry Access</strong>
              <span>{progress.entry_eligible ? "Eligible" : "Locked"}</span>
              <span>{progress.entry_access_unlocked ? "Unlocked" : "Not Unlocked"}</span>
            </button>
          </div>

          <button className="actionButton" onClick={() => loadFoundationProgress(session.user.id)} disabled={loading}>
            Reload Cloud Progress
          </button>

          <button className="actionButton" onClick={resetFoundationSave} disabled={loading}>
            Reset Foundation Save
          </button>
        </>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Checkpoint 35 Safety Rule</div>
        <p>
          This saves visible progression only. Final archive answers, hidden
          unlock logic, private PDFs, payment data, creator vault secrets, and
          blueprint materials must stay out of frontend code.
        </p>
      </div>

      <p>{loading ? "Working..." : message}</p>
    </section>
  );
}
