// Single source of truth for personal content. Edit here, not in JSX.

export const profile = {
  name: "Abu Bakar Yasir",
  firstName: "Abu Bakar",
  role: "Full-Stack & AI Engineer",
  // Hero headline — human, specific, first-person (not "passionate developer" filler).
  tagline:
    "I ship AI products end-to-end — from vector-retrieval pipelines and multi-agent orchestration to the deployed UI.",
  location: "Lahore, Pakistan",
  timezone: "PKT · UTC+5",
  availability: "Open to remote roles worldwide",
  experienceYears: "1+ yr",

  // Short About narrative — a couple of tight paragraphs.
  about: [
    "I'm a full-stack and AI engineer at Spiral Lab, where I've spent the last year shipping production systems that people actually depend on — multi-tenant SaaS platforms, retrieval-augmented generation pipelines, and multi-agent LLM orchestration.",
    "I like owning a feature from the data model and async pipeline all the way through to the deployed interface. That means I'm as comfortable tuning a hybrid-retrieval RAG system for clinical safety as I am wiring up the frontend that makes it usable.",
  ],

  contact: {
    email: "abubakarrao999@gmail.com",
    phone: "+92 315 4480975",
    phoneHref: "+923154480975",
    github: "https://github.com/Abu-BakarYasir",
    githubHandle: "Abu-BakarYasir",
    linkedin: "https://www.linkedin.com/in/abubakar-yasir-web-dev/",
    linkedinHandle: "abubakar-yasir-web-dev",
    resume: "/resume.pdf",
  },

  education: {
    degree: "BS Computer Engineering",
    school: "COMSATS University Islamabad (CUI)",
    period: "Sep 2022 – Jun 2026",
    detail: "CGPA 3.29 / 4.0 · Lahore, Pakistan",
  },
} as const;

export const experience = [
  {
    company: "Spiral Lab",
    role: "Full-Stack & AI Engineer",
    period: "Apr 2025 – Present",
    link: "https://www.linkedin.com/company/spiral-lab1/posts/?feedView=all",
    points: [
      "Shipped production-grade, full-stack applications end-to-end across 3+ products using Next.js, FastAPI, Django, Node.js, and Supabase/PostgreSQL — owning backend, AI layers, async pipelines, and frontend.",
      "Built AI-driven systems including RAG pipelines and multi-agent LLM orchestration (OpenAI, Anthropic Claude, Groq), integrating vector databases (Qdrant, ChromaDB) for low-latency semantic retrieval.",
      "Engineered secure, multi-tenant architectures with JWT auth, RBAC, row-level security, rate limiting, and audit logging, plus async pipelines (Django-Q2, Redis, WebSockets) deployed to Railway and Vercel with CI auto-deploy.",
    ],
  },
] as const;

export const skills = [
  {
    group: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    group: "AI / ML",
    items: [
      "RAG",
      "LLM Integration (OpenAI, Claude, Groq, Gemini)",
      "Multi-Agent Orchestration",
      "Embeddings",
      "Prompt Engineering",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    group: "Backend",
    items: [
      "FastAPI",
      "Django",
      "Django REST Framework",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    group: "Frontend",
    items: ["Next.js", "React.js", "Tailwind CSS"],
  },
  {
    group: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "ChromaDB",
      "Qdrant",
      "Neo4j",
    ],
  },
  {
    group: "DevOps & Tools",
    items: ["Docker", "Railway", "Vercel", "Redis", "Git", "GitHub", "Postman"],
  },
] as const;
