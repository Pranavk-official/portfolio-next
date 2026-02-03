"use client";

import { ReactLenis } from "lenis/react";
import { achievements } from "./config/achievements";
import { AchievementCard } from "./components/AchievementCard";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AchievementsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);

  // Fade out header as we scroll (0 = visible, 1 = hidden)
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  //   const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  // Mobile fallback - smooth scroll stacking effect
  if (isMobile) {
    return (
      <ReactLenis root>
        <section
          className="relative bg-background"
          aria-labelledby="achievements-heading"
        >
          {/* Header Section */}
          <motion.section
            className="h-screen w-full grid place-content-center sticky top-0"
            style={{
              opacity: headerOpacity,
              scale: scale,
              rotate: rotate,
              filter: `blur(${headerBlur}px)`,
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 text-center px-4">
              <h2
                id="achievements-heading"
                className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-4xl sm:text-5xl font-bold tracking-tight text-transparent leading-[120%]"
              >
                Achievements
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
                Milestones and recognitions along my journey 👇
              </p>
            </div>
          </motion.section>

          {/* Stacking Cards */}
          {achievements.map((achievement, index) => (
            <section
              key={achievement.id}
              className="h-screen w-full grid place-content-center sticky top-0 rounded-t-2xl overflow-hidden bg-background px-4"
            >
              <AchievementCard
                achievement={achievement}
                index={index}
                rotation=""
              />
            </section>
          ))}
        </section>
      </ReactLenis>
    );
  }

  // Desktop - Smooth scroll stacking effect
  return (
    <ReactLenis root>
      <section
        ref={containerRef}
        className="relative bg-background"
        aria-labelledby="achievements-heading"
      >
        {/* Section Header - Sticky with fade out and blur */}
        <motion.section
          className="sticky top-0 h-screen w-full grid place-content-center z-0"
          style={{
            opacity: headerOpacity,
            scale: scale,
            rotate: rotate,
            filter: `blur(${headerBlur}px)`,
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <div className="relative z-10 text-center">
            <h2
              id="achievements-heading"
              className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-transparent px-4 sm:px-8 leading-[120%]"
            >
              Achievements
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              Milestones and recognitions along my journey 👇
            </p>
          </div>
        </motion.section>

        {/* Stacking Cards Section */}
        <section className="relative z-10 w-full bg-background">
          <div className="flex justify-around px-4 md:px-16">
            <div className="grid gap-2">
              {achievements.map((achievement, index) => {
                // Simple rotation pattern: 0 = rotate-6, 1 = none, 2 = -rotate-6, 3 = none
                const getRotation = (idx: number) => {
                  const pattern = idx % 4;
                  if (pattern === 0) return "rotate-6";
                  if (pattern === 2) return "-rotate-6";
                  return "";
                };

                return (
                  <figure
                    key={achievement.id}
                    className="sticky top-0 h-screen grid place-content-center"
                  >
                    <AchievementCard
                      achievement={achievement}
                      index={index}
                      rotation={getRotation(index)}
                    />
                  </figure>
                );
              })}
            </div>
            <div className="sticky top-0 h-screen place-content-center hidden lg:grid">
              <h3 className="text-3xl lg:text-4xl px-6 lg:px-8 font-medium text-center tracking-tight leading-[120%]">
                What I&apos;ve <br /> Achieved 🏆
              </h3>
            </div>
          </div>
        </section>
      </section>
    </ReactLenis>
  );
};

export default AchievementsSection;
