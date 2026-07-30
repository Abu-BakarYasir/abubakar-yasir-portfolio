import { ArrowUpRight } from "lucide-react";
import { openSource } from "@/content/projects";
import { cn } from "@/lib/utils";

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
              className={cn(
                // The width was clamp(360px, …) — a hard 360px floor, so on a
                // 320px or 360px phone a single card was wider than the screen
                // and could never be seen whole. Below md it tracks the
                // viewport instead, leaving a deliberate peek of the next card.
                "group mr-4 flex min-h-[200px] w-[min(80vw,540px)] shrink-0 flex-col rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:bg-[var(--color-glass-strong)] md:mr-6 md:min-h-[240px] md:w-[clamp(360px,33vw,540px)] md:p-8",
                "gh-marquee-item",
                dupe && "gh-marquee-dupe",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h4
                  className="font-display font-semibold leading-snug text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]"
                  style={{ fontSize: "var(--text-h4)" }}
                >
                  {repo.title}
                </h4>
                <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-fg-faint)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)] md:text-base">
                {repo.summary}
              </p>
              <div className="mt-6 flex items-center justify-between gap-3 font-mono text-xs text-[var(--color-fg-faint)]">
                <span className="truncate">{repo.name}</span>
                <span className="shrink-0">{repo.lang}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
