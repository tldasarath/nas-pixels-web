"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { ModernButton } from "@/components/common/Button/ModernButton";

const DEPTH = 800;

// Default images defined outside component to prevent recreation
const defaultImages = Array.from({ length: 10 }, (_, i) => 
  `https://picsum.photos/id/${i + 32}/600/400/`
);

export default function ImageRing3D({ 
  images = defaultImages,
  title = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. aliquet mattis.",
  buttonText = "Our Products",
  onButtonClick = () => {},
  backgroundImage = ""
}) {
  const IMAGE_COUNT = images.length;
  const ROTATION_STEP = 360 / IMAGE_COUNT;

  const ringRef = useRef(null);
  const imgsRef = useRef([]);
  const xPos = useRef(0); 
  const autoRotateTween = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const imgs = imgsRef.current;
    const hero = heroRef.current;

    /* ---------------- HERO ANIMATION ---------------- */
    gsap.from(hero.children, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });

    /* ---------------- INIT ---------------- */
    gsap.set(ring, {
      rotationY: 180,
      cursor: "grab",
      transformStyle: "preserve-3d",
    });

    /* ---------------- AUTO ROTATE ---------------- */
    autoRotateTween.current = gsap.to(ring, {
      rotationY: "-=360",
      duration: 20,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        imgs.forEach((_, i) =>
          gsap.set(imgs[i], { backgroundPosition: getBgPos(i) })
        );
      },
    });

    gsap.set(imgs, {
      rotateY: (i) => i * -ROTATION_STEP,
      transformOrigin: `50% 50% ${DEPTH}px`,
      z: -DEPTH,
      backgroundImage: (i) => `url(${images[i]})`,
      backgroundSize: "cover",
      backgroundPosition: (i) => getBgPos(i),
      backfaceVisibility: "hidden",
    });

    /* ---------------- ENTRANCE ---------------- */
    gsap.from(imgs, {
      y: 200,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "expo.out",
    });

    /* ---------------- HOVER ---------------- */
    imgs.forEach((img) => {
      img.addEventListener("mouseenter", () => {
        gsap.to(imgs, {
          opacity: (i, t) => (t === img ? 1 : 0.5),
          ease: "power3.out",
        });
      });

      img.addEventListener("mouseleave", () => {
        gsap.to(imgs, {
          opacity: 1,
          ease: "power2.inOut",
        });
      });
    });

    /* ---------------- DRAG ---------------- */
    const dragStart = (e) => {
      xPos.current = getClientX(e);
      gsap.set(ring, { cursor: "grabbing" });
      autoRotateTween.current.pause();
      window.addEventListener("mousemove", drag);
      window.addEventListener("touchmove", drag);
    };

    const drag = (e) => {
      const currentX = getClientX(e);
      const delta = currentX - xPos.current;

      gsap.to(ring, {
        rotationY: `-=${delta}`,
        duration: 0.3,
        onUpdate: () => {
          imgs.forEach((_, i) =>
            gsap.set(imgs[i], { backgroundPosition: getBgPos(i) })
          );
        },
      });

      xPos.current = currentX;
    };

    const dragEnd = () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
      gsap.set(ring, { cursor: "grab" });
      autoRotateTween.current.resume();
    };

    window.addEventListener("mousedown", dragStart);
    window.addEventListener("touchstart", dragStart);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchend", dragEnd);

    return () => {
      window.removeEventListener("mousedown", dragStart);
      window.removeEventListener("mouseup", dragEnd);
      window.removeEventListener("touchstart", dragStart);
      window.removeEventListener("touchend", dragEnd);
      if (autoRotateTween.current) {
        autoRotateTween.current.kill();
      }
    };
  }, [images, IMAGE_COUNT, ROTATION_STEP]);

  /* ---------------- HELPERS ---------------- */
  const getClientX = (e) =>
    e.touches ? e.touches[0].clientX : e.clientX;

  const getBgPos = (i) => {
    const rotY = gsap.getProperty(ringRef.current, "rotationY");
    return `${
      100 -
      (gsap.utils.wrap(0, 360, rotY - 180 - i * ROTATION_STEP) / 360) * 500
    }px 0px`;
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: backgroundImage ? 'transparent' : '#000'
      }}
    >
      {/* Background overlay for better text readability */}
      {/* {backgroundImage && (
        <div className="absolute inset-0 bg-black/10 z-0" />
      )} */}
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="absolute -top-5 md:top-0 left-0 right-0 z-10 flex flex-col items-center justify-center pt-16 pb-8 px-4 mb-10 md:mb-0"
      >
        <h1 className="text-xl md:text-4xl font-bold text-white text-center max-w-2xl mb-8">
          {title}
        </h1>
{/* <ModernButton text={buttonText}/> */}
      </div>

      {/* 3D Carousel */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "2000px",
        }}
      >
        <div
          ref={ringRef}
          className="absolute left-1/2 top-1/2 w-full h-full"
          style={{
            transform: "translate(-50%, -50%)",
            transformStyle: "preserve-3d",
          }}
        >
          {Array.from({ length: IMAGE_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (imgsRef.current[i] = el)}
              className="absolute left-1/2 top-1/2 w-[450px] h-[300px] -ml-[225px] -mt-[150px] rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}