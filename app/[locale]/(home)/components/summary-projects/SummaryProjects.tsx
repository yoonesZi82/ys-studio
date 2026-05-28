"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CloudOff,
  FolderKanban,
  Loader2,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import {
  cardRevealVariants,
  emptyChildVariants,
  emptyStateVariants,
  getCardRevealTransition,
  sectionHeaderVariants,
  viewportReveal,
  motionEase,
} from "./summary-projects-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  fetchProjectsPage,
  isProjectsFetchError,
  SUMMARY_PROJECTS_PAGE_SIZE,
  type ProjectsFetchErrorKind,
} from "@/lib/api/projects-client";
import { hasProjectLink, isExternalProjectLink } from "@/lib/project-link";
import {
  normalizeProjectImageSrc,
  PROJECT_IMAGE_FALLBACK,
} from "@/lib/project-image";
import { normalizeProjectTags } from "@/lib/project-tags";
import type { Project } from "@/lib/types/project";
import { cn } from "@/lib/utils";

const cardBaseClass =
  "group flex w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-sm transition-[box-shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardInteractiveClass =
  "cursor-pointer hover:border-primary/30 hover:shadow-md hover:shadow-primary/5";

const imageWrapClass = "relative aspect-[4/3] w-full overflow-hidden bg-muted";

const MASONRY_COLUMNS = {
  480: 1,
  640: 2,
  1024: 3,
  1280: 4,
} as const;

/** Matches MASONRY_COLUMNS — stable markup for SSR / first paint. */
const masonryFallbackClass =
  "grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

