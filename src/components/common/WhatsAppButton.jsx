"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function WhatsAppButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <Link
            href="https://wa.me/971567792681"
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-32 right-6 z-50 
        w-14 h-14 
        flex items-center justify-center 
        rounded-full 
        bg-[#25D366] 
        text-white 
        text-4xl 
        shadow-lg 
        transition-all duration-300 
        hover:scale-110 hover:shadow-green-500/50
        animate-pulse-slow
        ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10 pointer-events-none"
                }`}
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp />
        </Link>
    );
}
