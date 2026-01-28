import Footer from '@/components/common/Footer/Footer'
import ShowcaseSection from '@/components/ProductsPage/Products'
import Herosection from '@/components/TitleBanner/TitleBanner'
import ContactSection from '@/components/ui/contact/ContactSection'
import React from 'react'
export const metadata = {
    title: "LED Display Screen UAE | Products | Naspixels",
    description:
        "We offer high-end LED display screen products in the UAE, including video walls, digital kiosks, flexible LED displays, and outdoor advertising screens.",

    keywords: [
        "led suppliers uae",
        "led screens dubai",
        "led screen company in dubai",
        "outdoor led screen supplier in dubai",
        "led screen supplier in dubai",
        "led display screen suppliers in dubai",
        "led display solution",
        "transparent led display",
    ],

    alternates: {
        canonical: "https://naspixels.com/products",
    },

    openGraph: {
        title: "LED Display Screen UAE | Products | Naspixels",
        description:
            "We offer high-end LED display screen products in the UAE, including video walls, digital kiosks, flexible LED displays, and outdoor advertising screens.",
        url: "https://naspixels.com/products",
        siteName: "Naspixels",
        type: "website",
    },
};
const page = () => {
    return (
        <div>
            <Herosection
                title={"PRODUCTS"} />
            <ShowcaseSection />
            <ContactSection />

        </div>
    )
}

export default page