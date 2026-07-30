import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/profile";
import { GlassCard } from "@/components/glass/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1240px] scroll-mt-[calc(var(--nav-h)+1.25rem)] px-6 py-12 md:px-10 md:py-20"
    >
      <SectionHeading index="02" kicker="Experience" title="Where I've worked" />

      {/* Capped narrower than the section: the widened container is good for
          grids, but a single column of prose that runs the full 1440px is a
          punishing line length. The timeline sits left-aligned under the
          heading instead. */}
      <div className="relative max-w-4xl">
        {/* timeline spine — pulled left on phones along with the gutter below */}
        <span className="absolute left-[5px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,var(--color-accent),transparent)] sm:left-[7px]" />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              {/* The 32px gutter plus a 24px card inset was eating 80px of a
                  320px screen, dropping the bullets to ~24 characters a line —
                  well under the readable floor. Both shrink on phones. */}
              <div className="relative pl-5 sm:pl-8">
                <span className="absolute left-0 top-2 grid h-2.5 w-2.5 place-items-center rounded-full bg-[var(--color-accent)] ring-4 ring-[color-mix(in_oklab,var(--color-accent)_20%,transparent)] sm:h-3.5 sm:w-3.5" />
                <GlassCard className="group p-4 sm:p-6">
                  {/* column-reverse on phones puts the period above the role
                      instead of letting it wrap to a left-aligned orphan under
                      the company link, where it read as unrelated. */}
                  <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                    <div className="min-w-0">
                      <h3
                        className="font-display font-semibold"
                        style={{ fontSize: "var(--text-h4)" }}
                      >
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
                    <span className="shrink-0 rounded-full border border-[var(--color-glass-border)] px-3 py-1 font-mono text-[11px] text-[var(--color-fg-muted)] sm:text-xs">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-3 sm:mt-5">
                    {job.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-sm text-[var(--color-fg-muted)] sm:gap-3 sm:text-base"
                      >
                        <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-2)]" />
                        <span className="min-w-0 leading-relaxed">{point}</span>
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
