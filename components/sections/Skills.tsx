import { skills } from "@/content/profile";
import { GlassCard } from "@/components/glass/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        index="04"
        kicker="Toolkit"
        title="Languages, frameworks & infrastructure"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.06}>
            <GlassCard interactive={false} className="h-full">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-2.5 py-1 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)] hover:text-[var(--color-fg)]"
                  >
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
