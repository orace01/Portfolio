import { NavLink } from 'react-router-dom'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'

const NAV_ITEMS = [
  { label: 'Showcase', to: '/projects', key: 'nav-projects' },
  { label: 'Lab', to: '/skills', key: 'nav-skills' },
  { label: 'Studio', to: '/about', key: 'nav-about' },
]

function NavItem({ label, to, reactionKey }: { label: string; to: string; reactionKey: string }) {
  const reaction = useCaineReaction(HOVER_LINES[reactionKey])
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `bracket-btn ${isActive ? 'text-cyan-neon' : ''}`
      }
      {...reaction}
    >
      [ {label} ]
    </NavLink>
  )
}

export default function Header() {
  const contactReaction = useCaineReaction(HOVER_LINES['nav-contact'])

  return (
    <header data-intro="interface" className="sticky top-0 z-30 border-b border-white/10 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-5 sm:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="neon-text-cyan flex h-9 w-9 items-center justify-center rounded border border-cyan-neon/60 font-mono text-lg">
            H
          </span>
          <span className="neon-text-cyan tracking-wide">-jaw</span>
        </NavLink>

        <nav className="hidden items-center gap-10 text-base md:flex">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} label={item.label} to={item.to} reactionKey={item.key} />
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="neon-border-magenta rounded-full bg-magenta-neon/10 px-6 py-2.5 text-base font-semibold tracking-wide text-magenta-neon transition-transform hover:scale-105"
          {...contactReaction}
        >
          [ CONTACT ]
        </NavLink>
      </div>

      <nav className="flex items-center justify-center gap-6 border-t border-white/5 py-2 md:hidden">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} label={item.label} to={item.to} reactionKey={item.key} />
        ))}
      </nav>
    </header>
  )
}
