"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ContactFormOverlayPhase = "loading" | "success";

type ContactFormCardOverlayProps = {
  phase: ContactFormOverlayPhase;
  onDismiss?: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

function OverlayBackdrop({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--primary) 22%, transparent) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        className="top-1/2 left-1/2 absolute bg-primary/30 blur-3xl rounded-full size-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    </>
  );
}

function LoadingContent({ reduceMotion }: { reduceMotion: boolean | null }) {
  const t = useTranslations("contact.form");

  return (
    <motion.div
      key="loading"
      className="z-10 flex flex-col items-center gap-6 px-8 max-w-xs text-center"
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
    >
      <div className="relative">
        <motion.div
          className="flex justify-center items-center bg-primary/15 shadow-[0_0_40px_hsl(var(--primary)/0.35)] border border-primary/30 rounded-3xl size-20"
          animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Loader2 className="size-9 text-primary animate-spin" />
          <Send
            className="absolute -top-1 -right-1 bg-primary p-1.5 border-2 border-card rounded-full size-7 text-primary-foreground"
            aria-hidden
          />
        </motion.div>

        {!reduceMotion &&
          [0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              className="absolute inset-0 rounded-3xl ring-2 ring-primary/40"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.35 + ring * 0.15, opacity: 0 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: ring * 0.45,
                ease: "easeOut",
              }}
              aria-hidden
            />
          ))}
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-foreground text-lg tracking-tight">
          {t("loadingTitle")}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("loadingSubtitle")}
        </p>
      </div>

      <div className="flex justify-center items-center gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="bg-primary rounded-full size-2"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -6, 0], opacity: [0.45, 1, 0.45] }
            }
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut",
            }}
            aria-hidden
          />
        ))}
      </div>
    </motion.div>
  );
}

function SuccessContent({
  reduceMotion,
  onDismiss,
}: {
  reduceMotion: boolean | null;
  onDismiss?: () => void;
}) {
  const t = useTranslations("contact.form");

  return (
    <motion.div
      key="success"
      className="z-10 flex flex-col items-center gap-6 px-8 max-w-sm text-center"
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
    >
      <div className="relative">
        <motion.div
          className="flex justify-center items-center bg-primary/15 shadow-[0_0_48px_hsl(var(--primary)/0.45)] border border-primary/40 rounded-3xl size-20"
          initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            delay: reduceMotion ? 0 : 0.05,
          }}
        >
          <CheckCircle2 className="size-10 text-primary" strokeWidth={2} />
        </motion.div>

        {!reduceMotion && (
          <motion.span
            className="absolute inset-0 rounded-3xl ring-2 ring-primary/50"
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            aria-hidden
          />
        )}
      </div>

      <motion.div
        className="space-y-2"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.15, duration: 0.35, ease }}
      >
        <p className="font-semibold text-foreground text-lg tracking-tight">
          {t("alertSuccessTitle")}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("submitSuccess")}
        </p>
      </motion.div>

      {onDismiss && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.28, duration: 0.3, ease }}
        >
          <Button
            type="button"
            variant="outline"
            className="border-primary/40 hover:bg-primary/10 rounded-xl"
            onClick={onDismiss}
          >
            {t("alertDismiss")}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

export function ContactFormCardOverlay({
  phase,
  onDismiss,
}: ContactFormCardOverlayProps) {
  const reduceMotion = useReducedMotion();
  const isSuccess = phase === "success";

  return (
    <motion.div
      className={cn(
        "z-20 absolute inset-0 flex flex-col justify-center items-center backdrop-blur-xl rounded-[40px] overflow-hidden",
        isSuccess ? "bg-primary/10" : "bg-card/80",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
      aria-live="polite"
      aria-busy={!isSuccess}
    >
      <OverlayBackdrop reduceMotion={reduceMotion} />

      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <LoadingContent key="loading" reduceMotion={reduceMotion} />
        ) : (
          <SuccessContent
            key="success"
            reduceMotion={reduceMotion}
            onDismiss={onDismiss}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
