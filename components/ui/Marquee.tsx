"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** How long the strip stays still after a touch ends. Long enough to read the
 *  card you stopped on, short enough that the strip doesn't look broken. */
const RESUME_DELAY_MS = 4000;

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
 * The caller renders its list twice back to back: the CSS track scrolls the
 * width of one pass and then wraps, so the second pass hides the seam. That
 * duplicate pass is decorative and should be marked `.marquee-dupe` plus
 * aria-hidden, so each item is announced and focusable exactly once.
 *
 * Hover and focus pause the strip via CSS. Touch can do neither, so the pause
 * is also driven from pointer events here. It deliberately lingers for a few
 * seconds after the finger lifts: pausing only while held would mean the strip
 * lurches back into motion the instant you let go, which is exactly when you
 * start reading. These are passive listeners and don't swallow the tap, so
 * links underneath still activate normally.
 */
export function Marquee({ duration, className, children }: Props) {
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  const hold = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    setPaused(true);
  }, []);

  const release = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(
      () => setPaused(false),
      RESUME_DELAY_MS,
    );
  }, []);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  return (
    <div
      className={cn("marquee no-scrollbar", className)}
      data-paused={paused ? "true" : undefined}
      onPointerDown={hold}
      onPointerUp={release}
      onPointerCancel={release}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div
        className="marquee-track py-1"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {children}
      </div>
    </div>
  );
}
