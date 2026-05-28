import "dotenv/config";
import { defineConfig } from "prisma/config";

// `prisma generate` only needs a valid URL shape, not a live connection.
// On Vercel, set DATABASE_URL in Project → Settings → Environment Variables.
import { resolveMongoDatabaseUrl } from "./lib/database-url";

const databaseUrl = (() => {
  try {
    return resolveMongoDatabaseUrl(
      process.env.DATABASE_URL ??
        "mongodb://build:build@localhost:27017/build",
    );
  } catch {
    return "mongodb://build:build@localhost:27017/build";
  }
})();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});
