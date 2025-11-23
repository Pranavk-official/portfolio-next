'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                asChild={currentPage > 1}
                disabled={currentPage <= 1}
            >
                {currentPage > 1 ? (
                    <Link href={createPageURL(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Link>
                ) : (
                    <span>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </span>
                )}
            </Button>

            {/* Page Numbers */}
            <div className="hidden sm:flex gap-1">
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${index}`} className="px-3 py-2 text-muted-foreground">
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <Button
                            key={pageNum}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            asChild={!isActive}
                            disabled={isActive}
                        >
                            {isActive ? (
                                <span>{pageNum}</span>
                            ) : (
                                <Link href={createPageURL(pageNum)}>{pageNum}</Link>
                            )}
                        </Button>
                    );
                })}
            </div>

            {/* Mobile Page Indicator */}
            <div className="sm:hidden px-3 py-2 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                asChild={currentPage < totalPages}
                disabled={currentPage >= totalPages}
            >
                {currentPage < totalPages ? (
                    <Link href={createPageURL(currentPage + 1)}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                ) : (
                    <span>
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                )}
            </Button>
        </div>
    );
}
