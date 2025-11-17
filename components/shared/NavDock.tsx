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

export function NavDock() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
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
                        "size-12 rounded-full"
                      )}
                    >
                      <item.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            )
          )}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
