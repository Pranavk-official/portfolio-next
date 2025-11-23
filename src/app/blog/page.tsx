import { Metadata } from "next";
import Link from "next/link";
import { getFilteredPosts, getAllTags } from "@/lib/notion";
import { Search } from "@/components/blog/search";
import { TagFilter } from "@/components/blog/tag-filter";
import { Pagination } from "@/components/blog/pagination";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Blog",
    description: "Insights, tutorials, and updates about web development, design, and technology.",
};

// Enable ISR with 600-second revalidation
export const revalidate = 60;

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        tag?: string;
    }>;
}

/**
 * Format date to readable string
 */
function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function PostsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const search = params.search || '';
    const tag = params.tag || '';

    const [{ posts, total, totalPages }, allTags] = await Promise.all([
        getFilteredPosts(page, 9, search, tag),
        getAllTags(),
    ]);

    return (
        <div className="relative bg-background py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <DotPattern
                className={cn(
                    "mask-[radial-gradient(600px_circle_at_center,white,transparent)]",
                    "opacity-50"
                )}
            />
            <div className="relative max-w-7xl mx-auto z-10">
                {/* Header */}
                <div className="mb-12">
                    <BlurFade delay={0.1} inView>
                        <TextAnimate animation="blurInUp" by="character" className="text-4xl md:text-5xl font-bold font-crimson text-foreground mb-4">
                            Blog
                        </TextAnimate>
                    </BlurFade>
                    <BlurFade delay={0.2} inView>
                        <p className="text-lg text-muted-foreground">
                            {total} {total === 1 ? 'post' : 'posts'}
                            {search && ` matching "${search}"`}
                            {tag && ` tagged with "${tag}"`}
                        </p>
                    </BlurFade>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-8 space-y-6">
                    <BlurFade delay={0.3} inView>
                        <Suspense fallback={<Skeleton className="h-10 w-full max-w-md" />}>
                            <Search placeholder="Search posts by title or content..." />
                        </Suspense>
                    </BlurFade>

                    <BlurFade delay={0.4} inView>
                        <Suspense fallback={<Skeleton className="h-20 w-full" />}>
                            <TagFilter tags={allTags} />
                        </Suspense>
                    </BlurFade>
                </div>

                {/* Posts Grid */}
                <Suspense fallback={<PostsSkeleton />}>
                    {posts.length === 0 ? (
                        <BlurFade delay={0.5} inView>
                            <Card className="text-center py-16">
                                <CardContent className="pt-6">
                                    <p className="text-xl text-muted-foreground">
                                        No posts found
                                        {(search || tag) && '. Try adjusting your filters.'}
                                    </p>
                                </CardContent>
                            </Card>
                        </BlurFade>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                            {posts.map((post, idx) => (
                                <BlurFade key={post.id} delay={0.25 + idx * 0.05} inView>
                                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                                        <MagicCard
                                            className="flex flex-col h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] rounded-md"
                                            gradientColor="#D9D9D955"
                                        >
                                            <div className="flex flex-col h-full p-6">
                                                <div className="flex flex-col space-y-1.5 mb-4">
                                                    <h3 className="font-semibold leading-none tracking-tight font-crimson text-2xl group-hover:text-ember-500 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                                                        {post.description}
                                                    </p>
                                                </div>
                                                <div className="flex-1 flex flex-col justify-end">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <time className="text-muted-foreground">
                                                            {formatDate(post.date)}
                                                        </time>

                                                        {post.tags.length > 0 && (
                                                            <div className="flex gap-1 flex-wrap">
                                                                {post.tags.slice(0, 2).map((tagName) => (
                                                                    <Badge key={tagName} variant="secondary">
                                                                        {tagName}
                                                                    </Badge>
                                                                ))}
                                                                {post.tags.length > 2 && (
                                                                    <Badge variant="outline">
                                                                        +{post.tags.length - 2}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </MagicCard>
                                    </Link>
                                </BlurFade>
                            ))}
                        </div>
                    )}
                </Suspense>

                {/* Pagination */}
                {totalPages > 1 && (
                    <BlurFade delay={0.6} inView>
                        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
                            <Pagination currentPage={page} totalPages={totalPages} />
                        </Suspense>
                    </BlurFade>
                )}
            </div>
        </div>
    );
}
