"use client";
import { Code2, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function InfoPart() {
  const t = useTranslations("hero");

  return (
    <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-8 w-full">
      {/* Badge */}
      <Badge
        variant="outline"
        className="border-primary text-primary bg-primary/10 px-4 py-2 w-fit text-sm font-mono uppercase tracking-wider"
      >
        {t("badge")}
      </Badge>

      {/* Main Heading */}
      <div className="space-y-4 text-center lg:text-start">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <span className="text-foreground">{t("heading.line1")}</span>{" "}
          <span className="text-primary">{t("heading.line1Highlight")}</span>
          <br />
          <span className="text-foreground">{t("heading.line2")}</span>
          <br />
          <span className="text-foreground">{t("heading.line3")}</span>
        </h1>
      </div>

      {/* Description */}
      <p className="text-lg md:text-xl text-center lg:text-start text-muted-foreground max-w-2xl">
        {t("description")}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button size="lg" className="px-8 py-6  text-base">
          <Rocket className="mr-2 size-5" />
          {t("buttons.startProject")}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-foreground/20 hover:bg-foreground/5 font-mono uppercase tracking-wider px-8 py-6 text-base"
        >
          <Code2 className="mr-2 size-5" />
          {t("buttons.viewPortfolio")}
        </Button>
      </div>
    </div>
  );
}

export default InfoPart;
