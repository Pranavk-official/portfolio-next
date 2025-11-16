"use client"
import { HeroSection } from "@/sections/hero/HeroSection";
import { ServicesSection } from "@/sections/services/ServicesSection";
import { SkillSection } from "@/sections/skills/SkillSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillSection />
      <ServicesSection />
    </>
  );
}
