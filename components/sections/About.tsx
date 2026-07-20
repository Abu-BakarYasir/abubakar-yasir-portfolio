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
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading index="01" kicker="About" title="How I work" />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-5 text-lg leading-relaxed text-[var(--color-fg-muted)]">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-display font-bold text-gradient"
                    style={{ fontSize: "var(--text-h3)" }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-[var(--color-fg-faint)]">
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
