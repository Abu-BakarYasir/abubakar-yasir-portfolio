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
    <Reveal className={cn("mb-9 md:mb-16", className)}>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="font-mono text-sm text-[var(--color-accent)]">{index}</span>
        {/* Fixed width on phones. As `flex-1 max-w-24` the rule was the only
            flexible item in the row, so a long kicker ("SELECTED WORK" at
            0.25em tracking is ~160px) squeezed it to nothing and the index
            collided with the label. */}
        <span className="h-px w-7 shrink-0 bg-[var(--color-glass-border)] sm:w-auto sm:max-w-24 sm:flex-1" />
        {kicker && (
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-faint)] sm:text-xs sm:tracking-[0.25em]">
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
