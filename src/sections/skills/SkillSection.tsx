"use client";

import { Marquee } from "@/components/ui/marquee";
import { skillCategories, tools } from "./config/tools";
import { SkillCategory } from "./components/SkillCategory";
import ScrollElement from "@components/ui/scroll-animation";

const SkillSection = () => {
  // Get unique icons for the marquee (first 18 tools)
  const marqueeItems = tools.slice(0, 18);
  const firstRow = marqueeItems.slice(0, 9);
  const secondRow = marqueeItems.slice(9, 18);

  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background Marquee */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden">
        <Marquee className="[--duration:40s]">
          {firstRow.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="mx-8">
                <Icon className="w-16 h-16" />
              </div>
            );
          })}
        </Marquee>
        <Marquee reverse className="[--duration:35s] mt-8">
          {secondRow.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="mx-8">
                <Icon className="w-16 h-16" />
              </div>
            );
          })}
        </Marquee>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <ScrollElement
            viewport={{ amount: 0.5, margin: "0px 0px -100px 0px" }}
            className="mx-auto max-w-2xl"
          >
            <h2
              id="skills-heading"
              className="text-4xl font-bold tracking-tight md:text-5xl"
            >
              <span className="text-foreground">Technical </span>
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Skills.
              </span>
            </h2>
          </ScrollElement>
        </div>

        {/* Skills Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;