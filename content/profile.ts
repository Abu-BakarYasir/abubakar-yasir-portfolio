// Single source of truth for personal content. Edit here, not in JSX.

export const profile = {
  name: "Abu Bakar Yasir",
  firstName: "Abu Bakar",
  role: "Full-Stack & AI Engineer",
  // Hero headline. Written to say something specific about the work rather
  // than the usual "passionate developer" filler.
  tagline:
    "I build AI products from the database up to the screen people actually click. Right now that means RAG systems and multi-agent tooling at Spiral Lab.",
  location: "Lahore, Pakistan",
  timezone: "PKT · UTC+5",
  availability: "Open to remote work, anywhere",
  experienceYears: "1+ yr",

  // Short About narrative.
  about: [
    "I'm a full-stack and AI engineer at Spiral Lab in Lahore. Over the past year I've worked on three products that are now in front of real users: a public affairs platform for UK consultancies, a healthcare monitoring SaaS, and a medical RAG system for clinical questions.",
    "What I actually like is owning a feature all the way down. The schema, the background jobs, the retrieval layer, the API, and then the screen it ends up on. Most of the AI work I've done falls apart in the seams between those layers, so being able to move across all of them turns out to be the useful part.",
    "I'm finishing a computer engineering degree at COMSATS alongside this, graduating in mid 2026.",
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
      "Worked across three products at the same time, owning the backend, the AI layer, the async pipelines and the frontend on each one. Mostly Next.js, FastAPI, Django, Node.js and Postgres via Supabase.",
      "Built the AI side: retrieval pipelines and multi-agent orchestration on OpenAI, Claude and Groq, with Qdrant and ChromaDB handling vector search.",
      "Did the load-bearing unglamorous parts too. JWT auth, role-based access, row-level security, rate limiting, audit logging, and background queues on Django-Q2 and Redis, deployed to Railway and Vercel with auto-deploy on push.",
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
