import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectSlider } from "@/components/ui/ProjectSlider";
import { GitHubMarquee } from "@/components/ui/GitHubMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <SectionHeading
        index="03"
        kicker="Selected work"
        title="What I've built"
      />

      {/* Flagship case studies — a horizontal rail rather than a tall grid */}
      <Reveal y={28}>
        <ProjectSlider projects={featured} />
      </Reveal>

      {/* Open-source repos — a continuously scrolling marquee */}
      <Reveal className="mt-20">
        <div className="mb-8 flex items-center gap-4">
          <h3
            className="font-display font-semibold"
            style={{ fontSize: "var(--text-h3)" }}
          >
            More on GitHub
          </h3>
          <span className="h-px flex-1 bg-[var(--color-glass-border)]" />
          <a
            href="https://github.com/Abu-BakarYasir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-accent)] hover:text-[var(--color-fg)]"
          >
            @Abu-BakarYasir
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>

      <Reveal>
        <GitHubMarquee />
      </Reveal>
    </section>
  );
}
