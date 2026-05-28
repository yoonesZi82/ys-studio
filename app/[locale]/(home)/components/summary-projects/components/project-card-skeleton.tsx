"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { AnimatedGridItem } from "./animated-grid-item";
import {
  cardBaseClass,
  imageWrapClass,
  VISIBLE_TAG_COUNT,
} from "../helpers/constants";

export function ProjectCardSkeleton({ indexInPage }: { indexInPage: number }) {
  return (
    <AnimatedGridItem indexInPage={indexInPage}>
      <div className={cn(cardBaseClass, "pointer-events-none")}>
        <Skeleton className={cn(imageWrapClass, "rounded-none")} />
        <div className="flex flex-col gap-3 p-5 border-border/60 border-t">
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: VISIBLE_TAG_COUNT }).map((_, tagIndex) => (
              <Skeleton
                key={tagIndex}
                className="rounded-md w-14 h-5 shrink-0"
              />
            ))}
            <Skeleton className="rounded-md size-6 shrink-0" />
          </div>
          <Skeleton className="w-3/4 h-5" />
          <div className="space-y-1.5">
            {Array.from({ length: 3 }).map((_, line) => (
              <Skeleton key={line} className="w-full h-3.5" />
            ))}
          </div>
          <Skeleton className="rounded-md w-full h-9" />
        </div>
      </div>
    </AnimatedGridItem>
  );
}
