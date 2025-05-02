import type { Metadata } from "next"
import DoctorListing from "@/components/doctor-listing"

export const metadata: Metadata = {
  title: "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
  description:
    "Consult with top General Physician & Internal Medicine specialists. Book appointments online, view doctor profiles, ratings, and more.",
  keywords: "general physician, internal medicine, doctor consultation, specialist doctors, apollo 247",
  openGraph: {
    title: "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
    description:
      "Consult with top General Physician & Internal Medicine specialists. Book appointments online, view doctor profiles, ratings, and more.",
    url: "https://apollo247-clone.vercel.app/specialties/general-physician-internal-medicine",
    siteName: "Apollo 247 Clone",
    images: [
      {
        url: "https://apollo247-clone.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apollo 247 Clone",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return (
    <main>
      <DoctorListing />
    </main>
  )
}
