import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export function Intro() {
  return (
    <section 
      className="relative min-h-[60vh] grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-center gap-8 md:gap-16 overflow-hidden mb-16 md:mb-24 px-4 md:px-8"
      aria-labelledby="blog-intro-heading"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-ember-500/[0.03] via-transparent to-teal-500/[0.03] -z-10" aria-hidden="true" />
      
      <BlurFade delay={0} inView>
        <div className="intro-content">
          <span className="font-outfit text-xs uppercase tracking-widest text-ash-600 dark:text-ash-400 block mb-4">
            WRITINGS
          </span>
          <h1 
            id="blog-intro-heading"
            className="font-crimson text-3xl md:text-5xl lg:text-[5.5rem] font-semibold leading-tight tracking-tight mb-6"
          >
            <AnimatedGradientText
              colorFrom="#d84315"
              colorTo="#0d7377"
              speed={0.5}
              className="text-ash-950 dark:text-ash-50"
            >
              Technical thoughts,
              <br />
              creative solutions
            </AnimatedGradientText>
          </h1>
          <p className="font-jetbrains text-base md:text-lg leading-relaxed tracking-wide text-ash-700 dark:text-ash-400">
            Deep dives into web development, design systems, and the craft of building for the web.
          </p>
        </div>
      </BlurFade>
      
      <BlurFade delay={0.15} inView>
        <div className="intro-decoration hidden md:flex items-center justify-center" aria-hidden="true">
          {/* Geometric accent shape */}
          <div className="relative w-64 h-64">
            {/* Main square with rotation */}
            <div className="absolute inset-0 border-2 border-ember-500/20 rotate-12 rounded-sm motion-reduce:rotate-0 transition-transform duration-800 ease-smooth hover:rotate-[15deg]" />
            <div className="absolute inset-8 border-2 border-teal-500/30 -rotate-6 rounded-sm motion-reduce:rotate-0 transition-transform duration-800 ease-smooth hover:-rotate-[9deg]" />
            <div className="absolute inset-16 bg-gradient-to-br from-ember-500/10 to-teal-500/10 rotate-3 rounded-sm motion-reduce:rotate-0 transition-transform duration-800 ease-smooth hover:rotate-[6deg]" />
            {/* Small accent dot */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-ember-500 rounded-full transition-transform duration-350 ease-smooth hover:scale-125" />
            <div className="absolute bottom-8 left-8 w-2 h-2 bg-teal-500 rounded-full transition-transform duration-350 ease-smooth hover:scale-125" />
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
