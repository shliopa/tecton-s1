import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./components/SmoothScroll";
import { FluidNavbar } from "./components/FluidNavbar";
import { HeroSection } from "./components/HeroSection";
import { PartnerMarquee } from "./components/PartnerMarquee";
import { ScrubManifesto } from "./components/ScrubManifesto";
import { BentoGridSection } from "./components/BentoGridSection";
import { HorizontalGallery } from "./components/HorizontalGallery";
import { AnatomyAccordion } from "./components/AnatomyAccordion";
import { SpacesStickyStack } from "./components/SpacesStickyStack";
import { TestimonialsCarousel } from "./components/TestimonialsCarousel";
import { ReservationSection } from "./components/ReservationSection";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <div aria-hidden="true" className="obsidian-grain" />
      <FluidNavbar />

      <main className="overflow-x-clip w-full max-w-full bg-[#07080A] text-[#F4F5F7]">
        <HeroSection />
        <PartnerMarquee />
        <ScrubManifesto />
        <BentoGridSection />
        <HorizontalGallery />
        <AnatomyAccordion />
        <SpacesStickyStack />
        <TestimonialsCarousel />
        <ReservationSection />
      </main>
    </MotionConfig>
  );
}

export default App;
