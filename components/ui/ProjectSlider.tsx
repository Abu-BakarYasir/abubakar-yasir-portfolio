"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

/**
 * Horizontal case-study rail.
 *
 * Built on native overflow scrolling + CSS scroll-snap rather than a carousel
 * library: touch swipe, trackpad, keyboard and screen-reader behaviour all
 * come for free and correct, and the cards still scroll if JS never loads.
 * The arrows and dots are progressive enhancement on top of that.
 */
export function ProjectSlider({ projects }: { projects: Project[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /** Reachable snap positions, which is fewer than the card count whenever
   *  several cards share a screen. One dot per card would leave trailing
   *  dots that can never activate. */
  const [pages, setPages] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Width of one card plus the gap — the distance one arrow press travels. */
  const step = () => {
    const rail = railRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return 0;
    const gap = parseFloat(getComputedStyle(rail).columnGap || "0") || 0;
    return card.offsetWidth + gap;
  };

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const s = step();
    const max = rail.scrollWidth - rail.clientWidth;
    const count = s > 0 ? Math.round(max / s) + 1 : 1;
    setPages(count);
    setActive(s > 0 ? Math.min(Math.round(rail.scrollLeft / s), count - 1) : 0);
    setAtStart(rail.scrollLeft < 8);
    // max is the largest scrollLeft; allow slack for sub-pixel rounding.
    setAtEnd(rail.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (dir: 1 | -1) =>
    railRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  const goTo = (i: number) =>
    railRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--color-fg-faint)]">
          Drag, swipe or use the arrows
        </p>
        <div className="flex items-center gap-2">
          <ArrowButton
            label="Previous project"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </ArrowButton>
          <ArrowButton
            label="Next project"
            disabled={atEnd}
            onClick={() => scrollBy(1)}
          >
            <ArrowRight className="h-4 w-4" />
          </ArrowButton>
        </div>
      </div>

      {/* Negative margin + padding lets cards bleed to the viewport edge on
          mobile while staying aligned with the section grid on desktop. */}
      <div
        ref={railRef}
        // scroll-pl-6 matches the padding, so the first card's snap position
        // is scrollLeft 0 rather than 24 — otherwise the rail never reports
        // itself as being at the start.
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-6 overflow-x-auto px-6 pb-2"
      >
        {projects.map((p) => (
          <div
            key={p.slug}
            className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[calc(50%-3rem)]"
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1} of ${pages}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-[var(--color-accent)]"
                  : "w-1.5 bg-[var(--color-glass-border)] hover:bg-[var(--color-fg-faint)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-[var(--color-fg-muted)] transition-all duration-300 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:text-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
