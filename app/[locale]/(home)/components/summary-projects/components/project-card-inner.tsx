"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import {
  hasProjectLink,
  isExternalProjectLink,
  normalizeProjectImageSrc,
  PROJECT_IMAGE_FALLBACK,
} from "@/app/helper/other";
import { cn } from "@/lib/utils";
import { Project } from "@/app/types/projects.type";

import { motionEase } from "../animation/summary-projects-motion";
import { cardBaseClass, cardInteractiveClass } from "../helpers/constants";
import { ProjectCardContent } from "./project-card-content";
import { ProjectCardMedia } from "./project-card-media";

export function ProjectCardInner({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState(() =>
    normalizeProjectImageSrc(project.image),
  );
  const link = project.link?.trim() ?? "";
  const linked = hasProjectLink(link);
  const reduceMotion = useReducedMotion();

  const content = (
    <>
      <ProjectCardMedia
        projectTitle={project.title}
        index={index}
        imageSrc={imageSrc}
        onImageError={() => setImageSrc(PROJECT_IMAGE_FALLBACK)}
      />
      <ProjectCardContent project={project} linked={linked} />
    </>
  );

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { y: -6, transition: { duration: 0.25, ease: motionEase } },
        whileTap: { scale: 0.99 },
      };

  if (!linked) {
    return (
      <motion.article className={cn(cardBaseClass, className)} {...motionProps}>
        {content}
      </motion.article>
    );
  }

  const cardClassName = cn(cardBaseClass, cardInteractiveClass, className);

  if (isExternalProjectLink(link)) {
    return (
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
        aria-label={`Open ${project.title}`}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps} className="w-full h-full">
      <Link
        href={link}
        className={cn(cardClassName, "block h-full w-full")}
        aria-label={`Open ${project.title}`}
      >
        {content}
      </Link>
    </motion.div>
  );
}
