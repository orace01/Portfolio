import { SITE } from "@/lib/constants";

export interface FaqEntry {
  id: string;
  /** Shown as a quick-prompt chip in the drawer. */
  prompt: string;
  /** Keywords matched (case-insensitive, substring) against free-typed questions. */
  keywords: string[];
  answer: string;
}

export const ASSISTANT_FAQ: FaqEntry[] = [
  {
    id: "stack",
    prompt: "What's Orace's tech stack?",
    keywords: ["stack", "tech", "language", "tools", "technolog"],
    answer:
      "Python, Rust, C/C++, and TypeScript day to day — PyTorch and on-device LLMs for the AI side, Next.js and React Three Fiber for interfaces, Docker and Linux for everything that has to actually run in production.",
  },
  {
    id: "projects",
    prompt: "Tell me about JARVIS.",
    keywords: ["jarvis", "voice", "assistant"],
    answer:
      "JARVIS is a fully offline voice assistant running on Fedora Linux — wake-word detection via openWakeWord, local speech processing, and voice biometrics so it only acts on commands from a recognized speaker. Zero cloud dependency, zero audio leaving the machine.",
  },
  {
    id: "gomoku",
    prompt: "What's the Gomoku engine?",
    keywords: ["gomoku", "game", "engine"],
    answer:
      "A tournament-grade Gomoku AI written in Rust: bitboard position representation, alpha-beta search with iterative deepening, speaking the standard pbrain protocol so it drops into any compatible tournament GUI.",
  },
  {
    id: "availability",
    prompt: "Is Orace available for hire?",
    keywords: ["available", "hire", "hiring", "freelance", "consult", "job", "work with"],
    answer:
      "Yes — open to AI Engineering consultancy, co-founder roles, and high-impact systems architecture work. Use the terminal below or email to start a conversation.",
  },
  {
    id: "location",
    prompt: "Where is Orace based?",
    keywords: ["where", "location", "based", "timezone", "remote"],
    answer: `Working from a Fedora Linux workstation, open to remote work — see the footer for details.`,
  },
  {
    id: "contact",
    prompt: "How do I get in touch?",
    keywords: ["contact", "email", "reach", "touch", "message"],
    answer: `Scroll down to the contact terminal to send a message directly, or email ${SITE.email}.`,
  },
];

export const ASSISTANT_GREETING =
  "Hey — I'm a lightweight assistant trained on Orace's portfolio. Ask about his stack, projects, or availability.";

export const ASSISTANT_FALLBACK =
  "I don't have a canned answer for that one — try asking about his stack, a specific project, or availability, or drop a message in the contact terminal below.";

export function matchFaq(input: string): FaqEntry | null {
  const normalized = input.toLowerCase();
  return (
    ASSISTANT_FAQ.find((entry) => entry.keywords.some((kw) => normalized.includes(kw))) ?? null
  );
}
