import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MemberAuthPanel() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("Member account system ready.");
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

  async function handleAuth(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("Processing member access...");

    try {
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

        if (error) {
          setMessage(error.message);
        } else {
          setMessage(
            "Signup submitted. Check your email if Supabase asks for confirmation."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage("Member login successful.");
          setPassword("");
        }
      }
    } catch {
      setMessage("Member account request failed. Try again.");
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
      setMessage("Member logged out.");
    }

    setLoading(false);
  }

  return (
    <section className="card greenPanel" id="member-auth-panel">
      <div className="cardTitle">Checkpoint 32 Member Identity System</div>

      <h2>MEMBER ACCOUNT ACCESS</h2>

      <p>
        This is the first real account layer for the Ricochet Void Universe.
        It connects member signup, login, logout, and session detection through
        Supabase Auth.
      </p>

      {session ? (
        <div className="card greenPanel">
          <div className="cardTitle">Member Session Active</div>

          <p>
            <strong>Status:</strong> Logged In
          </p>

          <p className="safeText">
            <strong>Email:</strong> {session.user?.email || "Unknown member"}
          </p>

          <p className="safeText">
            <strong>User ID:</strong> {session.user?.id || "Unknown ID"}
          </p>

          <button className="actionButton" onClick={handleLogout} disabled={loading}>
            {loading ? "Working..." : "Log Out"}
          </button>
        </div>
      ) : (
        <form className="card greenPanel" onSubmit={handleAuth}>
          <div className="cardTitle">
            {mode === "signup" ? "Create Member Account" : "Member Login"}
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
            {loading
              ? "Working..."
              : mode === "signup"
              ? "Create Account"
              : "Log In"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setMessage("Member account mode changed.");
            }}
          >
            {mode === "signup"
              ? "Already have an account? Log In"
              : "Need an account? Sign Up"}
          </button>
        </form>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Account Security Notice</div>
        <p>
          Passwords are handled by Supabase Auth. Do not place passwords,
          secret keys, creator codes, payment keys, or protected archive answers
          inside frontend files.
        </p>
      </div>

      <p>{message}</p>
    </section>
  );
}
