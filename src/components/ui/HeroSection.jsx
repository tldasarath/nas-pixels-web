import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const HeroSectionNew = () => {
  const carouselRef = useRef(null);
  const textContainerRef = useRef(null);
  const translateXRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Sample LED display images - replace with your actual images
  const images = [
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600267185393-e158a98703de?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600267204026-3e0ac38e2ca3?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600267185393-e158a98703de?w=400&h=600&fit=crop',
  ];

  // Duplicate images for infinite loop
  const allImages = [...images, ...images, ...images];

  useEffect(() => {
    // Animate text reveal on mount
    const textElements = textContainerRef.current?.querySelectorAll('.text-char');
    if (textElements) {
      gsap.fromTo(
        textElements,
        { y: 120, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          stagger: 0.03,
          ease: 'power4.out',
          delay: 0.2,
        }
      );
    }

    // Continuous carousel animation
    const animate = () => {
      translateXRef.current -= 0.5; // Speed of scroll
      
      const slideWidth = 294; // 264px width + 30px margin
      const totalWidth = slideWidth * images.length;
      
      if (Math.abs(translateXRef.current) >= totalWidth) {
        translateXRef.current = 0;
      }
      
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translate3d(${translateXRef.current}px, 0px, 0px)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const TextLine = ({ text }) => (
    <div className="text-line flex text-4xl md:text-6xl xl:text-8xl font-extrabold relative overflow-hidden mb-2">
      {text.split('').map((char, index) => (
        <span
          key={index}
          data-text={char}
          className="text-char inline-block mx-[0.1rem] md:mx-[0.2rem] relative leading-none"
          style={{
            color: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <span
            className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Carousel Container */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: 'translate(0%, 10%)' }}
      >
        <div className="w-full h-full overflow-hidden relative">
          <div
            ref={carouselRef}
            className="flex transition-none will-change-transform"
            style={{
              perspective: '1000px',
            }}
          >
            {allImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 gallery-slide"
                style={{
                  width: '264px',
                  marginRight: '30px',
                }}
              >
                <div 
                  className="image-container h-full relative"
                  style={{
                    transform: 'rotateY(-5deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={image}
                    alt={`LED Display ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg shadow-2xl"
                    style={{
                      height: '400px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Text Overlay */}
      <div 
        ref={textContainerRef}
        className="absolute top-[20vh] left-0 w-full flex justify-center items-center flex-col z-10 px-4"
      >
        <TextLine text="PREMIUM LED" />
        <TextLine text="DISPLAYS" />
        
        <p className="mt-6 text-center text-white/80 text-base md:text-lg max-w-2xl px-4">
          Transform your vision into reality with our cutting-edge LED display solutions
        </p>
        
        <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
          Explore Our Solutions
        </button>
      </div>

      {/* Gradient Overlays for fade effect */}
      <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 w-full flex justify-center items-center z-30">
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
          <p className="text-white/50 text-sm mt-2">Scroll To Explore</p>
        </div>
      </div>

      {/* CSS for 3D effect */}
      <style jsx>{`
        .gallery-slide {
          transition: transform 0.3s ease;
        }
        
        .gallery-slide:hover .image-container {
          transform: rotateY(0deg) scale(1.05);
        }
        
        @media (max-width: 768px) {
          .text-line {
            font-size: 2.5rem;
          }
        }
        
        @media (max-width: 640px) {
          .text-line {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

