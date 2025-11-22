import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Pro, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NavDock } from "@/components/shared/NavDock";
import { siteConfig } from "@config/site";
// import { MagnifiedDock } from "@/components/hero/MagnifiedDock";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
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
        {/* Theme Toggler */}
        <div className="fixed top-6 right-6 z-50">
          <AnimatedThemeToggler />
        </div>

        {children}
        {/* Dock */}
        <NavDock />
      </body>
    </html>
  );
}
