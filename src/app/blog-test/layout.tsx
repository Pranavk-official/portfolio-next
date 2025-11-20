import { Metadata } from "next";
import { DotPattern } from "@/components/ui/dot-pattern";
import Container from "./_components/container";

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description: "Read my latest thoughts, tutorials, and insights on web development, design, and technology.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen font-jetbrains">
            {/* Background Layer - Gradient blobs and dot pattern */}
            <div className="fixed inset-0 -z-10 bg-ash-50 dark:bg-ash-950 transition-colors duration-350 ease-smooth" aria-hidden="true">
                {/* Gradient blobs */}
                <div className="absolute inset-0 h-[60vh]">
                    <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(circle_at_20%_30%,rgb(244_162_97_/_0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgb(13_115_119_/_0.08)_0%,transparent_50%)] blur-[80px] transition-opacity duration-800 ease-smooth" />
                </div>
                
                {/* Magic UI Dot Pattern */}
                <DotPattern 
                  width={20}
                  height={20}
                  cx={1}
                  cy={1}
                  cr={1}
                  className="text-ash-300/30 dark:text-ash-800/30 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
                />
            </div>

            <Container>
                {children}
            </Container>
        </div>
    );
}