export type ProjectTone = 'cyan' | 'magenta' | 'purple' | 'green'
export type ProjectStatus = 'ONLINE' | 'BETA' | 'ARCHIVED'

export interface Project {
  slug: string
  name: string
  tone: ProjectTone
  status: ProjectStatus
  tags: string[]
  summary: string
  detail: string
  reactionKey: string
  bgImage?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'agent-ops',
    name: 'Autonomous Agent Ops',
    tone: 'cyan',
    status: 'ONLINE',
    tags: ['Python', 'LangChain'],
    summary: 'Multi-agent orchestration platform for autonomous task pipelines.',
    detail:
      'A planner agent decomposes goals into subtasks and hands them to specialized tool-calling agents over a shared blackboard. State handoff between agents is checkpointed so a failed step can retry or reroute without replaying the whole pipeline.',
    reactionKey: 'project-agent-ops',
    bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop', // AI Core / Nodes
  },
  {
    slug: 'rust-engine',
    name: 'Crypto/Embedded Rust Engine',
    tone: 'green',
    status: 'BETA',
    tags: ['Rust', 'C++'],
    summary: 'Low-level embedded engine for cryptographic operations on constrained hardware.',
    detail:
      'Runs no_std to fit tight flash and RAM budgets, leaning on Rust\'s ownership model for memory-safety guarantees without a heap allocator. A thin FFI layer calls into C hardware drivers for the crypto accelerator and secure element.',
    reactionKey: 'project-rust-engine',
  },
  {
    slug: 'webgl-renderer',
    name: 'Real-time WebGL Renderer',
    tone: 'magenta',
    status: 'ONLINE',
    tags: ['Three.js', 'FastAPI'],
    summary: 'GPU-accelerated real-time 3D rendering pipeline with a Python backend.',
    detail:
      'Custom shader pipeline with instanced draw calls keeps frame time inside a 16ms budget under load. A FastAPI backend streams scene graph updates over WebSockets so remote clients stay in sync with server-side simulation state.',
    reactionKey: 'project-webgl',
  },
  {
    slug: 'ml-pipeline',
    name: 'Distributed ML Pipeline',
    tone: 'purple',
    status: 'ONLINE',
    tags: ['C++', 'FastAPI', 'LangChain'],
    summary: 'Scalable distributed pipeline for training and serving ML models.',
    detail:
      'Training jobs are sharded across workers with a C++ core handling the hot data-loading path, while a FastAPI serving layer exposes low-latency inference endpoints with request batching and model versioning.',
    reactionKey: 'project-ml-pipeline',
  },
  {
    slug: 'intrusion-sentinel',
    name: 'Network Intrusion Sentinel',
    tone: 'cyan',
    status: 'BETA',
    tags: ['Python', 'Rust'],
    summary: 'Real-time anomaly detection system monitoring network traffic patterns.',
    detail:
      'A Rust packet-inspection layer parses traffic at line rate and feeds features into a Python anomaly-scoring model. Flagged flows get scored, ranked, and pushed to an alert queue for triage instead of drowning analysts in noise.',
    reactionKey: 'project-generic',
  },
  {
    slug: 'circuitforge-cli',
    name: 'CircuitForge CLI',
    tone: 'green',
    status: 'ONLINE',
    tags: ['Rust', 'Python'],
    summary: 'Developer tooling CLI that scaffolds and provisions embedded firmware projects.',
    detail:
      'Project templates cover common MCU targets and peripheral configs, generated from a Rust core for speed. Python plugins handle build-target provisioning, toolchain detection, and flashing so a new board bring-up takes minutes, not days.',
    reactionKey: 'project-generic',
  },
]
