/**
 * Central configuration for the 3-Act cinematic scrollytelling experience.
 * Each Act owns its own frame sequence, scroll-track height, and internal
 * section timing (fractions 0..1 of that Act's own track) — Acts are
 * independent pinned tracks, not slices of one shared timeline.
 *
 * `heightVh` is the *scrub distance* for the Act — how much scroll drives
 * its frame sequence, independent of the 100vh viewport it plays in. All
 * three Acts share a *single* pinned track (see `CinematicSequence`) rather
 * than three independent ones: a pinned element always "lands" — settles
 * back into normal flow, unpinned — for a stretch of scroll equal to its
 * own height once its pin releases, no matter how the scrub distance is
 * tuned, so three separate per-Act pins would reproduce a dead ~100vh gap
 * at every boundary. One shared pin spanning all three Acts has nowhere
 * for that gap to appear.
 */

export const SITE = {
  name: "Orace Honfin",
  role: "AI Engineer",
  headerTag: "ORACE HONFIN // AI ENGINEER",
  ctaLabel: "Let's Connect",
  email: "contact@oracehonfin.dev", // TODO: replace with the real public email
  github: "https://github.com/oracehonfin", // TODO: replace with the real handle
  linkedin: "https://linkedin.com/in/oracehonfin", // TODO: replace with the real handle
  cvHref: "/cv/orace-honfin-cv.pdf", // TODO: drop the real CV at public/cv/orace-honfin-cv.pdf
  location: "Fedora Linux Workstation / Remote",
};

export const COLORS = {
  bg: "#050505",
  electric: "#00E5FF",
  violet: "#7C4DFF",
};

// ---------------------------------------------------------------------------
// Section identifiers + nav
// ---------------------------------------------------------------------------

export type SectionId = "act1" | "act2" | "act3" | "contact";

export const NAV_LINKS: { label: string; target: SectionId }[] = [
  { label: "01. Core Systems", target: "act1" },
  { label: "02. Data Flow", target: "act2" },
  { label: "03. Edge & UI", target: "act3" },
  { label: "04. Contact", target: "contact" },
];

// ---------------------------------------------------------------------------
// Frame sequence helper (shared by every Act)
// ---------------------------------------------------------------------------

export function frameSrc(framePath: string, frameCount: number, index: number): string {
  const n = Math.min(Math.max(index, 1), frameCount);
  return `${framePath}/frame_${String(n).padStart(4, "0")}.webp`;
}

// ---------------------------------------------------------------------------
// Act I — Core Systems & Hardware-Software Co-Design (Chip)
// ---------------------------------------------------------------------------

export const ACT1 = {
  framePath: "/frames",
  frameCount: 240,
  heightVh: 300,
  sections: {
    hero: { start: 0, end: 0.15 },
    architecture: { start: 0.15, end: 0.5 },
    signal: { start: 0.5, end: 0.7 },
    network: { start: 0.7, end: 1 },
  },
};

export const ARCHITECTURE_LAYERS = [
  {
    index: "01",
    title: "System Orchestration & LLM Agents",
    layer: "Top Ceramic Layer",
    tags: ["Python", "Rust", "Docker", "Make.com", "n8n"],
    anchor: { x: 47, y: 20 },
    lineStart: { x: 30, y: 14 },
    badge: { side: "left" as const, x: 6, y: 10 },
  },
  {
    index: "02",
    title: "Full-Stack & 3D Web Interfaces",
    layer: "Translucent Glass Layer",
    tags: ["Next.js", "TypeScript", "React Three Fiber", "Tailwind"],
    anchor: { x: 60, y: 38 },
    lineStart: { x: 70, y: 32 },
    badge: { side: "right" as const, x: 6, y: 28 },
  },
  {
    index: "03",
    title: "Core AI & Perception",
    layer: "NPU Central Core",
    tags: ["PyTorch", "Computer Vision", "openWakeWord", "Voice Biometrics"],
    anchor: { x: 50, y: 50 },
    lineStart: { x: 30, y: 60 },
    badge: { side: "left" as const, x: 6, y: 56 },
  },
  {
    index: "04",
    title: "Low-Level & Embedded Systems",
    layer: "Base Board",
    tags: ["C", "C++", "Linux SysAdmin"],
    anchor: { x: 53, y: 72 },
    lineStart: { x: 70, y: 78 },
    badge: { side: "right" as const, x: 6, y: 74 },
  },
];

