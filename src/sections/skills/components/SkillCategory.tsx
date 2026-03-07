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
        <BlurFade delay={0.1 + index * 0.08} inView direction="up" className="h-full">
            <div
                className="relative p-6 rounded-2xl border border-border/50 
                   bg-card/75 backdrop-blur-sm h-full"
            >
                {/* Category Header */}
                <h3 className="text-lg font-semibold text-foreground mb-4">
                    {category.name}
                </h3>

                {/* Skills Grid - equal sized cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {category.skills.map((skill, i) => {
                        const total = category.skills.length;
                        const isLastAlone = i === total - 1 && total % 3 === 1;
                        return (
                            <SkillCard
                                key={skill.name}
                                skill={skill}
                                className={isLastAlone ? "sm:col-start-2" : undefined}
                            />
                        );
                    })}
                </div>
            </div>
        </BlurFade>
    );
}
