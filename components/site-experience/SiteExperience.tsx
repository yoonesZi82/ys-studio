"use client";

import { AnimatePresence } from "framer-motion";

import { OfflineNetworkDialog } from "@/components/site-experience/OfflineNetworkDialog";
import { SiteLoadingSplash } from "@/components/site-experience/SiteLoadingSplash";
import { useAppReady } from "@/components/site-experience/use-app-ready";
import { useOnlineStatus } from "@/components/site-experience/use-online-status";
import { cn } from "@/lib/utils";

export default function SiteExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOnline = useOnlineStatus();
  const { phase, progress } = useAppReady();
  const showSplash = phase !== "ready" && isOnline;

  return (
    <>
      <div
        className={cn(
          "flex flex-col flex-1 w-full",
          showSplash && "h-screen overflow-hidden",
        )}
        inert={showSplash ? true : undefined}
      >
        {children}
      </div>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SiteLoadingSplash key="splash" phase={phase} progress={progress} />
        ) : null}
      </AnimatePresence>

      <OfflineNetworkDialog open={!isOnline} />
    </>
  );
}
