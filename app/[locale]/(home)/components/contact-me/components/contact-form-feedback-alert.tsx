"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactFormFeedbackAlertProps = {
  error: string | null;
  onDismissError?: () => void;
};

export function ContactFormFeedbackAlert({
  error,
  onDismissError,
}: ContactFormFeedbackAlertProps) {
  const t = useTranslations("contact.form");
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.98 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div className="mt-5" {...motionProps} key="error">
          <Alert
            variant="destructive"
            className={cn(
              "relative gap-3 bg-destructive/5 backdrop-blur-sm p-5 border-destructive/35 rounded-2xl",
              "shadow-[0_12px_40px_hsl(var(--destructive)/0.12)]",
            )}
          >
            <AlertCircle className="size-5 text-destructive" />
            <AlertTitle className="text-destructive text-base">
              {t("alertErrorTitle")}
            </AlertTitle>
            <AlertDescription className="text-destructive/90">
              {error}
            </AlertDescription>
            {onDismissError && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="top-3 right-3 absolute text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onDismissError}
                aria-label={t("alertDismiss")}
              >
                <X className="size-4" />
              </Button>
            )}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
