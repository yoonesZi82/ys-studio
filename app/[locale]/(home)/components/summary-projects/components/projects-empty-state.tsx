"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FolderKanban, Sparkles } from "lucide-react";
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

import {
  emptyChildVariants,
  emptyStateVariants,
  viewportReveal,
} from "../animation/summary-projects-motion";

export function ProjectsEmptyState() {
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
