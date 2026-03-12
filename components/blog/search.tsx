'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@uidotdev/usehooks';
import { Search as SearchIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Search({ placeholder = 'Search posts...' }: { placeholder?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [inputValue, setInputValue] = useState(() => searchParams.get('search') || '');
    const debouncedSearchTerm = useDebounce(inputValue, 300);
    const searchParamsRef = useRef(searchParams);
    useEffect(() => { searchParamsRef.current = searchParams; }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(searchParamsRef.current);
        params.set('page', '1');

        if (debouncedSearchTerm && debouncedSearchTerm.trim()) {
            params.set('search', debouncedSearchTerm);
        } else {
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedSearchTerm, pathname, replace]);

    const handleClear = () => {
        setInputValue('');
    };

    return (
        <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-10 pr-10"
            />
            {inputValue && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
