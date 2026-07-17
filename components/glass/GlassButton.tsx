import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "glass" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-2 will-change-transform active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "text-[var(--color-ink)] bg-[linear-gradient(100deg,var(--color-accent),var(--color-accent-2))] shadow-[0_10px_30px_-10px_rgba(232,167,60,0.55)] hover:shadow-[0_16px_40px_-10px_rgba(192,96,58,0.6)] hover:-translate-y-0.5",
  glass:
    "glass text-[var(--color-fg)] hover:bg-[var(--color-glass-strong)] hover:-translate-y-0.5",
  ghost:
    "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] border border-transparent hover:border-[var(--color-glass-border)]",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Pill button/link. Renders an <a>/Next Link when `href` is present. */
export function GlassButton(props: AnchorProps | ButtonProps) {
  const { variant = "glass", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
