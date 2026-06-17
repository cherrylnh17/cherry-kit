import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";
import { ProductSection } from "@/components/product-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductSection />
      <FeatureSection />
      <CtaSection />
      <Footer />
      <CartDrawer />
    </>
  );
}