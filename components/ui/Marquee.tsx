"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** How long the strip stays still after the reader lets go. Long enough to
 *  read the card you stopped on, and long enough for touch momentum to finish
 *  before the drift starts nudging the same property again. */
const RESUME_DELAY_MS = 2500;

type Props = {
  /** Seconds for one full pass of the list. */
  duration: number;
  className?: string;
  /** The list rendered twice back to back — see the note below. Callers build
   *  it themselves so this stays a plain children boundary; passing a render
   *  function across it would mean shipping a function to the client. */
  children: React.ReactNode;
};

/**
 * Shared conveyor for the repo strip and the phone-width skills strip.
 *
 * The caller renders its list twice back to back. The strip is a real scroll
 * container and the drift is applied to `scrollLeft`, so one pass of the list
 * is exactly half the scrollable width — stepping back by that amount lands on
 * an identical frame and the wrap is invisible, in both directions.
 *
 * Driving scrollLeft rather than animating a transform is what lets the strip
 * be both auto-rotating and swipeable. A transform marquee needs
 * `overflow: hidden` to clip its track, which leaves the reader nothing to
 * drag; here the finger and the drift move the same property, so native touch
 * swipe and its momentum work exactly as they would on any scroller.
 *
 * The drift yields to the reader on any sign of intent — pointer down, hover,
 * wheel, keyboard focus — and stays yielded for a moment afterwards. Resuming
 * the instant a finger lifts would restart the strip at exactly the point
 * someone begins reading, and would fight the tail of touch momentum.
 */
export function Marquee({ duration, className, children }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  /** Held by the reader — the drift stands down while true. */
  const heldRef = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  const hold = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    heldRef.current = true;
  }, []);

  const release = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      heldRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let last = 0;
    // Tracked as a float of our own: reading scrollLeft back each frame would
    // lose the sub-pixel remainder, and at these speeds that is most of the
    // per-frame delta.
    let pos = el.scrollLeft;

    const step = (now: number) => {
      frame = requestAnimationFrame(step);

      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const half = el.scrollWidth / 2;
      if (half <= 0) return;

      if (heldRef.current || reduced.matches || document.hidden) {
        // The reader is in charge. Track where they've got to, so the drift
        // picks up from there instead of snapping back to where it left off.
        pos = el.scrollLeft;
        return;
      }

      pos += (half / duration) * dt;
      if (pos >= half) pos -= half;
      el.scrollLeft = pos;
    };

    // Swiping backwards past the start would otherwise hit a dead end. One pass
    // back is an identical frame, so this reads as an endless strip both ways.
    const onScroll = () => {
      if (reduced.matches || !heldRef.current) return;
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft < 1) {
        el.scrollLeft += half;
        pos = el.scrollLeft;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [duration]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  return (
    <div
      ref={scrollerRef}
      className={cn("marquee no-scrollbar", className)}
      // pointerenter/leave rather than mouseenter: on touch these fire at
      // press and release, which is exactly the hold window a swipe wants.
      onPointerEnter={hold}
      onPointerLeave={release}
      onPointerDown={hold}
      onPointerUp={release}
      onPointerCancel={release}
      onWheel={() => {
        hold();
        release();
      }}
      onFocusCapture={hold}
      onBlurCapture={release}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div className="marquee-track py-1">{children}</div>
    </div>
  );
}
