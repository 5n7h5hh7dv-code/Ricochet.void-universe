export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        background:
  "radial-gradient(circle at 15% 20%, rgba(125,0,255,0.9) 0%, transparent 25%)," +
  "radial-gradient(circle at 85% 25%, rgba(0,212,255,0.8) 0%, transparent 25%)," +
  "radial-gradient(circle at 50% 85%, rgba(255,0,136,0.7) 0%, transparent 30%)," +
  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)," +
  "linear-gradient(180deg, #020208 0%, #070018 40%, #020208 100%)",
backgroundSize: "100% 100%",
backgroundAttachment: "fixed",
      }}
    >
      <section>
        <h1>Ricochet Void Universe</h1>

        <p>
          Signal grows where noise falls. Enter the foundation, follow the
          archives, and unlock access through progression.
        </p>

        <div className="menu">
          <a href="#foundation" className="button">Begin the Foundation</a>
          <a href="#archives" className="button">Foundation Archives</a>
          <a href="#portal" className="button">Access Portal</a>
          <a href="#futuregear" className="button">Future Gear</a>
        </div>
      </section>
    </main>
  );
}
