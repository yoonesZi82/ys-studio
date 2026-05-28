const PROJECT_IMAGE_FALLBACK = "/fallback.jpg";
/** Profile photo in /public — commit the file so Vercel can serve it. */
const ABOUT_PROFILE_IMAGE = "/me.jpg";
const ABOUT_IMAGE_FALLBACK = "/fallback.jpg";

function normalizeProjectImageSrc(image: string | null | undefined): string {
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

function parseProjectLink(
  raw: FormDataEntryValue | null,
): { ok: true; value: string } | { ok: false; error: string } {
  if (typeof raw !== "string" || !raw.trim()) {
    return { ok: false, error: "link is required." };
  }

  const trimmed = raw.trim();

  if (trimmed.startsWith("/")) {
    return { ok: true, value: trimmed };
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return {
        ok: false,
        error: "link must be a valid http(s) URL or a path starting with /.",
      };
    }

    return { ok: true, value: trimmed };
  } catch {
    return {
      ok: false,
      error: "link must be a valid http(s) URL or a path starting with /.",
    };
  }
}

function hasProjectLink(link: string | null | undefined): boolean {
  return Boolean(link?.trim());
}

function isExternalProjectLink(link: string): boolean {
  return link.startsWith("http://") || link.startsWith("https://");
}

function normalizeProjectTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags
      .filter((tag): tag is string => typeof tag === "string")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    const trimmed = tags.trim();
    if (!trimmed) return [];

    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return normalizeProjectTags(parsed);
      }
    } catch {
      // fall through to comma-separated
    }

    return trimmed
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export {
  normalizeProjectImageSrc,
  PROJECT_IMAGE_FALLBACK,
  ABOUT_PROFILE_IMAGE,
  ABOUT_IMAGE_FALLBACK,
  parseProjectLink,
  hasProjectLink,
  isExternalProjectLink,
  normalizeProjectTags,
};
