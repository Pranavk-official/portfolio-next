"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { skillCategories, tools } from "./config/tools";
import { SkillCategory } from "./components/SkillCategory";
import ScrollElement from "@/components/ui/scroll-animation";
// import ScrollElement from "@components/ui/scroll-animation";

const SkillSection = () => {
  // Get unique icons for the scroll velocity (54 tools for 6 rows on sm/md, 4 on lg+)
  const scrollItems = tools.slice(0, 54);
  const firstRow = scrollItems.slice(0, 9);
  const secondRow = scrollItems.slice(9, 18);
  const thirdRow = scrollItems.slice(18, 27);
  const fourthRow = scrollItems.slice(27, 36);
  const fifthRow = scrollItems.slice(36, 45);
  const sixthRow = scrollItems.slice(45, 54);

  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background Scroll Velocity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-center">
        <ScrollVelocityContainer className="opacity-[0.07]">
          <ScrollVelocityRow baseVelocity={5} direction={1}>
            {firstRow.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="mx-10">
                  <Icon className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24" />
                </div>
              );
            })}
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={15} direction={-1} className="mt-8">
            {secondRow.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="mx-10">
                  <Icon className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24" />
                </div>
              );
            })}
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={10} direction={1} className="mt-8">
            {thirdRow.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="mx-10">
                  <Icon className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24" />
                </div>
              );
            })}
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={5} direction={-1} className="mt-8">
            {fourthRow.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="mx-10">
                  <Icon className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24" />
                </div>
              );
            })}
          </ScrollVelocityRow>
          {/* Fifth and sixth rows - visible only on sm/md screens */}
          <ScrollVelocityRow
            baseVelocity={12}
            direction={1}
            className="mt-8 lg:hidden"
          >
            {fifthRow.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="mx-10">
                  <Icon className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24" />
                </div>
              );
            })}
          </ScrollVelocityRow>
          <ScrollVelocityRow
            baseVelocity={8}
            direction={-1}
            className="mt-8 lg:hidden"
          >
            {sixthRow.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="mx-10">
                  <Icon className="w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24" />
                </div>
              );
            })}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        {/* Gradient overlays for fade effect */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <ScrollElement
            viewport={{ amount: 0.5, margin: "0px 0px -100px 0px" }}
            className="mx-auto max-w-3xl"
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
            <p className="mt-4 text-lg text-muted-foreground">
              Here are some of the skills I have:
            </p>
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
