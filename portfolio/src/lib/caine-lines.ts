export const PAGE_IDLE_LINES: Record<string, string[]> = {
  '/': [
    "Welcome to the Digital Circus. I'm Caine — I bite, but only bugs.",
    "Step right up. Every card here leads somewhere over-engineered.",
    "Ask me a question. I promise at least 60% accuracy.",
  ],
  '/projects': [
    "Six repos, zero regrets. Mostly.",
    'Multi-agent systems? Delightfully complex.',
    'Every ONLINE badge here is a small miracle of uptime.',
  ],
  '/skills': [
    'A skill tree grown in caffeine and compiler errors.',
    "Rust taught him to fear the borrow checker. He's stronger for it.",
    'Full stack, low level, and everything that screams at 3am.',
  ],
  '/about': [
    'The human behind the jaw: Epitech IT Expert, Cotonou, Benin.',
    "He builds things so I don't have to have a body.",
    'Origin story loading... 98% complete.',
  ],
  '/contact': [
    "Say hi. He replies faster than his CI pipeline.",
    'One message, zero spam. Circus policy.',
    "Cotonou timezone, but he's basically always online.",
  ],
}

export const HOVER_LINES: Record<string, string> = {
  'nav-projects': 'Careful — that grid bites back in production.',
  'nav-skills': "Skill points aren't refundable, choose wisely.",
  'nav-about': "That's the origin story. Spoilers: it involves a lot of coffee.",
  'nav-contact': 'Direct line to the ringmaster. No hold music.',

  'project-agent-ops': 'Autonomous agents. What could possibly go wrong?',
  'project-rust-engine': "Rust and embedded systems — he speaks fluent segfault-prevention.",
  'project-webgl': 'Real-time rendering, zero patience for dropped frames.',
  'project-ml-pipeline': 'Distributed ML. It scales until it really, really does not.',
  'project-generic': "Case study's this way. Mind the scope creep.",

  'skill-languages': 'Fluent in more syntax than small talk.',
  'skill-systems': 'Low level, high stakes. Pointers everywhere.',
  'skill-web': 'Ships pixels and APIs in the same afternoon.',
  'skill-ai': 'Teaches machines to almost understand him.',
  'skill-devops': "If it's not containerized, is it even real?",
  'skill-tools': "The toolbox that never says 'works on my machine.'",

  contact_email: "That inbox is monitored. Mostly by him, occasionally by me.",
  contact_location: 'Cotonou, Benin — GMT+1, always shipping.',
  'contact-form': 'Type kindly. I read everything before he does.',
  'back-button': 'Escape hatch engaged. See you back at the circus.',
  social_github: 'Where the commits actually live.',
  social_linkedin: 'The professional mask. Mostly accurate.',
  social_artstation: 'Yes, he draws too. Overachiever.',
}

export function pickIdleLine(pathname: string): string {
  const lines = PAGE_IDLE_LINES[pathname] ?? PAGE_IDLE_LINES['/']
  return lines[Math.floor(Math.random() * lines.length)]
}
