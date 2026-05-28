import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const seedProjects = [
  {
    title: "Global Asset Oracle",
    description:
      "A real-time financial monitoring system handling large-scale live transactions.",
    image: "/miles.png",
    link: "https://github.com",
    tags: ["NEURAL_NET", "FINTECH"],
  },
  {
    title: "Luxe Storefront",
    description:
      "Next-gen headless commerce engine for premium digital brands.",
    image: "/miles.png",
    link: "https://github.com",
    tags: ["RETAIL_OS"],
  },
  {
    title: "Vanguard Protocol",
    description:
      "Secure-tunnel communication layer built for enterprise systems.",
    image: "/miles.png",
    link: "https://github.com",
    tags: ["CORE_DEV"],
  },
  {
    title: "Studio Synthesis",
    description:
      "Generative AI toolkit for creators, optimizing production workflows.",
    image: "/miles.png",
    link: "https://github.com",
    tags: ["GEN_AI", "CREATIVE_TOOLS"],
  },
];

async function main() {
  const count = await prisma.project.count();

  if (count > 0) {
    console.log("Projects already seeded, skipping.");
    return;
  }

  await prisma.project.createMany({ data: seedProjects });
  console.log(`Seeded ${seedProjects.length} projects.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
