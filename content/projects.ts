// Flagship case studies + secondary open-source projects.
// `images` are public paths; add real files under /public/projects/<slug>/.

export type ProjectImage = { src: string; alt: string; caption?: string };

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
      "Clinicians need answers they can trust. General LLMs hallucinate, and a wrong medical claim is not a harmless bug. The goal: evidence-grounded clinical Q&A plus real diagnostic tooling, with hallucination driven down to a level safe enough to reason from.",
    approach: [
      "Designed a hybrid-retrieval RAG pipeline fusing dense (PubMedBERT / Qdrant), sparse (BM25), and knowledge-graph (Neo4j / UMLS) retrieval via Reciprocal Rank Fusion.",
      "Added a CRAG self-evaluation loop that grades retrieved context and re-queries when confidence is low, cutting hallucination for clinical safety.",
      "Built deep-learning diagnostic modules: a Keras CNN for ECG arrhythmia classification (R-peak detection via neurokit2) and a DenseNet-121 (PyTorch) multi-label chest X-ray pathology classifier with Grad-CAM explainability.",
      "Deployed the full stack via Docker on Railway with a Next.js/TypeScript clinical dashboard.",
    ],
    highlights: [
      "Reciprocal Rank Fusion across three retrieval modalities",
      "CRAG self-evaluation loop to reduce hallucination",
      "Grad-CAM attention maps for explainable X-ray predictions",
      "Evidence-grounded answers with ICD-10 / SNOMED citations",
    ],
    cover: {
      src: "/projects/neuromedica/dashboard.png",
      alt: "neuroMedica clinical dashboard showing patient management and stats",
    },
    images: [
      {
        src: "/projects/neuromedica/dashboard.png",
        alt: "neuroMedica clinical dashboard — patient management overview",
        caption: "Clinical dashboard — patient management and at-a-glance stats.",
      },
      {
        src: "/projects/neuromedica/xray.png",
        alt: "Chest X-ray analysis with DenseNet pathology predictions and confidence bars",
        caption:
          "Chest X-ray analysis — DenseNet-121 multi-label predictions with Grad-CAM and calibrated confidence.",
      },
      {
        src: "/projects/neuromedica/symptom-explorer.png",
        alt: "Symptom Explorer producing an evidence-grounded differential diagnosis with citations",
        caption:
          "Symptom Explorer — evidence-grounded differential diagnosis with ICD-10 / SNOMED codes and sources.",
      },
      {
        src: "/projects/neuromedica/features.png",
        alt: "neuroMedica feature grid: X-ray, ECG, Q&A, OCR, symptom explorer, report generator",
        caption: "Capabilities — six clinical AI modules unified in one workspace.",
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
      "Public-affairs teams drown in parliamentary, media, and social signal across the UK, Scotland, and Wales. Magnai turns that firehose into AI-authored intelligence reports — automatically, per tenant, without cross-tenant leakage.",
    approach: [
      "Built a multi-tenant Django SaaS with a multi-agent AI system: an orchestrator plus parliament / media / Twitter sub-agents, each with its own tool registry.",
      "Engineered robust async monitoring pipelines (Django-Q2 + Redis) with race-condition protection so overlapping runs never double-process.",
      "Added a security layer — rate limiting, anomaly detection, CSP — and a stakeholder-mapping engine with relevance scoring.",
    ],
    highlights: [
      "Orchestrator + specialised sub-agents, each with a scoped tool registry",
      "Race-condition-safe async monitoring across three jurisdictions",
      "Stakeholder mapping with relevance scoring",
      "Auto-generated, citation-aware intelligence reports",
    ],
    images: [],
    imagesPending: true,
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
      "Healthcare data is sensitive and role-bound: clinical staff and super admins need different surfaces over the same records, with medication adherence tracked from real hardware — all under HIPAA-aligned handling.",
    approach: [
      "Built a responsive, role-based platform (Clinical and Super Admin) with row-level security (RLS) and HIPAA-aligned data handling.",
      "Integrated Tenovi smart-pillbox hardware via webhooks for real-time medication-adherence tracking.",
      "Added in-platform device ordering and a vulnerability-scanning bot for continuous security hygiene.",
    ],
    highlights: [
      "Row-level security enforcing per-role data access",
      "Tenovi hardware webhooks for medication adherence",
      "In-platform device ordering",
      "Automated vulnerability-scanning bot",
    ],
    images: [],
    imagesPending: true,
  },
  {
    slug: "slack-bounty-bot",
    title: "Slack-Bounty-Bot",
    tagline: "Real-time Replit bounty notifier",
    year: "2025",
    status: "GitHub",
    featured: false,
    repoUrl: "https://github.com/Abu-BakarYasir/slack-bounty-bot",
    stack: ["Python", "Flask", "Firecrawl API", "Slack Webhooks", "Vercel"],
    problem:
      "High-value Replit bounties disappear fast. Watching the board manually doesn't scale — you need a filtered, real-time push the moment something worth your time appears.",
    approach: [
      "Built a Python microservice that scrapes and filters high-value Replit bounties in real time.",
      "Pushed automated Slack alerts via webhooks, deployed as a Flask API on Vercel.",
      "Ran continuous monitoring on a CRON schedule so nothing is missed.",
    ],
    highlights: [
      "Real-time scraping + filtering with Firecrawl",
      "Slack webhook alerts",
      "CRON-based continuous monitoring on Vercel",
    ],
    images: [],
    imagesPending: true,
  },
];

// Secondary open-source repos shown as a compact grid (no full case study).
export const openSource = [
  {
    name: "Rag_App",
    lang: "Python",
    summary:
      "Streamlit RAG over a PDF — ChromaDB + HuggingFace embeddings + Groq LLaMA3-70B, grounded strictly in the document.",
    url: "https://github.com/Abu-BakarYasir/Rag_App",
  },
  {
    name: "Email-agent",
    lang: "TypeScript · Python",
    summary:
      "Next.js 15 + Python Gmail agent — OAuth2 integration that auto-drafts replies and marks mail read.",
    url: "https://github.com/Abu-BakarYasir/Email-agent",
  },
  {
    name: "my_slack_mcp",
    lang: "Python",
    summary:
      "FastMCP Slack MCP server exposing tools (recent messages, per-user, LLM summarization); deployed to Smithery.",
    url: "https://smithery.ai/server/@Abu-BakarYasir/my_slack_mcp",
  },
  {
    name: "persistent_memory_chatbot",
    lang: "Python",
    summary:
      "Streamlit chatbot on Groq (llama3-8b) with Mem0.ai persistent memory that recalls user facts across sessions.",
    url: "https://github.com/Abu-BakarYasir/persistent_memory_chatbot",
  },
  {
    name: "Pakistani-currency-classification",
    lang: "Jupyter",
    summary: "CNN image classifier for Pakistani currency notes.",
    url: "https://github.com/Abu-BakarYasir/Pakistani-currency-classification-project-using-CNN",
  },
  {
    name: "voice_assistant",
    lang: "Python",
    summary: "Voice assistant experiment — speech in, LLM reasoning, spoken response.",
    url: "https://github.com/Abu-BakarYasir",
  },
];
