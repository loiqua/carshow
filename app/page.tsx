import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { FeaturedCarsSection } from "@/components/sections/featured-cars-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BrandsSection />
        <FeaturedCarsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
