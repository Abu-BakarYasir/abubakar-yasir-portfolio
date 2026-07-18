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

    const sync = () => {
      const height = footer.offsetHeight;
      root.style.setProperty("--footer-h", `${height}px`);
      // Only pin the footer if the whole thing fits on screen. On short
      // viewports (small phones, landscape) a pinned footer taller than the
      // viewport would strand its top rows above it, unreachable by scrolling.
      // The margin leaves a sliver of page visible above it.
      root.classList.toggle("footer-reveal", height <= window.innerHeight - 48);
    };

    sync();
    window.addEventListener("resize", sync);

    // Catches height changes the resize event misses — font swap, text
    // reflow at a breakpoint, links wrapping to a second line.
    const observer = new ResizeObserver(sync);
    observer.observe(footer);

    return () => {
      window.removeEventListener("resize", sync);
      observer.disconnect();
      root.style.removeProperty("--footer-h");
      root.classList.remove("footer-reveal");
    };
  }, []);

  return null;
}
