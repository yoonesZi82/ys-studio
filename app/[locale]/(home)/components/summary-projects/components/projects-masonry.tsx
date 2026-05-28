"use client";

import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { MASONRY_COLUMNS, masonryFallbackClass } from "../helpers/constants";

export function ProjectsMasonry({ children }: { children: React.ReactNode }) {
  const [isMasonryReady, setIsMasonryReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMasonryReady(true);
    }, 0);
  }, []);

  if (!isMasonryReady) {
    return <div className={masonryFallbackClass}>{children}</div>;
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={MASONRY_COLUMNS}
      className="w-full"
    >
      <Masonry gutter="1rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
}
