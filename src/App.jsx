export default function App() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Ricochet Void Universe</h1>

        <p>
          Signal grows where noise falls. Progress through the Foundation
          Archives and unlock the universe through achievement.
        </p>

        <div className="menu">
          <a href="#foundation" className="button">
            Begin the Foundation
          </a>

          <a href="#archives" className="button">
            Foundation Archives
          </a>

          <a href="#portal" className="button">
            Access Portal
          </a>

          <a href="#futuregear" className="button">
            Future Gear
          </a>
        </div>
      </section>

      <section id="foundation">
        <h2>Begin the Foundation</h2>
        <p>
          Start the journey. Complete the archives, uncover hidden messages,
          and earn Entry Access.
        </p>
      </section>

      <section id="archives">
        <h2>Foundation Archives</h2>
        <p>
          Archive links will be placed here as they are released.
        </p>
      </section>

      <section id="portal">
        <h2>Access Portal</h2>
        <p>
          Submit your answers here to unlock Entry Access.
        </p>
      </section>

      <section id="futuregear">
        <h2>Future Gear</h2>
        <p>
          Coming soon.
        </p>
      </section>
    </main>
  );
}
