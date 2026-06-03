import { useEffect, useMemo, useState } from "react";

const CREATOR_PREVIEW_CODE = "CREATOR-PREVIEW";

const foundationPath = [
  { key: "mirror", title: "The Coded Mirror", file: "/archives/the-coded-mirror-complete.pdf", signal: "MIRROR", signalTitle: "Reflection Signal", difficulty: "Clear Hint", hint: "Every signal begins with a reflection.", success: "Reflection recognized. The first path has opened." },
  { key: "void", title: "Void Protocol 7", file: "/archives/void-protocol-7-complete.pdf", signal: "SILENCE", signalTitle: "Silence Signal", difficulty: "Light Hidden Clue", hint: "Where noise falls, silence begins to speak.", success: "Noise reduced. A deeper signal is now active." },
  { key: "wealth", title: "Neural Wealth Mapping", file: "/archives/neural-wealth-mapping-complete.pdf", signal: "VOID", signalTitle: "Void Signal", difficulty: "Connect Ideas", hint: "The void does not answer until you stop filling it.", success: "Pattern detected. The void is responding." },
  { key: "dopamine", title: "The Dopamine Collapse Manual", file: "/archives/dopamine-collapse-manual-complete.pdf", signal: "ASCENSION", signalTitle: "Ascension Signal", difficulty: "Notice Pattern", hint: "The only direction after the void is upward.", success: "Path integrity increasing." },
  { key: "ascension", title: "Project Ascension", file: "/archives/project-ascension-complete.pdf", signal: "TRUTH", signalTitle: "Truth Signal", difficulty: "Compare Archives", hint: "The next gate does not open without honesty.", success: "Truth standard confirmed." },
  { key: "glitch", title: "The Human Glitch", file: "/archives/the-human-glitch-complete.pdf", signal: "ACCOUNTABILITY", signalTitle: "Accountability Signal", difficulty: "Self-Reflection", hint: "Truth without ownership becomes another excuse.", success: "Responsibility recognized." },
  { key: "warfare", title: "Psychological Warfare Against Yourself", file: "/archives/psychological-warfare-against-yourself-complete.pdf", signal: "ARCHITECT", signalTitle: "Architect Signal", difficulty: "Full Path Awareness", hint: "Only a builder can cross into the Architect path.", success: "Creator path detected." },
  { key: "empire", title: "The Internal Empire Blueprint", file: "/archives/the-internal-empire-blueprint-complete.pdf", signal: "SIGNAL GROWS WHERE NOISE FALLS", signalTitle: "Foundation Completion Signal", difficulty: "Complete Chain", hint: "The final signal is the central law.", success: "Foundation complete. Reflection Chamber unlocked." },
];

const publicArchiveDisplay = [
  "Neural Wealth Mapping",
  "Psychological Warfare Against Yourself",
  "The Coded Mirror",
  "The Human Glitch",
  "The Dopamine Collapse Manual",
  "The Internal Empire Blueprint",
  "Void Protocol 7",
  "Project Ascension",
];

const artifacts = [
  { name: "Founder’s Coin", limit: 1000, minted: 0, status: "Unreleased", code: "RVU-FC" },
  { name: "Void Artifact Alpha", limit: 500, minted: 0, status: "Restricted", code: "RVU-VA" },
  { name: "Architect Relic", limit: 100, minted: 0, status: "Creator Vault", code: "RVU-AR" },
  { name: "Signal Coin", limit: 2500, minted: 0, status: "Research Phase", code: "RVU-SC" },
  { name: "Archive Ring", limit: 777, minted: 0, status: "Design Protected", code: "RVU-RG" },
  { name: "Family Collection Token", limit: 1500, minted: 0, status: "Future Phase", code: "RVU-FAM" },
];

const accessTiers = [
  { name: "Entry Access", price: "$0", state: "Earned after Foundation completion", access: "First member chamber access after review." },
  { name: "Signal Access", price: "$9.99/mo", state: "Future paid tier", access: "Core chamber access, updates, and continued universe path." },
  { name: "Sub-Creator Access", price: "$24.99/mo", state: "Future paid tier", access: "Creation tools, guided prompts, community systems, and deeper paths." },
  { name: "Architect Circle", price: "$49.99/mo", state: "Future paid tier", access: "Private drops, deeper creator rooms, and advanced universe access." },
  { name: "Universe Architect", price: "$99.99/mo", state: "Highest future tier", access: "Highest public access tier before creator-only systems." },
];

const roadmapPhases = [
  ["Phase One", "Foundation Path", "Active Prototype", "Archive progression, hidden signals, ordered completion, and reflection chamber."],
  ["Phase Two", "Volume 4 Archive Rebuild", "Next Content Build", "Long-form public archives with no visible numbering and stronger truth standards."],
  ["Phase Three", "Member Accounts", "Prototype Started", "Sign up, login, member identity, saved progress, and private member dashboard."],
  ["Phase Four", "Cloud Progress", "Future Backend", "Progress saved securely to real accounts instead of only browser storage."],
  ["Phase Five", "Protected Content Delivery", "Future Security", "Private archive access, protected PDFs, tokenized file delivery, and backend validation."],
  ["Phase Six", "Waitlists and Collector Interest", "Preview Started", "Future item waitlists, collector records, limited drops, and interest tracking."],
  ["Phase Seven", "Pre-Order Infrastructure", "Future Commerce", "Crowdfunding and pre-order systems after terms, delivery, and payment security are ready."],
  ["Phase Eight", "Subscription Access", "Future Payment Layer", "Access tiers connected to secure checkout, account status, and content permissions."],
  ["Phase Nine", "Future Gear Protection", "Restricted", "Designs stay private until trusted review, NDA control, and release readiness."],
  ["Phase Ten", "Family Collection", "Protected Preview", "Children’s books, parent read-along rentals, illustrations, and younger learning paths."],
  ["Phase Eleven", "Creator Vault", "Restricted", "Creator-only material, private blueprints, protected access, and final approval control."],
  ["Phase Twelve", "Universe Currency Research", "Research Only", "Future currency concept remains research only. No token, sale, or crypto offering active."],
];

const familyCollection = [
  ["Children’s Story Vault", "Manuscripts Protected", "Full story text withheld until release."],
  ["Parent Read-Along Rentals", "Future Platform", "Designed for parents to rent and read with children."],
  ["Illustration Phase", "Needs Artwork", "Illustrations remain private until final approval."],
  ["Audio Story Chamber", "Future Phase", "Possible narrated versions for family listening."],
  ["Educational Adventures", "Protected Concept", "Knowledge paths adapted for younger audiences."],
  ["Family Access Path", "Coming Later", "A separate child-safe branch of the universe."],
];

