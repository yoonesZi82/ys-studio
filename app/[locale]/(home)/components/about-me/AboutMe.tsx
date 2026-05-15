import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

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
  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-20">
      <div className="flex-[0.6] overflow-hidden h-100 rounded-lg border border-border shadow-sm relative">
        <Image
          src="/miles.png"
          alt="miles"
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
      </div>

      <div className="w-full justify-center flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <h2
            className="text-4xl text-center lg:text-start
           font-semibold text-foreground leading-tight"
          >
            Yoones Zamani
            <span className="text-primary"> Fullstack Developer </span>
          </h2>

          <p className="text-foreground/80 leading-7 pr-0 lg:pr-10 text-center lg:text-start">
            I craft full-stack applications with the mindset of both an engineer
            and a product designer building scalable backends, seamless APIs,
            and responsive interfaces that feel effortless to use. My approach
            connects robust system architecture with clean, intuitive user
            experiences, turning complex technical challenges into products
            people genuinely enjoy interacting with.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center lg:justify-start lg:items-start gap-2">
          {skills.map((skill) => (
            <Badge key={skill} size="lg" rounded="md" variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
