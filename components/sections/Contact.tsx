import { Mail, FileDown, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassButton } from "@/components/glass/GlassButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

// Full contact channels (email, phone, socials) live in the footer.
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading index="05" kicker="Contact" title="Get in touch" />

      <Reveal y={28}>
        <GlassPanel refract sheen className="overflow-hidden p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "var(--text-h3)" }}
            >
              I'm looking for remote work.
            </h3>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--color-fg-muted)]">
              If you're hiring for AI or full-stack work, or you have something
              half-built that needs finishing, send me an email. I'm in{" "}
              {profile.location} on {profile.timezone} and I keep hours that
              overlap with the US and Europe.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GlassButton href={`mailto:${profile.contact.email}`} variant="primary">
                <Mail className="h-4 w-4" />
                Email me
              </GlassButton>
              <GlassButton href={profile.contact.resume} variant="glass">
                <FileDown className="h-4 w-4" />
                Resume
              </GlassButton>
              <GlassButton href={profile.contact.resumeVisual} variant="glass">
                <FileText className="h-4 w-4" />
                Visual version
              </GlassButton>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
