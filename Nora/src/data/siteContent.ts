/**
 * Contenu du site. Toutes les données ci-dessous sont des données de
 * démonstration (placeholder) : remplacez-les par les informations réelles
 * du cabinet avant toute mise en production.
 */

export const isDemoContent = true

export const doctor = {
  name: 'Dr. Élise Vasseur',
  title: 'Chirurgienne orthopédiste — spécialiste du rachis',
  logoInitials: 'EV',
}

export const nav = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Cabinet', href: '#cabinet' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Chirurgie du rachis & traumatologie',
  title: 'Chirurgie orthopédique & traumatologie avancée',
  subtitle:
    'Spécialiste de la colonne vertébrale, de la traumatologie du sport et de la chirurgie articulaire.',
  reassurance: 'Prise en charge personnalisée, du diagnostic au suivi post-opératoire.',
  primaryCta: 'Prendre rendez-vous',
  secondaryCta: "Découvrir l'expertise",
}

export interface Specialty {
  icon: 'spine' | 'sport' | 'joint' | 'minInvasive'
  title: string
  description: string
}

export const specialties: Specialty[] = [
  {
    icon: 'spine',
    title: 'Pathologies du rachis',
    description:
      'Diagnostic et traitement des hernies discales, sténoses et déformations de la colonne vertébrale.',
  },
  {
    icon: 'sport',
    title: 'Traumatologie sportive',
    description:
      "Prise en charge des blessures liées au sport, de l'urgence à la rééducation complète.",
  },
  {
    icon: 'joint',
    title: 'Prothèses articulaires',
    description:
      'Pose de prothèses de hanche, de genou et d’épaule avec des techniques éprouvées.',
  },
  {
    icon: 'minInvasive',
    title: 'Chirurgie mini-invasive',
    description:
      'Interventions par voie percutanée pour réduire la douleur et accélérer la récupération.',
  },
]

/** Ces chiffres et formations sont fournis à titre d'exemple — à remplacer par les données réelles. */
export const experience = {
  intro: 'Un parcours dédié à la chirurgie de la colonne vertébrale et de l’appareil locomoteur.',
  stats: [
    { value: '15+', label: "années d'expérience" },
    { value: '3200+', label: 'interventions réalisées' },
    { value: '98%', label: 'patients satisfaits' },
    { value: '24/7', label: 'astreinte post-opératoire' },
  ],
  timeline: [
    {
      year: '2009',
      title: 'Doctorat en médecine',
      place: 'Université Paris Descartes',
    },
    {
      year: '2014',
      title: 'Spécialisation en chirurgie du rachis',
      place: "Hôpital universitaire — clinique du rachis",
    },
    {
      year: '2018',
      title: 'Chef de service adjoint',
      place: 'Centre hospitalier régional',
    },
    {
      year: '2023',
      title: 'Ouverture du cabinet',
      place: 'Cabinet de chirurgie orthopédique',
    },
  ],
  technologies: [
    'Navigation chirurgicale assistée par ordinateur',
    'Chirurgie mini-invasive par endoscopie',
    'Imagerie peropératoire 3D',
    'Robotique chirurgicale',
  ],
}

export const contact = {
  practiceName: 'Cabinet de chirurgie orthopédique — Dr. Vasseur',
  address: '12 avenue de la République, 75011 Paris',
  phone: '+33 1 23 45 67 89',
  email: 'contact@cabinet-vasseur-demo.fr',
  hours: [
    { day: 'Lundi — Vendredi', time: '9h00 – 18h30' },
    { day: 'Samedi', time: '9h00 – 12h30' },
    { day: 'Dimanche', time: 'Fermé' },
  ],
  bookingCta: 'Prendre rendez-vous',
  /** Aucun service de prise de rendez-vous n'est connecté : lien placeholder. */
  bookingUrl: '#booking-placeholder',
  mapEmbedUrl: null as string | null,
}
