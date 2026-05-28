export function parseProjectLink(
  raw: FormDataEntryValue | null,
):
  | { ok: true; value: string }
  | { ok: false; error: string } {
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

export function hasProjectLink(link: string | null | undefined): boolean {
  return Boolean(link?.trim());
}

export function isExternalProjectLink(link: string): boolean {
  return link.startsWith("http://") || link.startsWith("https://");
}
