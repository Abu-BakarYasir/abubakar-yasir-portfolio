import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassButton } from "@/components/glass/GlassButton";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { ProjectNav } from "@/components/ui/ProjectNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.title}: ${project.tagline}. ${project.problem}`,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  // Wrap in both directions so the rail is a loop, never a dead end.
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  const slides = project.cover
    ? [project.cover, ...project.images]
    : project.images;

  return (
    <>
      {/* Minimal top bar. max-w-[1240px] to match the home nav — it was max-w-5xl
          here, so the bar visibly changed width on navigation. */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div className="glass flex w-full max-w-[1240px] items-center justify-between gap-3 rounded-full px-4 py-2 sm:py-2.5">
          <Link
            href="/#projects"
            className="inline-flex min-w-0 items-center gap-2 py-1.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            All work
          </Link>
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="font-display text-sm font-semibold">
              {profile.firstName}
            </Link>
            {/* Was missing entirely here, so switching theme meant going home. */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-[calc(var(--nav-h)+2rem)] pb-20 sm:pt-32 sm:pb-24">
        {/* Hero */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-accent)]">
              {project.year}
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-fg-faint)]" />
            <span className="font-mono text-xs text-[var(--color-fg-muted)]">
              {project.status}
            </span>
          </div>
          <h1
            className="mt-4 font-display font-bold leading-[1.05]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {project.title}
          </h1>
          <p className="mt-3 text-base text-[var(--color-fg-muted)] sm:text-lg">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {project.liveUrl && (
              <GlassButton
                href={project.liveUrl}
                variant="primary"
                className="w-full sm:w-auto"
              >
                <ExternalLink className="h-4 w-4" />
                Visit live site
              </GlassButton>
            )}
            {project.repoUrl && (
              <GlassButton
                href={project.repoUrl}
                variant="glass"
                className="w-full sm:w-auto"
              >
                <Github className="h-4 w-4" />
                Source
              </GlassButton>
            )}
          </div>
        </Reveal>

        {/* Gallery — the designed cover leads, then the real screenshots. One
            carousel rather than a cover block stacked above a second gallery,
            so there is a single place to look. */}
        {slides.length > 0 ? (
          <Reveal className="mt-10 sm:mt-14" y={28}>
            <ProjectGallery images={slides} />
          </Reveal>
        ) : (
          <Reveal className="mt-10 sm:mt-14">
            <GlassPanel className="grid place-items-center p-8 text-center sm:p-12">
              <p className="font-mono text-sm text-[var(--color-fg-muted)]">
                {project.imagesPending
                  ? "Screenshots coming soon."
                  : "No preview available."}
              </p>
            </GlassPanel>
          </Reveal>
        )}

        {/* Body */}
        <div className="mt-12 grid gap-10 sm:mt-16 sm:gap-12">
          <Reveal>
            <Block label="The problem">
              <p className="text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
                {project.problem}
              </p>
            </Block>
          </Reveal>

          <Reveal>
            <Block label="Approach">
              <ul className="space-y-4">
                {project.approach.map((a, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-1 font-mono text-sm text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed text-[var(--color-fg-muted)]">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>

          <Reveal>
            <Block label="Highlights">
              <div className="grid gap-3 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-2.5 rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-4"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-2)]" />
                    <span className="text-sm leading-snug text-[var(--color-fg)]">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </Block>
          </Reveal>

          <Reveal>
            <Block label="Tech stack">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-[var(--color-glass-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-fg-muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Block>
          </Reveal>
        </div>

        <Reveal>
          <ProjectNav prev={prev} next={next} />
        </Reveal>
      </main>
    </>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
        {label}
      </h2>
      {children}
    </div>
  );
}
