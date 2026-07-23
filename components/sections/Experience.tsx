import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/profile";
import { GlassCard } from "@/components/glass/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-24 md:py-32"
    >
      <SectionHeading index="02" kicker="Experience" title="Where I've worked" />

      {/* Capped narrower than the section: the widened container is good for
          grids, but a single column of prose that runs the full 1440px is a
          punishing line length. The timeline sits left-aligned under the
          heading instead. */}
      <div className="relative max-w-4xl">
        {/* timeline spine */}
        <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,var(--color-accent),transparent)] md:left-[7px]" />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className="relative pl-8">
                <span className="absolute left-0 top-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-[var(--color-accent)] ring-4 ring-[color-mix(in_oklab,var(--color-accent)_20%,transparent)]" />
                <GlassCard className="group">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold">
                        {job.role}
                      </h3>
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 inline-flex items-center gap-1 text-[var(--color-accent)] transition-colors hover:text-[var(--color-fg)]"
                      >
                        {job.company}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <span className="rounded-full border border-[var(--color-glass-border)] px-3 py-1 font-mono text-xs text-[var(--color-fg-muted)]">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {job.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-[var(--color-fg-muted)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-2)]" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
