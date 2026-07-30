import { skills } from "@/content/profile";
import { GlassCard } from "@/components/glass/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SkillGroup = (typeof skills)[number];

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1240px] scroll-mt-[calc(var(--nav-h)+1.25rem)] px-6 py-12 md:px-10 md:py-20"
    >
      <SectionHeading index="04" kicker="Toolkit" title="What I work with" />

      {/* Phones get the same conveyor as the repo strip. Six near-identical
          cards in a single column made this the longest section on the page for
          the least content, and nothing about a flat list rewarded the scroll.
          Only one of these two blocks is ever displayed, so the duplicated
          markup never reaches the accessibility tree twice. */}
      <div className="-mx-6 sm:hidden">
        <Marquee duration={40}>
          {[...skills, ...skills].map((group, i) => {
            const dupe = i >= skills.length;
            return (
              <SkillGroupCard
                key={`${group.group}-${i}`}
                group={group}
                dupe={dupe}
                className={cn(
                  "marquee-item mr-4 w-[74vw] shrink-0",
                  dupe && "marquee-dupe",
                )}
              />
            );
          })}
        </Marquee>
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.06}>
            <SkillGroupCard group={group} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillGroupCard({
  group,
  dupe,
  className,
}: {
  group: SkillGroup;
  dupe?: boolean;
  className?: string;
}) {
  return (
    <GlassCard
      interactive={false}
      // The second marquee pass is decorative — it exists to hide the loop
      // seam, so it must not be announced a second time.
      aria-hidden={dupe || undefined}
      className={cn("p-4 sm:p-6", className)}
    >
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
  );
}
