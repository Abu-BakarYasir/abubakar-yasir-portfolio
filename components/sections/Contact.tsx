import { Mail, FileDown, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassButton } from "@/components/glass/GlassButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

// Full contact channels (email, phone, socials) live in the footer.
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
      <SectionHeading index="05" kicker="Contact" title="Get in touch" />

      <Reveal y={28}>
        <GlassPanel refract sheen className="overflow-hidden p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Available for remote work.
            </h3>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--color-fg-muted)]">
              Best fit for teams building serious AI or full-stack products, and
              for founders sitting on something half-built that needs to actually
              ship. Based in {profile.location} on {profile.timezone}, working
              hours that overlap the US and Europe.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GlassButton href={`mailto:${profile.contact.email}`} variant="primary">
                <Mail className="h-4 w-4" />
                Start a conversation
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
