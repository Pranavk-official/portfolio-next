"use client";

import { PixelImage } from "../ui/pixel-image";
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

  const today = new Date();
  const isXmas = today.getMonth() === 11 && today.getDate() === 25;
  const avatarSrc = isXmas ? "/xmas-avatar.png" : "/profile_dark.png";

  return (
    <div className="w-full max-w-[280px] md:max-w-[400px] mx-auto">
      <div className="relative rounded-full aspect-square">

        <PixelImage
          src={avatarSrc}
          grid="8x8"
        />
        
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
