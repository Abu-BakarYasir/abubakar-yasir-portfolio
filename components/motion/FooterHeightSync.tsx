"use client";

import { useEffect } from "react";

/**
 * Keeps `--footer-h` equal to the reveal footer's real height.
 *
 * The footer is `position: fixed`, so it's out of flow and contributes no
 * height of its own — `body` has to reserve that space as bottom padding or
 * the last section would sit permanently on top of the footer and it could
 * never be scrolled into view. Renders nothing.
 */
export function FooterHeightSync() {
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!footer) return;

    const root = document.documentElement;

    /* Hysteresis around the fits-on-screen test. Mobile browsers grow and
       shrink innerHeight by ~60-100px as the URL bar hides and reveals during
       normal scrolling. With a single threshold, a footer sitting near that
       boundary flips pinned/unpinned mid-scroll — `position` changes between
       fixed and static and body's padding-bottom appears and disappears, which
       reads as the page jumping under the finger. Pinning now needs clear room
       and unpinning needs a clear overflow, so the URL bar can't straddle it. */
    const PIN_MARGIN = 72;
    const UNPIN_MARGIN = 8;

    const sync = () => {
      const height = footer.offsetHeight;
      root.style.setProperty("--footer-h", `${height}px`);

      // Only pin the footer if the whole thing fits on screen. On short
      // viewports (small phones, landscape) a pinned footer taller than the
      // viewport would strand its top rows above it, unreachable by scrolling.
      const pinned = root.classList.contains("footer-reveal");
      const limit = window.innerHeight - (pinned ? UNPIN_MARGIN : PIN_MARGIN);
      root.classList.toggle("footer-reveal", height <= limit);
    };

    sync();

    // A resize that changes only the height, on a viewport that hasn't rotated,
    // is almost always the URL bar. The footer's own height is watched below,
    // so ignoring those costs nothing and removes the main source of churn.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      sync();
    };
    window.addEventListener("resize", onResize);

    // Catches height changes the resize event misses — font swap, text
    // reflow at a breakpoint, links wrapping to a second line. Also covers the
    // orientation change that `onResize` above deliberately narrows to.
    const observer = new ResizeObserver(sync);
    observer.observe(footer);

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      root.style.removeProperty("--footer-h");
      root.classList.remove("footer-reveal");
    };
  }, []);

  return null;
}
