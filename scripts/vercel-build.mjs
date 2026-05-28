import { execSync } from "node:child_process";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

// Generate client only — no live DB required (prisma.config.ts supplies a Mongo URL for generate).
run("prisma generate");

// ! Do not run `prisma db push` here. Vercel build must not depend on Atlas.
// ? Sync schema manually after deploy: `pnpm db:push` with a valid local DATABASE_URL.
// ? On Vercel → Settings → Environment Variables, set DATABASE_URL to:
// ?   mongodb+srv://USER:PASS@cluster....mongodb.net/ys-app?retryWrites=true&w=majority

run("next build");
