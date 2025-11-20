"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { workExperiences } from "./config/workExperience";
import { TimelineItem } from "./components/TimelineItem";
import { TimelineConnector } from "./components/TimelineConnector";
import { validateWorkExperiences } from "./utils/validation";
import { useMemo } from "react";

const ExperienceSection = () => {
    // Validate work experiences and filter out invalid entries
    const validExperiences = useMemo(() => {
        const validated = validateWorkExperiences(workExperiences);

        // Log warning in development mode if any entries were filtered out
        if (process.env.NODE_ENV === 'development' && validated.length !== workExperiences.length) {
            console.warn(
                `ExperienceSection: ${workExperiences.length - validated.length} invalid work experience entries were filtered out`
            );
        }

        return validated;
    }, []);

    return (
        <section className="py-10 min-h-screen relative" aria-labelledby="experience-heading">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                {/* Section heading */}
                <div className="mb-16 text-center">
                    <h2 id="experience-heading" className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
                        Work Experience
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                        Professional journey and key achievements
                    </p>
                </div>

                {/* Timeline container */}
                <div className="relative pt-8">
                    {/* Timeline connector line */}
                    <TimelineConnector />

                    {/* Experience items with staggered animations */}
                    <div role="list" aria-label="Timeline of work experiences">
                        {validExperiences.map((experience, index) => (
                            <BlurFade
                                key={experience.id}
                                delay={0.25 * index}
                                inView
                                direction="up"
                            >
                                <TimelineItem
                                    experience={experience}
                                    isAlternating={index % 2 === 1}
                                />
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
