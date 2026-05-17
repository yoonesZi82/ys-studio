"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Global Asset Oracle",
    description:
      "A real-time financial monitoring system handling large-scale live transactions.",
    image: "/miles.png",
    tags: ["NEURAL_NET", "FINTECH"],
  },
  {
    title: "Luxe Storefront",
    description:
      "Next-gen headless commerce engine for premium digital brands.",
    image: "/miles.png",
    tags: ["RETAIL_OS"],
  },
  {
    title: "Vanguard Protocol",
    description:
      "Secure-tunnel communication layer built for enterprise systems.",
    image: "/miles.png",
    tags: ["CORE_DEV"],
  },
  {
    title: "Studio Synthesis",
    description:
      "Generative AI toolkit for creators, optimizing production workflows.",
    image: "/miles.png",
    tags: ["GEN_AI", "CREATIVE_TOOLS"],
  },
];

export default function SummaryProjects() {
  return (
    <section
      id="projects"
      className="w-full flex flex-col gap-6 py-12 scroll-mt-14"
      suppressHydrationWarning
    >
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
          <span className="text-background text-sm font-medium">
            My Projects
          </span>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={cn(
              "relative min-h-80 overflow-hidden rounded-3xl border border-border bg-black/40 backdrop-blur-sm group cursor-pointer",
              index % 4 === 0 || index % 4 === 3
                ? "lg:col-span-2"
                : "lg:col-span-1",
            )}
          >
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={index === 0 ? true : false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 z-10 p-7">
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={`${project.title}-${tag}`}
                    className="rounded-md border border-borer bg-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-3 text-3xl font-bold text-white">
                {project.title}
              </h3>

              <p className="max-w-xl leading-7 text-white/70">
                {project.description}
              </p>
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary/10 transition-all duration-500 group-hover:ring-primary/30" />
          </article>
        ))}
      </div>
      <Button
        variant="default"
        size="lg"
        className="flex lg:hidden group"
        asChild
      >
        <Link href="/projects">
          View all
          <ArrowRight className="size-4 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </section>
  );
}
