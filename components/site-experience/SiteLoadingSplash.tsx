"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type { AppReadyPhase } from "@/components/site-experience/use-app-ready";
import { cn } from "@/lib/utils";

type SiteLoadingSplashProps = {
  phase: AppReadyPhase;
  progress: number;
};

export function SiteLoadingSplash({ phase, progress }: SiteLoadingSplashProps) {
  const t = useTranslations("siteExperience.loading");

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-center items-center bg-background/95 backdrop-blur-md"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
      aria-busy={phase !== "exiting"}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--primary) 20%, transparent) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="top-1/4 left-1/2 absolute bg-primary/25 blur-3xl rounded-full size-72 -translate-x-1/2 pointer-events-none"
        aria-hidden
      />

      <div className="z-10 flex flex-col items-center gap-8 px-6 max-w-sm text-center">
        <motion.div
          className="relative flex justify-center items-center bg-primary/10 shadow-lg shadow-primary/15 border border-primary/25 rounded-3xl size-20"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Loader2 className="size-9 text-primary animate-spin" />
          <motion.span
            className="absolute inset-0 rounded-3xl ring-2 ring-primary/35"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            aria-hidden
          />
        </motion.div>

        <div className="space-y-2">
          <p className="font-semibold text-foreground text-lg tracking-tight">
            {t("title")}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="w-full space-y-2">
          <div className="bg-muted/80 rounded-full w-full h-1.5 overflow-hidden">
            <motion.div
              className={cn(
                "bg-linear-to-r from-primary via-primary/80 to-primary h-full rounded-full",
              )}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.round(progress)}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
          <p className="font-medium text-muted-foreground text-xs tabular-nums">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}
