"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DESCRIPTION_TOOLTIP_MIN_LENGTH } from "../helpers/constants";
import { stopCardNavigation } from "../helpers/utils";

export function ProjectDescription({ description }: { description: string }) {
  const showTooltip =
    description.trim().length > DESCRIPTION_TOOLTIP_MIN_LENGTH;

  const clampedText = (
    <p className="text-muted-foreground text-sm text-start line-clamp-3 leading-relaxed">
      {description}
    </p>
  );

  if (!showTooltip) {
    return clampedText;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="block text-start cursor-default"
          onPointerDown={stopCardNavigation}
          onClick={stopCardNavigation}
        >
          {clampedText}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        className="max-w-xs text-start leading-relaxed whitespace-pre-line"
      >
        {description}
      </TooltipContent>
    </Tooltip>
  );
}
