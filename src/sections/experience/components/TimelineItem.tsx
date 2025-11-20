"use client";

import { cn } from "@/lib/utils";
import { WorkExperience } from "../config/workExperience";
import { formatDateRange, toISODate } from "../utils/dateFormatter";
import { TechBadge } from "./TechBadge";
import { BorderBeam } from "@/components/ui/border-beam";

interface TimelineItemProps {
    experience: WorkExperience;
    isAlternating: boolean;
}

export function TimelineItem({ experience, isAlternating }: TimelineItemProps) {
    const isCurrentWorkplace = experience.endDate === 'Present';

    return (
        <article
            role="listitem"
            className={cn(
                "group relative mb-12 md:mb-20",
                "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-12"
            )}
        >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 z-10">
                <div className={cn(
                    "w-5 h-5 rounded-full",
                    isCurrentWorkplace ? "bg-teal-500 shadow-lg shadow-teal-500/50" : "bg-ember-500",
                    "ring-4 ring-background",
                    isCurrentWorkplace ? "dark:shadow-teal-500/30" : "dark:shadow-ember-500/20",
                    "transition-transform duration-300 ease-in-out",
                    "group-hover:scale-125",
                    isCurrentWorkplace && "animate-pulse",
                    "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:animate-none"
                )} />
            </div>

            {/* Content card */}
            <div
                className={cn(
                    "ml-8 md:ml-0 relative",
                    isAlternating ? "md:col-start-1" : "md:col-start-3",
                    "rounded-xl border bg-card/50 backdrop-blur-sm p-6 md:p-7",
                    "transition-all duration-300 ease-in-out",
                    "hover:shadow-xl hover:scale-[1.02]",
                    isCurrentWorkplace ? "hover:border-teal-500/50 shadow-md shadow-teal-500/5" : "hover:border-ember-500/50",
                    // Dark mode enhancements
                    "dark:bg-card/80",
                    isCurrentWorkplace ? "dark:hover:shadow-teal-500/10 dark:shadow-teal-500/5" : "dark:hover:shadow-ember-500/10",
                    // Ensure proper spacing on mobile
                    "min-w-0", // Prevent overflow on small screens
                    // Reduced motion: disable scale transform
                    "motion-reduce:hover:scale-100 motion-reduce:transition-none"
                )}
            >
                {/* Add BorderBeam effect for current workplace */}
                {isCurrentWorkplace && (
                    <BorderBeam
                        size={200}
                        duration={8}
                        colorFrom="#14b8a6"
                        colorTo="#06b6d4"
                        borderWidth={2}
                    />
                )}
                {/* Header */}
                <div className="mb-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold leading-tight">{experience.company}</h3>
                        {isCurrentWorkplace && (
                            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 whitespace-nowrap">
                                Present
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{experience.location}</p>
                    <p className="text-base md:text-lg font-semibold text-foreground/90 mb-1">{experience.position}</p>
                    <time
                        className="text-sm text-muted-foreground inline-flex items-center gap-1"
                        dateTime={`${toISODate(experience.startDate)}/${toISODate(experience.endDate)}`}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDateRange(experience.startDate, experience.endDate)}
                    </time>
                </div>

                {/* Achievements */}
                {experience.achievements.length > 0 && (
                    <ul className="space-y-2.5 mb-5" aria-label="Key achievements">
                        {experience.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm leading-relaxed flex gap-2.5">
                                <span className={cn(
                                    "flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full",
                                    isCurrentWorkplace ? "bg-teal-500" : "bg-ember-500"
                                )} />
                                <span className="text-foreground/80">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Technologies */}
                {experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                        {experience.technologies.map((tech) => (
                            <TechBadge key={tech} label={tech} />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
