"use client";

import { Marquee } from "@/components/ui/marquee";
import { tools } from "./config/tools";
import { cn } from "@/lib/utils";

const SkillSection = () => {
  const firstRow = tools.slice(0, Math.ceil(tools.length / 2));
  const secondRow = tools.slice(Math.ceil(tools.length / 2));

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tools & Technologies
          </h2>
          <p className="mt-2 text-muted-foreground">
            Technologies I work with to build modern applications
          </p>
        </div>

        <div className="relative">
          {/* First Row - Left to Right */}
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </Marquee>

          {/* Second Row - Right to Left */}
          <Marquee reverse pauseOnHover className="[--duration:30s]">
            {secondRow.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </Marquee>

          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
};


export const ToolCard = ({ name, icon: Icon }: { name: string; icon: React.ComponentType<{ className?: string }> }) => {
  return (
    <div
      className={cn(
        "relative mx-2 flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-card/50 p-4 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg"
      )}
    >
      <div className="flex flex-col items-center gap-2.5">
        <Icon className="h-10 w-10 text-primary" />
        <span className="text-sm font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default SkillSection;