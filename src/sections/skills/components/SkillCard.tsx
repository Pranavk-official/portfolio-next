"use client";

import type { Skill } from "../config/tools";

interface SkillCardProps {
    skill: Skill;
    className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
    const Icon = skill.icon;

    return (
        <div
            className={`flex items-center gap-2 px-3 rounded-lg border border-border/60 bg-background/80 text-sm font-medium text-foreground/80 cursor-default h-9 w-full min-w-0 overflow-hidden whitespace-nowrap shrink-0${className ? ` ${className}` : ""}`}
        >
            <Icon className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{skill.name}</span>
        </div>
    );
}
