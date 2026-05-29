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
        position: "relative",
        background:
          "radial-gradient(circle at 10% 15%, rgba(125,0,255,1) 0%, transparent 28%)," +
          "radial-gradient(circle at 90% 20%, rgba(0,212,255,0.95) 0%, transparent 28%)," +
          "radial-gradient(circle at 50% 85%, rgba(255,0,136,0.9) 0%, transparent 34%)," +
          "linear-gradient(180deg, #020208 0%, #070018 45%, #020208 100%)",
        backgroundSize: "140% 140%",
        animation: "voidShift 12s ease-in-out infinite alternate",
      }}
    >
      <style>
        {`
          .stars {
            position: fixed;
            inset: 0;
            background-image:
              radial-gradient(white 1px, transparent 1px),
              radial-gradient(rgba(0,212,255,0.9) 1px, transparent 1px),
              radial-gradient(rgba(255,0,136,0.8) 1px, transparent 1px);
            background-size: 90px 90px, 140px 140px, 220px 220px;
            animation: starDrift 30s linear infinite;
            opacity: 0.55;
          }

          .blackHole {
            position: fixed;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background:
              radial-gradient(circle, black 0 32%, rgba(0,0,0,0.9) 36%, transparent 58%),
              conic-gradient(from 0deg, #7d00ff, #00d4ff, #ff0088, #7d00ff);
            box-shadow:
              0 0 35px rgba(0,212,255,0.55),
              0 0 75px rgba(125,0,255,0.5);
            animation: blackHoleSpin 12s linear infinite;
            opacity: 0.75;
          }

          .blackHoleOne {
            top: 8%;
            left: 7%;
          }

          .blackHoleTwo {
            bottom: 8%;
            right: 7%;
            transform: scale(0.65);
          }

          .portal {
            position: fixed;
            width: 170px;
            height: 170px;
            border-radius: 50%;
            border: 2px solid rgba(0,212,255,0.6);
            background:
              radial-gradient(circle, transparent 35%, rgba(0,212,255,0.25), transparent 70%),
              conic-gradient(from 180deg, transparent, rgba(255,0,136,0.6), transparent, rgba(125,0,255,0.7), transparent);
            box-shadow:
              0 0 25px rgba(0,212,255,0.55),
              inset 0 0 30px rgba(255,0,136,0.4);
            animation: portalPulse 6s ease-in-out infinite alternate;
            opacity: 0.8;
          }

          .portalOne {
            top: 17%;
            right: 14%;
          }

          .portalTwo {
            bottom: 17%;
            left: 13%;
            transform: scale(0.75);
          }

          .voidDrip {
            position: fixed;
            width: 8px;
            height: 130px;
            border-radius: 999px;
            background: linear-gradient(to bottom, transparent, rgba(0,212,255,0.95), rgba(255,0,136,0.2), transparent);
            filter: blur(1px);
            animation: dripFall 5s ease-in-out infinite;
          }

          .dripOne {
            top: 8%;
            left: 35%;
          }

          .dripTwo {
            top: 20%;
            right: 28%;
            animation-delay: 1.2s;
          }

          .dripThree {
            top: 4%;
            right: 48%;
            animation-delay: 2.4s;
          }

          section {
            position: relative;
            z-index: 10;
          }

          h1 {
            font-size: 56px;
            letter-spacing: 2px;
            text-shadow:
              0 0 12px rgba(125,0,255,0.9),
              0 0 28px rgba(0,212,255,0.7),
              0 0 50px rgba(255,0,136,0.5);
          }

          p {
            font-size: 20px;
          }

          .menu {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin-top: 30px;
          }

          .button {
            color: white;
            text-decoration: none;
            border: 1px solid rgba(255,255,255,0.35);
            padding: 12px 20px;
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
            box-shadow: 0 0 18px rgba(0,212,255,0.25);
          }

          @keyframes voidShift {
            from { background-position: 0% 0%; }
            to { background-position: 100% 100%; }
          }

          @keyframes starDrift {
            from { background-position: 0 0, 0 0, 0 0; }
            to { background-position: 300px 500px, -250px 400px, 200px -300px; }
          }

          @keyframes blackHoleSpin {
            from { rotate: 0deg; }
            to { rotate: 360deg; }
          }

          @keyframes portalPulse {
            from { scale: 1; rotate: 0deg; opacity: 0.55; }
            to { scale: 1.08; rotate: 20deg; opacity: 0.9; }
          }

          @keyframes dripFall {
            0% { transform: translateY(-40px); opacity: 0; }
            50% { opacity: 0.9; }
            100% { transform: translateY(170px); opacity: 0; }
          }
        `}
      </style>

      <div className="stars"></div>
      <div className="blackHole blackHoleOne"></div>
      <div className="blackHole blackHoleTwo"></div>
      <div className="portal portalOne"></div>
      <div className="portal portalTwo"></div>
      <div className="voidDrip dripOne"></div>
      <div className="voidDrip dripTwo"></div>
      <div className="voidDrip dripThree"></div>

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
