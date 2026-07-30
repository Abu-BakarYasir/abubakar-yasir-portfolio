// Single source of truth for personal content. Edit here, not in JSX.

export const profile = {
  name: "Abu Bakar Yasir",
  firstName: "Abu Bakar",
  role: "Full-Stack & AI Engineer",
  // Hero headline. Written to say something specific about the work rather
  // than the usual "passionate developer" filler.
  tagline:
    "Taking AI from prototype to product: retrieval, agents, and the polished frontend that ships around them. Built to hold up for real users, not just demos.",
  location: "Lahore, Pakistan",
  timezone: "PKT · UTC+5",
  availability: "Open to remote work, anywhere",
  experienceYears: "1+ yr",

  // Short About narrative.
  about: [
    "I'm a full-stack and AI engineer at Spiral Lab in Lahore. Over the past year I've shipped three products that are now in real users' hands: a public-affairs platform for UK consultancies, a healthcare-monitoring SaaS, and a medical assistant that answers clinical questions from source documents.",
    "What I'm good at is owning a feature end to end: the database, the background jobs, the retrieval and API layers, and the screen it finally lands on. AI products tend to break in the seams between those layers, and being fluent across all of them is where I do my best work.",
    "I recently graduated from COMSATS with a degree in computer engineering, which I built alongside this work.",
  ],

  contact: {
    email: "abubakarrao999@gmail.com",
    phone: "+92 315 4480975",
    phoneHref: "+923154480975",
    github: "https://github.com/Abu-BakarYasir",
    githubHandle: "Abu-BakarYasir",
    linkedin: "https://www.linkedin.com/in/abubakar-yasir-web-dev/",
    linkedinHandle: "abubakar-yasir-web-dev",
    // Two cuts of the same CV: a plain one that survives résumé parsers, and a
    // designed one for people who are actually going to look at it.
    resume: "/resume.pdf",
    resumeVisual: "/resume-visual.pdf",
  },

  education: {
    degree: "BS Computer Engineering",
    school: "COMSATS University Islamabad (CUI)",
    period: "Sep 2022 - Jun 2026",
    detail: "CGPA 3.29 / 4.0 · Lahore, Pakistan",
  },
} as const;

export const experience = [
  {
    company: "Spiral Lab",
    role: "Full-Stack & AI Engineer",
    period: "Apr 2025 - Present",
    link: "https://www.linkedin.com/company/spiral-lab1/posts/?feedView=all",
    points: [
      "Shipped three products at once, owning the backend, AI layer, async pipelines and frontend on each. Mostly Next.js, FastAPI, Django, Node.js and Postgres on Supabase.",
      "Built the AI layer: retrieval pipelines and multi-agent orchestration across OpenAI, Claude and Groq, with Qdrant and ChromaDB for vector search.",
      "Owned the unglamorous but load-bearing parts too: JWT auth, role-based access, row-level security, rate limiting, audit logging and background queues on Django-Q2 and Redis, all auto-deployed to Railway and Vercel.",
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
