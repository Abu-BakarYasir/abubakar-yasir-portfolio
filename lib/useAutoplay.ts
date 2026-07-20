"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** How long a slide sits before the next one comes in, in milliseconds. */
  delay: number;
  /** Changing this restarts the countdown. Pass the active slide index, so a
   *  manual jump gets a full interval rather than advancing a moment later. */
  resetKey: unknown;
  onAdvance: () => void;
  /** False for single-slide carousels, where advancing is a no-op. */
  enabled?: boolean;
};

/**
 * Auto-advance for the project rail and the case-study gallery.
 *
 * Everything here is about not moving a slide out from under someone. It holds
 * while the pointer is over the carousel, while focus is inside it, and while
 * the tab is in the background, and it never runs at all under
 * prefers-reduced-motion — an unstoppable carousel is a genuine accessibility
 * problem, not just a preference.
 *
 * The media query and visibility state are read in an effect rather than during
 * render because the server cannot know either, and guessing wrong would start
 * a timer before we know it is welcome.
 */
export function useAutoplay({ delay, resetKey, onAdvance, enabled = true }: Options) {
  const [held, setHeld] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const [visible, setVisible] = useState(true);

  // Kept in a ref so a new callback identity each render doesn't restart the
  // countdown — only `resetKey` and the pause conditions should do that.
  const advance = useRef(onAdvance);
  advance.current = onAdvance;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setMotionOk(!mq.matches);
    const syncVisible = () => setVisible(!document.hidden);

    syncMotion();
    syncVisible();
    mq.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisible);
    return () => {
      mq.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisible);
    };
  }, []);

  const running = enabled && motionOk && visible && !held;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => advance.current(), delay);
    return () => window.clearTimeout(id);
  }, [running, delay, resetKey]);

  return {
    /** True while the countdown is actually ticking. Drives the progress bar. */
    running,
    /**
     * Spread onto the carousel root. Pointer enter/leave rather than mouse
     * enter/leave because touch fires them too: enter on touch start, leave on
     * touch end, which is exactly the hold window a swipe wants.
     */
    holdProps: {
      onPointerEnter: () => setHeld(true),
      onPointerLeave: () => setHeld(false),
      onFocusCapture: () => setHeld(true),
      onBlurCapture: () => setHeld(false),
    },
    setHeld,
  };
}
