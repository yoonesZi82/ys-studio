"use client";

import Image from "next/image";

import { imageWrapClass } from "../helpers/constants";

export function ProjectCardMedia({
  projectTitle,
  index,
  imageSrc,
  onImageError,
}: {
  projectTitle: string;
  index: number;
  imageSrc: string;
  onImageError: () => void;
}) {
  return (
    <div className={imageWrapClass}>
      <Image
        src={imageSrc}
        alt={projectTitle}
        fill
        priority={index < 4}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        onError={onImageError}
      />
    </div>
  );
}
