"use client";

import { achievements } from "./config/achievements";
import { AchievementCard } from "./components/AchievementCard";
import { BlurFade } from "@components/ui/blur-fade";
import ScrollElement from "@components/ui/scroll-animation";

const AchievementsSection = () => {
    return (
        <section
            className="relative py-20 overflow-hidden"
            aria-labelledby="achievements-heading"
        >
            {/* Decorative gradient orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-linear-to-br from-amber-500/10 to-orange-600/10 blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-linear-to-br from-purple-500/10 to-pink-600/10 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <ScrollElement
                        viewport={{ amount: 0.5, margin: "0px 0px -100px 0px" }}
                        className="mx-auto max-w-2xl"
                    >
                        <h2
                            id="achievements-heading"
                            className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl"
                        >
                            Achievements
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Milestones and recognitions along my journey
                        </p>
                    </ScrollElement>
                </div>

                {/* Staggered Cards Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {achievements.map((achievement, index) => (
                        <BlurFade
                            key={achievement.id}
                            delay={0.1 + index * 0.1}
                            inView
                            direction="up"
                            className={index % 2 === 1 ? "md:mt-12" : ""}
                        >
                            <AchievementCard achievement={achievement} index={index} />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
