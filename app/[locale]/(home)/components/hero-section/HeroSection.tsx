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
      className="flex lg:flex-row flex-col justify-between items-center lg:items-start gap-8 py-12 w-full scroll-mt-24"
    >
      <InfoPart />
      <div className="flex justify-center items-center w-full">
        <Terminal className="w-full min-h-[340px] -rotate-2">
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
              <span className="inline-flex absolute bg-green-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
              <span className="inline-flex relative bg-green-500 rounded-full size-2"></span>
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
