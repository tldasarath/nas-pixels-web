"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductsSection from "../ui/home/ProductsSection";

gsap.registerPlugin(ScrollTrigger);

export default function AnimateScrollVideo({ media }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=350%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      /* 1️⃣ Video grows to fullscreen */
      tl.to(
        videoRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          ease: "power2.out",
        },
        0
      );

      /* 2️⃣ Text exits cleanly */
      tl.to(
        textRef.current,
        {
          y: -140,
          opacity: 0,
          ease: "power3.out",
        },
        0.15
      );

      /* 3️⃣ Reveal layer completes BEFORE unpin */
      tl.fromTo(
        revealRef.current,
        { y: "100%" },
        { y: "0%", ease: "power3.out" },
        0.55
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* VIDEO */}
      <div
        ref={videoRef}
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[320px] h-[320px]
          rounded-2xl overflow-hidden
          z-10
        "
      >
        <video
          src={media.mp4}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* HERO TEXT */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none"
      >
        <h1 className="text-white text-6xl md:text-8xl font-bold">
          Welcome to the Future
        </h1>
        <p className="text-gray-300 text-xl mt-4 max-w-2xl">
          Advanced LED display solutions for powerful, immersive visual
          experiences.
        </p>
      </div>

      {/* REVEAL LAYER */}
      <div ref={revealRef} className="absolute inset-0 z-30 bg-black">
        <ProductsSection />
      </div>
    </section>
  );
}
