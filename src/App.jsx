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
        overflow: "hidden",
        background:
          "radial-gradient(circle at 10% 15%, rgba(125,0,255,1) 0%, transparent 28%)," +
          "radial-gradient(circle at 90% 20%, rgba(0,212,255,0.95) 0%, transparent 28%)," +
          "radial-gradient(circle at 50% 85%, rgba(255,0,136,0.9) 0%, transparent 34%)," +
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 55%)," +
          "linear-gradient(180deg, #020208 0%, #070018 45%, #020208 100%)",
        backgroundSize: "140% 140%",
        animation: "voidShift 12s ease-in-out infinite alternate",
      }}
    >
      <style>
        {`
          @keyframes voidShift {
            from { background-position: 0% 0%; }
            to { background-position: 100% 100%; }
          }

          h1 {
            text-shadow:
              0 0 12px rgba(125,0,255,0.9),
              0 0 28px rgba(0,212,255,0.7),
              0 0 50px rgba(255,0,136,0.5);
          }

          .button {
            box-shadow: 0 0 18px rgba(0,212,255,0.25);
          }
        `}
      </style>

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
