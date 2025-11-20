import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DateFormatter from "./date-formatter";
import { type Author } from "@/src/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <header className="max-w-3xl mx-auto py-12 px-4 md:px-8">
      {/* Back navigation and date */}
      <nav className="flex items-center justify-between mb-8 gap-4" aria-label="Post navigation">
        <Link 
          href="/blog-test" 
          className="font-outfit text-xs md:text-sm text-ash-700 dark:text-ash-400 hover:text-ember-500 dark:hover:text-ember-500 transition-colors duration-350 ease-smooth motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ash-50 dark:focus-visible:ring-offset-ash-950 rounded-sm px-1 -mx-1"
          aria-label="Back to all blog posts"
        >
          ← All posts
        </Link>
        <time 
          className="font-outfit text-xs text-ash-600 dark:text-ash-500 uppercase tracking-widest"
          dateTime={date}
        >
          <DateFormatter dateString={date} />
        </time>
      </nav>
      
      {/* Post title */}
      <h1 className="font-crimson text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-ash-950 dark:text-ash-50 mb-8">
        {title}
      </h1>
      
      {/* Author section */}
      <div className="flex items-center gap-4 mb-12" role="complementary" aria-label="Author information">
        <Avatar className="h-12 w-12 md:h-14 md:w-14 transition-transform duration-350 ease-smooth hover:scale-110">
          <AvatarImage src={author.picture} alt={`${author.name}'s avatar`} />
          <AvatarFallback className="font-outfit text-base md:text-lg bg-ember-100 dark:bg-ember-900 text-ember-700 dark:text-ember-300">
            {author.name.split(' ').map(part => part.charAt(0).toUpperCase()).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-outfit text-sm md:text-base font-medium text-ash-950 dark:text-ash-50">
            {author.name}
          </p>
          <p className="font-jetbrains text-xs md:text-sm tracking-wide text-ash-600 dark:text-ash-500">
            <span aria-label="Estimated reading time">8 min read</span>
          </p>
        </div>
      </div>
      
      {/* Separator */}
      <Separator className="mb-12 bg-ash-300 dark:bg-ash-800" role="separator" />
      
      {/* Cover image */}
      <figure className="w-full aspect-[16/9] md:aspect-[21/9] rounded overflow-hidden border border-ash-300 dark:border-ash-800 mb-12 transition-transform duration-800 ease-smooth hover:scale-[1.01]">
        <img 
          src={coverImage} 
          alt={`Cover image for ${title}`}
          className="w-full h-full object-cover"
        />
      </figure>
    </header>
  );
}
