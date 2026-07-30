import type { ComponentType } from "react";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiNeo4J,
  SiDocker,
  SiRailway,
  SiVercel,
  SiRedis,
  SiGit,
  SiGithub,
  SiPostman,
  SiQdrant,
} from "react-icons/si";
import {
  Database,
  Search,
  Brain,
  Workflow,
  Boxes,
  MessageSquareText,
  Webhook,
  PlugZap,
} from "lucide-react";

type Icon = ComponentType<{ className?: string }>;

/**
 * Maps a skill label to its icon. Real brand marks (Simple Icons) where they
 * exist; a generic Lucide glyph for the concept-only entries that have no
 * logo (RAG, embeddings, prompt engineering, …). Keyed by the exact label in
 * content/profile.ts, so a rename there needs a matching key here.
 */
const ICONS: Record<string, Icon> = {
  // Languages
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  SQL: Database,

  // AI / ML
  RAG: Search,
  "LLM Integration (OpenAI, Claude, Groq, Gemini)": Brain,
  "Multi-Agent Orchestration": Workflow,
  Embeddings: Boxes,
  "Prompt Engineering": MessageSquareText,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,

  // Backend
  FastAPI: SiFastapi,
  Django: SiDjango,
  "Django REST Framework": SiDjango,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": Webhook,
  WebSockets: PlugZap,

  // Frontend
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  "Tailwind CSS": SiTailwindcss,

  // Databases
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Supabase: SiSupabase,
  ChromaDB: Database,
  Qdrant: SiQdrant,
  Neo4j: SiNeo4J,

  // DevOps & Tools
  Docker: SiDocker,
  Railway: SiRailway,
  Vercel: SiVercel,
  Redis: SiRedis,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
};

export function SkillIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden />;
}
