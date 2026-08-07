export type SkillTone = 'cyan' | 'magenta' | 'purple' | 'green'

export interface SkillItem {
  name: string
  level: number
}

export interface SkillCategory {
  hoverKey: string
  title: string
  tone: SkillTone
  skills: SkillItem[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    hoverKey: 'skill-languages',
    title: 'Languages',
    tone: 'cyan',
    skills: [
      { name: 'C', level: 5 },
      { name: 'C++', level: 5 },
      { name: 'Rust', level: 4 },
      { name: 'Python', level: 5 },
      { name: 'TypeScript', level: 5 },
      { name: 'JavaScript', level: 5 },
      { name: 'Go', level: 3 },
    ],
  },
  {
    hoverKey: 'skill-systems',
    title: 'Systems & Low-Level',
    tone: 'magenta',
    skills: [
      { name: 'Operating Systems Internals', level: 4 },
      { name: 'Memory Management', level: 5 },
      { name: 'Embedded Systems', level: 4 },
      { name: 'Concurrency & Multithreading', level: 4 },
      { name: 'Network Programming', level: 4 },
    ],
  },
  {
    hoverKey: 'skill-web',
    title: 'Web & Frontend',
    tone: 'purple',
    skills: [
      { name: 'React', level: 5 },
      { name: 'Three.js / WebGL', level: 4 },
      { name: 'Tailwind CSS', level: 5 },
      { name: 'Node.js', level: 5 },
      { name: 'REST & GraphQL APIs', level: 5 },
    ],
  },
  {
    hoverKey: 'skill-ai',
    title: 'AI & Machine Learning',
    tone: 'green',
    skills: [
      { name: 'LangChain & Agent Orchestration', level: 4 },
      { name: 'PyTorch', level: 4 },
      { name: 'Prompt Engineering', level: 5 },
      { name: 'Distributed Training', level: 3 },
      { name: 'RAG Pipelines', level: 4 },
    ],
  },
  {
    hoverKey: 'skill-devops',
    title: 'DevOps & Cloud',
    tone: 'cyan',
    skills: [
      { name: 'Docker', level: 5 },
      { name: 'CI/CD Pipelines', level: 4 },
      { name: 'Linux Administration', level: 5 },
      { name: 'AWS / GCP Fundamentals', level: 3 },
      { name: 'Git & Version Control', level: 5 },
    ],
  },
  {
    hoverKey: 'skill-tools',
    title: 'Tools & Practices',
    tone: 'magenta',
    skills: [
      { name: 'FastAPI', level: 4 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'System Design', level: 4 },
      { name: 'Algorithms & Data Structures', level: 5 },
      { name: 'Agile / Scrum', level: 4 },
    ],
  },
]
