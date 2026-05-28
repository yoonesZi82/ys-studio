"use client";

import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type OfflineNetworkDialogProps = {
  open: boolean;
};

export function OfflineNetworkDialog({ open }: OfflineNetworkDialogProps) {
  const t = useTranslations("siteExperience.offline");

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md border-destructive/30"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="items-center text-center gap-4">
          <div className="flex justify-center items-center bg-destructive/10 border border-destructive/25 rounded-2xl size-14 text-destructive">
            <WifiOff className="size-7" />
          </div>
          <DialogTitle className="text-xl">{t("title")}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {t("description")}
          </DialogDescription>
          <p className="text-muted-foreground text-sm">{t("hint")}</p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
