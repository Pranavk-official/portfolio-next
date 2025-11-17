import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { serviceItems } from "./config/serviceItems";

const ServicesSection = () => {
  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-3xl font-bold mb-12">My Services</h2>
        <BentoGrid className="lg:grid-rows-4">
          {serviceItems.map((item, i) => (
            <BentoCard key={i} {...item} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

export default ServicesSection;