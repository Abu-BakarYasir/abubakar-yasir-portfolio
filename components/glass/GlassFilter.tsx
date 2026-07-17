/**
 * SVG displacement filter that powers true liquid-glass refraction.
 * Referenced by the `.glass-refract` utility via `backdrop-filter: url(#liquid-glass)`.
 * Only Chromium applies SVG filters as backdrop-filter today; elsewhere the
 * `.glass` blur fallback in globals.css takes over automatically.
 */
export function GlassFilter() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
    >
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale={54}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
