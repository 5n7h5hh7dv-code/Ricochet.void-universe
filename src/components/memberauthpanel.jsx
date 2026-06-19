import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const defaultProfile = {
  void_name: "",
  signal_name: "",
  member_intent: "",
  public_title: "Path Initiate",
  profile_complete: false,
  last_profile_update: "Checkpoint 34 profile system ready",
};

export default function MemberProfilePanel() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [message, setMessage] = useState("Member profile system ready.");
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
      loadProfile(session.user.id);
    } else {
      setProfile(defaultProfile);
    }
  }, [session]);

  async function loadProfile(userId) {
    setLoading(true);
    setMessage("Loading member profile...");

    const { data, error } = await supabase
      .from("member_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      setMessage("Profile table not ready yet. Run the Checkpoint 34 SQL file in Supabase.");
      setLoading(false);
      return;
    }

    if (data) {
      setProfile({
        void_name: data.void_name || "",
        signal_name: data.signal_name || "",
        member_intent: data.member_intent || "",
        public_title: data.public_title || "Path Initiate",
        profile_complete: data.profile_complete || false,
        last_profile_update: data.last_profile_update || "Profile loaded from Supabase",
      });
      setMessage("Member profile loaded from Supabase.");
    } else {
      setProfile(defaultProfile);
      setMessage("No profile saved yet. Save once to create your member profile.");
    }

    setLoading(false);
  }

  function updateProfile(key, value) {
    setProfile((current) => ({
      ...current,
      [key]: value,
      profile_complete:
        key === "void_name"
          ? Boolean(value.trim())
          : current.profile_complete,
    }));
  }

  async function saveProfile() {
    if (!session?.user?.id) {
      setMessage("Log in before saving your member profile.");
      return;
    }

    setLoading(true);
    setMessage("Saving member profile...");

    const complete = Boolean(profile.void_name.trim());

    const nextProfile = {
      user_id: session.user.id,
      email: session.user.email || "",
      void_name: profile.void_name.trim(),
      signal_name: profile.signal_name.trim(),
      member_intent: profile.member_intent.trim(),
      public_title: profile.public_title.trim() || "Path Initiate",
      profile_complete: complete,
      last_profile_update: complete
        ? "Member identity saved to Supabase"
        : "Profile saved without Void Name",
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("member_profiles").upsert(nextProfile, {
      onConflict: "user_id",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setProfile({
        void_name: nextProfile.void_name,
        signal_name: nextProfile.signal_name,
        member_intent: nextProfile.member_intent,
        public_title: nextProfile.public_title,
        profile_complete: nextProfile.profile_complete,
        last_profile_update: nextProfile.last_profile_update,
      });
      setMessage("Member profile saved to Supabase.");
    }

    setLoading(false);
  }

  async function resetProfile() {
    const reset = {
      ...defaultProfile,
      last_profile_update: "Member profile reset locally",
    };

    setProfile(reset);

    if (!session?.user?.id) {
      setMessage("Profile reset locally. Log in to save changes to Supabase.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("member_profiles").upsert(
      {
        user_id: session.user.id,
        email: session.user.email || "",
        void_name: "",
        signal_name: "",
        member_intent: "",
        public_title: "Path Initiate",
        profile_complete: false,
        last_profile_update: "Member profile reset in Supabase",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Member profile reset in Supabase.");
    }

    setLoading(false);
  }

  return (
    <section className="card greenPanel" id="member-profile-panel">
      <div className="cardTitle">Checkpoint 34 Persistent Member Profile</div>

      <h2>CLOUD MEMBER IDENTITY</h2>

      <p>
        This system saves a logged-in member's Void Name, Signal Name, public
        title, and intent to Supabase so the RVU can remember who they are when
        they return.
      </p>

      {!session ? (
        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Login Required</div>
          <p>Log in through Member Account Access before saving a cloud profile.</p>
        </div>
      ) : (
        <>
          <div className="card greenPanel">
            <div className="cardTitle">Member Identity Form</div>

            <input
              value={profile.void_name}
              onChange={(event) => updateProfile("void_name", event.target.value)}
              placeholder="VOID NAME"
            />

            <input
              value={profile.signal_name}
              onChange={(event) => updateProfile("signal_name", event.target.value)}
              placeholder="SIGNAL NAME"
            />

            <input
              value={profile.public_title}
              onChange={(event) => updateProfile("public_title", event.target.value)}
              placeholder="PUBLIC TITLE"
            />

            <textarea
              className="reflectionText"
              value={profile.member_intent}
              onChange={(event) => updateProfile("member_intent", event.target.value)}
              placeholder="What are you building, becoming, or discovering inside RVU?"
            />

            <button className="actionButton" onClick={saveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Cloud Profile"}
            </button>

            <button className="actionButton" onClick={resetProfile} disabled={loading}>
              Reset Cloud Profile
            </button>
          </div>

          <div className="card greenPanel">
            <div className="cardTitle">Cloud Profile Snapshot</div>

            <p><strong>Email:</strong> {session.user?.email || "Unknown"}</p>
            <p><strong>Void Name:</strong> {profile.void_name || "Not chosen yet"}</p>
            <p><strong>Signal Name:</strong> {profile.signal_name || "Not chosen yet"}</p>
            <p><strong>Public Title:</strong> {profile.public_title || "Path Initiate"}</p>
            <p><strong>Profile Complete:</strong> {profile.profile_complete ? "Yes" : "No"}</p>
            <p><strong>Last Update:</strong> {profile.last_profile_update}</p>
          </div>
        </>
      )}

      <div className="card redPanel">
        <div className="cardTitle restrictedTitle">Checkpoint 34 Safety Rule</div>
        <p>
          This profile stores member identity details only. Do not store secret
          keys, passwords, payment data, final archive answers, private PDF
          paths, or creator-only blueprint logic here.
        </p>
      </div>

      <p>{message}</p>
    </section>
  );
}
