import { execSync } from "node:child_process";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

run("prisma generate");

if (process.env.DATABASE_URL) {
  run("prisma db push");
} else {
  console.warn(
    "\n⚠ DATABASE_URL is not set — skipping prisma db push.\n" +
      "  Add DATABASE_URL in Vercel → Settings → Environment Variables,\n" +
      "  then redeploy so the schema syncs and the API can reach the database.\n",
  );
}

run("next build");
