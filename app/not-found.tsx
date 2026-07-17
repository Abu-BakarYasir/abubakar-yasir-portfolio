import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--color-accent)]">
          404
        </p>
        <h1
          className="mt-4 font-display font-bold text-gradient"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[var(--color-fg-muted)]">
          That page slipped through the retrieval pipeline. Let&apos;s get you back.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm transition-colors hover:bg-[var(--color-glass-strong)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </main>
  );
}
