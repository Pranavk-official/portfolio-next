import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { Meteors } from "@/components/ui/meteors";
import { type Author } from "@/src/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <BlurFade delay={0.2} inView>
      <article 
        className="mb-16 md:mb-24 px-4 md:px-0"
        aria-labelledby={`hero-post-${slug}`}
      >
      <Link 
        href={`/blog-test/posts/${slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ash-50 dark:focus-visible:ring-offset-ash-950 rounded transition-shadow duration-350 ease-smooth"
        aria-label={`Read featured article: ${title}`}
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded overflow-hidden bg-ash-200 dark:bg-ash-850 group">
          <Meteors number={15} className="bg-ember-500/50" />
          <img 
            src={coverImage} 
            alt="" 
            role="presentation"
            className="w-full h-full object-cover transition-transform duration-800 ease-smooth group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors duration-350 ease-smooth group-hover:from-black/90 group-hover:via-black/50">
            <h2 
              id={`hero-post-${slug}`}
              className="font-crimson text-2xl md:text-4xl lg:text-[4rem] font-semibold text-white leading-tight tracking-tight mb-4"
            >
              {title}
            </h2>
            <div className="flex gap-4 items-center flex-wrap">
              <time 
                className="font-outfit text-xs md:text-sm text-white/90 uppercase tracking-widest"
                dateTime={date}
              >
                <DateFormatter dateString={date} />
              </time>
              <Badge 
                variant="default" 
                className="bg-ember-500 hover:bg-ember-600 font-outfit text-xs uppercase tracking-widest transition-colors duration-350 ease-smooth"
                aria-label="Featured post"
              >
                FEATURED
              </Badge>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-12 mt-8">
        <p className="font-jetbrains text-base md:text-lg leading-relaxed tracking-wide text-ash-700 dark:text-ash-400">
          {excerpt}
        </p>
        <div className="flex items-center gap-3" role="complementary" aria-label="Author information">
          <Avatar className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-350 ease-smooth hover:scale-110">
            <AvatarImage src={author.picture} alt={`${author.name}'s avatar`} />
            <AvatarFallback className="font-outfit bg-ember-100 dark:bg-ember-900 text-ember-700 dark:text-ember-300">
              {author.name.split(' ').map(part => part.charAt(0).toUpperCase()).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-outfit text-sm font-medium text-ash-950 dark:text-ash-50">
              {author.name}
            </p>
          </div>
        </div>
      </div>
      </article>
    </BlurFade>
  );
}
