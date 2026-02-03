"use client";

import { ReactLenis } from "lenis/react";
import { achievements } from "./config/achievements";
import { AchievementCard } from "./components/AchievementCard";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AchievementsSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Fade out header as we scroll (0 = visible, 1 = hidden)
    const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
    const headerBlur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

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
                        scale: headerScale,
                        filter: `blur(${headerBlur}px)` as any
                    }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                    <div className="relative z-10 text-center">
                        <h2
                            id="achievements-heading"
                            className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-5xl md:text-7xl font-bold tracking-tight text-transparent px-8 leading-[120%]"
                        >
                            Achievements
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Milestones and recognitions along my journey 👇
                        </p>
                    </div>
                </motion.section>

                {/* Stacking Cards Section */}
                <section className="relative z-10 w-full bg-background">
                    <div className="flex justify-between px-4 md:px-16">
                        <div className="grid gap-2 flex-1">
                            {achievements.map((achievement, index) => {
                                // Alternating rotation: 0 = rotate-6, 1 = none, 2 = -rotate-6, 3 = none
                                const getRotation = (idx: number) => {
                                    const pattern = idx % 4;
                                    if (pattern === 0) return 'rotate-6';
                                    if (pattern === 2) return '-rotate-6';
                                    return '';
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
                            <h3 className="text-4xl px-8 font-medium text-center tracking-tight leading-[120%]">
                                What I've <br /> Achieved 🏆
                            </h3>
                        </div>
                    </div>
                </section>
            </section>
        </ReactLenis>
    );
};

export default AchievementsSection;
