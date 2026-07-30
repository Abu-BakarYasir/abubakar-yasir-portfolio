import { ArrowUpRight } from "lucide-react";
import { openSource } from "@/content/projects";

/**
 * Open-source repos as a continuously scrolling marquee.
 *
 * The list is rendered twice back-to-back: the CSS track scrolls the width of
 * one pass and then wraps, so the second pass hides the seam. The duplicate
 * pass is decorative — hidden from assistive tech and taken out of the tab
 * order so each repo is announced and focusable exactly once. Hovering (or
 * tabbing into) the strip pauses it, via CSS, so a card can be clicked.
 */
export function GitHubMarquee() {
  const loop = [...openSource, ...openSource];

  return (
    <div
      className="gh-marquee no-scrollbar -mx-6 md:-mx-10"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div className="gh-marquee-track py-1">
        {loop.map((repo, i) => {
          const dupe = i >= openSource.length;
          return (
            <a
              key={`${repo.name}-${i}`}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={dupe || undefined}
              tabIndex={dupe ? -1 : undefined}
              className="group mr-6 flex w-[clamp(320px,30vw,460px)] shrink-0 flex-col rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:bg-[var(--color-glass-strong)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-base text-[var(--color-fg)]">
                  {repo.name}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--color-fg-faint)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
                {repo.summary}
              </p>
              <span className="mt-6 inline-block font-mono text-xs text-[var(--color-fg-faint)]">
                {repo.lang}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
