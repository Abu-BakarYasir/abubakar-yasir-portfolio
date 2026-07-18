import { Mail, FileDown } from "lucide-react";
import { profile } from "@/content/profile";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassButton } from "@/components/glass/GlassButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

// Full contact channels (email, phone, socials) live in the footer.
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading index="05" kicker="Contact" title="Let's build something" />

      <Reveal y={28}>
        <GlassPanel refract sheen className="overflow-hidden p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Open to remote roles & interesting problems.
            </h3>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--color-fg-muted)]">
              Whether it's an AI product to take from prototype to production or a
              full-stack build that needs shipping, my inbox is open. Based in{" "}
              {profile.location} ({profile.timezone}), working with US/EU hours.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GlassButton href={`mailto:${profile.contact.email}`} variant="primary">
                <Mail className="h-4 w-4" />
                Say hello
              </GlassButton>
              <GlassButton href={profile.contact.resume} variant="glass">
                <FileDown className="h-4 w-4" />
                Résumé
              </GlassButton>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
