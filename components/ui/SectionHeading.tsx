import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  index: string; // "01"
  title: string;
  kicker?: string;
  className?: string;
};

/** Editorial section heading with an index number — a deliberate anti-template detail. */
export function SectionHeading({ index, title, kicker, className }: Props) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-[var(--color-accent)]">{index}</span>
        <span className="h-px flex-1 max-w-24 bg-[var(--color-glass-border)]" />
        {kicker && (
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-fg-faint)]">
            {kicker}
          </span>
        )}
      </div>
      <h2
        className="mt-4 font-display font-semibold leading-tight"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {title}
      </h2>
    </Reveal>
  );
}
