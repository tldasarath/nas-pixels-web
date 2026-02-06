"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function PixelCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const pathname = usePathname();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Hide standard cursor
        document.body.style.cursor = "none";

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const trailContainer = document.createElement("div");
        trailContainer.className = "pixel-trail-container fixed inset-0 pointer-events-none z-[9997]";
        document.body.appendChild(trailContainer);

        let ctx = gsap.context(() => {
            gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
            gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 });

            // Intro animation
            gsap.to([cursor, follower], { scale: 1, duration: 0.5, ease: "back.out(1.7)" });

            const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            const mouse = { x: pos.x, y: pos.y };
            const speed = { x: 0, y: 0 };

            const fp = { x: pos.x, y: pos.y }; // follower pos

            const xSet = gsap.quickSetter(cursor, "x", "px");
            const ySet = gsap.quickSetter(cursor, "y", "px");
            const fXSet = gsap.quickSetter(follower, "x", "px");
            const fYSet = gsap.quickSetter(follower, "y", "px");

            let idleTimer;
            let idleTween;

            window.addEventListener("mousemove", (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;

                // Immediate update for inner dot
                xSet(mouse.x);
                ySet(mouse.y);

                // Reset idle timer
                if (idleTimer) clearTimeout(idleTimer);
                if (idleTween) {
                    idleTween.kill();
                    idleTween = null;
                    gsap.to(followerRef.current, { scale: 1, duration: 0.2 });
                }

                idleTimer = setTimeout(() => {
                    // Start camera focus breathing animation
                    idleTween = gsap.to(followerRef.current, {
                        scale: 0.9,
                        repeat: 3,
                        yoyo: true,
                        duration: 0.6,
                        ease: "sine.inOut",
                        onComplete: () => {
                            idleTween = null; // Clear reference when done
                        }
                    });
                }, 500);
            });

            // Ticker for smooth follower and trail generation
            gsap.ticker.add((time, deltaTime) => {
                const dt = 1.0 - Math.pow(1.0 - 0.2, deltaTime / 16.666); // smooth lerp

                fp.x += (mouse.x - fp.x) * dt;
                fp.y += (mouse.y - fp.y) * dt;

                fXSet(fp.x);
                fYSet(fp.y);

                // Calculate velocity for trail intensity
                speed.x = mouse.x - fp.x;
                speed.y = mouse.y - fp.y;
                const velocity = Math.sqrt(speed.x * speed.x + speed.y * speed.y);

                // Spawn pixel trail if moving fast enough
                if (velocity > 5) {
                    spawnPixel(fp.x, fp.y);
                }
            });

            function spawnPixel(x, y) {
                if (Math.random() > 0.3) return; // limit density

                const pixel = document.createElement("div");
                // Random greens for "matrix" feel, or just brand green
                const colors = ["#70C879", "#4CAF50", "#ffffff"];
                const color = colors[Math.floor(Math.random() * colors.length)];

                const size = Math.random() * 4 + 2; // 2px to 6px

                pixel.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            pointer-events: none;
            opacity: 0.8;
            z-index: 9997;
        `;

                trailContainer.appendChild(pixel);

                gsap.to(pixel, {
                    x: (Math.random() - 0.5) * 30, // scatter slightly
                    y: (Math.random() - 0.5) * 30,
                    opacity: 0,
                    scale: 0,
                    duration: 0.8,
                    ease: "power1.out",
                    onComplete: () => {
                        if (pixel.parentNode) pixel.parentNode.removeChild(pixel);
                    }
                });
            }
        });

        // Hover listeners
        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Mutation observer to attach listeners to new elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            const els = node.querySelectorAll ? node.querySelectorAll("a, button, input, [role='button']") : [];
                            if (node.matches && node.matches("a, button, input, [role='button']")) {
                                node.addEventListener("mouseenter", handleMouseEnter);
                                node.addEventListener("mouseleave", handleMouseLeave);
                            }
                            els.forEach(el => {
                                el.addEventListener("mouseenter", handleMouseEnter);
                                el.addEventListener("mouseleave", handleMouseLeave);
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.body.style.cursor = "auto";
            ctx.revert();
            if (trailContainer.parentNode) trailContainer.parentNode.removeChild(trailContainer);
            observer.disconnect();
        };
    }, [pathname]); // Re-run on route change to re-attach listeners if needed, though observer handles most

    return (
        <>
            {/* Inner Dot */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-2 h-2 bg-[#70C879] z-[9999] pointer-events-none mix-blend-difference rounded-sm transition-transform duration-300 ${isHovering ? 'scale-[0]' : 'scale-100'}`}
            />

            {/* Outer Follower */}
            {/* Outer Follower */}
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 z-[9998] pointer-events-none transition-all duration-300 ease-out flex items-center justify-center
            ${isHovering ? 'w-12 h-12 bg-[#70C879]/20 backdrop-blur-[1px]' : 'w-8 h-8 bg-transparent'}
        `}
            >
                {/* Camera Focus Corners */}
                <span className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#70C879]" />
                <span className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-[#70C879]" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-[#70C879]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#70C879]" />

                {/* Crosshair lines inside follower when hovering */}
                <div className={`w-full h-[1px] bg-[#70C879] absolute top-1/2 left-0 -translate-y-1/2 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`h-full w-[1px] bg-[#70C879] absolute left-1/2 top-0 -translate-x-1/2 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
            </div>
        </>
    );
}
