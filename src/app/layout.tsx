import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Crimson_Pro,
  JetBrains_Mono,
  Outfit,
} from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NavDock } from "@/components/shared/NavDock";
import { Snow } from "@/components/ui/snow";
import { isChristmasSeason } from "@/lib/utils/dateHelpers";
import { siteConfig } from "@config/site";
import { getAllPublished } from "@/lib/notion";
import { AnnouncementBar } from "@/components/shared/AnnouncementBar";
import { cn } from "@/lib/utils";
// import { MagnifiedDock } from "@/components/hero/MagnifiedDock";

export const revalidate = 60;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Blog Design System Fonts
const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Arch_Lad_",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getAllPublished();

  // Only show latest post if it's from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const latestPost = posts[0];
  const isRecentPost = latestPost?.date
    ? new Date(latestPost.date) >= oneWeekAgo
    : false;

  const postForBanner = isRecentPost ? latestPost : undefined;

  // AnnouncementBar now handles its own visibility logic internally via useHoliday hook
  // We always render it, and it will return null if no holiday/post is active
  const showAnnouncement = true;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonPro.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased`}
      >
        {showAnnouncement && <AnnouncementBar latestPost={postForBanner} />}

        {/* Theme Toggler */}
        <div
          className={cn(
            "fixed right-6 z-50 transition-all duration-300",
            showAnnouncement ? "top-10" : "top-6",
          )}
        >
          <AnimatedThemeToggler />
        </div>

        {/* Christmas Snow Animation - Only visible during Christmas season */}
        {isChristmasSeason() && <Snow />}

        {children}
        {/* Dock */}
        <NavDock />
      </body>
    </html>
  );
}
