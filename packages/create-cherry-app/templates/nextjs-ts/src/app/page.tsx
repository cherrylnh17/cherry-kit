import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CtaSection />
      <Footer />
    </main>
  );
}