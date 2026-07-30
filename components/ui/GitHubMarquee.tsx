import { ArrowUpRight } from "lucide-react";
import { openSource } from "@/content/projects";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

type Repo = (typeof openSource)[number];

/** Open-source repos as a continuously scrolling strip. See <Marquee>. */
export function GitHubMarquee() {
  const loop = [...openSource, ...openSource];

  return (
    <Marquee duration={46} className="-mx-6 md:-mx-10">
      {loop.map((repo, i) => (
        <RepoCard
          key={`${repo.name}-${i}`}
          repo={repo}
          dupe={i >= openSource.length}
        />
      ))}
    </Marquee>
  );
}

function RepoCard({ repo, dupe }: { repo: Repo; dupe: boolean }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={dupe || undefined}
      tabIndex={dupe ? -1 : undefined}
      className={cn(
        // The width was clamp(360px, …) — a hard 360px floor, so on a 360px
        // phone a card was wider than the screen and could never be seen
        // whole. Below md it tracks the viewport and leaves a peek of the next.
        "marquee-item group mr-4 flex min-h-[200px] w-[min(80vw,540px)] shrink-0 flex-col rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:bg-[var(--color-glass-strong)] md:mr-6 md:min-h-[240px] md:w-[clamp(360px,33vw,540px)] md:p-8",
        dupe && "marquee-dupe",
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
}
