"use client"
import { HeroSection } from "@/sections/hero/HeroSection";
import { ServicesSection } from "@/sections/services/ServicesSection";
import { SkillSection } from "@/sections/skills/SkillSection";
// import { ProjectsSection } from "@/sections/projects/ProjectsSection";
import { FooterSection } from "@/sections/footer";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BlurFade delay={0.25 * 4} inView direction="up">
        <SkillSection />
      </BlurFade>
      <ServicesSection />
      {/* TODO: Create Work Experience Timeline */}
      {/* TODO: Rework Projects Section */}
      {/* <ProjectsSection /> */}
      <FooterSection />
    </>
  );
}
