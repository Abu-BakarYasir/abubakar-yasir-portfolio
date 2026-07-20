// Flagship case studies + secondary open-source projects.
// `images` are public paths; add real files under /public/projects/<slug>/.

// `width`/`height` are the file's intrinsic pixel size, needed so tall
// full-page captures aren't squashed into the default 16:9 aspect ratio.
// `srcLight` is an alternate cut of the same image for the light theme. Both
// variants render and CSS picks one off [data-theme], see ThemedImage. Omit
// it and `src` is used in both themes.
export type ProjectImage = {
  src: string;
  srcLight?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: "Live" | "GitHub" | "In progress";
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  // Case-study body
  problem: string;
  approach: string[];
  highlights: string[];
  outcomes?: string[];
  // The cover is a designed key-art slide. It leads the case-study carousel,
  // ahead of the real screenshots.
  cover?: ProjectImage;
  images: ProjectImage[];
  imagesPending?: boolean;
};

export const projects: Project[] = [
  {
    slug: "neuromedica",
    title: "neuroMedica",
    tagline: "Medical RAG system for clinical decision support",
    year: "2025",
    status: "Live",
    featured: true,
    liveUrl: "https://neuromedica-app.up.railway.app/",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Qdrant",
      "Neo4j",
      "PubMedBERT",
      "Anthropic Claude",
      "TensorFlow",
      "PyTorch",
      "Docker",
    ],
    problem:
      "A clinician can't act on an answer they have no way to check. General-purpose models will happily invent a citation, and in medicine that isn't a cosmetic bug. I wanted something that answers clinical questions with the evidence attached, and that admits when the evidence is thin instead of filling the gap.",
    approach: [
      "Built the retrieval layer as three systems running side by side: dense vectors from PubMedBERT in Qdrant, sparse BM25 keyword search, and a Neo4j knowledge graph over UMLS. Reciprocal Rank Fusion merges the three result sets into a single ranking, so a result has to do well on more than one axis to reach the top.",
      "Added a CRAG self-evaluation loop. Before it generates anything, the system grades what it retrieved, and if confidence is low it rewrites the query and goes back rather than answering from weak context.",
      "Wrote two diagnostic models alongside the RAG: a Keras CNN that classifies ECG arrhythmias once neurokit2 has found the R-peaks, and a DenseNet-121 in PyTorch doing multi-label chest X-ray pathology with Grad-CAM heatmaps, so you can see which part of the image drove the prediction.",
      "Packaged the whole stack with Docker on Railway, with a Next.js and TypeScript dashboard on top of it.",
    ],
    highlights: [
      "Three retrieval modes fused with Reciprocal Rank Fusion",
      "Self-grading loop that re-queries weak context",
      "Grad-CAM heatmaps showing what the X-ray model looked at",
      "Answers carry ICD-10 and SNOMED codes plus sources",
    ],
    cover: {
      src: "/projects/neuromedica/cover-dark.png",
      srcLight: "/projects/neuromedica/cover-light.png",
      alt: "neuroMedica case-study cover showing layered clinical dashboard, chest X-ray analysis and differential diagnosis panels",
      caption: "neuroMedica: evidence-grounded clinical Q&A with imaging on the side.",
      width: 2048,
      height: 1152,
    },
    images: [
      {
        src: "/projects/neuromedica/dashboard.png",
        alt: "neuroMedica clinical dashboard with a patient management overview",
        caption: "The clinical dashboard, with patient management and at-a-glance stats.",
        width: 1826,
        height: 903,
      },
      {
        src: "/projects/neuromedica/xray.png",
        alt: "Chest X-ray analysis showing DenseNet pathology predictions and confidence bars",
        caption:
          "Chest X-ray analysis. DenseNet-121 gives multi-label predictions, Grad-CAM shows where it looked.",
        width: 1909,
        height: 934,
      },
      {
        src: "/projects/neuromedica/symptom-explorer.png",
        alt: "Symptom Explorer producing an evidence-grounded differential diagnosis with citations",
        caption:
          "Symptom Explorer builds a differential diagnosis with ICD-10 and SNOMED codes, and cites what it used.",
        width: 1913,
        height: 926,
      },
      {
        src: "/projects/neuromedica/prescription-scan.png",
        alt: "AI prescription scanner dialog extracting patient details from an uploaded prescription image",
        caption:
          "Prescription scanning. Vision models pull patient details and medications off an uploaded image.",
        width: 1805,
        height: 816,
      },
      {
        src: "/projects/neuromedica/features.png",
        alt: "neuroMedica feature grid covering X-ray, ECG, Q&A, OCR, symptom explorer and report generation",
        caption: "Six clinical modules sharing one workspace.",
        width: 1831,
        height: 897,
      },
    ],
  },
  {
    slug: "magnai",
    title: "Magnai",
    tagline: "Vertical AI SaaS for UK public affairs",
    year: "2025",
    status: "Live",
    featured: true,
    liveUrl: "https://magnai.co.uk/",
    stack: [
      "Python",
      "Django REST Framework",
      "PostgreSQL",
      "Anthropic Claude Agent SDK",
      "OpenAI",
      "Django-Q2",
      "Redis",
      "Railway",
    ],
    problem:
      "A public affairs team has to watch Westminster, Holyrood, the Senedd, Stormont, the regulators, the think tanks and the press at once, then turn all of it into something a client will actually read. Magnai does the watching and writes the first draft. Because agencies run competing clients side by side, no tenant's data can ever leak into another's.",
    approach: [
      "Built it as a multi-tenant Django app with an orchestrator agent on top. The orchestrator delegates to specialist sub-agents for parliament, media and Twitter, and each one gets its own scoped tool registry rather than reaching into a shared pile of tools it has no business touching.",
      "Wrote the monitoring pipelines on Django-Q2 and Redis with locking around each run, so two overlapping schedules never process the same source twice. Double-processing was the bug that kept coming back before the locking went in.",
      "Added the security layer, meaning rate limiting, anomaly detection and a content security policy, plus a stakeholder engine that scores MPs and Lords by how relevant they are to a given brief.",
    ],
    highlights: [
      "Orchestrator agent delegating to scoped sub-agents",
      "Overlapping monitoring runs that never double-process",
      "Relevance scoring across MPs, Lords and committees",
      "Reports written with citations back to the source",
    ],
    cover: {
      src: "/projects/magnai/cover-dark.png",
      srcLight: "/projects/magnai/cover-light.png",
      alt: "Magnai case-study cover showing layered intelligence report, tenant dashboard and stakeholder-mapping panels",
      caption: "Magnai: political monitoring across four UK legislatures, written up automatically.",
      width: 2048,
      height: 1152,
    },
    images: [
      {
        src: "/projects/magnai/report-detail.png",
        alt: "AI-generated Energy and Net Zero parliamentary monitor report with executive summary, debates, questions and recommended actions",
        caption:
          "The output. A parliamentary monitor written end to end: summary, chamber debates, question analysis, recommended actions.",
        width: 1425,
        height: 2670,
      },
      {
        src: "/projects/magnai/monitoring-setup.png",
        alt: "Monitor setup screen selecting UK, Scotland, Wales, Northern Ireland, social and government sources",
        caption:
          "Monitor setup. Nine source types across four jurisdictions feed the orchestrator's sub-agents.",
        width: 1425,
        height: 1857,
      },
      {
        src: "/projects/magnai/dashboard.png",
        alt: "Magnai tenant dashboard with live parliament activity, tasks, projects and scheduled reports",
        caption:
          "A tenant's dashboard: live parliament activity, tracked bills, scheduled reports, think-tank output.",
        width: 1425,
        height: 2556,
      },
      {
        src: "/projects/magnai/monitoring-hub.png",
        alt: "Monitoring hub grouping reports by jurisdiction and source type",
        caption: "The monitoring hub, grouping reports by jurisdiction, government body and channel.",
        width: 1425,
        height: 1963,
      },
      {
        src: "/projects/magnai/stakeholder-map.png",
        alt: "Stakeholder mapping table of MPs and Lords with party, constituency, role and relevance scoring",
        caption: "Stakeholder mapping. Parliamentarians scored for relevance, with outreach tracked against each.",
        width: 1425,
        height: 1323,
      },
      {
        src: "/projects/magnai/bill-tracking.png",
        alt: "Bill tracking across UK, Scottish, Welsh and Northern Irish legislatures showing stage badges",
        caption: "Bill tracking, following legislative stages across all four UK legislatures.",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    slug: "lynxflow-health",
    title: "Lynxflow-Health",
    tagline: "Role-based healthcare management SaaS",
    year: "2025",
    status: "Live",
    featured: true,
    liveUrl: "https://lynxflowhealth.com/",
    stack: ["Next.js", "Node.js", "Supabase (PostgreSQL)", "REST APIs"],
    problem:
      "Two very different people need the same patient record: the clinician treating them, and the admin running the facility. They should not see the same thing, and hiding the difference in the UI isn't good enough. On top of that the adherence data arrives from physical pillboxes sitting in patients' homes, so the pipeline has to keep up in near real time and stay inside HIPAA handling rules while it does.",
    approach: [
      "Built two role surfaces, Clinical and Super Admin, over one Supabase database, with row-level security doing the separation. The rules live in Postgres, so a mistake in the frontend can't hand someone data they shouldn't have.",
      "Wired up Tenovi smart pillboxes over webhooks. When a patient opens a compartment the event reaches the platform and their adherence updates within seconds, rather than at the next sync.",
      "Added device ordering inside the platform so a facility can provision hardware without leaving it, and a bot that scans dependencies for known vulnerabilities on a schedule.",
    ],
    highlights: [
      "Row-level security enforcing access per role",
      "Live adherence from Tenovi pillbox webhooks",
      "Hardware ordering built into the platform",
      "Scheduled dependency vulnerability scanning",
    ],
    // TODO: only the dashboard is captured so far. Still to add: Clinicals,
    // Patients, Devices, Analytics and Reports, all behind the app login.
    cover: {
      src: "/projects/lynxflow-health/cover-dark.png",
      srcLight: "/projects/lynxflow-health/cover-light.png",
      alt: "Lynxflow-Health case-study cover showing a clinical dashboard panel with connected-device compliance",
      caption: "Lynxflow-Health: adherence tracking from real hardware, split by role.",
      width: 2048,
      height: 1152,
    },
    images: [
      {
        src: "/projects/lynxflow-health/dashboard.png",
        alt: "Lynxflow Health dashboard showing device compliance, battery health, connected devices and facility information",
        caption:
          "The clinical dashboard, reading device compliance, battery health and facility detail off the Tenovi hardware.",
        width: 1881,
        height: 945,
      },
    ],
  },
];

// Secondary open-source repos shown as a compact grid (no full case study).
export const openSource = [
  {
    name: "slack-bounty-bot",
    lang: "Python · Flask",
    summary:
      "Scrapes Replit bounties through Firecrawl, keeps the high-value ones from the last 24 hours, and posts the best to Slack. Runs on Vercel on a CRON schedule.",
    url: "https://github.com/Abu-BakarYasir/slack-bounty-bot",
  },
  {
    name: "Rag_App",
    lang: "Python",
    summary:
      "Ask questions about a PDF and get answers only from the document. ChromaDB for storage, HuggingFace embeddings, Groq LLaMA3-70B doing the writing.",
    url: "https://github.com/Abu-BakarYasir/Rag_App",
  },
  {
    name: "my_slack_mcp",
    lang: "Python",
    summary:
      "A Slack MCP server on FastMCP, exposing tools for recent messages, per-user history and LLM summaries. Published to Smithery.",
    url: "https://smithery.ai/server/@Abu-BakarYasir/my_slack_mcp",
  },
  {
    name: "persistent_memory_chatbot",
    lang: "Python",
    summary:
      "Groq llama3-8b wired to Mem0.ai so the chat remembers facts about you between sessions instead of starting cold every time.",
    url: "https://github.com/Abu-BakarYasir/persistent_memory_chatbot",
  },
  {
    name: "Pakistani-currency-classification",
    lang: "Jupyter",
    summary: "A CNN that tells Pakistani banknotes apart by denomination.",
    url: "https://github.com/Abu-BakarYasir/Pakistani-currency-classification-project-using-CNN",
  },
  {
    name: "voice_assistant",
    lang: "Python",
    summary: "Voice assistant experiment. Speech in, an LLM in the middle, a spoken answer out.",
    url: "https://github.com/Abu-BakarYasir",
  },
];
