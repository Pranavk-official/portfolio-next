import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { PostMetadata } from "@/lib/notion";

interface ArticleCardProps {
    article: PostMetadata;
    index: number;
}

/**
 * Format date to readable string
 */
function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function ArticleCard({ article, index }: ArticleCardProps) {
    return (
        <Link href={`/blog/${article.slug}`} className="group block h-full">
            <MagicCard
                className="flex flex-col h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] rounded-md"
                gradientColor="#D9D9D955"
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex flex-col space-y-1.5 mb-4">
                        <h3 className="font-semibold leading-none tracking-tight font-crimson text-2xl group-hover:text-primary transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                            {article.description}
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                        <div className="flex items-center justify-between text-sm">
                            <time className="text-muted-foreground">
                                {formatDate(article.date)}
                            </time>

                            {article.tags.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                    {article.tags.slice(0, 2).map((tagName) => (
                                        <Badge key={tagName} variant="secondary">
                                            {tagName}
                                        </Badge>
                                    ))}
                                    {article.tags.length > 2 && (
                                        <Badge variant="outline">+{article.tags.length - 2}</Badge>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MagicCard>
        </Link>
    );
}
