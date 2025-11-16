"use client";

import { useMotionValue, motion, useSpring, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { dockItems } from "../../sections/hero/config/dockItems";

export function MagnifiedDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <TooltipProvider>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-full px-6 py-3 border border-zinc-200 dark:border-zinc-700 shadow-lg"
      >
        <div className="flex items-center gap-4">
          {dockItems.map((item) => (
            <DockIcon key={item.id} mouseX={mouseX} item={item} />
          ))}
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: (typeof dockItems)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          ref={ref}
          style={{ width }}
          className="flex items-center justify-center cursor-pointer"
        >
          <Icon className="w-full h-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{item.label}</p>
      </TooltipContent>
    </Tooltip>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className="block">
      {content}
    </Link>
  );
}
