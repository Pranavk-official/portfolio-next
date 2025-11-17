"use client";

import AnimatedText from "@components/ui/cursor-follow-text";
import { Meteors } from "@components/ui/meteors";
import { dockItems } from "@/src/sections/config/dockItems";
import Link from "next/link";

function FooterSection() {
  // Filter out separator and non-social items
  const socialLinks = dockItems.filter(
    (item) => item.id !== "separator" && item.id !== "blog" && item.id !== "resume" && item.id !== "home"
  );

  return (
    <footer
      className="footer-bg relative border 2xl:h-[550px] h-fit lg:pb-20 md:mb-8 w-[95%] mx-auto rounded-lg overflow-hidden radial-gradient-bg
                   [--gradient-center:#f3f4f6] [--gradient-edge:#f3f4f6]
                   dark:[--gradient-center:#02081765] dark:[--gradient-edge:#020817]"
    >
      {/* Meteors Background Effect */}
      <Meteors number={30} />

      <div className="gap-10 sm:flex justify-between p-5 2xl:py-10 py-5 bg-primary dark:bg-primary rounded-xs rounded-b-none text-primary-foreground">
        <div className="w-fit flex-col flex justify-center">
          <div className="2xl:w-24 2xl:h-24 w-20 h-20 ml-3 bg-background rounded-xs before:absolute relative before:w-full before:h-full before:bg-background/50 before:rounded-md before:-top-3 before:-left-3"></div>
          <article className="py-2 2xl:w-80 w-64 space-y-1">
            <h1 className="newFont text-3xl font-bold">Pranav K</h1>
            <p className="text-sm leading-[120%]">
              Building digital experiences with modern web technologies.
              Passionate about creating clean, responsive, and user-friendly interfaces
              that make a difference.
            </p>
          </article>
        </div>

        <div className="sm:block flex sm:mt-0 mt-4 gap-2 sm:w-auto w-full sm:space-y-2 relative z-10">
          {socialLinks.map((social) => (
            <Link
              key={social.id}
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
              className="bg-background sm:w-auto w-full grid place-content-center h-20 2xl:p-10 p-5 rounded-lg hover:bg-muted transition-colors"
              aria-label={social.label}
            >
              <social.icon className="sm:w-16 sm:h-16 w-12 h-12 text-primary" />
            </Link>
          ))}
        </div>
      </div>

      <div className="lg:flex hidden">
        <AnimatedText text="PRANAV K" className="2xl:text-[10rem] text-[12vw]" />
      </div>
    </footer>
  );
}

export default FooterSection;
