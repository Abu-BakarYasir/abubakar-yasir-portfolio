import { ArrowUpRight } from "lucide-react";
import { projects, openSource } from "@/content/projects";
import { ProjectSlider } from "@/components/ui/ProjectSlider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        index="03"
        kicker="Selected work"
        title="Things I've built and shipped"
      />

      {/* Flagship case studies — a horizontal rail rather than a tall grid */}
      <Reveal y={28}>
        <ProjectSlider projects={featured} />
      </Reveal>

      {/* Open-source grid */}
      <Reveal className="mt-20">
        <div className="mb-8 flex items-center gap-4">
          <h3 className="font-display text-lg font-semibold">More on GitHub</h3>
          <span className="h-px flex-1 bg-[var(--color-glass-border)]" />
          <a
            href="https://github.com/Abu-BakarYasir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-accent)] hover:text-[var(--color-fg)]"
          >
            @Abu-BakarYasir
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {openSource.map((repo, i) => (
          <Reveal key={repo.name} delay={(i % 3) * 0.06}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)] hover:bg-[var(--color-glass-strong)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-[var(--color-fg)]">
                  {repo.name}
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--color-fg-faint)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>
              <p className="mt-2 text-sm leading-snug text-[var(--color-fg-muted)]">
                {repo.summary}
              </p>
              <span className="mt-3 inline-block font-mono text-[11px] text-[var(--color-fg-faint)]">
                {repo.lang}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
