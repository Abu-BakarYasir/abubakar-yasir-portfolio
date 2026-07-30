import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import type { Project } from "@/content/projects";
import { ThemedImage } from "@/components/ui/ThemedImage";

/**
 * End-of-case-study navigation.
 *
 * The next project is set as large typography with its screenshot fading in
 * behind on hover. No client component needed — the reveal is pure
 * group-hover CSS, so this stays server-rendered.
 */
export function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  const cover = next.cover ?? next.images[0];

  return (
    <nav aria-label="More projects" className="mt-16 sm:mt-24">
      <Link
        href={`/projects/${next.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:shadow-[var(--shadow-card-hover)]"
      >
        {/* Screenshot sits behind the text, revealed on hover. */}
        {cover && (
          <div
            aria-hidden
            // `project-nav-cover` gives touch devices a permanent low-opacity
            // version of this. The reveal is the card's whole visual idea, and
            // hover-only meant every phone got a plain empty box.
            className="project-nav-cover pointer-events-none absolute inset-0 opacity-0 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-100"
          >
            {/* Decorative — the wrapper is aria-hidden, so the alt is cleared
                rather than repeating the cover description behind the title. */}
            <ThemedImage
              image={{ ...cover, alt: "" }}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-top"
            />
            {/* Keeps the headline legible over whatever the screenshot is. */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-bg)_25%,color-mix(in_oklab,var(--color-bg)_72%,transparent)_65%,color-mix(in_oklab,var(--color-bg)_45%,transparent))]" />
          </div>
        )}

        {/* p-8 plus a 48px circle plus gap-6 left about 136px for the title at
            320px, and the tagline was cut to roughly fifteen characters. */}
        <div className="relative flex items-center justify-between gap-4 p-5 sm:gap-6 sm:p-8 md:p-10">
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-faint)] sm:text-[11px] sm:tracking-[0.22em]">
              Next project
            </span>
            <h2
              className="mt-2 font-display font-bold leading-tight transition-colors duration-300 group-hover:text-[var(--color-accent)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              {next.title}
            </h2>
            {/* Two lines instead of one hard truncation — at this width `truncate`
                threw away most of the sentence it was meant to preview. */}
            <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-fg-muted)]">
              {next.tagline}
            </p>
          </div>

          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-[var(--color-fg-muted)] transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-ink)] sm:h-12 sm:w-12">
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/projects/${prev.slug}`}
          className="group inline-flex min-w-0 items-center gap-2 py-1 text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="shrink-0 font-mono text-xs uppercase tracking-wider">
            Prev
          </span>
          <span className="truncate">{prev.title}</span>
        </Link>

        <div className="flex items-center gap-5 font-mono text-xs">
          <Link
            href="/#projects"
            className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            All work
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