const creatorChecks = [
  "Foundation progression tested",
  "Archive order hidden",
  "Archive numbers removed from public PDFs",
  "Volume 4 archives rebuilt",
  "Member login backend connected",
  "Cloud progress saving connected",
  "Protected PDF delivery connected",
  "Waitlist database connected",
  "Payment/refund terms reviewed",
  "Subscription checkout connected",
  "Creator Vault backend protected",
  "Future Gear designs withheld",
  "Family collection manuscripts protected",
  "Firewall/security headers active",
  "Anti-indexing files active",
  "Final creator approval granted",
];

function cleanInput(value) {
  return String(value || "").replace(/[<>]/g, "").trim();
}

function getCountdown(targetDate) {
  const distance = new Date(targetDate).getTime() - new Date().getTime();
  if (distance <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  return {
    days: String(Math.floor(distance / 86400000)).padStart(2, "0"),
    hours: String(Math.floor((distance / 3600000) % 24)).padStart(2, "0"),
    minutes: String(Math.floor((distance / 60000) % 60)).padStart(2, "0"),
    seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
  };
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [creatorPreview, setCreatorPreview] = useState(false);
  const [creatorPreviewInput, setCreatorPreviewInput] = useState("");
  const [creatorPreviewMessage, setCreatorPreviewMessage] = useState("Creator preview locked.");
  const [activeChamber, setActiveChamber] = useState("foundation");
  const [selectedArchiveTitle, setSelectedArchiveTitle] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [signalInput, setSignalInput] = useState("");
  const [signalStatus, setSignalStatus] = useState("idle");
  const [lastMessage, setLastMessage] = useState("Awaiting first archive signal.");
  const [pathHint, setPathHint] = useState(foundationPath[0].hint);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberVoidName, setMemberVoidName] = useState("");
  const [memberSignedIn, setMemberSignedIn] = useState(false);
  const [memberMessage, setMemberMessage] = useState("No member session active.");
  const [memberWaitlist, setMemberWaitlist] = useState([]);
  const [memberSelectedItem, setMemberSelectedItem] = useState("Founder’s Coin");
  const [progressSaved, setProgressSaved] = useState(false);
  const [vaultInput, setVaultInput] = useState("");
  const [vaultStatus, setVaultStatus] = useState("idle");
  const [voidName, setVoidName] = useState("");
  const [reflection, setReflection] = useState("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [collectorName, setCollectorName] = useState("");
  const [collectorEmail, setCollectorEmail] = useState("");
  const [selectedArtifact, setSelectedArtifact] = useState("Founder’s Coin");
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown("2026-12-31T23:59:59"));
  const [checkedItems, setCheckedItems] = useState({});

  const currentArchive = foundationPath[currentStep];
  const foundationComplete = currentStep >= foundationPath.length;
  const progressPercent = Math.round((currentStep / foundationPath.length) * 100);
  const selectedArchive = selectedArchiveTitle && foundationPath.find((archive) => archive.title === selectedArchiveTitle);
  const selectedArchiveUnlocked = selectedArchive && !foundationComplete && selectedArchive.title === currentArchive.title;
  const launchPercent = Math.round((Object.values(checkedItems).filter(Boolean).length / creatorChecks.length) * 100);

  useEffect(() => {
    setCreatorPreview(localStorage.getItem("rvuCreatorPreview") === "unlocked");
    const introTimer = setTimeout(() => setIntroComplete(true), 5200);

    try {
      const savedMember = JSON.parse(localStorage.getItem("rvuMemberPreview") || "null");
      if (savedMember) {
        const restoredStep = Math.min(Number(savedMember.currentStep || 0), foundationPath.length);
        setCurrentStep(restoredStep);
        setMemberName(savedMember.memberName || "");
        setMemberEmail(savedMember.memberEmail || "");
        setMemberVoidName(savedMember.memberVoidName || "");
        setMemberSignedIn(Boolean(savedMember.memberSignedIn));
        setMemberWaitlist(Array.isArray(savedMember.memberWaitlist) ? savedMember.memberWaitlist : []);
        setVoidName(savedMember.voidName || "");
        setReflection(savedMember.reflection || "");
        setReflectionSubmitted(Boolean(savedMember.reflectionSubmitted));
        setPathHint(restoredStep >= foundationPath.length ? "The path has found you. Reflection is now required." : foundationPath[restoredStep].hint);
        setLastMessage(restoredStep >= foundationPath.length ? "Foundation complete. Reflection Chamber unlocked." : "Saved progress restored.");
        setProgressSaved(true);
      }
    } catch {
      localStorage.removeItem("rvuMemberPreview");
    }

    try {
      setCheckedItems(JSON.parse(localStorage.getItem("rvuCreatorControl") || "{}"));
    } catch {
      localStorage.removeItem("rvuCreatorControl");
    }

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown("2026-12-31T23:59:59")), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("rvuMemberPreview", JSON.stringify({
      currentStep, memberName, memberEmail, memberVoidName, memberSignedIn,
      memberWaitlist, voidName, reflection, reflectionSubmitted, savedAt: new Date().toISOString(),
    }));
    setProgressSaved(true);
  }, [currentStep, memberName, memberEmail, memberVoidName, memberSignedIn, memberWaitlist, voidName, reflection, reflectionSubmitted]);

  useEffect(() => {
    localStorage.setItem("rvuCreatorControl", JSON.stringify(checkedItems));
  }, [checkedItems]);

  function unlockCreatorPreview() {
    if (creatorPreviewInput.trim().toUpperCase() === CREATOR_PREVIEW_CODE) {
      setCreatorPreview(true);
      localStorage.setItem("rvuCreatorPreview", "unlocked");
      setCreatorPreviewMessage("Creator preview unlocked on this device.");
      setCreatorPreviewInput("");
    } else {
      setCreatorPreview(false);
      setCreatorPreviewMessage("Preview code rejected.");
    }
  }

  function lockCreatorPreview() {
    setCreatorPreview(false);
    localStorage.removeItem("rvuCreatorPreview");
    setCreatorPreviewMessage("Creator preview locked.");
  }

  function verifyCurrentSignal() {
    if (foundationComplete) return;
    if (signalInput.trim().toUpperCase() === currentArchive.signal) {
      setSignalStatus("granted");
      setLastMessage(currentArchive.success);
      setSignalInput("");
      setTimeout(() => {
        const next = currentStep + 1;
        setCurrentStep(next);
        if (next >= foundationPath.length) {
          setActiveChamber("reflection");
          setLastMessage("Foundation complete. Reflection Chamber unlocked.");
          setPathHint("The path has found you. Reflection is now required.");
        } else {
          setSignalStatus("idle");
          setPathHint(foundationPath[next].hint);
        }
      }, 900);
    } else {
      setSignalStatus("denied");
      setLastMessage("Signal rejected. Return to the correct archive and look closer.");
    }
  }

  function verifyVaultAccess() {
    setVaultStatus(vaultInput.trim().toUpperCase() === "CREATOR-VAULT" ? "granted" : "denied");
  }

  function handleMemberSignup() {
    const email = cleanInput(memberEmail);
    if (!email) return setMemberMessage("Enter an email to create a preview member profile.");
    setMemberEmail(email);
    setMemberName(cleanInput(memberName));
    setMemberVoidName(cleanInput(memberVoidName));
    setMemberSignedIn(true);
    setMemberMessage("Member preview active. Progress now saves on this device.");
  }

  function handleMemberLogout() {
    setMemberSignedIn(false);
    setMemberMessage("Member preview signed out. Saved progress remains on this device.");
  }

  function joinWaitlist() {
    if (!memberSignedIn) return setMemberMessage("Sign in or create a member preview before joining a waitlist.");
    if (!memberWaitlist.includes(memberSelectedItem)) {
      setMemberWaitlist([...memberWaitlist, memberSelectedItem]);
      setMemberMessage(`${memberSelectedItem} added to your member waitlist preview.`);
    } else {
      setMemberMessage(`${memberSelectedItem} is already on your waitlist preview.`);
    }
  }

  function resetLocalProgress() {
    localStorage.removeItem("rvuMemberPreview");
    setCurrentStep(0);
    setSignalInput("");
    setSignalStatus("idle");
    setLastMessage("Local progress reset. Awaiting first archive signal.");
    setPathHint(foundationPath[0].hint);
    setMemberName("");
    setMemberEmail("");
    setMemberVoidName("");
    setMemberSignedIn(false);
    setMemberWaitlist([]);
    setVoidName("");
    setReflection("");
    setReflectionSubmitted(false);
    setMemberMessage("Local member preview reset.");
    setProgressSaved(false);
  }

  function toggleCreatorCheck(item) {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  }

  const navItems = ["foundation", "member", "access", "roadmap", "control", "artifacts", "commerce", "family", "vault", "reflection"];

  return (
    <main className="pageShell">
      <style>{css}</style>

      {!introComplete && (
        <div className="crashIntro">
          <div className="crashStarfield"></div>
          <div className="crashRing crashRingTwo"></div>
          <div className="crashRing"></div>
          <div className="crashCore"></div>
          <div className="crashFlash"></div>
          <div className="crashTitle">Ricochet Void Universe</div>
          <button className="introSkip" onClick={() => setIntroComplete(true)}>Skip Formation</button>
        </div>
      )}

      <div className="stars"></div><div className="signalParticles"></div><div className="scanLines"></div><div className="orbitRing"></div><div className="voidSymbol"></div><div className="voidCore"></div>

      {!creatorPreview ? (
        <section className="launchShell">
          <div className="signalTag">Ricochet Void Universe</div>
          <h1>Universe Forming</h1>
          <p className="launchStatement">Access is not open yet. The Ricochet Void Universe is still being built, protected, tested, and refined before public entry is granted.</p>
          <div className="card sectionPad greenPanel">
            <div className="cardTitle">Public Launch Shield</div>
            <p>This public shell protects unfinished systems, private creator material, hidden archive signals, unreleased designs, member infrastructure, future products, and protected progression logic until the universe is ready for release.</p>
            <div className="accessChamber">
              <input className="accessInput" value={creatorPreviewInput} onChange={(e) => setCreatorPreviewInput(e.target.value)} placeholder="CREATOR PREVIEW CODE" />
              <button className="actionButton" onClick={unlockCreatorPreview}>Unlock Preview</button>
            </div>
          </div>
          <div className={`card gateResult ${creatorPreviewMessage.includes("rejected") ? "denied" : ""}`}>{creatorPreviewMessage}</div>
          <div className="footerNotice">Ricochet Void Universe™ is a protected creator project. Unreleased archives, product concepts, hidden signals, creator materials, member systems, and future commerce systems are not publicly available during development.</div>
        </section>
      ) : (
        <section className="panel">
          <div className="signalTag">Creator Preview Mode Active</div>
          <h1>Ricochet Void Universe</h1>
          <p className="subtitle">Creator preview is unlocked on this device. Public launch remains shielded until the universe is complete and ready for release.</p>

          <div className="card sectionPad redPanel">
            <div className="cardTitle restrictedTitle">Creator Preview Control</div>
            <p>This preview gate is a front-end development shield only. For true private deployment security later, use Vercel deployment protection, real authentication, backend permissions, and private file storage.</p>
            <button className="dangerButton" onClick={lockCreatorPreview}>Lock Creator Preview</button>
          </div>

          <div className="chamberNav">
            {navItems.map((chamber) => <button key={chamber} className={`navButton ${activeChamber === chamber ? "active" : ""}`} onClick={() => setActiveChamber(chamber)}>{chamber}</button>)}
          </div>

          {activeChamber === "foundation" && <FoundationChamber foundationComplete={foundationComplete} progressPercent={progressPercent} currentStep={currentStep} pathHint={pathHint} signalInput={signalInput} setSignalInput={setSignalInput} verifyCurrentSignal={verifyCurrentSignal} signalStatus={signalStatus} lastMessage={lastMessage} selectedArchiveTitle={selectedArchiveTitle} setSelectedArchiveTitle={setSelectedArchiveTitle} selectedArchiveUnlocked={selectedArchiveUnlocked} selectedArchive={selectedArchive} setActiveChamber={setActiveChamber} />}

          {activeChamber === "member" && <MemberChamber memberSignedIn={memberSignedIn} memberName={memberName} setMemberName={setMemberName} memberVoidName={memberVoidName} setMemberVoidName={setMemberVoidName} memberEmail={memberEmail} setMemberEmail={setMemberEmail} memberMessage={memberMessage} handleMemberSignup={handleMemberSignup} handleMemberLogout={handleMemberLogout} progressPercent={progressPercent} currentStep={currentStep} foundationComplete={foundationComplete} progressSaved={progressSaved} memberSelectedItem={memberSelectedItem} setMemberSelectedItem={setMemberSelectedItem} joinWaitlist={joinWaitlist} memberWaitlist={memberWaitlist} resetLocalProgress={resetLocalProgress} />}

          {activeChamber === "access" && <AccessChamber foundationComplete={foundationComplete} />}
          {activeChamber === "roadmap" && <RoadmapChamber />}
          {activeChamber === "control" && <ControlChamber launchPercent={launchPercent} checkedItems={checkedItems} toggleCreatorCheck={toggleCreatorCheck} />}
          {activeChamber === "artifacts" && <ArtifactsChamber />}
          {activeChamber === "commerce" && <CommerceChamber countdown={countdown} collectorName={collectorName} setCollectorName={setCollectorName} collectorEmail={collectorEmail} setCollectorEmail={setCollectorEmail} selectedArtifact={selectedArtifact} setSelectedArtifact={setSelectedArtifact} setInterestSubmitted={setInterestSubmitted} interestSubmitted={interestSubmitted} />}
          {activeChamber === "family" && <FamilyChamber />}
          {activeChamber === "vault" && <VaultChamber vaultInput={vaultInput} setVaultInput={setVaultInput} verifyVaultAccess={verifyVaultAccess} vaultStatus={vaultStatus} />}
          {activeChamber === "reflection" && <ReflectionChamber voidName={voidName} setVoidName={setVoidName} reflection={reflection} setReflection={setReflection} reflectionSubmitted={reflectionSubmitted} setReflectionSubmitted={setReflectionSubmitted} />}

          <div className="card sectionPad greenPanel"><div className="cardTitle">Intellectual Property Notice</div><p>Ricochet Void Universe™, its names, archives, writings, progression systems, family stories, children’s books, visual language, creator materials, chamber concepts, artwork, design concepts, and related universe elements are protected creator materials.</p><p>© Oakley Cheuvront. All Rights Reserved.</p></div>
          <div className="footerNotice">Ricochet Void Universe™ — All writings, archives, systems, designs, artwork, visual identity, progression structures, creator concepts, product concepts, artifact registry concepts, children’s stories, manuscripts, family collection materials, and related intellectual property are owned by Oakley Cheuvront unless otherwise stated. Unauthorized reproduction, redistribution, public disclosure, commercial use, imitation, reverse engineering, or derivative use is prohibited.</div>
          <div className="hiddenSignal">creator control added — launch waits for Oak.</div>
        </section>
      )}
    </main>
  );
}

