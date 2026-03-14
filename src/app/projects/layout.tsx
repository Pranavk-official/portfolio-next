import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SimpleFooter } from "@/components/shared/SimpleFooter";

export const metadata: Metadata = {
    title: {
        default: "Projects",
        template: `%s | ${siteConfig.name}`,
    },
    description: "Explore my portfolio of projects including web applications, mobile backends, developer tools, and community platforms.",
    openGraph: {
        title: "Projects",
        description: "Explore my portfolio of projects including web applications, mobile backends, developer tools, and community platforms.",
        type: "website",
        url: `${siteConfig.url}/projects`,
        siteName: siteConfig.name,
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollProgress className="h-1" />
            <main className="flex-1">
                {children}
            </main>
            <SimpleFooter />
        </div>
    );
}
