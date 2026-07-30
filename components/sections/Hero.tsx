import { ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    // Top padding is derived from the real nav height rather than a flat
    // pt-28: on mobile that was 112px of dead space above a ~72px bar, which
    // pushed the terminal card — the best visual on the page — entirely below
    // the fold and left the CTAs sitting on it.
    <section className="relative mx-auto flex min-h-dvh max-w-[1240px] flex-col justify-center px-6 pt-[calc(var(--nav-h)+1.5rem)] pb-14 md:px-10 md:pt-28 md:pb-16">
      <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-12">
        {/* Left — headline */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 md:mb-6">
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
              {/* Unconditional break. This was `hidden sm:block`, so below 640px
                  the two-line lockup depended on the headline happening to wrap
                  at the right word — true at every current width, but by
                  measurement rather than by design. */}
              {profile.firstName} <br />
              <span className="text-gradient">Yasir</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-sm sm:tracking-[0.25em]">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:mt-6 md:text-lg">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            {/* Stacked and full-bleed on phones. Side by side, these two pills
                plus the icon pair overflowed 320px and wrapped into three ragged
                rows with the socials orphaned on the last one. */}
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
              <GlassButton
                href="#projects"
                variant="primary"
                className="w-full sm:w-auto"
              >
                View my work
                <ArrowUpRight className="h-4 w-4" />
              </GlassButton>
              <GlassButton
                href="#contact"
                variant="glass"
                className="w-full sm:w-auto"
              >
                Get in touch
              </GlassButton>
              <div className="flex items-center justify-center gap-1 sm:ml-1 sm:justify-start">
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]"
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
              {/* text-xs on phones: at text-sm the fixed label gutter left about
                  150px for values, so half the rows wrapped and the key/value
                  alignment that is the whole point of the card fell apart. */}
              <div className="rounded-xl bg-[color-mix(in_oklab,var(--color-bg-elev)_82%,transparent)] p-4 font-mono text-xs sm:p-5 sm:text-sm">
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
                  {/* Location only. Appending the timezone guaranteed a second
                      line on every phone, and the timezone is already stated in
                      Contact and again in the footer. */}
                  <Row k="based" v={profile.location} />
                  <li className="flex gap-2.5 sm:gap-3">
                    <span className="w-12 shrink-0 text-[var(--color-accent-2)] sm:w-14">
                      status
                    </span>
                    <span className="flex min-w-0 items-center gap-2 text-[var(--color-fg)]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      available for work
                    </span>
                  </li>
                </ul>
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-4 flex items-start gap-2 pl-1 text-xs text-[var(--color-fg-faint)]">
              <MapPin className="mt-px h-3.5 w-3.5 shrink-0" />
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
    <li className="flex gap-2.5 sm:gap-3">
      <span className="w-12 shrink-0 text-[var(--color-accent-2)] sm:w-14">{k}</span>
      <span className="min-w-0 text-[var(--color-fg)]">{v}</span>
    </li>
  );
}
