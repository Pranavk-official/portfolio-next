"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Achievement } from "../config/achievements";

interface AchievementCardProps {
    achievement: Achievement;
    index: number;
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
    const Icon = achievement.icon;
    const isEven = index % 2 === 0;

    return (
        <motion.article
            className={`group relative ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Link href={`/achievements/${achievement.slug}`} className="block">
                <div
                    className="relative overflow-hidden rounded-2xl border border-border/50 
                     bg-card/50 backdrop-blur-sm
                     shadow-sm hover:shadow-lg hover:border-border
                     transition-all duration-300 ease-out
                     dark:bg-card/30 dark:hover:bg-card/50
                     max-w-md"
                >
                    {/* Gradient Hero Image Area */}
                    <div
                        className={`relative h-32 w-full bg-linear-to-br ${achievement.accentColor} 
                        overflow-hidden`}
                    >
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
                            <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-white/10 blur-xl" />
                        </div>

                        {/* Icon overlay */}
                        <div className="absolute bottom-4 left-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        {/* Number badge */}
                        <span className="absolute top-4 right-4 text-4xl font-bold text-white/30">
                            {achievement.number}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3
                            className="text-lg font-semibold text-foreground mb-2 
                         group-hover:text-primary transition-colors"
                        >
                            {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {achievement.shortDescription}
                        </p>

                        {/* View Details Link */}
                        <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
