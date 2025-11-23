'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TagFilterProps {
    tags: string[];
}

export function TagFilter({ tags }: TagFilterProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const currentTag = searchParams.get('tag');

    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (currentTag === tag) {
            params.delete('tag');
        } else {
            params.set('tag', tag);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleClearTag = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('tag');
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    if (tags.length === 0) return null;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Filter by Tag</h3>
                {currentTag && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearTag}
                        className="h-auto py-1 px-2 text-xs"
                    >
                        <X className="h-3 w-3 mr-1" />
                        Clear filter
                    </Button>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant={currentTag === tag ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
