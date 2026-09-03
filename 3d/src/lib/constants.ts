/**
 * Central configuration for the 3-Act cinematic scrollytelling experience.
 * Each Act owns its own frame sequence, scroll-track height, and internal
 * section timing (fractions 0..1 of that Act's own track) — Acts are
 * independent pinned tracks, not slices of one shared timeline.
 *
 * Acts map to one part of Orace each: Act I (chip) = À Propos, Act II
 * (cube) = Réalisations, Act III (keyboard) = Compétences.
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
  role: "Ingénieur Logiciel Fullstack",
  headerTag: "ORACE HONFIN // INGÉNIEUR FULLSTACK",
  ctaLabel: "Discutons",
  email: "orace.honfin@epitech.eu",
  phone: "+229 01 50 78 46 60",
  // Pas de GitHub public au dossier — en ajouter un et relier les CTA une fois disponible.
  linkedin: "https://linkedin.com/in/oracehonfin",
  cvHref: "/cv/orace-honfin-cv.pdf", // TODO: déposer le vrai CV dans public/cv/orace-honfin-cv.pdf
  location: "Cotonou, Bénin",
};

export const COLORS = {
  bg: "#030712",
  electric: "#00E5FF",
  violet: "#7C4DFF",
};

// ---------------------------------------------------------------------------
// Section identifiers + nav
// ---------------------------------------------------------------------------

export type SectionId = "act1" | "act2" | "act3" | "contact";

export const NAV_LINKS: { label: string; target: SectionId }[] = [
  { label: "01. À Propos", target: "act1" },
  { label: "02. Réalisations", target: "act2" },
  { label: "03. Compétences", target: "act3" },
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
// Act I — À Propos (Chip)
// ---------------------------------------------------------------------------

export const ACT1 = {
  framePath: "/frames",
  frameCount: 240,
  heightVh: 420,
  sections: {
    hero: { start: 0, end: 0.15 },
    architecture: { start: 0.15, end: 0.5 },
    signal: { start: 0.5, end: 0.7 },
    network: { start: 0.7, end: 1 },
  },
};

// "hero" slot — functional section title, no decorative giant word.
export const ACT1_CONTENT = {
  hero: {
    eyebrow: "Acte I — À Propos",
    title: "PROFIL & PARCOURS",
    description:
      "Je suis Orace Honfin, ingénieur logiciel fullstack et cofondateur de Webspace. Je conçois des produits numériques de bout en bout, de l'architecture technique jusqu'à la mise en production. Mon travail se situe à la croisée du développement web et mobile, des systèmes, de l'intelligence artificielle et de la cybersécurité.",
  },
};

// "architecture" slot — 4 badges wired onto the chip diagram. Quick facts.
export const ARCHITECTURE_LAYERS = [
  {
    index: "01",
    title: "Cotonou, Bénin",
    layer: "Localisation",
    tags: ["GMT+1", "Remote OK"],
    anchor: { x: 47, y: 20 },
    lineStart: { x: 30, y: 14 },
    badge: { side: "left" as const, x: 6, y: 10 },
  },
  {
    index: "02",
    title: "Epitech — Expert en Informatique",
    layer: "Formation",
    tags: ["Cycle Ingénieur"],
    anchor: { x: 60, y: 38 },
    lineStart: { x: 70, y: 32 },
    badge: { side: "right" as const, x: 6, y: 28 },
  },
  {
    index: "03",
    title: "Systèmes, IA & ingénierie créative",
    layer: "Focus",
    tags: ["Bas niveau", "Machine Learning", "Créatif"],
    anchor: { x: 50, y: 50 },
    lineStart: { x: 30, y: 60 },
    badge: { side: "left" as const, x: 6, y: 56 },
  },
  {
    index: "04",
    title: "Ouvert aux opportunités",
    layer: "Statut",
    tags: ["Freelance", "Temps plein", "Co-fondation"],
    anchor: { x: 53, y: 72 },
    lineStart: { x: 70, y: 78 },
    badge: { side: "right" as const, x: 6, y: 74 },
  },
];

// "signal" slot — glass panel, philosophie / façon de travailler.
export const SIGNAL_FEATURES = [
  {
    index: "01",
    title: "Justesse, performance, finition",
    tags: ["Qualité"],
    description:
      "La justesse d'abord, la performance ensuite, la finition en dernier — toujours dans cet ordre.",
  },
  {
    index: "02",
    title: "Le bas niveau au service de la confiance",
    tags: ["Rigueur"],
    description:
      "Comprendre ce qu'il y a sous les abstractions rend le code haut niveau fiable, pas seulement rapide.",
  },
  {
    index: "03",
    title: "Livrer petit, livrer souvent",
    tags: ["Autonomie"],
    description: "La production reste la vraie revue de code.",
  },
];

// "network" slot — cartes flottantes sur la puce. Compléments au profil,
// sans répéter la bio du slot "hero" ni les quick facts d'ARCHITECTURE_LAYERS.
export const ABOUT_STORY = [
  {
    title: "Webspace",
    description:
      "Une plateforme d'incubation qui accompagne des startups de l'idée à la mise en production. J'y suis cofondateur et développeur principal.",
    tags: ["Cofondateur", "Startup"],
    position: { left: 6, top: 12 },
  },
  {
    title: "Formation",
    description:
      "Cycle ingénieur à Epitech, expert en informatique — un parcours exigeant qui a forgé le goût de la rigueur et des délais tenus.",
    tags: ["Epitech", "Expert en informatique"],
    position: { left: 32, top: 62 },
  },
  {
    title: "Ce qui m'anime",
    description:
      "La curiosité plus que la spécialisation : comprendre un système jusqu'au bas niveau, puis s'en servir pour construire quelque chose d'utile.",
    tags: ["Curiosité", "Rigueur"],
    position: { left: 64, top: 20 },
  },
];

// ---------------------------------------------------------------------------
// Act II — Réalisations (Cube)
// ---------------------------------------------------------------------------

export const ACT2 = {
  framePath: "/frames_cube",
  frameCount: 240,
  heightVh: 480,
  sections: {
    assembly: { start: 0, end: 0.3 },
    rays: { start: 0.3, end: 0.7 },
    expansion: { start: 0.7, end: 1 },
  },
};

export type ProjectStatus = "ONLINE" | "BETA";

export interface ProjectCaseStudy {
  problem: string;
  approach: string;
  outcome: string;
}

// "rays" slot — cartes projet cliquables (étude de cas complète).
export const PROJECTS = [
  {
    slug: "trading-bot",
    title: "Bot de Trading IA",
    description:
      "Outil d'automatisation et d'aide à la décision qui analyse les marchés financiers en temps réel.",
    role: "Conception et développement solo — de l'algorithme au déploiement.",
    tags: ["IA", "Machine Learning", "Finance"],
    status: "ONLINE" as ProjectStatus,
    position: { left: 4, top: 10 },
    caseStudy: {
      problem:
        "Suivre les marchés financiers à la main et réagir assez vite aux opportunités d'achat/vente ne tient pas à l'échelle.",
      approach:
        "Conception et développement d'un bot de trading automatisé intégrant des algorithmes d'IA pour analyser les marchés financiers et déclencher des décisions d'achat/vente en temps réel.",
      outcome:
        "Un bot fonctionnel qui transforme l'analyse de marché en décisions de trading automatisées, en temps réel.",
    },
  },
  {
    slug: "incubation-platform",
    title: "Plateforme d'Incubation de Startups",
    description:
      "Plateforme web & mobile fullstack accompagnant les startups de l'idée à la production.",
    role: "Cofondateur et développeur principal chez Webspace.",
    tags: ["Fullstack", "Web", "Mobile"],
    status: "ONLINE" as ProjectStatus,
    position: { left: 36, top: 14 },
    caseStudy: {
      problem:
        "Les startups en incubation avaient besoin d'un seul endroit pour passer du concept initial à un produit livré, plutôt que des outils épars.",
      approach:
        "Conception et développement d'une plateforme web et mobile fullstack de bout en bout, couvrant tout le parcours d'incubation, du concept initial jusqu'au déploiement en production.",
      outcome:
        "Une plateforme qui accompagne activement des startups dans leur construction et leur lancement.",
    },
  },
  {
    slug: "game-engine",
    title: "Moteur de Jeu & RPG Maison",
    description: "Un moteur de jeu 2D conçu de zéro en C/C++, propulsant des titres façon RPG.",
    role: "Conception et développement solo du moteur et des jeux.",
    tags: ["C", "C++", "Moteur de jeu"],
    status: "BETA" as ProjectStatus,
    position: { left: 68, top: 10 },
    caseStudy: {
      problem:
        "Utiliser un moteur de jeu tout fait cache exactement ce qu'on cherche à apprendre : comment le rendu, les entrées et la boucle de jeu fonctionnent réellement en dessous.",
      approach:
        "Construction d'un moteur de jeu complet de zéro en C/C++ — architecture, rendu, boucle de jeu et outils internes — puis utilisation de ce moteur pour livrer des jeux façon RPG, Hunter et Sokoban, comme preuve concrète et jouable.",
      outcome: "Un moteur maison fonctionnel, avec deux jeux jouables construits directement dessus.",
    },
  },
  {
    slug: "haskell-language",
    title: "Langage de Programmation Maison",
    description: "Un langage de programmation conçu et implémenté de zéro en Haskell.",
    role: "Conception et implémentation solo — parseur, typage, interpréteur.",
    tags: ["Haskell", "Langage", "Compilateur"],
    status: "BETA" as ProjectStatus,
    position: { left: 6, top: 58 },
    caseStudy: {
      problem:
        "Utiliser des langages existants ne dit rien sur ce qui se passe réellement entre le code source et son exécution : comment un parseur, un système de types et un interpréteur fonctionnent ensemble.",
      approach:
        "Conception et implémentation d'un langage de programmation complet en Haskell — analyse lexicale, parsing, vérification de types et interprétation — en s'appuyant sur les garanties du système de types de Haskell lui-même.",
      outcome:
        "Un langage fonctionnel avec son propre parseur, typeur et interpréteur, et une compréhension concrète de ce qu'un langage fait réellement sous le capot.",
    },
  },
  {
    slug: "security-audits",
    title: "Audits de Sécurité Applicative",
    description:
      "Audits de sécurité et durcissement d'applications web pour protéger les données utilisateur.",
    role: "Audit, test d'intrusion et recommandations de correction.",
    tags: ["Pentest", "Hardening", "Sécurité Web"],
    status: "ONLINE" as ProjectStatus,
    position: { left: 38, top: 62 },
    caseStudy: {
      problem:
        "Des applications web mises en production sans revue de sécurité dédiée exposent des failles évitables — injection, authentification faible, données mal protégées.",
      approach:
        "Conduite d'audits de sécurité et de tests d'intrusion sur des applications web, puis durcissement des points faibles identifiés.",
      outcome:
        "Des applications plus robustes face aux vecteurs d'attaque courants, avec des recommandations de correction priorisées.",
    },
  },
  {
    slug: "ia-sport-trophy",
    title: "Trophée IA & Sport",
    description:
      "Vainqueur d'un concours d'innovation combinant intelligence artificielle et performance sportive.",
    role: "Lauréat — conception et présentation du projet gagnant.",
    tags: ["IA", "Innovation", "Compétition"],
    status: "ONLINE" as ProjectStatus,
    position: { left: 68, top: 58 },
    caseStudy: {
      problem:
        "Le concours proposait de repenser l'apport de l'IA à la performance sportive, dans un format compétitif à délai serré.",
      approach:
        "Conception et développement d'un projet combinant intelligence artificielle et analyse de performance sportive, présenté devant un jury.",
      outcome: "Premier prix du concours, récompensant l'approche technique et sa présentation.",
    },
  },
];

export const ACT2_CONTENT = {
  assembly: {
    eyebrow: "Acte II — Réalisations",
    title: "RÉALISATIONS",
    description:
      "Six réalisations qui vont du prototype à la production et à la reconnaissance : produits, langage de programmation, sécurité. Cliquez une carte pour l'étude de cas complète.",
  },
  // "expansion" slot — mot de clôture de l'acte.
  expansion: {
    closingBadge: "6 réalisations, de l'idée au déploiement.",
  },
};

// ---------------------------------------------------------------------------
// Act III — Compétences (Keyboard)
// ---------------------------------------------------------------------------

export const ACT3 = {
  framePath: "/frames_keyboard",
  frameCount: 240,
  heightVh: 350,
  sections: {
    explosion: { start: 0, end: 0.4 },
    circuit: { start: 0.4, end: 0.8 },
    reassembly: { start: 0.8, end: 1 },
  },
};

export const ACT3_CONTENT = {
  explosion: {
    eyebrow: "Acte III — Compétences",
    title: "COMPÉTENCES TECHNIQUES",
    description:
      "Du bas niveau à l'intelligence artificielle, en passant par le web — les compétences avec lesquelles je construis au quotidien.",
  },
  // "circuit" slot, colonne gauche — catégories de compétences.
  skillCategories: [
    {
      index: "01",
      title: "Langages",
      description: "Bas niveau et haut niveau, du système au script.",
      tags: ["C", "C++", "Python", "Haskell"],
    },
    {
      index: "02",
      title: "Web & Mobile",
      description: "Applications fullstack, du serveur à l'interface.",
      tags: ["React", "Next.js", "Dart", "API REST"],
    },
    {
      index: "03",
      title: "IA & Data",
      description: "Machine learning appliqué et trading algorithmique.",
      tags: ["Machine Learning", "PyTorch", "scikit-learn"],
    },
    {
      index: "04",
      title: "Sécurité & Ops",
      description: "Audits, durcissement, et livraison continue.",
      tags: ["Pentest", "Docker", "CI/CD", "Linux"],
    },
  ],
  // "circuit" slot, colonne droite — outils du quotidien (miroir de la colonne gauche).
  toolsEyebrow: "Outils & Workflow",
  tools: ["Git", "Linux", "Docker", "CI/CD"],
  summaryBadge: "Du bas niveau à l'IA — rigoureux, autonome, prêt à livrer.",
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

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
  heading: "CONSTRUISONS VOTRE PROCHAIN PRODUIT",
  subtext:
    "Ouvert au développement de produit, aux missions freelance, à un poste d'ingénieur fullstack à temps plein, ou à un projet de co-fondation.",
};

export const CONTACT_TERMINAL = {
  session: "session://core/contact-transceiver.sh",
  bootLines: [
    "[STATUT : CONNECTÉ]",
    "[INITIALISATION DE LA TRANSMISSION...]",
    `> CONNEXION AU CORE DE ${SITE.name.toUpperCase()} [SYSTÈMES : EN LIGNE]`,
  ],
  step1: ["> ÉTAPE 1/3 : IDENTIFICATION", "> ENTREZ VOTRE NOM :"],
  step2: ["> ÉTAPE 2/3 : ROUTE DE RETOUR", "> ENTREZ VOTRE ADRESSE EMAIL :"],
  step3: ["> ÉTAPE 3/3 : PAYLOAD", "> ENTREZ VOTRE MESSAGE :"],
  confirmLine: "> ENVOYER LE SIGNAL À ORACE HONFIN ? (O/N)",
};
