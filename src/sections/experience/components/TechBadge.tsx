import { cn } from "@/lib/utils";

interface TechBadgeProps {
    label: string;
}

export function TechBadge({ label }: TechBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-1",
                "text-xs font-medium rounded-md",
                "bg-secondary/60 text-secondary-foreground",
                "border border-border/50",
                "transition-all duration-200 ease-in-out",
                "hover:bg-accent hover:text-accent-foreground hover:border-border",
                "hover:shadow-sm hover:-translate-y-0.5",
                // Dark mode enhancements
                "dark:bg-secondary/40 dark:hover:bg-accent/80",
                // Reduced motion support
                "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            )}
        >
            {label}
        </span>
    );
}
