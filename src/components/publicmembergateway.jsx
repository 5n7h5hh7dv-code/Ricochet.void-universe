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

export default function PublicMemberGateway({ onBeginFoundation }) {
  const [session, setSession] = useState(null);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState("Public member gateway ready.");
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
      loadMemberData(session.user.id);
    } else {
      setProfile(null);
      setProgress(null);
    }
  }, [session]);

  async function loadMemberData(userId) {
    setLoading(true);
    setMessage("Loading member gateway data...");

    const [{ data: profileData }, { data: progressData }] = await Promise.all([
      supabase.from("member_profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("member_progress").select("*").eq("user_id", userId).maybeSingle(),
    ]);

    setProfile(profileData || null);
    setProgress(progressData || null);
    setMessage("Member gateway data loaded.");
    setLoading(false);
  }

  async function handleAuth(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("Processing account request...");

    if (!email.trim() || !password.trim()) {
      setMessage("Enter an email and password first.");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      setMessage(error ? error.message : "Signup submitted. Check your email if confirmation is required.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        setPassword("");
        setMessage("Login successful. Welcome back to RVU.");
      }
    }

    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(error.message);
    } else {
      setSession(null);
      setProfile(null);
      setProgress(null);
      setMessage("Logged out.");
    }

    setLoading(false);
  }

  async function startFoundationRecord() {
    if (!session?.user?.id) {
      setMessage("Create or log into a member account before saving Foundation progress.");
      return;
    }

    setLoading(true);

    const startingProgress = progress || { foundation_started: true };

    const { error } = await supabase.from("member_progress").upsert(
      {
        user_id: session.user.id,
        foundation_started: true,
        foundation_complete: startingProgress.foundation_complete ?? false,
        reflection_complete: startingProgress.reflection_complete ?? false,
        entry_eligible: startingProgress.entry_eligible ?? false,
        entry_access_unlocked: startingProgress.entry_access_unlocked ?? false,
        signal_rank: getRank({ ...startingProgress, foundation_started: true }),
        last_milestone: "Foundation started from public gateway",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Foundation start saved. Opening the Foundation path.");
      await loadMemberData(session.user.id);
      if (typeof onBeginFoundation === "function") onBeginFoundation();
    }

    setLoading(false);
  }

  return (
    <section className="card greenPanel" id="public-member-gateway">
      <div className="cardTitle">Checkpoint 36 Public Member Gateway</div>

      <h2>JOIN THE RICOCHET VOID UNIVERSE</h2>

      <p>
        This public gateway turns the front door into a working member entry
        system. Visitors can create an account, log in, begin the Foundation,
        and return later with their saved RVU identity and progress.
      </p>

      {session ? (
        <div className="card greenPanel">
          <div className="cardTitle">Member Session</div>

          <p><strong>Status:</strong> Logged In</p>
          <p className="safeText"><strong>Email:</strong> {session.user?.email || "Unknown"}</p>
          <p><strong>Void Name:</strong> {profile?.void_name || "Not created yet"}</p>
          <p><strong>Signal Name:</strong> {profile?.signal_name || "Not created yet"}</p>
          <p><strong>Signal Rank:</strong> {getRank(progress)}</p>
          <p><strong>Access Status:</strong> {getAccess(progress)}</p>
          <p><strong>Last Milestone:</strong> {progress?.last_milestone || "No cloud milestone yet"}</p>

          <button className="actionButton" onClick={startFoundationRecord} disabled={loading}>
            {loading ? "Working..." : "Begin / Continue Foundation"}
          </button>

          <button onClick={() => loadMemberData(session.user.id)} disabled={loading}>
            Reload Member Data
          </button>

          <button onClick={handleLogout} disabled={loading}>
            Log Out
          </button>
        </div>
      ) : (
        <form className="card greenPanel" onSubmit={handleAuth}>
          <div className="cardTitle">
            {mode === "signup" ? "Create RVU Member Account" : "RVU Member Login"}
          </div>

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="EMAIL"
            type="email"
            autoComplete="email"
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="PASSWORD"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />

          <button className="actionButton" type="submit" disabled={loading}>
            {loading ? "Working..." : mode === "signup" ? "Create Account" : "Log In"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setMessage("Gateway mode changed.");
            }}
          >
            {mode === "signup" ? "Already have an account? Log In" : "Need an account? Sign Up"}
          </button>
        </form>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Gateway Protection Rule</div>
        <p>
          This gateway uses Supabase Auth and member-owned database records.
          Passwords, secret keys, payment keys, final archive answers, protected
          PDF paths, and creator-only blueprint logic must never be placed in
          frontend files.
        </p>
      </div>

      <p>{message}</p>
    </section>
  );
}
