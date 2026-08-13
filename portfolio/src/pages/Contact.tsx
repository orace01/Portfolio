import PageShell from '@/components/layout/PageShell'
import GlowCard from '@/components/ui/GlowCard'
import TerminalContactForm from '@/components/ui/TerminalContactForm'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'

const SOCIALS = [
  { label: 'GITHUB', href: 'https://github.com/', reactionKey: 'social_github' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/', reactionKey: 'social_linkedin' },
  { label: 'ARTSTATION', href: 'https://artstation.com/', reactionKey: 'social_artstation' },
]

function SocialLink({ label, href, reactionKey }: { label: string; href: string; reactionKey: string }) {
  const reaction = useCaineReaction(HOVER_LINES[reactionKey])
  return (
    <a href={href} target="_blank" rel="noreferrer" className="bracket-btn" {...reaction}>
      [ {label} ]
    </a>
  )
}

export default function Contact() {
  const locationReaction = useCaineReaction(HOVER_LINES.contact_location)
  const emailReaction = useCaineReaction(HOVER_LINES.contact_email)

  return (
    <PageShell title="CONTACT" subtitle="Direct line to the ringmaster. No hold music.">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <GlowCard tone="cyan" className="flex flex-col gap-5">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Direct Info</h2>
            <div className="flex flex-col gap-4">
              <div tabIndex={0} className="rounded-lg outline-none" {...locationReaction}>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Location</p>
                <p className="neon-text-cyan text-lg font-semibold">Cotonou, Benin</p>
              </div>
              <div className="h-px w-full bg-white/10" />
              <a href="mailto:orace.honfin@epitech.eu" className="block rounded-lg outline-none" {...emailReaction}>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Email</p>
                <p className="neon-text-magenta break-all text-lg font-semibold">orace.honfin@epitech.eu</p>
              </a>
            </div>
          </GlowCard>

          <GlowCard tone="purple" className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Elsewhere</h2>
            <div className="flex flex-wrap gap-5">
              {SOCIALS.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </GlowCard>
        </div>

        <TerminalContactForm />
      </div>
    </PageShell>
  )
}
