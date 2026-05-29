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

          .signalParticles {
            position: fixed;
            inset: 0;
            background-image:
              radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px),
              radial-gradient(rgba(0,212,255,0.95) 2px, transparent 2px),
              radial-gradient(rgba(255,0,136,0.75) 1.5px, transparent 1.5px);
            background-size: 180px 180px, 260px 260px, 340px 340px;
            animation: signalFloat 18s linear infinite;
            opacity: 0.5;
            z-index: 4;
            pointer-events: none;
          }

          .scanLines {
            position: fixed;
            inset: 0;
            background:
              repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.035) 0px,
                rgba(255,255,255,0.035) 1px,
                transparent 1px,
                transparent 6px
              );
            mix-blend-mode: screen;
            opacity: 0.35;
            z-index: 6;
            pointer-events: none;
            animation: scanMove 8s linear infinite;
          }

          .voidSymbol {
            position: fixed;
            width: 460px;
            height: 460px;
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.08);
            box-shadow:
              0 0 60px rgba(125,0,255,0.25),
              inset 0 0 80px rgba(0,212,255,0.12);
            z-index: 5;
            opacity: 0.55;
            animation: symbolRotate 28s linear infinite;
            pointer-events: none;
          }

          .voidSymbol::before,
          .voidSymbol::after {
            content: "";
            position: absolute;
            inset: 70px;
            border-radius: 50%;
            border: 1px solid rgba(0,212,255,0.16);
          }

          .voidSymbol::after {
            inset: 135px;
            border-color: rgba(255,0,136,0.18);
            box-shadow: 0 0 35px rgba(255,0,136,0.2);
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

          .heroPanel {
            position: relative;
            z-index: 10;
            max-width: 1000px;
            animation: heroReveal 1.8s ease forwards;
          }

          .signalTag {
            display: inline-block;
            margin-bottom: 14px;
            padding: 6px 14px;
            border: 1px solid rgba(0,212,255,0.35);
            border-radius: 999px;
            background: rgba(255,255,255,0.07);
            color: rgba(255,255,255,0.85);
            font-size: 12px;
            letter-spacing: 3px;
            text-transform: uppercase;
            box-shadow: 0 0 18px rgba(0,212,255,0.2);
          }

          h1 {
            margin: 0;
            font-size: clamp(48px, 8vw, 92px);
            letter-spacing: 3px;
            line-height: 0.95;
            text-shadow:
              0 0 12px rgba(125,0,255,0.9),
              0 0 28px rgba(0,212,255,0.7),
              0 0 50px rgba(255,0,136,0.5);
          }

          .subtitle {
            max-width: 760px;
            margin: 22px auto 0;
            font-size: 20px;
            color: rgba(255,255,255,0.86);
          }

          .terminal {
            margin: 28px auto 0;
            max-width: 760px;
            text-align: left;
            border: 1px solid rgba(0,212,255,0.28);
            border-radius: 18px;
            background:
              linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.25));
            box-shadow:
              0 0 25px rgba(0,212,255,0.18),
              inset 0 0 25px rgba(125,0,255,0.12);
            overflow: hidden;
            backdrop-filter: blur(10px);
          }

          .terminalTop {
            display: flex;
            gap: 7px;
            padding: 12px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(0,212,255,0.8);
            box-shadow: 0 0 10px rgba(0,212,255,0.8);
          }

          .dot:nth-child(2) {
            background: rgba(255,0,136,0.8);
            box-shadow: 0 0 10px rgba(255,0,136,0.8);
          }

          .dot:nth-child(3) {
            background: rgba(125,0,255,0.8);
            box-shadow: 0 0 10px rgba(125,0,255,0.8);
          }

          .terminalBody {
            padding: 16px;
            font-size: 13px;
            line-height: 1.7;
            letter-spacing: 1px;
            color: rgba(255,255,255,0.76);
          }

          .terminalBody strong {
            color: rgba(0,212,255,0.95);
            font-weight: 500;
          }

          .terminalBody em {
            color: rgba(255,0,136,0.9);
            font-style: normal;
          }

          .menu {
            display: grid;
            grid-template-columns: repeat(4, minmax(130px, 1fr));
            gap: 14px;
            margin-top: 30px;
          }

          .button {
            color: white;
            text-decoration: none;
            border: 1px solid rgba(255,255,255,0.35);
            padding: 16px 18px;
            border-radius: 18px;
            background:
              linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06));
            box-shadow:
              0 0 18px rgba(0,212,255,0.25),
              inset 0 0 18px rgba(255,255,255,0.05);
            transition: 0.3s ease;
            backdrop-filter: blur(8px);
          }

          .button span {
            display: block;
            margin-top: 6px;
            font-size: 11px;
            color: rgba(255,255,255,0.6);
            letter-spacing: 1.5px;
          }

          .button:hover {
            transform: translateY(-6px) scale(1.04);
            background: rgba(255,255,255,0.18);
            box-shadow:
              0 0 20px rgba(0,212,255,0.6),
              0 0 40px rgba(125,0,255,0.45);
          }

          .tierStrip {
            margin-top: 22px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          }

          .tier {
            padding: 8px 12px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.06);
            font-size: 12px;
            color: rgba(255,255,255,0.72);
          }

          .hiddenSignal {
            margin-top: 24px;
            font-size: 11px;
            letter-spacing: 4px;
            color: rgba(255,255,255,0.22);
            text-transform: uppercase;
          }

          @keyframes voidShift {
            from { background-position: 0% 0%; }
            to { background-position: 100% 100%; }
          }

          @keyframes starDrift {
            from { background-position: 0 0, 0 0, 0 0; }
            to { background-position: 300px 500px, -250px 400px, 200px -300px; }
          }

          @keyframes signalFloat {
            from { background-position: 0 0, 0 0, 0 0; }
            to { background-position: 220px -300px, -260px 240px, 340px -180px; }
          }

          @keyframes scanMove {
            from { background-position: 0 0; }
            to { background-position: 0 120px; }
          }

          @keyframes symbolRotate {
            from { rotate: 0deg; transform: scale(1); }
            to { rotate: 360deg; transform: scale(1.04); }
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

          @keyframes heroReveal {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.96);
              filter: blur(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @media (max-width: 800px) {
            .menu {
              grid-template-columns: 1fr;
            }

            h1 {
              font-size: 48px;
            }

            .terminalBody {
              font-size: 12px;
            }
          }
        `}
      </style>

      <div className="stars"></div>
      <div className="signalParticles"></div>
      <div className="scanLines"></div>
      <div className="voidSymbol"></div>
      <div className="blackHole blackHoleOne"></div>
      <div className="blackHole blackHoleTwo"></div>
      <div className="portal portalOne"></div>
      <div className="portal portalTwo"></div>
      <div className="voidDrip dripOne"></div>
      <div className="voidDrip dripTwo"></div>
      <div className="voidDrip dripThree"></div>

      <section className="heroPanel">
        <div className="signalTag">Archive Signal Detected</div>

        <h1>Ricochet Void Universe</h1>

        <p className="subtitle">
          Signal grows where noise falls. Enter the foundation, follow the
          archives, and unlock access through progression.
        </p>

        <div className="terminal">
          <div className="terminalTop">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

          <div className="terminalBody">
            <div><strong>STATUS:</strong> Foundation Gate Online</div>
            <div><strong>ENTRY ACCESS:</strong> $0 after archive completion</div>
            <div><strong>SIGNAL LAW:</strong> <em>Signal grows where noise falls.</em></div>
            <div><strong>PATH:</strong> Decode → Submit → Unlock → Ascend</div>
          </div>
        </div>

        <div className="menu">
          <a href="#foundation" className="button">
            Begin Foundation
            <span>Start Path</span>
          </a>

          <a href="#archives" className="button">
            Foundation Archives
            <span>Decode</span>
          </a>

          <a href="#portal" className="button">
            Access Portal
            <span>Submit Signal</span>
          </a>

          <a href="#futuregear" className="button">
            Future Gear
            <span>Coming Soon</span>
          </a>
        </div>

        <div className="tierStrip">
          <div className="tier">Signal Access — $9.99</div>
          <div className="tier">Sub-Creator — $24.99</div>
          <div className="tier">Architect Circle — $49.99</div>
          <div className="tier">Universe Architect — $99.99</div>
        </div>

        <div className="hiddenSignal">silence is not empty</div>
      </section>
    </main>
  );
}
