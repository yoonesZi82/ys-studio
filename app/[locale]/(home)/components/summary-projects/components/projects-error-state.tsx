"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CloudOff, RefreshCw, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

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
import { cn } from "@/lib/utils";
import { ProjectsFetchErrorKind } from "@/app/types/projects.type";

import {
  emptyChildVariants,
  emptyStateVariants,
  viewportReveal,
} from "../animation/summary-projects-motion";

export function ProjectsErrorState({
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
  const copyKey =
    errorKind === "server" ? "server" : isOffline ? "offline" : "unknown";

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
              className="relative bg-destructive/10 shadow-destructive/10 shadow-lg mb-1 border border-destructive/25 rounded-2xl size-16 [&_svg]:size-7 overflow-visible text-destructive"
            >
              <Icon className="z-10 relative" />
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
              className="group hover:bg-destructive/10 px-8 border-destructive/30 hover:border-destructive/45"
              onClick={onRetry}
              disabled={isRetrying}
            >
              <RefreshCw
                className={cn(
                  "size-4",
                  isRetrying && "animate-spin",
                  !isRetrying &&
                    "group-hover:rotate-180 transition-transform duration-500",
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