function FoundationChamber({ foundationComplete, progressPercent, currentStep, pathHint, signalInput, setSignalInput, verifyCurrentSignal, signalStatus, lastMessage, selectedArchiveTitle, setSelectedArchiveTitle, selectedArchiveUnlocked, selectedArchive, setActiveChamber }) {
  return <>
    <div className="card sectionPad greenPanel"><div className="cardTitle">The Truth Standard</div><p>The goal is not only to find hidden answers. The goal is to become truthful enough with yourself to understand what the answers reveal.</p></div>
    <div className="card sectionPad greenPanel"><div className="cardTitle">Current Path Hint</div><div className="hintText">{pathHint}</div></div>
    <div className="card progressCard"><div className="progressTop"><div>Foundation Progress</div><div>{currentStep} / {foundationPath.length} Signals Verified</div></div><div className="progressBar"><div className="progressFill" style={{ width: `${progressPercent}%` }}></div></div></div>
    <div className="card grid4">{foundationPath.map((step, index) => <div key={step.key} className={`universeCard ${index < currentStep ? "verified" : ""} ${index === currentStep && !foundationComplete ? "current" : ""} ${index > currentStep ? "locked" : ""}`}><strong>{step.signalTitle}</strong><span>Difficulty: {step.difficulty}</span><span>Status: {index < currentStep ? "Verified" : index === currentStep && !foundationComplete ? "Awaiting Signal" : "Locked"}</span></div>)}</div>
    {!foundationComplete && <div className="card accessChamber"><input className="accessInput" value={signalInput} onChange={(e) => setSignalInput(e.target.value)} placeholder="ENTER CURRENT ARCHIVE SIGNAL" /><button className="actionButton" onClick={verifyCurrentSignal}>Verify Current Signal</button></div>}
    <div className={`card gateResult ${signalStatus === "granted" ? "granted" : signalStatus === "denied" ? "denied" : ""}`}>{foundationComplete ? "Foundation complete. Reflection Chamber unlocked." : lastMessage}</div>
    {foundationComplete && <button className="actionButton" onClick={() => setActiveChamber("reflection")}>Enter Reflection Chamber</button>}
    <div className="card sectionPad greenPanel"><div className="cardTitle">Foundation Archive Access</div><p>Only archive names are visible. Archive numbers, file names, file paths, and the true progression order are hidden from the public interface. Archives must be opened and completed in the correct order.</p></div>
    <div className="card grid4">{publicArchiveDisplay.map((title) => <div className="universeCard" key={title}><strong>{title}</strong><button className="actionButton" style={{ marginTop: "12px" }} onClick={() => setSelectedArchiveTitle(title)}>Open Archive</button></div>)}</div>
    {selectedArchiveTitle && <div className={`card sectionPad ${selectedArchiveUnlocked ? "greenPanel" : "redPanel"}`}><div className={`cardTitle ${selectedArchiveUnlocked ? "" : "restrictedTitle"}`}>Archive Access</div><p><strong>{selectedArchiveTitle}</strong></p>{selectedArchiveUnlocked ? <><p>Access granted. This archive is currently aligned with the active Foundation path. Read it, find the hidden signal, then return here to verify completion.</p><a className="actionButton" href={selectedArchive.file} target="_blank" rel="noreferrer">Open PDF</a></> : <p>Access locked. This archive is not currently aligned with the active Foundation path. Return to the hint, find the correct archive, and continue in order.</p>}<button className="secondaryButton" onClick={() => setSelectedArchiveTitle(null)}>Close</button></div>}
  </>;
}

