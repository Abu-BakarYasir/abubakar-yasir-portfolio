import { ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-dvh max-w-[1440px] flex-col justify-center px-6 pt-28 pb-16">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        {/* Left — headline */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              </span>
              <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                {profile.availability}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              className="font-display font-bold leading-[1.02] tracking-tight"
              style={{ fontSize: "var(--text-hero)" }}
            >
              {profile.firstName} <br className="hidden sm:block" />
              <span className="text-gradient">Yasir</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.25em] text-[var(--color-accent)]">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <GlassButton href="#projects" variant="primary">
                View my work
                <ArrowUpRight className="h-4 w-4" />
              </GlassButton>
              <GlassButton href="#contact" variant="glass">
                Get in touch
              </GlassButton>
              <div className="ml-1 flex items-center gap-1">
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — whoami terminal card */}
        <div className="lg:col-span-5">
          <Reveal delay={0.2} y={32}>
            <GlassPanel refract sheen className="p-1.5">
              <div className="rounded-xl bg-[color-mix(in_oklab,var(--color-bg-elev)_82%,transparent)] p-5 font-mono text-sm">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-xs text-[var(--color-fg-faint)]">
                    ~ whoami
                  </span>
                </div>
                <ul className="space-y-2.5">
                  <Row k="name" v={profile.name} />
                  <Row k="role" v={profile.role} />
                  <Row k="focus" v="RAG · multi-agent · SaaS" />
                  <Row k="stack" v="Next.js · FastAPI · Django" />
                  <Row k="based" v={`${profile.location} · ${profile.timezone}`} />
                  <li className="flex gap-3">
                    <span className="w-14 shrink-0 text-[var(--color-accent-2)]">
                      status
                    </span>
                    <span className="flex items-center gap-2 text-[var(--color-fg)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      available for work
                    </span>
                  </li>
                </ul>
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-4 flex items-center gap-2 pl-1 text-xs text-[var(--color-fg-faint)]">
              <MapPin className="h-3.5 w-3.5" />
              {profile.education.school} · Class of 2026
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex gap-3">
      <span className="w-14 shrink-0 text-[var(--color-accent-2)]">{k}</span>
      <span className="text-[var(--color-fg)]">{v}</span>
    </li>
  );
}
