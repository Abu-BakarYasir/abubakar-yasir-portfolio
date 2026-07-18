import Image, { type ImageProps } from "next/image";
import type { ProjectImage } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Renders the right cut of an image for the active theme.
 *
 * The theme toggle is deliberately stateless — it only flips [data-theme] on
 * <html>, so React never learns which theme is active (see ThemeToggle).
 * Choosing a variant in JS would mean either flashing the wrong image before
 * hydration or a hydration mismatch, so instead both variants render and CSS
 * hides one. That is correct on the server and on first paint, and the hidden
 * variant is `display: none`, which also drops it from the accessibility tree
 * so the alt text is only ever announced once.
 *
 * Images without a light cut render as a single <Image>, so the second request
 * only exists where there is genuinely a second image.
 */
export function ThemedImage({
  image,
  className,
  ...props
}: Omit<ImageProps, "src" | "alt"> & { image: ProjectImage }) {
  if (!image.srcLight) {
    return <Image src={image.src} alt={image.alt} className={className} {...props} />;
  }

  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        className={cn("theme-dark-only", className)}
        {...props}
      />
      <Image
        src={image.srcLight}
        alt={image.alt}
        className={cn("theme-light-only", className)}
        {...props}
      />
    </>
  );
}