function ProjectsMasonry({ children }: { children: React.ReactNode }) {
  const [isMasonryReady, setIsMasonryReady] = useState(false);

  useEffect(() => {
    setIsMasonryReady(true);
  }, []);

  if (!isMasonryReady) {
    return <div className={masonryFallbackClass}>{children}</div>;
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={MASONRY_COLUMNS}
      className="w-full"
    >
      <Masonry gutter="1rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
}

const VISIBLE_TAG_COUNT = 4;

const projectTagBadgeClass =
  "shrink-0 border-border/80 bg-muted/50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-foreground";

function stopCardNavigation(event: React.SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

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

function ProjectCardTags({
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
      className="flex flex-wrap items-center gap-1"
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

function AnimatedGridItem({
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

function ProjectCardSkeleton({ indexInPage }: { indexInPage: number }) {
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

function ProjectCardMedia({
  projectTitle,
  index,
  imageSrc,
  onImageError,
}: {
  projectTitle: string;
  index: number;
  imageSrc: string;
  onImageError: () => void;
}) {
  return (
    <div className={imageWrapClass}>
      <Image
        src={imageSrc}
        alt={projectTitle}
        fill
        priority={index < 4}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        onError={onImageError}
      />
    </div>
  );
}

const DESCRIPTION_TOOLTIP_MIN_LENGTH = 120;

function ProjectDescription({ description }: { description: string }) {
  const showTooltip =
    description.trim().length > DESCRIPTION_TOOLTIP_MIN_LENGTH;

  const clampedText = (
    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
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
          className="block text-left cursor-default"
          onPointerDown={stopCardNavigation}
          onClick={stopCardNavigation}
        >
          {clampedText}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        className="max-w-xs text-left leading-relaxed whitespace-pre-line"
      >
        {description}
      </TooltipContent>
    </Tooltip>
  );
}

function ProjectCardContent({
  project,
  linked,
}: {
  project: Project;
  linked: boolean;
}) {
  const t = useTranslations("summaryProjects");
  const tags = normalizeProjectTags(project.tags);

  return (
    <div className="flex flex-col gap-3 bg-card p-5 border-border/60 border-t">
      <ProjectCardTags projectId={project.id} tags={tags} />

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground text-base leading-snug tracking-tight">
          {project.title}
        </h3>
        <ProjectDescription description={project.description} />
      </div>

      {linked && (
        <div className="flex justify-between items-center gap-2 bg-muted/40 group-hover:bg-primary/5 px-3 py-2 border border-border/80 group-hover:border-primary/25 rounded-md transition-colors duration-300">
          <span className="font-medium text-foreground text-xs">
            {t("viewProject")}
          </span>
          <span className="flex justify-center items-center bg-background group-hover:bg-primary ring-border/80 rounded-md ring-1 group-hover:ring-primary/30 size-8 text-foreground group-hover:text-primary-foreground transition-all duration-300 shrink-0">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      )}
    </div>
  );
}

function resolveProjectsErrorKind(
  error: unknown,
  isOnline: boolean,
): ProjectsFetchErrorKind {
  if (!isOnline) {
    return "offline";
  }

  if (isProjectsFetchError(error)) {
    return error.kind;
  }

  return "unknown";
}

function ProjectsErrorState({
  errorKind,
  onRetry,
  isRetrying,
}: {
  errorKind: ProjectsFetchErrorKind;
  onRetry: () => void;
  isRetrying: boolean;
}) {
  const t = useTranslations("summaryProjects.errorState");
  const reduceMotion = useReducedMotion();
  const isOffline = errorKind === "offline";

  const Icon = isOffline ? WifiOff : CloudOff;
  const copyKey = errorKind === "server" ? "server" : isOffline ? "offline" : "unknown";

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportReveal}
      variants={emptyStateVariants}
    >
      <Empty className="isolate relative bg-linear-to-b from-destructive/8 via-background to-background px-6 py-14 md:py-16 border border-destructive/30 border-dashed rounded-2xl min-h-80 md:min-h-88 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.28] pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--destructive) 22%, transparent) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="-top-20 left-1/2 absolute bg-destructive/15 blur-3xl rounded-full size-56 -translate-x-1/2 pointer-events-none"
          aria-hidden
        />

        {!reduceMotion && (
          <motion.div
            className="top-8 right-10 absolute opacity-20 pointer-events-none"
            aria-hidden
            animate={{ y: [0, -8, 0], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <CloudOff className="size-16 text-destructive" />
          </motion.div>
        )}

        <EmptyHeader className="z-10 relative gap-3">
          <motion.div variants={emptyChildVariants}>
            <Badge
              variant="outline"
              className="bg-destructive/10 px-3 py-1 border-destructive/35 font-medium text-[10px] text-destructive uppercase tracking-[0.2em]"
            >
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.div variants={emptyChildVariants}>
            <EmptyMedia
              variant="icon"
              className="relative bg-destructive/10 shadow-lg shadow-destructive/10 mb-1 border border-destructive/25 rounded-2xl size-16 [&_svg]:size-7 text-destructive overflow-visible"
            >
              <Icon className="relative z-10" />
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-2xl ring-2 ring-destructive/30"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  aria-hidden
                />
              )}
            </EmptyMedia>
          </motion.div>

          <motion.div variants={emptyChildVariants}>
            <EmptyTitle className="font-semibold text-2xl md:text-3xl tracking-tight">
              {t(`${copyKey}.title`)}
            </EmptyTitle>
          </motion.div>

          <motion.div variants={emptyChildVariants}>
            <EmptyDescription className="max-w-md text-muted-foreground text-base">
              {t(`${copyKey}.description`)}
            </EmptyDescription>
          </motion.div>
        </EmptyHeader>

        <EmptyContent className="z-10 relative pt-2">
          <motion.div variants={emptyChildVariants}>
            <Button
              size="lg"
              variant="outline"
              className="group px-8 border-destructive/30 hover:bg-destructive/10 hover:border-destructive/45"
              onClick={onRetry}
              disabled={isRetrying}
            >
              <RefreshCw
                className={cn(
                  "size-4",
                  isRetrying && "animate-spin",
                  !isRetrying && "group-hover:rotate-180 transition-transform duration-500",
                )}
              />
              {isRetrying ? t("retrying") : t("retry")}
            </Button>
          </motion.div>
        </EmptyContent>
      </Empty>
    </motion.div>
  );
}

function ProjectsEmptyState() {
  const t = useTranslations("summaryProjects.empty");
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={viewportReveal}
      variants={emptyStateVariants}
    >
      <Empty className="isolate relative bg-linear-to-b from-primary/5 via-background to-background px-6 py-14 md:py-16 border border-primary/25 border-dashed rounded-2xl min-h-80 md:min-h-88 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--primary) 18%, transparent) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="-top-24 left-1/2 absolute bg-primary/20 blur-3xl rounded-full size-64 -translate-x-1/2 pointer-events-none"
          aria-hidden
        />

        <div
          className="absolute inset-0 flex justify-center items-center gap-4 opacity-[0.12] pointer-events-none"
          aria-hidden
        >
          <motion.div
            variants={emptyChildVariants}
            className="bg-foreground/5 border border-foreground/30 rounded-2xl w-28 h-36 -rotate-6"
          />
          <motion.div
            variants={emptyChildVariants}
            className="bg-primary/10 border border-primary/40 rounded-2xl w-32 h-44 rotate-3"
          />
          <motion.div
            variants={emptyChildVariants}
            className="hidden sm:block bg-foreground/5 border border-foreground/30 rounded-2xl w-28 h-36 rotate-6"
          />
        </div>

        <EmptyHeader className="z-10 relative gap-3">
          <motion.div variants={emptyChildVariants}>
            <Badge
              variant="outline"
              className="bg-primary/10 px-3 py-1 border-primary/30 font-medium text-[10px] text-primary uppercase tracking-[0.2em]"
            >
              <Sparkles className="size-3" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.div variants={emptyChildVariants}>
            <EmptyMedia
              variant="icon"
              className="bg-primary/10 shadow-lg shadow-primary/10 mb-1 border border-primary/20 rounded-2xl size-16 [&_svg]:size-7 text-primary"
            >
              <FolderKanban />
            </EmptyMedia>
          </motion.div>

          <motion.div variants={emptyChildVariants}>
            <EmptyTitle className="font-semibold text-2xl md:text-3xl tracking-tight">
              {t("title")}
            </EmptyTitle>
          </motion.div>

          <motion.div variants={emptyChildVariants}>
            <EmptyDescription className="max-w-md text-muted-foreground text-base">
              {t("description")}
            </EmptyDescription>
          </motion.div>
        </EmptyHeader>

        <EmptyContent className="z-10 relative pt-2">
          <motion.div variants={emptyChildVariants}>
            <Button size="lg" className="group px-8" asChild>
              <Link href="#contact-me">
                {t("cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 duration-300" />
              </Link>
            </Button>
          </motion.div>
        </EmptyContent>
      </Empty>
    </motion.div>
  );
}

function ProjectCardInner({
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const indexInPage = index % SUMMARY_PROJECTS_PAGE_SIZE;

  return (
    <AnimatedGridItem indexInPage={indexInPage}>
      <ProjectCardInner project={project} index={index} />
    </AnimatedGridItem>
  );
}

export default function SummaryProjects() {
  const t = useTranslations("summaryProjects");
  const reduceMotion = useReducedMotion();
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.2 });
  const [isOnline, setIsOnline] = useState(true);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["summary-projects"],
    queryFn: ({ pageParam = 1 }) => fetchProjectsPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, err) => {
      if (isProjectsFetchError(err) && err.kind === "offline") {
        return false;
      }
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const syncOnline = () => setIsOnline(navigator.onLine);

    syncOnline();
    window.addEventListener("online", syncOnline);
    window.addEventListener("offline", syncOnline);

    return () => {
      window.removeEventListener("online", syncOnline);
      window.removeEventListener("offline", syncOnline);
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      if (isError) {
        void refetch();
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [isError, refetch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isError) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isError]);

  const errorKind = resolveProjectsErrorKind(error, isOnline);

  const projects = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const isEmpty = !isLoading && !isError && projects.length === 0;

  return (
    <TooltipProvider delayDuration={200}>
      <section
        id="projects"
        className="flex flex-col gap-8 py-12 w-full scroll-mt-14"
        suppressHydrationWarning
      >
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

        <AnimatePresence mode="wait">
          {isError ? (
            <motion.div
              key="error"
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full"
            >
              <ProjectsErrorState
                errorKind={errorKind}
                onRetry={() => void refetch()}
                isRetrying={isRefetching}
              />
            </motion.div>
          ) : isEmpty ? (
            <motion.div key="empty" exit={{ opacity: 0, scale: 0.98 }}>
              <ProjectsEmptyState />
            </motion.div>
          ) : (
            <ProjectsMasonry>
              {isLoading
                ? Array.from({ length: SUMMARY_PROJECTS_PAGE_SIZE }).map(
                    (_, index) => (
                      <ProjectCardSkeleton
                        key={index}
                        indexInPage={index % SUMMARY_PROJECTS_PAGE_SIZE}
                      />
                    ),
                  )
                : projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
            </ProjectsMasonry>
          )}
        </AnimatePresence>

        {!isEmpty && !isError && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center w-full min-h-10"
          >
            <AnimatePresence>
              {isFetchingNextPage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Loader2 className="size-6 text-muted-foreground animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </section>
    </TooltipProvider>
  );
}
