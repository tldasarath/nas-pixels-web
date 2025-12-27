"use client";

import TestimonialCard from "./TestimonialCard";
import ArrowButton from "./ArrowButton";

export default function TestimonialsSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      
      {/* Title */}
      <div className="mb-12 flex items-center gap-3">
        <h2 className="text-white text-2xl font-semibold">
          Testimonials
        </h2>
        <span className="w-6 h-6 rounded-full border border-[#70C879]" />
      </div>

      {/* Slider Wrapper */}
      <div className="relative flex items-center justify-center gap-6">

        {/* Left Arrow */}
        <div className="hidden md:block">
          <ArrowButton direction="left" />
        </div>

        {/* Card */}
        <TestimonialCard />

        {/* Right Arrow */}
        <div className="hidden md:block">
          <ArrowButton direction="right" />
        </div>

      </div>
    </section>
  );
}
