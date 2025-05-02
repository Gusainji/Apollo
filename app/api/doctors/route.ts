import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const experience = searchParams.get("experience")?.split(",") || []
    const availability = searchParams.get("availability")?.split(",") || []
    const gender = searchParams.get("gender")?.split(",") || []
    const fees = searchParams.get("fees")?.split(",") || []
    const sortBy = searchParams.get("sortBy") || "relevance"

    // Build filter query
    const filter: any = {
      specialization: { $regex: "General Physician|Internal Medicine", $options: "i" },
    }

    // Experience filter
    if (experience.length > 0) {
      const experienceRanges: any = []

      experience.forEach((range) => {
        if (range === "0-5") {
          experienceRanges.push({ experience: { $gte: 0, $lte: 5 } })
        } else if (range === "5-10") {
          experienceRanges.push({ experience: { $gt: 5, $lte: 10 } })
        } else if (range === "10-15") {
          experienceRanges.push({ experience: { $gt: 10, $lte: 15 } })
        } else if (range === "15+") {
          experienceRanges.push({ experience: { $gt: 15 } })
        }
      })

      if (experienceRanges.length > 0) {
        filter.$or = experienceRanges
      }
    }

    // Availability filter
    if (availability.length > 0) {
      const availabilityFilter: any = {}

      availability.forEach((avail) => {
        if (avail === "today") {
          availabilityFilter["availability.today"] = true
        } else if (avail === "tomorrow") {
          availabilityFilter["availability.tomorrow"] = true
        } else if (avail === "weekend") {
          availabilityFilter["availability.weekend"] = true
        }
      })

      Object.assign(filter, availabilityFilter)
    }

    // Gender filter
    if (gender.length > 0) {
      filter.gender = { $in: gender }
    }

    // Fees filter
    if (fees.length > 0) {
      const feesRanges: any = []

      fees.forEach((range) => {
        if (range === "0-500") {
          feesRanges.push({ consultationFee: { $gte: 0, $lte: 500 } })
        } else if (range === "500-1000") {
          feesRanges.push({ consultationFee: { $gt: 500, $lte: 1000 } })
        } else if (range === "1000+") {
          feesRanges.push({ consultationFee: { $gt: 1000 } })
        }
      })

      if (feesRanges.length > 0) {
        filter.$or = filter.$or ? [...filter.$or, ...feesRanges] : feesRanges
      }
    }

    // Build sort query
    let sortQuery: any = {}

    switch (sortBy) {
      case "experience_high":
        sortQuery = { experience: -1 }
        break
      case "experience_low":
        sortQuery = { experience: 1 }
        break
      case "fees_high":
        sortQuery = { consultationFee: -1 }
        break
      case "fees_low":
        sortQuery = { consultationFee: 1 }
        break
      default:
        // Default sort by relevance (rating and experience)
        sortQuery = { rating: -1, experience: -1 }
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count
    const total = await db.collection("doctors").countDocuments(filter)

    // Get doctors
    const doctors = await db.collection("doctors").find(filter).sort(sortQuery).skip(skip).limit(limit).toArray()

    return NextResponse.json({
      doctors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}