export const SIGNAL_FEATURES = [
  {
    index: "01",
    title: "Automated Security Auditing",
    tags: ["OWASP ZAP", "Faraday"],
    description:
      "Continuous vulnerability scanning and penetration-test reporting pipelines.",
  },
  {
    index: "02",
    title: "Document AI",
    tags: ["DocuFlow"],
    description:
      "Structured extraction from unstructured documents at production scale.",
  },
  {
    index: "03",
    title: "Local Assistants",
    tags: ["On-Device LLMs"],
    description:
      "Fully offline voice and language assistants with zero cloud dependency.",
  },
];

export type ProjectStatus = "ONLINE" | "BETA";

export interface ProjectCaseStudy {
  problem: string;
  approach: string;
  outcome: string;
}

export const PROJECTS = [
  {
    slug: "jarvis",
    title: "JARVIS Local Assistant",
    description: "Voice-activated local assistant on Fedora Linux.",
    tags: ["Python", "openWakeWord", "Voice Biometrics", "Linux"],
    status: "ONLINE" as ProjectStatus,
    github: "https://github.com/oracehonfin/jarvis", // TODO: replace with the real repo
    position: { left: 6, top: 12 },
    caseStudy: {
      problem:
        "Cloud voice assistants leak every household conversation to a third party and stall out the moment the network does.",
      approach:
        "A wake-word model (openWakeWord) gates a fully on-device pipeline — local STT, intent routing, and a voice-biometrics layer that rejects commands from unrecognized speakers — with zero audio ever leaving the machine.",
      outcome:
        "Sub-second response on commodity Fedora hardware, fully offline, with per-user voice authorization on sensitive commands.",
    },
  },
  {
    slug: "gomoku",
    title: "Gomoku AI Engine",
    description: "High-performance Rust game engine using the pbrain protocol.",
    tags: ["Rust", "pbrain", "Game AI"],
    status: "ONLINE" as ProjectStatus,
    github: "https://github.com/oracehonfin/gomoku-engine", // TODO: replace with the real repo
    position: { left: 32, top: 62 },
    caseStudy: {
      problem:
        "Tournament-grade Gomoku engines live or die on search depth per millisecond — a slow evaluation loop loses to a faster, dumber one.",
      approach:
        "A bitboard-backed position representation and alpha-beta search with iterative deepening, written in Rust to keep the hot evaluation loop allocation-free and speak the standard pbrain protocol so it drops into any compatible tournament GUI.",
      outcome:
        "Consistently out-searches reference engines at equal time controls, validated across automated pbrain tournament matches.",
    },
  },
  {
    slug: "docuflow",
    title: "DocuFlow SaaS",
    description: "Intelligent document extraction and processing platform.",
    tags: ["Next.js", "PyTorch", "Document AI"],
    status: "BETA" as ProjectStatus,
    github: "https://github.com/oracehonfin/docuflow", // TODO: replace with the real repo
    position: { left: 64, top: 20 },
    caseStudy: {
      problem:
        "Teams at the JEB Incubator were still hand-copying fields out of invoices and contracts into spreadsheets — slow and error-prone at any real volume.",
      approach:
        "A PyTorch document-layout model locates and classifies fields on unstructured scans and PDFs, feeding a Next.js review UI where a human confirms low-confidence extractions before they hit the database.",
      outcome:
        "Cuts manual data entry to a confirm-or-correct pass, with structured, queryable output in place of loose PDFs.",
    },
  },
];

// ---------------------------------------------------------------------------
// Act II — Data Pipelines & Neural Information Flow (Cube)
// ---------------------------------------------------------------------------

export const ACT2 = {
  framePath: "/frames_cube",
  frameCount: 240,
  heightVh: 250,
  sections: {
    assembly: { start: 0, end: 0.3 },
    rays: { start: 0.3, end: 0.7 },
    expansion: { start: 0.7, end: 1 },
  },
};

