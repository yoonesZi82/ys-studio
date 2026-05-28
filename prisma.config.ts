import "dotenv/config";
import { defineConfig } from "prisma/config";

// `prisma generate` only needs a valid URL shape, not a live connection.
// On Vercel, set DATABASE_URL in Project → Settings → Environment Variables.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://build:build@localhost:5432/build";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
