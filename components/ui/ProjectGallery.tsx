"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/content/projects";
import { ThemedImage } from "@/components/ui/ThemedImage";
import { useAutoplay } from "@/lib/useAutoplay";
import { cn } from "@/lib/utils";

/** Longer than the home rail's interval: these are dense screenshots, and a
 *  full-page capture takes a moment to take in. */
const AUTOPLAY_MS = 4000;

/** Slide direction follows navigation: forward enters from the right. */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
};

/**
 * Case-study image carousel: the designed cover and the real screenshots in a
 * single stage, so the page has one place to look rather than two stacked
 * image blocks.
 *
 * Slides are `object-contain` inside a stage sized to the active shot — the
 * images range from a 16:9 cover to a 1425x2670 full-page capture, and
 * cropping those to one uniform box would hide most of the tall ones.
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

  const { running, holdProps, setHeld } = useAutoplay({
    delay: AUTOPLAY_MS,
    resetKey: index,
    enabled: count > 1,
    onAdvance: next,
  });

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
  // fit a landscape box. Transitioned, because the cover and a full-page
  // screenshot are very different shapes and an instant jump is jarring.
  const ratio = active ? (active.width ?? 16) / (active.height ?? 9) : 16 / 9;

  if (count === 0) return null;

  return (
    <div
      className="group/gallery relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project images"
      tabIndex={0}
      {...holdProps}
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
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--color-fg-faint)]">
          Drag, swipe or use the arrows
        </p>
        {count > 1 && (
          <span className="font-mono text-[11px] text-[var(--color-fg-faint)]">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Stage */}
      <div className="glass relative overflow-hidden rounded-2xl p-1.5">
        <div
          className="relative mx-auto w-full overflow-hidden rounded-xl bg-[color-mix(in_oklab,var(--color-fg)_4%,transparent)]"
          style={{
            aspectRatio: ratio,
            maxHeight: "78vh",
            minHeight: "260px",
            transition: "aspect-ratio 420ms var(--ease-out-expo)",
          }}
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
              // A drag can outlast the pointer leaving the stage, so release the
              // autoplay hold explicitly rather than trusting pointerleave.
              onDragStart={() => setHeld(true)}
              onDragEnd={(_, info) => {
                setHeld(false);
                if (info.offset.x < -60) next();
                else if (info.offset.x > 60) prev();
              }}
            >
              <ThemedImage
                image={active}
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
              {/* Autoplay countdown, hairline across the bottom of the stage.
                  Remounts with each slide, which restarts the fill. */}
              <span
                key={index}
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] overflow-hidden"
              >
                <span
                  className="autoplay-fill block h-full bg-[var(--color-accent)]"
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  data-paused={!running}
                />
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
              aria-label={`Go to image ${i + 1}: ${img.alt}`}
              aria-current={i === index}
              className={cn(
                "relative h-16 w-24 shrink-0 snap-start overflow-hidden rounded-lg border transition-all duration-300",
                i === index
                  ? "border-[var(--color-accent)] opacity-100 ring-1 ring-[color-mix(in_oklab,var(--color-accent)_50%,transparent)]"
                  : "border-[var(--color-glass-border)] opacity-45 hover:opacity-80",
              )}
            >
              <ThemedImage
                image={{ ...img, alt: "" }}
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot slider, the same pill as the home rail. The active dot doubles as
          the autoplay countdown, so it restarts its fill whenever the slide
          changes. Sits under the thumbnails as a second, glanceable read of
          how far through the set you are. */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((_, i) =>
            i === index ? (
              <span
                key={i}
                aria-hidden
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
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Go to image ${i + 1} of ${count}`}
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-glass-border)] transition-all duration-300 hover:bg-[var(--color-fg-faint)]"
              />
            ),
          )}
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
      aria-label={side === "left" ? "Previous image" : "Next image"}
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
