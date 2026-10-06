import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import TechEcosystem from "@/components/sections/TechEcosystem";

export default function Home() {
  return (
    <main>
      <Hero />
      <Transformation />
      <ServicesShowcase />
      <TechEcosystem />
    </main>
  );
}