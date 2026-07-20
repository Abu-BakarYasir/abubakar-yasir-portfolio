"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 ease-[var(--ease-out-expo)]",
            scrolled
              ? "glass border-[var(--color-glass-border)]"
              : "border border-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2 pl-2 font-display text-sm font-semibold"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-2))] font-mono text-xs text-[var(--color-ink)]">
              AB
            </span>
            <span className="hidden sm:inline">Abu Bakar</span>
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

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.contact.resume}
              className="hidden items-center gap-1.5 rounded-full border border-[var(--color-glass-border)] px-4 py-1.5 text-sm text-[var(--color-fg)] transition-colors hover:bg-[var(--color-glass-strong)] sm:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              Resume
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-[var(--color-fg)] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* scroll progress */}
        <motion.div
          className="absolute inset-x-0 -bottom-px mx-auto h-px max-w-5xl origin-left bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-2))]"
          style={{ scaleX: progress }}
        />
      </header>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-4 top-20 z-40 md:hidden"
        >
          <ul className="glass flex flex-col gap-1 rounded-2xl p-3">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-glass-strong)] hover:text-[var(--color-fg)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.contact.resume}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-[var(--color-accent)]"
              >
                <FileDown className="h-4 w-4" /> Download resume
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
}
