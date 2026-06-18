import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function SupabaseConnectionStatus() {
  const [status, setStatus] = useState("Checking...");
  const [project, setProject] = useState("Unknown");

  useEffect(() => {
    async function checkConnection() {
      try {
        const url = import.meta.env.VITE_SUPABASE_URL || "";
        const projectName = url.replace("https://", "").replace(".supabase.co", "");

        setProject(projectName || "Unknown");

        const { error } = await supabase.auth.getSession();

        if (error) {
          setStatus("Connection Error");
        } else {
          setStatus("Connected");
        }
      } catch (err) {
        setStatus("Connection Error");
      }
    }

    checkConnection();
  }, []);

  return (
    <section className="card greenPanel">
      <div className="cardTitle">Supabase Connection Status</div>

      <h2>BACKEND CONNECTION CHECK</h2>

      <p><strong>Status:</strong> {status}</p>
      <p><strong>Project:</strong> {project}</p>

      <p>
        This component verifies that the RVU frontend can communicate with
        Supabase and that environment variables are configured correctly.
      </p>
    </section>
  );
}
