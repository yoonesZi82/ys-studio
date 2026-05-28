const SITE_KEYWORDS = [
  // 👤 Personal Brand
  "یونس زمانی",
  "Yoones Zamani",
  "برنامه نویس فول استک",
  "Full Stack Developer",
  "برنامه نویس وب",
  "Web Developer",
  "توسعه دهنده وب",
  "Web Development",
  "فریلنسر برنامه نویس",
  "Freelance Developer",
  "پورتفولیو برنامه نویس",
  "Developer Portfolio",

  // 🎯 Frontend
  "برنامه نویس فرانت اند",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "ری اکت",
  "React",
  "Next.js",
  "TypeScript",
  "جاوااسکریپت",
  "JavaScript",
  "HTML CSS",

  // ⚙️ Backend
  "برنامه نویس بک اند",
  "Backend Developer",
  "Node.js",
  "NestJS",
  "API Development",
  "REST API",
  "GraphQL",

  // 🗄️ Database
  "دیتابیس",
  "Database",
  "PostgreSQL",
  "MongoDB",
  "SQL",
  "Prisma ORM",

  // 🎨 UI / Styling
  "Tailwind CSS",
  "CSS Framework",
  "Responsive Design",
  "UI Developer",
  "UX UI",

  // 🚀 Tools & Ecosystem
  "Git",
  "GitHub",
  "Vercel",
  "Docker",
  "CI/CD",

  // 💼 Career
  "استخدام برنامه نویس",
  "کار برنامه نویسی",
  "Remote Developer",
  "Freelancing",
  "برنامه نویس ریموت",

  // 🌍 General Tech
  "تکنولوژی",
  "Software Engineer",
  "Software Development",
  "Tech Blog",
  "Programming",
] as const;

function getSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL("http://localhost:3000");
}

export { SITE_KEYWORDS, getSiteUrl };
