import { execSync } from "node:child_process";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

run("prisma generate");

if (process.env.DATABASE_URL) {
  run("prisma migrate deploy");
} else {
  console.warn(
    "\n⚠ DATABASE_URL is not set — skipping prisma migrate deploy.\n" +
      "  Add DATABASE_URL in Vercel → Settings → Environment Variables,\n" +
      "  then redeploy so migrations run and the API can reach the database.\n",
  );
}

run("next build");
