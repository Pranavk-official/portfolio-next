import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SimpleFooter } from "@/components/shared/SimpleFooter";

export const metadata: Metadata = {
    title: {
        default: "Wallpapers",
        template: `%s | ${siteConfig.name}`,
    },
    description:
        "Original desktop and mobile wallpapers created by Pranav K. Browse the collection and download free for personal use.",
    openGraph: {
        title: "Wallpapers",
        description:
            "Original desktop and mobile wallpapers — free downloads for personal use.",
        type: "website",
        url: `${siteConfig.url}/wallpapers`,
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
