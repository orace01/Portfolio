export const PAGE_IDLE_LINES: Record<string, string[]> = {
  '/': [
    "Welcome to the Digital Circus. I'm Caine — I bite, but only bugs.",
    'Step right up. Every card here leads somewhere over-engineered.',
    'Ask me a question. I promise at least 60% accuracy.',
    "That's the origin story. Spoilers: it involves a lot of coffee.",
  ],
  '/projects': [
    'Six repos, zero regrets. Mostly.',
    'Every card here is a rabbit hole. Dig in.',
    "He wrote tests for these. I've seen the coverage report.",
  ],
  '/skills': [
    "Rust taught him to fear the borrow checker. He's stronger for it.",
    'The skill tree, watered daily with caffeine.',
    "Ask him about any of these. He won't stop talking.",
  ],
  '/about': [
    'The human behind the jaw: Epitech IT Expert, Cotonou, Benin.',
    "That's my kingdom you're reading about. Mind the cables.",
    'He builds. I narrate. Fair division of labor.',
  ],
  '/contact': [
    'Say hi. He replies faster than his CI pipeline.',
    'Direct line to the ringmaster. No hold music.',
    'Send a message. I forward everything, mostly unedited.',
  ],
}

export const HOVER_LINES: Record<string, string> = {
  'nav-projects': 'The showcase. Where the acts actually perform.',
  'nav-skills': 'The lab. Where the tricks get built.',
  'nav-about': 'The studio. Meet the ringmaster behind the curtain.',
  'nav-contact': 'Direct line to the ringmaster. No hold music.',
  'project-agent-ops': 'Agents talking to agents. Somehow it works.',
  'project-rust-engine': 'No heap allocator, no mercy.',
  'project-webgl': 'Shaders under a 16ms budget. Tight rope, no net.',
  'project-ml-pipeline': 'Sharded training jobs. Nobody sleeps, especially the GPUs.',
  'project-generic': 'Another act, same ringmaster.',
  'skill-languages': "The words he thinks in. C++ included, unfortunately for him.",
  'skill-systems': "Down where the abstractions stop lying to you.",
  'skill-web': 'Interfaces with actual personality.',
  'skill-ai': 'Models, agents, and the occasional hallucination.',
  'skill-devops': 'Ship it, watch it, fix it at 2am.',
  'skill-tools': 'The toolbox. Every circus needs one.',
  contact_email: 'Real inbox. Real human. Occasionally real fast replies.',
  contact_location: 'Cotonou, GMT+1 — the circus never really closes there.',
  'contact-form': 'Type kindly. Caine reads everything before he does.',
  'back-button': 'Escape hatch engaged. See you back at the circus.',
  social_github: 'The repos. Where the tricks are actually built.',
  social_linkedin: 'The professional tent. Less confetti.',
  social_artstation: 'The visual side act. Also his handiwork.',
}

export function pickIdleLine(pathname: string): string {
  const lines = PAGE_IDLE_LINES[pathname] ?? PAGE_IDLE_LINES['/']
  return lines[Math.floor(Math.random() * lines.length)]
}
