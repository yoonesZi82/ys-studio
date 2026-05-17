import AboutMe from "./components/about-me/AboutMe";
import ContactMe from "./components/contact-me/ContactMe";
import HeroSection from "./components/hero-section/HeroSection";
import SummaryProjects from "./components/summary-projects/SummaryProjects";

function page() {
  return (
    <div className="container">
      <HeroSection />
      <AboutMe />
      <SummaryProjects />
      <ContactMe />
    </div>
  );
}

export default page;
