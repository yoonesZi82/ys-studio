"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  motionEase,
  sectionHeaderVariants,
  viewportReveal,
} from "../animation/summary-projects-motion";

export function SummaryProjectsHeader() {
  const t = useTranslations("summaryProjects");
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex items-center w-full"
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportReveal}
      variants={sectionHeaderVariants}
    >
      <motion.div
        className="flex-1 bg-linear-to-r from-5% from-transparent via-95% to-transparent via-border h-px origin-right"
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.6, ease: motionEase, delay: 0.1 },
          },
        }}
      />
      <div className="z-10 bg-primary px-4 py-1 border rounded-xl">
        <span className="font-medium text-background text-sm">
          {t("sectionTitle")}
        </span>
      </div>
      <motion.div
        className="flex-1 bg-linear-to-l from-5% from-transparent via-95% to-transparent via-border h-px origin-left"
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.6, ease: motionEase, delay: 0.1 },
          },
        }}
      />
    </motion.div>
  );
}
