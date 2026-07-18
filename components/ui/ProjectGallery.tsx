"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/content/projects";
import { cn } from "@/lib/utils";

/** Slide direction follows navigation: forward enters from the right. */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
};

/**
 * Case-study screenshot gallery: one framed slide with prev/next controls and
 * a thumbnail strip, so a six-shot gallery costs one viewport instead of six.
 *
 * Slides are `object-contain` inside a fixed-height stage — the captures range
 * from 1440x900 to 1425x2670, and cropping a tall full-page shot to a uniform
 * box would hide most of it.
 */
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const count = images.length;
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number, dir: number) => {
      setState([((next % count) + count) % count, dir]);
    },
    [count],
  );

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  // Centre the active thumbnail by scrolling the strip itself. `scrollIntoView`
  // would also scroll the page, yanking the reader down to the gallery on load.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const strip = thumbsRef.current;
    const thumb = strip?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  const active = images[index];
  // Size the stage to the active shot: wide captures fill it with no dead
  // space, tall ones stay as large as the cap allows instead of shrinking to
  // fit a landscape box.
  const ratio = active ? (active.width ?? 16) / (active.height ?? 9) : 16 / 9;

  if (count === 0) return null;

  return (
    <div
      className="group/gallery relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      }}
    >
      {/* Stage */}
      <div className="glass relative overflow-hidden rounded-2xl p-1.5">
        <div
          className="relative mx-auto w-full overflow-hidden rounded-xl bg-[color-mix(in_oklab,var(--color-fg)_4%,transparent)]"
          style={{ aspectRatio: ratio, maxHeight: "78vh", minHeight: "260px" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={active.src}
              custom={direction}
              className="absolute inset-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                else if (info.offset.x > 60) prev();
              }}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain object-top"
                priority={index === 0}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              <Arrow side="left" onClick={prev} />
              <Arrow side="right" onClick={next} />
              <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-[var(--color-glass-border)] bg-[color-mix(in_oklab,var(--color-bg)_70%,transparent)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-fg-muted)] backdrop-blur-md">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Caption — reserves height so the layout doesn't jump between slides. */}
      <div className="mt-3 min-h-[2.5rem] px-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={active.src}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-center font-mono text-xs leading-relaxed text-[var(--color-fg-faint)]"
          >
            {active.caption ?? active.alt}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div
          ref={thumbsRef}
          className="mt-4 flex snap-x gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              data-thumb={i}
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to screenshot ${i + 1}: ${img.alt}`}
              aria-current={i === index}
              className={cn(
                "relative h-16 w-24 shrink-0 snap-start overflow-hidden rounded-lg border transition-all duration-300",
                i === index
                  ? "border-[var(--color-accent)] opacity-100 ring-1 ring-[color-mix(in_oklab,var(--color-accent)_50%,transparent)]"
                  : "border-[var(--color-glass-border)] opacity-45 hover:opacity-80",
              )}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous screenshot" : "Next screenshot"}
      className={cn(
        "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full",
        "border border-[var(--color-glass-border)] bg-[color-mix(in_oklab,var(--color-bg)_70%,transparent)]",
        "text-[var(--color-fg-muted)] backdrop-blur-md transition-all duration-300",
        "hover:border-[color-mix(in_oklab,var(--color-accent)_50%,transparent)] hover:text-[var(--color-fg)]",
        // Stay visible on touch, fade in on pointer devices.
        "opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 md:focus-visible:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
