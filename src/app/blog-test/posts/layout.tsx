import { Particles } from "@/components/ui/particles";

export default function PostLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative bg-ash-50 dark:bg-ash-950">
            {/* Center line decoration */}
            <div 
                className="fixed top-0 left-1/2 -translate-x-1/2 w-px h-screen bg-ash-300 dark:bg-ash-800 opacity-30 -z-10" 
                aria-hidden="true"
            />
            
            {/* Particles effect */}
            <Particles
                className="fixed inset-0 -z-10"
                quantity={30}
                ease={80}
                color="#d84315"
                refresh={false}
            />
            
            {/* Content */}
            {children}
        </div>
    );
}
