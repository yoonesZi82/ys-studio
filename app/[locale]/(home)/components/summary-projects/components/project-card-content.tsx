"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { normalizeProjectTags } from "@/app/helper/other";
import { Project } from "@/app/types/projects.type";

import { ProjectCardTags } from "./project-tags";
import { ProjectDescription } from "./project-description";

export function ProjectCardContent({
  project,
  linked,
}: {
  project: Project;
  linked: boolean;
}) {
  const t = useTranslations("summaryProjects");
  const tags = normalizeProjectTags(project.tags);

  return (
    <div className="flex flex-col gap-3 bg-card p-5 border-border/60 border-t text-start">
      <ProjectCardTags projectId={project.id} tags={tags} />

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground text-base text-start leading-snug tracking-tight">
          {project.title}
        </h3>
        <ProjectDescription description={project.description} />
      </div>

      {linked && (
        <div className="flex justify-between rtl:justify-start items-center gap-2 bg-muted/40 group-hover:bg-primary/5 px-3 py-2 border border-border/80 group-hover:border-primary/25 rounded-md w-full transition-colors duration-300">
          <span className="flex-1 font-medium text-foreground text-xs">
            {t("viewProject")}
          </span>
          <span className="flex justify-center items-center bg-background group-hover:bg-primary ring-border/80 rounded-md ring-1 group-hover:ring-primary/30 size-8 text-foreground group-hover:text-primary-foreground transition-all duration-300 shrink-0">
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </span>
        </div>
      )}
    </div>
  );
}
