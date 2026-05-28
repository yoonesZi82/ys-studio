export const PROJECT_IMAGE_FALLBACK = "/miles.png";

export function normalizeProjectImageSrc(
  image: string | null | undefined,
): string {
  if (!image?.trim()) {
    return PROJECT_IMAGE_FALLBACK;
  }

  const trimmed = image.trim();

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return PROJECT_IMAGE_FALLBACK;
}
