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
          "radial-gradient(circle at 20% 20%, #7d00ff 0%, transparent 30%)," +
          "radial-gradient(circle at 80% 30%, #00d4ff 0%, transparent 30%)," +
          "radial-gradient(circle at 50% 80%, #ff0088 0%, transparent 35%)," +
          "#020208",
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
