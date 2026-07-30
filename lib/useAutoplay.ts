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
 * the tab is in the background; it never runs under prefers-reduced-motion, and
 * never runs on a device that cannot hover — an unstoppable carousel is a
 * genuine accessibility problem, not just a preference.
 *
 * The media query and visibility state are read in an effect rather than during
 * render because the server cannot know either, and guessing wrong would start
 * a timer before we know it is welcome.
 */
export function useAutoplay({ delay, resetKey, onAdvance, enabled = true }: Options) {
  const [held, setHeld] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const [visible, setVisible] = useState(true);
  const [canHold, setCanHold] = useState(false);

  // Kept in a ref so a new callback identity each render doesn't restart the
  // countdown — only `resetKey` and the pause conditions should do that.
  const advance = useRef(onAdvance);
  advance.current = onAdvance;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // The whole safety story below rests on the reader being able to *hold* the
    // carousel by hovering it. A touch device can't: pointerenter only fires
    // while a finger is actually down, so someone simply reading a card gets it
    // swapped out from under them every few seconds with no way to stop it.
    // Where there's no hover there's no hold, so there's no autoplay.
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncMotion = () => setMotionOk(!mq.matches);
    const syncHover = () => setCanHold(hoverMq.matches);
    const syncVisible = () => setVisible(!document.hidden);

    syncMotion();
    syncHover();
    syncVisible();
    mq.addEventListener("change", syncMotion);
    hoverMq.addEventListener("change", syncHover);
    document.addEventListener("visibilitychange", syncVisible);
    return () => {
      mq.removeEventListener("change", syncMotion);
      hoverMq.removeEventListener("change", syncHover);
      document.removeEventListener("visibilitychange", syncVisible);
    };
  }, []);

  const running = enabled && motionOk && canHold && visible && !held;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => advance.current(), delay);
    return () => window.clearTimeout(id);
  }, [running, delay, resetKey]);

  return {
    /** True while the countdown is actually ticking. Drives the progress bar. */
    running,
    /**
     * True when autoplay exists at all for this visitor — as opposed to being
     * momentarily held. Carousels use it to decide whether to render a
     * countdown indicator: on touch, or under reduced motion, a progress track
     * that can never fill is just a control that looks broken.
     */
    available: enabled && motionOk && canHold,
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
