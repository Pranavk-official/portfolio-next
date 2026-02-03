"use client";

import { PixelImage } from "../ui/pixel-image";
import { isChristmasHoliday } from "@/lib/utils";
// import { useEffect, useState } from "react";

export function ProfileCard() {
  // const [isDark, setIsDark] = useState(false);

  // useEffect(() => {
  //   const updateTheme = () => {
  //     setIsDark(document.body.classList.contains("dark"));
  //   };

  //   updateTheme();

  //   const observer = new MutationObserver(updateTheme);
  //   observer.observe(document.body, {
  //     attributes: true,
  //     attributeFilter: ["class"],
  //   });

  //   return () => observer.disconnect();
  // }, []);

  // const imgUrl = isDark ? "/profile_dark.png" : "/profile_img.png";

  const avatarSrc = isChristmasHoliday()
    ? "/xmas-avatar.png"
    : "/profile_dark.png";

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <div className="relative rounded-full aspect-square">
        <PixelImage src={avatarSrc} grid="8x8" />

        {/* Text - Always Visible */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center whitespace-nowrap">
            Pranav K
          </h1>
          <p className="text-sm md:text-base text-white font-medium text-center whitespace-nowrap">
            Full Stack Developer
          </p>
        </div>
      </div>
    </div>
  );
}
