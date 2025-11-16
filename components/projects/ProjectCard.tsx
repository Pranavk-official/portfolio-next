'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  year: string;
  shortDescription: string;
  category: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  'web-app': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  mobile: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  tool: 'bg-green-500/10 text-green-500 border-green-500/20',
  community: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
};

export function ProjectCard({
  title,
  year,
  shortDescription,
  category,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-96 w-full flex-col overflow-hidden border bg-background transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
        className
      )}
    >
      <div className="flex h-full flex-col justify-between p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="outline"
              className={cn('border text-xs', categoryColors[category])}
            >
              {category.split('-').join(' ').toUpperCase()}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{year}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {shortDescription}
          </p>
        </div>

        <button className="absolute bottom-4 right-4 rounded-lg bg-neutral-200 p-2 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700">
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
