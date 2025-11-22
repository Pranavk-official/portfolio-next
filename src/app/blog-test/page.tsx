import Container from "@/src/app/blog-test/_components/container";
import { HeroPost } from "@/src/app/blog-test/_components/hero-post";
import { Intro } from "@/src/app/blog-test/_components/intro";
import { MoreStories } from "@/src/app/blog-test/_components/more-stories";
import { getAllPosts } from "@lib/blog-api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog Test",
};

export default function BlogPage() {
    const allPosts = getAllPosts();

    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);

    return (
        <main role="main" aria-label="Blog">
            <Intro />
            {heroPost && (
                <HeroPost
                    title={heroPost.title}
                    coverImage={heroPost.coverImage}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </main>

    );
}