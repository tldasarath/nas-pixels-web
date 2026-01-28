import AboutSection from "@/components/ui/AboutPage/AboutSection";
import MissionVisionSection from "@/components/ui/AboutPage/MissionVision";
import Navbar from "@/components/common/Navbar/Navbar";
import Herosection from "@/components/TitleBanner/TitleBanner";
import React from "react";
import ContactSection from "@/components/ui/contact/ContactSection";
import TestFooter from "@/components/common/Footer/TestFooter";
import Footer from "@/components/common/Footer/Footer";
import AboutNasPixels from "@/components/ui/AboutPage/AboutNasPixels";
import CoreServices from "@/components/ui/AboutPage/CoreServices";
import BottomBanner from "@/components/ui/AboutPage/BottomBanner";
import StorySection from "@/components/ui/AboutPage/StorySection";

export const metadata = {
  title: "LED signage companies in Dubai | LED Display Solution",
  description:
    "We are an LED signage company in Dubai providing businesses with innovative LED displays, digital screens, video walls, and interactive kiosk displays.",

  keywords: [
    "led signage companies in dubai",
    "led display solution",
    "transparent led display",
    "creative led display",
    "led screens dubai",
    "outdoor led screen supplier in dubai",
    "led screen company in dubai",
    "led suppliers in dubai",
  ],

  alternates: {
    canonical: "https://naspixels.com/about-us",
  },

  openGraph: {
    title: "LED signage companies in Dubai | LED Display Solution",
    description:
      "We are an LED signage company in Dubai providing businesses with innovative LED displays, digital screens, video walls, and interactive kiosk displays.",
    url: "https://naspixels.com/about-us",
    siteName: "Naspixels",
    type: "website",
  },
};




const page = () => {
  return (
    <div>
      <Herosection
        title={"ABOUT US"}

      />
      <AboutSection />
      <MissionVisionSection />
      <StorySection />
      <AboutNasPixels />
      <CoreServices />
      <BottomBanner />
      <ContactSection />
    </div>
  );
};

export default page;
