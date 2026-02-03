"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import { dockItems } from "@/src/sections/config/dockItems";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavDock() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the footer element
      const footer = document.querySelector("footer");
      if (!footer) return;

      // Get the footer's position
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate the dock's approximate position (bottom-10 = 2.5rem = 40px from bottom)
      const dockBottomPosition = windowHeight - 40;

      // Hide dock if footer's top is above the dock's position
      // Adding a buffer of 100px to start hiding earlier for smoother transition
      setIsHidden(footerRect.top < dockBottomPosition + 100);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Also listen to resize in case viewport changes
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed bottom-10 left-1/2 -translate-x-1/2 transition-all duration-300 motion-reduce:transition-none z-50",
        isHidden
          ? "opacity-0 pointer-events-none translate-y-20"
          : "opacity-100",
      )}
      aria-label="Main navigation dock"
    >
      <TooltipProvider>
        <Dock direction="middle">
          {dockItems
            .filter((item) => !item.showOnlyWhenNotHome || !isHome)
            .map((item) =>
              item.id === "separator" ? (
                <Separator
                  key={item.id}
                  orientation="vertical"
                  className="h-full"
                  role="separator"
                  aria-hidden="true"
                />
              ) : (
                <DockIcon key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        aria-label={item.label}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12 rounded-full focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2",
                        )}
                      >
                        <item.icon className="size-4" aria-hidden="true" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              ),
            )}
        </Dock>
      </TooltipProvider>
    </nav>
  );
}
