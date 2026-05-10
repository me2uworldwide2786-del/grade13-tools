import HeroBackground from "@/components/ui/HeroBackground";
import Hero from "@/components/homepage/Hero";
import ToolsGrid from "@/components/homepage/ToolsGrid";
import BrandStory from "@/components/homepage/BrandStory";
import ProductCTA from "@/components/homepage/ProductCTA";

export default function Home() {
  return (
    <>
      {/* Fixed full-page animated background — z-0, pointer-events-none */}
      <HeroBackground />

      {/* All page sections — z-10, sit above the background layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <ToolsGrid />
        <BrandStory />
        <ProductCTA />
      </div>
    </>
  );
}
