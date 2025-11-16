import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { serviceItems } from "./config/serviceItems";

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-3xl font-bold mb-12">My Services</h2>
        <BentoGrid>
          {serviceItems.map((item, i) => (
            <BentoCard key={i} {...item} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
