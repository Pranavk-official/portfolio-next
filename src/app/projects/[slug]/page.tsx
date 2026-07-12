import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@sections/projects/config/projects";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { BlurFade } from "@components/ui/blur-fade";
import {
    ArrowLeft,
    Calendar,
    Code2,
    ExternalLink,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

// Category display configuration
const categoryConfig: Record<
    (typeof projects)[0]["category"],
    { label: string; className: string }
> = {
    "web-app": {
        label: "Web App",
        className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    mobile: {
        label: "Mobile",
        className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    tool: {
        label: "Tool",
        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    community: {
        label: "Community",
        className: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    },
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.id,
    }));
}

// Generate dynamic metadata for each project
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.shortDescription,
        alternates: {
            canonical: `/projects/${slug}`,
        },
        openGraph: {
            title: `${project.title} | Pranav K`,
            description: project.shortDescription,
            images: [project.imageUrl],
        },
    };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    const categoryInfo = categoryConfig[project.category];

    // Find next and previous projects
    const currentIndex = projects.findIndex((p) => p.id === slug);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject =
        currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    return (
        <>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="relative">
                    {/* Background Image */}
                    <div className="absolute inset-0 h-[50vh] overflow-hidden">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background" />
                    </div>

                    {/* Content */}
                    <div className="container relative mx-auto px-4 pb-12 pt-24">
                        {/* Navigation */}
                        <BlurFade delay={0.1} inView direction="up">
                            <Link href="/#projects">
                                <Button variant="ghost" size="sm" className="mb-8 gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Projects
                                </Button>
                            </Link>
                        </BlurFade>

                        {/* Title and Meta */}
                        <div className="max-w-4xl">
                            <BlurFade delay={0.2} inView direction="up">
                                <div className="mb-4 flex flex-wrap items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className={`border font-medium ${categoryInfo.className}`}
                                    >
                                        {categoryInfo.label}
                                    </Badge>
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{project.year}</span>
                                    </div>
                                </div>
                            </BlurFade>

                            <BlurFade delay={0.3} inView direction="up">
                                <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                    {project.title}
                                </h1>
                            </BlurFade>

                            <BlurFade delay={0.4} inView direction="up">
                                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                                    {project.shortDescription}
                                </p>
                            </BlurFade>

                            {/* Action Buttons */}
                            {(project.githubUrl || project.liveUrl) && (
                                <BlurFade delay={0.5} inView direction="up">
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        {project.githubUrl && (
                                            <Button asChild>
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="gap-2"
                                                >
                                                    <SiGithub className="h-4 w-4" />
                                                    View on GitHub
                                                </a>
                                            </Button>
                                        )}
                                        {project.liveUrl && (
                                            <Button variant="outline" asChild>
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="gap-2"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </BlurFade>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="container mx-auto px-4 py-12">
                    <div className="mx-auto max-w-4xl">
                        {/* About Section */}
                        <BlurFade delay={0.1} inView direction="up">
                            <div className="mb-12">
                                <h2 className="mb-4 text-2xl font-semibold">About the Project</h2>
                                <p className="leading-relaxed text-muted-foreground">
                                    {project.fullDescription}
                                </p>
                            </div>
                        </BlurFade>

                        <Separator className="my-10" />

                        {/* Technologies Section */}
                        <BlurFade delay={0.2} inView direction="up">
                            <div className="mb-12">
                                <div className="mb-4 flex items-center gap-2">
                                    <Code2 className="h-5 w-5 text-primary" />
                                    <h2 className="text-2xl font-semibold">Technologies Used</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="secondary"
                                            className="px-3 py-1.5 text-sm"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </BlurFade>

                        <Separator className="my-10" />

                        {/* Key Features Section */}
                        <BlurFade delay={0.3} inView direction="up">
                            <div className="mb-12">
                                <div className="mb-4 flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    <h2 className="text-2xl font-semibold">Key Features</h2>
                                </div>
                                <ul className="space-y-3">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </BlurFade>

                        <Separator className="my-10" />

                        {/* Project Navigation */}
                        <BlurFade delay={0.4} inView direction="up">
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                                {prevProject ? (
                                    <Link href={`/projects/${prevProject.id}`} className="group">
                                        <Button variant="outline" className="w-full gap-2 sm:w-auto">
                                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                            <span className="truncate">{prevProject.title}</span>
                                        </Button>
                                    </Link>
                                ) : (
                                    <div />
                                )}
                                {nextProject && (
                                    <Link href={`/projects/${nextProject.id}`} className="group">
                                        <Button variant="outline" className="w-full gap-2 sm:w-auto">
                                            <span className="truncate">{nextProject.title}</span>
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </BlurFade>
                    </div>
                </section>
            </div>
        </>
    );
}
