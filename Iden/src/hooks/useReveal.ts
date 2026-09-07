import { useReducedMotion, type Variants } from "framer-motion";

// Construit les props d'apparition douce (fondu + léger déplacement) à
// partir de la préférence de mouvement déjà lue par le composant appelant.
// Fonction pure (pas un hook) afin de pouvoir être utilisée dans une boucle.
export function revealProps(prefersReducedMotion: boolean | null, delay = 0) {
  const variants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay },
        },
      };

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-80px" },
    variants,
  } as const;
}

// Hook pratique pour un site d'apparition unique dans un composant.
export function useReveal(delay = 0) {
  const prefersReducedMotion = useReducedMotion();
  return revealProps(prefersReducedMotion, delay);
}

export { useReducedMotion };
