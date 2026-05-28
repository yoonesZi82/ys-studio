"use client";

import { useEffect, useMemo, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

import {
  fetchProjectsPage,
  isProjectsFetchError,
  SUMMARY_PROJECTS_PAGE_SIZE,
} from "@/app/helper/projects/projects-client";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ProjectCard } from "./components/project-card";
import { ProjectCardSkeleton } from "./components/project-card-skeleton";
import { ProjectsEmptyState } from "./components/projects-empty-state";
import { ProjectsErrorState } from "./components/projects-error-state";
import { ProjectsMasonry } from "./components/projects-masonry";
import { SummaryProjectsHeader } from "./components/summary-projects-header";
import { resolveProjectsErrorKind } from "./helpers/utils";

export default function SummaryProjects() {
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
        <SummaryProjectsHeader />

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
