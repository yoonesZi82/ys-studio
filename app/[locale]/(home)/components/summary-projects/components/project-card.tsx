"use client";

import { SUMMARY_PROJECTS_PAGE_SIZE } from "@/app/helper/projects/projects-client";
import { Project } from "@/app/types/projects.type";

import { AnimatedGridItem } from "./animated-grid-item";
import { ProjectCardInner } from "./project-card-inner";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const indexInPage = index % SUMMARY_PROJECTS_PAGE_SIZE;

  return (
    <AnimatedGridItem indexInPage={indexInPage}>
      <ProjectCardInner project={project} index={index} />
    </AnimatedGridItem>
  );
}
