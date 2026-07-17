import { cn } from "@/lib/utils";

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Apply Chromium SVG refraction on top of the blur fallback. */
  refract?: boolean;
  /** Add the diagonal sheen highlight. */
  sheen?: boolean;
  as?: "div" | "section" | "article" | "aside";
};

/** Base frosted-glass surface. All glass UI composes from this. */
export function GlassPanel({
  refract = false,
  sheen = false,
  as: Tag = "div",
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-2xl",
        refract && "glass-refract",
        sheen && "glass-sheen",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
