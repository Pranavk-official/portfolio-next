import { Metadata } from "next";
import Link from "next/link";
import { getFilteredPosts, getAllTags } from "@/lib/notion";
import { Search } from "@/components/blog/search";
import { TagFilter } from "@/components/blog/tag-filter";
import { Pagination } from "@/components/blog/pagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

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
        <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-crimson text-foreground mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {total} {total === 1 ? 'post' : 'posts'}
                        {search && ` matching "${search}"`}
                        {tag && ` tagged with "${tag}"`}
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-8 space-y-6">
                    <Suspense fallback={<Skeleton className="h-10 w-full max-w-md" />}>
                        <Search placeholder="Search posts by title or content..." />
                    </Suspense>

                    <Suspense fallback={<Skeleton className="h-20 w-full" />}>
                        <TagFilter tags={allTags} />
                    </Suspense>
                </div>

                {/* Posts Grid */}
                <Suspense fallback={<PostsSkeleton />}>
                    {posts.length === 0 ? (
                        <Card className="text-center py-16">
                            <CardContent className="pt-6">
                                <p className="text-xl text-muted-foreground">
                                    No posts found
                                    {(search || tag) && '. Try adjusting your filters.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                            {posts.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                                    <Card className="flex flex-col h-full hover:shadow-lg transition-all cursor-pointer">
                                        <CardHeader>
                                            <CardTitle className="font-crimson group-hover:text-[#d84315] transition-colors">
                                                {post.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-3">
                                                {post.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col justify-end">
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
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </Suspense>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Suspense fallback={<Skeleton className="h-12 w-full" />}>
                        <Pagination currentPage={page} totalPages={totalPages} />
                    </Suspense>
                )}
            </div>
        </div>
    );
}
