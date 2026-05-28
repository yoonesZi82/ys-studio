import { execSync } from "node:child_process";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

function runPrismaGenerate() {
  try {
    run("prisma generate");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isWindowsEngineLock =
      process.platform === "win32" &&
      (message.includes("EPERM") ||
        message.includes("query_engine-windows.dll.node"));

    if (isWindowsEngineLock) {
      console.error(
        "\nPrisma could not update the query engine (file is locked on Windows).\n" +
          "Stop anything that loads the Prisma client, then retry:\n" +
          "  - `pnpm dev` / `next dev`\n" +
          "  - `pnpm db:studio`\n" +
          "  - other Node processes using this repo\n",
      );
    }

    throw error;
  }
}

// Generate client only — no live DB required (prisma.config.ts supplies a Mongo URL for generate).
runPrismaGenerate();

// ! Do not run `prisma db push` here. Vercel build must not depend on Atlas.
// ? Sync schema manually after deploy: `pnpm db:push` with a valid local DATABASE_URL.
// ? On Vercel → Settings → Environment Variables, set DATABASE_URL to:
// ?   mongodb+srv://USER:PASS@cluster....mongodb.net/ys-app?retryWrites=true&w=majority

run("next build");
