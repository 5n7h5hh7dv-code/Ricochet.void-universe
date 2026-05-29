export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        background:
          "radial-gradient(circle at 15% 20%, #7d00ff 0%, transparent 30%)," +
          "radial-gradient(circle at 85% 25%, #00d4ff 0%, transparent 30%)," +
          "radial-gradient(circle at 50% 85%, #ff0088 0%, transparent 35%)," +
          "linear-gradient(180deg, #020208 0%, #070018 45%, #020208 100%)",
      }}
    >
      <section style={{ maxWidth: "900px" }}>
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
