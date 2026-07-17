import { cn } from "@/lib/utils";
import { GlassPanel } from "./GlassPanel";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  refract?: boolean;
  /** Adds an accent glow rim on hover (CSS-only). */
  interactive?: boolean;
};

/** Content card with an on-brand hover glow. */
export function GlassCard({
  refract = false,
  interactive = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <GlassPanel
      refract={refract}
      className={cn(
        "relative overflow-hidden p-6 transition-all duration-500 ease-[var(--ease-out-expo)]",
        interactive &&
          "hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] hover:shadow-[0_30px_70px_-30px_rgba(232,167,60,0.32)]",
        className,
      )}
      {...props}
    >
      {/* accent glow that fades in on hover */}
      {interactive && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--mx,50%) var(--my,0%), color-mix(in oklab, var(--color-accent) 18%, transparent), transparent 60%)",
          }}
        />
      )}
      {children}
    </GlassPanel>
  );
}
