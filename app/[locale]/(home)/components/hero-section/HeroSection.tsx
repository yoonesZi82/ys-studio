import HeroTerminal from "./components/hero-terminal/HeroTerminal";
import InfoPart from "./components/info-part/InfoPart";

function HeroSection() {
  return (
    <section
      id="home"
      className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 py-12 w-full scroll-mt-24"
    >
      <InfoPart />
      <HeroTerminal />
    </section>
  );
}

export default HeroSection;
