"use client";

import { BlurFade } from "@components/ui/blur-fade";
import { SkillCard } from "./SkillCard";
import type { SkillCategory as SkillCategoryType } from "../config/tools";

interface SkillCategoryProps {
    category: SkillCategoryType;
    index: number;
}

export function SkillCategory({ category, index }: SkillCategoryProps) {
    return (
        <BlurFade delay={0.1 + index * 0.08} inView direction="up">
            <div
                className="relative p-6 rounded-2xl border border-border/50 
                   bg-card/30 backdrop-blur-sm
                   hover:border-border/80 transition-colors duration-300"
            >
                {/* Category Header */}
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    {category.name}
                </h3>

                {/* Skills as Pills */}
                <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                    ))}
                </div>
            </div>
        </BlurFade>
    );
}
