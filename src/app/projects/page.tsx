import type { Metadata } from "next";
import { ProjectsListingClient } from "./projects-client";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore my portfolio of projects including web applications, mobile backends, developer tools, and community platforms.",
    openGraph: {
        title: "Projects | Pranav K",
        description:
            "Explore my portfolio of projects including web applications, mobile backends, developer tools, and community platforms.",
    },
};

export default function ProjectsPage() {
    return <ProjectsListingClient />;
}
