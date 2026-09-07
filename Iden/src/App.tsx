import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VisionSection from "./components/VisionSection";
import MethodSection from "./components/MethodSection";
import ExpertiseGrid from "./components/ExpertiseGrid";
import StatsSection from "./components/StatsSection";
import QuoteSection from "./components/QuoteSection";
import AboutSection from "./components/AboutSection";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import GrainOverlay from "./components/GrainOverlay";

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Aller au contenu principal
      </a>
      <GrainOverlay />
      <Navbar />
      <main id="main-content">
        <Hero />
        <VisionSection />
        <MethodSection />
        <ExpertiseGrid />
        <StatsSection />
        <QuoteSection />
        <AboutSection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
