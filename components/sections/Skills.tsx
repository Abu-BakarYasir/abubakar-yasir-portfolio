import { skills } from "@/content/profile";
import { GlassCard } from "@/components/glass/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { Reveal } from "@/components/motion/Reveal";

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1240px] scroll-mt-[calc(var(--nav-h)+1.25rem)] px-6 py-12 md:px-10 md:py-20"
    >
      <SectionHeading
        index="04"
        kicker="Toolkit"
        title="What I work with"
      />

      {/* Two up from 480px rather than 640px. Single-column, six near-identical
          cards made this the longest section on the page for the least content,
          with no rhythm to break the scroll. */}
      <div className="grid gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.06}>
            <GlassCard interactive={false} className="h-full p-4 sm:p-6">
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] sm:mb-3.5">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group/pill inline-flex items-center gap-1.5 rounded-md border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-2 py-1 text-[12.5px] text-[var(--color-fg-muted)] transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)] hover:text-[var(--color-fg)]"
                  >
                    <SkillIcon
                      name={item}
                      className="h-3.5 w-3.5 shrink-0 text-[var(--color-fg-faint)] transition-colors group-hover/pill:text-[var(--color-accent)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