function MemberChamber(props) {
  return <>
    <div className="card dashboardHero"><div className="dashboardMain"><div className="cardTitle">Member Dashboard</div><p>This dashboard shows what the future account system will track: identity, progress, access eligibility, waitlists, order history, and security state.</p><div className={props.memberSignedIn ? "memberBadge" : "statusRed"}>{props.memberSignedIn ? "Member Preview Active" : "Not Signed In"}</div></div><div className="dashboardStat"><div className="cardTitle">Foundation Completion</div><div className="bigMetric">{props.progressPercent}%</div><span>{props.currentStep} / {foundationPath.length} signals verified</span></div></div>
    <div className="card sectionPad greenPanel"><div className="cardTitle">Create Member Preview</div><input className="reflectionInput" value={props.memberName} onChange={(e) => props.setMemberName(e.target.value)} placeholder="MEMBER NAME" /><input className="reflectionInput" value={props.memberVoidName} onChange={(e) => props.setMemberVoidName(e.target.value)} placeholder="VOID NAME / UNIVERSE NAME" /><input className="reflectionInput" value={props.memberEmail} onChange={(e) => props.setMemberEmail(e.target.value)} placeholder="EMAIL ADDRESS" /><button className="actionButton" onClick={props.handleMemberSignup}>Create / Preview Login</button>{props.memberSignedIn && <button className="secondaryButton" onClick={props.handleMemberLogout}>Sign Out Preview</button>}</div>
    <div className={`card gateResult ${props.memberSignedIn ? "granted" : "denied"}`}>{props.memberMessage}</div>
    <div className="card grid3"><div className="universeCard greenCard"><strong>Member Identity</strong><span>Name: {props.memberName || "Not entered"}</span><span>Void Name: {props.memberVoidName || "Not chosen"}</span><span>Email: {props.memberEmail || "Not entered"}</span><div className="statusGreen">Preview</div></div><div className="universeCard greenCard"><strong>Saved Progress</strong><span>{props.currentStep} / {foundationPath.length} signals verified.</span><span>{props.progressSaved ? "Saved locally on this device." : "Not saved yet."}</span><div className="statusGreen">Local Save</div></div><div className={props.foundationComplete ? "universeCard greenCard" : "universeCard redCard"}><strong>Entry Access Eligibility</strong><span>{props.foundationComplete ? "Eligible after final review layer." : "Locked until Foundation completion."}</span><span>Future: account-based access unlock.</span><div className={props.foundationComplete ? "statusGreen" : "statusRed"}>{props.foundationComplete ? "Eligible" : "Locked"}</div></div></div>
    <div className="card sectionPad greenPanel"><div className="cardTitle">Waitlist Preview</div><p>This prepares future item waitlists. Later, this will connect to real member accounts, limited drops, collector records, and order history.</p><select className="selectInput" value={props.memberSelectedItem} onChange={(e) => props.setMemberSelectedItem(e.target.value)}>{artifacts.map((artifact) => <option key={artifact.code} value={artifact.name}>{artifact.name}</option>)}</select><button className="actionButton" onClick={props.joinWaitlist}>Join Waitlist Preview</button></div>
    <div className="card grid3"><div className="universeCard greenCard"><strong>Waitlist Status</strong><span>{props.memberWaitlist.length ? props.memberWaitlist.join(", ") : "No waitlist items yet."}</span><div className="statusGreen">Saved Locally</div></div><div className="universeCard redCard"><strong>Order History</strong><span>No real orders yet. Payment systems are not active.</span><div className="statusRed">Future</div></div><div className="universeCard redCard"><strong>Security State</strong><span>Current: local preview only.</span><span>Future: real auth, private database rules, protected files.</span><div className="statusRed">Backend Needed</div></div></div>
    <div className="card sectionPad redPanel"><div className="cardTitle restrictedTitle">Local Data Control</div><p>This reset clears only the preview progress saved inside this browser. It does not affect GitHub, Vercel, PDFs, or any real database.</p><button className="dangerButton" onClick={props.resetLocalProgress}>Reset Local Preview Progress</button></div>
  </>;
}

