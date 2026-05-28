"use client";

import { useEffect, useState } from "react";

const MIN_SPLASH_MS = 700;
const EXIT_ANIMATION_MS = 550;

export type AppReadyPhase = "loading" | "exiting" | "ready";

function waitForWindowLoad(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForFonts(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => undefined);
}

export function useAppReady() {
  const [phase, setPhase] = useState<AppReadyPhase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();

    const finishLoading = () => {
      if (cancelled) return;

      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, MIN_SPLASH_MS - elapsed);

      window.setTimeout(() => {
        if (!cancelled) {
          setProgress(100);
          setPhase("exiting");
        }
      }, delay);
    };

    void Promise.all([waitForWindowLoad(), waitForFonts()]).then(finishLoading);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const tick = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 90) return value;
        const step = 4 + Math.random() * 10;
        return Math.min(90, value + step);
      });
    }, 180);

    return () => window.clearInterval(tick);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;

    const timer = window.setTimeout(() => {
      setPhase("ready");
    }, EXIT_ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  return { phase, progress, isAppReady: phase === "ready" };
}
