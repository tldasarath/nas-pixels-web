import BlogPage from '@/components/BlogPage/Blogs'
import ShowcaseSection from '@/components/ProductsPage/Products'
import Herosection from '@/components/TitleBanner/TitleBanner'
import ContactSection from '@/components/ui/contact/ContactSection'
import React from 'react'
export const metadata = {
    title: "LED Suppliers in UAE | Blogs",
    description:
        "In this blog, Naspixels covers major LED suppliers in the UAE, LED display technologies, applications, and expert advice to help choose the right LED solutions.",

    keywords: [
        "led suppliers in dubai",
        "led suppliers in uae",
        "led signage dubai",
        "led display solution",
        "led screens uae",
        "led display screen uae",
        "dubai led screen",
        "led supplier dubai",
    ],

    alternates: {
        canonical: "https://naspixels.com/blogs",
    },

    openGraph: {
        title: "LED Suppliers in UAE | Blogs",
        description:
            "In this blog, Naspixels covers major LED suppliers in the UAE, LED display technologies, applications, and expert advice to help choose the right LED solutions.",
        url: "https://naspixels.com/blogs",
        siteName: "Naspixels",
        type: "website",
    },
};

const page = () => {
    return (
        <div>
            <Herosection
                title={"BLOGS"} />
            <BlogPage />
            <ContactSection />
        </div>
    )
}

export default page