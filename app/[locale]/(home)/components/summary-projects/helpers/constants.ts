export const cardBaseClass =
  "group flex w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card text-card-foreground shadow-sm transition-[box-shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const cardInteractiveClass =
  "cursor-pointer hover:border-primary/30 hover:shadow-md hover:shadow-primary/5";

export const imageWrapClass =
  "relative aspect-[4/3] w-full overflow-hidden bg-muted";

export const MASONRY_COLUMNS = {
  480: 1,
  640: 2,
  1024: 3,
  1280: 4,
} as const;

/** Matches MASONRY_COLUMNS — stable markup for SSR / first paint. */
export const masonryFallbackClass =
  "grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export const VISIBLE_TAG_COUNT = 4;

export const projectTagBadgeClass =
  "shrink-0 border-border/80 bg-muted/50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-foreground";

export const DESCRIPTION_TOOLTIP_MIN_LENGTH = 120;
