"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useAutoplay } from "@/lib/useAutoplay";
import { cn } from "@/lib/utils";

/** How long a card sits before the rail moves on. Long enough to read a title
 *  and a stack list, short enough that the rail reads as alive. */
const AUTOPLAY_MS = 3000;

/**
 * Horizontal case-study rail.
 *
 * Built on native overflow scrolling + CSS scroll-snap rather than a carousel
 * library: touch swipe, trackpad, keyboard and screen-reader behaviour all
 * come for free and correct, and the cards still scroll if JS never loads.
 * Arrows, dots, mouse-drag and autoplay are progressive enhancement on top.
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
  const [dragging, setDragging] = useState(false);

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

  const goTo = useCallback((i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const s = step();
    rail.scrollTo({ left: i * s, behavior: "smooth" });
  }, []);

  const scrollBy = (dir: 1 | -1) =>
    railRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  // Wraps at the end rather than stopping, so the rail keeps cycling for
  // anyone who leaves it alone. The arrows stay one-directional and disable.
  const { running, holdProps } = useAutoplay({
    delay: AUTOPLAY_MS,
    resetKey: active,
    enabled: pages > 1 && !dragging,
    onAdvance: () => goTo(active >= pages - 1 ? 0 : active + 1),
  });

  /* ---- Mouse drag -------------------------------------------------------
     Touch and trackpad already scroll this rail natively, so dragging is only
     wired up for `mouse` pointers. Anything else would fight the browser's own
     gesture handling and make swiping worse, not better. */
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    // A drag that ends off the rail never produces the click this flag is
    // waiting for, so clear it here rather than letting it eat a later one.
    suppressClick.current = false;
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { x: e.clientX, left: rail.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const rail = railRef.current;
    if (!d || !rail) return;
    const dx = e.clientX - d.x;
    // A few pixels of slop, so a slightly shaky click on a card still opens
    // the case study instead of being swallowed as a drag.
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      rail.setPointerCapture(e.pointerId);
    }
    if (d.moved) rail.scrollLeft = d.left - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    const rail = railRef.current;
    drag.current = null;
    if (!d || !rail) return;
    if (!d.moved) return;

    if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
    setDragging(false);
    // The click that follows this pointerup would otherwise open whichever
    // card happened to be under the cursor when the drag ended.
    suppressClick.current = true;
    const s = step();
    if (s > 0) goTo(Math.round(rail.scrollLeft / s));
  };

  return (
    <div {...holdProps}>
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (!suppressClick.current) return;
          suppressClick.current = false;
          e.preventDefault();
          e.stopPropagation();
        }}
        // scroll-pl-6 matches the padding, so the first card's snap position
        // is scrollLeft 0 rather than 24 — otherwise the rail never reports
        // itself as being at the start.
        className={cn(
          "no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-6 overflow-x-auto px-6 pb-2",
          // Snapping has to come off mid-drag or the rail fights the cursor.
          dragging && "rail-dragging",
        )}
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
          {Array.from({ length: pages }, (_, i) =>
            i === active ? (
              // The active dot doubles as the autoplay countdown. It is only
              // mounted while active, so moving on restarts the fill.
              <span
                key={i}
                aria-current
                className="relative block h-1.5 w-8 overflow-hidden rounded-full bg-[var(--color-glass-border)]"
              >
                <span
                  className="autoplay-fill absolute inset-0 rounded-full bg-[var(--color-accent)]"
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  data-paused={!running}
                />
              </span>
            ) : (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1} of ${pages}`}
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-glass-border)] transition-all duration-300 hover:bg-[var(--color-fg-faint)]"
              />
            ),
          )}
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
