import Image from "next/image"
import { Star, ThumbsUp, Clock, Video, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Doctor } from "@/lib/types"

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row">
          {/* Doctor Image and Basic Info */}
          <div className="md:w-1/4 flex flex-col items-center mb-4 md:mb-0">
            <div className="relative h-32 w-32 rounded-full overflow-hidden mb-3">
              <Image
                src={doctor.profilePicture || "/placeholder.svg?height=128&width=128"}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center text-sm mb-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold">{doctor.rating}</span>
              <span className="text-gray-500 ml-1">({doctor.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{doctor.recommendationPercentage}% patients recommend</span>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="md:w-2/4 md:px-4">
            <h3 className="text-lg font-bold text-[#02475b]">Dr. {doctor.name}</h3>
            <p className="text-gray-600 mb-2">{doctor.specialization}</p>
            <p className="text-sm text-gray-500 mb-2">{doctor.qualification}</p>
            <p className="text-sm text-gray-500 mb-3">{doctor.experience} years experience</p>

            <div className="space-y-2">
              <div className="flex items-start">
                <div className="min-w-[100px] text-sm font-medium text-gray-600">Speaks:</div>
                <div className="text-sm">{doctor.languages.join(", ")}</div>
              </div>
              <div className="flex items-start">
                <div className="min-w-[100px] text-sm font-medium text-gray-600">Specializes in:</div>
                <div className="text-sm">{doctor.specializations.join(", ")}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {doctor.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Appointment Options */}
          <div className="md:w-1/4 mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-gray-200 hover:border-[#ff6f61] transition-colors">
                <div className="flex items-center mb-2">
                  <Video className="h-4 w-4 text-[#ff6f61] mr-2" />
                  <span className="font-medium text-[#02475b]">Video Consultation</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Available Today</span>
                </div>
                <div className="font-semibold text-[#02475b]">₹{doctor.consultationFee}</div>
                <Button className="w-full mt-2 bg-[#ff6f61] hover:bg-[#ff5c4d] text-white">Book Now</Button>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 hover:border-[#ff6f61] transition-colors">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-[#ff6f61] mr-2" />
                  <span className="font-medium text-[#02475b]">In-clinic Appointment</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Available Tomorrow</span>
                </div>
                <div className="font-semibold text-[#02475b]">₹{doctor.inClinicFee}</div>
                <Button className="w-full mt-2 bg-white border border-[#ff6f61] text-[#ff6f61] hover:bg-gray-50">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
