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
      <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-14 md:pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + socials */}
          <div className="md:col-span-5">
            <Link href="/" className="group flex items-center gap-2.5 font-display font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))] font-mono text-xs text-[var(--color-ink)]">
                AB
              </span>
              <span>{profile.name}</span>
            </Link>

            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-faint)]">
              {profile.role}
            </p>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--color-fg-muted)]">
              Building AI products from the retrieval layer up to the interface.
              {" "}
              {profile.availability}.
            </p>

            <ul className="mt-7 flex items-center gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-[var(--color-fg-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:text-[var(--color-accent)]"
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
            <a
              href={`mailto:${profile.contact.email}`}
              className="mt-4 block break-all font-display text-lg text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
            >
              {profile.contact.email}
            </a>
            <a
              href={`tel:${profile.contact.phoneHref}`}
              className="mt-1.5 block text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {profile.contact.phone}
            </a>
            <p className="mt-5 text-sm text-[var(--color-fg-muted)]">
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
        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-glass-border)] pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Lahore, PK · {profile.availability}</p>
        </div>
      </div>
    </footer>
  );
}
