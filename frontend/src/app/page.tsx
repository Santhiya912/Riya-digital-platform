import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import TechEcosystem from "@/components/sections/TechEcosystem";
import WhyRiyadvi from "@/components/sections/WhyRiyadvi";
export default function Home() {
  return (
    <main>
      <Hero />
      <Transformation />
      <ServicesShowcase />
      <TechEcosystem />
      <TechEcosystem />
      <WhyRiyadvi />
    </main>
  );
}