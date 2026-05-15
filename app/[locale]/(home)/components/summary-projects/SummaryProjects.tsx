"use client";

import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const projects = [
  {
    title: "Global Asset Oracle",
    description:
      "A real-time financial monitoring system handling large-scale live transactions.",
    image: "/miles.png",
    tags: ["NEURAL_NET", "FINTECH"],
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    title: "Luxe Storefront",
    description:
      "Next-gen headless commerce engine for premium digital brands.",
    image: "/miles.png",
    tags: ["RETAIL_OS"],
    className: "lg:col-span-1",
  },
  {
    title: "Vanguard Protocol",
    description:
      "Secure-tunnel communication layer built for enterprise systems.",
    image: "/miles.png",
    tags: ["CORE_DEV"],
    className: "lg:col-span-1",
  },
  {
    title: "Studio Synthesis",
    description:
      "Generative AI toolkit for creators, optimizing production workflows.",
    image: "/miles.png",
    tags: ["GEN_AI", "CREATIVE_TOOLS"],
    className: "lg:col-span-2",
  },
];

function SummaryProjects() {
  return (
    <section className="w-full py-20">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div className="space-y-2">
          <h2 className="text-5xl font-bold tracking-tight text-white">
            Selected Works
          </h2>

          <p className="text-white/60 text-lg">
            Deploying excellence across global infrastructures.
          </p>
        </div>

        <Button variant="ghost" asChild>
          <Link href="/projects">
            View all
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project.title}
            className={`
              relative overflow-hidden rounded-3xl border border-white/10
              bg-black/40 backdrop-blur-sm min-h-[320px]
              group cursor-pointer
              ${project.className}
            `}
          >
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-55 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Glow */}
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-7 z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-[10px] tracking-wider uppercase
                      bg-white/10 border border-white/10
                      text-white/70 px-2 py-1 rounded-md
                      backdrop-blur-md
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-3xl font-bold text-white mb-3">
                {project.title}
              </h3>

              <p className="text-white/70 leading-7 max-w-xl">
                {project.description}
              </p>
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-cyan-500/10 group-hover:ring-cyan-400/30 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SummaryProjects;
