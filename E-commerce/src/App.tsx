import { CatalogProvider } from "@/context/CatalogContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <CatalogProvider>
          <div id="top" className="min-h-screen bg-cream">
            <Header />

            <main>
              <Hero />
              <FeatureStrip />
              <CategorySection />
              <ProductSection />
              <PromoBanner />
              <TestimonialSection />
              <NewsletterSection />
            </main>

            <Footer />
          </div>
        </CatalogProvider>
      </CartProvider>
    </WishlistProvider>
  );
}
