import type { Transition, Variants } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as const;

/** Animate only while in view; reset when scrolled away so it can play again. */
export const viewportReveal = {
  once: false,
  amount: 0.4,
} as const;

export const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: motionEase },
  },
};

export const CARD_STAGGER_DELAY = 0.1;

export const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export function getCardRevealTransition(
  indexInPage: number,
  reducedMotion: boolean | null,
): Transition {
  if (reducedMotion) {
    return { duration: 0 };
  }

  return {
    duration: 0.55,
    delay: indexInPage * CARD_STAGGER_DELAY,
    ease: motionEase,
  };
}

export const emptyStateVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: motionEase,
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const emptyChildVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: motionEase },
  },
};
