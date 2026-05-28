import { NextResponse } from "next/server";

function isDatabaseConfigError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message;

  return (
    message.includes("DATABASE_URL is not set") ||
    message.includes("query_engine") ||
    message.includes("libquery_engine") ||
    message.includes("Prisma Client could not locate") ||
    message.includes("Query Engine not found")
  );
}

export function databaseApiErrorResponse(error: unknown) {
  if (!(error instanceof Error)) {
    return null;
  }

  if (error.message.includes("DATABASE_URL is not set")) {
    return NextResponse.json(
      {
        error: "Database is not configured on the server",
        code: "DATABASE_URL_MISSING",
      },
      { status: 503 },
    );
  }

  if (!isDatabaseConfigError(error)) {
    return null;
  }

  return NextResponse.json(
    {
      error:
        "Database client failed to start. Ensure DATABASE_URL is set on Vercel and redeploy.",
      code: "PRISMA_ENGINE",
    },
    { status: 503 },
  );
}
