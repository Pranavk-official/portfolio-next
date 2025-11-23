import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSinglePost, getAllSlugs } from "@/lib/notion";
import { Metadata } from "next";

// Enable ISR with 60-second revalidation
export const revalidate = 60;

/**
 * Generate static params for all published posts
 */
export async function generateStaticParams() {
    const slugs = await getAllSlugs();
    console.log('🎯 generateStaticParams - slugs:', slugs);
    return slugs.map((slug) => ({
        slug,
    }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>; // ← Changed to Promise
}): Promise<Metadata> {
    const { slug } = await params; // ← Await params
    console.log('📝 generateMetadata - slug:', slug);

    const post = await getSinglePost(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.description,
    };
}

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

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>; // ← Changed to Promise
}) {
    const { slug } = await params; // ← Await params
    console.log('📄 PostPage - slug:', slug);

    const post = await getSinglePost(slug);

    // Handle 404 case
    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
            <article className="max-w-3xl mx-auto">
                {/* Post Header */}
                <header className="mb-12">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold font-crimson text-foreground mb-6">
                        {post.title}
                    </h1>

                    {/* Date and Tags */}
                    <div className="flex flex-col gap-4 mb-6">
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

                    {/* Description */}
                    {post.description && (
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {post.description}
                        </p>
                    )}
                </header>

                {/* Post Content */}
                <div className="prose prose-ash prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
