import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// Sample doctor data for seeding the database
const sampleDoctors = [
  {
    name: "John Smith",
    specialization: "General Physician",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 12,
    languages: ["English", "Hindi"],
    specializations: ["General Medicine", "Diabetes Management", "Hypertension"],
    tags: ["Top Rated", "Quick Response"],
    rating: 4.8,
    reviewCount: 245,
    recommendationPercentage: 98,
    consultationFee: 800,
    inClinicFee: 1000,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: true,
      tomorrow: true,
      weekend: true,
    },
    gender: "male",
  },
  {
    name: "Sarah Johnson",
    specialization: "Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), DNB",
    experience: 8,
    languages: ["English", "Hindi", "Bengali"],
    specializations: ["Internal Medicine", "Respiratory Disorders", "Critical Care"],
    tags: ["Available Today", "Video Consultation"],
    rating: 4.6,
    reviewCount: 178,
    recommendationPercentage: 95,
    consultationFee: 700,
    inClinicFee: 900,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: true,
      tomorrow: false,
      weekend: true,
    },
    gender: "female",
  },
  {
    name: "Rajesh Kumar",
    specialization: "General Physician",
    qualification: "MBBS, MD (General Medicine)",
    experience: 15,
    languages: ["English", "Hindi", "Punjabi"],
    specializations: ["General Medicine", "Infectious Diseases", "Preventive Healthcare"],
    tags: ["Experienced", "Highly Recommended"],
    rating: 4.9,
    reviewCount: 320,
    recommendationPercentage: 99,
    consultationFee: 1200,
    inClinicFee: 1500,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: false,
      tomorrow: true,
      weekend: true,
    },
    gender: "male",
  },
  {
    name: "Priya Sharma",
    specialization: "Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 6,
    languages: ["English", "Hindi", "Gujarati"],
    specializations: ["Internal Medicine", "Women's Health", "Thyroid Disorders"],
    tags: ["Women's Health Expert", "Quick Response"],
    rating: 4.7,
    reviewCount: 156,
    recommendationPercentage: 94,
    consultationFee: 600,
    inClinicFee: 800,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: true,
      tomorrow: true,
      weekend: false,
    },
    gender: "female",
  },
  {
    name: "Michael Chen",
    specialization: "General Physician",
    qualification: "MBBS, MD (General Medicine), Fellowship in Diabetology",
    experience: 10,
    languages: ["English", "Mandarin"],
    specializations: ["General Medicine", "Diabetes Management", "Metabolic Disorders"],
    tags: ["Diabetes Expert", "Multilingual"],
    rating: 4.5,
    reviewCount: 210,
    recommendationPercentage: 92,
    consultationFee: 900,
    inClinicFee: 1100,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: false,
      tomorrow: true,
      weekend: true,
    },
    gender: "male",
  },
  {
    name: "Ananya Patel",
    specialization: "Internal Medicine",
    qualification: "MBBS, DNB (General Medicine)",
    experience: 4,
    languages: ["English", "Hindi", "Gujarati"],
    specializations: ["Internal Medicine", "Preventive Healthcare", "Lifestyle Diseases"],
    tags: ["Young Talent", "Preventive Care"],
    rating: 4.3,
    reviewCount: 98,
    recommendationPercentage: 88,
    consultationFee: 500,
    inClinicFee: 700,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: true,
      tomorrow: true,
      weekend: false,
    },
    gender: "female",
  },
  {
    name: "David Wilson",
    specialization: "General Physician",
    qualification: "MBBS, MD (Internal Medicine), FCCP",
    experience: 18,
    languages: ["English"],
    specializations: ["General Medicine", "Respiratory Disorders", "Sleep Medicine"],
    tags: ["Senior Consultant", "Sleep Specialist"],
    rating: 4.9,
    reviewCount: 340,
    recommendationPercentage: 98,
    consultationFee: 1500,
    inClinicFee: 1800,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: false,
      tomorrow: true,
      weekend: true,
    },
    gender: "male",
  },
  {
    name: "Neha Gupta",
    specialization: "Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 7,
    languages: ["English", "Hindi", "Bengali"],
    specializations: ["Internal Medicine", "Infectious Diseases", "Tropical Medicine"],
    tags: ["Infectious Disease Expert", "Available Today"],
    rating: 4.6,
    reviewCount: 175,
    recommendationPercentage: 93,
    consultationFee: 750,
    inClinicFee: 950,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: true,
      tomorrow: false,
      weekend: true,
    },
    gender: "female",
  },
  {
    name: "Vikram Singh",
    specialization: "General Physician",
    qualification: "MBBS, MD (General Medicine), DM (Endocrinology)",
    experience: 14,
    languages: ["English", "Hindi", "Punjabi"],
    specializations: ["General Medicine", "Endocrinology", "Diabetes Management"],
    tags: ["Endocrinology Expert", "Highly Rated"],
    rating: 4.8,
    reviewCount: 290,
    recommendationPercentage: 97,
    consultationFee: 1100,
    inClinicFee: 1300,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: false,
      tomorrow: true,
      weekend: false,
    },
    gender: "male",
  },
  {
    name: "Lisa Wong",
    specialization: "Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), Fellowship in Geriatrics",
    experience: 9,
    languages: ["English", "Cantonese"],
    specializations: ["Internal Medicine", "Geriatric Medicine", "Preventive Healthcare"],
    tags: ["Geriatric Specialist", "Compassionate Care"],
    rating: 4.7,
    reviewCount: 185,
    recommendationPercentage: 94,
    consultationFee: 850,
    inClinicFee: 1050,
    profilePicture: "/placeholder.svg?height=128&width=128",
    availability: {
      today: true,
      tomorrow: true,
      weekend: true,
    },
    gender: "female",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Check if collection already has data
    const count = await db.collection("doctors").countDocuments()

    if (count > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        count,
      })
    }

    // Insert sample doctors
    const result = await db.collection("doctors").insertMany(sampleDoctors)

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      insertedCount: result.insertedCount,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
