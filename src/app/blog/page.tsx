"use client"

import { TextAnimate } from "@/components/ui/text-animate"
import { Meteors } from "@/components/ui/meteors"
import { Card, CardContent } from "@/components/ui/card"

const BlogPage = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
           
            
            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
                <Card className="relative overflow-hidden border-2 border-primary/20 bg-background/80 backdrop-blur-xl shadow-2xl max-w-2xl w-full">
                    <Meteors number={30} />
                    <CardContent className="p-12 text-center space-y-8">
                        {/* Animated Title */}
                        <TextAnimate
                            animation="blurInUp"
                            by="word"
                            className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
                        >
                            Blog Coming Soon
                        </TextAnimate>
                        
                        {/* Subtitle with delay */}
                        <TextAnimate
                            animation="fadeIn"
                            by="word"
                            delay={0.5}
                            className="text-xl text-muted-foreground"
                        >
                            We are working on something amazing
                        </TextAnimate>
                        
                        {/* Description */}
                        <div className="pt-4">
                            <TextAnimate
                                animation="slideUp"
                                by="word"
                                delay={1}
                                className="text-base text-muted-foreground/80 leading-relaxed"
                            >
                                Stay tuned for insightful articles tutorials and updates about web development design and technology
                            </TextAnimate>
                        </div>

                        {/* Status Badge */}
                        <div className="pt-6">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>
                                <span className="text-sm font-medium text-primary">Work in Progress</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default BlogPage;