function AccessChamber({ foundationComplete }) {
  return <><div className="card sectionPad greenPanel"><div className="cardTitle">Access Tier Chamber</div><p>This chamber displays the future Ricochet Void Universe access model. Payments are intentionally inactive until real authentication, protected content delivery, refund terms, backend storage, tax/shipping logic, and payment security are ready.</p></div><div className="card grid3">{accessTiers.map((tier) => <div className={tier.name === "Entry Access" && foundationComplete ? "universeCard greenCard" : "universeCard redCard"} key={tier.name}><strong>{tier.name}</strong><div className="tierPrice">{tier.price}</div><span>{tier.state}</span><span>{tier.access}</span><div className={tier.name === "Entry Access" && foundationComplete ? "statusGreen" : "statusRed"}>{tier.name === "Entry Access" && foundationComplete ? "Eligible" : "Locked / Future"}</div></div>)}</div><div className="card sectionPad redPanel"><div className="cardTitle restrictedTitle">Payment Security Hold</div><p>No live payment processor is connected in this prototype. This protects the project from collecting money before member accounts, delivery rules, product terms, and backend security are ready.</p></div></>;
}

function RoadmapChamber() {
  return <><div className="card sectionPad greenPanel"><div className="cardTitle">Protected Roadmap Chamber</div><p>This roadmap protects the build order without exposing hidden answers, archive order, private product designs, creator-only secrets, or unreleased blueprints.</p></div><div className="card sectionPad greenPanel">{roadmapPhases.map(([phase, title, status, detail]) => <div className="roadmapLine" key={title}><div className="cardTitle">{phase}</div><p><strong>{title}</strong></p><p>{detail}</p><div className="statusGreen">{status}</div></div>)}</div><div className="card sectionPad redPanel"><div className="cardTitle restrictedTitle">Private Details Withheld</div><p>Product specifications, exact factory concepts, hidden answers, creator-only criteria, private electronic or accessory designs, and unreleased manuscript content are intentionally not displayed here.</p></div></>;
}

function ControlChamber({ launchPercent, checkedItems, toggleCreatorCheck }) {
  return <><div className="card dashboardHero"><div className="dashboardMain"><div className="cardTitle">Creator Control Chamber</div><p>This chamber helps decide when the universe is actually ready to launch. Nothing here launches the site automatically. Final approval still belongs to Oak.</p><div className={launchPercent === 100 ? "memberBadge" : "statusRed"}>{launchPercent === 100 ? "Launch Ready" : "Not Launch Ready"}</div></div><div className="dashboardStat"><div className="cardTitle">Readiness</div><div className="bigMetric">{launchPercent}%</div><span>{Object.values(checkedItems).filter(Boolean).length} / {creatorChecks.length} checkpoints complete</span></div></div><div className="card progressCard"><div className="progressTop"><div>Creator Launch Readiness</div><div>{launchPercent}%</div></div><div className="progressBar"><div className="progressFill" style={{ width: `${launchPercent}%` }}></div></div></div><div className="card sectionPad greenPanel"><div className="cardTitle">Creator Approval Checklist</div>{creatorChecks.map((item) => <label className="checkLine" key={item}><input className="checkBox" type="checkbox" checked={Boolean(checkedItems[item])} onChange={() => toggleCreatorCheck(item)} /><span>{item}</span></label>)}</div><div className="card sectionPad redPanel"><div className="cardTitle restrictedTitle">Launch Lock Reminder</div><p>The universe should stay behind the public launch shield until the creator checklist, real authentication, protected content delivery, backend permissions, payment terms, and final archive content are complete.</p></div></>;
}

function ArtifactsChamber() {
  return <><div className="card sectionPad greenPanel"><div className="cardTitle">Artifact Registry</div><p>The Artifact Registry records future limited editions without revealing protected designs. Mint limits can be public. Blueprints, renders, and manufacturing details stay private.</p></div><div className="card grid3">{artifacts.map((artifact) => <div className="universeCard greenCard" key={artifact.code}><strong>{artifact.name}</strong><span>Registry Code: {artifact.code}</span><span>Minted: {artifact.minted} / {artifact.limit}</span><span>Remaining: {artifact.limit - artifact.minted}</span><div className="counterBar"><div className="counterFill" style={{ width: `${(artifact.minted / artifact.limit) * 100}%` }}></div></div><div className="statusGreen">{artifact.status}</div></div>)}</div></>;
}

