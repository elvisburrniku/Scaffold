import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import ScaffoldingTypesSection from "@/components/sections/ScaffoldingTypesSection";
import WaitlistSection from "@/components/sections/WaitlistSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CalculatorSection />
        <ScaffoldingTypesSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
