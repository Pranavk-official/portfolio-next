"use client";

import type { Skill } from "../config/tools";

interface SkillCardProps {
    skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
    const Icon = skill.icon;

    return (
        <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                 border border-border/60 bg-background/80
                 text-sm font-medium text-foreground/80
                 hover:bg-muted/50 hover:border-border hover:text-foreground
                 transition-all duration-200 cursor-default"
        >
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{skill.name}</span>
        </div>
    );
}