function CommerceChamber(props) {
  return <><div className="card sectionPad redPanel"><div className="cardTitle restrictedTitle">Protected Commerce Layer</div><p>Pre-order and crowdfunding systems are planned, but no payments are collected on this public version. Payment collection should only be activated after refund terms, delivery timelines, taxes, shipping, factory requirements, and legal review are ready.</p></div><div className="card grid3"><div className="universeCard greenCard"><div className="countNumber">{props.countdown.days}</div><strong>Days</strong><span>Until protected release window</span></div><div className="universeCard greenCard"><div className="countNumber">{props.countdown.hours}</div><strong>Hours</strong><span>Countdown display active</span></div><div className="universeCard greenCard"><div className="countNumber">{props.countdown.minutes}:{props.countdown.seconds}</div><strong>Minutes : Seconds</strong><span>Release timing placeholder</span></div></div><div className="card sectionPad greenPanel"><div className="cardTitle">Collector Interest Chamber</div><p>This form records interest only inside this temporary interface. It is not connected to payment processing, email storage, or live ordering yet.</p><input className="reflectionInput" value={props.collectorName} onChange={(e) => props.setCollectorName(e.target.value)} placeholder="COLLECTOR NAME OR VOID NAME" /><input className="reflectionInput" value={props.collectorEmail} onChange={(e) => props.setCollectorEmail(e.target.value)} placeholder="EMAIL FOR FUTURE NOTIFICATION" /><select className="selectInput" value={props.selectedArtifact} onChange={(e) => props.setSelectedArtifact(e.target.value)}>{artifacts.map((artifact) => <option key={artifact.code} value={artifact.name}>{artifact.name}</option>)}</select><button className="actionButton" onClick={() => props.setInterestSubmitted(true)}>Register Interest</button></div>{props.interestSubmitted && <div className="card gateResult granted">Interest recorded for {cleanInput(props.collectorName) || "Unknown Collector"} — {props.selectedArtifact}. No payment has been collected.</div>}</>;
}

function FamilyChamber() {
  return <><div className="card sectionPad greenPanel"><div className="cardTitle">Family Collection Protected Preview</div><p>The Family Collection is a future branch of the Ricochet Void Universe created for parents, children, and younger learners. Full manuscripts, unfinished story text, illustration directions, character designs, and unreleased book concepts are not publicly displayed.</p></div><div className="card grid3">{familyCollection.map(([title, status, note]) => <div className="universeCard greenCard" key={title}><strong>{title}</strong><span>{note}</span><div className="statusGreen">{status}</div></div>)}</div><div className="card sectionPad redPanel"><div className="cardTitle restrictedTitle">Public Manuscript Warning</div><p>Children’s book manuscripts, unpublished storylines, characters, illustration prompts, cover concepts, and rental-platform details remain restricted until the creator decides they are ready for release.</p></div></>;
}

function VaultChamber({ vaultInput, setVaultInput, verifyVaultAccess, vaultStatus }) {
  return <><div className="card sectionPad redPanel"><div className="cardTitle restrictedTitle">Creator Vault Gateway</div><p>Restricted creator materials are not published publicly. Trusted eyes only. NDA review required before private design disclosure.</p><div className="accessChamber"><input className="accessInput" value={vaultInput} onChange={(e) => setVaultInput(e.target.value)} placeholder="CREATOR VAULT ACCESS CODE" /><button className="actionButton" onClick={verifyVaultAccess}>Verify Vault Access</button></div></div>{vaultStatus === "granted" && <div className="card gateResult granted">Creator Vault access recognized. Private materials remain withheld from public deployment until NDA-controlled review.</div>}{vaultStatus === "denied" && <div className="card gateResult denied">Vault access denied. Restricted creator materials remain sealed.</div>}<div className="card grid3"><div className="universeCard redCard"><strong>Future Gear Transmission</strong><span>Design files remain restricted until official release.</span><div className="statusRed">Restricted</div></div><div className="universeCard redCard"><strong>Prototype Electronics</strong><span>Private creator vault access only. NDA required.</span><div className="statusRed">Hidden</div></div><div className="universeCard redCard"><strong>Accessory Concepts</strong><span>No public render, blueprint, or specification available.</span><div className="statusRed">Protected</div></div></div></>;
}

function ReflectionChamber({ voidName, setVoidName, reflection, setReflection, reflectionSubmitted, setReflectionSubmitted }) {
  return <><div className="card sectionPad greenPanel"><div className="cardTitle">Foundation Reflection Chamber</div><p>You may remain anonymous, or create your own Ricochet Void Universe name so your realization cannot be claimed by someone else.</p></div><div className="card sectionPad greenPanel"><div className="cardTitle">Optional Ricochet Void Name</div><p>Use your real name, remain anonymous, or create a Void Name tied to your completed Foundation path.</p><input className="reflectionInput" value={voidName} onChange={(e) => setVoidName(e.target.value)} placeholder="VOID NAME, OR LEAVE BLANK FOR UNKNOWN SIGNAL" /></div><div className="card sectionPad greenPanel"><div className="cardTitle">Foundation Realization Submission</div><p>What did you come to realize about yourself after completing the Foundation Archives?</p><textarea className="reflectionText" value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="WRITE YOUR REALIZATION HERE..." /><button className="actionButton" onClick={() => setReflectionSubmitted(true)}>Submit Reflection</button></div>{reflectionSubmitted && <div className="card gateResult granted">Reflection received from {cleanInput(voidName) || "Unknown Signal"}. Your realization has been recorded inside the Foundation Chamber.</div>}</>;
}

