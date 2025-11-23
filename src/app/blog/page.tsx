import { Metadata } from "next";
import Link from "next/link";
import { getAllPublished } from "@/lib/notion";

export const metadata: Metadata = {
    title: "Blog",
    description: "Insights, tutorials, and updates about web development, design, and technology.",
};

// Enable ISR with 60-second revalidation
export const revalidate = 60;

/**
 * Format date to readable string
 */
function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default async function BlogPage() {
    const posts = await getAllPublished();

    return (
        <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-crimson text-foreground mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Insights, tutorials, and updates about web development, design, and technology
                    </p>
                </div>

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg">
                            No posts published yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group"
                            >
                                <article className="h-full bg-card border border-border rounded-lg p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1">
                                    {/* Title */}
                                    <h2 className="text-2xl font-bold font-crimson text-foreground mb-3 group-hover:text-[#d84315] transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                        {post.description}
                                    </p>

                                    {/* Metadata Row */}
                                    <div className="flex flex-col gap-3 mt-auto">
                                        {/* Date */}
                                        <time
                                            dateTime={post.date}
                                            className="text-sm text-[#78716c]"
                                        >
                                            {formatDate(post.date)}
                                        </time>

                                        {/* Tags */}
                                        {post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 text-sm font-medium rounded-full bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] dark:bg-[#7c2d12]/30 dark:text-[#fb923c] dark:border-[#7c2d12]"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
