"use client";

import { ProfileCard } from "@components/hero/ProfileCard";
import { Quote } from "@components/hero/Quote";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Card */}
          <div className="flex justify-center">
            <ProfileCard />
          </div>

          {/* Quote */}
          <div className="flex items-center justify-center">
            <Quote />
          </div>
        </div>
      </div>
    </section>
  );
}
