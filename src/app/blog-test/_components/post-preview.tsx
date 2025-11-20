import { type Author } from "@/src/interfaces/author";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  index?: number;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  index = 0,
}: Props) {
  // Calculate animation delay based on index
  const getDelay = (idx: number) => {
    return 0.3 + (idx * 0.1);
  };

  return (
    <BlurFade delay={getDelay(index)} inView>
      <Card 
        className="bg-white dark:bg-ash-875 border-ash-300 dark:border-ash-800 overflow-hidden transition-all duration-350 ease-smooth hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-ember-500 motion-reduce:transition-none motion-reduce:hover:transform-none group"
        role="article"
        aria-labelledby={`post-${slug}-title`}
      >
      <div className="relative aspect-video overflow-hidden bg-ash-200 dark:bg-ash-850">
        <img 
          src={coverImage} 
          alt="" 
          role="presentation"
          className="w-full h-full object-cover transition-all duration-800 ease-smooth [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] group-hover:scale-110 group-hover:[clip-path:polygon(0_0,100%_0,100%_90%,0_100%)] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:group-hover:[clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]"
        />
        <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-ember-500 transition-all duration-350 ease-smooth group-hover:w-full motion-reduce:transition-none" aria-hidden="true" />
      </div>
      
      <CardContent className="p-6 md:p-8">
        <time 
          className="font-outfit text-xs text-ash-600 dark:text-ash-500 uppercase tracking-widest block mb-3"
          dateTime={date}
        >
          <DateFormatter dateString={date} />
        </time>
        
        <h3 className="font-crimson text-xl md:text-2xl font-semibold leading-tight tracking-tight mb-4">
          <Link 
            href={`/blog-test/posts/${slug}`}
            id={`post-${slug}-title`}
            className="text-ash-950 dark:text-ash-50 no-underline bg-gradient-to-r from-ember-500 to-teal-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-350 ease-smooth hover:bg-[length:100%_2px] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ash-875 rounded-sm"
            aria-label={`Read article: ${title}`}
          >
            {title}
          </Link>
        </h3>
        
        <p className="font-jetbrains text-sm leading-relaxed tracking-wide text-ash-700 dark:text-ash-400 mb-6 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2" role="complementary" aria-label="Author information">
            <Avatar className="h-7 w-7 md:h-8 md:w-8 transition-transform duration-350 ease-smooth hover:scale-110">
              <AvatarImage src={author.picture} alt={`${author.name}'s avatar`} />
              <AvatarFallback className="text-xs font-outfit bg-ember-100 dark:bg-ember-900 text-ember-700 dark:text-ember-300">
                {author.name.split(' ').map(part => part.charAt(0).toUpperCase()).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="font-outfit text-xs text-ash-700 dark:text-ash-400 truncate">
              {author.name}
            </span>
          </div>
          <span 
            className="font-outfit text-xs md:text-sm text-ember-500 font-medium opacity-0 -translate-x-2 transition-all duration-350 ease-smooth group-hover:opacity-100 group-hover:translate-x-0 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 whitespace-nowrap"
            aria-hidden="true"
          >
            Read article →
          </span>
        </div>
      </CardContent>
      </Card>
    </BlurFade>
  );
}
