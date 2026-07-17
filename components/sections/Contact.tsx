import { Mail, Phone, Github, Linkedin, FileDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassButton } from "@/components/glass/GlassButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.contact.phone,
    href: `tel:${profile.contact.phoneHref}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: `@${profile.contact.githubHandle}`,
    href: profile.contact.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: profile.contact.linkedinHandle,
    href: profile.contact.linkedin,
  },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading index="05" kicker="Contact" title="Let's build something" />

      <Reveal y={28}>
        <GlassPanel refract sheen className="overflow-hidden p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h3
                className="font-display font-semibold leading-tight"
                style={{ fontSize: "var(--text-h3)" }}
              >
                Open to remote roles & interesting problems.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-[var(--color-fg-muted)]">
                Whether it's an AI product to take from prototype to production or a
                full-stack build that needs shipping, my inbox is open. Based in{" "}
                {profile.location} ({profile.timezone}), working with US/EU hours.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <GlassButton href={`mailto:${profile.contact.email}`} variant="primary">
                  <Mail className="h-4 w-4" />
                  Say hello
                </GlassButton>
                <GlassButton href={profile.contact.resume} variant="glass">
                  <FileDown className="h-4 w-4" />
                  Résumé
                </GlassButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)]"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--color-glass-strong)] text-[var(--color-accent)]">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-faint)]">
                          {c.label}
                        </span>
                        <span className="block truncate text-sm text-[var(--color-fg)]">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[var(--color-fg-faint)] transition-colors group-hover:text-[var(--color-accent)]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
