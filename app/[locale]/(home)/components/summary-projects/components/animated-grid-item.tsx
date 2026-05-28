"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  cardRevealVariants,
  getCardRevealTransition,
  viewportReveal,
} from "../animation/summary-projects-motion";

export function AnimatedGridItem({
  indexInPage,
  className,
  children,
}: {
  indexInPage: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportReveal}
      variants={cardRevealVariants}
      transition={getCardRevealTransition(indexInPage, reduceMotion)}
    >
      {children}
    </motion.div>
  );
}
