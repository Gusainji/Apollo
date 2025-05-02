  import { type NextRequest, NextResponse } from "next/server"
  import { connectToDatabase } from "@/lib/mongodb"

  export async function POST(request: NextRequest) {
    try {
      const { db } = await connectToDatabase()
      console.log(db)
      const doctorData = await request.json()
      console.log("doctorData", doctorData)

      // Validate required fields
      
      const requiredFields = ["name", "specialization", "qualification", "experience", "gender"]
      for (const field of requiredFields) {
        if (!doctorData[field]) {
          return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
        }
      }

      // Set default values for optional fields
      const doctor = {
        ...doctorData,
        languages: doctorData.languages || ["English"],
        specializations: doctorData.specializations || [doctorData.specialization],
        tags: doctorData.tags || [],
        rating: doctorData.rating || 0,
        reviewCount: doctorData.reviewCount || 0,
        recommendationPercentage: doctorData.recommendationPercentage || 0,
        consultationFee: doctorData.consultationFee || 500,
        inClinicFee: doctorData.inClinicFee || 700,
        availability: doctorData.availability || {
          today: false,
          tomorrow: true,
          weekend: false,
        },
        createdAt: new Date(),
      }

      const result = await db.collection("doctors").insertOne(doctor)

      return NextResponse.json(
        {
          success: true,
          doctorId: result.insertedId,
          message: "Doctor added successfully",
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("Error adding doctor:", error)
      return NextResponse.json({ error: "Failed to add doctor" }, { status: 500 })
    }
  }
