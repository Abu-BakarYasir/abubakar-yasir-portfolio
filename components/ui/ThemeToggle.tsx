"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

/** Page background per theme, mirrored to <meta name="theme-color"> so the
 *  mobile browser chrome matches instead of staying dark in light mode. */
const CHROME = { dark: "#14100b", light: "#faf6ee" } as const;

function syncChrome(theme: "dark" | "light") {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", CHROME[theme]);
}

/**
 * Dark/light switch.
 *
 * Deliberately stateless: the knob position and which icon shows are both
 * derived from `[data-theme]` on <html> in CSS, so the button renders
 * correctly on the server and on first paint without React knowing the
 * theme. Storing it in React state instead would either flash the wrong
 * icon before hydration or trip a hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // The pre-paint script restores [data-theme], but the theme-color meta tag
  // is rendered by Next after that script runs, so it's caught up here.
  useEffect(() => {
    syncChrome(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    // No attribute means the default theme, which is dark.
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    syncChrome(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / blocked storage — the theme still switches, it just
      // won't survive a reload.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${className ?? ""}`}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
    >
      <span className="tt-knob" aria-hidden>
        <Sun className="tt-sun" />
        <Moon className="tt-moon" />
      </span>
    </button>
  );
}
