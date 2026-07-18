import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { GlassFilter } from "@/components/glass/GlassFilter";
import { Footer } from "@/components/sections/Footer";
import { FooterHeightSync } from "@/components/motion/FooterHeightSync";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--ff-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-mono",
  display: "swap",
});

const siteUrl = "https://abubakar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Abu Bakar Yasir — Full-Stack & AI Engineer building RAG pipelines, multi-agent LLM systems, and multi-tenant SaaS end-to-end.",
  keywords: [
    "Abu Bakar Yasir",
    "Full-Stack Engineer",
    "AI Engineer",
    "RAG",
    "LLM",
    "Next.js",
    "FastAPI",
    "Django",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description:
      "Full-Stack & AI Engineer building RAG pipelines, multi-agent LLM systems, and multi-tenant SaaS end-to-end.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#14100b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Add .js before paint so scroll-reveals start hidden only when JS can reveal them */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              email: `mailto:${profile.contact.email}`,
              telephone: profile.contact.phone,
              url: siteUrl,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressCountry: "PK",
              },
              alumniOf: profile.education.school,
              sameAs: [profile.contact.github, profile.contact.linkedin],
              knowsAbout: [
                "Retrieval-Augmented Generation",
                "Multi-Agent LLM Systems",
                "Full-Stack Development",
                "Next.js",
                "FastAPI",
                "Django",
              ],
            }),
          }}
        />
      </head>
      <body>
        <GlassFilter />
        {/* The shell is opaque and paints above the fixed footer; the aurora
            has to live inside it, or the shell's background would hide it. */}
        <div className="page-shell">
          <div className="aurora" aria-hidden>
            <div className="aurora-stage">
              <div className="aurora-orb" />
            </div>
          </div>
          <div className="grain" aria-hidden />
          <div className="page-content">{children}</div>
        </div>
        <Footer />
        <FooterHeightSync />
      </body>
    </html>
  );
}
