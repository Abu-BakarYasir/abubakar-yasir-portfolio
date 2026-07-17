"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number; // seconds
  y?: number; // px rise distance
};

/**
 * Scroll-triggered reveal driven by CSS + IntersectionObserver.
 * Visible by default (no-JS safe); the `.js` gate in globals.css hides it only
 * when JS is present, then this observer adds `.is-visible` when in view.
 * Honors prefers-reduced-motion via CSS.
 */
export function Reveal({ delay = 0, y = 24, className, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything already in (or near) the viewport at mount reveals immediately —
    // no dependence on the observer for above-the-fold content.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{
        transitionDelay: `${delay}s`,
        ["--reveal-y" as string]: `${y}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
