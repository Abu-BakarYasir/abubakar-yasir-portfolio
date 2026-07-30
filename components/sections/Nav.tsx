"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ---- Menu dismissal ---------------------------------------------------
     The panel is a full-screen-backdropped overlay, so it needs every exit a
     modal needs: Escape, a tap outside, and no scrolling of the page behind
     it. Focus moves into the panel on open and back to the button on close,
     so a keyboard or screen-reader user is never left stranded behind it. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // `pointerdown` rather than `click`: a click fires after the anchor's own
    // navigation, which would double-handle a menu link tap.
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return; // its own onClick closes
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    // Lock the page behind the overlay. Restoring to "" hands control back to
    // the stylesheet's own `overflow-x: hidden` rather than clobbering it.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className={cn(
            "relative flex w-full max-w-[1240px] items-center justify-between gap-3 rounded-full px-4 py-2 transition-all duration-500 ease-[var(--ease-out-expo)] sm:gap-4 sm:py-2.5",
            scrolled
              ? "glass border-[var(--color-glass-border)]"
              : "border border-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2 pl-1 font-display text-sm font-semibold sm:pl-2"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))] font-mono text-xs text-[var(--color-ink)]">
              AB
            </span>
            {/* Was hidden below sm, which left a lone chip and a large dead gap
                on every phone. It fits comfortably from ~360px. */}
            <span className="truncate">Abu Bakar</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                    active === l.id
                      ? "text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--color-glass-strong)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <a
              href={profile.contact.resume}
              className="hidden items-center gap-1.5 rounded-full border border-[var(--color-glass-border)] px-4 py-1.5 text-sm text-[var(--color-fg)] transition-colors hover:bg-[var(--color-glass-strong)] sm:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              Resume
            </a>
            <button
              ref={toggleRef}
              onClick={() => (open ? closeMenu() : setOpen(true))}
              // h-11 w-11 = the 44px touch minimum. Was h-9 w-9 (36px).
              className="grid h-11 w-11 place-items-center rounded-full text-[var(--color-fg)] transition-colors hover:bg-[var(--color-glass-strong)] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Scroll progress. Lives inside the pill and inset from its rounded
              ends, rather than as a viewport-wide hairline hanging off the
              header's padding box — at mobile widths that read as a stray line
              floating below a detached pill. Fades in with the glass. */}
          <motion.span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-5 bottom-1 h-px origin-left rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-2))] transition-opacity duration-500",
              scrolled ? "opacity-100" : "opacity-0",
            )}
            style={{ scaleX: progress }}
          />
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop: dims the page, and makes "tap anywhere else to close"
                a visible affordance rather than a hidden one. */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-[color-mix(in_oklab,var(--color-bg)_65%,transparent)] backdrop-blur-[2px] md:hidden"
              aria-hidden
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[calc(var(--nav-h)+0.5rem)] z-40 md:hidden"
            >
              <ul className="glass flex flex-col gap-1 rounded-2xl p-3">
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={closeMenu}
                      // Mobile had no "where am I" feedback at all: the
                      // scroll-spy state only ever drove the desktop pill.
                      aria-current={active === l.id ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 transition-colors",
                        active === l.id
                          ? "bg-[var(--color-glass-strong)] text-[var(--color-fg)]"
                          : "text-[var(--color-fg-muted)] hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]",
                      )}
                    >
                      {l.label}
                      {active === l.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      )}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.contact.resume}
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-[var(--color-accent)]"
                  >
                    <FileDown className="h-4 w-4" /> Download resume
                  </a>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
