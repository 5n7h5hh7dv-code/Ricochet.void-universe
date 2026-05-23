export default function Home() {
  const archives = [
    "The Mirror Code",
    "Silence Architecture",
    "Ricochet Void Foundation",
    "Archive II: Signal Where Noise Falls",
    "The Architect Path",
  ];

  const tiers = [
    ["Entry Access", "$0", "Unlocked after foundation completion"],
    ["Signal Access", "$9.99/mo", "Core chamber access"],
    ["Sub-Creator Access", "$24.99/mo", "Creation tools and guided paths"],
    ["Architect Circle", "$49.99/mo", "Deeper creator rooms and private drops"],
    ["Universe Architect", "$99.99/mo", "Highest public access tier"],
  ];

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.kicker}>1RicochetVoidUniverse.com</p>
        <h1 style={styles.title}>Ricochet Void Universe</h1>
        <p style={styles.subtitle}>
          A cinematic locked-access universe built through self-development,
          mystery, progression, hidden messages, and intelligent collaboration.
        </p>

        <div style={styles.heroButtons}>
          <a href="#foundation" style={styles.primaryButton}>Begin Foundation</a>
          <a href="#access" style={styles.secondaryButton}>View Access Tiers</a>
        </div>
      </section>

      <section id="foundation" style={styles.section}>
        <p style={styles.kicker}>Foundation Archives</p>
        <h2 style={styles.heading}>The door opens only through progression.</h2>
        <p style={styles.text}>
          These archives are not numbered publicly. Their order is hinted through
          signal, silence, and attention. Users who complete the foundation path
          can submit the hidden answers below to request Entry Access.
        </p>

        <div style={styles.grid}>
          {archives.map((name) => (
            <article key={name} style={styles.card}>
              <h3 style={styles.cardTitle}>{name}</h3>
              <p style={styles.cardText}>
                A foundation piece designed to improve daily life while revealing
                deeper layers of the Ricochet Void Universe.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <p style={styles.kicker}>Core Law</p>
        <h2 style={styles.heading}>Signal grows where noise falls.</h2>
        <p style={styles.text}>
          The public sees the mystery. The creator system holds the blueprint.
          The Architect identity remains separated from the public path until
          access is earned.
        </p>
      </section>

      <section id="submit" style={styles.section}>
        <p style={styles.kicker}>Entry Submission</p>
        <h2 style={styles.heading}>Submit the foundation answers.</h2>
        <form style={styles.form}>
          <input style={styles.input} placeholder="Your name" />
          <input style={styles.input} placeholder="Email address" />
          <textarea
            style={styles.textarea}
            placeholder="Enter completed hidden-message answers in the correct progression order..."
          />
          <button style={styles.primaryButton} type="button">
            Submit for Entry Review
          </button>
        </form>
        <p style={styles.smallText}>
          Connect this form later to Formspree, Supabase, Firebase, or your own
          backend when you are ready to collect real submissions.
        </p>
      </section>

      <section id="access" style={styles.section}>
        <p style={styles.kicker}>Access Tiers</p>
        <h2 style={styles.heading}>Choose the level after the foundation.</h2>
        <div style={styles.grid}>
          {tiers.map(([name, price, desc]) => (
            <article key={name} style={styles.card}>
              <h3 style={styles.cardTitle}>{name}</h3>
              <p style={styles.price}>{price}</p>
              <p style={styles.cardText}>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <p style={styles.kicker}>Coming Soon</p>
        <h2 style={styles.heading}>Future Gear</h2>
        <p style={styles.text}>
          Physical and digital gear tied to chambers, signals, creator identity,
          and the expanding universe marketplace.
        </p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #24224a 0%, #080812 42%, #030306 100%)",
    color: "#f5f3ff",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    padding: "48px 20px",
  },
  hero: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "80px 0 70px",
    textAlign: "center",
  },
  kicker: {
    color: "#a78bfa",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    fontSize: 13,
    fontWeight: 700,
  },
  title: {
    fontSize: "clamp(44px, 9vw, 96px)",
    lineHeight: 0.92,
    margin: "18px 0",
    textShadow: "0 0 40px rgba(167,139,250,.45)",
  },
  subtitle: {
    maxWidth: 760,
    margin: "0 auto",
    fontSize: 20,
    lineHeight: 1.6,
    color: "#d7d2ff",
  },
  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    flexWrap: "wrap",
    marginTop: 34,
  },
  primaryButton: {
    border: "0",
    borderRadius: 999,
    padding: "14px 22px",
    background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
    color: "#030306",
    fontWeight: 800,
    textDecoration: "none",
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid rgba(255,255,255,.22)",
    borderRadius: 999,
    padding: "14px 22px",
    color: "#f5f3ff",
    textDecoration: "none",
    background: "rgba(255,255,255,.06)",
    fontWeight: 700,
  },
  section: {
    maxWidth: 1100,
    margin: "0 auto 38px",
    padding: "36px",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 28,
    background: "rgba(255,255,255,.055)",
    boxShadow: "0 24px 80px rgba(0,0,0,.28)",
  },
  heading: {
    fontSize: "clamp(28px, 5vw, 52px)",
    margin: "10px 0 16px",
  },
  text: {
    color: "#d7d2ff",
    fontSize: 18,
    lineHeight: 1.7,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 24,
  },
  card: {
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 22,
    padding: 22,
    background: "linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.03))",
  },
  cardTitle: {
    fontSize: 22,
    margin: "0 0 10px",
  },
  cardText: {
    color: "#c9c2ff",
    lineHeight: 1.6,
  },
  price: {
    fontSize: 30,
    fontWeight: 900,
    margin: "8px 0",
    color: "#67e8f9",
  },
  form: {
    display: "grid",
    gap: 14,
    marginTop: 20,
  },
  input: {
    width: "100%",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 14,
    padding: 16,
    background: "rgba(0,0,0,.28)",
    color: "#fff",
    fontSize: 16,
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 14,
    padding: 16,
    background: "rgba(0,0,0,.28)",
    color: "#fff",
    fontSize: 16,
  },
  smallText: {
    color: "#aaa3d8",
    fontSize: 14,
    marginTop: 14,
  },
};
