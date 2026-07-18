import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/content/projects";
import { GlassCard } from "@/components/glass/GlassCard";
import { ThemedImage } from "@/components/ui/ThemedImage";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard
      className="group relative flex cursor-pointer flex-col p-0 focus-within:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)]"
      refract={false}
    >
      <ProjectMedia project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">{project.title}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-1.5 text-[var(--color-fg-muted)]">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <span
              key={s}
              className="rounded-md border border-[var(--color-glass-border)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-fg-muted)]"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="px-1 py-0.5 font-mono text-[11px] text-[var(--color-fg-faint)]">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-glass-border)] pt-4">
          {/* `after:` overlay stretches this link across the whole card, so a
              click anywhere — image, title, tags — opens the case study.
              Keeps one anchor, so no invalid nesting and one tab stop. */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-fg)] outline-none transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-[var(--color-accent)]"
          >
            Case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {/* Raised above the overlay so these stay independently clickable. */}
          <span className="relative z-10 ml-auto flex items-center gap-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository`}
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const cover = project.cover ?? project.images[0];

  return (
    // 16/9 matches the cover art exactly. The covers carry their own title
    // typography, so a mismatched frame would crop words off the edge.
    <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl border-b border-[var(--color-glass-border)]">
      {cover ? (
        <ThemedImage
          image={cover}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      ) : (
        <PlaceholderMedia title={project.title} pending={project.imagesPending} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--media-scrim),transparent_55%)]" />
    </div>
  );
}

/** On-brand gradient placeholder used until real screenshots arrive. */
function PlaceholderMedia({ title, pending }: { title: string; pending?: boolean }) {
  const initials = title
    .replace(/[^a-zA-Z ]/g, "")
    .split(/[\s-]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_120%_at_20%_0%,rgba(232,167,60,0.22),transparent_45%),radial-gradient(120%_120%_at_100%_100%,rgba(192,96,58,0.28),transparent_50%)]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-glass-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-glass-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <span className="font-display text-5xl font-bold text-[var(--color-fg)] opacity-90">
        {initials}
      </span>
      {pending && (
        <span className="absolute bottom-3 right-3 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-fg-muted)]">
          preview soon
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles: Record<Project["status"], string> = {
    Live: "text-[var(--color-accent)] border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)]",
    GitHub: "text-[var(--color-fg-muted)] border-[var(--color-glass-border)]",
    "In progress":
      "text-[var(--color-accent-2)] border-[color-mix(in_oklab,var(--color-accent-2)_40%,transparent)]",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] ${styles[status]}`}
    >
      {status === "Live" && (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      )}
      {status}
    </span>
  );
}
