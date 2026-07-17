import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassButton } from "@/components/glass/GlassButton";
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
    description: `${project.title} — ${project.tagline}. ${project.problem}`,
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

  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Minimal top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </Link>
          <Link href="/" className="font-display text-sm font-semibold">
            {profile.firstName}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
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
          <p className="mt-3 text-lg text-[var(--color-fg-muted)]">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <GlassButton href={project.liveUrl} variant="primary">
                <ExternalLink className="h-4 w-4" />
                Visit live site
              </GlassButton>
            )}
            {project.repoUrl && (
              <GlassButton href={project.repoUrl} variant="glass">
                <Github className="h-4 w-4" />
                Source
              </GlassButton>
            )}
          </div>
        </Reveal>

        {/* Cover / gallery */}
        {project.images.length > 0 ? (
          <div className="mt-14 space-y-6">
            {project.images.map((img, i) => (
              <Reveal key={img.src} delay={i === 0 ? 0 : 0.05} y={28}>
                <figure>
                  <GlassPanel className="overflow-hidden p-1.5">
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1600}
                        height={900}
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="h-auto w-full"
                        priority={i === 0}
                      />
                    </div>
                  </GlassPanel>
                  {img.caption && (
                    <figcaption className="mt-3 text-center font-mono text-xs text-[var(--color-fg-faint)]">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <GlassPanel className="grid place-items-center p-12 text-center">
              <p className="font-mono text-sm text-[var(--color-fg-muted)]">
                {project.imagesPending
                  ? "Screenshots coming soon."
                  : "No preview available."}
              </p>
            </GlassPanel>
          </Reveal>
        )}

        {/* Body */}
        <div className="mt-16 grid gap-12">
          <Reveal>
            <Block label="The problem">
              <p className="text-lg leading-relaxed text-[var(--color-fg-muted)]">
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

        {/* Next project */}
        <Reveal className="mt-20">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-6 transition-all duration-300 hover:border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)] hover:bg-[var(--color-glass-strong)]"
          >
            <span>
              <span className="font-mono text-xs text-[var(--color-fg-faint)]">
                Next project
              </span>
              <span className="mt-1 block font-display text-xl font-semibold">
                {next.title}
              </span>
            </span>
            <ArrowRight className="h-6 w-6 text-[var(--color-fg-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
          </Link>
        </Reveal>

        {/* Back home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            Back to home
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
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
