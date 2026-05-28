"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { useTranslations } from "next-intl";

function HeroTerminal() {
  const t = useTranslations("hero.terminal");

  return (
    <div className="flex justify-center items-center w-full">
      <Terminal className="w-full min-h-[340px] -rotate-2">
        <TypingAnimation>{t("whoamiCmd")}</TypingAnimation>
        <AnimatedSpan>{t("whoamiOutput")}</AnimatedSpan>

        <TypingAnimation>{t("skillsCmd")}</TypingAnimation>
        <AnimatedSpan className="text-green-500">{t("frontend")}</AnimatedSpan>
        <AnimatedSpan className="text-green-500">{t("backend")}</AnimatedSpan>
        <AnimatedSpan className="text-green-500">{t("database")}</AnimatedSpan>
        <AnimatedSpan className="text-green-500">{t("devops")}</AnimatedSpan>

        <TypingAnimation>{t("passionCmd")}</TypingAnimation>
        <AnimatedSpan>{t("passion")}</AnimatedSpan>

        <TypingAnimation>{t("statusCmd")}</TypingAnimation>
        <AnimatedSpan className="flex items-center gap-1.5 mx-0.5">
          <span className="relative flex size-2">
            <span className="inline-flex absolute bg-green-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
            <span className="inline-flex relative bg-green-500 rounded-full size-2"></span>
          </span>
          <span className="text-green-500">{t("statusAvailable")}</span>
        </AnimatedSpan>
      </Terminal>
    </div>
  );
}

export default HeroTerminal;
