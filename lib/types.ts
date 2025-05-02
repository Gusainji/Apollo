export interface Doctor {
  _id: string
  name: string
  specialization: string
  qualification: string
  experience: number
  languages: string[]
  specializations: string[]
  tags: string[]
  rating: number
  reviewCount: number
  recommendationPercentage: number
  consultationFee: number
  inClinicFee: number
  profilePicture?: string
  availability: {
    today: boolean
    tomorrow: boolean
    weekend: boolean
  }
  gender: "male" | "female"
}
