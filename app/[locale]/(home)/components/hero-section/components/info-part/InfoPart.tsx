import { Code2, Rocket } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function InfoPart() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  const isRtl = locale === "fa";

  return (
    <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-8 w-full text-center lg:text-start">
      <Badge
        variant="outline"
        className={cn(
          "border-primary text-primary bg-primary/10 px-4 py-2 w-fit text-sm tracking-wide",
          !isRtl && "font-mono uppercase tracking-wider",
        )}
      >
        {t("badge")}
      </Badge>

      <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
        <span className="block">
          <span className="text-foreground">{t("heading.line1")}</span>{" "}
          <span className="text-primary">{t("heading.line1Highlight")}</span>
        </span>
        <span className="block text-foreground">{t("heading.line2")}</span>
        <span className="block text-foreground">{t("heading.line3")}</span>
      </h1>

      <p className="max-w-2xl text-lg md:text-xl text-muted-foreground">
        {t("description")}
      </p>

      <div className="flex flex-wrap justify-center lg:justify-start gap-4">
        <Button size="lg" className="px-8 py-6 text-base" asChild>
          <Link href="#contact-me">
            <Rocket className="me-2 size-5 shrink-0" />
            {t("buttons.startProject")}
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={cn(
            "border-foreground/20 hover:bg-foreground/5 px-8 py-6 text-base",
            !isRtl && "font-mono uppercase tracking-wider",
          )}
          asChild
        >
          <Link href="#projects">
            <Code2 className="me-2 size-5 shrink-0" />
            {t("buttons.viewProjects")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default InfoPart;