export const ACT2_CONTENT = {
  assembly: {
    eyebrow: "Act II — Data Pipelines",
    title: "HIGH-THROUGHPUT DATA ARCHITECTURE",
    description:
      "Ingesting, structuring, and routing complex vector data across scalable pipelines.",
  },
  features: [
    {
      index: "01",
      title: "Automated Security & Auditing",
      description: "Integration of OWASP ZAP & Faraday into automated dev pipelines.",
      tags: ["OWASP ZAP", "Faraday"],
    },
    {
      index: "02",
      title: "Intelligent Data Extraction",
      description:
        "Unstructured document parsing at scale — JEB Incubator Data Extractor.",
      tags: ["Document Parsing", "JEB Incubator"],
    },
  ],
  expansion: {
    eyebrow: "Key Metrics & Technology Stack",
    stack: ["Vector Databases", "RAG Architectures", "Event-driven Systems"],
  },
};

// ---------------------------------------------------------------------------
// Act III — Human-Machine Interaction & Edge AI (Keyboard)
// ---------------------------------------------------------------------------

export const ACT3 = {
  framePath: "/frames_keyboard",
  frameCount: 240,
  heightVh: 250,
  sections: {
    explosion: { start: 0, end: 0.4 },
    circuit: { start: 0.4, end: 0.8 },
    reassembly: { start: 0.8, end: 1 },
  },
};

export const ACT3_CONTENT = {
  explosion: {
    eyebrow: "Act III — Edge & UI",
    title: "PRECISION HARDWARE-SOFTWARE INTERFACING",
    description:
      "Bridging low-level system events with intuitive, high-performance user interfaces.",
  },
  projects: [
    {
      index: "01",
      title: "Local Voice AI Assistant",
      description: "Zero-cloud latency assistant running on Fedora Linux.",
      tags: ["JARVIS", "Fedora Linux", "On-Device"],
    },
    {
      index: "02",
      title: "Developer Tooling & UI Engineering",
      description: "Custom 3D engine interfaces and interactive web apps.",
      tags: ["React Three Fiber", "Next.js", "WebGL"],
    },
  ],
  summaryBadge: "Optimized for Performance, Privacy, and Execution Speed.",
};

// ---------------------------------------------------------------------------
// "How I Work" — engineering philosophy pills overlaying Act III's circuit
// phase, mirrored against the project cards on the opposite edge.
// ---------------------------------------------------------------------------

export const MANIFESTO = [
  "Correctness first, performance second.",
  "Low-level understanding makes high-level code trustworthy.",
  "Automate the boring parts, own the hard parts.",
];

// ---------------------------------------------------------------------------
// Transitions + Footer
// ---------------------------------------------------------------------------

export const TRANSITIONS = {
  toAct2: "// PROCESSING LAYER 02: NEURAL DATA ROUTING & TENSOR FLOWS",
  toAct3: "// PROCESSING LAYER 03: HUMAN-MACHINE INTERACTION & EDGE EXECUTION",
};

/**
 * Acts with an outgoing crossfade (Act I, Act II) reserve this fraction of
 * their own scroll track to cross-dissolve into the next Act's canvas, so
 * their narrative content is compressed into the remaining [0, 1 - ZONE].
 *
 * The crossfade is never a frozen hold: the outgoing Act keeps scrubbing its
 * own final frames right up to its last frame while fading out, and the
 * incoming Act's canvas — stacked in the same pinned layer, see
 * CinematicSequence — fades in while scrubbing its own opening frames,
 * starting this same fraction early so there is no held frame anywhere.
 */
export const CROSSFADE_ZONE = 0.05;
export const CROSSFADE_START = 1 - CROSSFADE_ZONE;

export const FOOTER_CONTENT = {
  heading: "READY TO SCALE YOUR AI INFRASTRUCTURE?",
  subtext:
    "Available for AI Engineering consultancy, Co-founder roles, and High-Impact Systems Architecture.",
};

export const CONTACT_TERMINAL = {
  session: "session://core/contact-transceiver.sh",
  bootLines: [
    "[STATUS: CONNECTED]",
    "[INITIALIZING TRANSMISSION...]",
    `> LINKED TO ${SITE.name.toUpperCase()}_CORE [SYSTEMS: ONLINE]`,
  ],
  step1: ["> STEP 1/3: IDENTIFICATION", "> ENTER YOUR NAME:"],
  step2: ["> STEP 2/3: RETURN ROUTE", "> ENTER YOUR EMAIL ADDRESS:"],
  step3: ["> STEP 3/3: PAYLOAD", "> ENTER YOUR MESSAGE:"],
  confirmLine: "> DISPATCH SIGNAL TO ORACE HONFIN? (Y/N)",
};
