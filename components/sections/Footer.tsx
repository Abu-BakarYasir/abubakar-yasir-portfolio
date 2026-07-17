import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10 pt-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-glass-border)] pt-8 sm:flex-row">
        <p className="font-mono text-xs text-[var(--color-fg-faint)]">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & liquid glass.
        </p>
        <div className="flex items-center gap-5 font-mono text-xs text-[var(--color-fg-faint)]">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            GitHub
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
