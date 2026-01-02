"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SectionTitle from "@/components/common/Headers/SectionTitle";
import Container from "@/components/common/Layout/Container";
import { ModernButton } from "@/components/common/Button/ModernButton";

const SOLUTIONS = [
  {
    title: "Events & Exhibitions",
    image: "/assets/images/solutions/solution1.png",
  },
  {
    title: "Government & Corporate",
    image: "/assets/images/solutions/solution2.png",
  },
  {
    title: "Hospitality & Entertainment",
    image: "/assets/images/solutions/solution3.png",
  },
  {
    title: "Education & Conference",
    image: "/assets/images/solutions/solution4.png",
  },
  {
    title: "Events & Exhibitions",
    image: "/assets/images/solutions/solution5.png",
  },
  {
    title: "Retail & Shopping Malls",
    image: "/assets/images/solutions/solution6.png",
  },
];

export default function SolutionsSection() {
  const cardsRef = useRef([]);
  const [active, setActive] = useState(0);

  /* GSAP width animation */
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.to(card, {
        flexGrow: i === active ? 3.2 : 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, [active]);

  return (
    <section className="relative w-full bg-[#ECECEC] py-20  overflow-hidden">
        <Container>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* ================= TOP ROW: TITLE + DESCRIPTION ================= */}
        <div className="lg:col-span-12">
          <div
            className="
              flex flex-col lg:flex-row
              lg:items-start lg:justify-between
              gap-6 lg:gap-16
            "
          >
            {/* TITLE */}
            <div className="flex-shrink-0">
              <SectionTitle title="Solutions" className="text-black" />
            </div>

            {/* DESCRIPTION */}
            <p
              className="
                text-gray-700 leading-relaxed
                max-w-xl
                lg:text-right
              "
            >
              Yorem ipsum dolor sit amet, consectetur adipiscing elit.
              Etiam eu turpis molestie, dictum est a, mattis tellus.
              Sed dignissim, metus nec fringilla accumsan.
            </p>
          </div>
        </div>

        {/* ================= INTERACTIVE CARDS ================= */}
        <div className="lg:col-span-12 mt-6">
          <div className="flex h-[460px] gap-4">

            {SOLUTIONS.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className="
                  relative flex-grow overflow-hidden rounded-2xl
                  cursor-pointer group
                "
                style={{ flexGrow: index === 0 ? 3.2 : 1 }}
              >
                {/* IMAGE */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className="
                    object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/20" />

                {/* LABEL */}
                {active === index ? (
                  <div className="absolute bottom-4 left-4 bg-[#1E293B] text-white px-5 py-2 rounded-full text-sm">
                    {item.title}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="
                        bg-[#1E293B] text-white text-sm
                        px-4 py-2 rounded-full
                        rotate-90 whitespace-nowrap
                      "
                    >
                      {item.title}
                    </span>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-14 flex justify-center">
      <ModernButton text="Explore Solutions" arrowClr="#000000"/>
      </div>
        </Container>

    </section>
  );
}
