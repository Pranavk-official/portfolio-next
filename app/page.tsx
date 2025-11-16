"use client"
import { HeroSection } from "@/sections/hero/HeroSection";
import { SkillSection } from "@/sections/skills/SkillSection";
// import { MagnifiedDock } from "@/sections/hero/components/MagnifiedDock";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillSection />
    </>
  );
}
