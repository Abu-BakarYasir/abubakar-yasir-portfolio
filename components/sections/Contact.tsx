import { Mail, FileDown, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassButton } from "@/components/glass/GlassButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

// Full contact channels (email, phone, socials) live in the footer.
export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1240px] scroll-mt-[calc(var(--nav-h)+1.25rem)] px-6 py-12 md:px-10 md:py-20"
    >
      <SectionHeading index="05" kicker="Contact" title="Get in touch" />

      <Reveal y={28}>
        {/* p-8 left only ~208px of content at 320px. Panels this size need the
            padding to scale with the viewport, not sit at a desktop value. */}
        <GlassPanel refract sheen className="overflow-hidden p-6 sm:p-8 md:p-12">
          {/* Left-aligned on phones. Centred copy is fine as a two-line
              statement on a wide panel; at phone measure this paragraph runs to
              seven ragged lines and centring makes every one of them start in a
              different place. */}
          <div className="mx-auto max-w-2xl text-left sm:text-center">
            <h3
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Available for remote work.
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-[var(--color-fg-muted)] sm:mx-auto">
              Best fit for teams building serious AI or full-stack products, and
              for founders sitting on something half-built that needs to actually
              ship. Based in {profile.location} on {profile.timezone}, working
              hours that overlap the US and Europe.
            </p>

            {/* Full-width stack on phones. Wrapped and centred, these three
                pills broke into three ragged rows of different widths. */}
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center">
              <GlassButton
                href={`mailto:${profile.contact.email}`}
                variant="primary"
                className="w-full sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                Start a conversation
              </GlassButton>
              <GlassButton
                href={profile.contact.resume}
                variant="glass"
                className="w-full sm:w-auto"
              >
                <FileDown className="h-4 w-4" />
                Resume
              </GlassButton>
              <GlassButton
                href={profile.contact.resumeVisual}
                variant="glass"
                className="w-full sm:w-auto"
              >
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
