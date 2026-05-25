import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SimpleFooter } from "@/components/shared/SimpleFooter";

const title = "Wallpapers";
const description =
    "Original desktop and mobile wallpapers created by Pranav K. Browse the collection and download free for personal use.";
const url = `${siteConfig.url}/wallpapers`;

export const metadata: Metadata = {
    title: {
        default: title,
        template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [
        "wallpapers",
        "desktop wallpapers",
        "mobile wallpapers",
        "free wallpapers",
        "4K wallpapers",
        "16:9 wallpapers",
        "9:16 wallpapers",
        "phone wallpapers",
        "original artwork",
        "Goblin wallpaper",
        "Pranav K wallpapers",
    ],
    alternates: {
        canonical: url,
    },
    openGraph: {
        title,
        description,
        type: "website",
        url,
        siteName: siteConfig.name,
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@Arch_Lad_",
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
