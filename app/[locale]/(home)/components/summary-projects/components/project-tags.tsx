"use client";

import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

import { projectTagBadgeClass, VISIBLE_TAG_COUNT } from "../helpers/constants";
import { stopCardNavigation } from "../helpers/utils";

function ProjectTagBadge({ tag }: { tag: string }) {
  return (
    <Badge
      variant="outline"
      size="sm"
      rounded="md"
      className={projectTagBadgeClass}
    >
      {tag}
    </Badge>
  );
}

function ProjectTagsOverflow({
  projectId,
  tags,
}: {
  projectId: string;
  tags: string[];
}) {
  const t = useTranslations("summaryProjects");
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openPopover = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <Popover open={open} modal={false}>
      <PopoverAnchor asChild>
        <button
          type="button"
          aria-label={t("moreTags")}
          aria-expanded={open}
          className="inline-flex justify-center items-center bg-muted/50 hover:bg-primary/10 border border-border/80 hover:border-primary/30 rounded-md size-6 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          onMouseEnter={openPopover}
          onMouseLeave={scheduleClose}
          onFocus={openPopover}
          onBlur={scheduleClose}
          onClick={stopCardNavigation}
          onPointerDown={stopCardNavigation}
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        side="top"
        className="z-50 bg-card shadow-lg p-2.5 border border-border w-auto max-w-64"
        onMouseEnter={openPopover}
        onMouseLeave={scheduleClose}
        onPointerDown={stopCardNavigation}
      >
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <ProjectTagBadge key={`${projectId}-more-${tag}`} tag={tag} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ProjectCardTags({
  projectId,
  tags,
}: {
  projectId: string;
  tags: string[];
}) {
  const visibleTags = tags.slice(0, VISIBLE_TAG_COUNT);
  const overflowTags = tags.slice(VISIBLE_TAG_COUNT);

  if (tags.length === 0) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap justify-start items-center gap-1"
      aria-label="Project tags"
    >
      {visibleTags.map((tag) => (
        <ProjectTagBadge key={`${projectId}-${tag}`} tag={tag} />
      ))}

      {overflowTags.length > 0 && (
        <ProjectTagsOverflow projectId={projectId} tags={overflowTags} />
      )}
    </div>
  );
}
