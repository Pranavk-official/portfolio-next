"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { projects } from "@sections/projects/config/projects";
import { ProjectCard } from "@components/shared/ProjectCard";
import { ProjectFilter, type ProjectCategory } from "@components/shared/ProjectFilter";
import { usePaginatedItems } from "../../hooks/usePaginatedItems";
import { BlurFade } from "@components/ui/blur-fade";
import { Button } from "@components/ui/button";
import { ChevronDown, ArrowLeft } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export function ProjectsListingClient() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

    // Filter projects by category
    const filteredProjects = useMemo(() => {
        if (activeCategory === "all") return projects;
        return projects.filter((project) => project.category === activeCategory);
    }, [activeCategory]);

    // Paginate filtered projects
    const { visibleItems, hasMore, loadMore, reset } = usePaginatedItems({
        items: filteredProjects,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    // Reset pagination when category changes
    const handleCategoryChange = (category: ProjectCategory) => {
        setActiveCategory(category);
        reset();
    };

    return (
        <main className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="mb-6 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <BlurFade delay={0.1} inView direction="up">
                        <h1 className="bg-linear-to-r from-primary to-primary/50 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
                            All Projects
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                            Browse my complete portfolio of projects spanning web applications,
                            mobile backends, developer tools, and community platforms.
                        </p>
                    </BlurFade>
                </div>

                {/* Category Filter */}
                <BlurFade delay={0.2} inView direction="up">
                    <div className="mb-10">
                        <ProjectFilter
                            activeCategory={activeCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>
                </BlurFade>

                {/* Projects Grid */}
                <div
                    id="projects-grid"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    role="tabpanel"
                    aria-label={`${activeCategory === "all" ? "All" : activeCategory} projects`}
                >
                    {visibleItems.map((project, index) => (
                        <BlurFade
                            key={project.id}
                            delay={0.1 * (index % ITEMS_PER_PAGE)}
                            inView
                            direction="up"
                        >
                            <ProjectCard project={project} index={index} />
                        </BlurFade>
                    ))}
                </div>

                {/* Empty State */}
                {visibleItems.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                            No projects found in this category.
                        </p>
                    </div>
                )}

                {/* Show More Button */}
                {hasMore && (
                    <div className="mt-10 flex justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={loadMore}
                            className="group gap-2"
                        >
                            Show More
                            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                        </Button>
                    </div>
                )}

                {/* Projects Count */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Showing {visibleItems.length} of {filteredProjects.length} projects
                </div>
            </div>
        </main>
    );
}
