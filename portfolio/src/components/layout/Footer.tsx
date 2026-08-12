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

export default function Footer() {
  return (
    <footer data-intro="interface" className="relative z-10 mt-auto border-t border-white/[0.08] bg-void/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-3 px-4 py-6 text-sm text-neutral-400 sm:flex-row sm:justify-between sm:px-8">
        <p>© 2026 HONFIN ORACE. DIGITAL CIRCUS INITIATIVE.</p>
        <nav className="flex items-center gap-5">
          {SOCIALS.map((s) => (
            <SocialLink key={s.label} {...s} />
          ))}
        </nav>
        <p className="text-neutral-500">DESIGNED BY AI. GUIDED BY CAINE.</p>
      </div>
    </footer>
  )
}
