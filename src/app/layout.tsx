import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NavDock } from "@/components/shared/NavDock";
// import { MagnifiedDock } from "@/components/hero/MagnifiedDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pranav K - Full Stack Developer",
  description:
    "Full Stack Developer with proven expertise in designing, developing, and deploying scalable web applications. Proficient in MongoDB, Express.js, React.js, and Node.js, with strong command over front-end and back-end development, RESTful API integration, and database management.",
  openGraph: {
    title: "Pranav K - Full Stack Developer",
    description:
      "Full Stack Developer with proven expertise in designing, developing, and deploying scalable web applications. Proficient in MongoDB, Express.js, React.js, and Node.js, with strong command over front-end and back-end development, RESTful API integration, and database management.",
    images: [
      {
        url: "/og-image.png", // Add your OG image to /public/og-image.png
        width: 1200,
        height: 630,
        alt: "Pranav K - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav K - Full Stack Developer",
    description:
      "Full Stack Developer with proven expertise in designing, developing, and deploying scalable web applications. Proficient in MongoDB, Express.js, React.js, and Node.js, with strong command over front-end and back-end development, RESTful API integration, and database management.",
    images: ["/og-image.png"], // Same image for Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                  document.body.classList.add('dark');
                } else {
                  document.body.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
