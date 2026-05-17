import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import InfoPart from "./components/info-part/InfoPart";

function HeroSection() {
  return (
    <section
      id="home"
      className="w-full scroll-mt-24 flex justify-between gap-8 flex-col lg:flex-row items-center lg:items-start py-12"
    >
      <InfoPart />
      <div className="w-full flex justify-center items-center">
        <Terminal className="-rotate-2 w-full">
          <TypingAnimation>$ whoami</TypingAnimation>
          <AnimatedSpan>Yoones Zamani - Full Stack Developer</AnimatedSpan>

          <TypingAnimation>$ cat skills.txt</TypingAnimation>
          <AnimatedSpan className="text-green-500">
            ✔ Frontend: React, Next.js, TypeScript, Tailwind
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">
            ✔ Backend: Node.js, Express, NestJS, Python
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">
            ✔ Database: PostgreSQL, MongoDB, Redis, Prisma
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">
            ✔ DevOps: Docker, Git, CI/CD, Linux
          </AnimatedSpan>

          <TypingAnimation>$ echo $PASSION</TypingAnimation>
          <AnimatedSpan>
            Transforming ideas into production-ready full-stack solutions
          </AnimatedSpan>

          <TypingAnimation>$ status --current</TypingAnimation>
          <AnimatedSpan className="flex items-center gap-1.5 mx-0.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-green-500">
              Available for freelance projects
            </span>
          </AnimatedSpan>
        </Terminal>
      </div>
    </section>
  );
}

export default HeroSection;
