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
    prompt: "Quelle est la stack technique d'Orace ?",
    keywords: ["stack", "tech", "langage", "outils", "technolog"],
    answer:
      "C, C++ et Haskell pour le bas niveau et les langages, Python et JavaScript au quotidien, React/Node.js pour le fullstack, plus Docker, CI/CD et Git/Linux pour tout livrer.",
  },
  {
    id: "trading-bot",
    prompt: "Parle-moi du bot de trading.",
    keywords: ["trading", "bot", "finance", "marché"],
    answer:
      "Un bot de trading automatisé qui intègre des algorithmes d'IA pour analyser les marchés financiers et appuyer des décisions d'achat/vente en temps réel.",
  },
  {
    id: "game-engine",
    prompt: "C'est quoi le moteur de jeu maison ?",
    keywords: ["jeu", "moteur", "rpg", "c++"],
    answer:
      "Un moteur de jeu 2D construit de zéro en C, utilisé pour livrer deux jeux jouables façon RPG : Hunter et Sokoban.",
  },
  {
    id: "availability",
    prompt: "Orace est-il disponible ?",
    keywords: ["disponible", "embauche", "recrut", "freelance", "consult", "poste", "travailler avec"],
    answer:
      "Oui — ouvert aux postes d'ingénieur fullstack, aux projets freelance, et aux opportunités de co-fondation technique. Utilisez le terminal ci-dessous ou l'email pour démarrer une conversation.",
  },
  {
    id: "location",
    prompt: "Où est basé Orace ?",
    keywords: ["où", "localisation", "basé", "fuseau", "remote"],
    answer: `Basé à ${SITE.location}, ouvert au travail à distance.`,
  },
  {
    id: "contact",
    prompt: "Comment te contacter ?",
    keywords: ["contact", "email", "joindre", "message"],
    answer: `Faites défiler jusqu'au terminal de contact pour envoyer un message directement, ou écrivez à ${SITE.email}.`,
  },
];

export const ASSISTANT_GREETING =
  "Salut — je suis un assistant léger entraîné sur le portfolio d'Orace. Posez-moi des questions sur sa stack, ses projets ou sa disponibilité.";

export const ASSISTANT_FALLBACK =
  "Je n'ai pas de réponse toute faite pour celle-là — essayez de me demander sa stack, un projet précis, ou sa disponibilité, ou laissez un message dans le terminal de contact ci-dessous.";

export function matchFaq(input: string): FaqEntry | null {
  const normalized = input.toLowerCase();
  return (
    ASSISTANT_FAQ.find((entry) => entry.keywords.some((kw) => normalized.includes(kw))) ?? null
  );
}
