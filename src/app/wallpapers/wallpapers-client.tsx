"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { wallpapers, type WallpaperAspect } from "@sections/wallpapers/config/wallpapers";
import { WallpaperCard } from "@components/shared/WallpaperCard";
import { BlurFade } from "@components/ui/blur-fade";
import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";

type Filter = "all" | WallpaperAspect;

const filters: { id: Filter; label: string; hint: string }[] = [
  { id: "all", label: "All", hint: "All wallpapers" },
  { id: "16x9", label: "Desktop", hint: "16:9 — desktop" },
  { id: "9x16", label: "Mobile", hint: "9:16 — mobile" },
];

export function WallpapersListingClient() {
  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () => (active === "all" ? wallpapers : wallpapers.filter((w) => w.aspect === active)),
    [active],
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <BlurFade delay={0.1} inView direction="up">
            <h1 className="bg-linear-to-r from-primary to-primary/50 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
              Wallpapers
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Original artwork made for desktop and mobile screens. Pick a size, hit
              download, and enjoy. Free for personal use.
            </p>
          </BlurFade>
        </div>

        {/* Filter — segmented control */}
        <BlurFade delay={0.2} inView direction="up">
          <div
            role="tablist"
            aria-label="Filter wallpapers by aspect ratio"
            className="mb-10 inline-flex rounded-full border border-border bg-card/50 p-1 backdrop-blur"
          >
            {filters.map((f) => {
              const selected = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={f.hint}
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    selected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </BlurFade>

        {/* Grid */}
        <div
          role="tabpanel"
          aria-label={`${active === "all" ? "All" : active} wallpapers`}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((wp, i) => (
            <BlurFade
              key={wp.id}
              delay={0.05 * (i % 8)}
              inView
              direction="up"
              className={cn(
                wp.aspect === "16x9" && active !== "9x16" && "sm:col-span-2",
              )}
            >
              <WallpaperCard wallpaper={wp} index={i} />
            </BlurFade>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No wallpapers in this category yet.</p>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {visible.length} of {wallpapers.length} wallpapers
        </div>
      </div>
    </div>
  );
}
