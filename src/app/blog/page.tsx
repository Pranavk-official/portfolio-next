import { Metadata } from "next"
import { TextAnimate } from "@/components/ui/text-animate"
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"
import { AuroraText } from "@/components/ui/aurora-text"

export const metadata: Metadata = {
    title: "Blog",
    description: "Insights, tutorials, and updates about web development, design, and technology.",
}

const BlogPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <NeonGradientCard
                className="max-w-xl w-full"
                borderSize={3}
                borderRadius={24}
                neonColors={{
                    firstColor: "#ff00aa",
                    secondColor: "#00FFF1",
                }}
            >
                <div className="p-12 text-center space-y-6">
                    {/* Animated Title */}
                    <AuroraText className="text-5xl md:text-6xl font-bold">
                        Blog Coming Soon
                    </AuroraText>

                    {/* Description */}
                    <TextAnimate
                        animation="slideUp"
                        by="word"
                        delay={0.3}
                        className="text-base text-muted-foreground leading-relaxed"
                    >
                        Stay tuned for insightful articles tutorials and updates about web development design and technology
                    </TextAnimate>

                    {/* Status Badge */}
                    <div className="pt-4">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            <span className="text-sm font-medium text-primary">Work in Progress</span>
                        </div>
                    </div>
                </div>
            </NeonGradientCard>
        </div>
    );
}

export default BlogPage;