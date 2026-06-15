import { useEffect, useState } from "react";

import FoundationChamber from "./components/foundationchamber";
import MemberChamber from "./components/memberschamber";
import BackendChamber from "./components/backendchamber";
import AccessChamber from "./components/accesschamber";
import CreatorControlChamber from "./components/creatorcontrolchamber";
import ArtifactRegistry from "./components/artifactregistry";
import CommerceChamber from "./components/commercechamber";
import FamilyCollection from "./components/familycollection";
import CreatorVault from "./components/creatorvault";
import ReflectionChamber from "./components/reflectionchamber";

const CREATOR_PREVIEW_CODE = "CREATOR-PREVIEW";

const chambers = [
  "foundation",
  "member",
  "backend",
  "access",
  "roadmap",
  "control",
  "artifacts",
  "commerce",
  "family",
  "vault",
  "reflection",
];

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [creatorPreview, setCreatorPreview] = useState(false);
  const [creatorPreviewInput, setCreatorPreviewInput] = useState("");
  const [creatorPreviewMessage, setCreatorPreviewMessage] = useState("Creator preview locked.");
  const [activeChamber, setActiveChamber] = useState("foundation");

  useEffect(() => {
    setCreatorPreview(localStorage.getItem("rvuCreatorPreview") === "unlocked");
    const timer = setTimeout(() => setIntroComplete(true), 5200);
    return () => clearTimeout(timer);
  }, []);

  function unlockCreatorPreview() {
    if (creatorPreviewInput.trim().toUpperCase() === CREATOR_PREVIEW_CODE) {
      setCreatorPreview(true);
      localStorage.setItem("rvuCreatorPreview", "unlocked");
      setCreatorPreviewMessage("Creator preview unlocked.");
      setCreatorPreviewInput("");
    } else {
      setCreatorPreviewMessage("Preview code rejected.");
    }
  }

  function lockCreatorPreview() {
    setCreatorPreview(false);
    localStorage.removeItem("rvuCreatorPreview");
    setCreatorPreviewMessage("Creator preview locked.");
  }

  function ChamberContent() {
    if (activeChamber === "foundation") return <FoundationChamber />;
    if (activeChamber === "member") return <MemberChamber />;
    if (activeChamber === "backend") return <BackendChamber />;
    if (activeChamber === "access") return <AccessChamber />;
    if (activeChamber === "control") return <CreatorControlChamber />;
    if (activeChamber === "artifacts") return <ArtifactRegistry />;
    if (activeChamber === "commerce") return <CommerceChamber />;
    if (activeChamber === "family") return <FamilyCollection />;
    if (activeChamber === "vault") return <CreatorVault />;
    if (activeChamber === "reflection") return <ReflectionChamber />;

    return (
      <section className="card greenPanel">
        <div className="cardTitle">Roadmap Chamber</div>
        <h2>ROADMAP CHAMBER</h2>
        <p>
          This chamber will become the protected build-order map for the
          Ricochet Void Universe.
        </p>
        <div className="statusGreen">Roadmap Placeholder Active</div>
      </section>
    );
  }

  const defaultProgression = {
    foundationStarted: true,
    foundationComplete: false,
    reflectionComplete: false,
    entryEligible: false,
    entryAccessUnlocked: false,
    memberDashboardUnlocked: true,
  };

  const [progression, setProgression] = useState(defaultProgression);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rvuProgressionEngine");
      if (stored) {
        setProgression({ ...defaultProgression, ...JSON.parse(stored) });
      }
    } catch {
      setProgression(defaultProgression);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("rvuProgressionEngine", JSON.stringify(progression));
    } catch {
      // Local storage may be unavailable in some browsers. The interface still works.
    }
  }, [progression]);

  function updateProgression(key, value) {
    setProgression((current) => {
      const next = { ...current, [key]: value };

      if (key === "foundationComplete" && !value) {
        next.reflectionComplete = false;
        next.entryEligible = false;
        next.entryAccessUnlocked = false;
      }

      if (key === "reflectionComplete" && !value) {
        next.entryEligible = false;
        next.entryAccessUnlocked = false;
      }

      if (next.foundationComplete && next.reflectionComplete) {
        next.entryEligible = true;
      }

      if (!next.entryEligible) {
        next.entryAccessUnlocked = false;
      }

      return next;
    });
  }

  function resetProgression() {
    setProgression(defaultProgression);
  }

  const defaultMemberDashboard = {
    voidName: "",
    signalName: "",
    memberIntent: "",
    profileSaved: false,
    lastMilestone: "Foundation network entered",
    activityLog: [
      "Checkpoint 4 activated",
      "Progression Engine connected",
      "Member Dashboard Network initialized",
    ],
  };

  const [memberDashboard, setMemberDashboard] = useState(defaultMemberDashboard);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rvuMemberDashboard");
      if (stored) {
        setMemberDashboard({
          ...defaultMemberDashboard,
          ...JSON.parse(stored),
        });
      }
    } catch {
      setMemberDashboard(defaultMemberDashboard);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "rvuMemberDashboard",
        JSON.stringify(memberDashboard)
      );
    } catch {
      // The dashboard still works if local storage is unavailable.
    }
  }, [memberDashboard]);

  function updateMemberDashboard(key, value) {
    setMemberDashboard((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function saveMemberProfile() {
    setMemberDashboard((current) => ({
      ...current,
      profileSaved: true,
      lastMilestone: "Member identity saved locally",
      activityLog: [
        "Member identity saved locally",
        ...current.activityLog.slice(0, 5),
      ],
    }));
  }

  function resetMemberDashboard() {
    setMemberDashboard(defaultMemberDashboard);
  }

  function getSignalRank() {
    if (progression.entryAccessUnlocked) return "Entry Signal";
    if (progression.entryEligible) return "Foundation Architect";
    if (progression.reflectionComplete) return "Reflection Carrier";
    if (progression.foundationComplete) return "Signal Builder";
    if (progression.foundationStarted) return "Path Initiate";
    return "Unawakened Signal";
  }

  function getAccessStatus() {
    if (progression.entryAccessUnlocked) return "Entry Access Unlocked";
    if (progression.entryEligible) return "Entry Eligible";
    if (progression.reflectionComplete) return "Reflection Complete";
    if (progression.foundationComplete) return "Foundation Complete";
    return "Foundation In Progress";
  }

  const archiveUnlocks = [
    {
      id: "coded-mirror",
      name: "The Coded Mirror",
      publicSignal: "Reflection Signal",
      status: "Opening Archive",
      unlockRequirement: "Available at Foundation start",
      unlocked: true,
    },
    {
      id: "void-protocol",
      name: "Void Protocol 7",
      publicSignal: "Silence Signal",
      status: "Locked Path",
      unlockRequirement: "Complete the first archive signal",
      unlocked: progression.foundationComplete,
    },
    {
      id: "neural-wealth",
      name: "Neural Wealth Mapping",
      publicSignal: "Void Signal",
      status: "Locked Path",
      unlockRequirement: "Progress through the hidden Foundation order",
      unlocked: progression.foundationComplete,
    },
    {
      id: "dopamine-collapse",
      name: "The Dopamine Collapse Manual",
      publicSignal: "Ascension Signal",
      status: "Locked Path",
      unlockRequirement: "Progress through the hidden Foundation order",
      unlocked: progression.foundationComplete,
    },
    {
      id: "project-ascension",
      name: "Project Ascension",
      publicSignal: "Truth Signal",
      status: "Locked Path",
      unlockRequirement: "Progress through the hidden Foundation order",
      unlocked: progression.foundationComplete,
    },
    {
      id: "human-glitch",
      name: "The Human Glitch",
      publicSignal: "Accountability Signal",
      status: "Locked Path",
      unlockRequirement: "Progress through the hidden Foundation order",
      unlocked: progression.foundationComplete,
    },
    {
      id: "psychological-warfare",
      name: "Psychological Warfare Against Yourself",
      publicSignal: "Architect Signal",
      status: "Locked Path",
      unlockRequirement: "Progress through the hidden Foundation order",
      unlocked: progression.foundationComplete,
    },
    {
      id: "internal-empire",
      name: "The Internal Empire Blueprint",
      publicSignal: "Foundation Completion Signal",
      status: "Final Gate",
      unlockRequirement: "Complete Foundation progression",
      unlocked: progression.foundationComplete,
    },
  ];

  const [selectedArchiveUnlock, setSelectedArchiveUnlock] = useState(
    archiveUnlocks[0]
  );
  const [archiveAnswerInput, setArchiveAnswerInput] = useState("");
  const [archiveMessage, setArchiveMessage] = useState(
    "Archive unlock engine is ready."
  );

  function handleArchiveSignalSubmit() {
    const value = archiveAnswerInput.trim();

    if (!value) {
      setArchiveMessage("Enter a signal response before submitting.");
      return;
    }

    setArchiveMessage(
      "Signal response received locally. Future launch logic will verify this server-side."
    );

    setProgression((current) => ({
      ...current,
      foundationStarted: true,
    }));

    setMemberDashboard((current) => ({
      ...current,
      lastMilestone: "Archive signal submitted locally",
      activityLog: [
        "Archive signal submitted locally",
        ...current.activityLog.slice(0, 5),
      ],
    }));

    setArchiveAnswerInput("");
  }

  const pdfDeliveryItems = [
    {
      title: "Foundation Archive PDFs",
      status: "Protected Delivery Needed",
      purpose:
        "Public-facing Foundation archive files that members read as part of the progression path.",
      deliveryRule:
        "Do not expose final protected files through permanent public paths once backend delivery exists.",
    },
    {
      title: "Creator Blueprint PDFs",
      status: "Creator Vault Only",
      purpose:
        "Private creator-side files for archive logic, hidden order, answer strategy, and future expansion.",
      deliveryRule:
        "Never place creator blueprint PDFs in public folders or public download links.",
    },
    {
      title: "Entry Access PDF",
      status: "Earned Access",
      purpose:
        "A future file or experience unlocked after Foundation completion, Reflection, and eligibility review.",
      deliveryRule:
        "Should be delivered only after backend confirms Entry Access eligibility.",
    },
    {
      title: "Paid Tier Materials",
      status: "Future Subscription Delivery",
      purpose:
        "Future member-only releases tied to Signal Access and higher access tiers.",
      deliveryRule:
        "Should require verified account, subscription status, and server-side permission checks.",
    },
    {
      title: "Family Collection Files",
      status: "Future Publishing Delivery",
      purpose:
        "Family books, read-along files, educational materials, and approved family releases.",
      deliveryRule:
        "Should protect manuscripts and final publishing files until approved release.",
    },
  ];

  const pdfSecurityRules = [
    "Do not store final private PDF paths in frontend code.",
    "Do not store creator blueprint PDFs inside public folders.",
    "Do not rely on hidden frontend buttons for real protection.",
    "Do not expose paid files before account and payment verification exist.",
    "Use private storage for protected archive files later.",
    "Use expiring download links or backend file streaming later.",
    "Use member account permissions before delivering protected files.",
    "Use creator approval before releasing any final archive or blueprint material.",
  ];

  const futurePdfHooks = [
    "Private file storage",
    "Signed download URLs",
    "Server-side permission checks",
    "Account-linked archive access",
    "Entry Access file delivery",
    "Subscription-based file delivery",
    "Creator-only blueprint storage",
    "Download audit logs",
    "Anti-sharing access controls",
    "File version management",
  ];

  const [selectedPdfItem, setSelectedPdfItem] = useState(pdfDeliveryItems[0]);
  const [showPdfRules, setShowPdfRules] = useState(false);
  const [showPdfHooks, setShowPdfHooks] = useState(false);


  const launchShieldSystems = [
    "Public Launch Shield",
    "Creator Preview Protection",
    "Entry Access Gateway",
    "Member Verification Layer",
    "Protected Chamber Routing",
    "Future Backend Authentication",
  ];

  const launchChecklist = [
    "Foundation complete",
    "Member dashboard connected",
    "Archive unlock engine connected",
    "PDF delivery blueprint connected",
    "Creator vault connected",
    "Access chamber connected",
    "Backend plan established",
    "Launch approval pending",
  ];


  const creatorAdminPanels = [
    {
      title: "Release Control",
      status: "Creator Approval Required",
      purpose:
        "Tracks which systems are ready, which systems remain protected, and what can move toward public launch.",
    },
    {
      title: "Member Review",
      status: "Future Backend Required",
      purpose:
        "Future queue for Reflection review, Entry Access eligibility, member standing, and moderation decisions.",
    },
    {
      title: "Archive Control",
      status: "Protected",
      purpose:
        "Manages public archive visibility, protected order rules, PDF delivery readiness, and hidden signal protection.",
    },
    {
      title: "Commerce Approval",
      status: "Protected",
      purpose:
        "Controls when subscriptions, pre-orders, artifact drops, rentals, and Future Gear can become active.",
    },
    {
      title: "Vault Protection",
      status: "Creator Only",
      purpose:
        "Protects creator blueprints, future volumes, unreleased materials, manuscripts, designs, and roadmap systems.",
    },
    {
      title: "Security Review",
      status: "Critical",
      purpose:
        "Tracks backend readiness, access control, payment safety, private storage, and launch protection requirements.",
    },
  ];

  const releaseDecisions = [
    "Keep Public Launch Shield active",
    "Approve Foundation public release",
    "Approve Reflection gateway release",
    "Approve Entry Access flow",
    "Approve member dashboard preview",
    "Approve artifact registry preview",
    "Approve commerce preview",
    "Approve family collection preview",
    "Approve creator vault visibility rules",
  ];

  const adminSecurityRules = [
    "Creator admin controls should not expose real secrets in frontend code.",
    "Real creator login must use backend authentication later.",
    "Release approvals should eventually save to a secure database.",
    "Creator-only decisions should not be editable by public members.",
    "Private archive logic should remain outside public frontend code.",
    "Payment activation should require backend and creator approval.",
    "Protected files should require private storage and permission checks.",
  ];

  const [selectedAdminPanel, setSelectedAdminPanel] = useState(creatorAdminPanels[0]);
  const [approvedDecisions, setApprovedDecisions] = useState({});
  const [showAdminRules, setShowAdminRules] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rvuCreatorAdminDecisions");
      if (stored) {
        setApprovedDecisions(JSON.parse(stored));
      }
    } catch {
      setApprovedDecisions({});
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "rvuCreatorAdminDecisions",
        JSON.stringify(approvedDecisions)
      );
    } catch {
      // Local save unavailable. The interface still displays.
    }
  }, [approvedDecisions]);

  function toggleCreatorDecision(decision) {
    setApprovedDecisions((current) => ({
      ...current,
      [decision]: !current[decision],
    }));
  }

  function getApprovedCount() {
    return releaseDecisions.filter((decision) => approvedDecisions[decision]).length;
  }


  const interestOptions = [
    "Foundation Updates",
    "Entry Access",
    "Signal Access",
    "Future Gear",
    "Artifact Drops",
    "Family Collection",
    "Creator Announcements",
  ];

  const defaultInterestCapture = {
    name: "",
    email: "",
    voidName: "",
    selectedInterest: "Foundation Updates",
    message: "",
    submitted: false,
  };

  const [interestCapture, setInterestCapture] = useState(defaultInterestCapture);
  const [interestLog, setInterestLog] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rvuInterestCapture");
      if (stored) setInterestLog(JSON.parse(stored));
    } catch {
      setInterestLog([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("rvuInterestCapture", JSON.stringify(interestLog));
    } catch {
      // Local save unavailable. Future backend will handle real records.
    }
  }, [interestLog]);

  function updateInterestCapture(key, value) {
    setInterestCapture((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function submitInterestCapture() {
    if (!interestCapture.email.trim() && !interestCapture.voidName.trim()) {
      setInterestCapture((current) => ({
        ...current,
        submitted: true,
        message: "Add an email or Void Name before joining the preview list.",
      }));
      return;
    }

    const record = {
      interest: interestCapture.selectedInterest,
      name: interestCapture.name.trim() || "Unnamed Visitor",
      voidName: interestCapture.voidName.trim() || "No Void Name",
      email: interestCapture.email.trim() || "No Email",
      time: new Date().toLocaleString(),
    };

    setInterestLog((current) => [record, ...current.slice(0, 8)]);

    setInterestCapture({
      ...defaultInterestCapture,
      submitted: true,
      message:
        "Interest saved locally. Future launch version will connect this to a secure backend or email system.",
    });
  }

  function clearInterestLog() {
    setInterestLog([]);
  }


  const launchReadinessGroups = [
    {
      group: "Frontend Launch",
      status: "Strong",
      items: [
        "Cinematic universe shell",
        "Public entry page",
        "Foundation chamber",
        "Reflection chamber",
        "Member dashboard preview",
        "Access structure",
        "Public navigation",
        "Mobile polish",
      ],
    },
    {
      group: "Progression System",
      status: "Working Local Preview",
      items: [
        "Progression Engine",
        "Foundation completion toggle",
        "Reflection completion toggle",
        "Entry eligibility tracking",
        "Entry Access unlock preview",
        "Local saved progress",
      ],
    },
    {
      group: "Creator Systems",
      status: "Working Local Preview",
      items: [
        "Creator Preview",
        "Creator Admin Infrastructure",
        "Creator Vault chamber",
        "Creator Control chamber",
        "Release decision tracker",
        "Launch Shield",
      ],
    },
    {
      group: "Protected Content",
      status: "Blueprint Ready",
      items: [
        "Archive unlock system",
        "PDF delivery blueprint",
        "Protected path warnings",
        "Creator blueprint separation",
        "Private file delivery plan",
      ],
    },
    {
      group: "Future Backend Needed",
      status: "Not Live Yet",
      items: [
        "Real accounts",
        "Cloud database",
        "Protected PDF storage",
        "Payment verification",
        "Email capture backend",
        "Server-side signal verification",
      ],
    },
  ];

  const finalLaunchWarnings = [
    "Do not collect real payments until payment terms and backend verification exist.",
    "Do not expose final hidden answers in frontend code.",
    "Do not place creator blueprint files in public folders.",
    "Do not promise physical products before fulfillment plans exist.",
    "Do not treat local storage as secure member authentication.",
    "Do not launch protected PDFs without private delivery rules.",
  ];

  const [selectedReadinessGroup, setSelectedReadinessGroup] = useState(
    launchReadinessGroups[0]
  );
  const [launchApprovals, setLaunchApprovals] = useState({});
  const [showLaunchWarnings, setShowLaunchWarnings] = useState(false);

  function toggleLaunchApproval(item) {
    setLaunchApprovals((current) => ({
      ...current,
      [item]: !current[item],
    }));
  }


  const backendConnectionSystems = [
    {
      title: "Authentication Provider",
      status: "Not Connected Yet",
      purpose:
        "Creates real member accounts, creator login, password recovery, session security, and future account protection.",
      futureOptions: "Clerk, Supabase Auth, Firebase Auth, or Auth0",
    },
    {
      title: "Database",
      status: "Not Connected Yet",
      purpose:
        "Stores member profiles, Foundation progress, Reflection records, Entry eligibility, waitlists, and creator decisions.",
      futureOptions: "Supabase, Firebase, Neon/Postgres, or MongoDB Atlas",
    },
    {
      title: "Private File Storage",
      status: "Not Connected Yet",
      purpose:
        "Protects archive PDFs, creator blueprints, family manuscripts, unreleased art, and paid files outside the public folder.",
      futureOptions: "Supabase Storage, Firebase Storage, S3, or Cloudflare R2",
    },
    {
      title: "Payment Verification",
      status: "Not Connected Yet",
      purpose:
        "Confirms subscriptions, product purchases, rentals, refunds, cancellations, and order status through backend webhooks.",
      futureOptions: "Stripe, PayPal, or both",
    },
    {
      title: "Email / Waitlist Backend",
      status: "Not Connected Yet",
      purpose:
        "Turns the local interest form into real update lists, launch notices, artifact waitlists, and family collection updates.",
      futureOptions: "Resend, Mailchimp, ConvertKit, Brevo, or database-backed email lists",
    },
    {
      title: "Server-Side Verification",
      status: "Not Connected Yet",
      purpose:
        "Verifies signals, archive completion, Reflection eligibility, Entry Access, and protected content permissions.",
      futureOptions: "Vercel Functions, Supabase Edge Functions, Firebase Functions, or API routes",
    },
  ];

  const deploymentReadinessItems = [
    "Vercel project connected",
    "GitHub repository connected",
    "Correct lowercase import paths",
    "Working App.jsx checkpoint",
    "Security headers added",
    "Redirect protection added",
    "Robots protection added",
    "No final secrets in frontend code",
    "No private PDF paths in frontend code",
    "No live payment keys in frontend code",
    "Backend provider not selected yet",
    "Database not connected yet",
    "Authentication not connected yet",
    "Private storage not connected yet",
  ];

  const environmentVariablePlan = [
    "AUTH_PROVIDER_PUBLIC_KEY",
    "AUTH_PROVIDER_SECRET_KEY",
    "DATABASE_URL",
    "PRIVATE_STORAGE_KEY",
    "PAYMENT_PUBLIC_KEY",
    "PAYMENT_SECRET_KEY",
    "PAYMENT_WEBHOOK_SECRET",
    "EMAIL_SERVICE_KEY",
    "CREATOR_ADMIN_EMAIL",
  ];

  const backendSafetyRules = [
    "Frontend files may use public keys only when required by a provider.",
    "Secret keys must go in Vercel environment variables, not React files.",
    "Payment webhooks must be verified server-side.",
    "Archive answers must be checked server-side.",
    "Protected PDFs must be delivered from private storage.",
    "Creator admin tools must require real authentication.",
    "Member progress must be stored in a database before relying on it for real access.",
    "Local storage is useful for launch flow previews, but not real security.",
  ];

  const [selectedBackendSystem, setSelectedBackendSystem] = useState(
    backendConnectionSystems[0]
  );
  const [backendReviewed, setBackendReviewed] = useState({});
  const [showEnvPlan, setShowEnvPlan] = useState(false);
  const [showBackendRules, setShowBackendRules] = useState(false);

  function toggleBackendReviewed(item) {
    setBackendReviewed((current) => ({
      ...current,
      [item]: !current[item],
    }));
  }


  const securityShieldLayers = [
    {
      title: "Firewall Headers",
      status: "Installed",
      purpose:
        "Adds browser-level security headers, CSP restrictions, framing protection, HTTPS enforcement, and permission limits.",
      file: "public/_headers",
    },
    {
      title: "Redirect Shield",
      status: "Installed",
      purpose:
        "Blocks common sensitive paths and keeps unknown routes safely handled by the app shell.",
      file: "public/_redirects",
    },
    {
      title: "Robots Protection",
      status: "Installed",
      purpose:
        "Keeps crawlers and search engines away during the protected development and pre-launch phase.",
      file: "public/robots.txt",
    },
    {
      title: "Frontend Secret Protection",
      status: "Active Rule",
      purpose:
        "Prevents passwords, payment keys, final hidden answers, private PDF paths, and creator blueprints from being stored in React files.",
      file: "All frontend files",
    },
    {
      title: "Future Backend Firewall",
      status: "Future Phase",
      purpose:
        "Will add rate limiting, authentication, server-side permissions, private storage rules, and audit logs.",
      file: "Backend infrastructure",
    },
  ];

  const securityHardeningPlan = [
    "Keep CSP strict until a real provider must be added.",
    "Add only trusted domains to CSP when backend, payments, or email tools are connected.",
    "Use Vercel environment variables for secret keys.",
    "Use backend functions for payment webhooks.",
    "Use private storage for protected PDFs.",
    "Use authentication before member data becomes real.",
    "Use database rules before saving private records.",
    "Use audit logs for creator admin actions later.",
  ];

  const [selectedSecurityLayer, setSelectedSecurityLayer] = useState(securityShieldLayers[0]);
  const [showHardeningPlan, setShowHardeningPlan] = useState(false);


  const accountArchitectureLayers = [
    {
      title: "Member Signup",
      status: "Future Backend",
      purpose:
        "Creates real member accounts tied to email, passwordless login, or provider authentication.",
    },
    {
      title: "Creator Login",
      status: "Future Backend",
      purpose:
        "Protects creator-only tools, release controls, vault systems, and admin decisions behind real authentication.",
    },
    {
      title: "Profile Records",
      status: "Future Database",
      purpose:
        "Stores Void Name, Signal Rank, member intent, progress, waitlists, and account preferences.",
    },
    {
      title: "Session Protection",
      status: "Future Security",
      purpose:
        "Keeps users signed in safely while protecting accounts from unauthorized access.",
    },
    {
      title: "Account Recovery",
      status: "Future Security",
      purpose:
        "Provides secure recovery for lost access without exposing private member records.",
    },
  ];

  const accountSecurityRules = [
    "Do not store passwords in frontend code.",
    "Do not store member records only in local storage for real launch.",
    "Use an authentication provider before real accounts go public.",
    "Use backend database rules for private member data.",
    "Use creator-only authentication for creator admin systems.",
    "Use session protection before protected PDFs or paid content go live.",
  ];

  const [selectedAccountLayer, setSelectedAccountLayer] = useState(accountArchitectureLayers[0]);
  const [showAccountRules, setShowAccountRules] = useState(false);

  function MemberAccountArchitecture() {
    return (
      <section className="card greenPanel" id="member-account-architecture">
        <div className="cardTitle">Checkpoint 21 Member Account Architecture</div>

        <h2>REAL ACCOUNT BLUEPRINT</h2>

        <p>
          This upgrade prepares the Ricochet Void Universe for real member
          accounts and creator login without exposing passwords, private
          records, or protected access logic inside the frontend.
        </p>

        <div className="placeholderGrid">
          {accountArchitectureLayers.map((layer) => (
            <button
              className="placeholderCard"
              key={layer.title}
              onClick={() => setSelectedAccountLayer(layer)}
            >
              <strong>{layer.title}</strong>
              <span>{layer.status}</span>
              <span>{layer.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Account Layer</div>
          <h2>{selectedAccountLayer.title}</h2>
          <p><strong>Status:</strong> {selectedAccountLayer.status}</p>
          <p>{selectedAccountLayer.purpose}</p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Account Security Rules</div>

          <button className="actionButton" onClick={() => setShowAccountRules(!showAccountRules)}>
            {showAccountRules ? "Hide Account Rules" : "Show Account Rules"}
          </button>

          {showAccountRules &&
            accountSecurityRules.map((rule) => <p key={rule}>• {rule}</p>)}
        </div>
      </section>
    );
  }


  const protectedFileSystems = [
    {
      title: "Private Archive Storage",
      status: "Future Backend",
      purpose:
        "Stores final archive PDFs outside the public folder so access can be controlled by account permissions.",
    },
    {
      title: "Signed Download Links",
      status: "Future Backend",
      purpose:
        "Creates expiring file links so protected materials cannot be shared permanently.",
    },
    {
      title: "Entry Access Delivery",
      status: "Future Backend",
      purpose:
        "Delivers Entry Access materials only after Foundation, Reflection, and eligibility checks are complete.",
    },
    {
      title: "Creator Blueprint Storage",
      status: "Creator Only",
      purpose:
        "Keeps private creator blueprints, hidden logic, and future volume planning outside public systems.",
    },
    {
      title: "Download Audit Logs",
      status: "Future Security",
      purpose:
        "Tracks when protected files are delivered, by whom, and under what permission state.",
    },
  ];

  const protectedFileRules = [
    "Do not put final protected PDFs in the public folder.",
    "Do not hard-code private PDF URLs in React files.",
    "Use signed URLs or backend file streaming later.",
    "Use member permissions before file delivery.",
    "Keep creator blueprints separate from public archive files.",
    "Log protected delivery events in future backend systems.",
  ];

  const [selectedProtectedFile, setSelectedProtectedFile] = useState(protectedFileSystems[0]);
  const [showProtectedFileRules, setShowProtectedFileRules] = useState(false);

  function ProtectedPDFDeliveryNetwork() {
    return (
      <section className="card greenPanel" id="protected-pdf-network">
        <div className="cardTitle">Checkpoint 22 Protected PDF Delivery Network</div>

        <h2>PROTECTED FILE DELIVERY NETWORK</h2>

        <p>
          This upgrade defines the real future delivery system for archive PDFs,
          Entry Access materials, creator blueprints, paid files, and family
          collection releases.
        </p>

        <div className="placeholderGrid">
          {protectedFileSystems.map((system) => (
            <button
              className="placeholderCard"
              key={system.title}
              onClick={() => setSelectedProtectedFile(system)}
            >
              <strong>{system.title}</strong>
              <span>{system.status}</span>
              <span>{system.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Protected File System</div>
          <h2>{selectedProtectedFile.title}</h2>
          <p><strong>Status:</strong> {selectedProtectedFile.status}</p>
          <p>{selectedProtectedFile.purpose}</p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Protected File Rules</div>

          <button className="actionButton" onClick={() => setShowProtectedFileRules(!showProtectedFileRules)}>
            {showProtectedFileRules ? "Hide File Rules" : "Show File Rules"}
          </button>

          {showProtectedFileRules &&
            protectedFileRules.map((rule) => <p key={rule}>• {rule}</p>)}
        </div>
      </section>
    );
  }


  const marketplaceSystems = [
    {
      title: "Artifact Listings",
      status: "Frontend Framework",
      purpose:
        "Displays future limited artifacts, coins, relics, rings, and collector items.",
    },
    {
      title: "Collector Eligibility",
      status: "Future Backend",
      purpose:
        "Checks member standing, access tier, waitlist status, and drop permissions before purchase.",
    },
    {
      title: "Serialized Ownership",
      status: "Future Database",
      purpose:
        "Tracks item numbers, proof-of-purchase records, collector history, and delivery status.",
    },
    {
      title: "Drop Windows",
      status: "Future Release Control",
      purpose:
        "Controls when limited artifacts open, close, sell out, or move into archive status.",
    },
    {
      title: "Fulfillment Rules",
      status: "Future Commerce",
      purpose:
        "Connects production, shipping, refunds, replacement rules, and delivery expectations.",
    },
  ];

  const marketplaceWarnings = [
    "Do not sell artifacts before production and fulfillment rules exist.",
    "Do not promise collector ownership before database records exist.",
    "Do not collect money without refund and delivery terms.",
    "Do not expose supplier or manufacturing details publicly.",
    "Do not describe tokens or currency as investments without legal review.",
  ];

  const [selectedMarketplaceSystem, setSelectedMarketplaceSystem] = useState(marketplaceSystems[0]);
  const [showMarketplaceWarnings, setShowMarketplaceWarnings] = useState(false);

  function ArtifactMarketplaceFramework() {
    return (
      <section className="card greenPanel" id="artifact-marketplace">
        <div className="cardTitle">Checkpoint 23 Artifact Marketplace Framework</div>

        <h2>ARTIFACT MARKETPLACE FRAMEWORK</h2>

        <p>
          This upgrade prepares the future marketplace for coins, relics,
          artifact drops, serialized collector records, and creator-approved
          limited releases.
        </p>

        <div className="placeholderGrid">
          {marketplaceSystems.map((system) => (
            <button
              className="placeholderCard"
              key={system.title}
              onClick={() => setSelectedMarketplaceSystem(system)}
            >
              <strong>{system.title}</strong>
              <span>{system.status}</span>
              <span>{system.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Marketplace System</div>
          <h2>{selectedMarketplaceSystem.title}</h2>
          <p><strong>Status:</strong> {selectedMarketplaceSystem.status}</p>
          <p>{selectedMarketplaceSystem.purpose}</p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Marketplace Warnings</div>

          <button className="actionButton" onClick={() => setShowMarketplaceWarnings(!showMarketplaceWarnings)}>
            {showMarketplaceWarnings ? "Hide Warnings" : "Show Warnings"}
          </button>

          {showMarketplaceWarnings &&
            marketplaceWarnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}
        </div>
      </section>
    );
  }


  const futureGearSystems = [
    {
      title: "Void Runner Shoes",
      status: "Concept Framework",
      purpose:
        "Future footwear line tied to movement, performance, and Ricochet Void identity.",
    },
    {
      title: "Universe Apparel",
      status: "Concept Framework",
      purpose:
        "Shirts, hoodies, workout clothes, underwear, socks, and themed clothing systems.",
    },
    {
      title: "Watches and Clocks",
      status: "Concept Framework",
      purpose:
        "Time-based products connected to portals, signals, void cycles, and universe design.",
    },
    {
      title: "Jewelry and Relics",
      status: "Concept Framework",
      purpose:
        "Wearable rings, necklaces, bracelets, and limited relic-style designs.",
    },
    {
      title: "Sunglasses and Accessories",
      status: "Concept Framework",
      purpose:
        "Future lifestyle accessories tied to the Ricochet Void Universe visual language.",
    },
  ];

  const gearReleaseRules = [
    "Do not open orders before product designs are finalized.",
    "Do not collect money before supplier, pricing, refund, and shipping plans exist.",
    "Use waitlists before large production orders.",
    "Use limited drops for high-value early items.",
    "Protect design files and manufacturing details until release approval.",
    "Connect Future Gear to member accounts and collector interest later.",
  ];

  const [selectedGearSystem, setSelectedGearSystem] = useState(futureGearSystems[0]);
  const [showGearRules, setShowGearRules] = useState(false);

  function FutureGearStoreFramework() {
    return (
      <section className="card greenPanel" id="future-gear-store">
        <div className="cardTitle">Checkpoint 24 Future Gear Store Framework</div>

        <h2>FUTURE GEAR STORE FRAMEWORK</h2>

        <p>
          This upgrade prepares the Future Gear branch for apparel, shoes,
          watches, clocks, sunglasses, jewelry, accessories, and future physical
          product systems.
        </p>

        <div className="placeholderGrid">
          {futureGearSystems.map((system) => (
            <button
              className="placeholderCard"
              key={system.title}
              onClick={() => setSelectedGearSystem(system)}
            >
              <strong>{system.title}</strong>
              <span>{system.status}</span>
              <span>{system.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Gear System</div>
          <h2>{selectedGearSystem.title}</h2>
          <p><strong>Status:</strong> {selectedGearSystem.status}</p>
          <p>{selectedGearSystem.purpose}</p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Future Gear Release Rules</div>

          <button className="actionButton" onClick={() => setShowGearRules(!showGearRules)}>
            {showGearRules ? "Hide Gear Rules" : "Show Gear Rules"}
          </button>

          {showGearRules &&
            gearReleaseRules.map((rule) => <p key={rule}>• {rule}</p>)}
        </div>
      </section>
    );
  }


  const subscriptionTiers = [
    { name: "Entry Access", price: "$0", status: "Earned", purpose: "Unlocked through Foundation completion, Reflection, and eligibility." },
    { name: "Signal Access", price: "$9.99/month", status: "Future", purpose: "Ongoing member updates and core expansion." },
    { name: "Sub-Creator Access", price: "$24.99/month", status: "Future", purpose: "Guided creation tools and submission systems." },
    { name: "Architect Circle", price: "$49.99/month", status: "Future", purpose: "Advanced private rooms, previews, and drop access." },
    { name: "Universe Architect", price: "$99.99/month", status: "Future", purpose: "Highest future public member tier before creator-only systems." },
  ];

  const subscriptionRules = [
    "Entry Access remains earned, not bought.",
    "Paid access must be verified server-side later.",
    "No payment secret keys belong in frontend code.",
    "Subscriptions require refund, cancellation, and support terms.",
    "Creator-only systems are not included in paid public tiers.",
  ];

  const [selectedSubscriptionTier, setSelectedSubscriptionTier] = useState(subscriptionTiers[0]);
  const [showSubscriptionRules, setShowSubscriptionRules] = useState(false);

  function SubscriptionManagementFramework() {
    return (
      <section className="card greenPanel" id="subscription-framework">
        <div className="cardTitle">Checkpoint 25 Subscription Management Framework</div>
        <h2>SUBSCRIPTION MANAGEMENT FRAMEWORK</h2>
        <p>
          This system prepares the future access-tier and subscription structure
          while protecting the Foundation-first rule and future payment verification.
        </p>

        <div className="placeholderGrid">
          {subscriptionTiers.map((tier) => (
            <button className="placeholderCard" key={tier.name} onClick={() => setSelectedSubscriptionTier(tier)}>
              <strong>{tier.name}</strong>
              <span>{tier.price}</span>
              <span>{tier.status}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Subscription Tier</div>
          <h2>{selectedSubscriptionTier.name}</h2>
          <p><strong>Price:</strong> {selectedSubscriptionTier.price}</p>
          <p><strong>Status:</strong> {selectedSubscriptionTier.status}</p>
          <p>{selectedSubscriptionTier.purpose}</p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Subscription Rules</div>
          <button className="actionButton" onClick={() => setShowSubscriptionRules(!showSubscriptionRules)}>
            {showSubscriptionRules ? "Hide Rules" : "Show Rules"}
          </button>
          {showSubscriptionRules && subscriptionRules.map((rule) => <p key={rule}>• {rule}</p>)}
        </div>
      </section>
    );
  }


  const publishingSystems = [
    { title: "Manuscript Library", status: "Protected", purpose: "Stores future children's stories, family books, and educational drafts." },
    { title: "Illustration Pipeline", status: "Future", purpose: "Tracks artwork direction, illustration needs, covers, and visual releases." },
    { title: "Parent Reading Access", status: "Future", purpose: "Creates read-along and family access paths." },
    { title: "Rental / Lending System", status: "Future", purpose: "Plans limited-time family access and protected digital reading." },
    { title: "Publishing Approval", status: "Creator Approval", purpose: "Ensures quality and readiness before release." },
  ];

  const [selectedPublishingSystem, setSelectedPublishingSystem] = useState(publishingSystems[0]);

  function FamilyPublishingNetwork() {
    return (
      <section className="card greenPanel" id="family-publishing-network">
        <div className="cardTitle">Checkpoint 26 Family Collection Publishing Network</div>
        <h2>FAMILY PUBLISHING NETWORK</h2>
        <p>
          This system prepares the Family Collection for children's books,
          illustrations, reading access, rentals, educational materials, and
          creator-approved publishing.
        </p>

        <div className="placeholderGrid">
          {publishingSystems.map((system) => (
            <button className="placeholderCard" key={system.title} onClick={() => setSelectedPublishingSystem(system)}>
              <strong>{system.title}</strong>
              <span>{system.status}</span>
              <span>{system.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Publishing System</div>
          <h2>{selectedPublishingSystem.title}</h2>
          <p><strong>Status:</strong> {selectedPublishingSystem.status}</p>
          <p>{selectedPublishingSystem.purpose}</p>
        </div>
      </section>
    );
  }


  const analyticsPanels = [
    { title: "Progression Metrics", purpose: "Future tracking for Foundation, Reflection, and Entry Access progress." },
    { title: "Interest Metrics", purpose: "Future tracking for waitlist interest and launch demand." },
    { title: "Commerce Metrics", purpose: "Future tracking for subscriptions, orders, drops, and rentals." },
    { title: "Security Metrics", purpose: "Future tracking for suspicious actions and admin review." },
    { title: "Creator Decisions", purpose: "Tracks creator approvals and launch readiness choices." },
  ];

  const [selectedAnalyticsPanel, setSelectedAnalyticsPanel] = useState(analyticsPanels[0]);

  function CreatorAnalyticsDashboard() {
    return (
      <section className="card redPanel" id="creator-analytics-dashboard">
        <div className="cardTitle restrictedTitle">Checkpoint 27 Creator Analytics Dashboard</div>
        <h2>CREATOR ANALYTICS DASHBOARD</h2>
        <p>
          This system prepares the creator-facing analytics layer for progress,
          interest, commerce, security, launch readiness, and future operations.
        </p>

        <div className="placeholderGrid">
          {analyticsPanels.map((panel) => (
            <button className="placeholderCard" key={panel.title} onClick={() => setSelectedAnalyticsPanel(panel)}>
              <strong>{panel.title}</strong>
              <span>{panel.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Analytics Panel</div>
          <h2>{selectedAnalyticsPanel.title}</h2>
          <p>{selectedAnalyticsPanel.purpose}</p>
        </div>
      </section>
    );
  }


  const activityTypes = [
    "Foundation started",
    "Signal submitted",
    "Reflection completed",
    "Entry eligibility reached",
    "Interest saved",
    "Creator approval updated",
    "Security layer reviewed",
    "Future Gear interest recorded",
  ];

  function UniverseActivityFeed() {
    return (
      <section className="card greenPanel" id="universe-activity-feed">
        <div className="cardTitle">Checkpoint 28 Universe Activity Feed</div>
        <h2>UNIVERSE ACTIVITY FEED</h2>
        <p>
          This feed prepares the future live activity layer for member actions,
          progression events, creator approvals, waitlists, security reviews,
          and launch operations.
        </p>

        <div className="placeholderGrid">
          {activityTypes.map((activity) => (
            <div className="placeholderCard" key={activity}>
              <strong>{activity}</strong>
              <span>Future activity event type</span>
            </div>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Privacy Rule</div>
          <p>
            Future activity should respect member privacy and never expose
            personal details, private reflections, protected answers, or creator
            vault systems without permission.
          </p>
        </div>
      </section>
    );
  }


  const operationsSystems = [
    { title: "Launch Timeline", purpose: "Tracks phases from protected build to public entry to backend rollout." },
    { title: "Issue Review", purpose: "Future system for bugs, feedback, and launch problems." },
    { title: "Release Notes", purpose: "Records what changed between checkpoints and releases." },
    { title: "Support Plan", purpose: "Prepares member help, refunds, access questions, and creator responses." },
    { title: "Go-Live Control", purpose: "Final decision layer before public indexing, payments, and backend release." },
  ];

  const [selectedOperationsSystem, setSelectedOperationsSystem] = useState(operationsSystems[0]);

  function LaunchOperationsCenter() {
    return (
      <section className="card redPanel" id="launch-operations-center">
        <div className="cardTitle restrictedTitle">Checkpoint 29 Launch Operations Center</div>
        <h2>LAUNCH OPERATIONS CENTER</h2>
        <p>
          This center prepares the operating layer for go-live decisions, release
          notes, support planning, issue review, and future public launch control.
        </p>

        <div className="placeholderGrid">
          {operationsSystems.map((system) => (
            <button className="placeholderCard" key={system.title} onClick={() => setSelectedOperationsSystem(system)}>
              <strong>{system.title}</strong>
              <span>{system.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Operations System</div>
          <h2>{selectedOperationsSystem.title}</h2>
          <p>{selectedOperationsSystem.purpose}</p>
        </div>
      </section>
    );
  }


  const productionSystems = [
    "Public Entry",
    "Foundation Path",
    "Progression Engine",
    "Member Dashboard",
    "Archive Unlocks",
    "PDF Delivery Blueprint",
    "Launch Shield",
    "Creator Admin",
    "Security Dashboard",
    "Subscriptions Framework",
    "Marketplace Framework",
    "Future Gear Framework",
    "Family Publishing",
    "Analytics Dashboard",
    "Activity Feed",
    "Operations Center",
  ];

  function Volume4ProductionControlCenter() {
    return (
      <section className="card greenPanel" id="volume4-production-control">
        <div className="cardTitle">Checkpoint 30 Volume 4 Production Control</div>
        <h2>VOLUME 4 PRODUCTION CONTROL CENTER</h2>
        <p>
          This checkpoint brings the major frontend architecture together into
          one production control view before the project moves into real backend
          infrastructure.
        </p>

        <div className="placeholderGrid">
          {productionSystems.map((system) => (
            <div className="placeholderCard" key={system}>
              <strong>{system}</strong>
              <span>Connected in Volume 4 frontend architecture</span>
            </div>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Next Real Phase</div>
          <p>
            After this checkpoint, the highest-value move is backend integration:
            authentication, database, private file storage, email capture, and
            payment verification.
          </p>
        </div>
      </section>
    );
  }

  function SecurityStatusDashboard() {
    return (
      <section className="card redPanel" id="security-dashboard">
        <div className="cardTitle restrictedTitle">Checkpoint 20 Security Dashboard</div>

        <h2>FIREWALL + SECURITY STATUS</h2>

        <p>
          This dashboard tracks the Ricochet Void Universe protection layers:
          firewall headers, redirect shielding, robots protection, frontend
          secret rules, and future backend hardening.
        </p>

        <div className="placeholderGrid">
          {securityShieldLayers.map((layer) => (
            <button
              className="placeholderCard"
              key={layer.title}
              onClick={() => setSelectedSecurityLayer(layer)}
            >
              <strong>{layer.title}</strong>
              <span>{layer.status}</span>
              <span>{layer.file}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Security Layer</div>

          <h2>{selectedSecurityLayer.title}</h2>

          <p>
            <strong>Status:</strong> {selectedSecurityLayer.status}
          </p>

          <p>
            <strong>File / Area:</strong> {selectedSecurityLayer.file}
          </p>

          <p>{selectedSecurityLayer.purpose}</p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Hardening Plan</div>

          <button
            className="actionButton"
            onClick={() => setShowHardeningPlan(!showHardeningPlan)}
          >
            {showHardeningPlan ? "Hide Hardening Plan" : "Show Hardening Plan"}
          </button>

          {showHardeningPlan &&
            securityHardeningPlan.map((item) => <p key={item}>• {item}</p>)}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Checkpoint 20 Objective</div>

          <p>
            Firewall protections are now tracked both in the project files and
            inside the creator-facing universe dashboard.
          </p>
        </div>
      </section>
    );
  }

  function BackendConnectionBlueprint() {
    const reviewedCount = deploymentReadinessItems.filter(
      (item) => backendReviewed[item]
    ).length;

    const reviewedPercent = Math.round(
      (reviewedCount / deploymentReadinessItems.length) * 100
    );

    return (
      <section className="card greenPanel" id="backend-connection">
        <div className="cardTitle">Checkpoint 16 Backend Connection Blueprint</div>

        <h2>BACKEND + DEPLOYMENT READINESS</h2>

        <p>
          This panel prepares the Ricochet Void Universe for the next major
          infrastructure phase: real accounts, cloud progress, protected files,
          payment verification, email capture, and server-side access rules.
        </p>

        <p>
          Current mode: frontend launch architecture. Future mode: authenticated
          backend platform connected to private storage, database records,
          payments, and creator admin controls.
        </p>

        <div className="progressTrack">
          <div
            className="progressFill"
            style={{ width: `${reviewedPercent}%` }}
          ></div>
        </div>

        <p>
          <strong>Backend Preparation Review:</strong> {reviewedPercent}%
        </p>

        <div className="placeholderGrid">
          {backendConnectionSystems.map((system) => (
            <button
              className="placeholderCard"
              key={system.title}
              onClick={() => setSelectedBackendSystem(system)}
            >
              <strong>{system.title}</strong>
              <span>{system.status}</span>
              <span>{system.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Backend System</div>

          <h2>{selectedBackendSystem.title}</h2>

          <p>
            <strong>Status:</strong> {selectedBackendSystem.status}
          </p>

          <p>{selectedBackendSystem.purpose}</p>

          <p>
            <strong>Possible Options:</strong>{" "}
            {selectedBackendSystem.futureOptions}
          </p>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Deployment Readiness Review</div>

          {deploymentReadinessItems.map((item) => (
            <button
              className="placeholderCard"
              key={item}
              onClick={() => toggleBackendReviewed(item)}
            >
              <strong>{backendReviewed[item] ? "✓ Reviewed" : "☐ Review"}</strong>
              <span>{item}</span>
            </button>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Environment Variable Plan</div>

          <button
            className="actionButton"
            onClick={() => setShowEnvPlan(!showEnvPlan)}
          >
            {showEnvPlan ? "Hide Environment Plan" : "Show Environment Plan"}
          </button>

          {showEnvPlan &&
            environmentVariablePlan.map((item) => (
              <p key={item}>• {item}</p>
            ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Backend Safety Rules</div>

          <button
            className="actionButton"
            onClick={() => setShowBackendRules(!showBackendRules)}
          >
            {showBackendRules ? "Hide Backend Rules" : "Show Backend Rules"}
          </button>

          {showBackendRules &&
            backendSafetyRules.map((rule) => <p key={rule}>⚠ {rule}</p>)}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Checkpoint 16 Objective</div>

          <p>
            The project now has a clear front-to-back build path: public entry,
            progression, member dashboard, archive unlocks, protected file
            planning, creator admin, launch readiness, and backend connection
            planning.
          </p>
        </div>
      </section>
    );
  }

  function FinalLaunchReadinessControl() {
    const allItems = launchReadinessGroups.flatMap((group) => group.items);
    const approved = allItems.filter((item) => launchApprovals[item]).length;
    const percent = Math.round((approved / allItems.length) * 100);

    return (
      <section className="card greenPanel" id="launch-readiness">
        <div className="cardTitle">Checkpoint 15 Launch Readiness Control</div>

        <h2>FINAL LAUNCH READINESS</h2>

        <p>
          This panel organizes what is already working in the frontend, what is
          safe for public preview, and what still requires backend
          infrastructure before real accounts, payments, protected files, and
          permanent member records go live.
        </p>

        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${percent}%` }}></div>
        </div>

        <p>
          <strong>Readiness Review:</strong> {percent}%
        </p>

        <div className="placeholderGrid">
          {launchReadinessGroups.map((group) => (
            <button
              className="placeholderCard"
              key={group.group}
              onClick={() => setSelectedReadinessGroup(group)}
            >
              <strong>{group.group}</strong>
              <span>{group.status}</span>
              <span>{group.items.length} tracked items</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Readiness Group</div>

          <h2>{selectedReadinessGroup.group}</h2>

          <p>
            <strong>Status:</strong> {selectedReadinessGroup.status}
          </p>

          {selectedReadinessGroup.items.map((item) => (
            <button
              className="placeholderCard"
              key={item}
              onClick={() => toggleLaunchApproval(item)}
            >
              <strong>{launchApprovals[item] ? "✓ Reviewed" : "☐ Review"}</strong>
              <span>{item}</span>
            </button>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Final Launch Warnings</div>

          <button
            className="actionButton"
            onClick={() => setShowLaunchWarnings(!showLaunchWarnings)}
          >
            {showLaunchWarnings ? "Hide Warnings" : "Show Warnings"}
          </button>

          {showLaunchWarnings &&
            finalLaunchWarnings.map((warning) => (
              <p key={warning}>⚠ {warning}</p>
            ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Launch Position</div>

          <p>
            The Ricochet Void Universe frontend is becoming launch-ready as a
            public entry and progression preview. The deeper platform systems
            are clearly marked for future backend connection instead of being
            falsely presented as finished.
          </p>
        </div>
      </section>
    );
  }

  function WaitlistInterestCapture() {
    return (
      <section className="card greenPanel" id="waitlist-interest">
        <div className="cardTitle">Volume 4 Waitlist + Interest Capture</div>

        <h2>JOIN THE SIGNAL LIST</h2>

        <p>
          This system prepares the future waitlist and interest capture layer for
          Foundation updates, Entry Access, Future Gear, artifact drops, family
          releases, and creator announcements.
        </p>

        <p>
          Current mode: local preview list. Future mode: secure backend records,
          verified email capture, account-linked waitlists, and creator-approved
          release notifications.
        </p>

        <div className="placeholderGrid">
          {interestOptions.map((option) => (
            <button
              className="placeholderCard"
              key={option}
              onClick={() => updateInterestCapture("selectedInterest", option)}
            >
              <strong>{option}</strong>
              <span>
                {interestCapture.selectedInterest === option
                  ? "Selected interest"
                  : "Select this interest"}
              </span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Interest Form</div>

          <input
            value={interestCapture.name}
            onChange={(event) =>
              updateInterestCapture("name", event.target.value)
            }
            placeholder="NAME OR LEAVE BLANK"
          />

          <input
            value={interestCapture.voidName}
            onChange={(event) =>
              updateInterestCapture("voidName", event.target.value)
            }
            placeholder="VOID NAME"
          />

          <input
            value={interestCapture.email}
            onChange={(event) =>
              updateInterestCapture("email", event.target.value)
            }
            placeholder="EMAIL FOR FUTURE UPDATES"
          />

          <p>
            <strong>Selected Interest:</strong>{" "}
            {interestCapture.selectedInterest}
          </p>

          <button className="actionButton" onClick={submitInterestCapture}>
            Save Interest Preview
          </button>

          {interestCapture.submitted && <p>{interestCapture.message}</p>}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Local Interest Preview Log</div>

          {interestLog.length === 0 ? (
            <p>No preview interests saved yet.</p>
          ) : (
            interestLog.map((item) => (
              <p key={`${item.time}-${item.email}`}>
                • {item.interest} — {item.voidName} — {item.time}
              </p>
            ))
          )}

          {interestLog.length > 0 && (
            <button className="actionButton" onClick={clearInterestLog}>
              Clear Local Interest Log
            </button>
          )}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Interest Capture Security</div>

          <p>
            This preview does not send emails, create real accounts, or store
            records in a secure database. Before public launch with real
            visitors, interest capture should connect to backend storage, email
            consent, privacy terms, spam protection, and creator-controlled
            export/review tools.
          </p>
        </div>
      </section>
    );
  }

  function CreatorAdminInfrastructure() {
    const approvedCount = getApprovedCount();
    const releasePercent = Math.round(
      (approvedCount / releaseDecisions.length) * 100
    );

    return (
      <section className="card redPanel">
        <div className="cardTitle restrictedTitle">
          Volume 4 Creator Admin Infrastructure
        </div>

        <h2>CREATOR ADMIN NETWORK</h2>

        <p>
          This system turns Creator Control and Creator Vault into a working
          management layer. It gives the creator a visible structure for release
          decisions, member review planning, archive control, commerce approval,
          vault protection, and security readiness.
        </p>

        <p>
          Current mode: local creator-preview management. Future mode: secure
          creator login, backend permissions, audit logs, database-backed
          release controls, and protected admin routing.
        </p>

        <div className="progressTrack">
          <div
            className="progressFill"
            style={{ width: `${releasePercent}%` }}
          ></div>
        </div>

        <p>
          <strong>Creator Approval Progress:</strong> {releasePercent}%
        </p>

        <div className="placeholderGrid">
          {creatorAdminPanels.map((panel) => (
            <button
              className="placeholderCard"
              key={panel.title}
              onClick={() => setSelectedAdminPanel(panel)}
            >
              <strong>{panel.title}</strong>
              <span>{panel.status}</span>
              <span>{panel.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Admin Panel</div>

          <h2>{selectedAdminPanel.title}</h2>

          <p>
            <strong>Status:</strong> {selectedAdminPanel.status}
          </p>

          <p>{selectedAdminPanel.purpose}</p>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Creator Release Decisions</div>

          {releaseDecisions.map((decision) => (
            <button
              className="placeholderCard"
              key={decision}
              onClick={() => toggleCreatorDecision(decision)}
            >
              <strong>{approvedDecisions[decision] ? "✓ Approved" : "☐ Pending"}</strong>
              <span>{decision}</span>
            </button>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">
            Creator Admin Security Rules
          </div>

          <button
            className="actionButton"
            onClick={() => setShowAdminRules(!showAdminRules)}
          >
            {showAdminRules ? "Hide Admin Rules" : "Show Admin Rules"}
          </button>

          {showAdminRules &&
            adminSecurityRules.map((rule) => <p key={rule}>• {rule}</p>)}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Checkpoint 9 Objective</div>

          <p>
            The site now includes the chamber network, progression engine,
            member dashboard, archive unlock system, PDF delivery blueprint,
            launch shield, and creator admin infrastructure.
          </p>
        </div>
      </section>
    );
  }

  function LaunchShieldSystem() {
    return (
      <section className="card greenPanel">
        <div className="cardTitle">Volume 4 Launch Shield</div>

        <h2>PUBLIC LAUNCH PROTECTION SYSTEM</h2>

        <p>
          The Launch Shield controls the transition between development,
          creator-preview operation, and public release.
        </p>

        <div className="placeholderGrid">
          {launchShieldSystems.map((item) => (
            <div className="placeholderCard" key={item}>
              <strong>{item}</strong>
              <span>Protected launch layer</span>
            </div>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Launch Readiness</div>
          {launchChecklist.map((item) => (
            <p key={item}>☐ {item}</p>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Checkpoint 8 Objective</div>
          <p>
            The site now has chamber architecture, progression tracking,
            member dashboard systems, archive unlock planning, PDF delivery
            planning, and a launch shield structure.
          </p>
        </div>
      </section>
    );
  }

  function PdfDeliveryBlueprint() {
    return (
      <section className="card greenPanel">
        <div className="cardTitle">Volume 4 PDF Delivery Blueprint</div>

        <h2>PROTECTED FILE DELIVERY SYSTEM</h2>

        <p>
          This system prepares the structure for Foundation PDFs, Entry Access
          materials, creator blueprints, paid tier files, and family collection
          releases without exposing protected paths or private files.
        </p>

        <p>
          Current mode: delivery blueprint only. Future mode: private storage,
          signed download links, backend permission checks, member account
          records, and creator-approved release controls.
        </p>

        <div className="placeholderGrid">
          {pdfDeliveryItems.map((item) => (
            <button
              className="placeholderCard"
              key={item.title}
              onClick={() => setSelectedPdfItem(item)}
            >
              <strong>{item.title}</strong>
              <span>{item.status}</span>
              <span>{item.purpose}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Delivery Item</div>

          <h2>{selectedPdfItem.title}</h2>

          <p>
            <strong>Status:</strong> {selectedPdfItem.status}
          </p>

          <p>{selectedPdfItem.purpose}</p>

          <p>
            <strong>Delivery Rule:</strong> {selectedPdfItem.deliveryRule}
          </p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">PDF Security Rules</div>

          <button
            className="actionButton"
            onClick={() => setShowPdfRules(!showPdfRules)}
          >
            {showPdfRules ? "Hide PDF Rules" : "Show PDF Rules"}
          </button>

          {showPdfRules &&
            pdfSecurityRules.map((rule) => <p key={rule}>• {rule}</p>)}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Future PDF Delivery Hooks</div>

          <button
            className="actionButton"
            onClick={() => setShowPdfHooks(!showPdfHooks)}
          >
            {showPdfHooks ? "Hide Delivery Hooks" : "Show Delivery Hooks"}
          </button>

          {showPdfHooks &&
            futurePdfHooks.map((hook) => <p key={hook}>⬜ {hook}</p>)}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Launch Protection</div>

          <p>
            During the current frontend phase, archive files can be organized
            for testing, but final protected content should not rely on public
            folder privacy. The launch-ready version should move protected files
            behind backend access rules.
          </p>
        </div>
      </section>
    );
  }

  function ArchiveUnlockSystem() {
    return (
      <section className="card greenPanel">
        <div className="cardTitle">Volume 4 Archive Unlock System</div>

        <h2>FOUNDATION ARCHIVE UNLOCK ENGINE</h2>

        <p>
          This system begins connecting the Foundation Archives to the member
          journey. It displays archive access states without exposing archive
          numbers, final answer chains, creator blueprints, or protected PDF
          paths.
        </p>

        <p>
          Current mode: frontend unlock preview. Future mode: server-side signal
          verification, account-linked archive progress, protected PDF delivery,
          and anti-sharing controls.
        </p>

        <div className="placeholderGrid">
          {archiveUnlocks.map((archive) => (
            <button
              className="placeholderCard"
              key={archive.id}
              onClick={() => setSelectedArchiveUnlock(archive)}
            >
              <strong>{archive.name}</strong>
              <span>{archive.publicSignal}</span>
              <span>{archive.unlocked ? "Unlocked / Visible" : "Locked / Hidden Path"}</span>
              <span>{archive.status}</span>
            </button>
          ))}
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Selected Archive Access</div>

          <h2>{selectedArchiveUnlock.name}</h2>

          <p>
            <strong>Signal:</strong> {selectedArchiveUnlock.publicSignal}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedArchiveUnlock.unlocked ? "Unlocked" : "Locked"}
          </p>

          <p>
            <strong>Requirement:</strong>{" "}
            {selectedArchiveUnlock.unlockRequirement}
          </p>

          <p>
            The public system shows archive identity and signal theme, but it
            does not reveal numbered order or final solution logic.
          </p>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Signal Submission Preview</div>

          <p>
            This input is a safe preview of the future answer system. It does
            not contain or verify final hidden answers in the frontend.
          </p>

          <input
            value={archiveAnswerInput}
            onChange={(event) => setArchiveAnswerInput(event.target.value)}
            placeholder="ENTER SIGNAL RESPONSE"
          />

          <button className="actionButton" onClick={handleArchiveSignalSubmit}>
            Submit Signal Preview
          </button>

          <p>{archiveMessage}</p>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Archive Security Rule</div>

          <p>
            Final archive answers, correct order, private PDF file paths, and
            creator blueprint logic must not be stored inside this frontend
            file. Real unlocks must later be verified by backend systems.
          </p>
        </div>
      </section>
    );
  }

  function MemberDashboardNetwork() {
    const rank = getSignalRank();
    const accessStatus = getAccessStatus();

    return (
      <section className="card greenPanel">
        <div className="cardTitle">Volume 4 Member Dashboard Network</div>

        <h2>MEMBER DASHBOARD</h2>

        <p>
          This dashboard connects member identity, saved local profile data,
          signal rank, progression status, entry eligibility, and future account
          hooks into one visible member system.
        </p>

        <p>
          Current mode: local browser dashboard. Future mode: authenticated
          member account connected to cloud progress, protected files,
          subscriptions, waitlists, orders, and creator-approved records.
        </p>

        <div className="placeholderGrid">
          <div className="placeholderCard">
            <strong>Signal Rank</strong>
            <span>{rank}</span>
            <span>Calculated from current progression state.</span>
          </div>

          <div className="placeholderCard">
            <strong>Access Status</strong>
            <span>{accessStatus}</span>
            <span>Updates as Foundation, Reflection, and Entry status change.</span>
          </div>

          <div className="placeholderCard">
            <strong>Profile Status</strong>
            <span>{memberDashboard.profileSaved ? "Saved Locally" : "Not Saved"}</span>
            <span>Future version connects to real authentication.</span>
          </div>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Member Identity</div>

          <input
            value={memberDashboard.voidName}
            onChange={(event) =>
              updateMemberDashboard("voidName", event.target.value)
            }
            placeholder="VOID NAME"
          />

          <input
            value={memberDashboard.signalName}
            onChange={(event) =>
              updateMemberDashboard("signalName", event.target.value)
            }
            placeholder="SIGNAL NAME OR PUBLIC MEMBER TITLE"
          />

          <textarea
            className="reflectionText"
            value={memberDashboard.memberIntent}
            onChange={(event) =>
              updateMemberDashboard("memberIntent", event.target.value)
            }
            placeholder="What is this member trying to build inside the Ricochet Void Universe?"
          />

          <button className="actionButton" onClick={saveMemberProfile}>
            Save Local Member Profile
          </button>

          <button className="actionButton" onClick={resetMemberDashboard}>
            Reset Member Dashboard
          </button>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Member Snapshot</div>

          <p>
            <strong>Void Name:</strong>{" "}
            {memberDashboard.voidName.trim() || "Not chosen yet"}
          </p>

          <p>
            <strong>Signal Name:</strong>{" "}
            {memberDashboard.signalName.trim() || "Not chosen yet"}
          </p>

          <p>
            <strong>Current Rank:</strong> {rank}
          </p>

          <p>
            <strong>Current Access:</strong> {accessStatus}
          </p>

          <p>
            <strong>Last Milestone:</strong> {memberDashboard.lastMilestone}
          </p>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Progression Timeline</div>

          <p>{progression.foundationStarted ? "✓" : "☐"} Foundation Started</p>
          <p>{progression.foundationComplete ? "✓" : "☐"} Foundation Complete</p>
          <p>{progression.reflectionComplete ? "✓" : "☐"} Reflection Complete</p>
          <p>{progression.entryEligible ? "✓" : "☐"} Entry Eligible</p>
          <p>{progression.entryAccessUnlocked ? "✓" : "☐"} Entry Access Unlocked</p>
        </div>

        <div className="card greenPanel">
          <div className="cardTitle">Activity Feed</div>

          {memberDashboard.activityLog.map((activity) => (
            <p key={activity}>• {activity}</p>
          ))}
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Dashboard Security Notice</div>

          <p>
            This dashboard does not create a real account yet. Do not store
            passwords, payment details, private records, final answers, or
            protected PDF paths here. Real dashboard data must later move into
            authenticated backend records.
          </p>
        </div>
      </section>
    );
  }

  function getProgressPercent() {
    const steps = [
      progression.foundationStarted,
      progression.foundationComplete,
      progression.reflectionComplete,
      progression.entryEligible,
      progression.entryAccessUnlocked,
    ];

    const completed = steps.filter(Boolean).length;
    return Math.round((completed / steps.length) * 100);
  }

  function ProgressionEngine() {
    const percent = getProgressPercent();

    return (
      <section className="card greenPanel">
        <div className="cardTitle">Volume 4 Progression Engine</div>

        <h2>PROGRESSION ENGINE</h2>

        <p>
          This system connects the major Ricochet Void Universe milestones:
          Foundation completion, Reflection completion, Entry eligibility,
          Entry Access, and member dashboard readiness.
        </p>

        <p>
          Current mode: local browser save. Future mode: account-linked cloud
          progress, backend verification, and protected access rules.
        </p>

        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${percent}%` }}></div>
        </div>

        <p>
          <strong>Progress:</strong> {percent}%
        </p>

        <div className="placeholderGrid">
          <button
            className="placeholderCard"
            onClick={() =>
              updateProgression("foundationComplete", !progression.foundationComplete)
            }
          >
            <strong>Foundation</strong>
            <span>{progression.foundationComplete ? "Complete" : "Incomplete"}</span>
            <span>Click to toggle Foundation completion.</span>
          </button>

          <button
            className="placeholderCard"
            onClick={() =>
              updateProgression("reflectionComplete", !progression.reflectionComplete)
            }
          >
            <strong>Reflection</strong>
            <span>{progression.reflectionComplete ? "Complete" : "Incomplete"}</span>
            <span>Requires Foundation completion for real launch logic later.</span>
          </button>

          <button
            className="placeholderCard"
            onClick={() =>
              progression.entryEligible &&
              updateProgression("entryAccessUnlocked", !progression.entryAccessUnlocked)
            }
          >
            <strong>Entry Access</strong>
            <span>{progression.entryEligible ? "Eligible" : "Locked"}</span>
            <span>{progression.entryAccessUnlocked ? "Unlocked" : "Not Unlocked"}</span>
          </button>
        </div>

        <div className="card redPanel">
          <div className="cardTitle restrictedTitle">Progression Security Notice</div>

          <p>
            This local save system is for launch structure and prototype flow.
            Real members should not receive final protected access from browser
            storage alone. Final access must later be verified by backend
            accounts, database records, protected storage, and server-side rules.
          </p>
        </div>

        <button className="actionButton" onClick={resetProgression}>
          Reset Local Progress
        </button>
      </section>
    );
  }

  return (
    <main className="pageShell">
      <style>{`
        .pageShell {
          min-height: 100vh;
          padding: 40px;
          color: white;
          text-align: center;
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 15%, rgba(125,0,255,1) 0%, transparent 28%),
            radial-gradient(circle at 90% 20%, rgba(0,212,255,.95) 0%, transparent 28%),
            radial-gradient(circle at 50% 85%, rgba(255,0,136,.9) 0%, transparent 34%),
            linear-gradient(180deg, #020208 0%, #070018 45%, #020208 100%);
          background-size: 140% 140%;
          animation: voidShift 12s ease-in-out infinite alternate;
        }

        .stars {
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(white 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,.9) 1px, transparent 1px),
            radial-gradient(rgba(255,0,136,.8) 1px, transparent 1px);
          background-size: 90px 90px, 140px 140px, 220px 220px;
          animation: starDrift 30s linear infinite;
          opacity: .55;
          pointer-events: none;
        }

        .signalParticles {
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(rgba(255,255,255,.85) 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,.95) 2px, transparent 2px),
            radial-gradient(rgba(255,0,136,.75) 1.5px, transparent 1.5px);
          background-size: 180px 180px, 260px 260px, 340px 340px;
          animation: signalFloat 18s linear infinite;
          opacity: .5;
          z-index: 4;
          pointer-events: none;
        }

        .scanLines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.035) 0px,
            rgba(255,255,255,.035) 1px,
            transparent 1px,
            transparent 6px
          );
          opacity: .35;
          z-index: 6;
          pointer-events: none;
          animation: scanMove 8s linear infinite;
        }

        .orbitRing {
          position: fixed;
          left: 50%;
          top: 50%;
          width: 820px;
          height: 820px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,.12);
          z-index: 5;
          opacity: .5;
          pointer-events: none;
          animation: orbitRotate 50s linear infinite;
        }

        .voidSymbol {
          position: fixed;
          left: 50%;
          top: 50%;
          width: 660px;
          height: 660px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,.08);
          box-shadow: 0 0 90px rgba(125,0,255,.34), inset 0 0 120px rgba(0,212,255,.18);
          z-index: 5;
          opacity: .56;
          pointer-events: none;
          animation: symbolRotate 30s linear infinite;
        }

        .voidCore {
          position: fixed;
          left: calc(50% - 72px);
          top: calc(50% - 72px);
          width: 145px;
          height: 145px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.95), rgba(0,212,255,.45), rgba(125,0,255,.15), transparent 70%);
          box-shadow: 0 0 35px rgba(255,255,255,.35), 0 0 85px rgba(0,212,255,.48), 0 0 140px rgba(255,0,136,.28);
          z-index: 5;
          opacity: .66;
          pointer-events: none;
          animation: corePulse 4s ease-in-out infinite alternate;
        }

        .crashIntro {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #090018 0%, #020208 60%, #000 100%);
          overflow: hidden;
          animation: introFade 5.2s ease forwards;
        }

        .crashStarfield {
          position: absolute;
          inset: -20%;
          background-image:
            radial-gradient(white 1px, transparent 1px),
            radial-gradient(rgba(0,212,255,.9) 1px, transparent 1px),
            radial-gradient(rgba(255,0,136,.8) 1px, transparent 1px);
          background-size: 70px 70px, 110px 110px, 170px 170px;
          animation: collapseStars 5s cubic-bezier(.2,.9,.2,1) forwards;
          opacity: .9;
        }

        .crashRing {
          position: absolute;
          width: 75vmin;
          height: 75vmin;
          border-radius: 50%;
          border: 1px solid rgba(0,255,190,.3);
          box-shadow: 0 0 60px rgba(0,212,255,.35), inset 0 0 80px rgba(125,0,255,.3);
          animation: ringCollapse 5s ease forwards;
        }

        .crashRingTwo {
          width: 95vmin;
          height: 95vmin;
          border-color: rgba(255,0,136,.25);
          animation-delay: .2s;
        }

        .crashCore {
          position: absolute;
          width: 26vmin;
          height: 26vmin;
          border-radius: 50%;
          background:
            radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(0,212,255,.75) 12%, rgba(125,0,255,.3) 30%, rgba(0,0,0,1) 58%);
          box-shadow:
            0 0 80px rgba(0,212,255,.65),
            0 0 140px rgba(255,0,136,.45),
            0 0 220px rgba(125,0,255,.5);
          animation: voidBirth 5s ease forwards;
        }

        .crashFlash {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 120px 80px rgba(255,255,255,.3);
          opacity: 0;
          animation: ricochetFlash 5s ease forwards;
        }

        .crashTitle {
          position: relative;
          z-index: 4;
          margin-top: 42vmin;
          font-size: clamp(28px, 5vw, 74px);
          letter-spacing: 5px;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(0,212,255,.9), 0 0 45px rgba(255,0,136,.5);
          opacity: 0;
          animation: titleMaterialize 5s ease forwards;
        }

        .introSkip {
          position: absolute;
          right: 24px;
          bottom: 24px;
          z-index: 5;
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(0,0,0,.4);
          color: rgba(255,255,255,.8);
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 11px;
        }

        .contentShell {
          position: relative;
          z-index: 10;
          animation: heroReveal 1.4s ease forwards;
        }

        h1 {
          font-size: clamp(48px, 8vw, 96px);
          margin: 0;
          letter-spacing: 3px;
          line-height: .95;
          text-shadow: 0 0 12px rgba(125,0,255,.9), 0 0 28px rgba(0,212,255,.7), 0 0 50px rgba(255,0,136,.5);
        }

        .signalTag {
          display: inline-block;
          margin-bottom: 14px;
          padding: 7px 16px;
          border: 1px solid rgba(0,212,255,.35);
          border-radius: 999px;
          background: rgba(255,255,255,.07);
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          box-shadow: 0 0 18px rgba(0,212,255,.2);
        }

        .subtitle {
          max-width: 900px;
          margin: 22px auto 0;
          color: rgba(255,255,255,.86);
          line-height: 1.6;
          font-size: 18px;
        }

        .card {
          max-width: 1000px;
          margin: 24px auto;
          padding: 20px;
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.25));
          border: 1px solid rgba(255,255,255,.18);
          box-shadow: 0 0 25px rgba(0,212,255,.18), inset 0 0 25px rgba(125,0,255,.12);
          text-align: left;
          backdrop-filter: blur(10px);
        }

        .greenPanel {
          border-color: rgba(0,255,190,.3);
        }

        .redPanel {
          border-color: rgba(255,0,136,.35);
        }

        .cardTitle {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(0,255,190,.95);
          margin-bottom: 10px;
        }

        .restrictedTitle {
          color: rgba(255,0,136,.95);
        }

        .card p {
          color: rgba(255,255,255,.78);
          line-height: 1.65;
        }

        .nav {
          max-width: 1280px;
          margin: 28px auto;
          display: grid;
          grid-template-columns: repeat(11, 1fr);
          gap: 8px;
          position: sticky;
          top: 12px;
          z-index: 20;
        }

        button {
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 12px;
          padding: 12px;
          color: white;
          background: rgba(0,0,0,.38);
          cursor: pointer;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 1px;
          backdrop-filter: blur(10px);
        }

        button:hover,
        button.active {
          transform: translateY(-2px);
          border-color: rgba(0,255,190,.6);
          background: rgba(0,255,190,.15);
          box-shadow: 0 0 22px rgba(0,255,190,.22);
        }

        input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          border-radius: 12px;
          border: none;
          margin: 10px 0;
          color: white;
          background: rgba(255,255,255,.1);
          outline: none;
          letter-spacing: 2px;
        }

        .actionButton {
          background: linear-gradient(90deg, rgba(125,0,255,.8), rgba(0,212,255,.75));
          box-shadow: 0 0 20px rgba(0,212,255,.35);
        }

        .statusGreen {
          display: inline-block;
          margin-top: 10px;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: rgba(0,255,190,.12);
          color: rgba(0,255,190,.92);
        }


        .placeholderGrid {
          max-width: 1050px;
          margin: 24px auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .placeholderCard {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.06);
          padding: 14px;
          text-align: left;
          min-height: 120px;
        }

        .placeholderCard strong {
          display: block;
          color: white;
          margin-bottom: 8px;
        }

        .placeholderCard span {
          display: block;
          color: rgba(255,255,255,.68);
          font-size: 12px;
          line-height: 1.5;
          margin-bottom: 6px;
        }

        textarea,
        .reflectionText {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          border-radius: 12px;
          border: none;
          margin: 10px 0;
          color: white;
          background: rgba(255,255,255,.1);
          outline: none;
          letter-spacing: 1px;
          min-height: 130px;
          resize: vertical;
          line-height: 1.5;
        }


        .progressTrack {
          width: 100%;
          height: 16px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(0,255,190,.25);
          margin: 18px 0;
        }

        .progressFill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(125,0,255,.9), rgba(0,212,255,.9), rgba(0,255,190,.9));
          box-shadow: 0 0 18px rgba(0,255,190,.35);
          transition: width .35s ease;
        }


        .publicNav {
          max-width: 1100px;
          margin: 28px auto;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 10px;
          position: relative;
          z-index: 12;
        }

        .publicNav a {
          color: white;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 14px;
          padding: 12px 10px;
          background: rgba(0,0,0,.38);
          box-shadow: 0 0 14px rgba(0,212,255,.15);
          letter-spacing: 1px;
          font-size: 11px;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .publicNav a:hover {
          transform: translateY(-2px);
          border-color: rgba(0,255,190,.6);
          background: rgba(0,255,190,.15);
          box-shadow: 0 0 22px rgba(0,255,190,.22);
        }


        .launchDivider {
          max-width: 1000px;
          height: 1px;
          margin: 34px auto;
          background: linear-gradient(90deg, transparent, rgba(0,255,190,.55), transparent);
          box-shadow: 0 0 18px rgba(0,255,190,.25);
        }

        .sectionEyebrow {
          color: rgba(0,255,190,.92);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 11px;
          margin-bottom: 8px;
        }

        .safeText {
          overflow-wrap: anywhere;
        }

        .pageShell * {
          box-sizing: border-box;
        }

        .card,
        .placeholderCard,
        .publicNav a,
        button {
          -webkit-tap-highlight-color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .pageShell,
          .stars,
          .signalParticles,
          .scanLines,
          .orbitRing,
          .voidSymbol,
          .voidCore,
          .crashIntro,
          .crashStarfield,
          .crashRing,
          .crashCore,
          .crashFlash,
          .crashTitle,
          .contentShell {
            animation: none !important;
          }

          .crashIntro {
            display: none;
          }
        }

        @media (max-width: 1200px) {
          .pageShell {
            padding: 32px 22px;
          }

          .nav {
            grid-template-columns: repeat(4, 1fr);
          }

          .placeholderGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .publicNav {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 700px) {
          .pageShell {
            padding: 24px 14px;
            overflow-x: hidden;
          }

          h1 {
            font-size: clamp(38px, 13vw, 58px);
            letter-spacing: 1px;
          }

          h2 {
            font-size: 22px;
            line-height: 1.2;
          }

          .subtitle {
            font-size: 15px;
            line-height: 1.55;
          }

          .card {
            padding: 16px;
            border-radius: 16px;
            margin: 18px auto;
          }

          .nav,
          .placeholderGrid,
          .publicNav {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .nav {
            position: relative;
            top: auto;
          }

          .placeholderCard {
            min-height: auto;
          }

          button,
          .publicNav a {
            width: 100%;
            min-height: 44px;
            font-size: 11px;
          }

          input,
          textarea {
            font-size: 16px;
          }

          .orbitRing {
            width: 420px;
            height: 420px;
          }

          .voidSymbol {
            width: 360px;
            height: 360px;
          }

          .voidCore {
            width: 90px;
            height: 90px;
            left: calc(50% - 45px);
            top: calc(50% - 45px);
          }
        }


        .footer strong {
          color: rgba(255,255,255,.82);
        }

        #trust-protection .placeholderCard {
          border-color: rgba(0,255,190,.22);
        }

        .footer {
          max-width: 1000px;
          margin: 30px auto 0;
          color: rgba(255,255,255,.55);
          font-size: 12px;
          line-height: 1.6;
        }

        @keyframes introFade {
          0%, 85% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }

        @keyframes collapseStars {
          0% { transform: scale(1.4) rotate(0deg); filter: blur(0); }
          45% { transform: scale(.85) rotate(80deg); filter: blur(1px); }
          70% { transform: scale(.28) rotate(170deg); filter: blur(3px); }
          100% { transform: scale(1.4) rotate(260deg); filter: blur(0); }
        }

        @keyframes ringCollapse {
          0% { transform: scale(2.2) rotate(0deg); opacity: 0; }
          25% { opacity: .8; }
          60% { transform: scale(.35) rotate(220deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }

        @keyframes voidBirth {
          0% { transform: scale(0); opacity: 0; }
          35% { transform: scale(.5); opacity: .75; }
          65% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(.15); opacity: 0; }
        }

        @keyframes ricochetFlash {
          0%, 55% { opacity: 0; transform: scale(.2); }
          67% { opacity: 1; transform: scale(22); }
          100% { opacity: 0; transform: scale(.2); }
        }

        @keyframes titleMaterialize {
          0%, 48% { opacity: 0; transform: translateY(20px) scale(.95); filter: blur(8px); }
          70% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          92% { opacity: 1; }
          100% { opacity: 0; }
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
          from { rotate: 0deg; }
          to { rotate: 360deg; }
        }

        @keyframes corePulse {
          from { transform: scale(.9); opacity: .35; }
          to { transform: scale(1.25); opacity: .75; }
        }

        @keyframes orbitRotate {
          from { rotate: 0deg; }
          to { rotate: -360deg; }
        }

        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(30px) scale(.96); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @media (max-width: 900px) {
          .nav {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 48px;
          }
        }
      `}</style>

      {!introComplete && (
        <div className="crashIntro">
          <div className="crashStarfield"></div>
          <div className="crashRing crashRingTwo"></div>
          <div className="crashRing"></div>
          <div className="crashCore"></div>
          <div className="crashFlash"></div>
          <div className="crashTitle">Ricochet Void Universe</div>
          <button className="introSkip" onClick={() => setIntroComplete(true)}>
            Skip Formation
          </button>
        </div>
      )}

      <div className="stars"></div>
      <div className="signalParticles"></div>
      <div className="scanLines"></div>
      <div className="orbitRing"></div>
      <div className="voidSymbol"></div>
      <div className="voidCore"></div>

      <section className="contentShell">
        {!creatorPreview ? (
          <>
            <div className="signalTag">Ricochet Void Universe</div>
            <h1>Begin the Foundation</h1>

            <p className="subtitle">
              Signal grows where noise falls. Enter the Ricochet Void Universe
              through the Foundation Path, follow the archives, complete your
              reflection, and earn your way toward Entry Access.
            </p>

            <div className="publicNav">
              <a href="#foundation-entry">Begin Foundation</a>
              <a href="#how-entry-works">How Entry Works</a>
              <a href="#access-path">Access Path</a>
              <a href="#future-systems">Future Systems</a>
              <a href="#trust-protection">Trust</a>
              <a href="#waitlist-interest">Waitlist</a>
              <a href="#launch-readiness">Launch</a>
              <a href="#backend-connection">Backend</a>
              <a href="#security-dashboard">Security</a>
              <a href="#creator-preview">Creator Preview</a>
            </div>

            <section className="card greenPanel" id="foundation-entry">
              <div className="cardTitle">Public Entry</div>

              <h2>THE FOUNDATION IS THE FIRST DOOR</h2>

              <p>
                The Ricochet Void Universe begins with a progression path built
                around attention, reflection, truth, discipline, and personal
                evolution. Visitors do not start by buying their way into the
                deeper universe. They start by paying attention.
              </p>

              <p>
                Entry Access is earned after Foundation completion, signal
                progression, and reflection. Paid tiers and deeper systems exist
                later, but the first gate is the Foundation.
              </p>

              <button
                className="actionButton"
                onClick={() => {
                  setCreatorPreview(true);
                  localStorage.setItem("rvuCreatorPreview", "unlocked");
                  setActiveChamber("foundation");
                }}
              >
                Begin Foundation
              </button>
            </section>

            <div className="launchDivider"></div>

            <section className="card greenPanel" id="how-entry-works">
              <div className="cardTitle">How Entry Works</div>

              <div className="placeholderGrid">
                <div className="placeholderCard">
                  <strong>1. Begin Foundation</strong>
                  <span>Start with the opening archive path.</span>
                </div>

                <div className="placeholderCard">
                  <strong>2. Follow the Signals</strong>
                  <span>Progress through clues, meaning, and attention.</span>
                </div>

                <div className="placeholderCard">
                  <strong>3. Submit Reflection</strong>
                  <span>Show what you discovered, not just what you clicked.</span>
                </div>

                <div className="placeholderCard">
                  <strong>4. Earn Entry Access</strong>
                  <span>Entry is unlocked through completion and eligibility.</span>
                </div>

                <div className="placeholderCard">
                  <strong>5. Continue the Journey</strong>
                  <span>Member systems and future tiers expand after entry.</span>
                </div>

                <div className="placeholderCard">
                  <strong>6. Coming Soon</strong>
                  <span>Future Gear, artifacts, family releases, and deeper chambers.</span>
                </div>
              </div>
            </section>

            <div className="launchDivider"></div>

            <section className="card greenPanel" id="access-path">
              <div className="cardTitle">Access Path</div>

              <h2>ENTRY IS EARNED</h2>

              <p>
                The public path is designed so a visitor knows where to begin
                without exposing the private archive order, final answers,
                creator blueprint logic, protected PDF paths, or paid-tier
                systems before they are ready.
              </p>

              <div className="placeholderGrid">
                <div className="placeholderCard">
                  <strong>Entry Access</strong>
                  <span>$0 after Foundation completion and Reflection review.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Signal Access</strong>
                  <span>$9.99/month future expansion tier.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Sub-Creator Access</strong>
                  <span>$24.99/month future guided creation tier.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Architect Circle</strong>
                  <span>$49.99/month future advanced private access.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Universe Architect</strong>
                  <span>$99.99/month highest future public member tier.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Creator Vault</strong>
                  <span>Creator-only. Not included in public or paid tiers.</span>
                </div>
              </div>
            </section>

            <div className="launchDivider"></div>

            <section className="card greenPanel" id="future-systems">
              <div className="cardTitle">Future Systems</div>

              <h2>COMING SOON WITHOUT BREAKING THE PATH</h2>

              <p>
                These systems are part of the long-term universe, but the public
                entry path remains focused on the Foundation first.
              </p>

              <div className="placeholderGrid">
                <div className="placeholderCard">
                  <strong>Future Gear</strong>
                  <span>Clothing, watches, coins, shoes, jewelry, and artifacts.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Family Collection</strong>
                  <span>Children’s books, family reading, and educational content.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Protected PDFs</strong>
                  <span>Future backend delivery for archive files and earned access.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Member Accounts</strong>
                  <span>Future login, saved progress, waitlists, and order history.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Artifact Registry</strong>
                  <span>Future serialized limited releases and collector tracking.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Creator Admin</strong>
                  <span>Protected release controls and creator approval systems.</span>
                </div>
              </div>
            </section>

            <div className="launchDivider"></div>

                        <section className="card greenPanel" id="trust-protection">
              <div className="cardTitle">Trust & Protection</div>

              <h2>PROTECTED CREATOR UNIVERSE</h2>

              <p>
                Ricochet Void Universe is a creator-owned progression universe.
                Its archive names, chamber systems, progression path, visual
                identity, future artifact concepts, family collection concepts,
                and creator vault systems are protected creator materials.
              </p>

              <div className="placeholderGrid">
                <div className="placeholderCard">
                  <strong>Creator-Owned</strong>
                  <span>Built and directed by Oakley Cheuvront.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Protected Path</strong>
                  <span>Hidden archive order, final answers, and creator blueprints are not public.</span>
                </div>

                <div className="placeholderCard">
                  <strong>No Backend Yet</strong>
                  <span>Current launch systems are frontend-ready; accounts and payments require future backend.</span>
                </div>

                <div className="placeholderCard">
                  <strong>No Medical/Financial Claims</strong>
                  <span>Content supports reflection and personal growth, not professional advice.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Future Purchases</strong>
                  <span>Payments, subscriptions, and orders activate only after terms and verification systems exist.</span>
                </div>

                <div className="placeholderCard">
                  <strong>Private Materials</strong>
                  <span>Creator vault, unreleased files, and private PDFs remain protected.</span>
                </div>
              </div>
            </section>

            <div className="launchDivider"></div>

            <section className="card redPanel" id="creator-preview">
              <div className="cardTitle restrictedTitle">Protected Creator Preview</div>

              <p>
                Creator preview remains protected while deeper systems,
                administrative controls, private vault materials, backend
                permissions, and unreleased files remain under development.
              </p>

              <input
                value={creatorPreviewInput}
                onChange={(e) => setCreatorPreviewInput(e.target.value)}
                placeholder="CREATOR PREVIEW CODE"
              />

              <button className="actionButton" onClick={unlockCreatorPreview}>
                Unlock Creator Preview
              </button>

              <p>{creatorPreviewMessage}</p>
            </section>

            <section className="card greenPanel">
              <div className="cardTitle">Launch-Ready Notice</div>

              <p>
                This public entry system is ready to act as the front door of
                the Ricochet Void Universe while backend accounts, protected PDF
                delivery, payment verification, and creator-only admin systems
                continue moving toward full infrastructure.
              </p>
            </section>
          </>
        ) : (
          <>
            <div className="signalTag">Creator Preview Mode Active</div>
            <h1>Ricochet Void Universe</h1>

            <p className="subtitle">
              Checkpoint 7 is active. Progression, member dashboard, archive unlocks,
              and protected PDF delivery planning are now connected.
            </p>

            <section className="card redPanel">
              <div className="cardTitle restrictedTitle">Creator Preview Control</div>
              <p>This keeps the live public version protected while we build.</p>
              <button onClick={lockCreatorPreview}>Lock Creator Preview</button>
            </section>

            <div className="nav">
              {chambers.map((chamber) => (
                <button
                  key={chamber}
                  className={activeChamber === chamber ? "active" : ""}
                  onClick={() => setActiveChamber(chamber)}
                >
                  {chamber}
                </button>
              ))}
            </div>

            <ProgressionEngine />

            <MemberDashboardNetwork />

            <ArchiveUnlockSystem />

            <PdfDeliveryBlueprint />

            <LaunchShieldSystem />

            <CreatorAdminInfrastructure />

            <WaitlistInterestCapture />

            <FinalLaunchReadinessControl />

            <BackendConnectionBlueprint />

            <SecurityStatusDashboard />

            <MemberAccountArchitecture />

            <ProtectedPDFDeliveryNetwork />

            <ArtifactMarketplaceFramework />

            <FutureGearStoreFramework />

            <SubscriptionManagementFramework />

            <FamilyPublishingNetwork />

            <CreatorAnalyticsDashboard />

            <UniverseActivityFeed />

            <LaunchOperationsCenter />

            <Volume4ProductionControlCenter />

            <ChamberContent />

            <section className="card greenPanel">
              <div className="cardTitle">Intellectual Property Notice</div>
              <p>
                Ricochet Void Universe™, its names, archives, writings,
                progression systems, chamber concepts, artwork, designs, and
                related universe elements are protected creator materials.
              </p>
              <p>© Oakley Cheuvront. All Rights Reserved.</p>
            </section>

            <div className="footer">
              Ricochet Void Universe™ and related archive names, chamber systems,
              access structures, progression concepts, artifact concepts, family
              collection concepts, visual identity, and creator-controlled
              architecture are protected creator materials. Unauthorized
              reproduction, redistribution, public disclosure, commercial use,
              imitation, reverse engineering, or derivative use is prohibited.
              Current frontend systems are launch architecture only; real
              accounts, payments, protected file delivery, and private records
              require future backend verification.
            </div>
          </>
        )}
      </section>
    </main>
  );
}
