"use client";

import { useState, useMemo } from "react";
import { projects } from "./config/projects";
import { ProjectCard } from "@components/shared/ProjectCard";
import {
  ProjectFilter,
  type ProjectCategory,
} from "@components/shared/ProjectFilter";
import { usePaginatedItems } from "../../hooks/usePaginatedItems";
import { BlurFade } from "@components/ui/blur-fade";
import { Button } from "@components/ui/button";
import { ChevronDown } from "lucide-react";
import ScrollElement from "@components/ui/scroll-animation";

const ITEMS_PER_PAGE = 3;

const ProjectsSection = () => {
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
    <section id="projects" className="relative py-20" aria-labelledby="projects-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <ScrollElement
            viewport={{ amount: 0.5, margin: "0px 0px -100px 0px" }}
            className="mx-auto max-w-3xl"
          >
            <h2
              id="projects-heading"
              className="bg-linear-to-r from-primary to-primary/50 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl"
            >
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A showcase of my work across web applications, mobile backends,
              developer tools, and community platforms
            </p>
          </ScrollElement>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <ProjectFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

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
        {/* {hasMore && (
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
        )} */}

        {/* Show More / View All */}
        <div className="mt-12 flex flex-col items-center gap-4">
          {hasMore && (
            <Button
              variant="outline"
              size="lg"
              onClick={loadMore}
              className="group gap-2"
            >
              Show More
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
