"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { getTimeUntilNewYear } from "@/lib/utils/dateHelpers";
import { Fireworks } from "@/components/ui/fireworks";
import { Post } from "@/src/interfaces/post";

interface AnnouncementBarProps {
  latestPost?: Post;
}

export function AnnouncementBar({ latestPost }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [activeView, setActiveView] = useState<"countdown" | "blog">("countdown");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Initial check
    const updateTime = () => {
      const t = getTimeUntilNewYear();
      setTimeLeft(t);

      if (t <= 0 && t > -1000) { // Just hit zero (within 1 second)
        setShowFireworks(true);
      }
    };

    // Run initial check in next frame to avoid synchronous state update warning
    requestAnimationFrame(updateTime);
    
    // If it's already New Year (within the season window but past Jan 1st), show fireworks briefly
    // Check if it is Jan 1st (time left is negative but close to 0)
    // Actually, getTimeUntilNewYear returns negative if we are past Jan 1st of the target year.
    // If today is Jan 1st 2025, target was Jan 1st 2025. Result is negative.
    // If today is Jan 2nd 2025, target was Jan 1st 2025. Result is negative.
    
    // We want to show fireworks if it is Jan 1st.
    const now = new Date();
    if (now.getMonth() === 0 && now.getDate() === 1) {
        setTimeout(() => setShowFireworks(true), 0);
    }

    const timer = setInterval(updateTime, 1000);

    // Cycle views every 5 seconds
    const cycleTimer = setInterval(() => {
      setActiveView((prev) => (prev === "countdown" ? "blog" : "countdown"));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(cycleTimer);
    };
  }, []);

  if (!isVisible || !mounted) return null;

  const formatTime = (ms: number) => {
    if (ms <= 0) return "Happy New Year! 🎆";
    
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      {showFireworks && <Fireworks duration={10000} />}
      
      <div className="relative z-50 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10 opacity-10 mix-blend-soft-light"></div>
        
        <div className="container mx-auto flex h-10 items-center justify-center px-4 text-sm font-medium sm:h-12">
          <AnimatePresence mode="wait">
            {activeView === "countdown" || !latestPost ? (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>New Year Countdown:</span>
                <span className="font-mono font-bold tabular-nums">
                  {formatTime(timeLeft)}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-2"
              >
                <span className="hidden sm:inline">Latest Update:</span>
                <Link 
                  href={`/blog/${latestPost.slug}`}
                  className="flex items-center gap-1 underline decoration-white/50 underline-offset-4 hover:decoration-white"
                >
                  {latestPost.title}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/20 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
