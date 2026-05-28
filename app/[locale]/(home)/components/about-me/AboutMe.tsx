"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "NestJS",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Redux Toolkit",
  "React Query",
  "REST API",
  "GraphQL",
  "Docker",
  "Git",
];

function AboutMe() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRtl = locale === "fa";

  return (
    <section
      id="about"
      className="flex lg:flex-row flex-col gap-3 lg:gap-20 w-full scroll-mt-24"
    >
      <Image
        src="/me.jpg"
        alt={t("imageAlt")}
        width={500}
        height={500}
        className="flex-[0.6] shadow-sm border border-border rounded-xl object-cover"
        loading="eager"
      />

      <div className="flex flex-col flex-1 justify-center gap-4 w-full">
        <div className="space-y-2">
          <h2 className="font-semibold text-foreground text-4xl text-center lg:text-start leading-tight">
            {t("title")}
            <span className="text-primary"> {t("titleHighlight")} </span>
          </h2>

          <p
            className={cn(
              "text-foreground/80 text-center lg:text-start leading-7",
              isRtl ? "text-right pl-10 lg:pr-0 " : "text-left pr-0 lg:pr-10 ",
            )}
          >
            {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start items-center lg:items-start gap-2">
          {skills.map((skill) => (
            <Badge key={skill} size="lg" rounded="md" variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
