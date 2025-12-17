'use client';

import { useEffect, useState } from "react";
import { MainNavbar } from "../navbar/main_navbar";
import { ChevronDown, ChevronUp } from "lucide-react";


interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [scrollDirection, setScrollDirection] = useState("down");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showScrollButton, setShowScrollButton] = useState(false);


    // Search state

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setScrollDirection("down");
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection("up");
            }
            setShowScrollButton(currentScrollY > 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);



    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col h-full max-w-full bg-transparent text-foreground ">
            <header>
                <MainNavbar />
            </header>

            {showScrollButton && (
                <button
                    onClick={scrollDirection === "down" ? scrollToTop : scrollToBottom}
                    className="fixed bottom-6 right-6 z-50 bg-black hover:bg-black/80 text-primary-foreground p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                    {scrollDirection === "down" ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </button>
            )}

            <main className="flex w-full flex-1 flex-col">{children}</main>
        </div>
    );
}
