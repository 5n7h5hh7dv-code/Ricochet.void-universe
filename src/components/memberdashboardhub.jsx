import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function getRank(progress) {
  if (progress?.entry_access_unlocked) return "Entry Signal";
  if (progress?.entry_eligible) return "Foundation Architect";
  if (progress?.reflection_complete) return "Reflection Carrier";
  if (progress?.foundation_complete) return "Signal Builder";
  if (progress?.foundation_started) return "Path Initiate";
  return "Unawakened Signal";
}

function getAccess(progress) {
  if (progress?.entry_access_unlocked) return "Entry Access Unlocked";
  if (progress?.entry_eligible) return "Entry Eligible";
  if (progress?.reflection_complete) return "Reflection Complete";
  if (progress?.foundation_complete) return "Foundation Complete";
  return "Foundation In Progress";
}

export default function MemberDashboardHub() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState("Member dashboard hub ready.");
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
      loadDashboard(session.user.id);
    } else {
      setProfile(null);
      setProgress(null);
    }
  }, [session]);

  async function loadDashboard(userId) {
    setLoading(true);
    setMessage("Loading member dashboard from Supabase...");

    const [{ data: profileData, error: profileError }, { data: progressData, error: progressError }] =
      await Promise.all([
        supabase.from("member_profiles").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("member_progress").select("*").eq("user_id", userId).maybeSingle(),
      ]);

    if (profileError || progressError) {
      setMessage("Dashboard data could not fully load. Confirm Checkpoint 33 and 34 SQL tables exist.");
    } else {
      setMessage("Member dashboard loaded from Supabase.");
    }

    setProfile(profileData || null);
    setProgress(progressData || null);
    setLoading(false);
  }

  const steps = [
    { label: "Foundation Started", value: progress?.foundation_started },
    { label: "Foundation Complete", value: progress?.foundation_complete },
    { label: "Reflection Complete", value: progress?.reflection_complete },
    { label: "Entry Eligible", value: progress?.entry_eligible },
    { label: "Entry Access Unlocked", value: progress?.entry_access_unlocked },
  ];

  const completeCount = steps.filter((step) => step.value).length;
  const percent = Math.round((completeCount / steps.length) * 100);

  return (
    <section className="card greenPanel" id="member-dashboard-hub">
      <div className="cardTitle">Checkpoint 37 Member Dashboard Hub</div>

      <h2>MEMBER COMMAND CENTER</h2>

      <p>
        This dashboard pulls together the logged-in member's RVU identity,
        Foundation progress, Signal Rank, access state, and next action from
        Supabase.
      </p>

      {!session ? (
        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Login Required</div>
          <p>Log in through the Public Member Gateway before using the dashboard.</p>
        </div>
      ) : (
        <>
          <div className="placeholderGrid">
            <div className="placeholderCard">
              <strong>Member Identity</strong>
              <span>{profile?.void_name || "Void Name not set"}</span>
              <span>{profile?.signal_name || "Signal Name not set"}</span>
              <span>{profile?.public_title || "Path Initiate"}</span>
            </div>

            <div className="placeholderCard">
              <strong>Signal Rank</strong>
              <span>{getRank(progress)}</span>
              <span>{getAccess(progress)}</span>
            </div>

            <div className="placeholderCard">
              <strong>Cloud Progress</strong>
              <span>{percent}% Complete</span>
              <span>{progress?.last_milestone || "No milestone saved yet"}</span>
            </div>
          </div>

          <div className="progressTrack">
            <div className="progressFill" style={{ width: `${percent}%` }}></div>
          </div>

          <div className="card greenPanel">
            <div className="cardTitle">Progression Checklist</div>
            {steps.map((step) => (
              <p key={step.label}>
                {step.value ? "✓" : "☐"} {step.label}
              </p>
            ))}
          </div>

          <div className="card greenPanel">
            <div className="cardTitle">Next Best Action</div>
            {!progress?.foundation_started && <p>Begin the Foundation path.</p>}
            {progress?.foundation_started && !progress?.foundation_complete && <p>Complete the Foundation path.</p>}
            {progress?.foundation_complete && !progress?.reflection_complete && <p>Complete your Reflection.</p>}
            {progress?.reflection_complete && !progress?.entry_access_unlocked && <p>Unlock Entry Access when approved or eligible.</p>}
            {progress?.entry_access_unlocked && <p>Entry Access is open. Continue deeper into RVU.</p>}
          </div>

          <button className="actionButton" onClick={() => loadDashboard(session.user.id)} disabled={loading}>
            {loading ? "Loading..." : "Reload Dashboard"}
          </button>
        </>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Dashboard Protection Rule</div>
        <p>
          This dashboard displays member-owned records only. Creator secrets,
          final hidden answers, payment keys, protected PDF paths, and blueprint
          logic must remain outside frontend files.
        </p>
      </div>

      <p>{message}</p>
    </section>
  );
}
