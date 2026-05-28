const DEFAULT_MONGODB_DATABASE = "ys-app";

/**
 * Atlas rejects connections when the URL path has no database name (`...net/?...`).
 */
export function resolveMongoDatabaseUrl(
  url = process.env.DATABASE_URL,
): string {
  if (!url?.trim()) {
    throw new Error("DATABASE_URL is not set");
  }

  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  if (parsed.protocol !== "mongodb:" && parsed.protocol !== "mongodb+srv:") {
    return url;
  }

  const databaseName =
    parsed.pathname.replace(/^\//, "").split("/")[0]?.trim() ?? "";

  if (databaseName) {
    return url;
  }

  const fallback =
    process.env.MONGODB_DATABASE_NAME?.trim() || DEFAULT_MONGODB_DATABASE;

  parsed.pathname = `/${fallback}`;
  return parsed.toString();
}