const css = `
.pageShell{min-height:100vh;width:100%;margin:0;padding:40px;display:flex;align-items:center;justify-content:center;text-align:center;color:white;overflow:hidden;position:relative;background:radial-gradient(circle at 10% 15%,rgba(125,0,255,1) 0%,transparent 28%),radial-gradient(circle at 90% 20%,rgba(0,212,255,.95) 0%,transparent 28%),radial-gradient(circle at 50% 85%,rgba(255,0,136,.9) 0%,transparent 34%),linear-gradient(180deg,#020208 0%,#070018 45%,#020208 100%);background-size:140% 140%;animation:voidShift 12s ease-in-out infinite alternate;font-family:Arial,sans-serif}
.stars,.signalParticles,.scanLines,.voidSymbol,.voidCore,.orbitRing{position:fixed;pointer-events:none}.stars{inset:0;background-image:radial-gradient(white 1px,transparent 1px),radial-gradient(rgba(0,212,255,.9) 1px,transparent 1px),radial-gradient(rgba(255,0,136,.8) 1px,transparent 1px);background-size:90px 90px,140px 140px,220px 220px;animation:starDrift 30s linear infinite;opacity:.55}.signalParticles{inset:0;background-image:radial-gradient(rgba(255,255,255,.85) 1px,transparent 1px),radial-gradient(rgba(0,212,255,.95) 2px,transparent 2px),radial-gradient(rgba(255,0,136,.75) 1.5px,transparent 1.5px);background-size:180px 180px,260px 260px,340px 340px;animation:signalFloat 18s linear infinite;opacity:.5;z-index:4}.scanLines{inset:0;background:repeating-linear-gradient(to bottom,rgba(255,255,255,.035) 0px,rgba(255,255,255,.035) 1px,transparent 1px,transparent 6px);opacity:.35;z-index:6;animation:scanMove 8s linear infinite}.voidSymbol{width:660px;height:660px;border-radius:50%;border:2px solid rgba(255,255,255,.08);box-shadow:0 0 90px rgba(125,0,255,.34),inset 0 0 120px rgba(0,212,255,.18);z-index:5;opacity:.56;animation:symbolRotate 30s linear infinite}.voidCore{width:145px;height:145px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.95),rgba(0,212,255,.45),rgba(125,0,255,.15),transparent 70%);box-shadow:0 0 35px rgba(255,255,255,.35),0 0 85px rgba(0,212,255,.48),0 0 140px rgba(255,0,136,.28);z-index:5;opacity:.66;animation:corePulse 4s ease-in-out infinite alternate}.orbitRing{width:820px;height:820px;border-radius:50%;border:1px dashed rgba(255,255,255,.12);z-index:5;opacity:.5;animation:orbitRotate 50s linear infinite}.crashIntro{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at center,#090018 0%,#020208 60%,#000 100%);overflow:hidden;animation:introFade 5.2s ease forwards}.crashStarfield{position:absolute;inset:-20%;background-image:radial-gradient(white 1px,transparent 1px),radial-gradient(rgba(0,212,255,.9) 1px,transparent 1px),radial-gradient(rgba(255,0,136,.8) 1px,transparent 1px);background-size:70px 70px,110px 110px,170px 170px;animation:collapseStars 5s cubic-bezier(.2,.9,.2,1) forwards;opacity:.9}.crashRing{position:absolute;width:75vmin;height:75vmin;border-radius:50%;border:1px solid rgba(0,255,190,.3);box-shadow:0 0 60px rgba(0,212,255,.35),inset 0 0 80px rgba(125,0,255,.3);animation:ringCollapse 5s ease forwards}.crashRingTwo{width:95vmin;height:95vmin;border-color:rgba(255,0,136,.25);animation-delay:.2s}.crashCore{position:absolute;width:26vmin;height:26vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.95) 0%,rgba(0,212,255,.75) 12%,rgba(125,0,255,.3) 30%,rgba(0,0,0,1) 58%);box-shadow:0 0 80px rgba(0,212,255,.65),0 0 140px rgba(255,0,136,.45),0 0 220px rgba(125,0,255,.5);animation:voidBirth 5s ease forwards}.crashFlash{position:absolute;width:12px;height:12px;border-radius:50%;background:white;box-shadow:0 0 120px 80px rgba(255,255,255,.3);opacity:0;animation:ricochetFlash 5s ease forwards}.crashTitle{position:relative;z-index:4;margin-top:42vmin;font-size:clamp(28px,5vw,74px);letter-spacing:5px;text-transform:uppercase;text-shadow:0 0 20px rgba(0,212,255,.9),0 0 45px rgba(255,0,136,.5);opacity:0;animation:titleMaterialize 5s ease forwards}.introSkip{position:absolute;right:24px;bottom:24px;z-index:5;border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:10px 14px;background:rgba(0,0,0,.4);color:rgba(255,255,255,.8);cursor:pointer;letter-spacing:2px;text-transform:uppercase;font-size:11px}.panel,.launchShell{position:relative;z-index:10;animation:heroReveal 1.4s ease forwards}.panel{max-width:1260px}.launchShell{max-width:980px}.signalTag{display:inline-block;margin-bottom:14px;padding:7px 16px;border:1px solid rgba(0,212,255,.35);border-radius:999px;background:rgba(255,255,255,.07);font-size:12px;letter-spacing:3px;text-transform:uppercase;box-shadow:0 0 18px rgba(0,212,255,.2)}h1{margin:0;font-size:clamp(48px,8vw,96px);letter-spacing:3px;line-height:.95;text-shadow:0 0 12px rgba(125,0,255,.9),0 0 28px rgba(0,212,255,.7),0 0 50px rgba(255,0,136,.5)}.subtitle,.launchStatement{max-width:900px;margin:22px auto 0;font-size:20px;color:rgba(255,255,255,.86);line-height:1.5}.launchStatement{font-size:16px;line-height:1.8;color:rgba(255,255,255,.75);max-width:760px}.chamberNav{margin:28px auto 0;max-width:1280px;display:grid;grid-template-columns:repeat(10,1fr);gap:10px;position:sticky;top:12px;z-index:20}.navButton{color:white;border:1px solid rgba(255,255,255,.22);border-radius:14px;padding:12px 10px;background:rgba(0,0,0,.38);box-shadow:0 0 14px rgba(0,212,255,.15);cursor:pointer;transition:.25s ease;letter-spacing:1px;font-size:12px;text-transform:uppercase;backdrop-filter:blur(10px)}.navButton:hover,.navButton.active{transform:translateY(-3px);border-color:rgba(0,255,190,.5);background:rgba(0,255,190,.09);box-shadow:0 0 22px rgba(0,255,190,.22)}.card{margin:24px auto 0;max-width:1000px;border:1px solid rgba(0,212,255,.28);border-radius:18px;background:linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.25));box-shadow:0 0 25px rgba(0,212,255,.18),inset 0 0 25px rgba(125,0,255,.12);backdrop-filter:blur(10px)}.sectionPad{padding:18px;text-align:left}.greenPanel{border-color:rgba(0,255,190,.28);box-shadow:0 0 28px rgba(0,255,190,.14),inset 0 0 25px rgba(0,255,190,.07)}.redPanel{border-color:rgba(255,0,136,.32);box-shadow:0 0 28px rgba(255,0,136,.14),inset 0 0 25px rgba(255,0,136,.07)}.cardTitle{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:rgba(0,255,190,.95);margin-bottom:10px}.restrictedTitle{color:rgba(255,0,136,.95)}.sectionPad p{margin:0 0 14px;color:rgba(255,255,255,.78);line-height:1.65;font-size:14px}.hintText{font-size:18px;line-height:1.6;color:rgba(0,255,190,.95);text-shadow:0 0 18px rgba(0,255,190,.22)}.progressCard{padding:18px}.progressTop{display:flex;justify-content:space-between;gap:12px;align-items:center;color:rgba(255,255,255,.8);font-size:13px;letter-spacing:2px;text-transform:uppercase}.progressBar,.counterBar{height:10px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.12);margin-top:14px}.progressFill,.counterFill{height:100%;border-radius:inherit;background:linear-gradient(90deg,#7d00ff,#00d4ff,#00ffbe);box-shadow:0 0 18px rgba(0,255,190,.45);transition:width .6s ease}.accessChamber{display:flex;gap:10px;padding:10px}.accessInput,.reflectionInput,.reflectionText,.selectInput{border:none;outline:none;border-radius:12px;padding:14px;color:white;background:rgba(255,255,255,.08);letter-spacing:2px}.accessInput{flex:1}.reflectionInput,.reflectionText,.selectInput{width:100%;box-sizing:border-box;margin-top:10px}.reflectionText{min-height:130px;resize:vertical;line-height:1.5}.actionButton,.dangerButton,.secondaryButton{border-radius:12px;padding:12px 16px;color:white;cursor:pointer;text-decoration:none;display:inline-block}.actionButton{border:none;padding:14px 18px;background:linear-gradient(90deg,rgba(125,0,255,.8),rgba(0,212,255,.75));box-shadow:0 0 20px rgba(0,212,255,.35)}.actionButton:hover{transform:translateY(-2px);box-shadow:0 0 24px rgba(0,212,255,.55),0 0 38px rgba(125,0,255,.35)}.dangerButton{border:1px solid rgba(255,0,136,.45);background:rgba(255,0,136,.12);margin-top:12px}.secondaryButton{border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);margin-left:10px}.gateResult{padding:16px;font-size:13px;letter-spacing:2px;text-transform:uppercase}.granted{color:rgba(0,255,190,.95);border-color:rgba(0,255,190,.45);box-shadow:0 0 30px rgba(0,255,190,.25)}.denied{color:rgba(255,80,140,.95);border-color:rgba(255,0,136,.45);box-shadow:0 0 30px rgba(255,0,136,.25)}.grid4,.grid3{padding:16px;display:grid;gap:12px}.grid4{grid-template-columns:repeat(4,1fr)}.grid3{grid-template-columns:repeat(3,1fr)}.universeCard{border-radius:16px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);transition:.3s ease;padding:14px;text-align:left;position:relative;overflow:hidden}.universeCard:hover{transform:translateY(-5px);box-shadow:0 0 20px rgba(0,212,255,.35),0 0 35px rgba(255,0,136,.18)}.universeCard strong{display:block;color:white;margin-bottom:6px}.universeCard span{display:block;color:rgba(255,255,255,.62);font-size:12px;letter-spacing:1px;line-height:1.5}.verified,.greenCard{border-color:rgba(0,255,190,.25);background:rgba(0,255,190,.07)}.current{border-color:rgba(0,212,255,.42);box-shadow:0 0 22px rgba(0,212,255,.25)}.locked{opacity:.48}.redCard{border-color:rgba(255,0,136,.22);background:radial-gradient(circle at 50% 0%,rgba(255,0,136,.12),transparent 45%),rgba(255,255,255,.055)}.status,.statusRed,.statusGreen{display:inline-block;margin-top:10px;padding:4px 8px;border-radius:999px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase}.status{background:rgba(0,212,255,.12);color:rgba(0,212,255,.86)}.statusRed{background:rgba(255,0,136,.12);color:rgba(255,120,180,.95)}.statusGreen{background:rgba(0,255,190,.12);color:rgba(0,255,190,.92)}.countNumber,.bigMetric,.tierPrice{color:rgba(0,255,190,.95);text-shadow:0 0 18px rgba(0,255,190,.25)}.countNumber{font-size:34px}.bigMetric{font-size:44px;margin:8px 0}.tierPrice{font-size:26px;margin:8px 0}.dashboardHero{padding:20px;display:grid;grid-template-columns:1.2fr .8fr;gap:14px}.dashboardMain,.dashboardStat{border-radius:18px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);padding:18px;text-align:left}.dashboardMain{border-color:rgba(0,255,190,.22);background:rgba(0,255,190,.06)}.memberBadge{display:inline-block;padding:8px 14px;border-radius:999px;border:1px solid rgba(0,255,190,.35);background:rgba(0,255,190,.08);color:rgba(0,255,190,.95);font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-top:10px}.roadmapLine,.checkLine{border-left:2px solid rgba(0,255,190,.35);padding-left:18px;margin:16px 0}.checkLine{display:flex;align-items:center;gap:12px}.checkBox{width:18px;height:18px}.footerNotice{position:relative;z-index:10;max-width:980px;margin:28px auto 0;padding:16px;border-radius:18px;border:1px solid rgba(255,255,255,.16);background:rgba(0,0,0,.32);color:rgba(255,255,255,.62);font-size:11px;line-height:1.6;letter-spacing:1px}.hiddenSignal{margin-top:24px;font-size:11px;letter-spacing:4px;color:rgba(255,255,255,.22);text-transform:uppercase}@keyframes introFade{0%,85%{opacity:1;visibility:visible}100%{opacity:0;visibility:hidden}}@keyframes collapseStars{0%{transform:scale(1.4) rotate(0deg);filter:blur(0)}45%{transform:scale(.85) rotate(80deg);filter:blur(1px)}70%{transform:scale(.28) rotate(170deg);filter:blur(3px)}100%{transform:scale(1.4) rotate(260deg);filter:blur(0)}}@keyframes ringCollapse{0%{transform:scale(2.2) rotate(0deg);opacity:0}25%{opacity:.8}60%{transform:scale(.35) rotate(220deg);opacity:1}100%{transform:scale(1.5) rotate(360deg);opacity:0}}@keyframes voidBirth{0%{transform:scale(0);opacity:0}35%{transform:scale(.5);opacity:.75}65%{transform:scale(1.3);opacity:1}100%{transform:scale(.15);opacity:0}}@keyframes ricochetFlash{0%,55%{opacity:0;transform:scale(.2)}67%{opacity:1;transform:scale(22)}100%{opacity:0;transform:scale(.2)}}@keyframes titleMaterialize{0%,48%{opacity:0;transform:translateY(20px) scale(.95);filter:blur(8px)}70%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}92%{opacity:1}100%{opacity:0}}@keyframes voidShift{from{background-position:0% 0%}to{background-position:100% 100%}}@keyframes starDrift{from{background-position:0 0,0 0,0 0}to{background-position:300px 500px,-250px 400px,200px -300px}}@keyframes signalFloat{from{background-position:0 0,0 0,0 0}to{background-position:220px -300px,-260px 240px,340px -180px}}@keyframes scanMove{from{background-position:0 0}to{background-position:0 120px}}@keyframes symbolRotate{from{rotate:0deg;transform:scale(1)}to{rotate:360deg;transform:scale(1.04)}}@keyframes corePulse{from{transform:scale(.9);opacity:.35}to{transform:scale(1.25);opacity:.75}}@keyframes orbitRotate{from{rotate:0deg}to{rotate:-360deg}}@keyframes heroReveal{from{opacity:0;transform:translateY(30px) scale(.96);filter:blur(8px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}@media(max-width:900px){.chamberNav,.grid4,.grid3,.dashboardHero{grid-template-columns:1fr}.accessChamber{flex-direction:column}h1{font-size:48px}.pageShell{padding:22px}}
`;
