import { Post } from "@/src/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section 
      className="mb-24 px-4 md:px-0"
      aria-labelledby="more-stories-heading"
    >
      <h2 
        id="more-stories-heading"
        className="font-crimson text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-ash-950 dark:text-ash-50 mb-12"
      >
        More Stories
      </h2>
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        role="feed"
        aria-label="Blog posts"
      >
        {posts.map((post, index) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
