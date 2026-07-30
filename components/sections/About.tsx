import { GraduationCap } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassCard } from "@/components/glass/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  { value: "1+", label: "year writing production code" },
  { value: "3", label: "products live with real users" },
  { value: "4+", label: "AI systems built" },
];

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1240px] scroll-mt-[calc(var(--nav-h)+1.25rem)] px-6 py-12 md:px-10 md:py-20"
    >
      <SectionHeading index="01" kicker="About" title="How I work" />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            {/* Below 420px these become one line each — value and label side by
                side — rather than three ~85px columns. Forced into thirds on a
                320px screen, "year writing production code" broke over five
                ragged lines and read as a layout bug. */}
            <div className="mt-8 grid gap-3 min-[420px]:grid-cols-3 min-[420px]:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline gap-3 min-[420px]:block"
                >
                  <div
                    className="shrink-0 font-display font-bold text-gradient"
                    style={{ fontSize: "var(--text-h3)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs leading-snug text-[var(--color-fg-faint)] min-[420px]:mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15} y={28}>
            <GlassCard interactive={false} className="group">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-glass-strong)]">
                <GraduationCap className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-display text-lg font-semibold">
                {profile.education.degree}
              </h3>
              <p className="mt-1 text-[var(--color-fg-muted)]">
                {profile.education.school}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--color-glass-border)] pt-4 font-mono text-xs text-[var(--color-fg-faint)]">
                <span>{profile.education.period}</span>
                <span>{profile.education.detail.split(" · ")[0]}</span>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
