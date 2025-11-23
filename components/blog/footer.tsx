"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ArrowUp, Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export function BlogFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 px-4 md:px-6 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Copyright */}
                <div className="text-sm text-muted-foreground text-center md:text-left order-2 md:order-1">
                    <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
                    <p className="text-xs mt-1">
                        Built by <Link href={siteConfig.links.github} target="_blank" className="hover:underline underline-offset-4 font-medium text-foreground">@Pranavk-official</Link>
                    </p>
                </div>

                {/* Social Icons & Scroll Top */}
                <div className="flex items-center gap-4 order-1 md:order-2">
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted" asChild>
                            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                                <SiGithub className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted" asChild>
                            <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                                <SiLinkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted" asChild>
                            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                                <FaXTwitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted" asChild>
                            <Link href={siteConfig.links.email} target="_blank" rel="noreferrer">
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                            </Link>
                        </Button>
                    </div>

                    <div className="h-6 w-px bg-border mx-2 hidden md:block" />

                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-9 w-9"
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
