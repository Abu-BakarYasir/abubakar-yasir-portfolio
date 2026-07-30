import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";

const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { href: profile.contact.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: profile.contact.github, label: "GitHub", icon: Github },
  { href: `mailto:${profile.contact.email}`, label: "Email", icon: Mail },
];

/**
 * Reveal footer — pinned to the viewport bottom behind .page-shell.
 * See the `.site-footer` rules in globals.css for how the reveal works.
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="relative mx-auto max-w-[1240px] px-6 pb-7 pt-10 md:px-10 md:pb-8 md:pt-16">
        {/* Contact and Explore sit side by side from 480px. Fully stacked, the
            footer ran ~700px tall — past the viewport on most phones, which
            switched off the reveal entirely (see FooterHeightSync) and left a
            very long dead scroll at the end of the page. */}
        <div className="grid gap-8 min-[480px]:grid-cols-2 md:grid-cols-12 md:gap-12">
          {/* Brand + socials */}
          <div className="min-[480px]:col-span-2 md:col-span-5">
            <Link href="/" className="group flex items-center gap-2.5 font-display font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))] font-mono text-xs text-[var(--color-ink)]">
                AB
              </span>
              <span>{profile.name}</span>
            </Link>

            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
              {profile.role}
            </p>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)] md:mt-5">
              Building AI products from the retrieval layer up to the interface.
              {" "}
              {profile.availability}.
            </p>

            <ul className="mt-5 flex items-center gap-2.5 md:mt-7">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="hit-target relative grid h-10 w-10 place-items-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-[var(--color-fg-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:text-[var(--color-accent)]"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details — moved here now that the Contact section is slimmed */}
          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
              Get in touch
            </h2>
            {/* `break-all` split the address at whatever character hit the edge,
                mid-word. `anywhere` only breaks when a line genuinely cannot
                fit, and prefers the existing break opportunities first. */}
            <a
              href={`mailto:${profile.contact.email}`}
              className="mt-3 block font-display text-base text-[var(--color-fg)] transition-colors [overflow-wrap:anywhere] hover:text-[var(--color-accent)] sm:text-lg md:mt-4"
            >
              {profile.contact.email}
            </a>
            <a
              href={`tel:${profile.contact.phoneHref}`}
              className="mt-1.5 block text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {profile.contact.phone}
            </a>
            <p className="mt-4 text-sm text-[var(--color-fg-muted)] md:mt-5">
              {profile.location}
              <span className="mt-0.5 block text-[var(--color-fg-faint)]">
                {profile.timezone} · working US/EU hours
              </span>
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
              Explore
            </h2>
            <ul className="mt-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/#${l.id}`}
                    className="block border-b border-[var(--color-glass-border)] py-3 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Meta bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--color-glass-border)] pt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-fg-faint)] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-[11px] sm:tracking-[0.14em] md:mt-12 md:pt-6">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Lahore, PK · {profile.availability}</p>
        </div>
      </div>
    </footer>
  );
}
